import { OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/appService';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription, of, Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ComponentType } from '@angular/cdk/portal';
import { Base } from '../models/base';
import { DataService } from '../services/dataService';

export class BaseItemComponent<T extends Base> implements OnInit, OnDestroy {
  public items: T[] = [];
  public subscriptions: Subscription[] = [];
  public selectedId: string = null;
  public searchString?: string = null;

  // public dataUpdatedObs: () => Observable<T[]>;
  public loadDataObs: (filter?: any, sort?: any, limit?: number, skip?: number) => Observable<T[]>;
  public postItemObs: (entity: T) => Observable<T>;
  public patchItemObs: (entity: T, key: string) => Observable<T>;
  public deleteItemObs: (key: string) => Observable<T>;
  public detailsModalComponent: ComponentType<any> = null;

  @ViewChild('bottomActions') public bottomActions: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    public dataService: DataService
  ) {
    this.loadDataObs = () => of([]);
    this.postItemObs = () => of(null);
    this.patchItemObs = () => of(null);
    this.deleteItemObs = () => of(null);
  }

  ngOnInit(): void {

    this.appService.leftHeaderTemplate.next(null);
    this.appService.rightHeaderTemplate.next(null);

    const addSub = this.appService.addPressed.subscribe(() => {
      this.add();
    });


    const searchSub = this.appService.searchPressed
      .pipe(tap(value => { this.searchString = value; }))
      .pipe(tap(() => this.appService.reloadPressedSubject.next()))
      .subscribe();

    this.subscriptions.push(addSub, searchSub);
  }

  ngAfterViewInit() {
    this.appService.bottomRightHeaderTemplate.next(this.bottomActions);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }

  onSelect(itemList: MatSelectionList) {
    const selectedItem = itemList.selectedOptions.selected[0].value as T;
    if (selectedItem != null && this.selectedId !== selectedItem.Id) {
      this.selectedId = selectedItem.Id;
    }
    else {
      this.selectedId = null;
    }
  }

  load(): Observable<T[]> {
    return of([])
      .pipe(switchMap(() => {
        let obs = of([] as T[]);
        let hasFilter = false;
        const filter = {};

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
          .pipe(switchMap(items => {
            this.items = items;
            return of(this.items);
          }));
      }))
  }

  createNewItem(values: T): T {
    return Object.assign({}, values) as T;
  }

  details(item: T) {
    const dialogRef = this.dialog.open(this.detailsModalComponent, {
      maxWidth: "unset",
      maxHeight: "unset",
      data: {
        isCreate: false,
        item: this.createNewItem(item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patchItemObs(result, result.Id).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
    });
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postItemObs(result).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
    });
  }

  remove(item: T) {
    this.deleteItemObs(item.Id)
      .subscribe(() => {
        this.appService.reloadPressedSubject.next();
      });
  }
}
