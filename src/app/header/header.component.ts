import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { TodoListService } from '../services/todo-list.service';
import { TodoAddEditComponent } from '../todo-add-edit/todo-add-edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output('openAddTodoForm') openAddTodoForm: EventEmitter<any> =
    new EventEmitter();
  @Output('logout') logout: EventEmitter<any> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private todoService: TodoListService,
    private _dialog: MatDialog,
    private router: Router
  ) {}

  addTodoForm() {
    this.openAddTodoForm.emit();
  }

  signout() {
    this.logout.emit();
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
