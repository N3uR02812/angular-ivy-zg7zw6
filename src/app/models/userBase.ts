import { Base } from './base';


export class UserBase extends Base {

  public CreatedById: string;
  public EditedById: string;
  public GroupId: string;

  constructor(values: UserBase = null) {
    super(values);

    if (!values) { values = {} as UserBase; }
    
    this.CreatedById = values.CreatedById || null;
    this.EditedById = values.EditedById || null;
    this.GroupId = values.GroupId || null;
  }
}
