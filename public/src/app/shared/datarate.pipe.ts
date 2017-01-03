import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datarate'
})
export class DataratePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if (value === 0) {
      return '0 Byte';
    }
    let k = 1000; // or 1024 for binary
    let dm = 2;
    let sizes = ['bps', 'kbps', 'mbps', 'gbps'];
    let i = Math.floor(Math.log(value) / Math.log(k));
    return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
