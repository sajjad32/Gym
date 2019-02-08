import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  monthPickerConfig = {
    format: 'YYYY-MM',
  };
  selected_month = '';
  month_name = '';
  payments = [];
  payments_sum: string;
  private notifier: NotifierService;

  constructor(private userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {}

  getPaymentList(start_month: string, end_month: string) {
    this.userService.getPaymentList(start_month, end_month).subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، داده ها دریافت نشدند' );
        } else {
          this.payments = data['payments'];
          this.calPayments();
        }
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  loadPaymentList() {
    this.loadMonthName();
    if (!this.selected_month){
      let start_month = moment().startOf('jMonth').locale('fa').format('YYYY-MM-DD');
      let end_month = moment().startOf('jMonth').add(1, 'jMonth').locale('fa').format('YYYY-MM-DD');
      this.getPaymentList(start_month, end_month);
    }
    else {
      let start_month = moment(this.selected_month, 'YYYY-MM').format('YYYY-MM-DD');
      let end_month = moment(start_month).startOf('jMonth').add(1, 'jMonth').format('YYYY-MM-DD');
      this.getPaymentList(start_month, end_month);
    }
  }

  calPayments() {
    let sum = 0;
    for (let item of this.payments) {
      sum += item.price;
    }
    this.payments_sum = sum.toString() + "000";
  }

  loadMonthName() {
    let month;
    if (!this.month_name) {
      month = moment().locale('fa').format('MM');
    }
    else {
      month = moment(this.selected_month).format('MM');
    }
    this.month_name = this.userService.monthes[month-1];
  }
}
