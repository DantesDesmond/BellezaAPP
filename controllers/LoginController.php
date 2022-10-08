<?php

namespace Controllers;

use Classes\Email;
use MVC\Router;
use Model\Usuario;
use PHPMailer\PHPMailer\PHPMailer;

class LoginController {
    public static function login(Router $router){
        $router->render('auth/login');
    }

    public static function logout(){
        echo "Desde logout";
    }

    public static function olvide(Router $router){
        
        $router->render('auth/olvide-password',[
            
        ]);

    }

    public static function recuperar(){
        echo "Desde Recuperar";
    }

    public static function crear(Router $router){
        $usuario = new Usuario;

        //Alertas vacias
        $alertas = [];
        if ($_SERVER ['REQUEST_METHOD'] === 'POST'){
            
            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();

// Alertas esten vacias
        if(empty($alertas)){
            //verificacion si el usuario esta
            $resultado = $usuario->existeUsuario();

            if ($resultado->num_rows){
                $alertas = Usuario::getAlertas();
            }else {
                //contraseña baneada
                $usuario->hashPassword();
                //Aqui esta el token
                $usuario->crearToken();

                //manda correo
                $email = new Email($usuario->nombre, $usuario->email, 
                $usuario->token);


                $email->enviarConfirmacion();

                // Crear el usuario
                $resultado = $usuario->guardar();
                if($resultado){
                    header('Location:/mensaje');
                }

                //debuguear($usuario);


            }
        }

        }

        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas


        ]);
    }

    public static function mensaje(Router $router) {

        $router->render('auth/mensaje');

    }

        public static function confirmar(Router $router) {

            $alertas=[];

            $token = s($_GET['token']);

           $usuario = Usuario::where('token',$token);

           if (empty($usuario)){
            //Manda mensaje de error
            Usuario::setAlerta('error', 'Token No válido');
           }else{
            //Modifica a usuario confirmado
            $usuario->confirmado = "1";
            $usuario->token = null;
            $usuario->guardar();
            Usuario::setAlerta('exito', 'Cuenta Comprobada Correctamente');
           }
        
        $alertas = Usuario::getAlertas();
        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }

}