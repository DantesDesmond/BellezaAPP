<h1 class="nombre-pagina">Nuevo Servicio</h1>
<p class="descripcion-pagina">Debes llenar estos campos</p>

<?php
    include_once __DIR__ . '/../plantillas/barra.php';
    include_once __DIR__ . '/../plantillas/alertas.php';
?>

<form action="/servicios/crear" method="POST" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="boton" value="Guardar Servicio">
</form>