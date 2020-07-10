<?php

require("connect.php");

$username = $_COOKIE['username'];
$session_id = $_COOKIE['session_id'];

if ($username != null && $session_id != null) {
    try {
        $stmt = $conn->prepare("SELECT session_id FROM users WHERE username = ?;");
        $stmt->execute(["$username"]);
        $row = $stmt->fetch();
        $is_valid = password_verify($session_id, $row['session_id']);
        if ($is_valid) {
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
        echo json_encode(array(
            "is_valid" => False,
            'message' => "Error logging out."
        ));
    }
} else {
    echo json_encode(array(
        "is_valid" => False,
        'message' => "Not logged in."
    ));
}
