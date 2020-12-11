import { Base } from '../models/base';

export class ViewModelBase extends Base {

  public isDeleted: boolean;
  public isCreated: boolean;
  public isEdited: boolean;

  constructor() {
    super(null);
    this.isDeleted = false;
    this.isCreated = false;
    this.isEdited = false;
  }
}
