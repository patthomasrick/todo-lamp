<?php

require("connect.php");

$username = $_COOKIE['username'];
$session_id = $_COOKIE['session_id'];

if ($username != null && $session_id != null) {
    try {
        $stmt = $conn->prepare("SELECT id, session_id FROM users WHERE username = ?;");
        $stmt->execute(["$username"]);
        $row = $stmt->fetch();
        if ($row['session_id'] == $session_id) {
            $stmt = $conn->prepare("UPDATE users SET session_id = NULL WHERE id = ?");
            $stmt->execute([$row['id']]);

            setcookie("username", "", time() - 1, "/", "",  0);
            setcookie("session_id", "", time() - 1, "/", "",  0);
            echo ("Log out success");
        } else {
            die("Log out failed.");
        }
    } catch (\Exception $e) {
        if ($conn->inTransaction()) {
            $conn->rollback();
        }
        throw $e;
    }
} else {
    die("Log out failed (not logged in).");
}
