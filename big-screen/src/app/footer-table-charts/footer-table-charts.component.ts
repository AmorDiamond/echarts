import { Component, OnInit } from '@angular/core';
declare var echarts;
export interface Message {
  message: string;
  time: string;
}
@Component({
  selector: 'app-footer-table-charts',
  templateUrl: './footer-table-charts.component.html',
  styleUrls: ['./footer-table-charts.component.scss']
})
export class FooterTableChartsComponent implements OnInit {
  itemsMessage: Message[];
  options: any;
  // 第二个图
  options2: any;
  constructor() {}

  ngOnInit() {
    this.itemsMessage = [
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      },
      {
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: '20:30'
      }
    ];

    this.options = {
      // title: {
      //   text: '折线图堆叠'
      // },
      // tooltip: {
      //   trigger: 'axis'
      // },
      // legend: {
      //   data: ['邮件营销']
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        splitLine: {
          // 设置X轴的网格
          show: true,
          interval: 'auto',
          lineStyle: {
            color: 'rgba(19, 78, 122, .3)'
          }
        },
        axisLine: {
          // 设置X轴的颜色
          lineStyle: {
            color: 'white'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          // 设置y轴的颜色
          lineStyle: {
            color: 'white'
          }
        },
        splitLine: {
          // 设置X轴的网格
          show: true,
          interval: 'auto',
          lineStyle: {
            color: 'rgba(19, 78, 122, .3)'
          }
        }
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          label: {
            // 设置点数据的提示
            normal: {
              show: true,
              position: 'bottom'
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210],
          markPoint: {
            // 设置最大值和最小值
            data: [
              {
                type: 'max',
                name: '最大值'
              }
            ]
          }
        }
      ]
    };

    this.options2 = {
      // backgroundColor: '#394056',
      // title: {
      //   text: '航线上座率分析',
      //   textStyle: {
      //     fontWeight: 'normal',
      //     fontSize: 16,
      //     color: '#F1F1F3'
      //   },
      //   left: '6%'
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      // legend: {
      //   icon: 'rect',
      //   itemWidth: 14,
      //   itemHeight: 5,
      //   itemGap: 13,
      //   data: ['南宁-曼芭', '桂林-曼芭', '南宁-甲米'],
      //   right: '4%',
      //   textStyle: {
      //     fontSize: 12,
      //     color: '#F1F1F3'
      //   }
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
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
          ]
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }
      ],
      series: [
        {
          name: '南宁-曼芭',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)'
            }
          },
          data: [
            96.3,
            96.4,
            97.5,
            95.6,
            98.1,
            94.8,
            89.6,
            94.1,
            80.1,
            52.4,
            75.8,
            94.7
          ]
        },
        {
          name: '桂林-曼芭',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,136,212)'
            }
          },
          data: [
            97.3,
            99.2,
            99.3,
            100.0,
            99.6,
            90.6,
            80.0,
            91.5,
            69.8,
            67.5,
            90.4,
            84.9
          ]
        },
        {
          name: '南宁-甲米',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)'
            }
          },
          data: [
            84.2,
            81.0,
            67.5,
            72.1,
            43.7,
            88.5,
            91.9,
            101.8,
            79.7,
            87.6,
            92.9,
            0
          ]
        }
      ]
    };

    setInterval(() => {
      const date = new Date();
      this.itemsMessage.unshift({
        message: '【成都市】【新房】网友 大米 拨打了 英郡三期 400电话',
        time: `${date.getHours()}:${
          date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes()
        }`
      });
      this.itemsMessage.pop();
    }, 1500);
  }
}
