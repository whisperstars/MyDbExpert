<?php

class db {
    static public function show() {
        $raws = ORM::forTable('SCHEMATA')
            ->select('SCHEMA_NAME')
            ->select('DEFAULT_CHARACTER_SET_NAME')
            ->select('DEFAULT_COLLATION_NAME')
            ->findMany();
        $dbs = [];
        foreach ($raws as $raw) {
            $dbs[] = array(
                'Name' => $raw->SCHEMA_NAME,
                'CharacterSetName' => $raw->DEFAULT_CHARACTER_SET_NAME,
                'CollationName' => $raw->DEFAULT_COLLATION_NAME
            );
        }

        return $dbs;
    }

    static public function create($data) {
        global $user;

        return 'created db `' . $data->name . '` for user ' . $user->getLogin();
    }
}