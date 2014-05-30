<?php

class db {
    static public function show() {
        return 'db::show';
    }

    static public function create($data) {
        global $user;

        return 'created db `' . $data->name . '` for user ' . $user->getLogin();
    }
}