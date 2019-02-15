"use strict";

// 切换登录方式
var $phone = $(".login-select input:first");
var $common = $(".login-select input:last");
var $login_phone = $(".login-phone");
var $login_common = $(".login-common");
var $username = $(".login-common>input:first");
var $password = $(".common-password");
var $submit = $(".submit"); // console.log($phone,$common,$login_phone,$login_common);

$phone.on("click", function () {
  $login_phone.show();
  $login_common.hide();
});
$common.on("click", function () {
  $login_common.show();
  $login_phone.hide();
}); // 验证
// 账号密码验证

$username.on("focus", showUserTip);
$password.on("focus", showPassTip);
$username.on("blur", hideUserTip);
$password.on("blur", hidePassTip);

function showUserTip() {
  var $tip = $(".login-common p:first");
  $tip.addClass("show");
}

function showPassTip() {
  var $tip = $(".login-common p:last");
  $tip.addClass("show");
}

function hideUserTip() {
  var $tip = $(".login-common p:first");
  $tip.removeClass("show");
}

function hidePassTip() {
  var $tip = $(".login-common p:last");
  $tip.removeClass("show");
} // 提交验证


$submit.on("click", handlerSubmit);

function handlerSubmit(evt) {
  var $e = evt || window.event;
  var $userValue = $username.val();
  var $passValue = $password.val(); // console.log($userValue,$passValue);

  $e.preventDefault(); // 根据接口文档定义一个数据对象；

  var data = {
    username: $userValue,
    password: $passValue
  };
  console.log(data); // 利用封装的ajaxPost发送数据给后端

  ajaxPost("http://localhost/jumeiyoupin/interface/login.php", data).then(function (res) {
    console.log(res);
  });
}