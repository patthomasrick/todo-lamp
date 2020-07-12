<?php

require("../connect.php");

$username = $_COOKIE["username"];
$session_id = $_COOKIE["session_id"];
$task_id = $_POST["task_id"];
$task_done = $_POST["task_done"];

if ($task_done == "") {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $task_id = $request->task_id;
    $task_done = $request->task_done;
}

try {
    if (verify_user($conn, $username, $session_id) && verify_task_ownership($conn, $username, $session_id, $task_id)) {
        $stmt = $conn->prepare("UPDATE tasks SET is_done = ? WHERE ?");
        $stmt->execute([$task_done, $task_id]);
        $id = $conn->lastInsertId();
        http_response_code(RESP_OKAY);
        echo json_encode(array( "id" => "$id" ));
    }
} catch (\Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollback();
    }
    db_fail();
}
