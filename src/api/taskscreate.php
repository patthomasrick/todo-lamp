<?php

require("connect.php");

try {
    // Verify the user.
    $stmt = $conn->prepare("SELECT session_id FROM users WHERE username = ?");
    $stmt->execute([$_COOKIE['username']]);
    $row = $stmt->fetch();
    if ($row['session_id'] === $_COOKIE['session_id']) {
        $stmt = $conn->prepare("SELECT * FROM tasks where username = ?");
        $stmt->execute([$_COOKIE['username']]);

        $count = 0;
        $all_tasks = array();
        while ($row = $stmt->fetch()) {
            $all_tasks[$count]=$row;
        }

        echo json_encode($all_tasks);
    }
} catch (\Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollback();
    }
    throw $e;
}
