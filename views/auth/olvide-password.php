<h1 class="nombre-pagina">Olvide Contraseña</h1>
<p class="descripcion-pagina">Restablece tu contraseña, escribiendo aquí tu mail</p>

<form action="/olvide" class="formulario" method="POST">

<div class="campo">
    <label for="email">Email</label>
    <input type="email"
    id="email"
    name="email"
    placeholder="Tu Email"

    />
</div>

<input type="submit" class="boton" value="Enviar Instrucciones">

</form>

<div class="acciones">
    <a href="/"> ¿Ya tienes cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta"> ¿Aún no tienes una cuenta? Create una</a>
</div>