import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { History } from '../shared/models/history.model';
import { Signup } from '../shared/models/signup.model';
import { User } from '../shared/models/user.model';

// const BASE_URL = 'https://app-6pchjqgmsq-uc.a.run.app';
const BASE_URL = 'http://localhost:5051';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<User[] | null> {
    const url = `${BASE_URL}/auth`;
    return this._http.get<User[]>(url);
  }

  getUser(userId: string): Observable<any | null> {
    const url = `${BASE_URL}/auth/${userId}`;
    return this._http.get<any>(url);
  }

  createUser(signup: Signup): Observable<Partial<User> | null> {
    const url = `${BASE_URL}/auth/signup`;
    return this._http.post<Partial<User>>(url, signup);
  }
}
