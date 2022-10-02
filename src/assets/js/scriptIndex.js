//REFERENCIAS HTML
const txtUsuario = document.getElementById('txtUsuario');
const txtContraseña = document.getElementById('txtContraseña');

let registro = JSON.parse(localStorage.getItem('registro'));

const irRegistro = () =>{
    location.href = "../views/registro.html"
}

const iniciarSesion = () => {
    //ESTE CODIGO SOLO FUNCIONA PARA REGISTRARSE PRIMERO E INICIAR SESIÓN
    let usuario = txtUsuario.value;
    let contraseña = txtContraseña.value;

    

    if ( usuario === '' || contraseña === '' ){
        alert('Llene los campos para iniciar sesión');
    }else{
        if (usuario === registro.usuario && contraseña === registro.contraseña) {
            alert('¡Bienvenido ' + registro.usuario + '!');
            location.href = "../views/menuJuegos.html"

        }else{
            alert('Datos Incorrectos');
        }
             
    }
}
