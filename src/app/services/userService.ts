import { BasicService } from "./basicService";
import { Container } from "../models/container";
import { Injectable, Inject } from "@angular/core";
import { ODataService } from "odata-v4-ng";
import { APP_CONFIG } from "../helper/injectionTokens";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Login } from "../models/login";
import { Register } from "../models/register";
import { GroupInvite } from "../models/groupInvite";

@Injectable()
export class UserService extends BasicService<User> {
  constructor(public http: HttpClient, @Inject(APP_CONFIG) config: any) {
    super(http, config);
    this.setName = "user";
  }

  public convert(obj: User): User {
    return new User(obj);
  }

  public login(entity: Login): Observable<string> {
    return this.http
      .post(this.Url + "login/", entity, { headers: this.headers })
      .pipe(map((data: string) => data));
  }

  public register(entity: Register): Observable<string> {
    return this.http
      .post(this.Url + "register/", entity, { headers: this.headers })
      .pipe(map((data: string) => data));
  }

  public inviteUsersToGroup(entity: GroupInvite): Observable<string> {
    return this.http
      .post(this.Url + "inviteToGroup/", entity, { headers: this.headers })
      .pipe(map((data: string) => data));
  }

  public registerCode(code: string): Observable<string> {
    return this.http
      .get(this.Url + "registerCode/" + code, { headers: this.headers })
      .pipe(map((data: string) => data));
  }

  public inviteCode(code: string): Observable<string> {
    return this.http
      .get(this.Url + "inviteCode/" + code, { headers: this.headers })
      .pipe(map((data: any) => data));
  }

  public checkAuth(): Observable<true> {
    return this.http
      .post(this.Url + "checkAuth/", { headers: this.headers })
      .pipe(map(() => true));
  }
}
