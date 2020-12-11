export class Register {

    Name: string;
    Email: string;
    Password: string;

    constructor(values: Register) {

        if (!values) { values = {} as Register; }

        this.Password = values.Password || '';
        this.Email = values.Email || '';
        this.Name = values.Name || '';
      }
}