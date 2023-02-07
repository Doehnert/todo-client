import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../services/users.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'task',
    'isTranslated',
    'isCompleted',
    'createdAt',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @Input() userId: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getHistoryList();
  }

  getHistoryList() {
    this._usersService.getUser(this.data.userId).subscribe({
      next: (res) => {
        let myHist: any = [];
        res.todos.map((task: any) => {
          task.histories.map((h: any) => {
            const myHistory = {
              id: h.id,
              isTranslated: h.isTranslated,
              task: h.task,
              isCompleted: h.isDone == 1 ? true : false,
              createdAt: h.createdAt,
            };
            myHist.push(myHistory);
          });
        });

        this.dataSource = new MatTableDataSource(myHist);
        console.log(
          '🚀 ~ file: user-history.component.ts:47 ~ UserHistoryComponent ~ this._usersService.getUser ~ myHist',
          myHist
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
}
