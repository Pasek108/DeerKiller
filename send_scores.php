<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$hostname = "localhost";
$username = "root";
$passwd = "";
$dbname = "deerkiller";

try {
    $conn = new mysqli($hostname, $username, $passwd, $dbname);

    $level = $_GET["level"];
    $name = $_GET["name"];
    $score = $_GET["score"];
    $scores = [];

    $sql = "SELECT * FROM scores";
    $result = $conn -> query($sql);
    while ($row = $result -> fetch_assoc()) $scores[] = $row;
    
    $id = -1;
    $level_id = -1;
    if ($level == "easy") $level_id = 1;
    else if ($level == "medium") $level_id = 2;
    else if ($level == "hard") $level_id = 3;
    else if ($level == "hardcore") $level_id = 4;

    for ($i = 10 * ($level_id - 1); $i < 10 * $level_id; $i++) {
        if (intval($score) > intval($scores[$i]["score"])) {
            for ($j = 10 * $level_id; $j > $i + 1; $j--) {
                $stmt = $conn -> prepare("UPDATE scores SET name=?, score=? WHERE id=?");
                $stmt -> bind_param('sss', $scores[$j - 2]["name"], $scores[$j - 2]["score"], $j);
                $stmt -> execute();
            }

            $id = $i + 1;
            $stmt = $conn -> prepare("UPDATE scores SET name=?, score=? WHERE id=?");
            $stmt -> bind_param('sss', $name, $score, $id);
            $stmt -> execute();
            break;
        }
    }

    $conn -> close();
} catch (mysqli_sql_exception $e) {
    echo $e -> __toString();
}
