<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$hostname = "localhost";
$username = "root";
$passwd = "";
$dbname = "deerkiller";

try {
    $conn = new mysqli($hostname, $username, $passwd, $dbname);

    $score = [];
    $sql = "SELECT * FROM scores";
    $result = $conn -> query($sql);
    while ($row = $result -> fetch_assoc()) $score[] = $row;
    echo json_encode($score);

    $conn -> close();
} catch (mysqli_sql_exception $e) {
    echo $e -> __toString();
}

?>