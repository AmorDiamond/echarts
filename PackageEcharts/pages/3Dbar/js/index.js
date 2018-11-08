require(['echarts','echartsConfig', 'jquery', 'commonEditor', 'httpRequest', 'ace/ace', 'ace/ext/language_tools', 'echartsGl'], function (echarts, echartsConfig, $, commonEditor, http, ace) {
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
    color: echartsConfig.color,
    title: {
      text: '柱状图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    tooltip: {
      trigger: 'axis'
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
      yAxisData.push(item.type);
      if (xAxisData.length < 1) {
        item.categories.forEach(function(cateItem, cateIndex) {
          var category = cateItem.category;
          var value = cateItem.value;
          xAxisData.push(category);
          series.data.push([cateIndex, index, value]);
          maxValue = cateItem.value > maxValue ? cateItem.value : maxValue;
        });
      }else {
        item.categories.forEach(function(cateItem) {
          var category = cateItem.category;
          var value = cateItem.value;
          /*X轴有数据后，后面的数据按照X轴的位置对应*/
          var xAxisIndex = xAxisData.indexOf(category);
          series.data.push([xAxisIndex, index, value]);
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
    /*percentage = Math.min(0.9, Math.max(0.1, percentage));

    var left = percentage * 100;
    $('#code-container').css('width', left + '%');
    $('.right-container').css('width', (100 - left) + '%')
      .css('left', left + '%');
    $('#h-handler').css('left', left + '%');

    if (myChart) {
      myChart.resize();
    }*/
    commonEditor.setSplitPosition(percentage, myChart);
  }
  var gb = {
    handler: {isDown: false}
  };
  function initEventHandler(gb, myChart) {

    // reset typing state
    /*var typingHandler = null;

    $('#h-handler').mousedown(function() {

      gb.handler.isDown = true;

    });


    $(window).mousemove(function(e) {

      if (gb.handler.isDown) {
        var left = e.clientX / window.innerWidth;
        setSplitPosition(left);
      }

    }).mouseup(function() {

      gb.handler.isDown = false;

    });

    $(window).resize(function() {
      myChart.resize();
      checkEditorIfToShow();
    });*/
    commonEditor.initEventHandler(gb, myChart);

  }
  /*function checkEditorIfToShow() {

    // hide editor for mobile devices
    if (window.innerWidth < 768) {
      if (gb.editorIsShown === undefined || gb.editorIsShown === true) {
        // hide editor
        $('#code-container').hide();
        $('#h-handler').hide();
        $('.right-container').css('width', '100%').css('left', '0%');
        gb.editorIsShown = false;
      }
    } else {
      if (gb.editorIsShown === undefined || gb.editorIsShown === false) {
        // show editor
        $('#code-container').show();
        $('#h-handler').show();
        setSplitPosition(0.4);
        gb.editorIsShown = true;
      }
    }
  }*/

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