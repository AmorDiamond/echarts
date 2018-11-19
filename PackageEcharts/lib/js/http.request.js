define(['jquery'], function($) {
  var httpRequest = {};
  httpRequest.get = function (requestUrl, callback) {
    var paramsUrl = requestUrl.replace('?', '');
    var params = requestUrl.split('&');
    var url;
    var paramsData = {};
    if (params.length > 0) {
      url = params[0].split('=')[1];
      /*处理地址栏的参数请求数据*/
      params.forEach(function(item) {
        var paramArr = item.split('=');
        var key = paramArr[0];
        var value = paramArr[1];
        if (key !== 'url') {
          paramsData[key] = value;
        }
      });
    }else {
      url = params[0].split('=')[1];
    }
    // var url = requestUrl;
    // var paramsData = params;
    var data;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: paramsData,
      success: function(res) {
        console.log(res);
        var string = ``;
        res.data.forEach(function(item) {
          string += `    ${JSON.stringify(item)},\n`;
        });
        var stringData = '[\n' + string + '];';
        data = 'data=' + stringData;
        console.log(data)
        if (callback) {
          callback(data);
        }
      },
      error: function(err) {
        console.error(err);
        return data;
      }
    });
  };
  return httpRequest;
});