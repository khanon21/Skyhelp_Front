// js/modules/history.js
// Métodos para historial de entregas

AplicacionSkyHelp.prototype.obtenerContenidoHistorial = function() {
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
};