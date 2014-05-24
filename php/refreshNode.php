<?php
require_once("logf.php");
require_once("getChildNodes.php");

//logf("save_database");

//$json_str = '{"success":true,"children":[{"id":"1,localhost:3306[localhost:3306],blog","text":"blog","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],db1","text":"db1","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],db1251","text":"db1251","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],fisk_kadastr","text":"fisk_kadastr","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],fisk_kadastr2","text":"fisk_kadastr2","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],imag","text":"imag","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],mm","text":"mm","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],mysql","text":"mysql","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],rent","text":"rent","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],rim2000_import_test","text":"rim2000_import_test","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],test","text":"test","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],test2","text":"test2","iconCls":"database","loaded":false},{"id":"1,localhost:3306[localhost:3306],vtigercrm","text":"vtigercrm","iconCls":"database","loaded":false}]}';
//echo var_dump(json_decode($json_str, true));

//$r=json_decode($json_str, true);
//echo var_dump($r["children"]);


//$params = "node=1,localhost:3306[localhost:3306]&host=localhost&port=3306&user_name=root&password=1";


function hasChild($nodeId){
	global $arr_nodes_list;

	$flag = false;
	for ($i=0; $i<count($arr_nodes_list); $i++){
		if ($arr_nodes_list[$i]["nodeId"] === $nodeId){
			$flag = $arr_nodes_list[$i]["hasChild"];
			break;
		}
	};
	//if ($flag) $s_flag = "true"; else $s_flag = "false";
	//logf("***function hasChild*** ".$nodeId."; hasChild=".$s_flag);
	return $flag;
	//return false;
}

function GetTree($nodeId)
{ 
	echo("GetTree, param=".$nodeId."<br>");
	global $host;
	global $port;
	global $user_name;
	global $password;

	static $count = 0;
	$count++;
	//logf("count=".$count);
	//if ($count>2) 
		//exit;

	//$nodes = getChildNodes($_POST['host'],$_POST['port'],$_POST['user_name'],$_POST['password'],$nodeId);
	$nodes = getChildNodes($host,$port,$user_name,$password,$nodeId);
	echo "dump nodes===================<br>";
	echo var_dump($nodes);
	echo "===================<br>";
	
	//logf("nodes.count=".count($nodes));
	//echo 'dump<br>';
	//logf( var_dump($nodes) );
	//echo "<br>";
	//echo "=======================================================<br>";

	if (count($nodes) > 0){ //если ответ не пустой
		for ($i=0; $i<count($nodes); $i++){
//			logf("--$i--".$nodes[$i]["text"]);
			if ( hasChild($nodes[$i]['id']) ){
				$nodes[$i]['children'] = GetTree($nodes[$i]['id']);
			}
		}
		return $nodes;
	}
} // end function GetTree

/*
$host = $_POST['host'];
$port = $_POST['port'];
$user_name = $_POST['user_name'];
$password = $_POST['password'];
$nodeId = $_POST['node'];
$nodes_list = $_POST['nodes_list'];
*/
//logf($_POST['nodes_list']);
//exit;

$host = "localhost";
$port = "3306";
$user_name = "root";
$password = "1";
$nodeId = "0,localhost:3306[localhost:3306]";
$nodes_list = '[{"nodeId":"1,localhost:3306[localhost:3306],blog","hasChild":true,"expanded":true},{"nodeId":"1,localhost:3306[localhost:3306],db1","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],db1251","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],fisk_kadastr","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],fisk_kadastr2","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],imag","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],mm","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],mysql","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],rent","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],rim2000_import_test","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],test","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],test2","hasChild":false,"expanded":false},{"nodeId":"1,localhost:3306[localhost:3306],vtigercrm","hasChild":false,"expanded":false}]';

//logf("nodeId=".$nodeId);
//logf("nodes_list=".$nodes_list);
//exit;

$arr_nodes_list = json_decode($nodes_list, true);

//logf(json_encode($_POST));
//for ($i=0; $i<count($arr_nodes_list); $i++){
//	logf($arr_nodes_list[$i]["nodeId"].",".$arr_nodes_list[$i]["hasChild"].",".$arr_nodes_list[$i]["expanded"]);
//}
//exit;

$result = GetTree($nodeId);

//echo "<br>";

$o = array("success"=>true, "children"=>$result);
//logf("Result: ".json_encode($o));
echo "Result======================<br>";
echo json_encode($o);
