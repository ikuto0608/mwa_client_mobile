import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'times'})
export class TimesPipe implements PipeTransform {
  transform(num: number): Array<number> {
    let numArray = new Array<number>();
    for (let i = 0; i < num; i++) {
      numArray.push(i);
    }

    return numArray;
  }
}
