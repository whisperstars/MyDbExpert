<?php

class Session {

    protected static $_instance;

    private function __construct() {}

    private function __clone() {}

    private function __wakeup() {}

    public static function instance() {
        if (!isset(self::$_instance)) {
            $className = __CLASS__;
            self::$_instance = new $className;
        }

        self::$_instance->start();

        return self::$_instance;
    }

    public function start() {
        session_start();
    }

    public function set($key, $val) {
        $_SESSION[$key] = $val;
    }

    public function key_exists($key) {
        return isset($_SESSION[$key]);
    }

    public function get($key) {
        return $_SESSION[$key];
    }

    public function delete($key) {
        unset($_SESSION[$key]);
    }

    public function destroy() {
        session_destroy();
        unset($_SESSION);
    }

    public function getId() {
        return session_id();
    }

    public function regenerateId() {
        session_regenerate_id();
    }
}