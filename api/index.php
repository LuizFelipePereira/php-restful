<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

$app->get('/', function() {
	echo "Welcome to Guest API";
});

$app->get('/guests', function() use ( $app ) {
	$guests = array(
		array('id' => 1, 'name' => 'Edy Segura', 'email' => 'edysegura@gmail.com'),
		array('id' => 2, 'name' => 'Rodrigo Faria', 'email' => 'rll@gmail.com'),
		array('id' => 3, 'name' => 'Renata Akemi', 'email' => 'renata@akemi.com')
	);
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($guests);
});

$app->post('/guest', function () use ( $app ) {
	$guest = json_decode($app->request->getBody(), true);
	$guest['id'] = 10;
	$app->response->header('Content-Type', 'application/json');
	echo json_encode($guest);
});

$app->delete('/guest/:id', function($id) use ( $app ) { 
	echo $id;
});

function getConnection() {
	$dbhost = getenv('IP');
	$dbuser = getenv('C9_USER');
	$dbpass = '';
	$dbname = 'c9';
	$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	return $pdo;
}

function getDB() {
	$pdo = getConnection();
	$db = new NotORM($pdo);
	return $db;
}

$app->run();
?>