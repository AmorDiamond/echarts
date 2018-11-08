require(['echarts','echartsConfig', 'jquery', 'commonEditor', 'httpRequest', 'ace/ace', 'ace/ext/language_tools'], function (echarts, echartsConfig, $, commonEditor, http, ace) {
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
  var requestUrl = window.location.search;
  var myChart = echarts.init(document.getElementById('line'));
  var option = {
    color: ['#2196F3', '#BBDEFB'],
    title: {
      text: '饼状图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    legend: {
      show: false,
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
      aceDataString = `data = {type: '正确率', value: 40, color: ['#2196F3', '#BBDEFB']};`;
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
    var series = {
      name: '饼状图',
      type: 'pie',
      radius: ['50%', '60%'],
      avoidLabelOverlap: false,
      hoverAnimation: false,
      label: {
        normal: {
          show: true,
          position: 'center',
          color: echartsConfig.labelTextColor,
          fontSize: 24,
          fontWeight: 'bold',
          formatter: '{b}\n{c}%'
        }
      },
      data: []
    };
    series.data.push({name: data.type, value: data.value,label: {
        normal: {
          show: true
        }
      }});
    series.data.push({name: '', value: 100 - data.value,label: {
        normal: {
          show: false
        }
      }});
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
    console.log(url);
    http.get(requestUrl, function(res) {
      data = res;
      initEchart();
      run();
    });
  }else {
    initEchart();
    run();
  }
  initEventHandler(gb, myChart);
  setSplitPosition(0.4);
  /**/
});