import { Component, OnInit, Input } from '@angular/core';
import { DateService } from './../shared/date.service';
import * as moment from 'moment';

interface Day {
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean,
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  modalDelete: boolean = false;
  vacationWindow:boolean = false;
  sickWindow:boolean = false;

  public deleteDay = {
      date: '',
      comment: '',
      type: ''
  }//дата кликнутая для удаленая отгула

  setCloseModal(i:any) {
    this.modalDelete=!this.modalDelete;
    this.update()
  }

  constructor(public dateService: DateService) {
  }

  absenceDateKeys:any = this.dateService.absenceDate.reduce((container:any, obj:any) => [...container, ...Object.keys(obj)], []);//все ключи дат
  absenceType = this.dateService.absenceDate.flatMap((obj:any) => Object.values(obj));//все значения
  DateVacation: any = [];//дни отпуска
  DateSick: any = [];//дни больничного
  
  calendar: Week[] | undefined;

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  generate(now: moment.Moment){
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');
   
    const date = startDay.clone().subtract(1, 'day');

    const calendar = [];

    while(date.isBefore(endDay, 'day')){
      calendar.push({
        days: Array(7)
        .fill(0)
        .map(()=>{
          const value = date.add(1, 'days').clone();
          const active = moment().isSame(value, 'date');
          const disabled = !now.isSame(value, 'month');
          const selected = now.isSame(value, 'date');
          
          return{
            value, active, disabled, selected
          }
        })
      })
    }
    
    this.calendar = calendar;

  }//Генерация календаря

  select(day: moment.Moment) {
    this.dateService.changeDate(day); 
    this.modalDelete=!this.modalDelete;
    //Информация в обьект для модального окна удаления
    this.deleteDay.date = day.format('YYYY-MM-DD');
    this.dateService.absenceDate.forEach((el:any) => {
      if(el[this.deleteDay.date]){
        this.deleteDay.comment = el.commentar;
        let key = String(day.format('YYYY-MM-DD'))
        this.deleteDay.type = el[key];
      }
    });
  }//Выбраная дата

  update(){
    this.absenceDateKeys = [];
    this.absenceDateKeys = this.dateService.absenceDate.reduce((container:any, obj:any) => [...container, ...Object.keys(obj)], []);
    this.absenceDateKeys = this.absenceDateKeys.filter((x:any, i:any) => this.absenceDateKeys.indexOf(x) === i);

    this.absenceType = {};
    this.absenceType = this.dateService.absenceDate.flatMap((obj:any) => Object.values(obj));

    this.DateVacation = [];
    this.DateSick = [];
    this.absenceType.forEach((el:any)=> {
      if(el == 'Vacation'){
        this.DateVacation.push(el);
      }else if(el == 'Sick'){
        this.DateSick.push(el);
      }
    });
  } 
}
