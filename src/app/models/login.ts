import { Base } from './base';


export class Login {
  public Password: string;
  public Email: string;

  constructor(values: Login) {

    if (!values) { values = {} as Login; }

    this.Password = values.Password || '';
    this.Email = values.Email || '';
  }
}