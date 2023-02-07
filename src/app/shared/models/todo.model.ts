export class Todo {
  constructor(
    public id?: string,
    public task?: string,
    public isDone?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date
  ) {}
}
