import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

@Pipe({
    name: 'FromNowTime',
    standalone: true
})
export class fromNowTimeFormat implements PipeTransform {
    transform(value: String): String {
        return moment(value.toString()).fromNow();
    }


}