<?php

require("../connect.php");


$username = $_POST["username"];
$password = $_POST["password"];

if ($username == "" || $password == "") {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $username = $request->username;
    $password = $request->password;
}

if ($username != null && $password != null) {
    try {
        $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?;");
        $stmt->execute(["$username"]);
        $row = $stmt->fetch();
        $password_hash = $row["password"];
        if (password_verify($password, $password_hash)) {
            $session_id = bin2hex(random_bytes(session_id_length));
            $session_id_hashed = password_hash($session_id, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE users SET session_id = ? WHERE ?");
            $stmt->execute([$session_id_hashed, $row["id"]]);

            setcookie("username", "$username", time() + COOKIE_LIFE, COOKIE_PATH, COOKIE_DOMAIN, 0);
            setcookie("session_id", "$session_id", time() + COOKIE_LIFE, COOKIE_PATH, COOKIE_DOMAIN, 0);

            http_response_code(RESP_OKAY);
            echo json_encode(array("username" => $username, "session_id" => $session_id));
        } else {
            http_response_code(RESP_UNAUTH);
            echo json_encode(array("error" => "Authentication failed."));
        }
    } catch (\Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollback();
        }
        db_fail();
    }
} else {
    http_response_code(RESP_BAD);
    echo json_encode(array("error" => "Authentication failed (username/password not POSTed).", "username" => "$username", "password" => "$password"));
}
