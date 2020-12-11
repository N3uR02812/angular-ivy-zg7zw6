import { Category } from '../models/category';
import { Container } from '../models/container';
import { ContainerItem } from '../models/containerItem';

export class ContainerItemViewModel extends ContainerItem {

  public Category: Category;
  public Container: Container;

  constructor(item: any) {
    super(item);
    if (item != null) {
      Object.keys(item).forEach(key => {
        this[key] = item[key];
      });
      this.Category = item.Category;
      this.Container = item.Container;
    }
    else {
      this.Category = null;
    }
  }

}
