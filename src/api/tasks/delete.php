<?php

require "../connect.php";

$username = $_SESSION["username"];
$session_id = $_SESSION["session_id"];
$task_id = $_POST["task_id"];

if ($task_id == "") {
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $task_id = $request->task_id;
}

try {
  if (
    verify_user($conn) &&
    verify_task_ownership($conn, $username, $session_id, $task_id)
  ) {
    $stmt = $conn->prepare("DELETE FROM `tasks` WHERE `tasks`.`id` = ?;");
    $stmt->execute([$task_id]);
    http_response_code(RESP_OKAY);
    echo json_encode([
      "id" => $task_id,
    ]);
  } else {
    http_response_code(RESP_BAD);
  }
} catch (\Exception $e) {
  if ($conn->inTransaction()) {
    $conn->rollback();
  }
  db_fail();
  echo $e;
}
