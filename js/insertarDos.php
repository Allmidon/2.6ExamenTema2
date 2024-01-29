<?php
// Permitir todas las solicitudes (ajusta en producción)
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos del cuerpo de la solicitud POST
    $ip = $_POST['ip'];
    $pais = $_POST['pais'];
    $continente = $_POST['continente'];
    $zona_horaria = $_POST['zona_horaria'];

    // Imprimir los datos en formato JSON
    echo json_encode(['ip' => $ip, 'pais' => $pais, 'continente' => $continente, 'zona_horaria' => $zona_horaria]);
    // Realizar la conexión a MySQL y la inserción de datos
    $servername = "127.0.0.1";
    $username = "admindos";
    $password = "1h1n1234$";
    $dbname = "Paises";

    // Crear la conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Insertar datos en la tabla de tu base de datos
    $sql = "INSERT INTO India(ip, pais, continente, zona_horaria) VALUES ('$ip', '$pais', '$continente', '$zona_horaria')";

    if ($conn->query($sql) === TRUE) {
        echo "Datos insertados en la base de datos";
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo "Solo se permiten solicitudes POST";
}
?>