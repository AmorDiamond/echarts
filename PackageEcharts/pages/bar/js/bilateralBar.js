require(['common', 'echarts','echartsConfig', 'jquery', 'commonEditor', 'httpRequest', 'ace/ace', 'ace/ext/language_tools'], function (common, echarts, echartsConfig, $, commonEditor, http, ace) {
  console.log(ace)
  var editor = ace.edit("line-value",{theme: "ace/theme/monokai",});
  ace.require("ace/ext/language_tools");
  editor.getSession().setMode('ace/mode/javascript');
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });

  var data;
  var locationParams = window.location.search;
  var commonParams = common.locationParams(locationParams);
  var requestUrl = commonParams.requestUrl;
  var showAceEditor = commonParams.showAceEditor;
  var chartTitle = decodeURI(commonParams.chartTitle);

  var myChart = echarts.init(document.getElementById('line'));
  var option = {
    color: echartsConfig.color,
    title: {
      text: chartTitle ? chartTitle : '双向柱状图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    tooltip: {
      // trigger: 'axis',
      // 自定义提示内容
      formatter: function(a){
        var v = a;
        return v.name + '<br/>' + v.marker +v.seriesName + '：'+ Math.abs(v.value);
      }
    },
    legend: {
      icon: 'circle',
      top: 25,
      textStyle: echartsConfig.legendTextStyle,
      data: []
    },
    grid: [{
      top: 50,
      width: '42%',
      left: 35,
      gridIndex: 0,
    }, {
      top: 50,
      left: '52%',
      gridIndex: 1,
    }],
    toolbox: {
      feature: {
        magicType: {
          type: ['line', 'bar']
        }
      }
    },
    xAxis: [{
      type: 'value',
      gridIndex: 0,
      axisLabel: echartsConfig.axisLabel,
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
    },{
      type: 'value',
      gridIndex: 1,
      axisLabel: echartsConfig.axisLabel,
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
    }
    ],
    yAxis: [{
      type: 'category',
      gridIndex: 0,
      axisLabel : {show:false},
      axisLine: {show:false},
      axisTick:{show:false},
      splitLine: {
        lineStyle: echartsConfig.splitLineStyle,
      },
      data: [],
    },{
      type: 'category',
      gridIndex: 1,
      axisLabel: echartsConfig.axisLabel,
      axisLine: {show:false},
      axisTick:{show:false},
      splitLine: {
        lineStyle: echartsConfig.splitLineStyle,
      },
      data: [],
    }
    ],
    series: []
  };
  function initEchart() {
    var aceDataString;
    if (requestUrl) {
      aceDataString = data;
    }else {
      aceDataString = `data = [
        {type: '邮件营销', categories: [
            {category: '周一', value: 120},
            {category: '周二', value: 100},
            {category: '周三', value: 130},
            {category: '周四', value: 150},
            {category: '周五', value: 180},
          ]
        },
        {type: '联盟广告', categories: [
            {category: '周一', value: -100},
            {category: '周二', value: -130},
            {category: '周三', value: -150},
            {category: '周四', value: -170},
            {category: '周五', value: -200},
          ]
        }
      ];`;
    }

    editor.setValue(aceDataString);
    myChart.setOption(option);
    editor.on('change', function() {
      run();
    });
    var submit = document.querySelector('#code-container .run-submit');
    submit.addEventListener('click', function() {
      run();
    });
  }
  function formatEchartData () {

    var legendData = [];
    var xAxisData = [];
    var series = [];
    data.forEach(function(item) {
      legendData.push(item.type);
      var seriesItem = {
        name: item.type,
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        barWidth: '30%',
        itemStyle: {
          normal: {
            show: true,
            // color: '#5de3e1',
            barBorderRadius:50,
            borderWidth:0,
            // borderColor:'#333',
            label: {
              show: true,
              position: 'left',
              formatter: function(v){
                return (v.value < 0 ? v.value * -1 : v.value);
              }
            }
          }
        },
        data: []
      };

      if (xAxisData.length < 1) {
        item.categories.forEach(function(cateItem) {
          var category = cateItem.category;
          var value = cateItem.value;
          xAxisData.push(category);
          seriesItem.data.push(value);
          console.log(value)
          seriesItem.xAxisIndex = seriesItem.yAxisIndex = value < 0 ? 0 : 1;
          console.log(seriesItem)
          seriesItem.itemStyle.normal.label.position = value < 0 ? 'left' : 'right';
        });
      }else {
        item.categories.forEach(function(cateItem) {
          var category = cateItem.category;
          var value = cateItem.value;
          /*X轴有数据后，后面的数据按照X轴的位置对应*/
          var index = xAxisData.indexOf(category);
          seriesItem.data[index] = value;
          console.log(value)
          seriesItem.xAxisIndex = seriesItem.yAxisIndex = value < 0 ? 0 : 1;
          console.log(seriesItem)
          seriesItem.itemStyle.normal.label.position = value < 0 ? 'left' : 'right';
        });
      }
      series.push(seriesItem);
    });
    console.log(legendData, xAxisData, series)
    return {legendData: legendData, yAxisData: xAxisData, series: series};
  }
  function updateEchart() {
    var formatData = formatEchartData();
    option.legend.data = formatData.legendData;
    option.yAxis[0].data = formatData.yAxisData;
    option.yAxis[1].data = formatData.yAxisData;
    option.series = formatData.series;
  }
  function run () {
    // run the code
    try {

      // Reset option
      // option = null;
      /*使用eval将js里定义的变量更改为editor里输入的值*/
      eval(editor.getValue());
      updateEchart();
      console.log(option, data);
      if (option && typeof option === 'object') {
        myChart.setOption(option, true);
      }
      /*if (option && typeof option === 'object' && (!_.isEqual(option, gb.lastOption) || ignoreOptionNotChange)) {
        gb.lastOption = option;
        var startTime = +new Date();
        gb.chart.setOption(option, true);
        var endTime = +new Date();
        gb.updateTime = endTime - startTime;

        // Find the appropriate throttle time
        var debounceTime = 500;
        var debounceTimeQuantities = [500, 2000, 5000, 10000];
        for (var i = debounceTimeQuantities.length - 1; i >= 0; i--) {
          var quantity = debounceTimeQuantities[i];
          var preferredDebounceTime = debounceTimeQuantities[i + 1] || 1000000;
          if (gb.updateTime > quantity && gb.debounceTime !== preferredDebounceTime) {
            gb.debounceTime = preferredDebounceTime;
            runDebounce = _.debounce(run, preferredDebounceTime, {
              trailing: true
            });
            break;
          }
        }
        log(lang.chartOK + gb.updateTime + 'ms');
      }

      if (gui) {
        $(gui.domElement).remove();
        gui.destroy();
        gui = null;
      }

      if (app.config) {
        gui = new dat.GUI({
          autoPlace: false
        });
        $(gui.domElement).css({
          position: 'absolute',
          right: 5,
          top: 0,
          zIndex: 1000
        });
        $('.right-container').append(gui.domElement);

        var configParameters = app.configParameters || {};
        for (var name in app.config) {
          var value = app.config[name];
          if (name !== 'onChange' && name !== 'onFinishChange') {
            var isColor = false;
            // var value = obj;
            var controller;
            if (configParameters[name]) {
              if (configParameters[name].options) {
                controller = gui.add(app.config, name, configParameters[name].options);
              }
              else if (configParameters[name].min != null) {
                controller = gui.add(app.config, name, configParameters[name].min, configParameters[name].max);
              }
            }
            if (typeof obj === 'string') {
              try {
                var colorArr = echarts.color.parse(value);
                isColor = !!colorArr;
                if (isColor) {
                  value = echarts.color.stringify(colorArr, 'rgba');
                }
              }
              catch (e) {}
            }
            if (!controller) {
              controller = gui[isColor ? 'addColor' : 'add'](app.config, name);
            }
            app.config.onChange && controller.onChange(app.config.onChange);
            app.config.onFinishChange && controller.onFinishChange(app.config.onFinishChange);
          }
        }
      }*/
    } catch(e) {
      // log(lang.errorInEditor, 'error');
      console.error(e);
    };
  }
// set splitter position by percentage, left should be between 0 to 1
  function setSplitPosition(percentage) {
    commonEditor.setSplitPosition(percentage, myChart);
  }
  var gb = {
    handler: {isDown: false}
  };
  function initEventHandler(gb, myChart) {
    commonEditor.initEventHandler(gb, myChart);

  }
  if (requestUrl) {
    http.get(requestUrl, function(res) {
      data = res;
      initEchart();
      run();
    });
  }else {
    initEchart();
    run();
  }
  if (showAceEditor) {
    initEventHandler(gb, myChart);
    setSplitPosition(0.4);
  }else {
    $(window).resize(function() {
      myChart.resize();
    });
  }
  /**/
});