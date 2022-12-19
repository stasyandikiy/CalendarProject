import { Component, Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { DateService } from './../shared/date.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {

  @Output() updateAbsenceArray = new EventEmitter();
  modalWindow:boolean = false;
    
  commentControl: FormControl;
  typeAbsence: FormControl;
  dateBefore: FormControl;
  dateAfter: FormControl;

  constructor(public dateService:DateService) { 
    this.commentControl = new FormControl('');
    this.typeAbsence = new FormControl('');
    this.dateBefore = new FormControl('');
    this.dateAfter = new FormControl('');
  }
  
  requestAbsence(){
    let dateStart = moment(this.dateBefore.value);
    let dateEnd = moment(this.dateAfter.value);
    let absenceDateCount = (dateEnd.diff(dateStart, 'days'));//Количество дней отгула
  
    if(absenceDateCount < 10 && absenceDateCount > -1 && this.typeAbsence.value!= ''){
      let count = 0;

      //Запись даты и вида отгула в массив      
      this.dateService.addAbsence(dateStart.format('YYYY-MM-DD'), this.typeAbsence.value);
      while (count < absenceDateCount) {
        let key = dateStart.add(1, 'd').format('YYYY-MM-DD');
        this.dateService.absenceDate[key] = this.typeAbsence.value;
        this.dateService.addAbsence(key, this.typeAbsence.value);
        count++;
      }
      this.updateAbsenceArray.emit(null);
    }
  }

}
