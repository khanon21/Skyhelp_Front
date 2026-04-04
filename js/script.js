// SkyHelp - Sistema CRM de Gestión de Equipos
// Implementación en JavaScript Vanilla

class AplicacionSkyHelp {
    constructor() {
        this.vistaActual = 'inicio';
        this.usuarioActual = null;
        this.seccionActual = 'dashboard';
        this.barraLateralAbierta = true;
        
        // Usuarios de demostración
        this.usuariosDemo = [
            { correo: 'admin@skyhelp.com', contrasena: 'admin123', nombre: 'María Administradora', rol: 'administrador' },
            { correo: 'tecnico@skyhelp.com', contrasena: 'tecnico123', nombre: 'Juan Técnico', rol: 'tecnico' },
            { correo: 'cliente@skyhelp.com', contrasena: 'cliente123', nombre: 'Ana Cliente', rol: 'cliente' },
            { correo: 'domiciliario@skyhelp.com', contrasena: 'domiciliario123', nombre: 'Carlos Domiciliario', rol: 'domiciliario' }
        ];
        
        // Datos de ejemplo de tickets
        this.tickets = [
            { id: 'TK-001', equipo: 'Dell OptiPlex 7090', problema: 'Monitor no enciende', estado: 'En progreso', cliente: 'María González', tecnico: 'Juan Pérez', prioridad: 'Alta', creado: '2024-01-15', actualizado: '2024-01-16' },
            { id: 'TK-002', equipo: 'HP ProDesk 400 G7', problema: 'No enciende', estado: 'Pendiente', cliente: 'Carlos López', tecnico: 'Sin asignar', prioridad: 'Crítica', creado: '2024-01-16', actualizado: '2024-01-16' },
            { id: 'TK-003', equipo: 'MacBook Air', problema: 'Teclado no funciona', estado: 'Asignado', cliente: 'Ana Martínez', tecnico: 'Pedro Rodríguez', prioridad: 'Media', creado: '2024-01-14', actualizado: '2024-01-15' },
            { id: 'TK-004', equipo: 'Lenovo ThinkCentre M720', problema: 'Lentitud extrema', estado: 'Resuelto', cliente: 'Luis Rodríguez', tecnico: 'Ana García', prioridad: 'Baja', creado: '2024-01-10', actualizado: '2024-01-12' },
            { id: 'TK-005', equipo: 'Dell Inspiron 15', problema: 'Pantalla rota', estado: 'En progreso', cliente: 'Pedro Sánchez', tecnico: 'Juan Pérez', prioridad: 'Alta', creado: '2024-01-17', actualizado: '2024-01-17' }
        ];
        
        this.inicializar();
    }
    
    inicializar() {
        console.log('Aplicación SkyHelp inicializada');
        this.mostrarVista('inicio');
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.cerrarModal();
        });
    }
    
    // Gestión de Vistas
    mostrarVista(nombreVista) {
        const vistas = document.querySelectorAll('.vista');
        vistas.forEach(vista => vista.classList.remove('activa'));
        
        const vistaObjetivo = document.getElementById(`pagina-${nombreVista}`) || document.getElementById(`vista-${nombreVista}`);
        if (vistaObjetivo) {
            vistaObjetivo.classList.add('activa');
            this.vistaActual = nombreVista;
        }
    }
    
    mostrarInicio() {
        this.mostrarVista('inicio');
    }
    
    mostrarLogin() {
        this.mostrarVista('login');
    }
    
    mostrarApp() {
        this.mostrarVista('aplicacion');
        this.inicializarBarraLateral();
        this.navegarA('dashboard');
    }
    
    // Gestión de Pestañas
    cambiarPestana(nombrePestana) {
        const pestanas = document.querySelectorAll('.pestana');
        const contenidosPestana = document.querySelectorAll('.contenido-pestana');
        
        pestanas.forEach(pestana => {
            if (pestana.dataset.pestana === nombrePestana) {
                pestana.classList.add('activa');
            } else {
                pestana.classList.remove('activa');
            }
        });
        
        contenidosPestana.forEach(contenido => {
            if (contenido.id === `pestana-${nombrePestana}`) {
                contenido.classList.add('activa');
            } else {
                contenido.classList.remove('activa');
            }
        });
    }
    
    // Alternar Contraseña
    alternarContrasena(idInput) {
        const input = document.getElementById(idInput);
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
    
    // Autenticación
    manejarLogin(evento) {
        evento.preventDefault();
        
        const datosFormulario = new FormData(evento.target);
        const correo = datosFormulario.get('correo');
        const contrasena = datosFormulario.get('contrasena');
        
        this.mostrarCarga();
        
        setTimeout(() => {
            const usuario = this.usuariosDemo.find(u => u.correo === correo && u.contrasena === contrasena);
            
            if (usuario) {
                this.usuarioActual = usuario;
                this.ocultarCarga();
                this.mostrarApp();
            } else {
                this.ocultarCarga();
                alert('Credenciales inválidas. Usa las cuentas demo:\n- admin@skyhelp.com / admin123\n- tecnico@skyhelp.com / tecnico123\n- cliente@skyhelp.com / cliente123\n- domiciliario@skyhelp.com / domiciliario123');
            }
        }, 1200);
    }
    
    manejarRegistro(evento) {
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
    }
    
    cerrarSesion() {
        this.usuarioActual = null;
        this.mostrarInicio();
    }
    
    // Carga
    mostrarCarga() {
        const pantallaCarga = document.getElementById('pantalla-carga');
        pantallaCarga.classList.remove('oculto');
    }
    
    ocultarCarga() {
        const pantallaCarga = document.getElementById('pantalla-carga');
        pantallaCarga.classList.add('oculto');
    }
    
    // Barra Lateral
    inicializarBarraLateral() {
        if (!this.usuarioActual) return;
        
        const itemsNav = this.obtenerItemsNavPorRol(this.usuarioActual.rol);
        const navegacionBarra = document.getElementById('navegacion-barra');
        
        navegacionBarra.innerHTML = itemsNav.map(item => `
            <a class="item-nav ${item.id === 'dashboard' ? 'activo' : ''}" onclick="aplicacion.navegarA('${item.id}')" data-seccion="${item.id}">
                ${item.icono}
                <span>${item.etiqueta}</span>
            </a>
        `).join('');
        
        // Actualizar información del usuario
        document.getElementById('nombre-usuario').textContent = this.usuarioActual.nombre;
        document.getElementById('rol-usuario').textContent = this.usuarioActual.rol;
        document.getElementById('avatar-usuario').textContent = this.usuarioActual.nombre.charAt(0);
    }
    
    obtenerItemsNavPorRol(rol) {
        const itemsComunes = [
            {
                id: 'dashboard',
                etiqueta: 'Dashboard',
                icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>'
            },
            {
                id: 'tickets',
                etiqueta: 'Tickets',
                icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
            }
        ];
        
        if (rol === 'administrador') {
            return [
                ...itemsComunes,
                {
                    id: 'usuarios',
                    etiqueta: 'Usuarios',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
                },
                {
                    id: 'reportes',
                    etiqueta: 'Reportes',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>'
                },
                {
                    id: 'configuracion',
                    etiqueta: 'Configuración',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'
                }
            ];
        } else if (rol === 'tecnico') {
            return [
                ...itemsComunes,
                {
                    id: 'conocimiento',
                    etiqueta: 'Base de Conocimientos',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>'
                },
                {
                    id: 'perfil',
                    etiqueta: 'Mi Perfil',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
                }
            ];
        } else if (rol === 'domiciliario') {
            return [
                {
                    id: 'dashboard',
                    etiqueta: 'Mis Entregas',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="16" height="13" x="6" y="4" rx="2"/><path d="M22 7h-2M7 7H1M7 20H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3m13 0h-3m-10 0h7M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>'
                },
                {
                    id: 'historial',
                    etiqueta: 'Historial',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>'
                },
                {
                    id: 'perfil',
                    etiqueta: 'Mi Perfil',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
                }
            ];
        } else {
            return [
                ...itemsComunes,
                {
                    id: 'perfil',
                    etiqueta: 'Mi Perfil',
                    icono: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
                }
            ];
        }
    }
    
    alternarBarraLateral() {
        const barraLateral = document.getElementById('barra-lateral');
        this.barraLateralAbierta = !this.barraLateralAbierta;
        
        if (this.barraLateralAbierta) {
            barraLateral.classList.remove('contraida');
            barraLateral.classList.add('abierta');
        } else {
            barraLateral.classList.add('contraida');
            barraLateral.classList.remove('abierta');
        }
    }
    
    // Navegación
    navegarA(seccion) {
        this.seccionActual = seccion;
        
        // Actualizar elemento de navegación activo
        const itemsNav = document.querySelectorAll('.item-nav');
        itemsNav.forEach(item => {
            if (item.dataset.seccion === seccion) {
                item.classList.add('activo');
            } else {
                item.classList.remove('activo');
            }
        });
        
        // Actualizar título de página
        const titulos = {
            dashboard: 'Dashboard',
            tickets: 'Gestión de Tickets',
            usuarios: 'Gestión de Usuarios',
            reportes: 'Reportes y Estadísticas',
            configuracion: 'Configuración',
            conocimiento: 'Base de Conocimientos',
            perfil: 'Mi Perfil',
            historial: 'Historial de Entregas'
        };
        document.getElementById('titulo-pagina').textContent = titulos[seccion] || 'Dashboard';
        
        // Cargar contenido
        this.cargarContenido(seccion);
    }
    
    // Carga de Contenido
    cargarContenido(seccion) {
        const areaContenido = document.getElementById('area-contenido');
        
        switch (seccion) {
            case 'dashboard':
                areaContenido.innerHTML = this.obtenerContenidoDashboard();
                break;
            case 'tickets':
                areaContenido.innerHTML = this.obtenerContenidoTickets();
                this.inicializarFiltrosTickets();
                break;
            case 'usuarios':
                areaContenido.innerHTML = this.obtenerContenidoUsuarios();
                break;
            case 'reportes':
                areaContenido.innerHTML = this.obtenerContenidoReportes();
                break;
            case 'configuracion':
                areaContenido.innerHTML = this.obtenerContenidoConfiguracion();
                break;
            case 'conocimiento':
                areaContenido.innerHTML = this.obtenerContenidoConocimiento();
                break;
            case 'perfil':
                areaContenido.innerHTML = this.obtenerContenidoPerfil();
                break;
            case 'historial':
                areaContenido.innerHTML = this.obtenerContenidoHistorial();
                break;
            default:
                areaContenido.innerHTML = this.obtenerContenidoDashboard();
        }
    }
    
    // Contenido del Dashboard
    obtenerContenidoDashboard() {
        const estadisticas = this.obtenerEstadisticasPorRol(this.usuarioActual.rol);
        
        if (this.usuarioActual.rol === 'cliente' || this.usuarioActual.rol === 'domiciliario') {
            return this.obtenerContenidoMapa();
        }
        
        return `
            <div class="deslizar-arriba">
                <div class="cuadricula-estadisticas-dashboard">
                    ${estadisticas.map(est => `
                        <div class="tarjeta-estadistica-dashboard">
                            <div class="icono-estadistica" style="background: ${est.color}">
                                ${est.icono}
                            </div>
                            <div class="info-estadistica">
                                <div class="etiqueta-estadistica-dashboard">${est.etiqueta}</div>
                                <div class="valor-estadistica-dashboard">${est.valor}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="tarjeta">
                    <h3>Tickets Recientes</h3>
                    <div class="contenedor-tabla">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Equipo</th>
                                    <th>Problema</th>
                                    <th>Cliente</th>
                                    <th>Estado</th>
                                    <th>Prioridad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.tickets.slice(0, 5).map(ticket => `
                                    <tr>
                                        <td><strong>${ticket.id}</strong></td>
                                        <td>${ticket.equipo}</td>
                                        <td>${ticket.problema}</td>
                                        <td>${ticket.cliente}</td>
                                        <td><span class="insignia-estado ${this.obtenerClaseInsigniaEstado(ticket.estado)}">${ticket.estado}</span></td>
                                        <td><span class="insignia-estado ${this.obtenerClaseInsigniaPrioridad(ticket.prioridad)}">${ticket.prioridad}</span></td>
                                        <td><button class="btn btn-primario" style="padding:0.5rem 1rem;font-size:0.8125rem;" onclick="aplicacion.verDetalleTicket('${ticket.id}')">Ver</button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    obtenerEstadisticasPorRol(rol) {
        const mapaIconos = {
            grafico: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
            reloj: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
            verificar: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
            alerta: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
            herramienta: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
            usuarios: '<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
        };
        
        switch (rol) {
            case 'administrador':
                return [
                    { etiqueta: 'Tickets Totales', valor: '247', icono: mapaIconos.grafico, color: 'var(--color-azul)' },
                    { etiqueta: 'Pendientes', valor: '45', icono: mapaIconos.reloj, color: 'var(--color-amarillo)' },
                    { etiqueta: 'Resueltos Hoy', valor: '12', icono: mapaIconos.verificar, color: 'var(--color-verde)' },
                    { etiqueta: 'Críticos', valor: '3', icono: mapaIconos.alerta, color: 'var(--color-primario)' }
                ];
            case 'tecnico':
                return [
                    { etiqueta: 'Mis Tickets', valor: '18', icono: mapaIconos.herramienta, color: 'var(--color-azul)' },
                    { etiqueta: 'En Progreso', valor: '7', icono: mapaIconos.reloj, color: 'var(--color-amarillo)' },
                    { etiqueta: 'Completados', valor: '142', icono: mapaIconos.verificar, color: 'var(--color-verde)' },
                    { etiqueta: 'Urgentes', valor: '2', icono: mapaIconos.alerta, color: 'var(--color-primario)' }
                ];
            default:
                return [
                    { etiqueta: 'Entregas Hoy', valor: '8', icono: mapaIconos.usuarios, color: 'var(--color-azul)' },
                    { etiqueta: 'En Ruta', valor: '3', icono: mapaIconos.reloj, color: 'var(--color-amarillo)' },
                    { etiqueta: 'Completadas', valor: '67', icono: mapaIconos.verificar, color: 'var(--color-verde)' },
                    { etiqueta: 'Pendientes', valor: '2', icono: mapaIconos.alerta, color: 'var(--color-naranja)' }
                ];
        }
    }
    
    // Contenido del Mapa
    obtenerContenidoMapa() {
        const titulo = this.usuarioActual.rol === 'cliente' ? 'Seguimiento de tu Equipo' : 'Mis Entregas del Día';
        const descripcion = this.usuarioActual.rol === 'cliente' 
            ? 'Rastrea la ubicación en tiempo real de tu equipo' 
            : 'Gestiona y visualiza tus entregas programadas';
        
        return `
            <div class="deslizar-arriba">
                <div style="margin-bottom: 2rem;">
                    <h2>${titulo}</h2>
                    <p style="color: var(--gris-600);">${descripcion}</p>
                </div>
                
                <div class="contenedor-mapa">
                    <div class="marcador-mapa">
                        <div style="text-align: center;">
                            <svg style="width: 80px; height: 80px; margin-bottom: 1.5rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <div>Mapa Interactivo</div>
                            <div style="font-size: 1.125rem; opacity: 0.9; margin-top: 0.75rem;">Sistema de seguimiento GPS en tiempo real</div>
                        </div>
                    </div>
                    
                    ${this.usuarioActual.rol === 'domiciliario' ? `
                        <div class="barra-lateral-mapa">
                            <h3 style="margin-bottom: 1.5rem;">Entregas del día</h3>
                            
                            <div class="item-entrega">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                                    <strong>TK-001</strong>
                                    <span class="insignia-estado insignia-azul">En ruta</span>
                                </div>
                                <div style="font-size: 0.9375rem; color: var(--gris-600);">
                                    <div>Dell OptiPlex 7090</div>
                                    <div>María González - Calle 123 #45-67</div>
                                    <div style="margin-top: 0.75rem; color: var(--color-primario); font-weight: 600;">⏱️ 15 min</div>
                                </div>
                            </div>
                            
                            <div class="item-entrega">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                                    <strong>TK-003</strong>
                                    <span class="insignia-estado insignia-amarillo">Pendiente</span>
                                </div>
                                <div style="font-size: 0.9375rem; color: var(--gris-600);">
                                    <div>MacBook Air</div>
                                    <div>Ana Martínez - Carrera 89 #12-34</div>
                                    <div style="margin-top: 0.75rem; color: var(--gris-600); font-weight: 600;">⏱️ 45 min</div>
                                </div>
                            </div>
                            
                            <div class="item-entrega">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                                    <strong>TK-005</strong>
                                    <span class="insignia-estado insignia-verde">Completado</span>
                                </div>
                                <div style="font-size: 0.9375rem; color: var(--gris-600);">
                                    <div>Dell Inspiron 15</div>
                                    <div>Pedro Sánchez - Avenida 56 #78-90</div>
                                    <div style="margin-top: 0.75rem; color: var(--color-verde); font-weight: 600;">✓ Entregado</div>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <div class="barra-lateral-mapa">
                            <h3 style="margin-bottom: 1.5rem;">Tu Equipo</h3>
                            
                            <div class="item-entrega">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                                    <strong>TK-001</strong>
                                    <span class="insignia-estado insignia-azul">En tránsito</span>
                                </div>
                                <div style="font-size: 0.9375rem; color: var(--gris-600);">
                                    <div><strong>Dell OptiPlex 7090</strong></div>
                                    <div style="margin-top: 0.75rem;">Monitor no enciende</div>
                                    <div style="margin-top: 0.75rem;">
                                        <div>🚚 Domiciliario: Carlos</div>
                                        <div>📍 A 2.5 km de tu ubicación</div>
                                        <div style="color: var(--color-primario); margin-top: 0.75rem; font-weight: 600;">⏱️ Llegada estimada: 15 min</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 1.25rem; padding: 1.25rem; background: linear-gradient(135deg, var(--color-azul), #3b82f6); color: white; border-radius: 0.75rem; font-size: 0.9375rem;">
                                <strong>Estado:</strong> En camino a tu domicilio<br>
                                <strong>Técnico asignado:</strong> Juan Pérez<br>
                                <strong>Última actualización:</strong> Hace 2 min
                            </div>
                        </div>
                    `}
                </div>
            </div>
        `;
    }
    
    // Contenido de Tickets
    obtenerContenidoTickets() {
        return `
            <div class="deslizar-arriba">
                <div class="encabezado-tickets">
                    <input type="text" id="busqueda-tickets" class="entrada-busqueda" placeholder="Buscar tickets..." onkeyup="aplicacion.filtrarTickets()">
                    
                    <div class="filtros">
                        <select id="filtro-estado" onchange="aplicacion.filtrarTickets()">
                            <option value="todos">Todos los estados</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Asignado">Asignado</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Resuelto">Resuelto</option>
                        </select>
                        
                        <select id="filtro-prioridad" onchange="aplicacion.filtrarTickets()">
                            <option value="todos">Todas las prioridades</option>
                            <option value="Crítica">Crítica</option>
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                        
                        ${this.usuarioActual.rol === 'cliente' || this.usuarioActual.rol === 'administrador' ? '<button class="btn btn-primario" onclick="aplicacion.mostrarModalNuevoTicket()">Nuevo Ticket</button>' : ''}
                    </div>
                </div>
                
                <div class="tarjeta">
                    <div class="contenedor-tabla">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Equipo</th>
                                    <th>Problema</th>
                                    <th>Cliente</th>
                                    <th>Técnico</th>
                                    <th>Estado</th>
                                    <th>Prioridad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="cuerpo-tabla-tickets">
                                ${this.renderizarFilasTickets(this.tickets)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderizarFilasTickets(tickets) {
        return tickets.map(ticket => `
            <tr>
                <td><strong>${ticket.id}</strong></td>
                <td>${ticket.equipo}</td>
                <td>${ticket.problema}</td>
                <td>${ticket.cliente}</td>
                <td>${ticket.tecnico}</td>
                <td><span class="insignia-estado ${this.obtenerClaseInsigniaEstado(ticket.estado)}">${ticket.estado}</span></td>
                <td><span class="insignia-estado ${this.obtenerClaseInsigniaPrioridad(ticket.prioridad)}">${ticket.prioridad}</span></td>
                    <td>
                    <div class="acciones-ticket">
                        <button class="btn btn-primario" style="padding: 0.5rem 1rem; font-size: 0.8125rem;" onclick="aplicacion.verDetalleTicket('${ticket.id}')">Ver</button>
                        ${this.usuarioActual.rol !== 'cliente' ? `<button class="btn btn-secundario" style="padding: 0.5rem 1rem; font-size: 0.8125rem;" onclick="aplicacion.mostrarModalEditarTicket('${ticket.id}')">Editar</button>` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    inicializarFiltrosTickets() {
        // Los filtros se inicializan mediante onchange/onkeyup en el HTML
    }
    
    filtrarTickets() {
        const terminoBusqueda = document.getElementById('busqueda-tickets')?.value.toLowerCase() || '';
        const filtroEstado = document.getElementById('filtro-estado')?.value || 'todos';
        const filtroPrioridad = document.getElementById('filtro-prioridad')?.value || 'todos';
        
        const filtrados = this.tickets.filter(ticket => {
            const coincideBusqueda = ticket.id.toLowerCase().includes(terminoBusqueda) ||
                                    ticket.equipo.toLowerCase().includes(terminoBusqueda) ||
                                    ticket.cliente.toLowerCase().includes(terminoBusqueda) ||
                                    ticket.problema.toLowerCase().includes(terminoBusqueda);
            const coincideEstado = filtroEstado === 'todos' || ticket.estado === filtroEstado;
            const coincidePrioridad = filtroPrioridad === 'todos' || ticket.prioridad === filtroPrioridad;
            
            return coincideBusqueda && coincideEstado && coincidePrioridad;
        });
        
        const cuerpoTabla = document.getElementById('cuerpo-tabla-tickets');
        if (cuerpoTabla) {
            cuerpoTabla.innerHTML = this.renderizarFilasTickets(filtrados);
        }
    }
    
    // ===== SISTEMA DE MODAL =====
    abrirModal(contenido, grande = false) {
        const overlay = document.getElementById('contenedor-modal');
        const modal = document.getElementById('modal-principal');
        modal.className = `modal${grande ? ' modal-grande' : ''}`;
        modal.innerHTML = contenido;
        overlay.classList.remove('oculto');
        document.body.style.overflow = 'hidden';
    }

    cerrarModal() {
        const overlay = document.getElementById('contenedor-modal');
        if (overlay) {
            overlay.classList.add('oculto');
            document.body.style.overflow = '';
        }
    }

    cerrarModalAlFondo(evento) {
        if (evento.target === evento.currentTarget) this.cerrarModal();
    }

    mostrarToast(mensaje, tipo = 'exito') {
        const toast = document.getElementById('toast-notificacion');
        const textoToast = document.getElementById('toast-mensaje');
        if (!toast || !textoToast) return;
        textoToast.textContent = mensaje;
        toast.className = `toast toast-${tipo}`;
        setTimeout(() => toast.classList.add('oculto'), 3000);
    }

    // ===== VER DETALLE DE TICKET =====
    verDetalleTicket(id) {
        const ticket = this.tickets.find(t => t.id === id);
        if (!ticket) return;

        const historial = [
            { emoji: '🎫', bg: '#dbeafe', accion: `Ticket ${ticket.id} creado`, tiempo: ticket.creado + ' · 09:00' },
            { emoji: '👤', bg: '#ede9fe', accion: `Asignado a ${ticket.tecnico !== 'Sin asignar' ? ticket.tecnico : 'cola de espera'}`, tiempo: ticket.creado + ' · 10:30' },
            { emoji: '🔧', bg: '#fef3c7', accion: 'Diagnóstico iniciado', tiempo: ticket.actualizado + ' · 08:15' },
            ...(ticket.estado === 'Resuelto' ? [{ emoji: '✅', bg: '#d1fae5', accion: 'Ticket resuelto exitosamente', tiempo: ticket.actualizado + ' · 16:45' }] : [])
        ];

        const contenido = `
            <div class="modal-encabezado">
                <div>
                    <h3>${ticket.id} — ${ticket.equipo}</h3>
                    <div class="modal-encabezado-sub">
                        <span class="insignia-estado ${this.obtenerClaseInsigniaEstado(ticket.estado)}">${ticket.estado}</span>
                        <span class="insignia-estado ${this.obtenerClaseInsigniaPrioridad(ticket.prioridad)}">Prioridad ${ticket.prioridad}</span>
                    </div>
                </div>
                <button class="btn-cerrar-modal" onclick="aplicacion.cerrarModal()">✕</button>
            </div>
            <div class="modal-cuerpo">
                <div class="info-ticket-grid">
                    <div class="info-ticket-item">
                        <div class="etiqueta">Equipo</div>
                        <div class="valor">${ticket.equipo}</div>
                    </div>
                    <div class="info-ticket-item">
                        <div class="etiqueta">Problema</div>
                        <div class="valor">${ticket.problema}</div>
                    </div>
                    <div class="info-ticket-item">
                        <div class="etiqueta">Cliente</div>
                        <div class="valor">${ticket.cliente}</div>
                    </div>
                    <div class="info-ticket-item">
                        <div class="etiqueta">Técnico Asignado</div>
                        <div class="valor">${ticket.tecnico}</div>
                    </div>
                    <div class="info-ticket-item">
                        <div class="etiqueta">Fecha de Creación</div>
                        <div class="valor">${ticket.creado}</div>
                    </div>
                    <div class="info-ticket-item">
                        <div class="etiqueta">Última Actualización</div>
                        <div class="valor">${ticket.actualizado}</div>
                    </div>
                </div>

                <div class="linea-tiempo">
                    <h4>📋 Historial de Actividad</h4>
                    ${historial.map(ev => `
                        <div class="evento-timeline">
                            <div class="punto-timeline" style="background:${ev.bg};">${ev.emoji}</div>
                            <div class="contenido-timeline">
                                <div class="accion">${ev.accion}</div>
                                <div class="tiempo">${ev.tiempo}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-pie">
                ${this.usuarioActual.rol !== 'cliente' ? `<button class="btn btn-secundario" onclick="aplicacion.mostrarModalEditarTicket('${ticket.id}')">Editar Ticket</button>` : ''}
                <button class="btn btn-primario" onclick="aplicacion.cerrarModal()">Cerrar</button>
            </div>
        `;
        this.abrirModal(contenido, true);
    }

    // ===== NUEVO TICKET =====
    mostrarModalNuevoTicket() {
        const tecnicos = ['Sin asignar', 'Juan Pérez', 'Pedro Rodríguez', 'Ana García'];

        const contenido = `
            <div class="modal-encabezado">
                <h3>Nuevo Ticket</h3>
                <button class="btn-cerrar-modal" onclick="aplicacion.cerrarModal()">✕</button>
            </div>
            <form onsubmit="aplicacion.guardarNuevoTicket(event)">
                <div class="modal-cuerpo">
                    <div class="fila-formulario">
                        <div class="grupo-formulario">
                            <label>Equipo *</label>
                            <input type="text" name="equipo" placeholder="Ej. Dell OptiPlex 7090" required>
                        </div>
                        <div class="grupo-formulario">
                            <label>Prioridad *</label>
                            <select name="prioridad" required>
                                <option value="">Seleccionar</option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                                <option value="Crítica">Crítica</option>
                            </select>
                        </div>
                    </div>
                    <div class="grupo-formulario">
                        <label>Problema / Descripción *</label>
                        <input type="text" name="problema" placeholder="Describe el problema del equipo" required>
                    </div>
                    <div class="fila-formulario">
                        <div class="grupo-formulario">
                            <label>Cliente *</label>
                            <input type="text" name="cliente" placeholder="Nombre del cliente" required>
                        </div>
                        <div class="grupo-formulario">
                            <label>Técnico Asignado</label>
                            <select name="tecnico">
                                ${tecnicos.map(t => `<option value="${t}">${t}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-pie">
                    <button type="button" class="btn btn-secundario" onclick="aplicacion.cerrarModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primario">Crear Ticket</button>
                </div>
            </form>
        `;
        this.abrirModal(contenido);
    }

    guardarNuevoTicket(evento) {
        evento.preventDefault();
        const datos = new FormData(evento.target);
        const hoy = new Date().toISOString().split('T')[0];
        const nuevoId = `TK-${String(this.tickets.length + 1).padStart(3, '0')}`;

        this.tickets.unshift({
            id: nuevoId,
            equipo: datos.get('equipo'),
            problema: datos.get('problema'),
            estado: 'Pendiente',
            cliente: datos.get('cliente'),
            tecnico: datos.get('tecnico') || 'Sin asignar',
            prioridad: datos.get('prioridad'),
            creado: hoy,
            actualizado: hoy
        });

        this.cerrarModal();
        this.mostrarToast(`✅ Ticket ${nuevoId} creado exitosamente`);
        if (this.seccionActual === 'tickets') this.cargarContenido('tickets');
    }

    // ===== EDITAR TICKET =====
    mostrarModalEditarTicket(id) {
        const ticket = this.tickets.find(t => t.id === id);
        if (!ticket) return;

        const tecnicos = ['Sin asignar', 'Juan Pérez', 'Pedro Rodríguez', 'Ana García'];
        const estados = ['Pendiente', 'Asignado', 'En progreso', 'Resuelto'];
        const prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];
        const opcionTecnico = (t) => `<option value="${t}" ${ticket.tecnico === t ? 'selected' : ''}>${t}</option>`;
        const opcionSelect = (val, cur) => `<option value="${val}" ${cur === val ? 'selected' : ''}>${val}</option>`;

        const contenido = `
            <div class="modal-encabezado">
                <div>
                    <h3>Editar Ticket</h3>
                    <div class="modal-encabezado-sub">
                        <span class="insignia-estado insignia-azul">${ticket.id}</span>
                    </div>
                </div>
                <button class="btn-cerrar-modal" onclick="aplicacion.cerrarModal()">✕</button>
            </div>
            <form onsubmit="aplicacion.guardarEdicionTicket(event, '${ticket.id}')">
                <div class="modal-cuerpo">
                    <div class="fila-formulario">
                        <div class="grupo-formulario">
                            <label>Equipo *</label>
                            <input type="text" name="equipo" value="${ticket.equipo}" required>
                        </div>
                        <div class="grupo-formulario">
                            <label>Prioridad *</label>
                            <select name="prioridad" required>
                                ${prioridades.map(p => opcionSelect(p, ticket.prioridad)).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="grupo-formulario">
                        <label>Problema / Descripción *</label>
                        <input type="text" name="problema" value="${ticket.problema}" required>
                    </div>
                    <div class="fila-formulario">
                        <div class="grupo-formulario">
                            <label>Estado *</label>
                            <select name="estado" required>
                                ${estados.map(e => opcionSelect(e, ticket.estado)).join('')}
                            </select>
                        </div>
                        <div class="grupo-formulario">
                            <label>Técnico Asignado</label>
                            <select name="tecnico">
                                ${tecnicos.map(t => opcionTecnico(t)).join('')}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-pie">
                    <button type="button" class="btn btn-secundario" onclick="aplicacion.cerrarModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primario">Guardar Cambios</button>
                </div>
            </form>
        `;
        this.cerrarModal();
        setTimeout(() => this.abrirModal(contenido), 50);
    }

    guardarEdicionTicket(evento, id) {
        evento.preventDefault();
        const datos = new FormData(evento.target);
        const indice = this.tickets.findIndex(t => t.id === id);
        if (indice === -1) return;

        this.tickets[indice] = {
            ...this.tickets[indice],
            equipo: datos.get('equipo'),
            problema: datos.get('problema'),
            estado: datos.get('estado'),
            tecnico: datos.get('tecnico'),
            prioridad: datos.get('prioridad'),
            actualizado: new Date().toISOString().split('T')[0]
        };

        this.cerrarModal();
        this.mostrarToast(`✅ Ticket ${id} actualizado exitosamente`);
        if (this.seccionActual === 'tickets') this.cargarContenido('tickets');
        else if (this.seccionActual === 'dashboard') this.cargarContenido('dashboard');
    }

    // ===== NUEVO USUARIO =====
    mostrarModalNuevoUsuario() {
        const contenido = `
            <div class="modal-encabezado">
                <h3>Nuevo Usuario</h3>
                <button class="btn-cerrar-modal" onclick="aplicacion.cerrarModal()">✕</button>
            </div>
            <form onsubmit="aplicacion.guardarNuevoUsuario(event)">
                <div class="modal-cuerpo">
                    <div class="fila-formulario">
                        <div class="grupo-formulario">
                            <label>Nombre Completo *</label>
                            <input type="text" name="nombre" placeholder="Nombre completo" required>
                        </div>
                        <div class="grupo-formulario">
                            <label>Rol *</label>
                            <select name="rol" required>
                                <option value="">Seleccionar rol</option>
                                <option value="administrador">Administrador</option>
                                <option value="tecnico">Técnico</option>
                                <option value="cliente">Cliente</option>
                                <option value="domiciliario">Domiciliario</option>
                            </select>
                        </div>
                    </div>
                    <div class="grupo-formulario">
                        <label>Correo Electrónico *</label>
                        <input type="email" name="correo" placeholder="correo@ejemplo.com" required>
                    </div>
                    <div class="fila-formulario">
                        <div class="grupo-formulario">
                            <label>Contraseña *</label>
                            <input type="password" name="contrasena" placeholder="••••••••" required>
                        </div>
                        <div class="grupo-formulario">
                            <label>Teléfono</label>
                            <input type="tel" name="telefono" placeholder="+57 123 456 7890">
                        </div>
                    </div>
                </div>
                <div class="modal-pie">
                    <button type="button" class="btn btn-secundario" onclick="aplicacion.cerrarModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primario">Crear Usuario</button>
                </div>
            </form>
        `;
        this.abrirModal(contenido);
    }

    guardarNuevoUsuario(evento) {
        evento.preventDefault();
        const datos = new FormData(evento.target);
        const nuevoUsuario = {
            nombre: datos.get('nombre'),
            correo: datos.get('correo'),
            contrasena: datos.get('contrasena'),
            rol: datos.get('rol')
        };
        this.usuariosDemo.push(nuevoUsuario);
        this.cerrarModal();
        this.mostrarToast(`✅ Usuario ${nuevoUsuario.nombre} creado exitosamente`);
        if (this.seccionActual === 'usuarios') this.cargarContenido('usuarios');
    }
    
    // Contenido de Usuarios
    obtenerContenidoUsuarios() {
        return `
            <div class="deslizar-arriba">
                <div class="encabezado-tickets">
                    <h3>Gestión de Usuarios</h3>
                    <button class="btn btn-primario" onclick="aplicacion.mostrarModalNuevoUsuario()">Nuevo Usuario</button>
                </div>
                
                <div class="tarjeta">
                    <div class="contenedor-tabla">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.usuariosDemo.map(usuario => `
                                    <tr>
                                        <td><strong>${usuario.nombre}</strong></td>
                                        <td>${usuario.correo}</td>
                                        <td><span class="insignia-estado insignia-azul">${usuario.rol}</span></td>
                                        <td><span class="insignia-estado insignia-verde">Activo</span></td>
                                        <td>
                                            <div class="acciones-ticket">
                                                <button class="btn btn-primario" style="padding:0.5rem 1rem;font-size:0.8125rem;" onclick="aplicacion.mostrarToast('Función de editar usuario próximamente', 'exito')">Editar</button>
                                                <button class="btn btn-secundario" style="padding:0.5rem 1rem;font-size:0.8125rem;" onclick="aplicacion.mostrarToast('Función de desactivar usuario próximamente', 'exito')">Desactivar</button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Contenido de Reportes
    obtenerContenidoReportes() {
        return `
            <div class="deslizar-arriba">
                <div class="cuadricula-estadisticas-dashboard">
                    <div class="tarjeta-estadistica-dashboard">
                        <div class="icono-estadistica" style="background: var(--color-azul)">
                            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                        </div>
                        <div class="info-estadistica">
                            <div class="etiqueta-estadistica-dashboard">Tiempo Promedio de Resolución</div>
                            <div class="valor-estadistica-dashboard">2.3h</div>
                        </div>
                    </div>
                    
                    <div class="tarjeta-estadistica-dashboard">
                        <div class="icono-estadistica" style="background: var(--color-verde)">
                            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                        </div>
                        <div class="info-estadistica">
                            <div class="etiqueta-estadistica-dashboard">Tasa de Satisfacción</div>
                            <div class="valor-estadistica-dashboard">98%</div>
                        </div>
                    </div>
                    
                    <div class="tarjeta-estadistica-dashboard">
                        <div class="icono-estadistica" style="background: var(--color-purpura)">
                            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div class="info-estadistica">
                            <div class="etiqueta-estadistica-dashboard">Técnicos Activos</div>
                            <div class="valor-estadistica-dashboard">12</div>
                        </div>
                    </div>
                    
                    <div class="tarjeta-estadistica-dashboard">
                        <div class="icono-estadistica" style="background: var(--color-naranja)">
                            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <div class="info-estadistica">
                            <div class="etiqueta-estadistica-dashboard">Ahorro Mensual</div>
                            <div class="valor-estadistica-dashboard">$4.2K</div>
                        </div>
                    </div>
                </div>
                
                <div class="tarjeta">
                    <h3>Reportes Disponibles</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-top: 1.5rem;">
                        <button class="btn btn-secundario" style="justify-content: center; padding: 1.25rem;">
                            📊 Reporte de Tickets
                        </button>
                        <button class="btn btn-secundario" style="justify-content: center; padding: 1.25rem;">
                            👥 Reporte de Técnicos
                        </button>
                        <button class="btn btn-secundario" style="justify-content: center; padding: 1.25rem;">
                            ⏱️ Tiempos de Respuesta
                        </button>
                        <button class="btn btn-secundario" style="justify-content: center; padding: 1.25rem;">
                            😊 Satisfacción del Cliente
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Contenido de Configuración
    obtenerContenidoConfiguracion() {
        return `
            <div class="deslizar-arriba">
                <div class="tarjeta">
                    <h3>Configuración General</h3>
                    <div style="max-width: 650px; margin-top: 2rem;">
                        <div class="grupo-formulario">
                            <label>Nombre de la Empresa</label>
                            <input type="text" value="SkyHelp">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Email de Contacto</label>
                            <input type="email" value="contacto@skyhelp.com">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Teléfono</label>
                            <input type="tel" value="+57 123 456 7890">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Dirección</label>
                            <input type="text" value="Calle 123 #45-67, Bogotá">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Zona Horaria</label>
                            <select>
                                <option>America/Bogota (GMT-5)</option>
                                <option>America/Mexico_City (GMT-6)</option>
                                <option>America/Lima (GMT-5)</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-primario">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Contenido de Conocimiento
    obtenerContenidoConocimiento() {
        return `
            <div class="deslizar-arriba">
                <div class="encabezado-tickets">
                    <input type="text" class="entrada-busqueda" placeholder="Buscar artículos...">
                    <button class="btn btn-primario">Nuevo Artículo</button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
                    <div class="tarjeta">
                        <h3>🔧 Problemas Comunes</h3>
                        <p style="color: var(--gris-600); margin: 1.25rem 0;">Guías para resolver los problemas más frecuentes</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">Monitor no enciende</a>
                            </li>
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">Computadora lenta</a>
                            </li>
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">Problemas de conexión</a>
                            </li>
                            <li style="padding: 0.75rem 0;">
                                <a href="#" class="enlace">Teclado no funciona</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="tarjeta">
                        <h3>📚 Tutoriales</h3>
                        <p style="color: var(--gris-600); margin: 1.25rem 0;">Aprende a usar todas las funciones del sistema</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">Cómo crear un ticket</a>
                            </li>
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">Asignar técnicos</a>
                            </li>
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">Generar reportes</a>
                            </li>
                            <li style="padding: 0.75rem 0;">
                                <a href="#" class="enlace">Configurar notificaciones</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="tarjeta">
                        <h3>❓ Preguntas Frecuentes</h3>
                        <p style="color: var(--gris-600); margin: 1.25rem 0;">Respuestas a las dudas más comunes</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">¿Cómo cambiar mi contraseña?</a>
                            </li>
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">¿Puedo cancelar un ticket?</a>
                            </li>
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--gris-200);">
                                <a href="#" class="enlace">¿Cómo rastrear mi equipo?</a>
                            </li>
                            <li style="padding: 0.75rem 0;">
                                <a href="#" class="enlace">¿Cuánto tarda la reparación?</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Contenido de Perfil
    obtenerContenidoPerfil() {
        return `
            <div class="deslizar-arriba">
                <div class="tarjeta">
                    <h3>Mi Perfil</h3>
                    <div style="max-width: 650px; margin-top: 2rem;">
                        <div class="grupo-formulario">
                            <label>Nombre Completo</label>
                            <input type="text" value="${this.usuarioActual.nombre}">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Email</label>
                            <input type="email" value="${this.usuarioActual.correo}" disabled>
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Rol</label>
                            <input type="text" value="${this.usuarioActual.rol}" disabled style="text-transform: capitalize;">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Teléfono</label>
                            <input type="tel" placeholder="+57 123 456 7890">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Nueva Contraseña</label>
                            <input type="password" placeholder="Dejar en blanco para no cambiar">
                        </div>
                        
                        <div class="grupo-formulario">
                            <label>Confirmar Contraseña</label>
                            <input type="password" placeholder="Confirmar nueva contraseña">
                        </div>
                        
                        <button class="btn btn-primario">Actualizar Perfil</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Contenido de Historial
    obtenerContenidoHistorial() {
        return `
            <div class="deslizar-arriba">
                <div class="tarjeta">
                    <h3>Historial de Entregas</h3>
                    <div class="contenedor-tabla">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Equipo</th>
                                    <th>Cliente</th>
                                    <th>Dirección</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>TK-005</strong></td>
                                    <td>2024-01-17</td>
                                    <td>Dell Inspiron 15</td>
                                    <td>Pedro Sánchez</td>
                                    <td>Avenida 56 #78-90</td>
                                    <td><span class="insignia-estado insignia-verde">Completado</span></td>
                                </tr>
                                <tr>
                                    <td><strong>TK-004</strong></td>
                                    <td>2024-01-16</td>
                                    <td>Lenovo ThinkCentre M720</td>
                                    <td>Luis Rodríguez</td>
                                    <td>Carrera 34 #56-78</td>
                                    <td><span class="insignia-estado insignia-verde">Completado</span></td>
                                </tr>
                                <tr>
                                    <td><strong>TK-002</strong></td>
                                    <td>2024-01-15</td>
                                    <td>HP ProDesk 400 G7</td>
                                    <td>Carlos López</td>
                                    <td>Calle 90 #12-34</td>
                                    <td><span class="insignia-estado insignia-verde">Completado</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Métodos Auxiliares
    obtenerClaseInsigniaEstado(estado) {
        const mapa = {
            'Resuelto': 'insignia-verde',
            'En progreso': 'insignia-azul',
            'Asignado': 'insignia-purpura',
            'Pendiente': 'insignia-amarillo'
        };
        return mapa[estado] || 'insignia-azul';
    }
    
    obtenerClaseInsigniaPrioridad(prioridad) {
        const mapa = {
            'Crítica': 'insignia-rojo',
            'Alta': 'insignia-naranja',
            'Media': 'insignia-amarillo',
            'Baja': 'insignia-verde'
        };
        return mapa[prioridad] || 'insignia-azul';
    }

    // ===== DETALLE DE CARACTERÍSTICAS (landing page) =====
    mostrarDetalleCaracteristica(id) {
        const datos = {
            tickets: {
                titulo: 'Gestión de Tickets',
                emoji: '🎫',
                degradado: 'linear-gradient(135deg, #ef4444, #f97316)',
                subtitulo: 'Controla cada incidencia de principio a fin',
                descripcion: 'El módulo de tickets es el corazón de SkyHelp. Centraliza todas las solicitudes de soporte, permite asignarlas a los técnicos correctos y ofrece visibilidad total del proceso de reparación a todos los involucrados.',
                items: [
                    { icono: '📝', titulo: 'Creación rápida', desc: 'Abre nuevos tickets en segundos con formularios inteligentes que sugieren categorías y prioridades automáticamente.' },
                    { icono: '🎯', titulo: 'Asignación inteligente', desc: 'Asigna tickets al técnico más adecuado según carga de trabajo, especialidad y disponibilidad.' },
                    { icono: '🔄', titulo: 'Flujo de estados', desc: 'Sigue cada ticket por sus etapas: Pendiente → Asignado → En progreso → Resuelto, con alertas en cada cambio.' },
                    { icono: '⚡', titulo: 'Prioridades y SLA', desc: 'Define niveles Crítico, Alto, Medio y Bajo con tiempos de respuesta garantizados por acuerdo de nivel de servicio.' },
                    { icono: '💬', titulo: 'Historial completo', desc: 'Cada ticket registra automáticamente todos los cambios, comentarios y adjuntos para total trazabilidad.' },
                    { icono: '📎', titulo: 'Archivos adjuntos', desc: 'Adjunta fotos del equipo dañado, diagnósticos en PDF o presupuestos directamente al ticket.' },
                ],
                stats: [
                    { valor: '60%', label: 'Menos tiempo de resolución' },
                    { valor: '247+', label: 'Tickets gestionados' },
                    { valor: '98%', label: 'Tasa de satisfacción' },
                ]
            },
            roles: {
                titulo: 'Múltiples Roles',
                emoji: '👥',
                degradado: 'linear-gradient(135deg, #ec4899, #a855f7)',
                subtitulo: 'Cada usuario, una experiencia personalizada',
                descripcion: 'SkyHelp adapta su interfaz y funcionalidades según el rol de cada usuario. Desde el cliente que solo quiere saber el estado de su equipo, hasta el administrador que necesita visión completa del negocio.',
                items: [
                    { icono: '🏢', titulo: 'Administrador', desc: 'Acceso completo al sistema: gestión de usuarios, reportes globales, configuración del sistema y supervisión de todo el equipo.' },
                    { icono: '🔧', titulo: 'Técnico', desc: 'Vista enfocada en sus tickets asignados, base de conocimientos técnica, herramientas de diagnóstico y registro de intervenciones.' },
                    { icono: '👤', titulo: 'Cliente', desc: 'Panel simplificado para crear solicitudes, seguir el estado de sus equipos en tiempo real y ver el historial de reparaciones.' },
                    { icono: '🚚', titulo: 'Domiciliario', desc: 'App optimizada para gestión de rutas, confirmar recogidas/entregas, y comunicarse con clientes y técnicos.' },
                    { icono: '🔐', titulo: 'Permisos granulares', desc: 'Cada rol tiene acceso estrictamente a las funciones que necesita, garantizando seguridad y privacidad de la información.' },
                    { icono: '🔔', titulo: 'Notificaciones por rol', desc: 'Cada usuario recibe únicamente las alertas relevantes para sus responsabilidades, evitando sobrecarga de información.' },
                ],
                stats: [
                    { valor: '4', label: 'Roles especializados' },
                    { valor: '50+', label: 'Usuarios simultáneos' },
                    { valor: '100%', label: 'Acceso personalizado' },
                ]
            },
            domiciliarios: {
                titulo: 'Gestión de Domiciliarios',
                emoji: '🚚',
                degradado: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
                subtitulo: 'Logística de recogida y entrega sin fricciones',
                descripcion: 'Coordina todo el proceso de movilización de equipos. Desde que el cliente solicita la recogida hasta que recibe su equipo reparado, el domiciliario tiene toda la información que necesita en un solo lugar.',
                items: [
                    { icono: '📍', titulo: 'Seguimiento GPS', desc: 'Rastrea la ubicación del domiciliario en tiempo real. Clientes y administradores saben exactamente dónde está su equipo.' },
                    { icono: '🗺️', titulo: 'Optimización de rutas', desc: 'El sistema sugiere el orden óptimo para realizar las entregas del día, ahorrando tiempo y combustible.' },
                    { icono: '📦', titulo: 'Gestión de recogidas', desc: 'Programa y confirma recogidas de equipos directamente desde la app, con notificación automática al cliente.' },
                    { icono: '✅', titulo: 'Confirmación digital', desc: 'El cliente firma digitalmente la recepción del equipo y recibe comprobante inmediato por correo.' },
                    { icono: '🔔', titulo: 'Alertas al cliente', desc: 'El cliente recibe notificaciones automáticas cuando el domiciliario sale, está cerca y ha entregado el equipo.' },
                    { icono: '📋', titulo: 'Historial de entregas', desc: 'Registro completo de todas las recogidas y entregas con timestamps, estados y firma del receptor.' },
                ],
                stats: [
                    { valor: '40%', label: 'Ahorro en tiempos de entrega' },
                    { valor: '15 min', label: 'Tiempo promedio de respuesta' },
                    { valor: '24/7', label: 'Disponibilidad de seguimiento' },
                ]
            },
            reportes: {
                titulo: 'Reportes Detallados',
                emoji: '📊',
                degradado: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                subtitulo: 'Toma decisiones basadas en datos reales',
                descripcion: 'Transforma la operación diaria en conocimiento estratégico. SkyHelp recopila automáticamente métricas clave de todo el proceso y las presenta en dashboards visuales e informes exportables.',
                items: [
                    { icono: '⏱️', titulo: 'Tiempos de respuesta', desc: 'Analiza el tiempo promedio de atención por técnico, tipo de equipo y prioridad. Identifica cuellos de botella fácilmente.' },
                    { icono: '😊', titulo: 'Satisfacción del cliente', desc: 'Encuestas automáticas post-reparación con análisis de tendencias de satisfacción en el tiempo.' },
                    { icono: '🔧', titulo: 'Rendimiento de técnicos', desc: 'Métricas individuales por técnico: tickets resueltos, tiempo promedio, calificaciones y especialidades.' },
                    { icono: '💰', titulo: 'Análisis de costos', desc: 'Controla el costo operativo por ticket, identificando oportunidades de ahorro y áreas de inversión.' },
                    { icono: '📈', titulo: 'Tendencias históricas', desc: 'Compara períodos, detecta estacionalidades y anticipa picos de demanda para planificar recursos.' },
                    { icono: '📄', titulo: 'Exportación', desc: 'Genera reportes en PDF o Excel con un clic. Comparte informes ejecutivos con tu equipo directivo fácilmente.' },
                ],
                stats: [
                    { valor: '2.3h', label: 'Tiempo promedio de resolución' },
                    { valor: '$4.2K', label: 'Ahorro mensual promedio' },
                    { valor: '15+', label: 'Tipos de reportes disponibles' },
                ]
            },
            notificaciones: {
                titulo: 'Notificaciones en Tiempo Real',
                emoji: '🔔',
                degradado: 'linear-gradient(135deg, #f59e0b, #f97316)',
                subtitulo: 'Nadie se pierde ninguna actualización importante',
                descripcion: 'El sistema de notificaciones de SkyHelp mantiene a cada usuario informado en el momento exacto en que algo relevante ocurre, sin saturar con información innecesaria.',
                items: [
                    { icono: '📱', titulo: 'Notificaciones push', desc: 'Recibe alertas instantáneas en el dispositivo móvil o escritorio, incluso cuando la aplicación está cerrada.' },
                    { icono: '📧', titulo: 'Correo electrónico', desc: 'Envío automático de correos con resúmenes detallados ante cambios de estado, asignaciones y resoluciones.' },
                    { icono: '🔔', titulo: 'Alertas en la app', desc: 'Centro de notificaciones dentro del sistema con historial completo, marcado de leídas y filtros por tipo.' },
                    { icono: '⚙️', titulo: 'Configuración personalizada', desc: 'Cada usuario decide qué tipo de eventos le generan notificación: nuevos tickets, cambios de estado, mensajes, etc.' },
                    { icono: '🎯', titulo: 'Alertas por rol', desc: 'Los técnicos reciben alertas de asignaciones; los clientes, actualizaciones de su equipo; los admins, resúmenes globales.' },
                    { icono: '⏰', titulo: 'Recordatorios automáticos', desc: 'El sistema envía recordatorios cuando un ticket lleva mucho tiempo sin actividad o cuando se acerca el vencimiento del SLA.' },
                ],
                stats: [
                    { valor: '<1s', label: 'Tiempo de entrega de alertas' },
                    { valor: '99.9%', label: 'Uptime del sistema' },
                    { valor: '3', label: 'Canales de notificación' },
                ]
            },
            conocimiento: {
                titulo: 'Centro de Conocimiento',
                emoji: '📚',
                degradado: 'linear-gradient(135deg, #10b981, #059669)',
                subtitulo: 'El saber colectivo al alcance de todos',
                descripcion: 'Una base de conocimiento centralizada donde técnicos y administradores documentan soluciones, procedimientos y mejores prácticas. Reduce el tiempo de diagnóstico y mejora la calidad del servicio.',
                items: [
                    { icono: '🔍', titulo: 'Búsqueda inteligente', desc: 'Motor de búsqueda potente que encuentra artículos por palabras clave, categoría, equipo o síntoma en milisegundos.' },
                    { icono: '📖', titulo: 'Artículos técnicos', desc: 'Guías paso a paso para los problemas más frecuentes, con imágenes, videos y listas de verificación incluidas.' },
                    { icono: '❓', titulo: 'FAQ interactivo', desc: 'Preguntas frecuentes organizadas por rol (cliente, técnico) con respuestas claras y enlaces a artículos relacionados.' },
                    { icono: '🏷️', titulo: 'Categorías y etiquetas', desc: 'Organiza el contenido por marca de equipo, tipo de problema, área técnica y nivel de dificultad.' },
                    { icono: '✍️', titulo: 'Creación colaborativa', desc: 'Técnicos y administradores pueden crear y editar artículos. Sistema de revisión y aprobación integrado.' },
                    { icono: '📊', titulo: 'Artículos más útiles', desc: 'Métricas de uso: artículos más visitados, valoraciones de utilidad y sugerencias de mejora del contenido.' },
                ],
                stats: [
                    { valor: '200+', label: 'Artículos disponibles' },
                    { valor: '35%', label: 'Reducción en consultas repetidas' },
                    { valor: '4.8★', label: 'Valoración promedio' },
                ]
            }
        };

        const d = datos[id];
        if (!d) return;

        const itemsHTML = d.items.map(item => `
            <div class="detalle-item">
                <div class="detalle-item-icono">${item.icono}</div>
                <div>
                    <div class="detalle-item-titulo">${item.titulo}</div>
                    <div class="detalle-item-desc">${item.desc}</div>
                </div>
            </div>
        `).join('');

        const statsHTML = d.stats.map(s => `
            <div class="detalle-stat">
                <div class="detalle-stat-valor">${s.valor}</div>
                <div class="detalle-stat-label">${s.label}</div>
            </div>
        `).join('');

        const contenido = `
            <div class="modal-encabezado detalle-modal-encabezado" style="background:${d.degradado};">
                <div>
                    <div class="detalle-emoji">${d.emoji}</div>
                    <h3 style="color:white;">${d.titulo}</h3>
                    <p style="color:rgba(255,255,255,0.9);margin-top:0.375rem;font-size:0.9375rem;">${d.subtitulo}</p>
                </div>
                <button class="btn-cerrar-modal" style="background:rgba(255,255,255,0.2);color:white;" onclick="aplicacion.cerrarModal()">✕</button>
            </div>
            <div class="modal-cuerpo">
                <p style="color:var(--gris-600);line-height:1.8;margin-bottom:2rem;">${d.descripcion}</p>

                <div class="detalle-stats-banda">
                    ${statsHTML}
                </div>

                <h4 style="font-size:1rem;font-weight:700;color:var(--gris-800);margin:2rem 0 1.25rem;">Funcionalidades principales</h4>
                <div class="detalle-items-grid">
                    ${itemsHTML}
                </div>
            </div>
            <div class="modal-pie">
                <button class="btn btn-secundario" onclick="aplicacion.cerrarModal()">Cerrar</button>
                <button class="btn btn-primario" onclick="aplicacion.cerrarModal(); aplicacion.mostrarLogin();">
                    Comenzar gratis
                    <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        `;
        this.abrirModal(contenido, true);
    }
}

// Inicializar aplicación
const aplicacion = new AplicacionSkyHelp();