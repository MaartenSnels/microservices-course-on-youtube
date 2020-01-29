import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: string;
  pwd: string;
  token: string;
  theUser: any;
  roles: any;
  error: any;
  errorUser: any;
  errorRoles: any;

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }


  createToken() {
    this.token = undefined;
    this.error = undefined;
    this.theUser = undefined;
    this.roles = undefined;
    this.errorUser = undefined;
    this.roles = undefined;
    this.errorRoles = undefined;
    this.authService.authenticate(this.user, this.pwd).subscribe(next => {
      localStorage.setItem('token', next);
      return this.token = next;
    }, error => this.error = error);
  }

  getUser() {
    this.theUser = undefined;
    this.errorUser = undefined
    this.authService.getUser().subscribe(
      next => this.theUser = next,
      error => this.errorUser = error);
  }
  getRoles() {
    this.roles = undefined;
    this.errorRoles = undefined
    this.authService.getRoles().subscribe(
      next => this.roles = next,
      error => this.errorRoles = error);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.token = localStorage.getItem('token');
  }
}
