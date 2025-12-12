const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

const salas = {};
const palabras = {
    Objetos: ["Agenda", "Alfombra", "Almohada", "Altavoz", "Antena", "Archivador", "Arena", "Armario", "Asiento", "Audífonos", "Balón", "Bandeja", "Basurero", "Batería", "Batidora", "Bicicleta", "Billete", "Boleto", "Bolígrafo", "Bolillo", "Bolsa", "Bomba", "Bombillo", "Borrador", "Botella", "Brocha", "Brújula", "Bufanda", "Cable", "Caja", "Cajón", "Calcetin", "Calculadora", "Cámara", "Camisa", "Candado", "Carpeta", "Carro", "Cartera", "Casco", "Cemento", "Cepillo", "Cerradura", "Cerrillo", "Chapa", "Chaqueta", "Cilindro", "Cinta", "Cinturón", "Clip", "Cobija", "Codo", "Colador", "Colchón", "Computador", "Congelador", "Consola", "Cordón", "Cortina", "Cuaderno", "Cuadro", "Cubeta", "Cubo", "Cuchara", "Cuchillo", "Cuerda", "Dado", "Destornillador", "Detergente", "Disco", "Ducha", "Enchufe", "Envase", "Escalera", "Escoba", "Escritorio", "Esfera", "Espejo", "Esponja", "Estante", "Estufa", "Etiqueta", "Flauta", "Flecha", "Funda", "Gafas", "Gorra", "Grapadora", "Grifo", "Guantes", "Hebilla", "Heladera", "Hoja", "Horno", "Imán", "Impresora", "Interruptor", "Jabón", "Juguete", "Ladrillo", "Lámpara", "Lana", "Lápiz", "Lata", "Libreta", "Licuadora", "Linterna", "Llanta", "Llave", "Llavero", "Madera", "Maleta", "Mapa", "Marcador", "Marco", "Martillo", "Memoria", "Metal", "Microondas", "Mochila", "Moneda", "Monitor", "Motor", "Mouse", "Olla", "Paño", "Papel", "Paraguas", "Parlante", "Pasta", "Pedal", "Pegante", "Peinilla", "Pelador", "Pelota", "Peluche", "Perfume", "Persiana", "Pila", "Pincel", "Plástico", "Plato", "Poster", "Puerta", "Pulsera", "Punzón", "Radio", "Recipiente", "Recogedor", "Refrigerador", "Regla", "Reloj", "Retrovisor", "Roca", "Rodillo", "Rollo", "Sábana", "Sartén", "Serrucho", "Servilleta", "Shampoo", "Sierra", "Silla", "Sobre", "Sofá", "Soga", "Sombrero", "Sudader", "Tablero", "Taladro", "Tapa", "Tapete", "Tarjeta", "Taza", "Teclado", "Teléfono", "Televisor", "Tenedor", "Tenis", "Termo", "Termómetro", "Tetera", "Tijeras", "Toalla", "Tornillo", "Torre", "Trapeador", "Trípode", "Trompeta", "Tubería", "Tubo", "Tuerca", "Vajilla", "Vaso", "Ventana", "Ventilador", "Vidrio", "Vinilo", "Volante", "Zapatos"],
    Países: ["Alemania", "Andorra", "Arabia Saudita", "Argentina", "Australia", "Austria", "Bélgica", "Bolivia", "Bosnia y Herzegovina", "Brasil", "Bulgaria", "Burkina Faso", "Camerún", "Canadá", "Catar", "Chile", "China", "Colombia", "Congo", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Filipinas", "Finlandia", "Francia", "Georgia", "Ghana", "Grecia", "Guatemala", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Líbano", "Madagascar", "Marruecos", "México", "Mónaco", "Mongolia", "Nicaragua", "Nigeria", "Noruega", "Nueva Zelanda", "Países Bajos", "Pakistán", "Palestina", "Panamá", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Checa", "República Dominicana", "Rumania", "Rusia", "San Marino", "Senegal", "Serbia", "Singapur", "Siria", "Sudáfrica", "Suecia", "Suiza", "Tailandia", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Ucrania", "Uruguay", "Uzbekistán", "Vaticano", "Venezuela", "Vietnam"],
    Futbolistas: ["Achraf Hakimi", "Alessandro Del Piero", "Alessandro Nesta", "Alfredo Di Stéfano", "Alisson Becker", "Alphonso Davies", "Álvaro Morata", "Andrea Pirlo", "Andrés Guardado", "Andrés Iniesta", "Ángel Di María", "Ansu Fati", "Antoine Griezmann", "Arjen Robben", "Arturo Vidal", "Blaise Matuidi", "Bobby Charlton", "Bukayo Saka", "Cafu", "Carles Puyol", "Carlos Tevez", "Carlos Valderrama", "Casemiro", "Cesc Fàbregas", "Chicharito Hernández", "Claudio Bravo", "Cristiano Ronaldo", "Dani Alves", "Dani Carvajal", "David de Gea", "David Luiz", "David Ospina", "David Silva", "David Villa", "Deco", "Dida", "Didier Drogba", "Diego Costa", "Diego Forlán", "Diego Maradona", "Diego Milito", "Diego Simeone", "Douglas Costa", "Eden Hazard", "Ederson", "Edinson Cavani", "Elias Figueroa", "Erling Haaland", "Eusebio", "Fabio Coentrão", "Faustino Asprilla", "Fernando Torres", "Florian Wirtz", "Francesco Totti", "Franco Armani", "Frank Lampard", "Franz Beckenbauer", "Frenkie de Jong", "Gabriel Batistuta", "Garrincha", "Gavi", "Gennaro Gattuso", "George Best", "Gerard Piqué", "Gerd Müller", "Gianluigi Buffon", "Giorgio Chiellini", "Giovani dos Santos", "Gonzalo Higuaín", "Gündoğan İlkay", "Harry Kane", "Hernán Crespo", "Hugo Lloris", "Hugo Sánchez", "Hulk", "Iker Casillas", "Ilkay Gündoğan", "Isco", "Ivan Rakitić", "Jamal Musiala", "James Rodríguez", "Jan Oblak", "Javier Zanetti", "Jefferson Farfán", "Jérôme Boateng", "João Cancelo", "João Félix", "Johan Cruyff", "John Terry", "Jordi Alba", "Jorginho", "José Luis Chilavert", "José María Giménez", "Joshua Kimmich", "Juan Fernando Quintero", "Juan Guillermo Cuadrado", "Juan Mata", "Juan Román Riquelme", "Jude Bellingham", "Julián Álvarez", "Julian Draxler", "Julio César", "Just Fontaine", "Kaká", "Karim Benzema", "Karl-Heinz Rummenigge", "Kevin De Bruyne", "Kevin-Prince Boateng", "Keylor Navas", "Kingsley Coman", "Koke", "Kylian Mbappé", "Lamine Yamal", "Leonardo Bonucci", "Leroy Sané", "Lev Yashin", "Lionel Messi", "Lothar Matthäus", "Luis Suárez", "Luka Modrić", "Manuel Neuer", "Marcelo", "Marco van Basten", "Marco Verratti", "Mario Balotelli", "Mario Kempes", "Mario Mandžukić", "Marquinhos", "Mauro Icardi", "Memphis Depay", "Mesut Özil", "Michel Platini", "Miroslav Klose", "Mohamed Salah", "Nani", "Neymar", "N'Golo Kanté", "Oliver Kahn", "Óscar", "Ousmane Dembélé", "Paolo Guerrero", "Paolo Maldini", "Paul Pogba", "Pedri", "Pele", "Pepe", "Petr Čech", "Phil Foden", "Philipp Lahm", "Philippe Coutinho", "Pierre-Emerick Aubameyang", "Radamel Falcao", "Rafa Márquez", "Raheem Sterling", "Raphaël Varane", "Raphinha", "René Higuita", "Rio Ferdinand", "Rivaldo", "Robert Lewandowski", "Roberto Carlos", "Robin van Persie", "Rodri", "Rodrygo", "Romario", "Romelu Lukaku", "Ronaldinho", "Ronaldo Nazário", "Rúben Dias", "Ruud Gullit", "Ruud van Nistelrooy", "Sadio Mané", "Salomón Rondón", "Sami Khedira", "Samuel Eto’o", "Sergio Agüero", "Sergio Busquets", "Sergio Ramos", "Socrates", "Son Heung-min", "Stephan El Shaarawy", "Steven Gerrard", "Teófilo Cubillas", "Teófilo Gutiérrez", "Ter Stegen", "Thiago Alcántara", "Thiago Silva", "Thibaut Courtois", "Thomas Müller", "Toni Kroos", "Vincent Kompany", "Vinícius Jr", "Virgil van Dijk", "Wesley Sneijder", "Xabi Alonso", "Xavi Hernández", "Yaya Touré", "Yerry Mina", "Zico", "Zlatan Ibrahimović"]
};

io.on("connection", socket => {
    console.log(`Usuario conectado: ${socket.id}`);

    /* ----- CREAR SALA ----- */
    socket.on("crearSala", data => {
        if (!data.nombre || !data.codigo) {
            socket.emit("error", "Datos incompletos");
            return;
        }

        // Verificar que el código no exista
        if (salas[data.codigo]) {
            socket.emit("error", "El código ya existe");
            return;
        }

        salas[data.codigo] = {
            creador: socket.id,
            maxJugadores: data.maxJugadores,
            impostores: data.impostores,
            categoria: data.categoria,
            jugadores: [{ id: socket.id, nombre: data.nombre, posicion: 1 }],
            palabra: null,
            listaParaVer: [],
            listos: [],
            votosImpostor: 0,
            roles: {},
            estado: "esperando",
            codigo: data.codigo
        };

        socket.join(data.codigo);
        console.log(`Sala creada: ${data.codigo} por ${data.nombre}`);

        socket.emit("salaCreada", {
            sala: data.codigo,
            creador: socket.id,
            maxJugadores: data.maxJugadores,
            impostores: data.impostores,
            categoria: data.categoria,
            jugadores: salas[data.codigo].jugadores
        });
    });

    /* ----- MODIFICAR CONFIGURACIÓN ----- */
    socket.on("modificarConfiguracion", data => {
        const sala = salas[data.sala];
        if (!sala || socket.id !== sala.creador) return;

        // Actualizar configuración
        sala.maxJugadores = data.maxJugadores;
        sala.impostores = data.impostores;
        sala.categoria = data.categoria;

        console.log(`Configuración modificada en ${data.sala}: ${data.maxJugadores} jugadores, ${data.impostores} impostores, ${data.categoria}`);

        // Notificar a todos
        io.to(data.sala).emit("configuracionModificada", {
            maxJugadores: sala.maxJugadores,
            impostores: sala.impostores,
            categoria: sala.categoria
        });

        // Actualizar lista de jugadores
        io.to(data.sala).emit("jugadoresActualizados", {
            sala: data.sala,
            creador: sala.creador,
            maxJugadores: sala.maxJugadores,
            impostores: sala.impostores,
            categoria: sala.categoria,
            jugadores: sala.jugadores
        });
    });

    /* ----- UNIRSE A SALA ----- */
    socket.on("unirseSala", data => {
        if (!data.sala || !data.nombre) {
            socket.emit("errorUnirse", "Datos incompletos");
            return;
        }

        const codigo = data.sala.toUpperCase();
        const sala = salas[codigo];

        if (!sala) {
            socket.emit("errorUnirse", "La sala no existe");
            return;
        }

        if (sala.estado !== "esperando") {
            socket.emit("errorUnirse", "La partida ya comenzó");
            return;
        }

        if (sala.jugadores.length >= sala.maxJugadores) {
            socket.emit("errorUnirse", "La sala está llena");
            return;
        }

        if (sala.jugadores.some(j => j.nombre === data.nombre)) {
            socket.emit("errorUnirse", "Ese nombre ya está en uso");
            return;
        }

        // Asignar posición en orden de llegada
        const posicion = sala.jugadores.length + 1;
        sala.jugadores.push({ id: socket.id, nombre: data.nombre, posicion: posicion });
        socket.join(codigo);

        console.log(`${data.nombre} se unió a ${codigo} como jugador ${posicion}`);

        // Notificar a todos
        io.to(codigo).emit("jugadoresActualizados", {
            sala: codigo,
            creador: sala.creador,
            maxJugadores: sala.maxJugadores,
            impostores: sala.impostores,
            categoria: sala.categoria,
            jugadores: sala.jugadores
        });

        // Notificar al nuevo jugador
        socket.emit("salaUnida", {
            sala: codigo,
            creador: sala.creador,
            maxJugadores: sala.maxJugadores,
            impostores: sala.impostores,
            categoria: sala.categoria,
            jugadores: sala.jugadores,
            miPosicion: posicion
        });
    });

    /* ----- INICIAR JUEGO ----- */
    socket.on("iniciarJuego", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala) {
            console.log(`Sala ${salaCodigo} no encontrada`);
            return;
        }

        // Solo el creador puede iniciar
        if (socket.id !== sala.creador) {
            socket.emit("error", "Solo el creador puede iniciar el juego");
            return;
        }

        // Verificar que estén todos los jugadores
        if (sala.jugadores.length !== sala.maxJugadores) {
            const faltan = sala.maxJugadores - sala.jugadores.length;
            socket.emit("error", `Faltan ${faltan} jugador(es)`);
            return;
        }

        // Cambiar estado
        sala.estado = "jugando";
        sala.palabra = generarPalabra(sala.categoria);
        sala.listaParaVer = [...sala.jugadores.map(j => j.id)];
        sala.listos = [];
        sala.votosImpostor = 0;
        
        // Resetear votos de jugadores
        sala.jugadores.forEach(j => {
            j._haVotado = false;
            j._votoImpostor = false;
        });

        // Asignar roles aleatorios TOTALMENTE
        asignarRolesAleatorios(sala);

        console.log(`=== Partida iniciada en ${salaCodigo} ===`);
        console.log(`Palabra: ${sala.palabra}`);
        console.log(`Categoría: ${sala.categoria}`);
        console.log(`Jugadores: ${sala.jugadores.length}`);
        console.log(`Impostores: ${sala.impostores}`);
        console.log(`Roles asignados:`, sala.roles);

        // Enviar a todos la pantalla de "Ver Palabra" (con botón VER)
        io.to(salaCodigo).emit("irPantallaVerPalabra", {
            sala: salaCodigo,
            categoria: sala.categoria,
            impostores: sala.impostores,
            totalJugadores: sala.jugadores.length
        });
    });

    /* ----- VER PALABRA ----- */
    socket.on("verPalabra", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala || sala.estado !== "jugando") {
            console.log(`Error: Sala ${salaCodigo} no está jugando`);
            return;
        }

        const jugador = sala.jugadores.find(j => j.id === socket.id);
        if (!jugador) {
            console.log(`Error: Jugador ${socket.id} no encontrado en sala`);
            return;
        }

        const rol = sala.roles[socket.id];
        let texto = rol === "IMPOSTOR" ? "IMPOSTOR" : sala.palabra;

        // Agregar a lista de los que ya vieron
        if (sala.listaParaVer.includes(socket.id)) {
            sala.listaParaVer = sala.listaParaVer.filter(id => id !== socket.id);
        }

        socket.emit("resultadoPalabra", {
            rol: rol,
            palabra: texto,
            impostores: sala.impostores,
            totalJugadores: sala.jugadores.length,
            posicion: jugador.posicion
        });
    });

    /* ----- MARCAR COMO LISTO ----- */
    socket.on("marcarListo", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala || sala.estado !== "jugando") return;

        const jugador = sala.jugadores.find(j => j.id === socket.id);
        if (!jugador) return;

        if (!sala.listos.includes(socket.id)) {
            sala.listos.push(socket.id);
            console.log(`${jugador.nombre} marcó como listo en ${salaCodigo}: ${sala.listos.length}/${sala.jugadores.length}`);
        }

        // Si todos están listos, mostrar botón de impostor/menú final
        if (sala.listos.length >= sala.jugadores.length) {
            console.log(`Todos están listos en ${salaCodigo}`);
            
            // Encontrar al/los impostor(es)
            const impostores = [];
            for (const [id, rol] of Object.entries(sala.roles)) {
                if (rol === "IMPOSTOR") {
                    const impostor = sala.jugadores.find(j => j.id === id);
                    if (impostor) {
                        impostores.push({
                            nombre: impostor.nombre,
                            posicion: impostor.posicion
                        });
                    }
                }
            }

            io.to(salaCodigo).emit("todosListos", {
                totalListos: sala.listos.length,
                totalJugadores: sala.jugadores.length,
                todosListos: true,
                soyCreador: sala.creador === socket.id,
                impostores: impostores
            });
        } else {
            // Notificar a todos que alguien marcó listo
            io.to(salaCodigo).emit("todosListos", {
                totalListos: sala.listos.length,
                totalJugadores: sala.jugadores.length,
                todosListos: false
            });
        }
    });

    /* ----- VOTAR IMPOSTOR ----- */
    socket.on("votarImpostor", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala) return;

        const jugador = sala.jugadores.find(j => j.id === socket.id);
        if (!jugador) return;

        // Verificar que no haya votado ya
        if (!jugador._votoImpostor) {
            sala.votosImpostor++;
            jugador._votoImpostor = true;
            console.log(`${jugador.nombre} votó impostor en ${salaCodigo}: ${sala.votosImpostor}/${sala.jugadores.length}`);
        }

        // Si todos votaron, revelar impostor automáticamente
        if (sala.votosImpostor >= sala.jugadores.length) {
            // Encontrar al/los impostor(es)
            const impostores = [];
            for (const [id, rol] of Object.entries(sala.roles)) {
                if (rol === "IMPOSTOR") {
                    const impostor = sala.jugadores.find(j => j.id === id);
                    if (impostor) {
                        impostores.push({
                            nombre: impostor.nombre,
                            posicion: impostor.posicion
                        });
                    }
                }
            }

            io.to(salaCodigo).emit("impostorRevelado", {
                impostores: impostores
            });
        }
    });

    /* ----- REVELAR IMPOSTOR ----- */
    socket.on("revelarImpostor", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala) return;

        // Encontrar al/los impostor(es)
        const impostores = [];
        for (const [id, rol] of Object.entries(sala.roles)) {
            if (rol === "IMPOSTOR") {
                const impostor = sala.jugadores.find(j => j.id === id);
                if (impostor) {
                    impostores.push({
                        nombre: impostor.nombre,
                        posicion: impostor.posicion
                    });
                }
            }
        }

        io.to(salaCodigo).emit("impostorRevelado", {
            impostores: impostores
        });
    });

    /* ----- VOLVER A JUGAR ----- */
    socket.on("volverAJugar", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala || socket.id !== sala.creador) return;

        // Reiniciar estado del juego
        sala.estado = "jugando";
        sala.palabra = generarPalabra(sala.categoria);
        sala.listaParaVer = [...sala.jugadores.map(j => j.id)];
        sala.listos = [];
        sala.votosImpostor = 0;
        
        // Resetear votos de jugadores
        sala.jugadores.forEach(j => {
            j._haVotado = false;
            j._votoImpostor = false;
        });

        // Reasignar roles aleatorios TOTALMENTE
        asignarRolesAleatorios(sala);

        console.log(`Partida reiniciada en ${salaCodigo}: ${sala.palabra}`);

        // Enviar a todos la pantalla de "Ver Palabra" (con botón VER)
        io.to(salaCodigo).emit("juegoReiniciado");
        io.to(salaCodigo).emit("irPantallaVerPalabra", {
            sala: salaCodigo,
            categoria: sala.categoria,
            impostores: sala.impostores,
            totalJugadores: sala.jugadores.length
        });
    });

    /* ----- VOLVER A CONFIGURACIÓN ----- */
    socket.on("volverConfiguracion", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala || socket.id !== sala.creador) return;

        sala.estado = "esperando";
        sala.palabra = null;
        sala.listaParaVer = [];
        sala.listos = [];
        sala.votosImpostor = 0;
        sala.roles = {};
        
        // Resetear votos de jugadores
        sala.jugadores.forEach(j => {
            j._haVotado = false;
            j._votoImpostor = false;
        });

        // Volver a la configuración inicial
        io.to(salaCodigo).emit("volverConfiguracionSala");
    });

    /* ----- ABANDONAR SALA ----- */
    socket.on("abandonarSala", salaCodigo => {
        const sala = salas[salaCodigo];
        if (!sala) return;

        const jugador = sala.jugadores.find(j => j.id === socket.id);
        if (!jugador) return;

        // Eliminar jugador
        sala.jugadores = sala.jugadores.filter(j => j.id !== socket.id);
        socket.leave(salaCodigo);

        console.log(`${jugador.nombre} abandonó ${salaCodigo}`);

        // Si es el creador, eliminar sala para todos
        if (socket.id === sala.creador) {
            io.to(salaCodigo).emit("salaEliminada");
            delete salas[salaCodigo];
            console.log(`Sala ${salaCodigo} eliminada por el creador`);
        } else if (sala.jugadores.length > 0) {
            // Reasignar posiciones
            sala.jugadores.forEach((j, index) => {
                j.posicion = index + 1;
            });
            
            // Actualizar lista para los que quedan
            io.to(salaCodigo).emit("jugadoresActualizados", {
                sala: salaCodigo,
                creador: sala.creador,
                maxJugadores: sala.maxJugadores,
                impostores: sala.impostores,
                categoria: sala.categoria,
                jugadores: sala.jugadores
            });
        } else {
            // Si no quedan jugadores, eliminar sala
            delete salas[salaCodigo];
            console.log(`Sala ${salaCodigo} eliminada (sin jugadores)`);
        }
    });

    /* ----- DESCONEXIÓN ----- */
    socket.on("disconnect", () => {
        console.log(`Usuario desconectado: ${socket.id}`);

        for (const codigo in salas) {
            const sala = salas[codigo];
            const jugador = sala.jugadores.find(j => j.id === socket.id);
            
            if (jugador) {
                sala.jugadores = sala.jugadores.filter(j => j.id !== socket.id);
                
                // Si es el creador, eliminar sala para todos
                if (socket.id === sala.creador) {
                    io.to(codigo).emit("salaEliminada");
                    delete salas[codigo];
                    console.log(`Sala ${codigo} eliminada por desconexión del creador`);
                } else if (sala.jugadores.length > 0) {
                    // Reasignar posiciones
                    sala.jugadores.forEach((j, index) => {
                        j.posicion = index + 1;
                    });
                    
                    // Actualizar lista para los que quedan
                    io.to(codigo).emit("jugadoresActualizados", {
                        sala: codigo,
                        creador: sala.creador,
                        maxJugadores: sala.maxJugadores,
                        impostores: sala.impostores,
                        categoria: sala.categoria,
                        jugadores: sala.jugadores
                    });
                } else {
                    // Si no quedan jugadores, eliminar sala
                    delete salas[codigo];
                    console.log(`Sala ${codigo} eliminada (sin jugadores)`);
                }
                break;
            }
        }
    });
});

/* ----- FUNCIONES UTILITARIAS ----- */
function generarPalabra(categoria) {
    const lista = palabras[categoria] || palabras["Objetos"];
    return lista[Math.floor(Math.random() * lista.length)];
}

function asignarRolesAleatorios(sala) {
    // Reiniciar roles
    sala.roles = {};
    
    // Crear array de IDs de jugadores
    let jugadoresIds = sala.jugadores.map(j => j.id);
    
    // Mezclar IDs aleatoriamente
    for (let i = jugadoresIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [jugadoresIds[i], jugadoresIds[j]] = [jugadoresIds[j], jugadoresIds[i]];
    }
    
    // Asignar roles (los primeros N son impostores)
    for (let i = 0; i < jugadoresIds.length; i++) {
        if (i < sala.impostores) {
            sala.roles[jugadoresIds[i]] = "IMPOSTOR";
        } else {
            sala.roles[jugadoresIds[i]] = "INOCENTE";
        }
    }
    
    console.log(`Roles asignados en ${sala.codigo}:`, sala.roles);
}

/* ----- INICIAR SERVIDOR ----- */
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log("Juego del Impostor - Multijugador");
});