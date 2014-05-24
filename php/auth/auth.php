<?php

session_start();


/* Генерация ключа пользователю из соли, User_agent пользователя, языка пользователя, кодировки. */
function token_generate($conf_token, $ua, $lang, $encod, $conf_hash_func){
	return $conf_hash_func($lang) . $conf_hash_func($encod . $conf_token) . $conf_hash_func($ua . $conf_hash_func($conf_token)) . $conf_hash_func($conf_token);
}

/* Генерация дополнительной id сессии. */
function sess_generate($token, $time, $conf_hash_func){
	return $conf_hash_func($time) . $token;
}

function is_auth( $host, $submit = FALSE, $login = '', $pass = '' ){
    global $conf;
    
    if ( isset($conf['users']) && isset($conf['users'][$host]) ){
        $login = $conf['users'][$host]['name'];
        $pass = $conf['users'][$host]['pass'];
        
        try{
            $pdo = new PDO('mysql:host=' . $host . ';dbname=information_schema', $login, $pass);
            return array(
                'result' => 'ok',
                'messsage' => '',
            );
        }
        catch( PDOException $e ){
            return array(
                'result' => 'no',
                'message' => 'Error: "' . $e->GetMessage() . '"',
            );
        }
    }
    elseif ( $submit ) {
        if( !empty( $login) ){
            try{
                $pdo = new PDO('mysql:host=' . $host . ';dbname=information_schema', $login, $pass);
                $time = date('c');
                $token = token_generate($conf['token'], $_SERVER['HTTP_USER_AGENT'], $_SERVER['HTTP_ACCEPT_LANGUAGE'], $_SERVER["HTTP_ACCEPT_ENCODING"], $conf['hash_func']);
                $_SESSION['time_start' . $host] = $time;
                $_SESSION['sess_id2'  . $host] = sess_generate($token, $time, $conf['hash_func']);
                $_SESSION['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
                $_SESSION['login' . $host] = $login;
                $_SESSION['pass' . $host] = $pass;
                
                if(isset($_SESSION['hosts']) && array_search($host, $_SESSION['hosts']) === FALSE){
                    $_SESSION['hosts'][] = $host;
                }
                if(!isset($_SESSION['hosts'])){
                    $_SESSION['hosts'][] = $host;
                }
                
                setcookie('time_start' . $host , $time);
                setcookie('sess_id2' . $host, sess_generate($token, $time, $conf['hash_func']));
                
                return array(
                    'result' => 'ok',
                    'messsage' => '',
                );
            }
            catch(PDOException $e){
                unset($_SESSION['login' . $host]);
                unset($_SESSION['pass' . $host]);
                unset($_SESSION['time_start' . $host]);
                unset($_SESSION['sess_id2'  . $host]);
                
                return array(
                    'result' => 'no',
                    'message' => 'Error: "' . $e->GetMessage() . '"',
                );
            }
        }
        else{
            return array(
                'result' => 'no',
                'message' => 'Error: "Login can\'t be empty"',
            );
        }
    }
    elseif(isset($_SESSION['sess_id2' . $host]) && isset($_SESSION['time_start' . $host]) && isset($_SESSION['hosts']) && array_search($host, $_SESSION['hosts']) !== FALSE){
        $time = date('c');

        if( isset($_COOKIE['time_start' . str_replace('.', '_', $host)]) && isset($_SESSION['time_start' . $host]) && ( strtotime($time) - strtotime($_SESSION['time_start' . $host])  < $conf['time_expire']) && isset($_SESSION['sess_id2' . $host]) && isset($_COOKIE['sess_id2' . str_replace('.', '_', $host)]) && $_SESSION['sess_id2' . $host] == $_COOKIE['sess_id2' . str_replace('.', '_', $host)] && $_SESSION['time_start' . $host] == $_COOKIE['time_start' . str_replace('.', '_', $host)] && $_SESSION['user_agent'] == $_SERVER['HTTP_USER_AGENT'] && isset($_SESSION['login' . $host])){
            $login = $_SESSION['login' . $host];
            $pass = $_SESSION['pass' . $host];

            try{
                $pdo = new PDO('mysql:host=' . $host . ';dbname=information_schema', $login, $pass);
                $_SESSION['time_start' . $host] = $time;
                setcookie('time_start' . $host, $time);
                
                $token = token_generate($conf['token'], $_SERVER['HTTP_USER_AGENT'], $_SERVER['HTTP_ACCEPT_LANGUAGE'], $_SERVER["HTTP_ACCEPT_ENCODING"], $conf['hash_func']);
                $_SESSION['sess_id2'  . $host] = sess_generate($token, $time, $conf['hash_func']);
                setcookie('sess_id2' . $host, sess_generate($token, $time, $conf['hash_func']));
                
                return array(
                    'result' => 'ok',
                    'messsage' => '',
                );
            }
            catch(PDOException $e){
                unset($_SESSION['login' . $host]);
                unset($_SESSION['pass' . $host]);
                unset($_SESSION['time_start' . $host]);
                unset($_SESSION['sess_id2'  . $host]);
                setcookie('sess_id2' . $host, '');
                setcookie('time_start' . $host, '');
                
                return array(
                    'result' => 'no',
                    'message' => 'Error: "' . $e->GetMessage() . '"',
                );
            }
        }
        else{
            unset($_SESSION['login' . $host]);
            unset($_SESSION['pass' . $host]);
            unset($_SESSION['time_start' . $host]);
            unset($_SESSION['sess_id2'  . $host]);
            $key = array_search($host, $_SESSION['hosts']);
            unset($_SESSION['hosts'][$key]);
            setcookie('sess_id2' . $host, '');
            setcookie('time_start' . $host, '');
            
            return array(
                'result' => 'no',
                'message' => 'Error: "something wrong, enter login and pass again"',
            );
        }
    }
    else{
        $host = $_POST['host'];
        unset($_SESSION['login' . $host]);
        unset($_SESSION['pass' . $host]);
        unset($_SESSION['time_start' . $host]);
        unset($_SESSION['sess_id2'  . $host]);
        setcookie('sess_id2' . $host, '');
        setcookie('time_start' . $host, '');
        
        return array(
            'result' => 'no',
            'message' => 'Error: "something wrong, enter login and pass again"',
        );
    }
}

session_regenerate_id();