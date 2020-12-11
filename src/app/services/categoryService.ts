import { BasicService } from './BasicService';
import { Category } from '../models/category';
import { Injectable, Inject } from '@angular/core';
import { ODataService } from 'odata-v4-ng';
import { APP_CONFIG } from '../helper/injectionTokens';
import { HttpClient } from '@angular/common/http';
import { CachedService } from './cachedService';

@Injectable()
export class CategoryService extends BasicService<Category> {
  constructor(http: HttpClient, @Inject(APP_CONFIG) config: any) {
    super(http, config);
    this.setName = 'Category';
  }
}
