<h1 class="nombre-pagina">Crear Nueva Cita</h1>
<p class="descripcion-pagina">Elige el servicio aquí</p>

<div class="barra">
    <p>Bienvenido: <?php echo $nombre ?? '';?></p>

    <a class="boton" href="/logout">Terminar la Sesión</a>
</div>

<div id="app">
    <nav class="tabs">
        <button class="actual"  type="button" data-paso="1"> Servicios</button>
        <button class=""  type="button" data-paso="2"> Información Cita</button>
        <button class=""  type="button" data-paso="3"> Resumen</button>
    </nav>

<div id="paso-1" class="seccion">
<h2>Servicios</h2>
<p class="text-center"> Elige los servicios porfavor</p>
<div id="servicios" class="listado-servicios"></div>
</div>

<div id="paso-2" class="seccion">
<h2>Tus datos y cita</h2>
<p class="text-center"> Coloca tus datos y fecha de cita</p>

<form class="formulario">
<div class="campo">
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" placeholder="Tu Nombre" value="<?php echo $nombre;?>" disabled/>
</div>

<div class="campo">
    <label for="fecha">Fecha</label>
    <input type="date" id="fecha" min="<?php echo date('Y-m-d', strtotime('+0 day') ); ?>" />
</div>

<div class="campo">
    <label for="hora">Hora</label>
    <input type="time" id="hora" />
</div>

<input type="hidden" id="id" value="<?php echo $id?>">

</form>
</div>

<div id="paso-3" class="seccion contenido-resumen">
<h2>Resumen</h2>
<p>Verifica que la información sea correcta</p>
</div>

<div class="paginacion">
        <button id="anterior" class="boton">Anterior &laquo;</button>
        <button id="siguiente" class="boton">siguiente &raquo;</button>
</div>
</div>

<?php

$script ="
<script src='//cdn.jsdelivr.net/npm/sweetalert2@11'></script>
<script src ='build/js/app.js'></script>";

?>