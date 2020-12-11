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
import { Register } from 'src/app/models/register';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public model: any = {};

  public loading = false;

  constructor(private userService: UserService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.userService.register(new Register({ Email: this.model.username, Password: this.model.password, Name: this.model.displayname }))
      .subscribe(
        token => {
          this.appService.openSnackbar('Ihr Account ist registriert worden.');
          this.router.navigate(['/login']);
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            this.appService.openSnackbar(err.error);
          }
        },
        () => { });
  }
}
