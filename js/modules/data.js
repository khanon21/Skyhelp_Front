// js/modules/data.js
// Datos de ejemplo para SkyHelp

const datosSkyHelp = {
    usuariosDemo: [
        { correo: 'admin@skyhelp.com', contrasena: 'admin123', nombre: 'María Administradora', rol: 'administrador' },
        { correo: 'tecnico@skyhelp.com', contrasena: 'tecnico123', nombre: 'Juan Técnico', rol: 'tecnico' },
        { correo: 'cliente@skyhelp.com', contrasena: 'cliente123', nombre: 'Ana Cliente', rol: 'cliente' },
        { correo: 'domiciliario@skyhelp.com', contrasena: 'domiciliario123', nombre: 'Carlos Domiciliario', rol: 'domiciliario' }
    ],
    
    tickets: [
        { id: 'TK-001', equipo: 'Dell OptiPlex 7090', problema: 'Monitor no enciende', estado: 'En progreso', cliente: 'María González', tecnico: 'Juan Pérez', prioridad: 'Alta', creado: '2024-01-15', actualizado: '2024-01-16' },
        { id: 'TK-002', equipo: 'HP ProDesk 400 G7', problema: 'No enciende', estado: 'Pendiente', cliente: 'Carlos López', tecnico: 'Sin asignar', prioridad: 'Crítica', creado: '2024-01-16', actualizado: '2024-01-16' },
        { id: 'TK-003', equipo: 'MacBook Air', problema: 'Teclado no funciona', estado: 'Asignado', cliente: 'Ana Martínez', tecnico: 'Pedro Rodríguez', prioridad: 'Media', creado: '2024-01-14', actualizado: '2024-01-15' },
        { id: 'TK-004', equipo: 'Lenovo ThinkCentre M720', problema: 'Lentitud extrema', estado: 'Resuelto', cliente: 'Luis Rodríguez', tecnico: 'Ana García', prioridad: 'Baja', creado: '2024-01-10', actualizado: '2024-01-12' },
        { id: 'TK-005', equipo: 'Dell Inspiron 15', problema: 'Pantalla rota', estado: 'En progreso', cliente: 'Pedro Sánchez', tecnico: 'Juan Pérez', prioridad: 'Alta', creado: '2024-01-17', actualizado: '2024-01-17' }
    ]
};