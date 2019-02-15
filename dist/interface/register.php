<?php
    // 注册；
    header("Access-Control-Allow-Origin:*");
    header("Content-Type: text/html;charset=utf-8");
    
    // echo "注册未完成";

    #1.  获取数据

    $username = @$_REQUEST["username"];
    $password = @$_REQUEST["password"];
    #2. 验证  
    
    #账号密码是否为空
    
    if( !$password || !$username ){
        die('{"state":"error","errorType":"参数不能为空"}');
    };

    # 数据是否重复

    // 首先先要链接数据库
    require("./connect.php");

    $selecet_query = "SELECT username FROM users" ;
    $select_res = mysql_query($selecet_query);
    // echo $select_res;
    while($row = mysql_fetch_array($select_res)){
        // echo $row["username"];
        if($username === $row["username"]){
            // 关闭数据库
            mysql_close($con);
            die('{"state":"error","stateCode":"用户名重复"}');
        }
    }


    #3. 插入数据
    // 密码加密
    $password = md5($password);

    $insert_query = "INSERT INTO users (username , password) VALUES ('$username','$password')";
    $insert_res = mysql_query($insert_query);

    if($insert_res){
        die('{"state":"success","errorType":"null","stateCode":"1"}');
    }else{
        die('{"state":"error","errorType":"数据库写入失败","stateCode":"5"}');
    };


?>