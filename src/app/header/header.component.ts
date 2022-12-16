import { Component, OnInit } from '@angular/core';
import { DateService } from './../shared/date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dateService:DateService) { }

  ngOnInit(): void {
  }

  go(dir:number){
    this.dateService.changeMonth(dir);
  }
}
