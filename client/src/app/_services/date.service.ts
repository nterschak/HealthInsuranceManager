import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  createDateFromISOString(input: Date | string) {
    return new Date(input + 'T00:00:00')
  }

  getLocalDateString(input: Date) {
    let date = new Date(input);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  }
}