// js/modules/dashboard.js
// Métodos para el dashboard

AplicacionSkyHelp.prototype.obtenerContenidoDashboard = function() {
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
                            ${datosSkyHelp.tickets.slice(0, 5).map(ticket => `
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
};

AplicacionSkyHelp.prototype.obtenerEstadisticasPorRol = function(rol) {
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
};