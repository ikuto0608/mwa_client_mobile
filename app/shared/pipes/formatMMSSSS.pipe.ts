import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'formatMMSSSS'})
export class FormatMMSSSSPipe implements PipeTransform {
  transform(mmssss: string = '000000'): string {
    let colon = ":"
    return [
      mmssss.slice(0, 2), colon,
      mmssss.slice(1, 3), colon,
      mmssss.slice(4, 6)
    ].join('')
  }
}
