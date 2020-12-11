import { Component, OnInit, Input, Inject } from '@angular/core';
import { Group } from 'src/app/models/group';
import { AppService } from 'src/app/services/appService';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import icons from '../../../helper/material-icons-list-json.json';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { GroupViewModel } from 'src/app/viewModels/groupViewModel';

@Component({
  selector: 'app-groupsDetails',
  templateUrl: './groupsDetails.component.html',
  styleUrls: ['./groupsDetails.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  @Input() item: GroupViewModel = new GroupViewModel(null);
  
  @Input() isCreate: boolean = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public icons = icons;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService
  ) {
    if (data != null) {
      this.item = data.item;
      this.isCreate = data.isCreate;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.item.userMails.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(userMail: string): void {
    const index = this.item.userMails.indexOf(userMail);

    if (index >= 0) {
      this.item.userMails.splice(index, 1);
    }
  }
  
  ngOnInit(): void {
  }
}
