import { Component, OnInit } from '@angular/core';

export interface Item {
  name: string;
  number: string;
  todayNewly: string;
  percent: string;
}

@Component({
  selector: 'app-number-list',
  templateUrl: './number-list.component.html',
  styleUrls: ['./number-list.component.css']
})
export class NumberListComponent implements OnInit {
  items: Item[];
  constructor() {}

  ngOnInit() {
    this.items = [
      {
        name: '平台挂牌房源量(套)',
        number: '26017790',
        todayNewly: '34792',
        percent: '6.7%'
      },
      {
        name: '产生订单总量(万套)',
        number: '890.56',
        todayNewly: '2.43',
        percent: '12%'
      },
      {
        name: '2017年度成家金额(亿元)',
        number: '1027.83',
        todayNewly: '2.75',
        percent: '12%'
      },
      {
        name: '买卖成交总量(套)',
        number: '102645',
        todayNewly: '287',
        percent: '11.2%'
      },
      {
        name: '租赁成交总量(套)',
        number: '318561',
        todayNewly: '682',
        percent: '36%'
      }
    ];
  }
}
