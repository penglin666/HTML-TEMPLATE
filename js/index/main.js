console.log("require加载成功");
// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
  baseUrl: "lib",
  paths: {
    "jquery":"jquery.min",
    "nav": "../js/index/nav",
    "bootstrap":"../lib/bootstrap/js/bootstrap"
  },
  shim:{
    "bootstrap":["jquery"]
  }
});

// Load the main app module to start the app
requirejs(["nav"],function(nav){
  nav.test();
});
