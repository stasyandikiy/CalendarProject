import { Component, OnInit } from '@angular/core';
import { DateService } from './../shared/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public dateService:DateService) { }

  modalWindow: boolean = false;

  go(dir:number){
    this.dateService.changeMonth(dir);
  }
  today(){
    this.dateService.changeDate(moment())
  }
}
