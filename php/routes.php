<?php

$routes = array(
    "/" => array(
        "controller" => "main::index",
        "method" => "GET",
        "need_auth" => false,
    ),
    "db/show" => array(
        "controller" => "db::show",
        "method" => "GET",
        "need_auth" => true,
    ),
    "db/create" => array(
        "controller" => "db::create",
        "method" => "POST",
        "need_auth" => true,
    ),
);