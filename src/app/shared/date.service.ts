import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})

export class DateService{
    public date:moment.Moment = moment();
        
    changeMonth(dir: number){
        this.date.add(dir, "month")
    }

}