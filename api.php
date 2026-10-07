<?php
header('Content-Type: application/json');
require_once 'db.php';

$category_slug = $_GET['category'] ?? '';

if (!$category_slug) {
    echo json_encode(['error' => 'Categoría no especificada']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT p.name, p.description, p.price, p.image_url 
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE c.slug = ?
    ");
    $stmt->execute([$category_slug]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($products);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al obtener los productos']);
}
?>
