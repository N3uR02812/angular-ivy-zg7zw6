import { Component, OnInit, Input, Inject } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AppService } from 'src/app/services/appService';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/categoryService';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import icons from '../../../helper/material-icons-list-json.json';
import { CategoryViewModel } from 'src/app/viewModels/categoryViewModel';

@Component({
  selector: 'app-categoriesDetails',
  templateUrl: './categoriesDetails.component.html',
  styleUrls: ['./categoriesDetails.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  @Input() item: CategoryViewModel = new CategoryViewModel(null);
  @Input() isCreate: boolean = false;

  public icons = icons;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService
  ) {
    if (data != null) {
      this.item = data.item;
      this.isCreate = data.isCreate;
    }
  }

  public getIcons() {

  }

  ngOnInit(): void {
  }
}
