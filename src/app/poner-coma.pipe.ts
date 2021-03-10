import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ponerComa"
})
export class PonerComaPipe implements PipeTransform {
  transform(value: any): any {
    if (value.length > 0) {
      return `${value},`;
    }
  }
}
