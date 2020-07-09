<?php

require("connect.php");


$username = $_POST['username'];
$password = $_POST['password'];

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
        $password_hash = $row['password'];
        if (password_verify($password, $password_hash)) {
            $session_id = bin2hex(random_bytes(session_id_length));
            $stmt = $conn->prepare("UPDATE users SET session_id = ? WHERE ?");
            $stmt->execute([$session_id, $row['id']]);

            setcookie("username", "$username", time() + 3600 * 24 * 31, "/", "",  0);
            setcookie("session_id", "$session_id", time() + 3600 * 24 * 31, "/", "",  0);

            http_response_code(RESP_OKAY);
            echo json_encode(array("username" => $username, "session_id" => $session_id));
        } else {
            http_response_code(RESP_BAD);
            echo json_encode(array("message" => "authentication failed"));
        }
    } catch (\Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollback();
        }
        http_response_code(RESP_BAD);
        throw $e;
    }
} else {
    http_response_code(RESP_BAD);
    echo json_encode(array("message" => "authentication failed (username/password not POSTed)", "username" => "$username", "password" => "$password"));
}
