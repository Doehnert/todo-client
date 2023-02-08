import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { History } from '../shared/models/history.model';
import { Signup } from '../shared/models/signup.model';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  toggleUserRole(userId: string): Observable<User | null> {
    const url = `${environment.BASE_URL}/auth/toggle/${userId}`;
    return this._http.get<User>(url);
  }

  getUsers(): Observable<User[] | null> {
    const url = `${environment.BASE_URL}/auth`;
    return this._http.get<User[]>(url);
  }

  getUser(userId: string): Observable<any | null> {
    const url = `${environment.BASE_URL}/auth/${userId}`;
    return this._http.get<any>(url);
  }

  createUser(signup: Signup): Observable<Partial<User> | null> {
    const url = `${environment.BASE_URL}/auth/signup`;
    return this._http.post<Partial<User>>(url, signup);
  }
}
