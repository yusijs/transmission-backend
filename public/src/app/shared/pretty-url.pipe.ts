import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyUrl'
})
export class PrettyUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/[^\w\s!?]/g, '').replace(/\s/g, '_');
  }

}
