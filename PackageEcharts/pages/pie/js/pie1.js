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
  /*  var test = `var data = [
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
    ]`;*/
  // editor.setValue(test);//设置内容
  // var getValue = editor.getValue();
  //
  // console.log((getValue));//获取内容

  var myChart = echarts.init(document.getElementById('line'));
  var option = {
    title: {
      text: '饼状图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
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
    series: []
  };
  function initEchart() {
    var aceDataString;
    if (requestUrl) {
      aceDataString = data;
    }else {
      aceDataString = `data = [
        {category: '邮件营销', value: 100},
        {category: '联盟广告', value: 200},
        {category: '视频广告', value: 210},
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
    var series = {
      name: '饼状图',
      type: 'pie',
      radius: ['40%', '55%'],
      data: []
    };
    data.forEach(function(item) {
      legendData.push(item.category);
      // xAxisData.push(item.category);
      series.data.push({name: item.category, value: item.value});
    });
    console.log(legendData, xAxisData, series)
    return {legendData: legendData, xAxisData: xAxisData, series: series};
  }
  function updateEchart() {
    var formatData = formatEchartData();
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