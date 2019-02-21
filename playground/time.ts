import moment from 'moment'

moment.locale('ru');
const date = moment();
date.add({ years: 1 }).subtract({ months: 9 });
console.log(date.format('h:mm a'));