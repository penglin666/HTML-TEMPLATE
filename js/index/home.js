define(["jquery"], function ($) {
  $(".navbar-left>li").on("click", function (e) {
    $(".navbar-left>li").removeClass("active");
    $(this).addClass("active");
  });
  // export const getNoteCount = (data) => {
  //   return request({
  //     url: '/note/count',
  //     method: 'get',
  //     data
  //   })
  // }
  function getNoteCount() {
    $.ajax({
      // url: "http://localhost:3333/api/login",
      url: "https://www.iuleejieun.xyz/api/note/count",
      type: "get",
      data: {},
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
      success: function (res) {
        return res.data
      },
    });
  }
  return {
    getNoteCount,
  };
});
