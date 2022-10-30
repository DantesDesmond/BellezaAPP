<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIController{
    public static function index() {
        $servicios = Servicio::all();

        echo json_encode($servicios);
    }

    public static function guardar() {
// almacen de citas
        $cita = new Cita($_POST);

        $resultado = $cita->guardar();

        $id = $resultado['id'];

        // almacen citas + servicios

        $idServicios = explode (",", $_POST['servicios']);

        foreach($idServicios as $idServicio){
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];

            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }
// retorno de respuesta
        $respuesta = [
            'resultado' => $resultado
        ];

        echo json_encode($respuesta);
    }
}