let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
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

    

    
    
    console.log(cita);
}