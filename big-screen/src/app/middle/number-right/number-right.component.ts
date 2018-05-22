import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-right',
  templateUrl: './number-right.component.html',
  styleUrls: ['./number-right.component.scss']
})
export class NumberRightComponent implements OnInit {
  items: string[];
  numberList: any;
  constructor() {}

  ngOnInit() {
    this.items = '01715'.split('');
    this.numberList = [
      {
        icon: '',
        name: '全国门店覆盖量',
        total: '22000'
      },
      {
        icon: '',
        name: '全国经纪人',
        total: '465329'
      },
      {
        icon: '',
        name: 'APP下载量',
        total: '274042025'
      }
    ];
  }
}
