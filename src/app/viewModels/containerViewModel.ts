import { Container } from '../models/container';

export class ContainerViewModel extends Container {

  public ContainerItemsCount: number;

  constructor(item: Container) {
    super(item);
    if (item != null) {
      Object.keys(item).forEach(key => {
        this[key] = item[key];
      });
    }
    this.ContainerItemsCount = 0;
  }
}
