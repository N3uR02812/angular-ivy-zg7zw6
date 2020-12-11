import { Component, OnInit, Query, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Container } from 'src/app/models/container';
import { ContainerItemsService } from 'src/app/services/containerItemsService';
import { ContainerItem } from 'src/app/models/containerItem';
import { AppService } from 'src/app/services/appService';

import { switchMap, toArray, switchMapTo, map, flatMap, concatMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { ODataQuery } from 'odata-v4-ng';
import { QueryBuilder } from 'src/app/helper/queryBuilder';
import { ContainerItemsDetailsComponent } from '../containersItemDetails/containersItemDetails.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerService } from 'src/app/services/containerService';
import { of } from 'rxjs/internal/observable/of';
import { Subscription, from, forkJoin, Observable } from 'rxjs';
import { ButtonInfo } from 'src/app/helper/buttonInfo';
import { AmountTypes } from 'src/app/helper/amountType';
import { MatDialog } from '@angular/material/dialog';
import { ContainerItemViewModel } from 'src/app/viewModels/containerItemViewModel';
import * as _ from 'lodash';
import { DataService } from 'src/app/services/dataService';
import { BaseItemComponent } from '../../baseItem.component';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';
import { ContainerItemsMoveComponent } from '../containerItemMove/containerItemMove.component';
import { ShoppingItem } from 'src/app/models/shoppingItem';
import { ShoppingItemsService } from 'src/app/services/shoppingItemsService';

@Component({
  selector: 'app-containersItems',
  templateUrl: './containersItems.component.html',
  styleUrls: ['./containersItems.component.scss']
})
export class ContainerItemsComponent extends BaseItemComponent<ContainerItemViewModel> implements OnInit, OnDestroy {

  public containerId: string = null;
  public categoryId: string = null;

  public containers: Container[] = [];
  public categories: Category[] = [];

  @ViewChild('categoryTemplate', null)
  public today = new Date();

  constructor(
    public dialog: MatDialog,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public dataService: DataService,
    public containerItemsService: ContainerItemsService,
    public shoppingItemsService: ShoppingItemsService,
    public appService: AppService,
    public categoryService: CategoryService,
    public containerService: ContainerService
  ) {
    super(dialog, appService, dataService);

    this.detailsModalComponent = ContainerItemsDetailsComponent;
    this.loadDataObs =
      (filter?: any, sort?: any, limit?: number, skip?: number) => this.dataService.loadContainerItems(filter, sort, limit, skip)
        .pipe(map(items => {
          return items as ContainerItemViewModel[];
        }));

    // catContRelationService.getCategoriesOfContainer()

    this.postItemObs =
      (entity: ContainerItemViewModel) => this.containerItemsService
        .post(entity)
        .pipe(map(item => {
          return item as ContainerItemViewModel;
        }));

    this.patchItemObs =
      (entity: ContainerItemViewModel, key: string) => this.containerItemsService
        .patch(entity, key)
        .pipe(map(item => {
          return item as ContainerItemViewModel;
        }));

    this.deleteItemObs =
      (key: string) => this.containerItemsService
        .delete(key)
        .pipe(map(item => {
          return item as ContainerItemViewModel;
        }));
  }

  ngOnInit() {
    super.ngOnInit();

    forkJoin([this.dataService.loadCategories(), this.dataService.loadContainers()])
      .pipe(switchMap(data => {
        this.categories = data[0];
        this.containers = data[1];
        return of(null);
      })).subscribe();

    this.appService.labelSubject.next('Artikel');
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  loadCategories(items: ContainerItemViewModel[]): Observable<ContainerItemViewModel[]> {
    return from(items)
      .pipe(
        mergeMap((item: ContainerItemViewModel) => {
          if (item.CategoryId === null) {
            return of(item);
          }
          return this.categoryService.get(item.CategoryId)
            .pipe(
              switchMap(category => {
                item.Category = category;
                return of(item);
              }));
        }),
        toArray()
      );
  }

  setFilter() {
    console.log("est");
    this.router.navigate(['/'], {
      queryParams: {
        container: this.containerId,
        category: this.categoryId,
        searchString: this.searchString
      }
    });
  }

  load(): Observable<any> {
    return this.activeRoute.queryParams
      .pipe(switchMap(params => {
        this.containerId = params.container || this.containerId;
        this.categoryId = params.category || this.categoryId;

        let obs = of(null);
        let hasFilter = false;
        const filter = {};

        if (this.containerId != null) {
          filter['ContainerId'] = this.containerId;
          hasFilter = true;
        }

        if (this.categoryId != null) {
          filter['CategoryId'] = this.categoryId;
          hasFilter = true;
        }

        if (this.searchString != null && this.searchString.length > 0) {
          filter['$or'] = [
            { Name: { $regex: '.*' + this.searchString } },
            { Description: { $regex: '.*' + this.searchString } }
          ];
          hasFilter = true;
        }

        if (!hasFilter) {
          obs = this.loadDataObs();
        } else {
          obs = this.loadDataObs(filter);
        }
        return obs
          .pipe(
            switchMap(items => this.loadCategories(items)),

            switchMap(items => {
              this.items = items;
              return of(this.items);
            }));
      }));
  }

  createNewItem(item: ContainerItemViewModel): ContainerItemViewModel {
    return new ContainerItemViewModel(item);
  }

  add(useCode: boolean = false) {
    const newItem = this.createNewItem(null);

    newItem.ContainerId = this.containerId ? this.containerId : null;
    newItem.CategoryId = this.categoryId ? this.categoryId : null;

    const dialogRef = this.dialog.open(this.detailsModalComponent, {
      maxWidth: 'unset',
      maxHeight: 'unset',
      data: {
        isCreate: true,
        item: Object.assign({}, newItem),
        useCode
      }
    });

    dialogRef.afterClosed()
      .pipe(switchMap((result: ContainerItemViewModel) => {
        if (result == null) { return of(null); }

        return this.postItemObs(result)
          .pipe(
            tap(() => this.appService.reloadPressedSubject.next()
            ));
      })).subscribe();
  }

  details(item: ContainerItemViewModel) {
    const dialogRef = this.dialog.open(this.detailsModalComponent, {
      maxWidth: 'unset',
      maxHeight: 'unset',
      data: {
        isCreate: false,
        item: this.createNewItem(item)
      }
    });
    dialogRef.afterClosed()
      .pipe(switchMap((result: ContainerItemViewModel) => {
        if (result == null) { return of(null); }

        return this.patchItemObs(result, result.Id)
          .pipe(
            tap(() => this.appService.reloadPressedSubject.next()
            ));
      })).subscribe();
  }

  moveTo(item: ContainerItemViewModel, target: string) {

    const modalItem = this.createNewItem(item);
    if (target === 'shoppingcart') {
      modalItem.CurrentAmount = (modalItem.CurrentAmount - modalItem.Amount) * -1;
    }

    const dialogRef = this.dialog.open(ContainerItemsMoveComponent, {
      maxWidth: 'unset',
      maxHeight: 'unset',
      data: {
        target,
        item: modalItem
      }
    });
    dialogRef.afterClosed()
      .pipe(switchMap((result: ContainerItemViewModel) => {
        if (result == null) { return of(null); }

        if (target === 'shoppingcart') {
          const shoppingItem = {
            Name: result.Name,
            Description: result.Description,
            Image: result.Image,
            Amount: result.CurrentAmount,
            CategoryId: result.CategoryId,
            ContainerItemId: result._id
          } as ShoppingItem;
          return this.shoppingItemsService.post(shoppingItem)
            .pipe(
              tap(() => this.appService.reloadPressedSubject.next()
              ));
        } else {
          return this.patchItemObs(result, result.Id)
            .pipe(
              tap(() => this.appService.reloadPressedSubject.next()
              ));
        }
      })).subscribe();
  }


  getDayDifference(date1: Date, date2: Date) {
    if (date1 == null || date2 == null) {
      return 0;
    }
    // To calculate the time difference of two dates
    var time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var days = time / (1000 * 3600 * 24);
    return days;
  }

  getPercentage(item: ContainerItem) {
    if (item.Amount === 0) {
      return 0;
    }
    return item.CurrentAmount / item.Amount;
  }
}
