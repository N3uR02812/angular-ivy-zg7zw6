import { Observable } from "rxjs/internal/Observable";
import { Base } from "../models/base";
import { of } from "rxjs/internal/observable/of";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { APP_CONFIG } from "../helper/injectionTokens";
import { BasicService } from "./basicService";
import moment, { Moment } from "moment";

export class CachedService<T extends Base> extends BasicService<T> {
  private cache = new Map<string, T>();
  private latestUpdate: Moment = moment(0);

  constructor(http: HttpClient, @Inject(APP_CONFIG) config: any) {
    super(http, config);
  }

  public getCacheValues(): T[] {
    return Array.from(this.cache.values());
  }

  public get(key: string): Observable<T> {
    const item = this.cache.get(key);
    if (item != null) {
      return super.getUpdateDateOfItem(key).pipe(
        switchMap((date: Moment) => {
          if (date > this.latestUpdate) {
            this.latestUpdate = date;
            return super.get(key).pipe(
              switchMap((data: T) => {
                this.cache.set(key, data);
                return of(data);
              })
            );
          } else {
            return of(item);
          }
        })
      );
    }
    return super.get(key).pipe(
      switchMap((data: T) => {
        this.cache.set(key, data);
        return of(data);
      })
    );
  }

  public getList(
    filter: any = null,
    sort: any = null,
    limit: number = null,
    skip: number = null
  ): Observable<T[]> {
    return super.getUpdateDateOfTable().pipe(
      switchMap((date: Moment) => {
        if (date > this.latestUpdate) {
          this.latestUpdate = date;
          return super.getList(filter, sort, limit).pipe(
            switchMap((data: T[]) => {
              this.cache.clear();
              data.forEach(d => {
                this.cache.set(d._id, d);
              });
              return of(data);
            })
          );
        } else {
          return of(this.getCacheValues());
        }
      })
    );
  }

  public getCount(
    filter: any = null,
    sort: any = null,
    limit: number = null,
    skip: number = null
  ): Observable<number> {
    // return super.getUpdateDateOfTable()
    //     .pipe(switchMap((date: Moment) => {
    //         if (date > this.latestUpdate) {
    return super.getCount(filter, sort, limit).pipe(
      switchMap((count: number) => {
        //this.cache.clear();
        return of(count);
      })
    );
    //         }
    //         else {
    //             return of(this.getCacheValues().length);
    //         }
    //     }));
  }

  public post(entity: T): Observable<T> {
    return super.post(entity).pipe(
      switchMap(data => {
        this.cache.set(entity.Id, data);
        return of(data);
      })
    );
  }

  public put(entity: T, key: string): Observable<T> {
    return super.put(entity, key).pipe(
      switchMap(data => {
        this.cache.set(key, data);
        return of(data);
      })
    );
  }

  public patch(entity: T, key: string): Observable<T> {
    return super.patch(entity, key).pipe(
      switchMap(data => {
        this.cache.set(key, data);
        return of(data);
      })
    );
  }

  public delete(key: string): Observable<T> {
    return super.delete(key).pipe(
      switchMap(() => {
        this.cache.delete(key);
        return of(null);
      })
    );
  }
}
