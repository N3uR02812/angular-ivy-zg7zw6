import { BasicService } from "./basicService";
import { ShoppingItem } from "../models/shoppingItem";
import { Injectable, Inject } from "@angular/core";
import * as _ from "lodash";
import { APP_CONFIG } from "../helper/injectionTokens";
import { HttpClient } from "@angular/common/http";
import { CachedService } from "./cachedService";

@Injectable()
export class ShoppingItemsService extends BasicService<ShoppingItem> {
  constructor(http: HttpClient, @Inject(APP_CONFIG) config: any) {
    super(http, config);
    this.setName = "shoppingItem";
  }

  public convert(obj: ShoppingItem): ShoppingItem {
    return new ShoppingItem(obj);
  }
}
