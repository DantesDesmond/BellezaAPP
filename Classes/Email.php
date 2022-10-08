<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{

    public $email;
    public $nombre;
    public $token;


    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;


    }

    public function enviarConfirmacion(){
        // Crear email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'e6b4a20241ebb7';
        $mail->Password = '13bb41dcd12bfa';

        $mail->setFrom('elvynmedina1993@gmail.com');
        $mail->addAddress('elvynmedina06@hotmail.com', 'AppSalonmonica.com');
        $mail->Subject = 'Confirma la cuenta';

        //Set html
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en AppSalon, 
        solo confirmala presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token="
        . $this->token . "'> Confirmar cuenta </a> </p>";
        $contenido .= "<p> Si tu no solicitaste esta cuenta, ignora el mensaje</p>";
        $contenido .= "</html>";
        $mail->Body = $contenido;


        //Enviar el email
        $mail->send();
    }
}