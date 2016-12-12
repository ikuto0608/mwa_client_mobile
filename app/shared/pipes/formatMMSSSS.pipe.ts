import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'formatMMSSSS'})
export class FormatMMSSSSPipe implements PipeTransform {
  transform(mmssss: number = 0): string {
    let minutes = parseInt(String(mmssss / 60000));
    let millisecond = mmssss - (60000 * minutes)

    let minutesString = "00".substring(0, 2 - String(minutes).length) + String(minutes)
    let millisecondString = "00000".substring(0, 5 - String(millisecond).length) + String(millisecond)

    let colon = ":"
    return [
      minutesString, colon,
      millisecondString.slice(0, 2), colon,
      millisecondString.slice(2),
    ].join('')
  }
}
