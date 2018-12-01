<?php

//error_reporting(0);

if (!isset($_GET['function']))
    die("404");

require_once ('config.php');
        
$config = new Config();

try {

    $db = new mysqli(
        $config->host,
        $config->user,
        $config->password,
        $config->base
    );      

}catch(Exception $e){
    echo $e->getMessage();
}

if ($db->connect_error)
    die("Error on connect");
        

switch ($_GET['function']){
    case 'addScore':
        if (!isset($_POST['name']) || !isset($_POST['score']))
            die("Wrong input");
        
        $name = addslashes($_POST['name']);
                
        if ($name == "Player")
            $name .= "_" . rand(0, 10000);
        
        $score = (int)$_POST['score'];
        
        if ($name == '' || $score == 0)
            die('Wrong input');
        
        $db->query("INSERT INTO rjr_scoreboard (name, score) VALUES ('{$name}', {$score})")
            or die("bad");
        
        die($name);
        
        break;
    case 'getScores':
        
        $results = $db->query("SELECT name, score FROM rjr_scoreboard WHERE time >= '" . date("Y-m-d", strtotime("- 7 days")) . "' ORDER BY score DESC LIMIT 10");
        $res = [];
        
        while ($r = $results->fetch_assoc()){
            array_push($res, $r);
        }
        
        die(json_encode($res, JSON_UNESCAPED_UNICODE));
        
        break;
}