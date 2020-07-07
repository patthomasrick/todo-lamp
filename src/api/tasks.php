<?php

require("connect.php");

try {
    $stmt = $conn->query("SELECT * FROM tasks");
    while ($row = $stmt->fetch()) {
        echo $row['name'] . "<br />\n";
    }
} catch (\Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollback();
        // If we got here our two data updates are not in the database
    }
    throw $e;
}
