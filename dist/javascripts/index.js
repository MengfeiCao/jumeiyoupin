"use strict";

// $.ajax("http://localhost:8080/sign")
// .then((res)=>{
//     console.log("完成代理");
// });
// banner图
var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination'
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  // 如果需要滚动条
  scrollbar: {
    el: '.swiper-scrollbar'
  }
}); // 搜索

var timer = null;
var $input = $(".serch-center>input");
$input.on("input", function () {
  // 节流
  if (timer !== null) return false;
  timer = setTimeout(function () {
    var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=".concat($input.val(), "&json=1&p=3&sid=1422_21089_28131_26350_28266&req=2&csor=2");
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function success(res) {
        console.log(res);
      }
    }); // console.log($input.val());

    clearTimeout(timer);
    timer = null;
  }, 100);
});