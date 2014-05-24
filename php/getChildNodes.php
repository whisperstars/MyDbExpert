<?php
	mysql_connect($_POST["host"].":".$_POST["port"], $_POST["user_name"], $_POST["password"]);
	mysql_select_db("information_schema");

	$result = mysql_query( $_POST["sql_str"] );
	$s = "";
	while ($row = mysql_fetch_array($result)) {
		$s .= $row[0].",";
	}
	$s = substr($s, 0, strlen($s)-1);
	echo $s;
?>