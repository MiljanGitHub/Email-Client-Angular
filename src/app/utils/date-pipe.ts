import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datePipe' })
export class DatePipe {
    transform(utcDate: string): string {
        if (utcDate != null || utcDate != undefined){
            var human_readable_date = new Date(parseFloat(utcDate));
            return  human_readable_date.getDate() + "-" + (human_readable_date.getMonth()+1) + "-" + human_readable_date.getFullYear();
        }
        return '-';
      }
}