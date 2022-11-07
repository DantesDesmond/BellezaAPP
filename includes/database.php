<?php

//acuerdate crear variables de entorno para poder subir el proyecto
$db = mysqli_connect('localhost', 'root', 'Migracion100', 'appsalon_mvc');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
