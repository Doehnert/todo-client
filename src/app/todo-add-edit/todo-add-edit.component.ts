import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { TodoListService } from '../services/todo-list.service';
import { environment } from '../../environments/environment';

type TLanguage = {
  value: string;
  viewValue: string;
};

const headersRequest = {
  'Content-Type': 'text/plain',
};

@Component({
  selector: 'app-todo-add-edit',
  templateUrl: './todo-add-edit.component.html',
  styleUrls: ['./todo-add-edit.component.scss'],
})
export class TodoAddEditComponent implements OnInit {
  languages: TLanguage[] = [
    { value: 'en', viewValue: 'English' },
    { value: 'es', viewValue: 'Spanish' },
    { value: 'fr', viewValue: 'French' },
    { value: 'ja', viewValue: 'Japanece' },
    { value: 'pt', viewValue: 'Portuguese' },
  ];
  todoForm: FormGroup;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private todoService: TodoListService,
    private _dialogRef: MatDialogRef<TodoAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _http: HttpClient
  ) {
    this.todoForm = this._fb.group({
      task: ['', Validators.required],
      isDone: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.todoForm.patchValue(this.data);
  }

  translate(lng: string) {
    this._http
      .post(`${environment.BASE_URL}/gcp-translate/translate`, {
        todoId: this?.data?.id,
        text: this.todoForm.value.task,
        to: lng,
      })
      .subscribe({
        next: (res: any) => {
          console.log(
            '🚀 ~ file: todo-add-edit.component.ts:72 ~ TodoAddEditComponent ~ translate ~ res',
            res
          );
          // this.todoForm.value.task = res.translation;
          this.todoForm.controls['task'].setValue(res.translation);
        },
        error: console.error,
      });
  }

  onFormSubmit() {
    this.loading = true;
    if (this.todoForm.valid) {
      const body = {
        task: this.todoForm.value.task,
        isDone: this.todoForm.value.isDone ? 1 : 0,
      };
      if (this.data) {
        console.log(
          '🚀 ~ file: todo-add-edit.component.ts:41 ~ TodoAddEditComponent ~ onFormSubmit ~ this.data',
          this.data
        );
        this.todoService
          .updateTodo(this.data.id, this.todoForm.value)
          .subscribe({
            next: () => {
              this._coreService.openSnackBar('Todo updated');
              this._dialogRef.close(true);
              this.loading = false;
            },
            error: (err) => {
              console.error(err);
              this.loading = false;
            },
          });
      } else {
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('Todo added');
            this._dialogRef.close(true);
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          },
        });
      }
    }
  }
}
