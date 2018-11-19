require(['common', 'echarts','echartsConfig', 'jquery', 'commonEditor', 'httpRequest', 'ace/ace', 'ace/ext/language_tools', 'echartsGl'], function (common, echarts, echartsConfig, $, commonEditor, http, ace) {
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
      text: chartTitle ? chartTitle : '柱状图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    tooltip: {
    },
    visualMap: {
      max: 20,
      calculable: true,
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    legend: {
      top: 25,
      textStyle: echartsConfig.legendTextStyle,
      data: []
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        magicType: {
          type: ['line', 'bar']
        }
      }
    },
    xAxis3D: {
      type: 'category',
      axisLabel: echartsConfig.axisLabel,
      // boundaryGap: false,
      data: []
    },
    yAxis3D: {
      type: 'category',
      axisLabel: echartsConfig.axisLabel,
      splitLine: {
        lineStyle: echartsConfig.splitLineStyle,
      },
      data: []
    },
    zAxis3D: {
      splitLine: {
        lineStyle: echartsConfig.splitLineStyle,
      },
      type: 'value'
    },
    grid3D: {
      boxWidth: 200,
      boxDepth: 100,
      viewControl: {
        // projection: 'orthographic'
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      },
      viewControl: {
        alpha: 15,
        beta: 40,
        autoRotate: true,
        zoomSensitivity: 0,
        autoRotateAfterStill: 5,
        distance: 250
      }
    },
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
            {category: '周一', value: 100},
            {category: '周二', value: 130},
            {category: '周三', value: 150},
            {category: '周四', value: 170},
            {category: '周五', value: 200},
          ]
        },
        {type: '视频广告', categories: [
            {category: '周一', value: 130},
            {category: '周二', value: 150},
            {category: '周三', value: 170},
            {category: '周四', value: 160},
            {category: '周五', value: 210},
          ]
        }
      ];`
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
    var yAxisData = [];
    var maxValue = 0;
    var series = {
      type: 'bar3D',
      shading: 'lambert',
      label: {
        textStyle: {
          fontSize: 16,
          borderWidth: 1
        }
      },
      emphasis: {
        label: {
          textStyle: {
            fontSize: 20,
            color: '#900'
          }
        },
        itemStyle: {
          color: '#900'
        }
      },
      data: []
    };
    data.forEach(function(item, index) {
      xAxisData.push(item.type);
      if (yAxisData.length < 1) {
        item.categories.forEach(function(cateItem, cateIndex) {
          var category = cateItem.category;
          var value = cateItem.value;
          yAxisData.push(category);
          series.data.push([index, cateIndex, value]);
          maxValue = cateItem.value > maxValue ? cateItem.value : maxValue;
        });
      }else {
        item.categories.forEach(function(cateItem) {
          var category = cateItem.category;
          var value = cateItem.value;
          /*X轴有数据后，后面的数据按照X轴的位置对应*/
          var yAxisIndex = yAxisData.indexOf(category);
          series.data.push([index, yAxisIndex, value]);
          maxValue = cateItem.value > maxValue ? cateItem.value : maxValue;
        });
      }
    });
    console.log(legendData, xAxisData, series)
    return {legendData: legendData, xAxisData: xAxisData, yAxisData: yAxisData, maxValue: maxValue, series: series};
  }
  function updateEchart() {
    var formatData = formatEchartData();
    option.legend.data = formatData.legendData;
    option.xAxis3D.data = formatData.xAxisData;
    option.yAxis3D.data = formatData.yAxisData;
    option.visualMap.max = formatData.maxValue;
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