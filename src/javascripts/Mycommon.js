
// ---------------------------------querySelectorAll选择符封装---------------------------------------

function _(select){
    // 如果选择的数组只有一项,让它直接返回这个项而不是数组;
    var ret_Arr = document.querySelectorAll(select);
    if(ret_Arr.length == 0){
        return null;
    }else{
        return ret_Arr.length == 1 ? ret_Arr[0] : ret_Arr;
    }
}


// -----------------------------事件监听封装：----------------------------------------------------------
 function _on(dom,event_type,fn){
                dom.addEventListener(event_type,fn);
}

function _off(dom,event_type,fn){
    dom.removeEventListener(event_type,fn);
}    

function _once(dom,event_type,fn){
    dom.addEventListener(event_type,fn);
    // 当个事件执行的时候,移除掉当前监听的事件;
    dom.addEventListener(event_type,removeEvent)
    // 是清空参数函数及当前清空函数的功能;
    function removeEvent(){
        _off(dom,event_type,fn)
        _off(dom,event_type,removeEvent)
    }
}   


// -------------------------------------------------事件委托封装：-------------------------------------------
function event_delegation(parent_node,event_type,target_selector,fn){
    parent_node.addEventListener(event_type,fn_click);
    function fn_click(evt){
        var e = evt || window.event;
        var target = e.target || e.srcElement;

        // 先选中所有的标红项的li
        var targets = list.querySelectorAll(target_selector);
        // console.log(targets);
        // 刚开始选中的.active 是一个伪数组，要想用的话 必须转成真数组；
        targets = Array.from(targets);
        // 转成真数组后，用indexOf进行判定，
        //若目标元素target不符合筛选条件，（也就是class名不为active的情况），返回值为 -1，不执行；
        if(targets.indexOf(target) == -1){
            return false;
        }else{
            fn(e);
        }
    }
}
// 事件委托函数应用：
// event_delegation(list,"click",".active",fn_linshi);
// function fn_linshi(){
//     alert("打印出来了");
// }


//--------------------------------物体运动的封装-------------------------------------
var timer=null;
function animate(dom,attr,target){
      // if(timer !== null) return false;
      clearInterval(timer);
      timer = setInterval(()=>{
            let distance = target - getStyle(dom,attr,"number");
            let speed = distance > 0 ? Math.ceil(distance/10) : Math.floor(distance / 10);

            dom.style[attr] = getStyle(dom,attr,"number") + speed + "px";

            if(distance === 0){
                  clearInterval(timer);
                  timer = null;
            }
      },100)
}
function getStyle(dom,attr,type){
      // 用 新方法取值;
      var res_attr = getComputedStyle(dom)[attr];
      // 如果要求转换成数字,那么就转换;
      if(type === "number"){
            return parseInt(res_attr);
      }
      // 如果不要求就原样返回;
      return res_attr;
}


// -----------------------------ajaxGet---------------------------

var ajaxGET = function(url){
            
    return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send(null);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                resolve(xhr.response);
            }
        }
    })
}


// -------------------------ajaxPost-------------------------------

function ajaxPost(url,data){

    return new Promise(function(resolve,reject){
          var xhr = new XMLHttpRequest();
          xhr.open("POST",url);
          xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

          // 现在的data是一个对象, 但是根据我们的设置我们要把data转换成一个对象;

          var data_str = "";
          for(var attr in data){
                if(data_str.length !== 0){
                    data_str += "&";
                }
                data_str += attr + "=" + data[attr];
          }
          // {username : 123456, password :12346};

          xhr.send(data_str);

          xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                      resolve(xhr.response);
                }
          }

    })
}

// -----------------------倒计时差值封装------------------
function downCount(dateString){
    // 获取未来时间和现在时间的时间差 ms
    var target = new Date(dateString);
    var now = new Date();
    var Dtime = target.getTime() - now.getTime();
    // 获取时间差的时分秒
    var hour = parseInt(Dtime / 1000 / 3600);
    var minute = parseInt((Dtime - (hour * 60 *60 * 1000 )) / 1000 / 60);
    var second = parseInt((Dtime - hour * 60 *60 * 1000 - minute * 60 * 1000) / 1000);
    var ms = Dtime % 1000;
    // 补零；
    // if(dateString < 10){
    // dateString = "0" + dateString;
    // }
    // function buling(num){
    // num < 10 ? "0" + num : num ;
    // }
    // 返回值
    return {
    hour : hour ,
    minute : minute ,
    second : second ,
    ms : ms
    }
}

// 使用
// function mydownCount(){
//     var newYear = downCount("2019/2/17");
//     // console.log(newYear)

//     _hour.innerHTML = newYear.hour;
//     _minute.innerHTML = newYear.minute;
//     _second.innerHTML = newYear.second;

// }
// mydownCount();
// setInterval(mydownCount,1000);

//jsonp封装
 //第一个参数是数据路径，第二个参数是前后端约定的字段名
 function jsonp(url,jsonp_key){
    return new Promise(function(resolve,reject){

          // 函数名随机处理避免占用命名空间，避免冲突;

          var randomName = "_" + Date.now()
          console.log(randomName);

          window[randomName] = function(res){
                // console.log(res);
                resolve(res);
          }
          // 2. 创建并插入script标签;
          var script = document.createElement("script");

          // 当前url之中是否存在 ? （存在问好表示已经有数据了），我应该用& 去拼接数据，反之则用 ?;
          url = url + (/\?/.test(url) ? "&" : "?") + jsonp_key + "=" + randomName;

          script.src = url;
          // 3. 标签放入页面之中;
          document.body.appendChild(script);
          // 4. 清理垃圾;
          script.onload = function(){
                this.remove();

                window[randomName] = null;
                delete window[randomName];
          }
    })
}