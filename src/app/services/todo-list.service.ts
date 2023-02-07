import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../shared/models/todo.model';

// const BASE_URL = 'https://app-6pchjqgmsq-uc.a.run.app';
const BASE_URL = 'http://localhost:5051';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private _http: HttpClient) {}

  getTodoList(): Observable<Todo[] | null> {
    return this._http.get<Todo[]>(`${BASE_URL}/api/v1/todos`);
  }

  deleteTodo(id: string): Observable<Todo> {
    const url = `${BASE_URL}/api/v1/todos/${id}`;
    return this._http.delete<Todo>(url);
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    const body = {
      task: todo.task,
      isDone: todo.isDone ? 1 : 0,
    };

    const url = `${BASE_URL}/api/v1/todos/${id}`;
    return this._http.put<Todo>(url, body);
  }

  addTodo(todo: Todo): Observable<Todo> {
    const url = `${BASE_URL}/api/v1/todos`;
    const body = {
      task: todo.task,
      isDone: todo.isDone ? 1 : 0,
    };
    return this._http.post<Todo>(url, body);
  }
}
