import { UserBase } from './userBase';


export class Category extends UserBase {

  public Logo: string;

  public Color: string;

  constructor(values: Category) {
    super(values);

    if (!values) { values = {} as Category; }

    this.Logo = values.Logo || '';
    this.Color = values.Color || '#ffffff';

  }
}
