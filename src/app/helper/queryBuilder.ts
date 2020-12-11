export class QueryBuilder {
  static getQueryAllInObj(obj: any, value: any): any {
    const keys = Object.keys(obj);
    const outObj = { filter: '' };
    let str = '{"$or":[';

    if (!obj) {
      return '';
    }

    str += keys
      .filter(key => key.toLowerCase().indexOf('id') === -1)
      .map(key => {
        const strObj = {};
        strObj[key] = '/^' + value + '/';
        return JSON.stringify(strObj);
      })
      .join(',');

    str += ']}';
    outObj.filter = str;

    return outObj;
  }
}
