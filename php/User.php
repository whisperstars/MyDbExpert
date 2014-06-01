<?php

class User {
    private static $host = '';
    private static $login = '';
    private static $pass = '';

    protected static $_instance;

    private function __construct() {}

    private function __clone() {}

    private function __wakeup() {}

    public static function instance($auth) {
        if (!isset(self::$_instance)) {
            global $conf;
            global $session;

            $className = __CLASS__;
            self::$_instance = new $className;

            self::$host = $auth->host;
            self::$login = $auth->login;

            $db_host = self::$host . '@' . self::$login;

            if(isset($conf) && isset($conf['users']) && isset($conf['users'][$db_host])) {
                self::$pass = $conf[$db_host]['pass'];
            }
            elseif($session->key_exists($db_host)) {
                self::$pass = $session->get($db_host)['pass'];
            }
            elseif(property_exists($auth, 'pass')) {
                self::$pass = $auth->pass;

                $session->set($db_host, array('pass' => self::$pass));
            }
            else {
                throw new Exception("There is no password", 1);
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