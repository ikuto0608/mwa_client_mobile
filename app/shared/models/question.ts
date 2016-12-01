export class Question {
  public id: number
  public sentence: string
  public answers: Array<string>

  constructor() {
    this.answers = new Array<string>()
  }

}
