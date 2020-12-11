export class ButtonInfo {
  public buttonClass: string = null;
  public buttonSymbol: string = null;
  public action: (item: any) => void = (item: any) => {};

  constructor(buttonClass: string, buttonSymbol: string, action: (item: any) => void) {
    this.buttonClass = buttonClass;
    this.buttonSymbol = buttonSymbol;
    this.action = action;
  }
}
