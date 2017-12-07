<?php 
	// 获取post请求传递的数据
	$username = $_POST["username"];
	$password = $_POST["password"];
	$phone = $_POST["phone"];
	/* 连接数据库，保存到数据库表中 */
	// 连接数据库服务器
	mysql_connect("localhost:3306", "root", "");
	// 设置读/写库时的编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	// 选择使用的数据库
	mysql_select_db("h51708");
	// 创建sql语句
	$sql = "INSERT INTO users (username, password, phone) VALUES ('$username', '$password', '$phone')";
	// 执行SQL语句，返回执行结果，如果返回值为true表示执行成功，否则执行失败
	$result = mysql_query($sql);
	// 根据执行结果判断
	if ($result) {
		echo '{"status":1, "message":"success"}';
	} else {
		echo '{"status":0, "message":"failed"}';
	}
	// 关闭数据库连接
	mysql_close();
 ?>