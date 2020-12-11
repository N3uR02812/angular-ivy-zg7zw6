import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/appService';
import { ContainerService } from 'src/app/services/containerService';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CategoryService } from 'src/app/services/categoryService';
import { Container } from 'src/app/models/container';
import { Category } from 'src/app/models/category';
import { UserService } from 'src/app/services/userService';
import { Login } from 'src/app/models/login';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model: any = {};

  public loading = false;

  constructor(private userService: UserService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(new Login({ Email: this.model.username, Password: this.model.password }))
      .subscribe(token => {
        localStorage.setItem('Authorization', 'Bearer ' + token);
        this.router.navigate(['../']);
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            this.appService.openSnackbar(err.error);
          }
          else {
            this.appService.openSnackbar(err.error);
          }

        });
  }
}
