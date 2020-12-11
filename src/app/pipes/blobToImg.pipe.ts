import { Pipe, PipeTransform } from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl
} from "@angular/platform-browser";

@Pipe({
  name: "sanitizer"
})
export class DomSanitizerPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(base64: string):
  SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }
}
