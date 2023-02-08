import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from 'src/app/shared/models/login.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from '../../../environments/environment';

const LS_KEY: string = 'loggedUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  public get loggedUser(): User {
    let usu = localStorage[LS_KEY];
    return usu ? JSON.parse(localStorage[LS_KEY]) : null;
  }

  public set loggedUser(user: User) {
    localStorage[LS_KEY] = JSON.stringify(user);
  }

  logout() {
    delete localStorage[LS_KEY];
  }

  login(login: Login): Observable<User | null> {
    return this._http.post(`${environment.BASE_URL}/api/v1/auth/login`, login);
  }

  getUserRole(): string {
    if (this.loggedUser?.token) {
      const role = JSON.parse(atob(this.loggedUser.token.split('.')[1])).roles;
      console.log(
        '🚀 ~ file: login.service.ts:42 ~ LoginService ~ getUserRole ~ role',
        role
      );
      return role;
    }
    return '';
  }
}
