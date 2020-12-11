import { QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-listItem',
  templateUrl: './listItem.component.html',
  styleUrls: ['./listItem.component.scss']
})
export class ListItemComponent implements OnInit {

  private SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @Input() contentTemplate: TemplateRef<any> = null;
  @Input() infotemplate: TemplateRef<any> = null;
  @Input() actionsTemplate: TemplateRef<any> = null;
  @Input() actionsLeftTemplate: TemplateRef<any> = null;
  @Input() item: any = null;

  public optionsRightOffset = '-100%';
  public optionsLeftOffset = '-100%';
  public marginRight = '0';
  public marginLeft = '0';

  @ViewChild('optionsLeft', { static: false }) public optionsLeft: ElementRef;
  @ViewChild('optionsRight', { static: false }) public optionsRight: ElementRef;


  public showOptionsRight = false;
  public showOptionsLeft = false;

  public hasOptionsRight = false;
  public hasOptionsLeft = false;

  constructor() { }

  swipe(action: any) {
    if (action.type === this.SWIPE_ACTION.LEFT) {
      if (this.showOptionsLeft === true && this.hasOptionsLeft) {
        this.showOptionsLeft = false
        this.optionsLeftOffset = (this.optionsLeft.nativeElement.clientWidth * -1) + 'px';
        this.marginLeft = 0 + 'px';
      }
      else {
        this.showOptionsRight = true;
        this.optionsRightOffset = 0 + 'px';
        this.marginRight = (this.optionsRight.nativeElement.clientWidth) + 'px';
      }
    }
    else if (action.type === this.SWIPE_ACTION.RIGHT) {
      if (this.showOptionsRight === true && this.hasOptionsRight) {
        this.showOptionsRight = false
        this.optionsRightOffset = (this.optionsRight.nativeElement.clientWidth * -1) + 'px';
        this.marginRight = 0 + 'px';
      }
      else {
        this.showOptionsLeft = true;
        this.optionsLeftOffset = 0 + 'px';
        this.marginLeft = (this.optionsLeft.nativeElement.clientWidth) + 'px';
      }
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.optionsRightOffset = (this.optionsRight.nativeElement.clientWidth * -1) + 'px';
      this.optionsLeftOffset = (this.optionsLeft.nativeElement.clientWidth * -1) + 'px';

      this.hasOptionsRight = this.actionsTemplate != null;
      this.hasOptionsLeft = this.actionsLeftTemplate != null;
      // console.log(this.optionsRight.nativeElement.clientWidth);
    }, 0);

  }
}
