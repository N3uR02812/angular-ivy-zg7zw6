import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/appService';
import { UserService } from 'src/app/services/userService';
import { Register } from 'src/app/models/register';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-inviteConfirm',
  templateUrl: './inviteConfirm.component.html',
  styleUrls: ['./inviteConfirm.component.scss']
})
export class InviteConfirmComponent implements OnInit {

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
        return this.userService.inviteCode(this.code)
      })).subscribe(
        ret => {
          this.router.navigate(["groups"]);
        },
        err => {
          this.notFound = err.status === 404;
          this.loading = false;
        },
        () => {
          console.log("Close");
          this.loading = false;
        }
      );
  }
}
