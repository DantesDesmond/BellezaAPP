<?php

namespace Model;

Class Usuario extends ActiveRecord {
    protected static $tabla = 'usuarios';
    protected static $columnasDB =['id','nombre','apellido','email','password', 'telefono', 'admin', 'confirmado', 'token' ];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct ($args = []){
      $this->id = $args['id'] ?? null;
      $this->id = $args['nombre'] ?? '';
      $this->id = $args['apellido'] ?? '';
      $this->id = $args['email'] ?? '';
      $this->id = $args['password'] ?? '';
      $this->id = $args['telefono'] ?? '';
      $this->id = $args['admin'] ?? '0';
      $this->id = $args['confirmado'] ?? '0';
      $this->id = $args['token'] ?? '';
    
    }

      //obligar al usuario a llenar los datos

      public function validarNuevaCuenta(){
        if (!$this->nombre){
          self::$alertas['error'][] = 'El Nombre tiene que estar lleno';
        }

        if (!$this->apellido){
          self::$alertas['error'][] = 'El Apellido tiene que estar lleno';
        }
        if (!$this->email){
          self::$alertas['error'][] = 'El Email  tiene que estar lleno';
        }
        if (!$this->password){
          self::$alertas['error'][] = 'El Password tiene que estar lleno';
        }
        if (strlen($this->password) < 6){
          self::$alertas['error'][] = 'El password tiene que ser de 6 caracteres al menos';
        }


        return self::$alertas;

      }
        //Esto comprueba si el usuario esta en uso
public function existeUsuario(){
$query = "SELECT * FROM " . self::$tabla . " WHERE email ='" . $this->email . "'LIMIT 1";

$resultado = self::$db->query($query);

if ($resultado->num_rows){
  self::$alertas['error'][] = 'Este usuario ya existe';
}

return $resultado;
      }

 public function hashPassword(){
  $this->password = password_hash($this->password, PASSWORD_BCRYPT);
 }
 public function crearToken(){
  $this->token = uniqid();
 }
    }