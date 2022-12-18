import { Component, OnInit } from '@angular/core';
import { DateService } from './../shared/date.service';
import * as moment from 'moment';

interface Day {
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean
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




  calendar: Week[] | undefined

  constructor(public dateService: DateService) { }

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
  }//Выбраная дата



}
