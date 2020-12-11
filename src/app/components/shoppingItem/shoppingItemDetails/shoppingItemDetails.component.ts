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

@Component({
  selector: 'app-shoppingItemDetails',
  templateUrl: './shoppingItemDetails.component.html',
  styleUrls: ['./shoppingItemDetails.component.scss']
})
export class ShoppingItemsDetailsComponent implements OnInit {
  @Input() item: ShoppingItemViewModel = new ShoppingItemViewModel(null);
  @Input() isCreate: boolean = false;

  @ViewChild('fileInput') fileInput: HTMLElement = null;

  @Input() containerId: string = null;
  public amountTypes = null;
  public categories: Category[] = [];
  public containerItems: ContainerItem[] = [];


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
      this.item = data.item;
      this.isCreate = data.isCreate;
      this.containerId = data.containerId;
    }
    this.amountTypes = AmountTypes
      .map(key => {
        return { value: key };
      });
  }

  ngOnInit(): void {

    this.dataService.loadCategories().subscribe();
    this.dataService.loadContainerItems().subscribe();

    this.dataService
      .getCategories()
      .subscribe(items => this.categories = items);

    this.dataService
      .getContainerItems()
      .subscribe(items => this.containerItems = items);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  onContainerItemChange() {
    if (this.item.ContainerItemId) {
      const cItem = this.containerItems
        .find(s => s.Id === this.item.ContainerItemId);

      this.item.Name = cItem.Name;
      this.item.Description = cItem.Description;
      this.item.Image = cItem.Image;
      this.item.Amount = (cItem.CurrentAmount - cItem.Amount) * -1;
      this.item.CategoryId = cItem.CategoryId;
    }
  }

  compareBase(o1: Base, o2: Base) {
    return o1._id === o2._id;
  }

  fileChange(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.ng2ImgMaxService.resize([file], 200, 200)
        .subscribe((result) => {
          const fr = new FileReader();
          fr.onload = (loadEvent: any) => {
            const base64 = loadEvent.target.result;
            this.item.Image = base64;
          };
          fr.readAsDataURL(result);
        });
    }
  }
}
