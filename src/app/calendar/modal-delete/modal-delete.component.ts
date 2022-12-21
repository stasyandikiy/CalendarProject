import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DateService } from './../../shared/date.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {

  @Input() deleteDay:any = {};
  @Output()
  close: EventEmitter<number> = new EventEmitter<number>();

  commentControl: string = '';
  typeAbsence: string = '';
  
  constructor(public dateService: DateService) {}

  deleteAbsence(){
    let key = String(this.deleteDay.date);
    let index;
    this.dateService.absenceDate.forEach((el:any) => {
        if(el[key]){
          index = this.dateService.absenceDate.indexOf(el);
          this.dateService.absenceDate.splice(index, 1);
        }
    });
    this.close.emit();

  }

}
