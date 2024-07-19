import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'HoursFormat',
    standalone: true
})
export class HoursFormatPipe implements PipeTransform {
    transform(value: String): String {
        return moment(value.toString()).format('HH:mm');
    }


}