<?php

    include_once 'config.php';
    
    include_once 'vendors/idiorm/idiorm.php';
    
    include_once 'Session.php';
    include_once 'User.php';

    include_once 'routes.php';
    include_once 'Routing.php';

    include_once 'logf.php';
    /*$_POST["request"] = '{
        "uri": "db/show",
        "method": "GET",
        "auth":{
            "login": "root",
            "pass": "1",
            "host": "localhost"
        },
        "data": {"name": "vt"}
    }';*/

    $session = Session::instance();

    $session->destroy();

    $auth = array(
        'need_auth' => false,
    );

    $error = array(
        'exist_error' => false,
    );

    logf($_POST['request']);

    if(isset($_POST["request"])) {
        $request = json_decode($_POST["request"]);
    }
    else {
        $request = json_decode('{"uri":"/", "method": "GET", "data": {}}');
    }

    if(property_exists($request, 'auth')) {
        try {
            $user = User::instance($request->auth);
            
            ORM::configure('mysql:host=' . $user->getHost() . ';dbname=information_schema');
            ORM::configure('username', $user->getLogin());
            ORM::configure('password', $user->getPass());
            
            try {
                $db = ORM::get_db();

                $auth = array(
                    'need_auth' => true,
                    'auth' => true,
                );
            }
            catch(Exception $e) {
                $auth = array(
                    'need_auth' => true,
                    'auth' => false,
                    'error_message' => $e->getMessage(),
                );
            }
        }
        catch(Exception $e) {
            $auth = array(
                'need_auth' => true,
                'auth' => false,
                'error_message' => $e->getMessage(),
            );
        }
    }

    if(!$auth['need_auth'] || ($auth['need_auth'] && $auth['auth'])) {
        $router = new Routing($routes);
        try {
            $data = $router->set_request($request)
                ->findController()
                ->startController();

            die(json_encode(
                array(
                    'auth' => $auth,
                    'error' => $error,
                    'data' => $data
                )
            ));
        }
        catch(Exception $e) {
            $error = array(
                'exist_error' => true,
                'error_message' => $e->getMessage(),
            );

            die(json_encode(
                array(
                    'auth' => $auth,
                    'error' => $error
                )
            ));
        }
    }
    else {
        die(json_encode(array('auth' => $auth)));
    }