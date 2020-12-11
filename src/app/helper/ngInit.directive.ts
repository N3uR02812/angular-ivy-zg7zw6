import {Directive, Input, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirective {

  @Input() isLast: boolean;

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
      setTimeout(() => this.initEvent.emit(), 10);
  }
}
