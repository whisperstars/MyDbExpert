<?php

if (isset($_POST['script_name']) {
	foreach($_POST as $k => $v) {
		$$k = $v;
	}

	if (isset($script_names[$script_name])){
		if($script_names[$script_name]['need_auth']){
			include 'auth/auth.php';
			/*Проверка, передан ли хост*/
			if(isset($host)){
				if(isset($port)){
					$host .= $port;
				}
				else{

				}

				/*Проверка переменных для авторизации*/
				if(isset($user_name){
					$login = $user_name;
				}
				else{
					$login = '';
				}
				if(isset($password)){
					$pass = $password;
				}
				else{
					$pass = '';
				}
				if(!isset($submit)){
					$submit = '';
				}
				/*Авторизация*/
				$auth_res = is_auth($host, $submit == 'true', $login, $pass);

				if ( $auth_res['result'] == 'ok' ){
					$pass = $_SESSION['pass' . $login . $host];
                	$script_res = include $script_name . '.php';
				}
				else{

				}
			}
			else{

			}
		}
		else{
			
		}
	}
	else{
		
	}
}