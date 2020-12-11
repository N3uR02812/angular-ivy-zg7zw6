import { ContainerItem } from '../models/containerItem';
import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';
import { APP_CONFIG } from '../helper/injectionTokens';
import { HttpClient } from '@angular/common/http';
import { CachedService } from './cachedService';
import { BasicService } from './BasicService';

@Injectable()
export class ContainerItemsService extends BasicService<ContainerItem> {
  constructor(http: HttpClient, @Inject(APP_CONFIG) config: any) {
    super(http, config);
    this.setName = 'containerItem';
  }

  public convert(obj: ContainerItem): ContainerItem {
    return new ContainerItem(obj);
  }
}
