<?php

require "../connect.php";

$username = $_SESSION["username"];
$session_id = $_SESSION["session_id"];

try {
  if (verify_user($conn)) {
    // Now get all tasks.
    $all_tasks = get_all_tasks($conn, $username);
    http_response_code(RESP_OKAY);
    echo json_encode($all_tasks);
  } else {
    http_response_code(RESP_UNAUTH);
    echo json_encode([
      "error" => "Authentication error.",
    ]);
  }
} catch (\Exception $e) {
  if ($conn->inTransaction()) {
    $conn->rollback();
  }
  db_fail();
}
