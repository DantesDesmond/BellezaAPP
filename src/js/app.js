let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

document.addEventListener('DOMContentLoaded', function() {
iniciarApp();
});

function iniciarApp() {
    mostarSeccion();//Muestra y oculta las secciones
    tabs();//cambiar de seleccion
    botonesPaginador();// Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();

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