import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts-left',
  templateUrl: './charts-left.component.html',
  styleUrls: ['./charts-left.component.scss']
})
export class ChartsLeftComponent implements OnInit {
  items: any;
  options: any;
  itemsProgress: any;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        number: '132.75',
        name: '二手房'
      },
      {
        number: '84.10',
        name: '租房'
      },
      {
        number: '5.6',
        name: '新房'
      }
    ];

    this.itemsProgress = [
      { name: '今日新增二手房', progress: 70, number: '1.775' },
      { name: '今日新增租房', progress: 60, number: '1.775' },
      { name: '今日新增新房', progress: 50, number: '1.775' }
    ];

    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      color: ['#5793f3', '#d14a61', '#675bba'],

      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: { type: 'cross' }
      // },
      grid: {
        bottom: '20%',
        top: '20%'
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      legend: {
        data: [
          { name: 'PV', textStyle: { color: '#fb9f24' } },
          { name: 'UV', textStyle: { color: '#00cdb4' } }
        ],
        right: 10
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisLine: {
            lineStyle: {
              color: '#92e6f0'
            }
          }
        }
      ],
      yAxis: [
        // {
        //     type: 'value',
        //     name: '蒸发量',
        //     min: 0,
        //     max: 250,
        //     position: 'right',
        //     axisLine: {
        //         lineStyle: {
        //             color: colors[0]
        //         }
        //     },
        //     axisLabel: {
        //         formatter: '{value} ml'
        //     }
        // },
        {
          type: 'value',
          // name: '降水量',
          min: 0,
          max: 250,
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#fb9f24'
            }
          }
          // axisLabel: {
          //   formatter: '{value} ml'
          // }
        },
        {
          type: 'value',
          // name: '温度',
          min: 0,
          max: 25,
          position: 'left',
          axisLine: {
            lineStyle: {
              color: '#00cdb4'
            }
          }
          // axisLabel: {
          //   formatter: '{value} °C'
          // }
        }
      ],
      series: [
        // {
        //     name:'蒸发量',
        //     type:'bar',
        //     data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        // },
        {
          name: 'PV',
          type: 'line',
          yAxisIndex: 0,
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ],
          itemStyle: {
            color: '#fb9f24'
          }
        },
        {
          name: 'UV',
          type: 'line',
          yAxisIndex: 1,
          data: [
            2.0,
            2.2,
            3.3,
            4.5,
            6.3,
            10.2,
            20.3,
            23.4,
            23.0,
            16.5,
            12.0,
            6.2
          ],
          itemStyle: {
            color: '#00cdb4'
          }
        }
      ]
    };
  }
}
