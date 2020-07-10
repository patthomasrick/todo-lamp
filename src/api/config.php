<?php

$is_prod = getenv('IS_PROD');
if (!$is_prod) {
    define("host", "mysql-server");
    define("db_user", "pwt5ca_todo");
    define("db_password", "23nBNY5FfxKx8QYKiAxV");
    define("db_name", "pwt5ca_todo");
} else {
    define("host", "mysql-server");
    define("db_user", "pwt5ca_todo");
    define("db_password", "23nBNY5FfxKx8QYKiAxV");
    define("db_name", "pwt5ca_todo");
}

const session_id_length = 32;
const conn_str = "mysql:host=" . host . ";dbname=" . db_name;

const RESP_OKAY = 200;
const RESP_BAD = 400;
const RESP_UNAUTH = 401;
