<?php

require "../connect.php";

$username = $_SESSION["username"];
$session_id = $_SESSION["session_id"];
$task_id = $_POST["task_id"];
$task_name = $_POST["name"];
$task_description = $_POST["description"];
$task_priority = $_POST["priority"];
$task_date_due = $_POST["date_due"];

if ($task_id == "") {
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $task_id = $request->task_id;
  $task_name = $request->name;
  $task_description = $request->description;
  $task_priority = $request->priority;
  $task_date_due = $request->date_due;
}

try {
  if (
    verify_user($conn) &&
    verify_task_ownership($conn, $username, $session_id, $task_id)
  ) {
    $stmt = $conn->prepare(
      "UPDATE `tasks` SET `name` = ?, `description` = ?, `priority` = ?, `date_due` = ? WHERE id = ?;"
    );
    $stmt->execute([
      $task_name,
      $task_description,
      $task_priority,
      $task_date_due,
      $task_id,
    ]);
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
