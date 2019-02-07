import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import * as $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  selected: number;
  private notifier: NotifierService;

  constructor(public userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getUsers();
    this.resetForm();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده' );
        } else {
          this.users = data['users'];
        }
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error.name);
      }
    );
  }

  resetForm() {
    this.userService.formData = {
      id: null,
      name: '',
      phoneNo: '',
      shelfNo: '',
      details: '',
      flag: false
    };
  }

  resetPaymentForm() {
    this.userService.paymentPrice = null;
    this.userService.paymentMethod = '';
  }

  selectedUser(id: number) {
    this.selected = id;
  }

  onSubmitPayment(form: NgForm) {
    this.addPayment(form, this.selected);
  }

  addPayment(form: NgForm, id: number) {
    this.userService.addPayment(form.value, id).subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، پرداخت ثبت نشد' );
        } else {
          this.notifier.notify( 'success', 'پرداخت شهریه ثبت شد' );
          this.resetPaymentForm();
        }
        console.log(data);
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  onSubmitUser(form: NgForm) {
    this.addUser(form);
    this.resetForm();
  }

  addUser(form: NgForm) {
    this.userService.addUser(form.value).subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، فرد اضافه نشد' );
        } else {
          this.notifier.notify( 'success', 'فرد جدید به سیستم اضافه شد' );
          this.getUsers();
        }
        console.log(data);
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، فرد حذف نشد' );
        } else {
          this.notifier.notify( 'success', 'فرد از سیستم حذف شد' );
          this.getUsers();
        }
        console.log(data);
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }
}
