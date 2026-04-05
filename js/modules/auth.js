// js/modules/auth.js
// Métodos de autenticación

// Agregar métodos a la clase AplicacionSkyHelp
AplicacionSkyHelp.prototype.manejarLogin = function(evento) {
    evento.preventDefault();
    
    const datosFormulario = new FormData(evento.target);
    const correo = datosFormulario.get('correo');
    const contrasena = datosFormulario.get('contrasena');
    
    this.mostrarCarga();
    
    setTimeout(() => {
        const usuario = datosSkyHelp.usuariosDemo.find(u => u.correo === correo && u.contrasena === contrasena);
        
        if (usuario) {
            this.usuarioActual = usuario;
            this.ocultarCarga();
            this.mostrarApp();
        } else {
            this.ocultarCarga();
            alert('Credenciales inválidas. Usa las cuentas demo:\n- admin@skyhelp.com / admin123\n- tecnico@skyhelp.com / tecnico123\n- cliente@skyhelp.com / cliente123\n- domiciliario@skyhelp.com / domiciliario123');
        }
    }, 1200);
};

AplicacionSkyHelp.prototype.manejarRegistro = function(evento) {
    evento.preventDefault();
    
    const datosFormulario = new FormData(evento.target);
    const nombre = datosFormulario.get('nombre');
    const correo = datosFormulario.get('correo');
    const rol = datosFormulario.get('rol');
    const contrasena = datosFormulario.get('contrasena');
    const confirmarContrasena = datosFormulario.get('confirmarContrasena');
    
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    if (!nombre || !correo || !rol || !contrasena) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    this.mostrarCarga();
    
    setTimeout(() => {
        this.usuarioActual = { nombre, correo, rol };
        this.ocultarCarga();
        this.mostrarApp();
    }, 1500);
};

AplicacionSkyHelp.prototype.cerrarSesion = function() {
    this.usuarioActual = null;
    this.mostrarInicio();
};