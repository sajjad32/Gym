import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, Present, Payment } from '../User';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User;
  presents: Present[];
  payments: Payment[];
  private notifier: NotifierService;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    notifierService: NotifierService
  ) { this.notifier = notifierService; }

  ngOnInit() {
    this.resetForm();
    this.getUser();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(
      data => {
        this.user = data['user'][0];
        this.presents = data['presents'];
        this.payments = data['payments'];
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
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

  editUser() {
    this.userService.formData = Object.assign({}, this.user);
  }

  onUpdate(form: NgForm) {
    this.updateUser(form);
  }

  updateUser(form: NgForm) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.updateUser(form.value, id).subscribe(
      data => {
        this.notifier.notify( 'success', 'اطلاعات به روز رسانی شد' );
        console.log(data);
        this.getUser();
      },
      error => {
        console.log(error);
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
      }
    );
  }

  loadImage($event) : void {
    this.uploadImage($event.target);
  }

  uploadImage(inputValue: any): void {
    const file:File = inputValue.files[0];
    const myReader:FileReader = new FileReader();

    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.userService.uploadImage(myReader.result, this.user.id).subscribe(
        data => {
          if (data['status'] === 200) {
            this.notifier.notify( 'success', 'عکس فرد آپلود شد' );
            this.getUser();
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
    };

  }

}
