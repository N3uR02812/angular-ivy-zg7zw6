import { Base } from './base';
import { Container } from './container';

import { Category } from './category';
import { UserBase } from './userBase';
import { ShoppingItem } from './shoppingItem';
import { ShoppingItemMoveViewModel } from '../viewModels/shoppingItemMoveViewModel';


export class ContainerItem extends UserBase {


  public Attributes: string;

  public Amount: number;

  public CurrentAmount: number;

  public ExpireDate?: Date;

  public AmountType: string;

  public Image: string;

  public ContainerId: string;

  public CategoryId: string;

  constructor(values: ContainerItem = null) {
    super(values);

    if (!values) { values = {} as ContainerItem; }

    this.Attributes = values.Attributes || '';
    this.Amount = values.Amount || 0;
    this.CurrentAmount = values.CurrentAmount || 0;
    this.ExpireDate = values.ExpireDate || null;
    this.AmountType = values.AmountType || 'Stück';
    this.Image = values.Image || null;
    this.ContainerId = values.ContainerId || null;
    this.CategoryId = values.CategoryId || null;
  }

  public static createFromShoppingItem(item: ShoppingItemMoveViewModel): ContainerItem {
    const outItem = new ContainerItem();

    outItem.Name = item.Name;
    outItem.Description = item.Description;
    outItem.Amount = item.Amount;
    outItem.AmountType = item.AmountType;
    outItem.CurrentAmount = item.Amount;
    outItem.ContainerId = item.ContainerId;
    outItem.Image = item.Image;
    outItem.CategoryId = item.CategoryId;

    return outItem;
  }
}
