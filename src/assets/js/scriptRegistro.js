//REFERENCIAS HTML
const txtUsuario = document.getElementById('txtUsuario');
const txtContraseña = document.getElementById('txtContraseña');

const volver = () =>{
    location.href = "../views/index.html"
}

const registrarse = () =>{
    let usuario = txtUsuario.value;
    let contraseña = txtContraseña.value;

    if ( usuario === '' || contraseña === '' ){
        alert('Llene todos los campos para proceder con el registro');
    }else{
        let crearUsuario = {
            usuario: usuario,
            contraseña: contraseña
        };

        localStorage.setItem('registro', JSON.stringify(crearUsuario));
        alert("Usuario Registrado, regresando a Inicio de Sesion");
        location.href = "../views/index.html"
    }
}



