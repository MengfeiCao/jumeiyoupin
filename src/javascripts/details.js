// 元素选择
var normal_wrap = _(".Magnifier-normal");
// 大图焦点
var big_wrap = _(".Magnifier-big");
// normal图焦点
var focus = _(".focus");
var big_img = big_wrap.children[0];
var normal_img = normal_wrap.children[0];
var small_wrap = _(".Magnifier-small");
var small_choice = small_wrap.children;
// console.log(small_choice);



// -----------------放大镜------------------

// 计算比例
var prop = parseInt(getComputedStyle(big_wrap)["width"]) / parseInt(getComputedStyle(focus)["width"]);
// console.log(prop);
big_img.style.width = normal_wrap.offsetWidth * prop + "px";
big_img.style.height = normal_wrap.offsetHeight * prop + "px";


// 鼠标移入显示
normal_wrap.addEventListener("mouseenter",toggle.bind(false,"show"));
normal_wrap.addEventListener("mouseleave",toggle.bind(false,"hide"));
function toggle(type){
    if(type === "show"){
        focus.style.display = "block";
        big_wrap.style.display = "block";
    }else{
        focus.style.display = "none";
        big_wrap.style.display = "none";
    }
}

normal_wrap.addEventListener("mousemove",focusMove);

function focusMove(evt){
    var e = evt || window.event;
    // 边界检测
    var _left = e.offsetX - focus.offsetWidth / 2;
    var _top = e.offsetY - focus.offsetHeight / 2;
    
    // 判断最小值
    _left = _left <= 0 ? 0 : _left ;
    _top = _top <= 0 ? 0 : _top ;
    // 判断最大值
    var leftMax = normal_wrap.offsetWidth - focus.offsetWidth;
    var topMax = normal_wrap.offsetHeight - focus.offsetHeight;
    _left = _left >= leftMax ? leftMax : _left ;
    _top = _top >= topMax ? topMax : _top;

    // 左侧小图移动
    focus.style.left = _left + "px";
    focus.style.top = _top + "px";
    
    // 右侧大图移动
    big_img.style.left = -(_left * prop) + "px";
    big_img.style.top = -(_top * prop) + "px";

}

// 选择small图改变normal图和big图
small_choice= Array.from(small_choice);
// console.log(small_choice);
// 给每个 i 添加点击事件
small_choice.forEach((item)=>{
    item.addEventListener("click",change.bind(false,item));
})

function change(item){
    // 改变class名(先清空再添加)
    small_choice.forEach((item)=>{
        item.className = "";
    })
    item.className = "active";

    // 替换图片
    
    // 首先先现获取数据
    var bigSrc = item.getAttribute("data-big");
    var normalSrc = item.getAttribute("data-normal");
    // console.log(bigSrc,normalSrc);
    big_img.src = bigSrc;
    normal_img.src = normalSrc;
}


// 倒计时

var nowdate = new Date();
var future = new Date("2019/2/18");
var _day = _(".day");
var _hour = _(".hour");
var _minutes = _(".minute");
var _second = _(".second");
// // console.log(nowdate,future);

// daojishi();
setInterval(daojishi,1000);
function daojishi(){
    var Dtime = future.getTime() - nowdate.getTime();
    var difference_day = parseInt(Dtime / 1000 / 3600 / 24) ;
    var hour = parseInt(Dtime / 1000 / 3600);
    var minute = parseInt((Dtime - hour * 60 * 60 * 1000) / 1000 / 60);
    var second = parseInt((Dtime - hour * 1000 * 3600 - minute * 60 * 1000) / 1000);

    _day.innerHTML = difference_day;
    // console.log(_day,difference_day);
    _hour.innerHTML = hour;
    _minutes.innerHTML = minute;
    _second.innerHTML = second;
};




