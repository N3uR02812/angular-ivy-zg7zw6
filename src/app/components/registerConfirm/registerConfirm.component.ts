import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/appService';
import { UserService } from 'src/app/services/userService';
import { Register } from 'src/app/models/register';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registerConfirm',
  templateUrl: './registerConfirm.component.html',
  styleUrls: ['./registerConfirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {

  public model: any = {};

  public loading = true;
  public notFound = false;
  public code = "";

  constructor(private userService: UserService, private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap
      .pipe(switchMap(paramMap => {
        this.code = paramMap.get('code');
        return this.userService.registerCode(this.code)
      })).subscribe(
        ret => {
          this.appService.openSnackbar('Dein Account wurde nun aktiviert. Melde dich an um den Service zu nutzen.');
          this.router.navigate(["login"]);
        },
        err => {
          this.notFound = err.status === 404;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }
}
