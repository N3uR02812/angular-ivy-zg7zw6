import { Component } from '@angular/core';
import { AppService } from 'src/app/services/appService';

import { map } from 'rxjs/operators';
import { CategoryDetailsComponent } from '../categoriesDetails/categoriesDetails.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/categoryService';
import { DataService } from 'src/app/services/dataService';
import { BaseItemComponent } from '../../baseItem.component';
import { CategoryViewModel } from 'src/app/viewModels/categoryViewModel';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseItemComponent<CategoryViewModel> {

  constructor(
    public categoryService: CategoryService,
    public dataService: DataService,
    public dialog: MatDialog,
    public appService: AppService
  ) {
    super(dialog, appService, dataService);

    this.detailsModalComponent = CategoryDetailsComponent;
    this.loadDataObs = (filter?: any, sort?: any, limit?: number, skip?: number) =>
      this.dataService.loadCategories(filter, sort, limit, skip)
        .pipe(
          map(items => {
            return items as CategoryViewModel[];
          })
        );

    this.postItemObs =
      (entity: CategoryViewModel) => this.categoryService
        .post(entity)
        .pipe(map(item => {
          return item as CategoryViewModel;
        }));

    this.patchItemObs =
      (entity: CategoryViewModel, key: string) => this.categoryService
        .patch(entity, key)
        .pipe(map(item => {
          return item as CategoryViewModel;
        }));

    this.deleteItemObs =
      (key: string) => this.categoryService
        .delete(key)
        .pipe(map(item => {
          return item as CategoryViewModel;
        }));
  }

  ngOnInit() {
    super.ngOnInit();
    this.appService.labelSubject.next('Kategorien');
  }

  public createNewItem(item: CategoryViewModel): CategoryViewModel {
    return new CategoryViewModel(item);
  }
}


