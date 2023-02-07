export class User {
  constructor(
    public id?: string,
    public email?: string,
    public password?: string,
    public roles?: string,
    public token?: string
  ) {}
}
