<?php
$host = 'localhost';
$dbname = 'slush_vibes';
$username = 'root'; // Ajustar según configuración de XAMPP/WAMP
$password = ''; // Ajustar según configuración de XAMPP/WAMP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Error de conexión a la base de datos: ' . $e->getMessage()]));
}
?>
