import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-present-list',
  templateUrl: './present-list.component.html',
  styleUrls: ['./present-list.component.css']
})
export class PresentListComponent implements OnInit {

  each_page_records = 10;
  start_index = 0;
  current_page = 1;
  presents = [];
  presents_num = 0;
  Math: any;
  private notifier: NotifierService;

  constructor(private userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.Math = Math;
  }

  ngOnInit() {
    this.getTodayPresence();
  }

  getTodayPresence() {
    this.userService.getTodayPresence(this.start_index, this.each_page_records).subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، داده ها دریافت نشدند' );
        } else {
          this.presents = data['presents'];
          this.presents_num = data['count'];
        }
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  loadPresentsPage(page_num: number) {
    this.start_index = (page_num - 1) * this.each_page_records;
    this.current_page = page_num;
    this.getTodayPresence();
  }

}
