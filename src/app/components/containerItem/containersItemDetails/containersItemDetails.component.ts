import { Component, OnInit, Input, ViewChild, Inject, ElementRef } from '@angular/core';
import { ContainerItem } from 'src/app/models/containerItem';
import { AppService } from 'src/app/services/appService';
import { ActivatedRoute, Router } from '@angular/router';
import { AmountTypes } from 'src/app/helper/amountType';
import { Ng2ImgMaxService } from 'ng2-img-max/dist/src/ng2-img-max.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';
import { ContainerItemViewModel } from 'src/app/viewModels/containerItemViewModel';
import { Container } from 'src/app/models/container';
import { DataService } from 'src/app/services/dataService';
import { Base } from 'src/app/models/base';
import { BehaviorSubject } from 'rxjs';
import { BarcodeFormat } from '@zxing/library';
import { HttpClient } from '@angular/common/http';
// import { EanService } from 'src/app/services/eanService';

@Component({
  selector: 'app-containersItemDetails',
  templateUrl: './containersItemDetails.component.html',
  styleUrls: ['./containersItemDetails.component.scss']
})
export class ContainerItemsDetailsComponent implements OnInit {
  @Input() item: ContainerItemViewModel = new ContainerItemViewModel(null);
  @Input() isCreate: boolean = false;
  @Input() useCode: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() containerId: string = null;

  public availableDevices: MediaDeviceInfo[];
  public currentDevice: MediaDeviceInfo = null;

  public formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  public amountTypes = null;
  public categories: Category[] = [];
  public containers: Container[] = [];

  public hasDevices: boolean;
  public hasPermission: boolean;

  public torchEnabled = false;
  public torchAvailable$ = new BehaviorSubject<boolean>(false);
  public tryHarder = false;

  public ean: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    // public eanService: EanService,
    public dataService: DataService,
    public containerService: CategoryService,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) {
    if (data != null) {
      this.item = data.item;
      this.isCreate = data.isCreate;
      this.useCode = data.useCode;
      this.containerId = data.containerId;
    }
    this.amountTypes = AmountTypes
      .map(key => {
        return { value: key };
      });
  }

  ngOnInit(): void {

    this.dataService.loadCategories().subscribe();
    this.dataService.loadContainers().subscribe();

    this.dataService
      .getCategories()
      .subscribe(items => this.categories = items);

    this.dataService
      .getContainers()
      .subscribe(items => this.containers = items);

  }


  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  amountChange(item: ContainerItem) {
    if (this.item.Amount < this.item.CurrentAmount) {
      if (this.isCreate) {
        this.item.Amount = this.item.CurrentAmount;
      }
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.useCode = false;
    // this.eanService
    //   .get(resultString)
    //   .subscribe(result => {
    //     this.item.Name = result.Name;
    //     this.item.Description = result.Detailname;
    //   });
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }


  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }


  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
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
