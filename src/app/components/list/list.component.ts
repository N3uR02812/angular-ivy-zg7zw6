import { Component, OnInit, Input, TemplateRef, EventEmitter, Output, Inject } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/services/appService';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent<T> implements OnInit {

  public items: T[] = [];
  @Input() loadingFunction: Observable<T[]> = of([]);
  @Input() contentTemplate: TemplateRef<any> = null;
  @Input() actionsTemplate: TemplateRef<any> = null;
  @Input() actionsLeftTemplate: TemplateRef<any> = null;
  @Input() filterTemplate: TemplateRef<any> = null;

  public isLoading = false;
  public searchString?: string = null;
  public subscriptions: Subscription[] = [];

  constructor(public appService: AppService) {

  }

  ngOnInit(): void {
    const reload = this.appService.reloadPressed
      .pipe(tap(() => { this.isLoading = true; }))
      .pipe(switchMap(() => this.loadingFunction))
      .pipe(tap(() => { this.isLoading = false; }))
      .subscribe(items => this.items = items);

    this.appService.reloadPressedSubject.next();
    this.subscriptions.push(reload);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}
