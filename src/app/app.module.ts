import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MomentPipe } from './shared/moment.pipe';
import { HeaderComponent } from './header/header.component';
import { AbsenceComponent } from './absence/absence.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AbsenceComponent,
    CalendarComponent,
    MomentPipe
    
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
