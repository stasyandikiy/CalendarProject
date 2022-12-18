import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  commentControl: FormControl;
  typeAbsence: FormControl;
  dateBefore: FormControl;
  dateAfter: FormControl;

  constructor() { 
    this.commentControl = new FormControl('');
    this.typeAbsence = new FormControl('');
    this.dateBefore = new FormControl('');
    this.dateAfter = new FormControl('');
  }
  modalWindow:boolean = false;
  
  ngOnInit(): void {
    this.commentControl.valueChanges.subscribe((value)=>console.log(value));
    this.typeAbsence.valueChanges.subscribe((value)=>console.log(value));
    this.dateBefore.valueChanges.subscribe((value)=>console.log(value));
    this.dateAfter.valueChanges.subscribe((value)=>console.log(value));
  }

}
