import { ObjectId } from 'bson';

export class Base {

  public _id: string;

  public Name: string;

  public Description: string;

  constructor(values: Base) {

    if (!values) { values = {} as any; }

    this._id = values._id || new ObjectId().toHexString();
    this.Name = values.Name || 'Neu';
    this.Description = values.Description || '';
  }

  public get Id(): string {
    return this._id;
  }

  public set Id(id: string) {
    this._id = id;
  }
}
