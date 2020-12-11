
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  constructor() { }

  public transform(currentAmount: any, maxAmount: any): number {
      if (maxAmount === 0) {
        return 0;
      }
      return currentAmount / maxAmount * 100;
  }
}
