import { BasicService } from "./basicService";
import { Container } from "../models/container";
import { Injectable, Inject } from "@angular/core";
import { APP_CONFIG } from "../helper/injectionTokens";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ContainerService extends BasicService<Container> {
  constructor(http: HttpClient, @Inject(APP_CONFIG) config: any) {
    super(http, config);
    this.setName = "container";
  }

  public convert(obj: Container): Container {
    return new Container(obj);
  }
}
