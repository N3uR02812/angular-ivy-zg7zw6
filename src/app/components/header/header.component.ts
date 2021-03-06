import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/appService';
import { ContainerService } from 'src/app/services/containerService';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CategoryService } from 'src/app/services/categoryService';
import { Container } from 'src/app/models/container';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute,
    public appService: AppService) { }

  public show: boolean = false;
  public searchText: string = '';
  public label: string = '';

  public leftTemplate: TemplateRef<any> = null;
  public rightTemplate: TemplateRef<any> = null;

  public bottomLeftTemplate: TemplateRef<any> = null;
  public bottomRightTemplate: TemplateRef<any> = null;

  ngOnInit(): void {
    this.appService.Label
      .subscribe(label => this.label = label);

    this.appService.rightHeaderTemplate
      .subscribe(temp => this.rightTemplate = temp);

    this.appService.leftHeaderTemplate
      .subscribe(temp => this.leftTemplate = temp);

    this.appService.bottomRightHeaderTemplate
      .subscribe(temp => this.bottomRightTemplate = temp);
  }

  search() {
    this.appService.searchPressedSubject.next(this.searchText);
  }

  add() {
    this.appService.addPressedSubject.next();
  }

  reload() {
    this.appService.reloadPressedSubject.next();
  }

}
