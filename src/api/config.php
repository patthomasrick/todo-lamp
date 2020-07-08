<?php

const session_id_length = 32;

const host = "mysql-server";
const db_user = "pwt5ca_todo";
const db_password = "23nBNY5FfxKx8QYKiAxV";
const db_name = "pwt5ca_todo";
// const db_options = array(
//     PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
// ); 

const conn_str = "mysql:host=" . host . ";dbname=" . db_name;


const RESP_OKAY = 200;
const RESP_BAD = 400;
const RESP_UNAUTH = 401;
