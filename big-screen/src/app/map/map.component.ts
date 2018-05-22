import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsService } from 'ngx-echarts';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  options: any;
  constructor(private http: HttpClient, private es: NgxEchartsService) {}

  ngOnInit() {
    this.http
      .get<any>('assets/data-1517645039291-B1vgpymUz.json')
      .subscribe(geoJson => {
        this.es.registerMap('zhongguo', geoJson);
        // myChart.hideLoading();
        const geoCoordMap = {
          海南: [110.17, 19.92],
          河南: [113.700339, 34.751827],
          河北: [114.54095, 38.058913],
          湖北: [114.289984, 30.5942],
          广东: [113.293215, 23.102603],
          湖南: [113.03042, 28.188898],
          江西: [115.911671, 28.658012],
          黑龙江: [126.629804, 45.774197],
          四川: [104.112035, 30.630737],
          安徽: [117.321109, 31.850184]
        };
        const data = [
          {
            name: '海南',
            value: 99925.73
          },
          {
            name: '河南',
            value: 17737.01
          },
          {
            name: '河北',
            value: 13177.64
          },
          {
            name: '湖北',
            value: 12174.96
          },
          {
            name: '广东',
            value: 8230.15
          },
          {
            name: '湖南',
            value: 8173.05
          },
          {
            name: '江西',
            value: 7423.08
          },
          {
            name: '黑龙江',
            value: 6829.69
          },
          {
            name: '四川',
            value: 6158.43
          },
          {
            name: '安徽',
            value: 5930.8
          }
        ];
        const max = 100000,
          min = 900; // todo
        const maxSize4Pin = 100,
          minSize4Pin = 20;

        const convertData = function(data) {
          const res = [];
          for (let i = 0; i < data.length; i++) {
            const geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };

        console.log(convertData(data));

        this.options = {
          // title: {
          //   text: '购买对象所在省份TOP10',
          //   subtext: '销售面积区间',
          //   x: 'center',
          //   textStyle: {
          //     color: '#ccc'
          //   }
          // },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              if (typeof params.value[2] === 'undefined') {
                return params.name + ' : ' + params.value;
              } else {
                return params.name + ' : ' + params.value[2];
              }
            }
          },
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['sell_area'],
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            show: true,
            map: 'zhongguo',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            zoom: 1.2
          },
          series: [
            {
              name: 'credit_pm2.5',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function(val) {
                return val[2] / 10000;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#05C3F9'
                }
              }
            },
            {
              type: 'map',
              map: 'zhongguo',
              geoIndex: 0,
              aspectScale: 0.75, // 长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077'
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: data
            },
            {
              name: '点',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin',
              symbolSize: function(val) {
                const a = (maxSize4Pin - minSize4Pin) / (max - min);
                let b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return a * val[2] + b;
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 9
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#F62157' // 标志颜色
                }
              },
              zlevel: 6,
              data: convertData(data)
            }
            // {
            //   name: 'Top 5',
            //   type: 'effectScatter',
            //   coordinateSystem: 'geo',
            //   data: convertData(
            //     data
            //       .sort(function(a, b) {
            //         return b.value - a.value;
            //       })
            //       .slice(0, 5)
            //   ),
            //   symbolSize: function(val) {
            //     return val[2] / 5000;
            //   },
            //   showEffectOn: 'render',
            //   rippleEffect: {
            //     brushType: 'stroke'
            //   },
            //   hoverAnimation: true,
            //   label: {
            //     normal: {
            //       formatter: '{b}',
            //       position: 'right',
            //       show: false
            //     }
            //   },
            //   itemStyle: {
            //     normal: {
            //       color: '#05C3F9',
            //       shadowBlur: 10,
            //       shadowColor: '#05C3F9'
            //     }
            //   },
            //   zlevel: 1
            // }
          ]
        };
      });
  }
}
