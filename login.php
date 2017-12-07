<?php 
	$username = $_POST["username"];
	$password = $_POST["password"];

	/* 连接数据库，判断 */
	mysql_connect("localhost:3306", "root", "");
	// 设置读/写库时的编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	// 选择数据库
	mysql_select_db("h51708");
	$sql = "SELECT username FROM users WHERE username='$username' AND password='$password'";
	// 执行查询，返回查询结果集
	$result = mysql_query($sql);
	// 读取查询结果中的数据
	if ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo '{"status":1,"message":"success","data":'. json_encode($row) .'}';
	} else {
		echo '{"status":0,"message":"failed","data":{}}';
	}
	// 关闭数据库连接
	mysql_close();
 ?>