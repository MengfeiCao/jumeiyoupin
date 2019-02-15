<?php
    // 链接大数据库
    $con = mysql_connect("localhost","root","root");
    
    // 判定，若链接失败，报错
    if(!$con){
        die('{"state":"error","errorType":"数据库错误"}');
    };

    // 链接小数据库
    mysql_select_db("jumei_user");
    
?>