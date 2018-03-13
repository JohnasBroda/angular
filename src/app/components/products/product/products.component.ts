import { ActivatedRoute, Router, ParamMap, NavigationExtras, Params } from '@angular/router';
import { FilterByPipe } from './../../../interfaces/filterBy-pipe';
import { sortModes } from './sort-modes';
import { PaginatorPipe } from './../../../interfaces/paginator-pipe';
import { OrderByPipe } from './../../../interfaces/orderBy-pipe';
import { PaginatorEvent } from './../../../interfaces/paginatorEvent';
import { Observable } from 'rxjs/Observable';
import {PageScrollConfig, PageScrollInstance} from 'ng2-page-scroll';
import { FormBuilder, FormControl } from '@angular/forms';
import { selector } from 'rxjs/operator/publish';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Product } from '../../../interfaces/Product';
import { Component, OnInit, Input, EventEmitter, SimpleChanges, KeyValueDiffers, Inject } from '@angular/core';
import { FireDbService } from '../../../services/fire-db.service';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { FireAuthService } from '../../../services/fire-auth-service.service';
import { ProductService } from '../../../services/product.service';
import { PageEvent, MatAutocompleteSelectedEvent, MatOptionSelectionChange, MatSelect, MatSelectChange } from '@angular/material';
import { OnDestroy, OnChanges, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { ScrollSvc } from '../../../services/scroll-svc.service';
import { AddToCartComponent } from '../../cart/add-to-cart/add-to-cart.component';
import { ComponentType } from '@angular/core/src/render3';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../interfaces/User';

import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
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
import { SortMode } from '../../../interfaces/sort-mode';
import { PageScrollService } from 'ng2-page-scroll';
import { AngularFireStorage } from 'angularfire2/storage';
import { useAnimation } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [OrderByPipe, PaginatorPipe, FilterByPipe],
  animations: [ ],
})
export class ProductComponent implements OnInit, OnDestroy {
  [x: string]: any;
  public products: Product[];
  public productsCount: Observable<number>;
  public productCategories: string[];
  public pageLinkSize: Observable<number>;
  public filteredProducts$: Observable<any>;
  public filteredProducts: Product[];
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public isScrollable: Observable<boolean>;
  public scrollSub: Subscription;
  public currentUser: User = new User();
  public isReady = false;
  public sortModes = sortModes;
  public pageEvent: PaginatorEvent = {
    first: 0,
    page: 0,
    rows: 50,
    pageCount: 10
  };
  public appliedSortMode: SortMode;
  public scrollY: number;
  public isActive = false;
  public sideNavState = 'inactive';
  public mainState = 'expanded';
  public filteredLength = 0;
  public filterPriceRange: number[] = [0, 100];
  public filterCategories: string[];
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
  public searchControl: FormControl;
  public searchInput = '';
  private navigationExtras: NavigationExtras = {
    queryParamsHandling: 'merge',
    skipLocationChange: true,
  };
  public filteredOptions: Observable<string[]>;
  public options: string[] = [];

  constructor(
    private db: FireDbService,
    private router: Router,
    private storage: AngularFireStorage,
    private smooth: SimpleSmoothScrollService,
    private route: ActivatedRoute,
    private authSvc: FireAuthService,
    private productSvc: ProductService,
    public scrollSvc: ScrollSvc,
    private fb: FormBuilder,
    public orderByPipe: OrderByPipe,
    public filterByPipe: FilterByPipe,
    public paginatorPipe: PaginatorPipe) {
    this.searchControl = this.fb.control([
      this.searchInput,
    ]);
  }

  async ngOnInit() {
    this.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.route.queryParams.subscribe((response: ParamMap) => {
        this.queryParams = response;
      });
      this.initList();

      this.getSearchOptions();
      this.getProductCategories();

      this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(x => x ? x : ''),
        map((input: string) => this.getFilterOptions(input)),
      );
      this.isScrollable = this.scrollSvc.watchScrollPosition().pipe(
        map((ev: any) => ev = ev.path[1].scrollY ? true : false),
      );
      this.isReady = true;
    });
  }

  public onSortChange() {
    this.filteredProducts = this.orderByPipe.transform(this.filteredProducts, this.appliedSortMode);
    this.filteredProducts = this.forceArrayBindingRefresh(this.filteredProducts);
  }

  private order(products: Product[]) {
    if (this.appliedSortMode) {
      products = this.orderByPipe.transform(products, this.appliedSortMode);
      products = this.forceArrayBindingRefresh(products);
    }
    return products;
  }

  private forceArrayBindingRefresh(array: any[]) {
    // force angular to notice changes in the array
    const length = array.length;
    array.push(null);
    array = array.slice(0, length);
    return array;
  }

  public onInspect(product: Product) {
    this.productSvc.inspect(product);
  }

  public onEdit(product: Product) {
    this.productSvc.editProduct(product);
  }

  public pageEventHandler(event) {
    this.pageEvent = event;
    this.filteredProducts$ = Observable.from(this.filteredProducts$).pipe(
      map((products: Product[]) => this.paginatorPipe.transform(products, event),
      ));
  }

  private getProducts() {
    return this.db.getProducts();
  }

  public getProductCategories() {
    Observable.of(this.products).pipe(
      mergeMap(val => Observable.from(val)),
      map((product: Product) => product.category),
      distinct(),
      toArray(),
      tap((y: string[]) => this.productCategories = y),
      tap((array: string[]) => this.filterCategories = array),
      take(1)
    ).subscribe();
  }

  public onSlideEnd() {
    setTimeout(() => this.applyFilters(), 500);
  }

  public onSlideChange(event) {
    this.filterPriceRange[0] = event.values[0];
    this.filterPriceRange[1] = event.values[1];
    this.onSlideEnd();
  }

  public onSearchInput(input: string) {
    this.searchInput = this.searchControl.value[0] ? this.searchControl.value : '';
    this.applyFilters();
  }

  public onCategoriesChange() {
    this.applyFilters();
  }

  public applyFilters() {
    this.filteredProducts$ = Observable.of(this.products).pipe(
      map((products: Product[]) => this.filterByPipe.transform(products, this.searchInput)),
      mergeMap(val => Observable.from(val)),
      filter((product: Product) => this.filterByPrice(product)),
      filter((product: Product) => this.filterByCategory(product)),
      toArray(),
      map((products: Product[]) => this.order(products)),
      tap((products: Product[]) => this.filteredProducts = products),
      tap(array => this.updatePaginator(array)),
    );
    this.filteredProducts$.subscribe();
  }

  private initList() {
    this.filteredProducts = this.products;
    this.updatePaginator(this.products);
  }


  public onEnter(event: KeyboardEvent) {
    this.getFilterOptions((event.target as HTMLInputElement).value);
  }

  private filterByCategory(product: Product) {
    return this.filterCategories.includes(product.category) ? true : false;
  }

  private filterByPrice(product: Product) {
    const extras = {
      fromPrice: this.filterPriceRange[ 0 ],
      toPrice: this.filterPriceRange[ 1 ],
    };
    this.navigationExtras.queryParams ?
      Object.assign(this.navigationExtras.queryParams, extras) :
      this.navigationExtras.queryParams = extras;
    console.log(this.navigationExtras);
    this.router.navigate(['/products', this.navigationExtras]);
    return (product.price >= this.filterPriceRange[0] && this.filterPriceRange[1] >= product.price) ? true : false;
  }

  private updatePaginator(array: any[]) {
    this.productsCount = Observable.of(array.length);
    const total = Math.ceil(array.length / this.pageEvent.rows) > 5 ? 5 : Math.ceil(array.length / this.pageEvent.rows);
    this.pageLinkSize = Observable.of(total);
  }

  public getFilterOptions(input: string): string[] {
    const filtered = this.options.filter((option: string) =>
    option.toLowerCase().startsWith(input.toLowerCase()));
    return input.length ? filtered : [''].concat(filtered);
  }

  private getSearchOptions() {
    this.products.forEach((product: {}) => {
      const entries: any[] = Object.values(product);
      entries.forEach(entry => {
        if (this.options.indexOf(entry) === -1 &&
          !entry.toString().startsWith('prod-') && isNaN(entry)) {
          this.options.push(entry);
        }
      });
    });
  }

  public toggleSideNav() {
    console.log(this.sideNavState);
    console.log(this.mainState);
    this.mainState = this.mainstate === 'expanded' ? 'collapsed' : 'expanded';
    this.sideNavState = this.sideNavState === 'inactive' ? 'active' : 'inactive';
    console.log(this.sideNavState);
    console.log(this.mainState);
  }

  public updateUrl(queryParam: any) {

  }

  public scrollToTop() {
    this.smooth.smoothScrollToTop(new SimpleSmoothScrollOption(600, 'easeInQuint'));
  }

  ngOnDestroy() {
    if (this.currentUser) {
      this.authSvc.signOut();
    }
  }
}
