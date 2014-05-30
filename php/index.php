<?php

    include_once 'config.php';
    include_once 'routes.php';
    include_once 'User.php';
    include_once 'Routing.php';

    $_POST["request"] = '{
        "uri": "db/create",
        "method": "POST",
        "user":{
            "login" :"root",
            "pass": "1",
            "host": "localhost"
        },
        "data": {"name": "vt"}
    }';

    if(isset($_POST["request"])) {
        $request = json_decode($_POST["request"]);
    }
    else {
        $request = json_decode('{"uri":"/", "method": "GET", "data": {}}');
    }

    if(property_exists($request, 'user')) {
        $user = User::instance($request->user);
    }

    $router = new Routing($routes);
    
    try {
        echo $router->set_request($request)
            ->findController()
            ->startController();
    }
    catch(Exception $e) {
        echo $e->getMessage();
    }