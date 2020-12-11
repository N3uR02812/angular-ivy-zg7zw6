import { Component, OnInit, Input, Inject } from "@angular/core";
import { Container } from "src/app/models/container";
import { ContainerItemsService } from "src/app/services/containerItemsService";
import { ContainerItem } from "src/app/models/containerItem";
import { AppService } from "src/app/services/appService";
import { ActivatedRoute, Router } from "@angular/router";
import { ContainerService } from 'src/app/services/containerService';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "app-containersDetails",
  templateUrl: "./containersDetails.component.html",
  styleUrls: ["./containersDetails.component.scss"]
})
export class ContainerDetailsComponent implements OnInit {

  @Input() item: ContainerItem = new ContainerItem();
  @Input() isCreate: boolean = false;

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

  ngOnInit(): void {
  }
}
