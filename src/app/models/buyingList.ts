import { Base } from './base';
import { ContainerItem } from './containerItem';

export class BuyingList extends Base {

  public items: ContainerItem[];

  constructor(values: BuyingList) {
    super(values);

    if (!values) { values = {} as BuyingList; }

  }
}