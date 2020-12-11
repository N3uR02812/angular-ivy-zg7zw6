import { Category } from '../models/category';
import { ShoppingItem } from '../models/shoppingItem';
import { ContainerItem } from '../models/containerItem';

export class ShoppingItemMoveViewModel extends ShoppingItem {

  public Category: Category;
  public ContainerItem: ContainerItem;
  public ContainerId: string;

  constructor(item: any) {
    super(item);
    if (item != null) {
      Object.keys(item).forEach(key => {
        this[key] = item[key];
      });
      this.Category = item.Category;
      this.ContainerItem = item.ContainerItem;
    }
    else {
      this.Category = null;
      this.ContainerItem = null;
    }
  }

}
