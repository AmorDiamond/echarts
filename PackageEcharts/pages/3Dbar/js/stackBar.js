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
    title: {
      text: chartTitle ? chartTitle : '柱状图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    tooltip: {
      trigger: 'axis'
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
    xAxis: {
      type: 'category',
      axisLabel: echartsConfig.axisLabel,
      // boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      axisLabel: echartsConfig.axisLabel,
      splitLine: {
        lineStyle: echartsConfig.splitLineStyle,
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
        {category: '周一', type: '邮件营销', value: 120},
        {category: '周二', type: '邮件营销', value: 100},
        {category: '周三', type: '邮件营销', value: 130},
        {category: '周四', type: '邮件营销', value: 150},
        {category: '周五', type: '邮件营销', value: 180},
        {category: '周一', type: '联盟广告', value: 100},
        {category: '周二', type: '联盟广告', value: 130},
        {category: '周三', type: '联盟广告', value: 150},
        {category: '周四', type: '联盟广告', value: 170},
        {category: '周五', type: '联盟广告', value: 200},
        {category: '周一', type: '视频广告', value: 130},
        {category: '周二', type: '视频广告', value: 150},
        {category: '周三', type: '视频广告', value: 170},
        {category: '周四', type: '视频广告', value: 160},
        {category: '周五', type: '视频广告', value: 210},
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
    var objCopy = {};
    console.log(data)
    data.forEach(function(item){
      var type = item.type;
      if(objCopy[type]) {
        objCopy[type].push(item);
      }else {
        objCopy[type] = [];
        objCopy[type].push(item);
      }
    });
    var legendData = [];
    var xAxisData = [];
    var series = [];
    for (var item in objCopy) {
      legendData.push(item);
      var seriseItem = {
        name: item,
        type: 'bar',
        stack: '总量',
        data: [],
      };
      if (xAxisData.length < 1) {
        objCopy[item].forEach(function (cate) {
          xAxisData.push(cate.category);
          seriseItem.data.push(cate.value);
        });
      }else {
        objCopy[item].forEach(function (cate) {
          var index = xAxisData.indexOf(cate.category);
          seriseItem.data[index] = cate.value;
        });
      }
      series.push(seriseItem);
    }
    console.log(legendData, xAxisData, series)
    return {legendData: legendData, xAxisData: xAxisData, series: series};
  }
  function updateEchart() {
    var formatData = formatEchartData();
    option.legend.data = formatData.legendData;
    option.xAxis.data = formatData.xAxisData;
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

  /*格式化排序*/
  function stringCompareFn(prop) {
    return function (obj1, obj2) {
      const val1 = obj1[prop];
      const val2 = obj2[prop];
      return val1.localeCompare(val2);
    };
  }
  /*格式化排序*/
  function stringCompare() {
    return function (obj1, obj2) {
      const val1 = obj1;
      const val2 = obj2;
      return val1.localeCompare(val2);
    };
  };
  /*格式化排序*/
  function compareFn(prop, type) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (type === 'asc') {
        if (val1 < val2) {
          return 1;
        } else if (val1 > val2) {
          return -1;
        } else {
          return 0;
        }
      }else{
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
    };
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