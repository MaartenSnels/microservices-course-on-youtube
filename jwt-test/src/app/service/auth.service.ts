import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

interface UserResponse {
  token: string;
}

interface UserRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly URL = 'http://localhost:8811/authenticate';

  constructor(private httpClient: HttpClient) {}

  authenticate(user: string, pwd: string): Observable<string> {
    const theUser: UserRequest = {username: user, password: pwd};
    return this.httpClient.post<UserResponse>(this.URL, theUser).pipe(
      tap(next => console.log(next)),
      map(next => next.token)
    );
  }

  getUser(): Observable<any> {
    const url = `${this.URL}/user`;
    return this.httpClient.get(url);
  }

  getRoles(): Observable<any> {
    const url = `${this.URL}/roles`;
    return this.httpClient.get(url);
  }

}
