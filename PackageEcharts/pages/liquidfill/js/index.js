require(['echarts','echartsConfig', 'jquery', 'commonEditor', 'httpRequest', 'ace/ace', 'ace/ext/language_tools', 'echartsLiquidFill'], function (echarts, echartsConfig, $, commonEditor, http, ace) {
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
    title: {
      text: '水球图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: []
  };
  function initEchart() {
    var aceDataString;
    if (requestUrl) {
      aceDataString = data;
    }else {
      aceDataString = `data = {category: '占比', value: 0.7};`;
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
    var series = [{
      name: data.category,
      type: 'liquidFill',
      // 内图 背景色 边
      backgroundStyle: {
        color: 'transparent',
        // borderWidth: 5,
        // borderColor: 'red',
      },
      data: [data.value, data.value - 0.1, data.value - 0.2]
    }];
    /*data.forEach(function(item) {
      legendData.push(item.category);
      // xAxisData.push(item.category);
      series.data.push({name: item.category, value: item.value});
    });*/
    console.log(legendData, xAxisData, series)
    return {legendData: legendData, xAxisData: xAxisData, series: series};
  }
  function updateEchart() {
    var formatData = formatEchartData();
    // option.legend.data = formatData.legendData;
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