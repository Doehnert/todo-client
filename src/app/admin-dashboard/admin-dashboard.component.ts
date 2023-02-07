import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { CoreService } from '../core/core.service';
import { UsersService } from '../services/users.service';
import { TodoAddEditComponent } from '../todo-add-edit/todo-add-edit.component';
import { TodoComponent } from '../todo/todo.component';
import { UserHistoryComponent } from '../user-history/user-history.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(TodoComponent, { static: true }) child!: TodoComponent;

  displayedColumns: string[] = ['id', 'email', 'roles', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _usersService: UsersService,
    private _coreService: CoreService,
    private loginService: LoginService,
    private router: Router
  ) {}

  openHistoryDialog(userId: string) {
    const dialogRef = this._dialog.open(UserHistoryComponent, {
      data: {
        userId: userId,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsersList();
        }
      },
    });
  }

  openAddTodoForm() {
    const dialogRef = this._dialog.open(TodoAddEditComponent);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this._usersService.getUsers().subscribe({
      next: (res) => {
        if (res) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: string) {
    console.log(id);
  }

  openEditForm(data: any) {
    // const dialogRef = this._dialog.open(EmpAddEditComponent, {
    //   data,
    // });
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getEmployeeList();
    //     }
    //   },
    // });
  }
}
