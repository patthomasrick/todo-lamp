<?php

require("connect.php");

$username = $_COOKIE['username'];
$session_id = $_COOKIE['session_id'];

try {
    // Verify the user.
    $stmt = $conn->prepare("SELECT session_id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    if ($row['session_id'] == $session_id) {
        $stmt = $conn->prepare("SELECT * FROM tasks where username = ? ORDER BY date_created");
        $stmt->execute([$username]);

        $count = 0;
        $all_tasks = array();

        while ($row = $stmt->fetch()) {
            $all_tasks[$count] = $row;
            $count++;
        }

        echo json_encode($all_tasks);
    } else {
        http_response_code(RESP_UNAUTH);
    }
} catch (\Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollback();
    }
    http_response_code(RESP_UNAUTH);
}
