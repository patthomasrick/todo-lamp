<?php

require_once("config.php");

try {
    $conn = new PDO(conn_str, db_user, db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $set_tz = $conn->prepare("SET time_zone='US/Eastern';");
    $set_tz->execute([]);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}


function verify_user($conn, $username, $session_id)
{
    if (!$username || !$session_id) {
        return 0;
    }
    $stmt = $conn->prepare("SELECT id, session_id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    if (password_verify($session_id, $row["session_id"])) {
        return $row["id"];
    } else {
        return 0;
    }
}

function verify_task_ownership($conn, $username, $session_id, $task_id)
{
    if (!$task_id) {
        return false;
    }
    $id = verify_user($conn, $username, $session_id);
    if ($id) {
        $stmt = $conn->prepare("SELECT username FROM tasks WHERE id = ?");
        $stmt->execute([$task_id]);
        $row = $stmt->fetch();
        return (strcmp($username, $row["username"]) == 0);
    }
    return false;
}

function get_all_tasks($conn, $username)
{
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE username = ? ORDER BY date_created");
    $stmt->execute([$username]);
    $all_tasks = array();
    while ($row = $stmt->fetch()) {
        array_push($all_tasks, $row);
    }
    return $all_tasks;
}

function db_fail() {
    http_response_code(RESP_BAD);
    echo json_encode(array(
        "error" => "Database error."
    ));
}
