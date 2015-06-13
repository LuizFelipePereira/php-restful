<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

$app->get('/', function () {
	echo 'APIs are up and running!';
});

$app->get('/guests', function () use ($app) {
  $db = getDB();
	
	$guests = array();
	foreach($db->guests() as $guest) {
		$guests[] = array(
			'id' => $guest['id'],
			'name' => $guest['name'],
			'email' => $guest['email']
		);
	}
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($guests);
});

$app->post("/guest", function () use ($app) {
	$db = getDB();
	
	$guest = json_decode($app->request->getBody(), true);
	$result = $db->guests->insert($guest);
	
	$app->response()->header("Content-Type", "application/json");
	echo json_encode($result);
});

$app->delete("/guest/:id", function ($id) use ($app) {
	$db = getDB();
	$response = "";
	
	$guest = $db->guests()->where("id", $id);
	
	if ($guest->fetch()) {
		$result = $guest->delete();
		$response = json_encode(array(
				"status" => true,
				"message" => "Guest deleted successfully"
		));
	}
	else {
		$response = json_encode(array(
				"status" => false,
				"message" => "Guest id $id does not exist"
		));
		$app->response->setStatus(404);
	}
	
	$app->response()->header("Content-Type", "application/json");
	echo $response;
});

function getConnection() {
	$dbhost = "127.0.0.1";
	$dbuser = "root";
	$dbpass = "root";
	$dbname = "guestlistdb";
	$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $pdo;
}

function getDB() {
	$pdo = getConnection();
	$db  = new NotORM($pdo);
	return $db;
}

$app->run();
?>