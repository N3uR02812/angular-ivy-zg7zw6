import { Base } from './base';

export class User extends Base {

    public Password: string;
    public Email: string;

    constructor(values: User) {

        super(values);

        if (!values) { values = {} as User; }

        this.Password = values.Password || '';
        this.Email = values.Email || '';
    }
}