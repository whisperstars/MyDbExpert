<?php

class db {
    static public function show() {
        echo "db::show";
    }

    static public function create($data) {
        return "created db `" . $data->name . "`";
    }
}