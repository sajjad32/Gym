import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payments = [];
  private notifier: NotifierService;

  constructor(private userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getPaymentList();
  }

  getPaymentList() {
    this.userService.getPaymentList().subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، داده ها دریافت نشدند' );
        } else {
          this.payments = data['payments'];
        }
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }
}
