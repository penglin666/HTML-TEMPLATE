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
    nav: "../js/index/nav",
    aside:"../js/index/aside",
  },
  shim: {
    bootstrap: ["jquery"]
  },
});

// Load the main app module to start the app
requirejs(["nav", "aside","bootstrap"], function (nav,aside) {
  $("body").css("padding-top", $(".navbar").height());
  hashChange();
  nav.userInfoApi();
  window.onhashchange = function () {
    hashChange();
  };
  //配置路由
  function hashChange() {
    switch (location.hash) {
      default:
        $("article").load("/template/home.html");
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
  }
});
