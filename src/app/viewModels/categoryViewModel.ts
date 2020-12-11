import { Category } from '../models/category';

export class CategoryViewModel extends Category {
  constructor(item: Category) {
    super(item);
    if (item != null) {
      Object.keys(item).forEach(key => {
        this[key] = item[key];
      });
    }
  }
}
