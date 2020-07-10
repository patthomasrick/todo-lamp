<?php

require("connect.php");

$username = $_COOKIE['username'];
$session_id = $_COOKIE['session_id'];

if ($username != null && $session_id != null) {
    try {
        $stmt = $conn->prepare("SELECT id, session_id FROM users WHERE username = ?;");
        $stmt->execute(["$username"]);
        $row = $stmt->fetch();
        if (password_verify($session_id, $row['session_id'])) {
            $stmt = $conn->prepare("UPDATE users SET session_id = NULL WHERE id = ?");
            $stmt->execute([$row['id']]);

            setcookie("username", "", time() - 1, "/", "",  0);
            setcookie("session_id", "", time() - 1, "/", "",  0);
            echo json_encode(array("success" => True));
        } else {
            echo json_encode(array("success" => False));
        }
    } catch (\Exception $e) {
        if ($conn->inTransaction()) {
            $conn->rollback();
        }
        throw $e;
    }
} else {
    echo json_encode(array("success" => False));
}
