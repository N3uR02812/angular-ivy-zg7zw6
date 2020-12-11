import { NgModule, ApplicationModule, Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ODataModule, ODataService } from 'odata-v4-ng';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContainerItemsComponent } from './components/containerItem/containersItems/containersItems.component';
import { AppService } from './services/appService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ContainerItemsDetailsComponent } from './components/containerItem/containersItemDetails/containersItemDetails.component';
import { DomSanitizerPipe } from './pipes/blobToImg.pipe';
import { ListItemComponent } from './components/listItem/listItem.component';
import { PercentagePipe } from './pipes/percentage.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgInitDirective } from './helper/ngInit.directive';
import { ContainerDetailsComponent } from './components/container/containersDetails/containersDetails.component';
import { ContainersComponent } from './components/container/containers/containers.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { CategoryDetailsComponent } from './components/category/categoriesDetails/categoriesDetails.component';
import { TransparencyPipe } from './pipes/transparency.pipe';
import { ServiceModule } from './services/service.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/httpInterceptor';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from './services/dataService';
import { ShoppingItemsComponent } from './components/shoppingItem/shoppingItems/shoppingItems.component';
import { ShoppingItemsDetailsComponent } from './components/shoppingItem/shoppingItemDetails/shoppingItemDetails.component';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { ShoppingItemMoveComponent } from './components/shoppingItem/shoppingItemMove/shoppingItemMove.component';
import { GroupsComponent } from './components/group/groups/groups.component';
import { GroupDetailsComponent } from './components/group/groupsDetails/groupsDetails.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatChipsModule} from '@angular/material/chips'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InviteConfirmComponent } from './components/inviteConfirm/inviteConfirm.component';
import { RegisterConfirmComponent } from './components/registerConfirm/registerConfirm.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BottomComponent } from './components/bottom/bottom.component';
import { ListComponent } from './components/list/list.component';
import { environment } from './../environments/environment';
import { ContainerItemsMoveComponent } from './components/containerItem/containerItemMove/containerItemMove.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// custom configuration Hammerjs
@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    // I will only use the swap gesture so
    // I will deactivate the others to avoid overlaps
    pinch: { enable: false },
    rotate: { enable: false },
    pan: { direction: Hammer.DIRECTION_VERTICAL },
  } as any;
  
  options = {
    touchAction: 'pan-y'
  }
}


@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    GroupsComponent,
    GroupDetailsComponent,
    HeaderComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    MainComponent,
    ContainerItemsComponent,
    ContainerDetailsComponent,
    ContainerItemsMoveComponent,
    ContainerItemsDetailsComponent,
    ShoppingItemsComponent,
    InviteConfirmComponent,
    RegisterConfirmComponent,
    ShoppingItemsDetailsComponent,
    ShoppingItemMoveComponent,
    RegisterComponent,
    LoginComponent,
    BottomComponent,
    PageNotFoundComponent,
    ModalComponent,
    DomSanitizerPipe,
    PercentagePipe,
    TransparencyPipe,
    ListComponent,
    ListItemComponent,
    NgInitDirective,
    DashboardComponent,
  ],
  imports: [
    ZXingScannerModule,
    HammerModule,
    //PerfectScrollbarModule,
    Ng2ImgMaxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    ApplicationModule,
    RouterModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatMenuModule,
    AppRoutingModule,
    //ODataModule,
    FormsModule,
    MatCheckboxModule,
    //MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDatepickerModule,
    //MatProgressBarModule,
    //MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    //MatSliderModule,
    MatToolbarModule,
    //NgScrollbarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    MaterialFileInputModule,
    ServiceModule.forRoot(environment)
  ],
  providers: [AppService, DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy }, {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    GroupDetailsComponent,
    CategoryDetailsComponent,
    ContainerDetailsComponent,
    ContainerItemsMoveComponent,
    ShoppingItemsDetailsComponent,
    ShoppingItemMoveComponent,
    ContainerItemsDetailsComponent]
})
export class AppModule { }
