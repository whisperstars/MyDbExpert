<?php

    include_once 'config.php';
    include_once 'routes.php';
    include_once 'routing.php';

    $_POST["request"] = '{"uri":"db/create", "method": "POST", "data": {"name": "vt"}}';

    if(isset($_POST["request"])){
        $request = json_decode($_POST["request"]);
    }
    else {
        $request = json_decode('{"uri":"/", "method": "GET", "data": {}}');
    }

    $router = new Routing($routes);
    $router->set_request($request);
    
    try{
        echo $router->findController()
            ->startController();
    }
    catch(Exception $e) {
        echo $e->getMessage();
    }