define(function() {
  var common = {};
  common.locationParams = function(options) {
    var locationParams = options;
    var requestUrl = locationParams;
    var showAceEditor = false;
    var showAceEditorParams = 'debug';
    var chartTitle = '';
    var chartTitleParams = 'title';
    var showAceIndex = locationParams.indexOf(showAceEditorParams);
    var chartTitleIndex = locationParams.indexOf(chartTitleParams);
    if (showAceIndex > -1) {
      var aceParams;
      if (locationParams.indexOf('&' , showAceIndex) > -1) {
        aceParams = locationParams.substring(showAceIndex, locationParams.indexOf('&' , showAceIndex));
      }else {
        aceParams = locationParams.substring(showAceIndex);
      }
      if (aceParams.indexOf('true') > -1) {
        showAceEditor = true;
      }
      requestUrl = requestUrl.replace(aceParams, '')
    }
    if (chartTitleIndex > -1) {
      var titleParams;
      if (locationParams.indexOf('&' , chartTitleIndex) > -1) {
        titleParams = locationParams.substring(chartTitleIndex, locationParams.indexOf('&' , chartTitleIndex));
      }else {
        titleParams = locationParams.substring(chartTitleIndex);
      }
      chartTitle = titleParams.substring(chartTitleParams.length + 1);
      console.log(chartTitle);
      requestUrl = requestUrl.replace(titleParams, '')
    }

    var urlIndex = requestUrl.indexOf('url');
    if (urlIndex > -1) {
      var replaceStr = requestUrl.substring(0, urlIndex);
      requestUrl = requestUrl.replace(replaceStr, '')
    }else {
      requestUrl = '';
    }
    return {showAceEditor: showAceEditor, chartTitle: chartTitle, requestUrl: requestUrl};
  }
  return common;
});