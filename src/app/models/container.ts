import { UserBase } from './userBase';


export class Container extends UserBase {

  public Capacity: number;

  constructor(values: Container) {
    super(values);

    if (!values) { values = {} as Container; }

    this.Capacity = values.Capacity || 0;
  }
}
