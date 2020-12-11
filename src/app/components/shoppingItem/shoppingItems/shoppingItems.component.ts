import { Component, OnInit, Query, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Container } from 'src/app/models/container';
import { ShoppingItemsService } from 'src/app/services/shoppingItemsService';
import { AppService } from 'src/app/services/appService';

import { switchMap, toArray, map, tap, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from 'src/app/services/containerService';
import { of } from 'rxjs/internal/observable/of';
import { from, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingItemViewModel } from 'src/app/viewModels/shoppingItemViewModel';
import * as _ from 'lodash';
import { DataService } from 'src/app/services/dataService';
import { BaseItemComponent } from '../../baseItem.component';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';
import { ShoppingItemsDetailsComponent } from '../shoppingItemDetails/shoppingItemDetails.component';
import { ShoppingItemMoveComponent } from '../shoppingItemMove/shoppingItemMove.component';
import { ShoppingItemMoveViewModel } from 'src/app/viewModels/shoppingItemMoveViewModel';
import { ContainerItemsService } from 'src/app/services/containerItemsService';
import { ContainerItem } from 'src/app/models/containerItem';

@Component({
  selector: 'app-shoppingItems',
  templateUrl: './shoppingItems.component.html',
  styleUrls: ['./shoppingItems.component.scss']
})
export class ShoppingItemsComponent extends BaseItemComponent<ShoppingItemViewModel> implements OnInit, OnDestroy {

  public containerId: string = null;
  public categoryId: string = null;

  public container: Container = null;
  public category: Category = null;

  public today = new Date();
  public moveModalComponent = ShoppingItemMoveComponent;

  constructor(
    public dialog: MatDialog,
    public activeRoute: ActivatedRoute,
    public dataService: DataService,
    public shoppingItemsService: ShoppingItemsService,
    public appService: AppService,
    public categoryService: CategoryService,
    public containerService: ContainerService,
    public containerItemService: ContainerItemsService
  ) {
    super(dialog, appService, dataService);

    this.detailsModalComponent = ShoppingItemsDetailsComponent;
    this.loadDataObs =
      (filter?: any, sort?: any, limit?: number, skip?: number) => this.dataService.loadShoppingItems(filter, sort, limit, skip)
        .pipe(map(items => {
          return items as ShoppingItemViewModel[];
        }));

    // catContRelationService.getCategoriesOfContainer()

    this.postItemObs =
      (entity: ShoppingItemViewModel) => this.shoppingItemsService
        .post(entity)
        .pipe(map(item => {
          return item as ShoppingItemViewModel;
        }));

    this.patchItemObs =
      (entity: ShoppingItemViewModel, key: string) => this.shoppingItemsService
        .patch(entity, key)
        .pipe(map(item => {
          return item as ShoppingItemViewModel;
        }));

    this.deleteItemObs =
      (key: string) => this.shoppingItemsService
        .delete(key)
        .pipe(map(item => {
          return item as ShoppingItemViewModel;
        }));
  }

  ngOnInit() {
    super.ngOnInit();
    this.appService.labelSubject.next('Einkaufsliste');
  }

  loadCategories(items: ShoppingItemViewModel[]): Observable<ShoppingItemViewModel[]> {
    return from(items)
      .pipe(
        mergeMap((item: ShoppingItemViewModel) => {
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

  load(): Observable<any> {
    return this.activeRoute.queryParams
      .pipe(switchMap(params => {
        this.containerId = params.container || null;
        this.categoryId = params.category || null;

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
        }
        else {
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

  createNewItem(item: ShoppingItemViewModel): ShoppingItemViewModel {
    return new ShoppingItemViewModel(item);
  }

  toContainerItems() {
    const dialogRef = this.dialog.open(this.moveModalComponent, {
      maxWidth: "unset",
      maxHeight: "unset",
      data: {
        items: this.items
          .filter(i => i.IsChecked)
          .map(i => new ShoppingItemMoveViewModel(i))
      }
    });
    dialogRef.afterClosed()
      .pipe(switchMap((result: ShoppingItemMoveViewModel[]) => {
        if (result == null) { return of(null); }

        return from(result)
          .pipe(
            mergeMap(r => {
              return this.submitMove(r);
            }),
            toArray());
      })).subscribe();
  }

  private submitMove(r: ShoppingItemMoveViewModel) {
    let obs = of(null);

    if (r.ContainerItemId && r.ContainerItem) {
      r.ContainerItem.CurrentAmount += r.Amount;
      obs = this.containerItemService
        .patch(r.ContainerItem, r.ContainerItemId);
    } else {
      const postItem = ContainerItem.createFromShoppingItem(r);
      obs = this.containerItemService
        .post(postItem);
    }

    return obs
      .pipe(
        switchMap(() => {
          return this.deleteItemObs(r.Id);
        }),
        tap(() => this.appService.reloadPressedSubject.next()
      ));
  }

  add() {
    const newItem = this.createNewItem(null);

    const dialogRef = this.dialog.open(this.detailsModalComponent, {
      maxWidth: "unset",
      maxHeight: "unset",
      data: {
        isCreate: true,
        item: Object.assign({}, newItem)
      }
    });

    dialogRef.afterClosed()
      .pipe(switchMap((result: ShoppingItemViewModel) => {
        if (result == null) { return of(null); }

        return this.postItemObs(result)
          .pipe(
            tap(() => this.appService.reloadPressedSubject.next()
            ));
      })).subscribe();
  }

  checkChange(item: ShoppingItemViewModel) {
    item.IsChecked = !item.IsChecked;
    this.patchItemObs(item, item.Id).subscribe();
  }

  details(item: ShoppingItemViewModel) {
    const dialogRef = this.dialog.open(this.detailsModalComponent, {
      maxWidth: "unset",
      maxHeight: "unset",
      data: {
        isCreate: false,
        item: this.createNewItem(item)
      }
    });
    dialogRef.afterClosed()
      .pipe(switchMap((result: ShoppingItemViewModel) => {
        if (result == null) { return of(null); }

        return this.patchItemObs(result, result.Id)
          .pipe(
            tap(() => this.appService.reloadPressedSubject.next()
            ));
      })).subscribe();
  }
}
