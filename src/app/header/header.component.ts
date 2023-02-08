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

  public adminSection: boolean;

  constructor(
    private loginService: LoginService,
    private todoService: TodoListService,
    private _dialog: MatDialog,
    public router: Router
  ) {
    this.adminSection = false;
  }

  addTodoForm() {
    this.openAddTodoForm.emit();
  }

  signout() {
    this.logout.emit();
  }

  toggleSection() {
    if (this.router.url === '/admin') {
      this.adminSection = false;
      this.router.navigate(['/home']);
    } else {
      this.adminSection = true;
      this.router.navigate(['/admin']);
    }
  }
}
