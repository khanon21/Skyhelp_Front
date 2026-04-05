// js/modules/admin.js
// Módulo de administración - Vista de gestión de técnicos

// Datos simulados de técnicos y su actividad
AplicacionSkyHelp.prototype.obtenerTecnicosConActividad = function() {
    return [
        {
            id: 1,
            nombre: 'Juan Pérez',
            email: 'juan@skyhelp.com',
            telefono: '+57 300 123 4567',
            estado: 'activo',
            ticketsAsignados: 5,
            ticketsResueltos: 24,
            tareaActual: 'Monitor no enciende (TK-001)',
            ubicacion: 'Barrio Centro',
            ultimaActividad: 'hace 5 minutos',
            promedioBilletera: 2.1  // horas
        },
        {
            id: 2,
            nombre: 'Pedro Rodríguez',
            email: 'pedro@skyhelp.com',
            telefono: '+57 300 124 5678',
            estado: 'activo',
            ticketsAsignados: 3,
            ticketsResueltos: 31,
            tareaActual: 'Teclado no funciona (TK-003)',
            ubicacion: 'Zona norte',
            ultimaActividad: 'hace 12 minutos',
            promedioBilletera: 1.8
        },
        {
            id: 3,
            nombre: 'Ana García',
            email: 'ana@skyhelp.com',
            telefono: '+57 300 125 6789',
            estado: 'activo',
            ticketsAsignados: 2,
            ticketsResueltos: 19,
            tareaActual: 'Lentitud extrema (TK-004)',
            ubicacion: 'Zona sur',
            ultimaActividad: 'hace 2 minutos',
            promedioBilletera: 2.5
        },
        {
            id: 4,
            nombre: 'Luis Gómez',
            email: 'luis@skyhelp.com',
            telefono: '+57 300 126 7890',
            estado: 'inactivo',
            ticketsAsignados: 0,
            ticketsResueltos: 15,
            tareaActual: 'Sin asignar',
            ubicacion: 'Desconectado',
            ultimaActividad: 'hace 4 horas',
            promedioBilletera: 2.2
        },
        {
            id: 5,
            nombre: 'Sofía Martínez',
            email: 'sofia@skyhelp.com',
            telefono: '+57 300 127 8901',
            estado: 'activo',
            ticketsAsignados: 4,
            ticketsResueltos: 28,
            tareaActual: 'Pantalla rota (TK-005)',
            ubicacion: 'Barrio la Paz',
            ultimaActividad: 'hace 1 minuto',
            promedioBilletera: 1.9
        }
    ];
};

AplicacionSkyHelp.prototype.obtenerContenidoTechnicos = function() {
    const tecnicos = this.obtenerTecnicosConActividad();
    
    const filasTechnicos = tecnicos.map(tecnico => `
        <tr class="fila-tabla-tecnicos">
            <td>
                <div class="info-tecnico">
                    <div class="avatar-tecnico">${tecnico.nombre.charAt(0)}</div>
                    <div class="datos-tecnico">
                        <div class="nombre-tecnico">${tecnico.nombre}</div>
                        <div class="email-tecnico">${tecnico.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge-estado estado-${tecnico.estado}">
                    ${tecnico.estado === 'activo' ? '🟢 Activo' : '⚪ Inactivo'}
                </span>
            </td>
            <td>
                <div class="tareas-tecnico">
                    <div class="tarea-principal">${tecnico.tareaActual}</div>
                    <div class="ubicacion-tecnico">${tecnico.ubicacion}</div>
                </div>
            </td>
            <td class="centro">
                <div class="estadisticas-tecnico">
                    <div class="num-tickets">${tecnico.ticketsAsignados}</div>
                    <div class="etiqueta-tickets">Activos</div>
                </div>
            </td>
            <td class="centro">
                <div class="estadisticas-tecnico">
                    <div class="num-tickets">${tecnico.ticketsResueltos}</div>
                    <div class="etiqueta-tickets">Resueltos</div>
                </div>
            </td>
            <td class="centro">
                <div class="promedio-tiempo">
                    <div class="num-horas">${tecnico.promedioBilletera}h</div>
                    <div class="etiqueta-horas">Promedio</div>
                </div>
            </td>
            <td class="centro">
                <div class="actividad-tecnico">${tecnico.ultimaActividad}</div>
            </td>
            <td class="centro">
                <button class="btn-accion" onclick="aplicacion.mostrarDetallesTecnico(${tecnico.id})" title="Ver detalles">
                    <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <div class="contenedor-gestores">
            <div class="encabezado-gestores">
                <h2>Gestión de Técnicos</h2>
                <p>Monitorea la actividad y productividad de tu equipo técnico</p>
            </div>

            <div class="filtros-technicos">
                <button class="btn-filtro activo" onclick="aplicacion.filtrarTecnicos('todos')">Todos (5)</button>
                <button class="btn-filtro" onclick="aplicacion.filtrarTecnicos('activos')">Activos (4)</button>
                <button class="btn-filtro" onclick="aplicacion.filtrarTecnicos('inactivos')">Inactivos (1)</button>
            </div>

            <div class="tabla-contenedor">
                <table class="tabla-tecnicos">
                    <thead>
                        <tr>
                            <th>Técnico</th>
                            <th>Estado</th>
                            <th>Tarea Actual</th>
                            <th>Tickets Activos</th>
                            <th>Resueltos</th>
                            <th>Tiempo Promedio</th>
                            <th>Última Actividad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasTechnicos}
                    </tbody>
                </table>
            </div>

            <div class="resumen-equipo">
                <div class="tarjeta-resumen">
                    <div class="icono-resumen">👥</div>
                    <div class="contenido-resumen">
                        <div class="titulo-resumen">Técnicos Activos</div>
                        <div class="valor-resumen">4 de 5</div>
                    </div>
                </div>
                <div class="tarjeta-resumen">
                    <div class="icono-resumen">📋</div>
                    <div class="contenido-resumen">
                        <div class="titulo-resumen">Tickets en Progreso</div>
                        <div class="valor-resumen">14</div>
                    </div>
                </div>
                <div class="tarjeta-resumen">
                    <div class="icono-resumen">✅</div>
                    <div class="contenido-resumen">
                        <div class="titulo-resumen">Resueltos Hoy</div>
                        <div class="valor-resumen">8</div>
                    </div>
                </div>
                <div class="tarjeta-resumen">
                    <div class="icono-resumen">⏱️</div>
                    <div class="contenido-resumen">
                        <div class="titulo-resumen">Tiempo Promedio</div>
                        <div class="valor-resumen">2.1h</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

AplicacionSkyHelp.prototype.mostrarDetallesTecnico = function(idTecnico) {
    const tecnicos = this.obtenerTecnicosConActividad();
    const tecnico = tecnicos.find(t => t.id === idTecnico);
    
    if (!tecnico) return;

    const contenidoModal = `
        <div class="contenido-detalles-tecnico">
            <h2>${tecnico.nombre}</h2>
            <div class="detalles-grid">
                <div class="detalle-item">
                    <span class="label">Email:</span>
                    <span class="valor">${tecnico.email}</span>
                </div>
                <div class="detalle-item">
                    <span class="label">Teléfono:</span>
                    <span class="valor">${tecnico.telefono}</span>
                </div>
                <div class="detalle-item">
                    <span class="label">Estado:</span>
                    <span class="valor">
                        <span class="badge-estado estado-${tecnico.estado}">
                            ${tecnico.estado === 'activo' ? '🟢 Activo' : '⚪ Inactivo'}
                        </span>
                    </span>
                </div>
                <div class="detalle-item">
                    <span class="label">Ubicación:</span>
                    <span class="valor">${tecnico.ubicacion}</span>
                </div>
                <div class="detalle-item">
                    <span class="label">Tarea Actual:</span>
                    <span class="valor">${tecnico.tareaActual}</span>
                </div>
                <div class="detalle-item">
                    <span class="label">Última Actividad:</span>
                    <span class="valor">${tecnico.ultimaActividad}</span>
                </div>
            </div>

            <div class="estadisticas-detalladas">
                <div class="stat-card">
                    <div class="stat-numero">${tecnico.ticketsAsignados}</div>
                    <div class="stat-etiqueta">Tickets Activos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-numero">${tecnico.ticketsResueltos}</div>
                    <div class="stat-etiqueta">Resueltos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-numero">${tecnico.promedioBilletera}h</div>
                    <div class="stat-etiqueta">Tiempo Promedio</div>
                </div>
            </div>

            <div class="botones-acciones">
                <button class="btn btn-primario" onclick="aplicacion.asignarTicketATecnico(${idTecnico})">
                    Asignar Ticket
                </button>
                <button class="btn btn-secundario" onclick="aplicacion.editarTecnico(${idTecnico})">
                    Editar
                </button>
                <button class="btn-cerrar" onclick="aplicacion.cerrarModal()">Cerrar</button>
            </div>
        </div>
    `;

    this.abrirModal(contenidoModal, true);
};

AplicacionSkyHelp.prototype.filtrarTecnicos = function(filtro) {
    // Aquí iría la lógica de filtrado
    console.log('Filtrar por:', filtro);
};

AplicacionSkyHelp.prototype.asignarTicketATecnico = function(idTecnico) {
    alert('Funcionalidad de asignar ticket a técnico (ID: ' + idTecnico + ')');
};

AplicacionSkyHelp.prototype.editarTecnico = function(idTecnico) {
    alert('Funcionalidad de editar técnico (ID: ' + idTecnico + ')');
};
