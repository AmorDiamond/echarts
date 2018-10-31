require(['echarts','echartsConfig'], function (echarts, echartsConfig) {
  console.log(ace)
  var editor = ace.edit("line-value");
  ace.require("ace/ext/language_tools");
  editor.getSession().setMode('ace/mode/javascript');
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });

  var data = [
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
  ];
  var test = `var data = [
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
  ]`;
  editor.setValue(test);//设置内容
  var getValue = editor.getValue();
  console.log((getValue));//获取内容

  var myChart = echarts.init(document.getElementById('line'));
  var objCopy = {};
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
    if (xAxisData.length < 1) {
      objCopy[item].forEach(function (cate) {
        xAxisData.push(cate.category);
      });
    }
  }
  /*if (isNaN(xAxisData[0])){
    xAxisData.sort(stringCompare());
    console.log(xAxisData)
  }else {
    xAxisData.sort(compareFn('category'));
  }*/
  for (var item in objCopy) {
    var seriseItem = {
      name: item,
      type: 'line',
      data: [],
    };
    objCopy[item].forEach(function (cate) {
      var index = xAxisData.indexOf(cate.category);
      seriseItem.data[index] = cate.value;
    });
    series.push(seriseItem);
  }
  console.log(legendData, xAxisData, series)
  var option = {
    title: {
      text: '折线图',
      left: 'center',
      textStyle: echartsConfig.titleStyle
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: 25,
      data: legendData
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
      boundaryGap: false,
      data: xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: series
  };
  myChart.setOption(option);


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
});