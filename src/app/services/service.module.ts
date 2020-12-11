import {
  Injectable,
  NgModule,
  SkipSelf,
  Optional,
  InjectionToken
} from "@angular/core";
import { BasicService } from "./basicService";
import { ContainerItemsService } from "./containerItemsService";
import { CategoryService } from "./categoryService";
import { ContainerService } from "./containerService";
import { ODataService } from "odata-v4-ng";
import { APP_CONFIG } from "../helper/injectionTokens";
import { UserService } from "./userService";
import { ShoppingItemsService } from "./shoppingItemsService";
import { GroupService } from "./groupService";
// import { EanService } from './eanService';

@NgModule({
  providers: [
    ODataService,
    BasicService,
    ContainerService,
    GroupService,
    ContainerItemsService,
    ShoppingItemsService,
    CategoryService,
    UserService
    //  EanService
  ]
})
export class ServiceModule {
  public static forRoot(config: any) {
    return {
      ngModule: ServiceModule,
      providers: [{ provide: APP_CONFIG, useValue: config }]
    };
  }

  public constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
    if (parentModule) {
      throw new Error("ServiceModule has already been imported.");
    }
  }
}
