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

  each_page_records = 10;
  start_index = 0;
  current_page = 1;
  users: User[];
  users_num = 0;
  selected: number;
  Math: any;
  private notifier: NotifierService;

  constructor(public userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.Math = Math;
  }

  ngOnInit() {
    this.getUsers();
    this.resetForm();
  }

  getUsers() {
    this.userService.getUsers(this.start_index, this.each_page_records).subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده' );
        } else {
          this.users = data['users'];
          this.users_num = data['count'];
        }
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error.name);
      }
    );
  }

  loadUsersPage(page_num: number) {
    this.start_index = (page_num - 1) * this.each_page_records;
    this.current_page = page_num;
    this.getUsers();
  }

  resetForm() {
    this.userService.formData = {
      id: null,
      name: '',
      phoneNo: null,
      shelfNo: '',
      details: '',
      flag: false
    };
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
