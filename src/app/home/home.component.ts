import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allUsers: User[];
  users: User[];
  searchString = '';
  private notifier: NotifierService;

  constructor(private userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.searchUsers().subscribe(
      data => {
        this.allUsers = data['users'];
        this.searchName();
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  searchName() {
    this.users = this.allUsers.filter(
      res => {
        return res.name.toLocaleLowerCase().match(this.searchString.toLocaleLowerCase());
      }
    );
  }

  addUserEnter(id: number) {
    this.userService.addUserEnter(id).subscribe(
      data => {
        if (data['status'] === 200) {
          this.notifier.notify( 'success', 'ورود فرد ثبت شد' );
          this.getUsers();
        } else {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، ورود ثبت نشد' );
        }
        console.log(data);
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  addUserOut(id: number) {
    this.userService.addUserOut(id).subscribe(
      data => {
        if (data['status'] === 200) {
          this.notifier.notify( 'success', 'خروج فرد ثبت شد' );
          this.getUsers();
        } else {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، خروج ثبت نشد' );
        }
        console.log(data);
        this.getUsers();
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }
}
