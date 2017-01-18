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

  public isValid(): boolean {
    if (!this.name) {
      alert("Name is blank");
      return false;
    }

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!this.email || !EMAIL_REGEXP.test(this.email)) {
      alert("Please provide a valid email");
      return false;
    }

    if (!this.password || this.password.length < 8) {
      alert("Password should be over 8 characters");
      return false;
    }

    if (this.password != this.passwordConfirmation) {
      alert("Password doesn't match with confirmation");
      return false;
    }

    return true;
  }
}
