define(function () {
  var commonEditor = {};
  // set splitter position by percentage, left should be between 0 to 1
  commonEditor.setSplitPosition = function (percentage) {
    percentage = Math.min(0.9, Math.max(0.1, percentage));

    var left = percentage * 100;
    $('#code-container').css('width', left + '%').css('display', 'block');
    $('.right-container').css('width', (100 - left) + '%')
      .css('left', left + '%');
    $('#h-handler').css('left', left + '%').css('display', 'block');
    if (myChart) {
      myChart.resize();
    }
  }
  var gb = {
    handler: {isDown: false}
  };
  var myChart;
  commonEditor.initEventHandler = function (gbparams, myChartparams) {
    gb = gbparams;
    myChart = myChartparams;
    // reset typing state
    var typingHandler = null;

    $('#h-handler').mousedown(function() {

      gb.handler.isDown = true;

    });


    $(window).mousemove(function(e) {

      if (gb.handler.isDown) {
        var left = e.clientX / window.innerWidth;
        commonEditor.setSplitPosition(left, myChart);
      }

    }).mouseup(function() {

      gb.handler.isDown = false;

    });

    $(window).resize(function() {
      myChart.resize();
      commonEditor.checkEditorIfToShow();
    });

  }
  commonEditor.checkEditorIfToShow = function () {

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
        commonEditor.setSplitPosition(0.4);
        gb.editorIsShown = true;
      }
    }
  }
  return commonEditor;
});