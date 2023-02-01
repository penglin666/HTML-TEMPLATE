define(["jquery","echarts"], function ($) {
  $(".navbar-left>li").on("click", function (e) {
    $(".navbar-left>li").removeClass("active");
    $(this).addClass("active");
  });
  function userInfoApi() {
    $.ajax({
      // url: "http://localhost:3333/api/login",
      url: "https://www.iuleejieun.xyz/api/userInfo",
      type: "get",
      data: {},
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      success: function (res) {
        if(res.code===200){
          localStorage.setItem("userInfo",JSON.stringify(res.data));
          $(".login").hide();
          $(".register").hide();
          $(".user").show();
          $(".logout").show();
        }else if(res.code===401){
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          $(".login").show();
          $(".register").show();
          $(".user").hide();
          $(".logout").hide();
        }
      },
    });
  }
  $(".logout").click(function(){
    alert("退出登录成功")
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    location.reload();
  })
  return {
    userInfoApi,
  };
});
