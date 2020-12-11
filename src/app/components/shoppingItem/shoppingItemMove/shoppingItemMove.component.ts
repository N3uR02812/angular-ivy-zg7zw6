import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { ShoppingItem } from 'src/app/models/shoppingItem';
import { AppService } from 'src/app/services/appService';
import { ActivatedRoute, Router } from '@angular/router';
import { AmountTypes } from 'src/app/helper/amountType';
import { Ng2ImgMaxService } from 'ng2-img-max/dist/src/ng2-img-max.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';
import { Container } from 'src/app/models/container';
import { DataService } from 'src/app/services/dataService';
import { Base } from 'src/app/models/base';
import { ShoppingItemViewModel } from 'src/app/viewModels/shoppingItemViewModel';
import { ContainerItem } from 'src/app/models/containerItem';
import { ShoppingItemMoveViewModel } from 'src/app/viewModels/shoppingItemMoveViewModel';
import { switchMap, mergeMap, toArray } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-shoppingItemMove',
  templateUrl: './shoppingItemMove.component.html',
  styleUrls: ['./shoppingItemMove.component.scss']
})
export class ShoppingItemMoveComponent implements OnInit {
  @Input() items: ShoppingItemMoveViewModel[] = [];
  @Input() containers: Container[] = [];
  @Input() containerItems: Container[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public dataService: DataService,
    public containerService: CategoryService,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) {
    if (data != null) {
      this.items = data.items;
    }
  }

  ngOnInit(): void {

    this.dataService
      .loadContainers()
      .subscribe();

    this.dataService
      .getContainers()
      .subscribe(items => this.containers = items);

    this.dataService
      .loadContainerItems()
      .pipe(switchMap(cItems => {
        return from(this.items)
          .pipe(mergeMap(i => {

            if (i.ContainerItemId != null) {
              const cItem = cItems.find(c => c.Id === i.ContainerItemId);
              i.ContainerItem = cItem;
            }

            return of(i);
          })
            , toArray()
          );
      }))
      .subscribe();
  }
}
