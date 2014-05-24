<?php

class Routing{
    function __construct($routes) {
        $this->routes = $routes;
    }

    function set_request($request) {
        $this->uri = $request->uri;
        $this->method = $request->method;
        $this->data = $request->data;

        return $this;
    }

    function findController() {
        if(isset($this->routes[$this->uri])){
            if($this->routes[$this->uri]['method'] === $this->method){
                $this->controller_name = $this->routes[$this->uri]['controller'];
            }
            else {
                throw new Exception('There is no method `' . $this->method . '` for route `' . $this->uri . '`', 1);
            }
        }
        else {
            throw new Exception('There is no route `' . $this->uri . '`', 1);
        }

        return $this;
    }

    function startController() {
        $controller_file = 'app/'.substr($this->controller_name, 0, strpos($this->controller_name, ':')).'.php';
        
        if(file_exists($controller_file)) {
            include_once $controller_file;

            if(is_callable($this->controller_name)) {
                return call_user_func_array($this->controller_name, array($this->data));
            }
            else {
                throw new Exception('There is no method `' . $this->controller_name . '`', 1);
            }
        }
        else {
            throw new Exception('There is no file `' . $this->controller_file . '`', 1);
        }
    }
}