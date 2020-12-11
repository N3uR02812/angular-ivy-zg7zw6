import { Component, OnInit, Input, ViewChild, Inject, ElementRef } from '@angular/core';
import { AppService } from 'src/app/services/appService';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max/dist/src/ng2-img-max.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';
import { ContainerItemViewModel } from 'src/app/viewModels/containerItemViewModel';
import { Container } from 'src/app/models/container';
import { DataService } from 'src/app/services/dataService';
// import { EanService } from 'src/app/services/eanService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-containerItemMove',
  templateUrl: './containerItemMove.component.html',
  styleUrls: ['./containerItemMove.component.scss']
})
export class ContainerItemsMoveComponent implements OnInit {
  @Input() item: ContainerItemViewModel = new ContainerItemViewModel(null);
  @Input() target: string = '';

  public categories: Category[] = [];
  public containers: Container[] = [];
  public subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    // public eanService: EanService,
    public dataService: DataService,
  ) {
    if (data != null) {
      this.item = data.item;
      this.target = data.target;
    }
  }

  ngOnInit(): void {

    this.subscriptions.push(this.dataService.loadCategories().subscribe());
    this.subscriptions.push(this.dataService.loadContainers().subscribe());

    this.subscriptions.push(this.dataService
      .getCategories()
      .subscribe(items => {
        this.categories = items;
        this.item.Category = this.categories.find(c => c.Id === this.item.CategoryId);
      }));

    this.subscriptions.push(this.dataService
      .getContainers()
      .subscribe(items => {
        this.containers = items
      }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}
