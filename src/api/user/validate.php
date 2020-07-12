<?php

require("../connect.php");

$username = $_COOKIE["username"];
$session_id = $_COOKIE["session_id"];

try {
    if (verify_user($conn, $username, $session_id)) {
        echo json_encode(array(
            "is_valid" => $is_valid,
            "username" => $username,
            "session_id" => $session_id,
        ));
    } else {
        echo json_encode(array("is_valid" => False));
    }
} catch (\Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollback();
    }
    db_fail();
}
