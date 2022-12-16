import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})

export class DataService{
    public date = moment();
    
}