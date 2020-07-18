<?php

require "../connect.php";

$username = $_SESSION["username"];
$session_id = $_SESSION["session_id"];

try {
  if (verify_user($conn, $username, $session_id)) {
    echo json_encode([
      "is_valid" => true,
      "username" => $username,
      "session_id" => $session_id,
    ]);
  } else {
    http_response_code(RESP_UNAUTH);
    echo json_encode(["is_valid" => false]);
  }
} catch (\Exception $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollback();
  }
  db_fail();
}
