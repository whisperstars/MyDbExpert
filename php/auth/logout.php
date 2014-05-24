<?php

session_destroy();
unset($_SESSION);

return array(
    'result' => 'yes',
    'message' => 'Session destroyed',
);