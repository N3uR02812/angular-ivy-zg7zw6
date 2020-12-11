import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'src/app/services/dataService';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserService } from 'src/app/services/userService';
import { of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

export enum CheckState { StartApp, Checking, Checkfinished, OpenApp }

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  public checkState: CheckState = CheckState.StartApp;
  public checkStateEnum = CheckState;
  @ViewChild('logo', { static: false }) logo: ElementRef;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private userService: UserService,
    public dataService: DataService) {
  }

  public ngOnInit() {
    of(null).pipe(
      delay(1000),
      tap(() => { this.checkState = CheckState.Checking; }),
      delay(1000),
      switchMap(() => this.userService.checkAuth()),
      tap(() => { this.checkState = CheckState.Checkfinished; }),
      delay(1000),
      tap(() => { this.checkState = CheckState.OpenApp; }),
    ).subscribe()
  }
}
