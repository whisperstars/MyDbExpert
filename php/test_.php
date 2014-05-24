<?php
require_once("logf.php");
require_once("getChildNodes.php");

$nodes = getChildNodes('localhost','3306','root','1','77,blog,T,a_table1');
echo var_dump($nodes);
echo "<br>=====================<br>";
$o = array("success"=>true, "children"=>$nodes);
echo json_encode($o);
/*
function GetTree($nodeId)
{ 
	$host	= 'localhost';
	$port	= '3306';
	$user_name = 'root';
	$password = '1';

	$nodes = getChildNodes($host,$port,$user_name,$password,$nodeId);

	if (count($nodes) > 0){ //если ответ не пустой
    //while ( $row = sqlsrv_fetch_array($ds) ) //перебираем ответ по нодам
		//for ($i=0; $i<count($nodes); $i++){
		//$p = $nodes[$i]
      // оределяем наличие потомков		
      //if (HasChild($row['id']))
        // есть потомки
        //$p['children'] = GetTree($row['id']);
      //else
      //{
        // нет потомков
      //  $p['leaf'] = true;
        // если помечена как группа - надо вывести иконку 
        //if ($row['is_group'] == 1)
          //$p['iconCls'] = 'tree_folder';
      //}
      //$nodes[] = $p;
      //$p = array();
		return $nodes;
	}
} // end function GetTree

$root['children'] = GetTree('1,localhost:3306[localhost:3306]');

echo json_encode($root);
*/