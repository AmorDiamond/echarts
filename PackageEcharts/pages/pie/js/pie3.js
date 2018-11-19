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
    color: ['#8F99F0', '#5FC5F5', '#6DE0CF'],
    title: {
      text: chartTitle ? chartTitle : '饼状图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    legend: {
      icon: 'pin',
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
    series: []
  };
  function initEchart() {
    var aceDataString;
    if (requestUrl) {
      aceDataString = data;
    }else {
      aceDataString = `data = [
        {type: '类型一', value: 70, color: '#8F99F0'},
        {type: '类型二', value: 50, color: '#5FC5F5'},
        {type: '类型三', value: 20, color: '#6DE0CF'},
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
    var placeHolderStyle = {
      normal: {
        color: "#dedede",
        borderColor: "#dedede",
        borderWidth: 0
      },
      emphasis: {
        color: "#dedede",
        borderColor: "#dedede",
        borderWidth: 0
      }
    };
    var legendData = [];
    var xAxisData = [];
    var series = [];
    data.forEach(function(item, index) {
      legendData.push(item.type);
      var seriesItem = {
        name: item.type,
        type: 'pie',
        clockWise: true, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [200 - index * 40, (200 - index * 40) + 1],
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true,
              length: 100,
              smooth: 0.5
            },
            borderWidth: 10,
            shadowBlur: 50,
            borderColor: item.color,
            shadowColor: 'rgba(142,152,241, 0.6)'
          }
        },
        data: [{
          value: item.value,
          name: item.value + '%',
        }, {
          value: 100 - item.value,
          name: '',
          itemStyle: placeHolderStyle,
          label: {
            show: false
          },
          labelLine: {
            show: false,
            emphasis: {
              show: false
            }
          },
        }]
      }
      series.push(seriesItem);
    });
    console.log(legendData, xAxisData, series)
    return {legendData: legendData, xAxisData: xAxisData, series: series};
  }
  function updateEchart() {
    var formatData = formatEchartData();
    option.color = data.color ? data.color : option.color;
    option.legend.data = formatData.legendData;
    // option.xAxis.data = formatData.xAxisData;
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