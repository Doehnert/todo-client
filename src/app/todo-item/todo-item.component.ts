import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: Todo = {};
  @Output() onDeleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() onToggleIsDone: EventEmitter<Todo> = new EventEmitter();
  @Output() onUpdateTodo: EventEmitter<Todo> = new EventEmitter();
  faTimes = faTimes;
  faEdit = faEdit;

  onUpdate(todo: Todo) {
    this.onUpdateTodo.emit(todo);
  }

  onDelete(todo: Todo) {
    this.onDeleteTodo.emit(todo);
  }

  onToggle(todo: Todo) {
    this.onToggleIsDone.emit(todo);
  }
}
