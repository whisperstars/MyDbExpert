<?php
require_once("logf.php");
//logf("save_database");
//logf(json_encode($_POST));

$host		= $_POST["host"];
$port		= $_POST["port"];
$user_name 	= $_POST["user_name"];
$password 	= $_POST["password"];	
	
	$db_name = $_POST["DBName"];
	$db_charset = $_POST["charSet"];
	$db_collation = $_POST["collation"];
	
	
//Проверяем коннект
try {
	$conn = mysql_connect($host.":".$port, $user_name, $password);
	//$conn = mysql_connect("localhost:3306", "root", 1);
	if (!$conn) {
		$connection = false;
	} else {
		$connection = true;
	}
}
catch(Exception $ex) {
  $connection = false;
}
	
if ($connection){
	$sql  = "CREATE DATABASE ".$db_name." CHARACTER SET ".$db_charset." COLLATE ".$db_collation;
	mysql_query($sql);
	echo "{\"success\":true}";
} else {
	echo "{\"success\":false}";
}

?>