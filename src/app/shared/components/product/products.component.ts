import {
  ActivatedRoute,
  Router,
  ParamMap,
  NavigationExtras,
  Params
} from '@angular/router';
import { sortModes } from './sort-modes';
import { FormBuilder, FormControl } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Inject,
  ViewChildren,
  OnDestroy
} from '@angular/core';
import {
  PageEvent,
  MatAutocompleteSelectedEvent,
  MatOptionSelectionChange,
  MatSelect,
  MatSelectChange
} from '@angular/material';
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
import { AngularFireStorage } from 'angularfire2/storage';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import {
  selectProductConfig,
  IProductConfig,
  GetProductFilters
} from '@store/config';
import { Checkbox } from 'primeng/checkbox';
import {
  state,
  style,
  transition,
  trigger,
  animate,
  query,
  group
} from '@angular/animations';
import { PaginatorPipe } from '@pipes';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from '@store/auth';
import {
  Product,
  IProductsState,
  selectProductState,
  LoadProducts,
  UpdateState,
  FilterChanged,
  QueryConfig
} from '@store/product';
import { SortMode } from '@interfaces';
import { IAppState } from '@store/app.states';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '@services/product.service';
import { ScrollSvc } from '@services/utils/scroll-svc.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [],
  animations: [
    trigger('sideNavToggle', [
      transition('hide => show', [
        group([
          query('.sidenav', [
            style({
              opacity: 0,
              width: 0
            }),
            animate('600ms ease-in')
          ]),
          query('.main', [
            style({ 'margin-left': 0 }),
            animate('600ms ease-in', style({ 'margin-left': '25vw' }))
          ])
        ])
      ]),
      transition('show => hide', [
        group([
          query('.sidenav', [
            animate(
              '600ms ease-out',
              style({
                opacity: 0,
                width: 0
              })
            )
          ]),
          query('.main', [
            style({ 'margin-left': '25vw' }),
            animate('600ms ease-out')
          ])
        ])
      ])
    ])
  ]
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
  public isActive = false;
  public filteredLength = 0;
  public filterPriceRange: number[] = [0, 100];
  public filterCategories: {} = {};
  public allFilters: {};
  public scrollBtnActiveClasses = ['text-primary', 'border-primary'];
  public filters: {};
  public typeAheadResults: Observable<any>;
  public options: string[] = [];
  public searchControl: FormControl;
  public searchInput = '';
  public typeAheadLoading = false;
  public configState: Observable<IProductConfig>;
  public filterToggles: string[] = [];
  public showSideNav = false;
  public filterUpdateCount: number;
  public gridOfThree = ['col-md-3', 'm-3'];
  public gridOfFour = ['col-md-2', 'm-5'];
  public gridOfTwo = ['col-md-4', 'm-4'];
  public listDisplay = ['col-md-11', 'm-3'];
  public displayMode = this.gridOfThree;

  @ViewChildren(Checkbox) public checkBoxes: Checkbox[];

  private queryParams: ParamMap;
  private infiniteScrollable: boolean;
  private navigationExtras: NavigationExtras = {
    queryParamsHandling: 'merge',
    skipLocationChange: true
  };
  private done: boolean;
  private loading: boolean;
  private productsQuery: QueryConfig;

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    public scrollSvc: ScrollSvc,
    private fb: FormBuilder,
    public paginatorPipe: PaginatorPipe
  ) {
    this.searchControl = this.fb.control([this.searchInput]);
    this.productState = this.store.select<IProductsState>(selectProductState);
    this.configState = this.store
      .select<IProductConfig>(selectProductConfig)
      .pipe(tap(filters => this.getFilterCategories(filters)));
  }

  get sideNavState() {
    return this.showSideNav ? 'show' : 'hide';
  }

  public async ngOnInit() {
    this.store.dispatch(new GetProductFilters());
    this.store
      .select(selectProductState)
      .subscribe((state: IProductsState) => {
        this.productsQuery = state.query;
        this.filters = state.query.filters;
        this.done = state.done;
        this.loading = state.loading;

        // if infinite scroll is off use the default pageEvent
        this.pageEvent = state.infiniteScroll ? null : state.pageEvent;
        this.infiniteScrollable = state.infiniteScroll;
      });
    this.route.queryParams.subscribe(
      (response: ParamMap) => (this.queryParams = response)
    );

    this.typeAheadResults = this.searchControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(x => (x ? x : '')),
      tap(() => (this.typeAheadLoading = true)),
      switchMap(searchTerm => this.getTypeAheadResults(searchTerm)),
      tap(() => (this.typeAheadLoading = false))
    );
    this.isScrollable = this.scrollSvc
      .watchScrollPosition()
      .pipe(
        map((ev: any) => (ev = ev.path[1].scrollY ? true : false)),
        tap(bool => console.log(bool))
      );
    this.getProducts();
    this.allFilters = this.filterCategories;
  }

  public scrollHandler(position: 'top' | 'bottom') {
    if (!this.infiniteScrollable || this.done || this.loading) {
      return;
    }

    if (position === 'bottom') {
      this.store.dispatch(new LoadProducts(this.productsQuery));
    }
  }

  public togglePaginationMode() {
    this.infiniteScrollable = this.infiniteScrollable ? false : true;
    this.pageEvent = this.pageEvent
      ? null
      : {
          pageIndex: 0,
          pageSize: 50,
          length: 0
        };
    this.store.dispatch(
      new UpdateState({
        infiniteScroll: this.infiniteScrollable,
        pageEvent: this.pageEvent
      })
    );
  }

  public pageEventHandler(event) {
    if (this.infiniteScrollable) {
      return;
    }

    this.pageEvent = event;
    this.store.dispatch(new LoadProducts(this.productsQuery));
  }

  public onInspect(product: Product) {
    this.productSvc.inspect(product);
  }

  public onEdit(product: Product) {
    this.productSvc.editProduct(product);
  }

  public trackById: TrackByFunction<Product> = (index: number, item: Product) =>
    item.id;

  public onSlideEnd(event) {
    setTimeout(() => {
      this.productsQuery = {
        ...this.productsQuery,
        field: 'price',
        cursor: null,
        operators: ['>=', '<='],
        criterias: [event.values[0], event.values[1]]
      };
      this.store.dispatch(new LoadProducts(this.productsQuery));
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
    this.store.dispatch(new LoadProducts(this.productsQuery));
  }

  public onEnter(event: KeyboardEvent) {
    this.getFilterOptions((event.target as HTMLInputElement).value);
  }

  public onFilterChange(
    checked: boolean,
    filterGrp: string,
    filterName: string
  ) {
    const filteredBoxes = this.checkBoxes.filter(
      ckBox => ckBox.name === filterGrp
    );

    if (!filterName && checked) {
      filteredBoxes.forEach((box, i) => {
        box.checked = true;
        // skipping toggle all ckBox
        if (i !== 0) {
          // preventing value duplications
          if (
            !(this.filterCategories[filterGrp] as string[]).includes(box.value)
          ) {
            (this.filterCategories[filterGrp] as string[]).push(box.value);
          }
        }
      });
    } else if (!filterName && !checked) {
      filteredBoxes.forEach(box => (box.checked = false));
      this.filterCategories[filterGrp] = [];
    }

    this.store.dispatch(
      new FilterChanged({
        ...this.filterCategories
      })
    );
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

  public getFilterOptions(input: string): string[] {
    const filtered = this.options.filter((option: string) =>
      option.toLowerCase().startsWith(input.toLowerCase())
    );
    return input.length ? filtered : [''].concat(filtered);
  }

  public updateUrl(queryParam: any) {}

  public ngOnDestroy() {
    if (this.currentUser) {
      // this.authSvc.signOut();
    }
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

  private getProducts() {
    this.store.dispatch(new LoadProducts(this.productsQuery));
  }

  // tslint:disable-next-line:no-shadowed-variable
  private updatePaginator(count: number) {
    this.productsCount = Observable.of(count);
    const total =
      Math.ceil(count / this.pageEvent.pageSize) > 5
        ? 5
        : Math.ceil(count / this.pageEvent.pageSize);
    this.pageLinkSize = Observable.of(total);
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
}
