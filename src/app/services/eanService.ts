// import { Observable } from 'rxjs';
// import { Injectable, Inject } from '@angular/core';
// import { map } from 'rxjs/operators';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { APP_CONFIG } from '../helper/injectionTokens';
// import { String } from 'typescript-string-operations';
// import { EanItem } from '../models/EanItem';

// @Injectable()
// export class EanService {
//   public _setName: string = '';
//   private url: string = 'http://localhost:3000/';
//   public headers: HttpHeaders = new HttpHeaders();

//   constructor(public http: HttpClient, @Inject(APP_CONFIG) config: any) {
//     this.setName = 'Ean';
//     this.url = config.API_ENDPOINT;

//     const httpHeaderAccepts: string[] = [
//       'text/plain',
//       'application/json',
//       'text/json'
//     ];
//     const httpHeaderAcceptSelected: string | undefined = this.selectHeaderAccept(httpHeaderAccepts);
//     if (httpHeaderAcceptSelected !== undefined) {
//       this.headers = this.headers.set('Accept', httpHeaderAcceptSelected);
//     }
//   }

//   public selectHeaderAccept(accepts: string[]): string | undefined {
//     if (accepts.length === 0) {
//       return undefined;
//     }

//     const type = accepts.find((x: string) => this.isJsonMime(x));
//     if (type === undefined) {
//       return accepts[0];
//     }
//     return type;
//   }

//   public isJsonMime(mime: string): boolean {
//     const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
//     return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
//   }

//   public convert(obj: EanItem): EanItem {
//     return obj;
//   }

//   public set setName(setName: string) {
//     this._setName = setName;
//   }

//   public get Url() {
//     return this.url + this._setName + '/';
//   }

//   public get(code: string): Observable<EanItem> {
//     return this.http.get(String.Format(this.Url + code), { headers: this.headers })
//       .pipe(map((data: EanItem) => this.convert(data)));
//   }

// }