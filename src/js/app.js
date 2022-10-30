let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
iniciarApp();
});

function iniciarApp() {
    mostarSeccion();//Muestra y oculta las secciones
    tabs();//cambiar de seleccion
    botonesPaginador();// Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();
    consultarAPI();
    idCliente();
    nombreCliente();//nombre del cliente a objeto cita
    seleccionarFecha();//añade fecha a la cita
    seleccionarHora();//añade hora cita
    mostrarResumen();// ultima pantalla

}

function mostarSeccion(){

    //ocultar la seccion que se muestre por clase
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }
    


    //Selecciona la seccion
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //Quita la clase tab a quien no lo tiene

    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}



function tabs() {
    const botones = document.querySelectorAll('.tabs button');

botones.forEach( boton => {
    boton.addEventListener('click', function(e){
        paso = parseInt( e.target.dataset.paso );

        mostarSeccion();

        botonesPaginador(); 
        


    });

});
}

function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    
    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    }else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostarSeccion();
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {

        if(paso <= pasoInicial)return;

        paso--;

        botonesPaginador();
    })

}
function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function() {

        if(paso >= pasoFinal)return;

        paso++;

        botonesPaginador();
    })
}

async function consultarAPI(){

try {
    const url = 'http://localhost:3000/api/servicios';
    const resultado = await fetch(url);
    const servicios = await resultado.json();

    mostrarServicios(servicios);
} catch (error) {
    console.log(error);
}

}

function mostrarServicios(servicios) {
    servicios.forEach( servicio => {
        const {id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        //const idServicio = document.createElement('P');
        //idServicio.classList.add('id-servicio');
        //idServicio.textContent = id;

        const servioDiv = document.createElement('DIV');
        servioDiv.classList.add('servicio');
        servioDiv.dataset.idServicio = id;
        servioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }

        servioDiv.appendChild(nombreServicio);
        servioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servioDiv);
    });
}

function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;


    //Elemento click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    // Comprobar si un servicio se agrego
    if (servicios.some( agregado => agregado.id === id ) ){
        cita.servicios = servicios.filter(agregado => agregado.id !==id);
        divServicio.classList.remove('seleccionado');

    }else{
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }

    

    
    
    //console.log(cita);
}

function idCliente() {
    cita.id = document.querySelector('#id').value;
}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;

    
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){
        
        const dia = new Date(e.target.value).getUTCDay();

        if ([6,0].includes(dia)){
            e.target.value = '';
            mostarAlerta('Fines de semana no permitidos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    });

}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(":") [0];
        if(hora<10 || hora >18) {
            e.target.value = '';
            mostarAlerta('Hora no permitida', 'error', '.formulario');
        }else{
            cita.hora = e.target.value;
            //console.log(cita);
        }
    })
}

function mostarAlerta(mensaje, tipo, elemento, desaparece = true){

    //solo me crea una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    };

    //crear una alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece) {
        //tiempo limite de la alerta 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    

}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');

    //limpiar el resumen de la alerta incompleta
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes('')|| cita.servicios.length === 0) {
        mostarAlerta('Faltan datos de Servicios, Fecha o Hora', 'error', '.contenido-resumen', false);
       return;
    }

    //Formatear el resumen
    const {nombre, fecha, hora, servicios } = cita;



    //Cabecera para servicios en resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de servicios';
    resumen.appendChild(headingServicios);

    //mostrando servicios
    servicios.forEach(servicio => {
        const {id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement ('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    })

        //Cabecera para cita en resumen
        const headingCita = document.createElement('H3');
        headingCita.textContent = 'Resumen de cita';
        resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear la fecha
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year,mes,dia));
    
    const opciones = {weekday:'long', year:'numeric', month:'long', day:'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);
    
    const fechaCita = document.createElement ('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement ('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    // Crea cita

    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}

async function reservarCita() {

    const { nombre, fecha, hora, servicios, id}= cita;

    const idServicios = servicios.map(servicio => servicio.id);
    //console.log(idServicios);


    const datos = new FormData();
    
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    //console.log([...datos]);

    try {

        const url = 'http://localhost:3000/api/citas'

        const respuesta = await fetch(url, {
            method: 'POST',
            body:datos
        });
        
        const resultado = await respuesta.json();
        console.log(resultado.resultado);
    
        if (resultado.resultado){
            Swal.fire({
                icon: 'success',
                title: 'Cita enviada',
                text: 'Cita enviada al administrador',
                button: 'OK'
              }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                
              })
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No podemos recibir tu cita',
              })
    }

    // api peticion


   
}