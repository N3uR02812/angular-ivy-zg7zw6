export class EanItem {

  public Name: string;

  public Detailname: string;

  constructor(values: EanItem) {

    if (!values) { values = {} as any; }

    this.Name = values.Name || 'Neu';
    this.Detailname = values.Detailname || '';
  }
}
