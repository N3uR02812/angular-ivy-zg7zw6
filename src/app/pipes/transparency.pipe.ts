
import { Pipe, PipeTransform } from '@angular/core';
import Color from 'color';

@Pipe({
  name: 'transparency'
})
export class TransparencyPipe implements PipeTransform {

  constructor() { }

  public transform(color: string, alpha: number): string {
    return Color(color).alpha(alpha).toString();
  }
}
