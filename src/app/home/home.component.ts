import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { Todo } from '../shared/models/todo.model';
import { MatDialog } from '@angular/material/dialog';
import { TodoAddEditComponent } from '../todo-add-edit/todo-add-edit.component';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(TodoComponent, { static: true }) child!: TodoComponent;

  constructor(
    private loginService: LoginService,
    private todoService: TodoListService,
    private _dialog: MatDialog,
    private router: Router
  ) {}

  openAddTodoForm() {
    this.child.openAddTodoForm();
  }

  logout() {
    this.child.logout();
  }
}
