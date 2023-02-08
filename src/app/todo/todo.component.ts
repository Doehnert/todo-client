import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { CoreService } from '../core/core.service';
import { TodoListService } from '../services/todo-list.service';
import { Todo } from '../shared/models/todo.model';
import { TodoAddEditComponent } from '../todo-add-edit/todo-add-edit.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  todos: Todo[] = [];

  constructor(
    private loginService: LoginService,
    private todoService: TodoListService,
    private _dialog: MatDialog,
    private router: Router,
    private todoListService: TodoListService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  deleteTodo(todo: Todo) {
    if (todo?.id) {
      this.todoService.deleteTodo(todo.id).subscribe({
        next: () => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        },
        error: console.log,
      });
    }
  }

  toggleIsDone(todo: Todo) {
    console.log(
      '🚀 ~ file: todo.component.ts:42 ~ TodoComponent ~ toggleIsDone ~ todo',
      todo
    );
    todo.isDone = !todo.isDone;
    if (todo.id) {
      this.todoListService.updateTodo(todo.id, todo).subscribe({
        next: () => {
          this._coreService.openSnackBar('Todo updated');
        },
        error: console.error,
      });
    }
  }

  getTodoList() {
    this.todoService.getTodoList().subscribe({
      next: (res) => {
        if (res) {
          this.todos = res;
        }
      },
      error: console.log,
    });
  }

  openUpdateTodoForm(data: Todo) {
    const dialogRef = this._dialog.open(TodoAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTodoList();
        }
      },
    });
  }

  openAddTodoForm() {
    const dialogRef = this._dialog.open(TodoAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTodoList();
        }
      },
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
