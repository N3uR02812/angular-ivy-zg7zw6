import { Base } from './base';
import { UserBase } from './userBase';


export class Group extends UserBase {

  constructor(values: Group) {
    
    super(values);

    if (!values) { values = {} as Group; }
  }
}