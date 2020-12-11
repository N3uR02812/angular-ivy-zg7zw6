import { Base } from './base';
import { Container } from './container';

import { Category } from './category';
import { UserBase } from './userBase';


export class ShoppingItem extends UserBase {

  public Amount: number;

  public AmountType: string;

  public Image: string;

  public ContainerItemId: string;

  public CategoryId: string;

  public IsChecked: boolean;

  constructor(values: ShoppingItem = null) {
    super(values);

    if (!values) { values = {} as ShoppingItem; }

    this.IsChecked = values.IsChecked || false;
    this.Amount = values.Amount || 0;
    this.AmountType = values.AmountType || 'Stück';
    this.Image = values.Image || null;
    this.ContainerItemId = values.ContainerItemId || null;
    this.CategoryId = values.CategoryId || null;
  }
}
