<?php

/*
 * Главный PHP-скрипт, которому параметром передается имя нужного скрипта.
 */

$_POST['host'] = 'localhost';
$_POST['port'] = '3306';
$_POST['user_name'] = 'root';
$_POST['password'] = '1';
$_POST['submit'] = 'true';
$_POST['script_name'] = 'check_db_connect';

include_once 'config.php';

include 'auth/auth.php';

if ( isset($_POST['host']) ){
    $host = $_POST['host'];
    
    if( isset($_POST['port']) ){
        $host .= ':' . $_POST['port'];
    }

    isset($_POST['user_name']) ? $login = $_POST['user_name'] : $login = '';
    isset($_POST['password']) ? $pass = $_POST['password'] : $pass = '';
    isset($_POST['submit']) ? $submit = $_POST['submit'] : $submit = '';

    $auth_res = is_auth($host, $submit == 'true', $login, $pass);
    if ( $auth_res['result'] == 'ok' ){
        if( !isset($_POST['script_name']) ){
            $script_res = array(
                'result' => 'no',
                'message' => 'Script name is requier',
                'data' => '',
            );
        }
        else{
            $scripts_names = array(
                /* application scripts */
                'check_db_connect',
                'get-explorer-tree',
                'getChildNodes',
                'refreshNode',
                'save_database',
                
                'auth/logout',
                
                /* debug scripts */
                'test',
            );

            $script_name = $_POST['script_name'];
            if ( !$conf['check_available_script'] && array_search($script_name, $scripts_names) === FALSE ) {
                $script_res = array(
                    'result' => 'no',
                    'message' => 'Wrong script name',
                    'data' => '',
                );
            }
            else{
                $login = $_SESSION['login' . $host];
                $pass = $_SESSION['pass' . $host];
                $script_res = include $script_name . '.php';
            }
        }
    }
    else{
        $script_res = array(
            'result' => 'no',
            'message' => 'Can\'t connect',
            'data' => '',
        );
    }
}
else{
    $auth_res = array(
        'result' => 'no',
        'message' => 'Error: Host can\'t be empty',
    );
    $script_res = array(
        'result' => 'no',
        'message' => 'Host is requier',
        'data' => '',
    );
}

$full_res = array(
    'auth' => $auth_res,
    'script' => $script_res,
);

echo json_encode($full_res);