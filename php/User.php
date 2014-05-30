<?php

class User {
    private static $host = '';
    private static $login = '';
    private static $pass = '';

    protected static $_instance;

    private function __construct() {}

    private function __clone() {}

    private function __wakeup() {}

    public static function instance($user) {
        if (!isset(self::$_instance)) {
            global $conf;

            $className = __CLASS__;
            self::$_instance = new $className;

            self::$host = $user->host;
            self::$login = $user->login;

            if(isset($conf) && isset($conf['users']) && isset($conf['users'][self::$host + '@' + self::$login])) {
                self::$pass = $conf[self::$host + '@' + self::$login]['pass'];
            }
            elseif(isset($_SESSION) && isset($_SESSION[self::$host + '@' + self::$login]['pass'])) {
                self::$pass = $_SESSION[self::$host + '@' + self::$login]['pass'];
            }
            elseif(property_exists($user, 'pass')) {
                self::$pass = $user->pass;
            }
        }

        return self::$_instance;
    }

    public function getHost() {
        return self::$host;
    }

    public function getLogin() {
        return self::$login;
    }

    public function getPass() {
        return self::$pass;
    }
}