export class User {
  public id: number
  public name: string
  public email: string
  public password: string
  public passwordConfirmation: string

  static toUser(json: any): User {
    let user = new User()

    return (<any>Object).assign(user, json)
  }
}
