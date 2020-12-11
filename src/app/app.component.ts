import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from './services/userService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService) {
  }
}
