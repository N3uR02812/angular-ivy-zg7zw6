import { Component, OnInit, OnDestroy } from '@angular/core';
import { Container } from 'src/app/models/container';
import { ContainerService } from 'src/app/services/containerService';
import { AppService } from 'src/app/services/appService';
import { switchMap, tap, map, mergeMap, toArray, concatMap } from 'rxjs/operators';
import { Subscription, of, Observable, from } from 'rxjs';
import { ContainerDetailsComponent } from '../containersDetails/containersDetails.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectId } from 'bson';
import { MatSelectionList } from '@angular/material/list';
import { DataService } from '../../../services/dataService';
import { BaseItemComponent } from '../../baseItem.component';
import { ContainerViewModel } from '../../../viewModels/containerViewModel';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent extends BaseItemComponent<ContainerViewModel> {

  constructor(
    public containerService: ContainerService,
    public dataService: DataService,
    public dialog: MatDialog,
    public appService: AppService
  ) {
    super(dialog, appService, dataService);

    this.detailsModalComponent = ContainerDetailsComponent;
    this.loadDataObs = (filter?: any, sort?: any, limit?: number, skip?: number) =>
      this.dataService.loadContainers(filter, sort, limit, skip)
        .pipe(
          map(items => {
            return items as ContainerViewModel[];
          })
        );

    this.postItemObs =
      (entity: ContainerViewModel) => this.containerService
        .post(entity)
        .pipe(map(item => {
          return item as ContainerViewModel;
        }));

    this.patchItemObs =
      (entity: ContainerViewModel, key: string) => this.containerService
        .patch(entity, key)
        .pipe(map(item => {
          return item as ContainerViewModel;
        }));

    this.deleteItemObs =
      (key: string) => this.containerService
        .delete(key)
        .pipe(map(item => {
          return item as ContainerViewModel;
        }));
  }

  ngOnInit() {
    super.ngOnInit();
    this.appService.labelSubject.next('Container');
  }

  load(): Observable<ContainerViewModel[]> {
    return super.load()
      .pipe(switchMap(items => {
        return this.loadCounts(items);
      }));
  }

  private loadCounts(items: ContainerViewModel[]): Observable<ContainerViewModel[]> {
    return from(items)
      .pipe(
        concatMap(item => {
          return this.dataService
            .loadContainerItemsCount({ ContainerId: item.Id })
            .pipe(switchMap(count => {
              item.ContainerItemsCount = count;
              return of(item);
            }));
        }),
        toArray()
      );
  }

  public createNewItem(item: ContainerViewModel): ContainerViewModel {
    return new ContainerViewModel(item);
  }
}
