<?php

require("connect.php");

$username = $_COOKIE['username'];
$session_id = $_COOKIE['session_id'];

$task_name = $_POST["name"];
$task_description = $_POST["description"];
$task_priority = $_POST["priority"];

if ($task_name == "" || $task_description == "" || $task_priority == "") {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $task_name = $request->name;
    $task_description = $request->description;
    $task_priority = $request->priority;
}

try {
    // Verify the user.
    $stmt = $conn->prepare("SELECT session_id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    if (password_verify($session_id, $row['session_id'])) {
        $stmt = $conn->prepare("
        INSERT INTO `tasks`
            (`username`, `name`, `description`, `priority`, `date_created`) 
        VALUES 
            (?, ?, ?, ?, CURRENT_TIME())
        ");
        $stmt->execute([$username, $task_name, $task_description, $task_priority]);

        // http_response_code(RESP_OKAY);
    }
} catch (\Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollback();
    }
    throw $e;
}
