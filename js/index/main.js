console.log("require加载成功");
// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
  baseUrl: "lib",
  paths: {
    jquery: "jquery.min",
    bootstrap: "../lib/bootstrap/js/bootstrap",
    echarts: "../../lib/echarts",
    home: "../js/index/home",
  },
  shim: {
    bootstrap: ["jquery"],
  },
});

// Load the main app module to start the app
requirejs(["home", "echarts", "bootstrap"], function (home, echarts) {
  $("body").css("padding-top", $(".navbar").height());
  hashChange();
  window.onhashchange = function () {
    hashChange();
  };
  //配置路由
  function hashChange() {
    switch (location.hash) {
      default:
        $("article").load("/template/home.html");
        setTimeout(function () {
          setEcharts();
        }, 20)
        break;

      case "#pic":
        $("article").load("/template/pic.html");
        break;

      case "#note":
        $("article").load("/template/note.html");
        break;
    }

    if (location.hash === "") {
      location.hash = "#home";
    }
  };
  function setEcharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init($("#echarts")[0]);
    var option;
    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
    // window.addEventListener("resize", function () {
    //   myChart.resize();
    // });
  }
});
