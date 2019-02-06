import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PresentListComponent } from './present-list/present-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { LineDiagramComponent } from './line-diagram/line-diagram.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent,
    HomeComponent,
    PresentListComponent,
    PaymentListComponent,
    LineDiagramComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DpDatePickerModule,
    NotifierModule.withConfig( {
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
