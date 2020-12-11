import { Container } from '../models/container';
import { Group } from '../models/group';

export class GroupViewModel extends Group {

  public userMails: string[] = [];

  constructor(item: Group) {
    super(item);
    if (item != null) {
      Object.keys(item).forEach(key => {
        this[key] = item[key];
      });
    }
    this.userMails = [];
  }
}
