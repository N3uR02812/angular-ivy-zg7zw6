import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable, of } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '../helper/injectionTokens';
import { MongooseFilterQuery } from 'mongoose';
import { Moment } from 'moment';
import moment from 'moment';

export interface IBasicService<T> {
  get(key: string): Observable<T>;

  getList(filter: any, sort: any, limit: number, skip: number): Observable<T[]>;

  getCount(filter: any, sort: any, limit: number, skip: number): Observable<number>;

  getUpdateDateOfTable(): Observable<Moment>;

  getUpdateDateOfItem(key: string): Observable<Moment>;

  post(entity: T): Observable<T>;

  put(body: T, key: string): Observable<T>;

  patch(body: T, key: string): Observable<T>;

  delete(key: string): Observable<T>;
}

@Injectable()
export class BasicService<T> implements IBasicService<T> {
  public _setName: string = '';
  private url: string = 'http://localhost:3000/';
  public headers: HttpHeaders = new HttpHeaders();

  constructor(public http: HttpClient, @Inject(APP_CONFIG) config: any) {
    this.url = config.API_ENDPOINT;

    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      this.headers = this.headers.set('Accept', httpHeaderAcceptSelected);
    }
  }

  public selectHeaderAccept(accepts: string[]): string | undefined {
    if (accepts.length === 0) {
      return undefined;
    }

    const type = accepts.find((x: string) => this.isJsonMime(x));
    if (type === undefined) {
      return accepts[0];
    }
    return type;
  }

  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
  }

  public convert(obj: T): T {
    return obj;
  }

  public set setName(setName: string) {
    this._setName = setName;
  }

  public get Url() {
    return this.url + this._setName + '/';
  }

  public get(key: string): Observable<T> {
    return this.http.get(this.Url + key, { headers: this.headers })
      .pipe(map((data: T) => this.convert(data)));
  }

  public getList(filter: any = null, sort: any = null, limit: number = null, skip: number = null): Observable<T[]> {

    return this.http.post(this.Url + 'list', {
      filter,
      sort,
      limit,
      skip
    })
      .pipe(map((data: T[]) => {
        if (data == null) { return []; }
        return data.map(d => this.convert(d));
      }));
  }

  public getCount(filter: any = null, sort: any = null, limit: number = null, skip: number = null): Observable<number> {

    return this.http.post(this.Url + 'count', {
      filter,
      sort,
      limit,
      skip
    })
      .pipe(map((count: number) => {
        return count;
      }));
  }

  public getUpdateDateOfTable(): Observable<Moment> {
    return this.http
      .get(this.Url + 'updateDate', { headers: this.headers })
      .pipe(map((data: Date) => moment(data)));
  }

  public getUpdateDateOfItem(key: string): Observable<Moment> {
    return this.http
      .get(this.Url + key + '/updateDate', { headers: this.headers })
      .pipe(map((data: Date) => moment(data)));
  }

  public post(entity: T): Observable<T> {
    return this.http.post(this.Url, entity, { headers: this.headers })
      .pipe(map((data: T) => this.convert(data)));
    // return this.query.post(entity).pipe(map(data => data.toComplexValue<T>()));
  }

  public put(entity: T, key: string): Observable<T> {
    return this.http.put(this.Url + key, entity, { headers: this.headers })
      .pipe(map((data: T) => this.convert(data)));
  }

  public patch(entity: T, key: string): Observable<T> {
    return this.http.patch(this.Url + key, entity, { headers: this.headers })
      .pipe(map((data: T) => this.convert(data)));
  }

  public delete(key: string): Observable<T> {
    return this.http.delete(this.Url + key, { headers: this.headers })
      .pipe(map((data: T) => this.convert(data)));
  }
}
