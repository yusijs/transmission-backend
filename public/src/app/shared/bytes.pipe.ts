import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {

  transform(value: number, precision?: any): any {
    if (isNaN(value) || !isFinite(value) || value === 0) {
      return 0;
    }
    if (typeof precision === 'undefined') {
      precision = 1;
      let units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
        number = Math.floor(Math.log(value) / Math.log(1024));
      return (value / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }
  }
}
