import { Injectable, TemplateRef } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Injectable()
export class AppService {

  labelSubject: BehaviorSubject<string> = new BehaviorSubject('');
  configSubject: BehaviorSubject<any> = new BehaviorSubject(environment);
  reloadPressedSubject: Subject<void> = new Subject<void>();
  addPressedSubject: Subject<void> = new Subject<void>();
  searchPressedSubject: Subject<string> = new Subject<string>();

  leftHeaderTemplate: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(null);
  rightHeaderTemplate: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(null);
  bottomRightHeaderTemplate: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(null);

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackbar(message: string) {
    this.snackBar.open(message, null, {
      duration: 10 * 1000
    });
  }

  get Config(): Observable<any> {
    return this.configSubject.asObservable();
  }

  get Label(): Observable<any> {
    return this.labelSubject.asObservable();
  }

  get UserId(): Observable<string> {
    const token = localStorage.getItem('Authorization') || window.localStorage.getItem('Authorization');
    return of(token);
  }

  get searchPressed(): Observable<string> {
    return this.searchPressedSubject.asObservable();
  }

  get reloadPressed(): Observable<void> {
    return this.reloadPressedSubject.asObservable();
  }

  get addPressed(): Observable<void> {
    return this.addPressedSubject.asObservable();
  }
}
