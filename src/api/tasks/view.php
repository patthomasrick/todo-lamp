<?php

require("../connect.php");

$username = $_COOKIE["username"];
$session_id = $_COOKIE["session_id"];

try {
    if (verify_user($conn, $username, $session_id)) {
        // Now get all tasks.
        $all_tasks = get_all_tasks($conn, $username);
        http_response_code(RESP_OKAY);
        echo json_encode($all_tasks);
    } else {
        http_response_code(RESP_UNAUTH);
        echo json_encode(array(
            "error" => "Authentication error."
        ));
    }
} catch (\Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollback();
    }
    db_fail();
}
