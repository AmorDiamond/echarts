import { Component, OnInit } from '@angular/core';

export interface RegisterData {
  city: string;
  register: string;
  registerPer: string;
  price: string;
  pricePer: string;
}

@Component({
  selector: 'app-charts-right',
  templateUrl: './charts-right.component.html',
  styleUrls: ['./charts-right.component.scss']
})
export class ChartsRightComponent implements OnInit {
  dataList: RegisterData[];
  options: any;
  constructor() {}

  ngOnInit() {
    this.dataList = [
      {
        city: '成都市',
        register: '15420',
        registerPer: '15.1%',
        price: '15420',
        pricePer: '15.1%'
      },
      {
        city: '成都市',
        register: '15420',
        registerPer: '15.1%',
        price: '15420',
        pricePer: '15.1%'
      },
      {
        city: '成都市',
        register: '15420',
        registerPer: '15.1%',
        price: '15420',
        pricePer: '15.1%'
      },
      {
        city: '成都市',
        register: '15420',
        registerPer: '15.1%',
        price: '15420',
        pricePer: '15.1%'
      },
      {
        city: '成都市',
        register: '15420',
        registerPer: '15.1%',
        price: '15420',
        pricePer: '15.1%'
      },
      {
        city: '成都市',
        register: '15420',
        registerPer: '15.1%',
        price: '15420',
        pricePer: '15.1%'
      }
    ];

    this.options = {
      // tooltip: {
      //     trigger: 'item',
      //     formatter: "{a} <br/>{b}: {c} ({d}%)"
      // },
      // legend: {
      //     orient: 'vertical',
      //     x: 'left',
      //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
      // },
      series: [
        {
          name: '租赁',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '60%'],
          // position: {
          //   left: '10%'
          // },
          center: ['25%', '50%'],
          label: {
            normal: {
              position: 'inner',
              formatter: '{c}% \n {b}'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 20, name: '成交', selected: true },
            { value: 14, name: '房源' },
            { value: 66, name: '租客' }
          ]
        },
        {
          name: '买卖',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '60%'],
          // position: {
          //   left: '10%'
          // },
          center: ['70%', '50%'],
          label: {
            normal: {
              position: 'inner',
              formatter: '{c}% \n {b}'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 15, name: '成交', selected: true },
            { value: 20, name: '购买' },
            { value: 65, name: '出售' }
          ]
        }
        // {
        //     name:'访问来源',
        //     type:'pie',
        //     radius: ['40%', '55%'],
        //     label: {
        //         normal: {
        //             formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        //             backgroundColor: '#eee',
        //             borderColor: '#aaa',
        //             borderWidth: 1,
        //             borderRadius: 4,
        //             // shadowBlur:3,
        //             // shadowOffsetX: 2,
        //             // shadowOffsetY: 2,
        //             // shadowColor: '#999',
        //             // padding: [0, 7],
        //             rich: {
        //                 a: {
        //                     color: '#999',
        //                     lineHeight: 22,
        //                     align: 'center'
        //                 },
        //                 // abg: {
        //                 //     backgroundColor: '#333',
        //                 //     width: '100%',
        //                 //     align: 'right',
        //                 //     height: 22,
        //                 //     borderRadius: [4, 4, 0, 0]
        //                 // },
        //                 hr: {
        //                     borderColor: '#aaa',
        //                     width: '100%',
        //                     borderWidth: 0.5,
        //                     height: 0
        //                 },
        //                 b: {
        //                     fontSize: 16,
        //                     lineHeight: 33
        //                 },
        //                 per: {
        //                     color: '#eee',
        //                     backgroundColor: '#334455',
        //                     padding: [2, 4],
        //                     borderRadius: 2
        //                 }
        //             }
        //         }
        //     },
        //     data:[
        //         {value:335, name:'直达'},
        //         {value:310, name:'邮件营销'},
        //         {value:234, name:'联盟广告'},
        //         {value:135, name:'视频广告'},
        //         {value:1048, name:'百度'},
        //         {value:251, name:'谷歌'},
        //         {value:147, name:'必应'},
        //         {value:102, name:'其他'}
        //     ]
        // }
      ]
    };
  }
}
