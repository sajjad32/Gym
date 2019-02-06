import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import {UserListComponent} from './user-list/user-list.component';
import {HomeComponent} from './home/home.component';
import {PresentListComponent} from './present-list/present-list.component';
import {PaymentListComponent} from './payment-list/payment-list.component';
import {LineDiagramComponent} from './line-diagram/line-diagram.component';

const routes: Routes = [
  // { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'today', component: PresentListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'payments', component: PaymentListComponent },
  { path: 'line-diagram', component: LineDiagramComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
