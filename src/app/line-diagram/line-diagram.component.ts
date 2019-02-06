import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {UserService} from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-line-diagram',
  templateUrl: './line-diagram.component.html',
  styleUrls: ['./line-diagram.component.css']
})
export class LineDiagramComponent implements OnInit {

  startDate = '';
  endDate = '';
  usersNo = [];
  labels = [];
  count = [];
  lineChart: Chart;
  private notifier: NotifierService;

  constructor(private userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    // this.getUsers('', '');
  }

  createCahrt() {
    this.lineChart = new Chart('usersLineChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'example chart',
          data: this.count,
          fill: false,
          lineTension: 0.2,
          borderColor: '#28a745',
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  getUsers(startDate: string, endDate: string) {
    this.userService.getUsersNo(startDate, endDate).subscribe(
      data => {
        if (data['status'] === 500) {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، داده ها دریافت نشدند' );
        } else {
          this.usersNo = data['usersNo'];
          this.labels = [];
          this.count = [];
          for (const item of this.usersNo) {
            this.labels.push(item['date']);
            this.count.push(item['count']);
          }
          console.log(this.labels);
          console.log(this.count);
          this.createCahrt();
        }
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }
}
