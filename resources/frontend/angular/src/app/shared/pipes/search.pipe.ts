import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(value: any, arg: any = ''): any {
    if (arg === '') {
      return value;
    }
    const cadena = arg;
    const resultPosts = [];
    if (value) {
      value.filter((x) => {
        for (const key in x) {
          if (typeof x[key] === 'string') {
            const word: string = x[key];
            if (word.toLowerCase().indexOf(cadena.toLowerCase()) > -1) {
              resultPosts.push(x);
              break;
            }
          }
          if (typeof x[key] === 'number') {
            const word: string = x[key].toString();
            if (word.toLowerCase().indexOf(cadena.toLowerCase()) > -1) {
              resultPosts.push(x);
              break;
            }
          }
        }
      });
    }
    return resultPosts;
  }
}
