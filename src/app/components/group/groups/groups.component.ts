import { Component } from '@angular/core';
import { AppService } from 'src/app/services/appService';

import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/groupService';
import { DataService } from 'src/app/services/dataService';
import { BaseItemComponent } from '../../baseItem.component';
import { Group } from 'src/app/models/group';
import { GroupDetailsComponent } from '../groupsDetails/groupsDetails.component';
import { GroupViewModel } from 'src/app/viewModels/groupViewModel';
import { forkJoin, Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/userService';
import { GroupInvite } from 'src/app/models/groupInvite';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent extends BaseItemComponent<Group> {

  public loadMemberDataObs: (filter?: any, sort?: any, limit?: number, skip?: number) => Observable<Group[]>;

  constructor(
    public groupService: GroupService,
    public userService: UserService,
    public dataService: DataService,
    public dialog: MatDialog,
    public appService: AppService
  ) {
    super(dialog, appService, dataService);

    this.detailsModalComponent = GroupDetailsComponent;
    this.loadDataObs = (filter?: any, sort?: any, limit?: number, skip?: number) => {
      return this.dataService.loadGroups(filter, sort, limit, skip)
        .pipe(
          map(items => {
            return items as Group[];
          })

        )
    };

    this.loadMemberDataObs = (filter?: any, sort?: any, limit?: number, skip?: number) => {
      return this.dataService.loadMemberGroups(filter, sort, limit, skip)
        .pipe(
          map(items => {
            return items as Group[];
          })

        )
    };

    this.postItemObs =
      (entity: GroupViewModel) => this.groupService
        .post(entity)
        .pipe(switchMap(item => {
          let invite = new GroupInvite({ GroupId: item._id, UserEmails: entity.userMails });
          return this.userService
            .inviteUsersToGroup(invite)
            .pipe(switchMap(() => of(item)));
        }))
        .pipe(map(item => {
          return item as Group;
        }));

    this.patchItemObs =
      (entity: GroupViewModel, key: string) => this.groupService
        .patch(entity, key)
        .pipe(switchMap(item => {
          let invite = new GroupInvite({ GroupId: item._id, UserEmails: entity.userMails });
          return this.userService
            .inviteUsersToGroup(invite)
            .pipe(switchMap(() => of(item)));
        }))
        .pipe(map(item => {
          return item as Group;
        }));

    this.deleteItemObs =
      (key: string) => this.groupService
        .delete(key)
        .pipe(map(item => {
          return item as Group;
        }));
  }

  loadMember(): Observable<Group[]> {
    return of([])
      .pipe(switchMap(() => {
        let obs = of([] as Group[]);
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
          obs = this.loadMemberDataObs();
        }
        else {
          obs = this.loadMemberDataObs(filter);
        }

        return obs
          .pipe(switchMap(items => {
            this.items = items;
            return of(this.items);
          }));
      }))
  }

  setActiveGroup(group: Group) {
    this.groupService.setActiveGroup(group._id).subscribe(id => {
        this.appService.reloadPressedSubject.next();
    })
  }

  // leaveGroup(group: Group) {
  //   this.groupService.leaveGroup(group._id).subscribe(id => {
  //       this.appService.reloadPressedSubject.next();
  //   })
  // }

  ngOnInit() {
    super.ngOnInit();
    this.appService.labelSubject.next('Groups');
  }

  public createNewItem(item: Group): Group {
    return new GroupViewModel(item);
  }
}


