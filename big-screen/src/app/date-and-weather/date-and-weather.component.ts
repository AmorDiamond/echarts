import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-date-and-weather',
  templateUrl: './date-and-weather.component.html',
  styleUrls: ['./date-and-weather.component.css']
})
export class DateAndWeatherComponent implements OnInit {
  date: string;
  day: string;
  constructor() {}

  ngOnInit() {
    this.date = dayjs().format('YYYY年MM月DD日');
    this.day = '星期' + '日一二三四五六'.charAt(new Date().getDay());
  }
}
