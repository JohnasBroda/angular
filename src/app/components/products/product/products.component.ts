import { IConfigState } from './../../../core/store/config/model';
import { environment } from './../../../../environments/environment.prod';
import { QueryConfig } from './../../../core/store/products/reducer';
import { IAppState } from 'app/app.states';
import { ActivatedRoute, Router, ParamMap, NavigationExtras, Params } from '@angular/router';
import { FilterByPipe } from './../../../interfaces/filterBy-pipe';
import { sortModes } from './sort-modes';
import { PaginatorPipe } from './../../../interfaces/paginator-pipe';
import { OrderByPipe } from './../../../interfaces/orderBy-pipe';
import { FormBuilder, FormControl } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Component, OnInit, Input, EventEmitter, SimpleChanges, KeyValueDiffers, Inject, ViewChildren, OnDestroy } from '@angular/core';
import { FireDbService } from '../../../services/fire-db.service';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { ProductService } from '../../../services/product.service';
import { PageEvent, MatAutocompleteSelectedEvent, MatOptionSelectionChange, MatSelect, MatSelectChange } from '@angular/material';
import { ScrollSvc } from '../../../services/scroll-svc.service';
import { AddToCartComponent } from '../../cart/add-to-cart/add-to-cart.component';
import { ComponentType } from '@angular/core/src/render3';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  take,
  first,
  mergeMap,
  toArray,
  skip,
  count,
  filter,
  distinct
} from 'rxjs/operators';
import { TrackByFunction } from '@angular/core';
import { SortMode } from '../../../interfaces/sort-mode';
import { AngularFireStorage } from 'angularfire2/storage';
import { IProduct,
         Product,
         IProductsState,
         selectProductState,
         selectProducts,
         initialState } from '@store/products';
import { IUser } from '@store/user/model';
import { Store } from '@ngrx/store';
import * as fromProducts from '@store/products/index';
import * as fromConfig from '@configState/index';
import { HttpClient } from '@angular/common/http';
import { selectProductConfig, IProductConfig } from '@store/config';
import { Checkbox } from 'primeng/checkbox';
import { state, style, transition, trigger, animate, query, group } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { displayModeOptions } from './display-mode-options';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [OrderByPipe, PaginatorPipe, FilterByPipe],
  animations: [
    trigger('sideNavToggle', [
      transition('hide => show', [
        group([
          query('.sidenav', [
            style({
              opacity: 0,
              width: 0,
            }),
            animate('600ms ease-in')
          ]),
          query('.main', [
            style({ 'margin-left': 0 }),
            animate('600ms ease-in',
              style({ 'margin-left': '25vw' })
            )
          ]),
        ]),
      ]),
      transition('show => hide', [
        group([
          query('.sidenav', [
            animate('600ms ease-out',
              style({
                opacity: 0,
                width: 0,
            }))
          ]),
          query('.main', [
            style({ 'margin-left': '25vw' }),
            animate('600ms ease-out')
          ]),
        ])
      ]),
    ]),
  ],
})
export class ProductComponent implements OnInit, OnDestroy {
  [x: string]: any;
  public productsCount: Observable<number>;
  public productCategories$: Observable<string[]>;
  public pageLinkSize: Observable<number>;
  public filteredProducts$: Observable<any>;
  public filteredProducts: Product[];
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public isScrollable: Observable<boolean>;
  public scrollSub: Subscription;
  public currentUser: IUser = new IUser();
  public sortModes = sortModes;
  public pageEvent: PageEvent;
  public productState: Observable<IProductsState>;
  public sortMode: SortMode;
  public scrollY: number;
  private infiniteScrollable: boolean;
  public isActive = false;
  public filteredLength = 0;
  public filterPriceRange: number[] = [0, 100];
  public filterCategories: {} = {};
  public allFilters: {};
  public gridOfThree = ['col-md-3', 'm-3'];
  public gridOfFour = ['col-md-2', 'm-5'];
  public gridOfTwo = ['col-md-4', 'm-4'];
  public listDisplay = ['col-md-11', 'm-3'];
  public displayMode = this.gridOfThree;
  private queryParams: ParamMap;
  public scrollBtnActiveClasses = [
    'text-primary',
    'border-primary'
  ];
  public displayModeOptions = displayModeOptions;
  public isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public filterNavBtnPosition;
  public searchControl: FormControl;
  public searchInput = '';
  private navigationExtras: NavigationExtras = {
    queryParamsHandling: 'merge',
    skipLocationChange: true,
  };

  public filters: {};
  public typeAheadResults: Observable<any>;
  public options: string[] = [];
  private productsQuery: QueryConfig;

  public typeAheadLoading = false;
  private done: boolean;
  private loading: boolean;
  public configState: Observable<IProductConfig>;
  public filterToggles: string[] = [];
  public showSideNav = false;
  public filterUpdateCount: number;

  @ViewChildren(Checkbox) checkBoxes: Checkbox[];

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    public scrollSvc: ScrollSvc,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public paginatorPipe: PaginatorPipe) {
    this.searchControl = this.fb.control([
      this.searchInput,
    ]);
    this.productState = this.store.select<IProductsState>(selectProductState);
    this.configState =  this.store.select<IProductConfig>(selectProductConfig)
                                  .pipe(
                                    tap(filters => this.getFilterCategories(filters)),
                                  );
    this.isHandset.subscribe(media => {
      this.filterNavBtnPosition = media.matches ? 'align-self-end' : 'align-self-start';
    });
  }

  get sideNavState() {
    return this.showSideNav ? 'show' : 'hide';
  }

  async ngOnInit() {
    this.store.dispatch(new fromConfig.GetProductFilters());
    this.store.select(fromProducts.selectProductState)
              .subscribe((state: IProductsState) => {
                this.productsQuery = state.query;
                this.filters = state.query.filters;
                this.done = state.done;
                this.loading = state.loading;

                // if infinite scroll is off use the default pageEvent
                this.pageEvent = state.infiniteScroll ? null : state.pageEvent;
                this.infiniteScrollable = state.infiniteScroll;
    });
    this.route.queryParams.subscribe((response: ParamMap) => this.queryParams = response);

    this.typeAheadResults = this.searchControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(x => x ? x : ''),
      tap(() => this.typeAheadLoading = true),
      switchMap(searchTerm => this.getTypeAheadResults(searchTerm)),
      tap(() => this.typeAheadLoading = false),
    );
    this.isScrollable = this.scrollSvc.watchScrollPosition().pipe(
      map((ev: any) => ev = ev.path[1].scrollY ? true : false),
      tap(bool => console.log(bool))
    );
    this.getProducts();
    this.allFilters = this.filterCategories;
  }

  private getFilterCategories(filterConfig: IProductConfig) {
    this.filterUpdateCount = filterConfig.filterUpdateCount;

    const filters = filterConfig.filters;
    for (const filterKey in filters) {
      if (filters.hasOwnProperty(filterKey) && filters[filterKey]) {
        this.filterToggles.push(filterKey);
        const filterGrp: {}[] = filters[filterKey];
        const flatFilters = filterGrp.map(val => val['name']);
        this.filterCategories[filterKey] = flatFilters;
      }
    }
  }

  public scrollHandler(position: 'top' | 'bottom') {
    if (!this.infiniteScrollable || this.done || this.loading) {
      return;
    }

    if (position === 'bottom') {
      this.store.dispatch(new fromProducts.LoadProducts(this.productsQuery));
    }
  }

  public togglePaginationMode() {
    this.infiniteScrollable = this.infiniteScrollable ?  false : true;
    this.pageEvent = this.pageEvent ? null : {
      pageIndex: 0,
      pageSize: 50,
      length: 0,
    };
    this.store.dispatch(new fromProducts.UpdateState({
      infiniteScroll: this.infiniteScrollable,
      pageEvent: this.pageEvent
    }));
  }

  public pageEventHandler(event) {
    if (this.infiniteScrollable) {
      return;
    }

    this.pageEvent = event;
    this.store.dispatch(new fromProducts.LoadProducts(this.productsQuery));
  }

  public onInspect(product: Product) {
    this.productSvc.inspect(product);
  }

  public onEdit(product: Product) {
    this.productSvc.editProduct(product);
  }

  private getProducts() {
    this.store.dispatch(new fromProducts.LoadProducts(this.productsQuery));
  }

  public trackById: TrackByFunction<Product> = (index: number, item: Product) => item.id;

  public onSlideEnd(event) {
    setTimeout(() => {
      this.productsQuery = {
        ...this.productsQuery,
        field: 'price',
        cursor: null,
        operators: ['>=', '<='],
        criterias: [ event.values[0], event.values[1] ]
      };
      this.store.dispatch(new fromProducts.LoadProducts(this.productsQuery));
    }, 500);
  }

  public onOptionSelected(option) {
    console.log(option);
    this.searchControl.setValue(option.term);
    this.productsQuery = {
      ...this.productsQuery,
      cursor: null,
      searchTerm: option.term
    };
    this.store.dispatch(new fromProducts.LoadProducts(this.productsQuery));
  }

  public onEnter(event: KeyboardEvent) {
    this.getFilterOptions((event.target as HTMLInputElement).value);
  }

  public onFilterChange(checked: boolean, filterGrp: string, filterName: string) {
    const filteredBoxes = this.checkBoxes.filter(ckBox => ckBox.name === filterGrp);

    if (!filterName && checked) {
      filteredBoxes.forEach((box, i) => {
        box.checked = true;
        // skipping toggle all ckBox
        if (i !== 0) {
          // preventing value duplications
          if ( !(this.filterCategories[filterGrp] as string[]).includes(box.value) ) {
            (this.filterCategories[filterGrp] as string[]).push(box.value);
          }
        }
      });
    } else if (!filterName && !checked) {
      filteredBoxes.forEach(box => box.checked = false);
      this.filterCategories[filterGrp] = [];
    }

    this.store.dispatch(new fromProducts.FilterChanged({
      ...this.filterCategories,
    }));
  }

  // private filterByPrice(product: IProduct) {
  //   const extras = {
  //     fromPrice: this.filterPriceRange[0],
  //     toPrice: this.filterPriceRange[1],
  //   };
  //   this.navigationExtras.queryParams ?
  //     Object.assign(this.navigationExtras.queryParams, extras) :
  //     this.navigationExtras.queryParams = extras;
  //   console.log(this.navigationExtras);
  //   this.router.navigate(['/products', this.navigationExtras]);
  //   return (product.price >= this.filterPriceRange[0] && this.filterPriceRange[1] >= product.price) ? true : false;
  // }

  // tslint:disable-next-line:no-shadowed-variable
  private updatePaginator(count: number) {
    this.productsCount = Observable.of(count);
    const total = Math.ceil(count / this.pageEvent.pageSize) > 5 ? 5 : Math.ceil(count / this.pageEvent.pageSize);
    this.pageLinkSize = Observable.of(total);
  }

  public getFilterOptions(input: string): string[] {
    const filtered = this.options.filter((option: string) =>
      option.toLowerCase().startsWith(input.toLowerCase()));
    return input.length ? filtered : [''].concat(filtered);
  }

  private getTypeAheadResults(searchTerm: string) {
    if (searchTerm.length) {
      const url = `${environment.functionsURL.api}/typeAhead`;
      const body = { term: searchTerm, collection: 'products' };
      console.log(searchTerm);
      console.log(body);
      return this.http.post(url, body);
    } else {
      return Observable.of([]);
    }
  }

  public updateUrl(queryParam: any) {

  }

  ngOnDestroy() {
    if (this.currentUser) {
      // this.authSvc.signOut();
    }
  }
}
