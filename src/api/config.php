<?php

$is_dev = getenv("IS_DEV");
if ($is_dev) {
    define("host", "mysql-server");
    define("db_user", "pwt5ca_todo");
    define("db_password", "23nBNY5FfxKx8QYKiAxV");
    define("db_name", "pwt5ca_todo");

    define("COOKIE_DOMAIN", "");
    define("COOKIE_PATH", "/");
    define("COOKIE_LIFE", 60*60*24);
} else {
    define("host", "mysql-server");
    define("db_user", "pwt5ca_todo");
    define("db_password", "23nBNY5FfxKx8QYKiAxV");
    define("db_name", "pwt5ca_todo");

    define("COOKIE_DOMAIN", "");
    define("COOKIE_PATH", "/");
    define("COOKIE_LIFE", 60*60*24);
}

const session_id_length = 32;
const conn_str = "mysql:host=" . host . ";dbname=" . db_name;

const RESP_OKAY = 200;
const RESP_BAD = 400;
const RESP_UNAUTH = 401;
