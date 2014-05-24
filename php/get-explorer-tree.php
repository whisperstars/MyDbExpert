<?php
require_once("getChildNodes.php");
require_once("logf.php");
//logf(json_encode($_POST));

$nodes = getChildNodes(
		$_POST["host"],
		$_POST["port"],
		$_POST["user_name"],
		$_POST["password"],
		$_POST["node"]
	);
	
$o = array("success"=>true, "children"=>$nodes);
//logf(json_encode($o));
echo json_encode($o);
	
?>