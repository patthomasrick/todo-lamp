<?php

require "../connect.php";

$username = $_SESSION["username"];
$session_id = $_SESSION["session_id"];

try {
  $id = verify_user($conn, $username, $session_id);
  if ($id) {
    $stmt = $conn->prepare("UPDATE users SET session_id = NULL WHERE id = ?");
    $stmt->execute([$id]);

    // setcookie("username", "", time() - 1, COOKIE_PATH, COOKIE_DOMAIN, 0);
    // setcookie("session_id", "", time() - 1, COOKIE_PATH, COOKIE_DOMAIN, 0);
    $_SESSION['username'] = null;
    $_SESSION['session_id'] = null;

    http_response_code(RESP_OKAY);
  } else {
    http_response_code(RESP_UNAUTH);
  }
} catch (\Exception $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollback();
  }
  db_fail();
}
