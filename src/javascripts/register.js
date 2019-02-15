
// 元素选择区
var submit = document.getElementById("submit");
var username = document.querySelector(".username");
var password = document.querySelector(".password");
var form = document.querySelector("form");
var yanzhengma = document.querySelector(".yanzhengma");
var rePassword = document.querySelector(".rePassword");

// ----------------------正则验证------------------

// 1.非法输入提示
// 2.未经验证严禁提交

// 验证账号
username.addEventListener("focus",showUserTip);
username.addEventListener("blur",confirmUsername);
function showUserTip(){
    var tip = username.parentNode.children[1];
    tip.className = "show";
}
function confirmUsername(){
    var user_reg = /^\d{11}$/;
    var tip = username.parentNode.children[1];
    var user_value = username.value;

    // console.log(user_value);
    if(user_reg.test(user_value)){
        tip.className = "success";
        tip.innerHTML = "OK"
    }else{
        tip.className = "error";
    }
}

// 验证验证码
yanzhengma.addEventListener("focus",showYanzhengmaTip);
yanzhengma.addEventListener("blur",confirmYanzhengma);

function showYanzhengmaTip(){
    var tip = username.parentNode.children[3];
    tip.className = "show";
}
function confirmYanzhengma(){
    var yanzhengma_reg = /^\d{6}$/;
    var tip = username.parentNode.children[3];
    var yanzhengma_value = yanzhengma.value;

    // console.log(user_value);
    if(yanzhengma_reg.test(yanzhengma_value)){
        tip.className = "success";
        tip.innerHTML = "OK"
    }else{
        tip.className = "error";
    }
}

// 验证密码
password.addEventListener("focus",showPasTip);
password.addEventListener("blur",confirmPassword);
function showPasTip(){
    var tip = username.parentNode.children[5];
    tip.className = "show";
}
function confirmPassword(){
    var pas_reg = /^\w{6,16}$/;
    var tip = username.parentNode.children[5];
    var pass_value = password.value;

    // console.log(user_value);
    if(pas_reg.test(pass_value)){
        tip.className = "success";
        tip.innerHTML = "OK"
    }else{
        tip.className = "error";
    }
}

// 再次验证密码
rePassword.addEventListener("focus",showRePasTip);
rePassword.addEventListener("blur",confirmRePassword);
function showRePasTip(){
    var tip = username.parentNode.children[7];
    tip.className = "show";
}
function confirmRePassword(){
    var tip = username.parentNode.children[7];
    var pass_value = password.value;
    var repass_value = rePassword.value;
    // console.log(user_value);
    if(pass_value === repass_value){
        tip.className = "success";
        tip.innerHTML = "OK"
    }else{
        tip.className = "error";
        tip.innerHTML = "您两次输入的密码不一致，请重新输入";
    }
}

// 阻止form的默认事件
// form.onsubmit = function(evt){
//     var e = evt || event ;
//     e.preventDefault();
// };

submit.addEventListener("click",submitForm)
function submitForm(evt){
    var e = evt || window.event;
    var user_value = username.value;
    var pass_value = password.value;
    var url = "http://localhost/jumeiyoupin/interface/register.php";
    url += `?username=${user_value}&password=${pass_value}`;
    var tips = document.querySelectorAll(".login-phone p");
    tips = Array.from(tips);
    var res = tips.every(function(item){
        return item.className === "success";
    });
    //如果没有满足条件那么我就阻止;
    if(res === false){
        e.preventDefault();
        tips.forEach(function(item){
            item.className = "error";
        })
    // 为true后提交数据发送给后端
    }else{
        console.log(1);
        ajaxGET(url)
        .then(function(res){
            console.log(res);
        });
    }
}


