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

var list = _(".serch-content");

var serch = _(".serch-center>input"); // console.log(serch)


var showNum = 4;
var timer = null;

function handlerSearch() {
  if (timer !== null) {
    //在规定时间之内已经执行过一次了,不用在执行了;
    return false;
  }

  timer = setTimeout(function () {
    // console.log(search.value);
    // 1. 发送一个jsonp请求; 请求回来的数据渲染页面;
    var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=".concat(search.value, "&json=1&p=3&sid=1422_21089_28131_26350_28266&req=2&csor=2");
    jsonp(url, "cb").then(function (res) {
      // console.log(res.s);
      var html = "";
      res.s.every(function (item, index) {
        html += "<li>".concat(item, "</li>");
        return index < showNum;
      });
      list.innerHTML = html;
    });
    timer = null;
  }, 100);
} // 点击切换“今日疯抢”和“明日预告”；


var toggle = _(".todayTom>div");

var today = _(".todayTom").children[0];

var tomorrow = _(".todayTom").children[1];

var count = _(".tomNum");

var todContent = _(".today-content");

var tomContent = _(".tom-content"); // console.log(today,tomorrow);


toggle.forEach(function (item) {
  item.addEventListener("click", handlerClick.bind(false, item));
});

function handlerClick(item) {
  toggle.forEach(function (item) {
    item.className = "";
  });
  item.className = "active";
}

; // console.log(today)

today.addEventListener("click", function () {
  todContent.style.display = "none";
  tomContent.style.display = "block"; // console.log(1)
});
tomorrow.addEventListener("click", function () {
  todContent.style.display = "block";
  tomContent.style.display = "none";
  count.style.display = "none";
});