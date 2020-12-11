import { BasicService } from "./basicService";
import { Group } from "../models/group";
import { Injectable, Inject } from "@angular/core";
import { ODataService } from "odata-v4-ng";
import { APP_CONFIG } from "../helper/injectionTokens";
import { HttpClient } from "@angular/common/http";
import { CachedService } from "./cachedService";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class GroupService extends BasicService<Group> {
  constructor(http: HttpClient, @Inject(APP_CONFIG) config: any) {
    super(http, config);
    this.setName = "Group";
  }

  public getMemberList(
    filter: any = null,
    sort: any = null,
    limit: number = null,
    skip: number = null
  ): Observable<Group[]> {
    return this.http
      .post(this.Url + "memberGroups", {
        filter,
        sort,
        limit,
        skip
      })
      .pipe(
        map((data: Group[]) => {
          if (data == null) {
            return [];
          }
          return data.map(d => this.convert(d));
        })
      );
  }

  public setActiveGroup(groupId: string): Observable<string> {
    return this.http.post(this.Url + "setActiveGroup", { Id: groupId }).pipe(
      map((data: string) => {
        if (data == null) {
          return "";
        }
        return data;
      })
    );
  }
}
