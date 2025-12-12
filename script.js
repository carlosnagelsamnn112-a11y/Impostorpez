const socket = io();

/* ---------------- VARIABLES GLOBALES ---------------- */
let nombreJugador = "";
let salaActual = null;
let categoriaActual = "";
let miRol = null;
let soyCreador = false;
let miPosicion = 0;
let todosListos = false;

// Variables para modo LOCAL
let configLocal = {
    jugadores: [],
    categoria: "Objetos",
    impostores: 1,
    maxJugadores: 4,
    palabraActual: "",
    jugadorActual: 0,
    roles: [],
    impostorIndex: -1
};

// Configuración guardada
let configGuardada = null;

/* ---------------- UTILIDADES ---------------- */
function ocultarTodas() {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    document.getElementById("confirmModal").classList.add("hidden");
}

function mostrar(id) {
    ocultarTodas();
    document.getElementById(id).classList.remove("hidden");
}

function generarPalabra(categoria) {
    const palabras = {
        Objetos: ["Agenda", "Alfombra", "Almohada", "Altavoz", "Antena", "Archivador", "Arena", "Armario", "Asiento", "Audífonos", "Balón", "Bandeja", "Basurero", "Batería", "Batidora", "Bicicleta", "Billete", "Boleto", "Bolígrafo", "Bolillo", "Bolsa", "Bomba", "Bombillo", "Borrador", "Botella", "Brocha", "Brújula", "Bufanda", "Cable", "Caja", "Cajón", "Calcetin", "Calculadora", "Cámara", "Camisa", "Candado", "Carpeta", "Carro", "Cartera", "Casco", "Cemento", "Cepillo", "Cerradura", "Cerrillo", "Chapa", "Chaqueta", "Cilindro", "Cinta", "Cinturón", "Clip", "Cobija", "Codo", "Colador", "Colchón", "Computador", "Congelador", "Consola", "Cordón", "Cortina", "Cuaderno", "Cuadro", "Cubeta", "Cubo", "Cuchara", "Cuchillo", "Cuerda", "Dado", "Destornillador", "Detergente", "Disco", "Ducha", "Enchufe", "Envase", "Escalera", "Escoba", "Escritorio", "Esfera", "Espejo", "Esponja", "Estante", "Estufa", "Etiqueta", "Flauta", "Flecha", "Funda", "Gafas", "Gorra", "Grapadora", "Grifo", "Guantes", "Hebilla", "Heladera", "Hoja", "Horno", "Imán", "Impresora", "Interruptor", "Jabón", "Juguete", "Ladrillo", "Lámpara", "Lana", "Lápiz", "Lata", "Libreta", "Licuadora", "Linterna", "Llanta", "Llave", "Llavero", "Madera", "Maleta", "Mapa", "Marcador", "Marco", "Martillo", "Memoria", "Metal", "Microondas", "Mochila", "Moneda", "Monitor", "Motor", "Mouse", "Olla", "Paño", "Papel", "Paraguas", "Parlante", "Pasta", "Pedal", "Pegante", "Peinilla", "Pelador", "Pelota", "Peluche", "Perfume", "Persiana", "Pila", "Pincel", "Plástico", "Plato", "Poster", "Puerta", "Pulsera", "Punzón", "Radio", "Recipiente", "Recogedor", "Refrigerador", "Regla", "Reloj", "Retrovisor", "Roca", "Rodillo", "Rollo", "Sábana", "Sartén", "Serrucho", "Servilleta", "Shampoo", "Sierra", "Silla", "Sobre", "Sofá", "Soga", "Sombrero", "Sudader", "Tablero", "Taladro", "Tapa", "Tapete", "Tarjeta", "Taza", "Teclado", "Teléfono", "Televisor", "Tenedor", "Tenis", "Termo", "Termómetro", "Tetera", "Tijeras", "Toalla", "Tornillo", "Torre", "Trapeador", "Trípode", "Trompeta", "Tubería", "Tubo", "Tuerca", "Vajilla", "Vaso", "Ventana", "Ventilador", "Vidrio", "Vinilo", "Volante", "Zapatos"],
        Países: ["Alemania", "Andorra", "Arabia Saudita", "Argentina", "Australia", "Austria", "Bélgica", "Bolivia", "Bosnia y Herzegovina", "Brasil", "Bulgaria", "Burkina Faso", "Camerún", "Canadá", "Catar", "Chile", "China", "Colombia", "Congo", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Filipinas", "Finlandia", "Francia", "Georgia", "Ghana", "Grecia", "Guatemala", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Líbano", "Madagascar", "Marruecos", "México", "Mónaco", "Mongolia", "Nicaragua", "Nigeria", "Noruega", "Nueva Zelanda", "Países Bajos", "Pakistán", "Palestina", "Panamá", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Checa", "República Dominicana", "Rumania", "Rusia", "San Marino", "Senegal", "Serbia", "Singapur", "Siria", "Sudáfrica", "Suecia", "Suiza", "Tailandia", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Ucrania", "Uruguay", "Uzbekistán", "Vaticano", "Venezuela", "Vietnam"],
        Futbolistas: ["Achraf Hakimi", "Alessandro Del Piero", "Alessandro Nesta", "Alfredo Di Stéfano"]
    };
    
    const lista = palabras[categoria] || palabras["Objetos"];
    return lista[Math.floor(Math.random() * lista.length)];
}

/* ---------------- PANTALLAS PRINCIPALES ---------------- */
function mostrarModo(modo) {
    if (modo === "local") {
        // Resetear configuración
        configGuardada = null;
        configLocal = {
            jugadores: [],
            categoria: "Objetos",
            impostores: 1,
            maxJugadores: 4,
            palabraActual: "",
            jugadorActual: 0,
            roles: [],
            impostorIndex: -1
        };
        
        // Establecer valores por defecto
        document.getElementById("cantidadJugadoresLocal").value = "4";
        document.getElementById("cantidadImpostoresLocal").value = "1";
        document.getElementById("categoriaLocal").value = "Objetos";
        
        mostrar("pantalla-local-config");
    } else {
        // Limpiar código anterior
        document.getElementById("codigoSalaUnirse").value = "";
        mostrar("multijugador-nombre");
    }
}

/* ========== MODO LOCAL COMPLETO ========== */
function actualizarImpostoresLocal() {
    const cantidadJugadores = parseInt(document.getElementById("cantidadJugadoresLocal").value);
    const selectImpostores = document.getElementById("cantidadImpostoresLocal");
    
    // Limpiar opciones
    selectImpostores.innerHTML = "";
    
    // Calcular máximo de impostores (1 por cada 3 jugadores)
    const maxImpostores = Math.floor(cantidadJugadores / 3);
    
    // Agregar opciones
    for (let i = 1; i <= maxImpostores; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectImpostores.appendChild(option);
    }
    
    // Establecer valor por defecto
    selectImpostores.value = Math.min(1, maxImpostores);
    configLocal.impostores = parseInt(selectImpostores.value);
}

function irNombresLocal() {
    const cantidad = parseInt(document.getElementById("cantidadJugadoresLocal").value);
    const impostores = parseInt(document.getElementById("cantidadImpostoresLocal").value);
    const categoria = document.getElementById("categoriaLocal").value;
    
    // Validar
    if (cantidad < 3 || cantidad > 15) {
        alert("La cantidad debe estar entre 3 y 15 jugadores");
        return;
    }
    
    // Guardar configuración
    configLocal.maxJugadores = cantidad;
    configLocal.impostores = impostores;
    configLocal.categoria = categoria;
    
    // Crear array de jugadores (usar guardados si existen)
    configLocal.jugadores = [];
    
    // Si hay configuración guardada, usar esos nombres
    if (configGuardada && configGuardada.jugadores) {
        // Asegurarnos de que tenemos suficientes jugadores
        for (let i = 0; i < cantidad; i++) {
            if (i < configGuardada.jugadores.length) {
                configLocal.jugadores.push({
                    nombre: configGuardada.jugadores[i].nombre,
                    id: i
                });
            } else {
                configLocal.jugadores.push({
                    nombre: `Jugador ${i + 1}`,
                    id: i
                });
            }
        }
    } else {
        // Crear nombres por defecto
        for (let i = 0; i < cantidad; i++) {
            configLocal.jugadores.push({
                nombre: `Jugador ${i + 1}`,
                id: i
            });
        }
    }
    
    // Mostrar campos para nombres
    mostrarJugadoresLocales();
}

function mostrarJugadoresLocales() {
    const contenedor = document.getElementById("contenedorNombresLocal");
    contenedor.innerHTML = "";
    
    configLocal.jugadores.forEach((jugador, index) => {
        const div = document.createElement("div");
        div.className = "jugador-input";
        div.innerHTML = `
            <div class="jugador-numero">Jugador ${index + 1}</div>
            <input type="text" 
                   class="nombre-jugador-local" 
                   data-index="${index}"
                   value="${jugador.nombre}"
                   placeholder="Nombre del jugador">
        `;
        
        contenedor.appendChild(div);
    });
    
    // Añadir event listeners
    document.querySelectorAll('.nombre-jugador-local').forEach(input => {
        input.addEventListener('input', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const nuevoNombre = this.value.trim() || `Jugador ${index + 1}`;
            configLocal.jugadores[index].nombre = nuevoNombre;
        });
    });
    
    mostrar("pantalla-local-nombres");
}

function volverConfigLocal() {
    mostrar("pantalla-local-config");
}

function iniciarJuegoLocal() {
    // Actualizar nombres si se cambiaron
    document.querySelectorAll('.nombre-jugador-local').forEach(input => {
        const index = parseInt(input.getAttribute('data-index'));
        const nombre = input.value.trim() || `Jugador ${index + 1}`;
        configLocal.jugadores[index].nombre = nombre;
    });
    
    // Generar palabra
    configLocal.palabraActual = generarPalabra(configLocal.categoria);
    
    // Asignar roles aleatorios
    asignarRolesLocales();
    
    // Mostrar primer jugador
    configLocal.jugadorActual = 0;
    mostrarJugadorLocal();
}

function asignarRolesLocales() {
    // Inicializar todos como inocentes
    configLocal.roles = new Array(configLocal.jugadores.length).fill("INOCENTE");
    
    // Seleccionar impostores aleatorios
    let indices = Array.from({length: configLocal.jugadores.length}, (_, i) => i);
    
    // Mezclar indices
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Asignar impostores
    for (let i = 0; i < configLocal.impostores; i++) {
        configLocal.roles[indices[i]] = "IMPOSTOR";
        if (i === 0) {
            configLocal.impostorIndex = indices[i];
        }
    }
}

function mostrarJugadorLocal() {
    const jugador = configLocal.jugadores[configLocal.jugadorActual];
    
    // Actualizar elementos
    document.getElementById("tituloJugadorLocal").textContent = `Turno del Jugador ${configLocal.jugadorActual + 1}`;
    document.getElementById("nombreJugadorLocal").textContent = jugador.nombre;
    document.getElementById("categoriaNombreLocal").textContent = configLocal.categoria;
    document.getElementById("impostoresNombreLocal").textContent = configLocal.impostores;
    document.getElementById("totalJugadoresLocal").textContent = configLocal.maxJugadores;
    
    mostrar("pantalla-local-jugador");
}

function verPalabraLocal() {
    const jugador = configLocal.jugadores[configLocal.jugadorActual];
    const rol = configLocal.roles[configLocal.jugadorActual];
    
    // Actualizar elementos
    document.getElementById("tituloJugadorPalabra").textContent = `Turno del Jugador ${configLocal.jugadorActual + 1}`;
    document.getElementById("nombreJugadorPalabra").textContent = jugador.nombre;
    document.getElementById("categoriaPalabra").textContent = configLocal.categoria;
    document.getElementById("impostoresPalabra").textContent = configLocal.impostores;
    document.getElementById("totalJugadoresPalabra").textContent = configLocal.maxJugadores;
    
    const palabraElem = document.getElementById("palabraJugadorLocal");
    
    if (rol === "IMPOSTOR") {
        palabraElem.textContent = "IMPOSTOR";
        palabraElem.className = "palabra-display palabra-impostor";
    } else {
        palabraElem.textContent = configLocal.palabraActual;
        palabraElem.className = "palabra-display palabra-inocente";
    }
    
    // Mostrar botón correcto
    const esUltimo = configLocal.jugadorActual === configLocal.jugadores.length - 1;
    document.getElementById("btnSiguienteLocal").classList.toggle("hidden", esUltimo);
    document.getElementById("btnFinalizarLocal").classList.toggle("hidden", !esUltimo);
    
    mostrar("pantalla-local-palabra");
}

function siguienteJugadorLocal() {
    configLocal.jugadorActual++;
    mostrarJugadorLocal();
}

function finalizarJuegoLocal() {
    mostrar("pantalla-local-final");
    // Ocultar revelación del impostor
    document.getElementById("impostorRevelado").classList.add("hidden");
}

function revelarImpostorLocal() {
    const impostor = configLocal.jugadores[configLocal.impostorIndex];
    document.getElementById("impostorReveladoTexto").textContent = impostor.nombre;
    document.getElementById("impostorRevelado").classList.remove("hidden");
}

function volveraJugarLocal() {
    // Regenerar palabra
    configLocal.palabraActual = generarPalabra(configLocal.categoria);
    
    // Reasignar roles aleatorios
    asignarRolesLocales();
    
    // Reiniciar jugador actual
    configLocal.jugadorActual = 0;
    
    // Ocultar revelación
    document.getElementById("impostorRevelado").classList.add("hidden");
    
    // Mostrar primer jugador
    mostrarJugadorLocal();
}

function volverConfiguracionLocal() {
    // Guardar configuración actual con nombres
    configGuardada = {
        maxJugadores: configLocal.maxJugadores,
        impostores: configLocal.impostores,
        categoria: configLocal.categoria,
        jugadores: [...configLocal.jugadores] // Guardar nombres
    };
    
    // Restaurar valores guardados
    if (configGuardada) {
        document.getElementById("cantidadJugadoresLocal").value = configGuardada.maxJugadores;
        document.getElementById("categoriaLocal").value = configGuardada.categoria;
        
        // Actualizar opciones de impostores
        actualizarImpostoresLocal();
        
        // Establecer impostores guardados
        document.getElementById("cantidadImpostoresLocal").value = configGuardada.impostores;
        configLocal.impostores = configGuardada.impostores;
    }
    
    mostrar("pantalla-local-config");
}

/* ========== MODO MULTIJUGADOR ========== */
function continuarMultijugador() {
    const nombre = document.getElementById("nombreJugadorMultijugador").value.trim();
    
    if (!nombre) {
        alert("Debes ingresar un nombre");
        return;
    }
    
    if (nombre.length > 20) {
        alert("El nombre no puede tener más de 20 caracteres");
        return;
    }
    
    nombreJugador = nombre;
    mostrar("multijugador-elegir");
}

function mostrarCrearSala() {
    soyCreador = true;
    
    // Generar código de sala
    const codigo = generarCodigoSala();
    document.getElementById("codigoSalaCreador").textContent = codigo;
    salaActual = codigo;
    
    // Actualizar select de impostores
    actualizarImpostoresMultijugador();
    
    // Limpiar lista de jugadores
    document.getElementById("listaJugadoresLobby").innerHTML = "";
    document.getElementById("jugadoresActuales").textContent = "0";
    
    // Crear sala en servidor
    socket.emit("crearSala", {
        nombre: nombreJugador,
        codigo: codigo,
        maxJugadores: parseInt(document.getElementById("cantidadJugadoresMultijugador").value),
        impostores: parseInt(document.getElementById("cantidadImpostoresMultijugador").value),
        categoria: document.getElementById("categoriaMultijugador").value
    });
    
    mostrar("multijugador-crear");
}

function mostrarUnirseSala() {
    soyCreador = false;
    mostrar("multijugador-unirse");
}

function volverPrincipal() {
    if (salaActual) {
        socket.emit("abandonarSala", salaActual);
        salaActual = null;
    }
    mostrar("pantalla-principal");
}

function volverMultijugadorPrincipal() {
    if (salaActual) {
        socket.emit("abandonarSala", salaActual);
        salaActual = null;
    }
    mostrar("multijugador-nombre");
}

function volverElegirMultijugador() {
    if (salaActual) {
        socket.emit("abandonarSala", salaActual);
        salaActual = null;
    }
    mostrar("multijugador-elegir");
}

function generarCodigoSala() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 5; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

function actualizarImpostoresMultijugador() {
    const cantidadJugadores = parseInt(document.getElementById("cantidadJugadoresMultijugador").value);
    const selectImpostores = document.getElementById("cantidadImpostoresMultijugador");
    
    // Limpiar opciones
    selectImpostores.innerHTML = "";
    
    // Calcular máximo de impostores (1 por cada 3 jugadores)
    const maxImpostores = Math.floor(cantidadJugadores / 3);
    
    // Agregar opciones
    for (let i = 1; i <= maxImpostores; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectImpostores.appendChild(option);
    }
    
    // Establecer valor por defecto
    selectImpostores.value = Math.min(1, maxImpostores);
}

function unirseSala() {
    const codigo = document.getElementById("codigoSalaUnirse").value.trim().toUpperCase();
    
    if (!codigo) {
        alert("Ingresa el código de la sala");
        return;
    }
    
    if (codigo.length !== 5) {
        alert("El código debe tener 5 caracteres");
        return;
    }
    
    socket.emit("unirseSala", { 
        sala: codigo, 
        nombre: nombreJugador 
    });
}

function iniciarJuegoMultijugador() {
    console.log("Iniciando juego en sala:", salaActual);
    if (!salaActual) {
        alert("No hay sala activa");
        return;
    }
    
    // Deshabilitar botón momentáneamente para evitar múltiples clicks
    const btn = document.getElementById("btnIniciarJuego");
    btn.disabled = true;
    btn.textContent = "Iniciando...";
    
    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "🚀 Iniciar Juego";
    }, 2000);
    
    socket.emit("iniciarJuego", salaActual);
}

function verPalabraMultijugador() {
    console.log("Solicitando palabra para sala:", salaActual);
    if (!salaActual) return;
    socket.emit("verPalabra", salaActual);
}

function marcarListo() {
    if (!salaActual) return;
    
    // Solo marcar listo si todos aún no están listos
    if (!todosListos) {
        console.log("Marcando como listo en sala:", salaActual);
        socket.emit("marcarListo", salaActual);
        document.getElementById("btnListoMultijugador").disabled = true;
        document.getElementById("btnListoMultijugador").textContent = "✅ Listo";
    }
}

function votarImpostor() {
    if (!salaActual) return;
    console.log("Votando impostor en sala:", salaActual);
    socket.emit("votarImpostor", salaActual);
}

function volveraJugarMultijugador() {
    if (!salaActual) return;
    console.log("Volviendo a jugar en sala:", salaActual);
    socket.emit("volverAJugar", salaActual);
}

function volverConfiguracionMultijugador() {
    if (!salaActual) return;
    console.log("Volviendo a configuración en sala:", salaActual);
    socket.emit("volverConfiguracion", salaActual);
}

/* ---------------- SALIR / CONFIRM ---------------- */
function confirmarSalirSala() {
    document.getElementById("confirmModal").classList.remove("hidden");
}

function confirmSalir(ok) {
    document.getElementById("confirmModal").classList.add("hidden");
    
    if (ok) {
        if (salaActual) {
            socket.emit("abandonarSala", salaActual);
            salaActual = null;
        }
        mostrar("pantalla-principal");
    }
}

/* ------------------- SOCKET EVENTS ------------------- */
socket.on("connect", () => {
    console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
});

socket.on("salaCreada", (data) => {
    console.log("Sala creada:", data.sala);
    miPosicion = 1; // Creador es jugador 1
    actualizarLobbyCreador(data);
});

socket.on("salaUnida", (data) => {
    console.log("Unido a sala:", data.sala);
    salaActual = data.sala;
    soyCreador = false;
    
    // Encontrar mi posición
    const miJugador = data.jugadores.find(j => j.nombre === nombreJugador);
    if (miJugador) {
        miPosicion = miJugador.posicion;
    }
    
    actualizarLobbyUnido(data);
});

socket.on("errorUnirse", (msg) => {
    alert("Error: " + msg);
});

socket.on("error", (msg) => {
    alert("Error: " + msg);
    // Rehabilitar botón de iniciar si hay error
    document.getElementById("btnIniciarJuego").disabled = false;
    document.getElementById("btnIniciarJuego").textContent = "🚀 Iniciar Juego";
});

socket.on("jugadoresActualizados", (data) => {
    console.log("Jugadores actualizados en sala:", data.sala);
    if (soyCreador) {
        actualizarLobbyCreador(data);
    } else {
        actualizarLobbyUnido(data);
    }
});

socket.on("configuracionModificada", (data) => {
    if (soyCreador) {
        // Actualizar selects con la nueva configuración
        document.getElementById("cantidadJugadoresMultijugador").value = data.maxJugadores;
        document.getElementById("categoriaMultijugador").value = data.categoria;
        
        // Actualizar impostores
        actualizarImpostoresMultijugador();
        document.getElementById("cantidadImpostoresMultijugador").value = data.impostores;
        
        // Actualizar display
        document.getElementById("maxJugadoresDisplay").textContent = data.maxJugadores;
    }
});

socket.on("irPantallaVerPalabra", (data) => {
    console.log("Yendo a pantalla de ver palabra en sala:", data.sala);
    categoriaActual = data.categoria;
    salaActual = data.sala;
    
    // Actualizar elementos de la pantalla de VER
    document.getElementById("tituloJugadorMultijugadorVer").textContent = `ID de la sala: ${salaActual}`;
    document.getElementById("nombreJugadorMultijugadorVer").textContent = nombreJugador;
    document.getElementById("categoriaJugadorMultijugadorVer").textContent = categoriaActual;
    document.getElementById("impostoresJugadorMultijugadorVer").textContent = data.impostores;
    document.getElementById("totalJugadoresMultijugadorVer").textContent = data.totalJugadores;
    
    // Resetear botón de ver
    document.getElementById("btnVerPalabraMultijugador").disabled = false;
    document.getElementById("btnVerPalabraMultijugador").textContent = "👁️ Ver";
    
    mostrar("multijugador-ver-palabra");
});

socket.on("resultadoPalabra", (data) => {
    console.log("Recibiendo palabra para jugador", miPosicion);
    miRol = data.rol;
    todosListos = false;
    
    // Actualizar elementos de la pantalla de PALABRA REVELADA
    document.getElementById("tituloJugadorMultijugadorRevelado").textContent = `ID de la sala: ${salaActual}`;
    document.getElementById("nombreJugadorMultijugadorRevelado").textContent = nombreJugador;
    document.getElementById("categoriaJugadorMultijugadorRevelado").textContent = categoriaActual;
    document.getElementById("impostoresJugadorMultijugadorRevelado").textContent = data.impostores;
    document.getElementById("totalJugadoresMultijugadorRevelado").textContent = data.totalJugadores;
    
    const palabraElem = document.getElementById("textoPalabraRevelada");
    
    if (data.rol === "IMPOSTOR") {
        palabraElem.textContent = "IMPOSTOR";
        palabraElem.className = "palabra-display palabra-impostor";
    } else {
        palabraElem.textContent = data.palabra;
        palabraElem.className = "palabra-display palabra-inocente";
    }
    
    // Resetear botón de listo
    document.getElementById("btnListoMultijugador").disabled = false;
    document.getElementById("btnListoMultijugador").textContent = "✅ Listo";
    document.getElementById("btnListoMultijugador").style.display = "block";
    
    mostrar("multijugador-palabra-revelada");
});

socket.on("todosListos", (data) => {
    console.log("Estado de listos:", data);
    
    todosListos = data.todosListos;
    
    if (data.todosListos) {
        console.log("TODOS están listos en sala:", salaActual);
        // Mostrar pantalla final
        mostrar("multijugador-final");
        document.getElementById("codigoTextoFinal").textContent = salaActual;
        
        // Mostrar opciones del creador si es creador
        if (soyCreador) {
            document.getElementById("opcionesCreador").style.display = "block";
        } else {
            document.getElementById("opcionesCreador").style.display = "none";
        }
        
        // Ocultar revelación del impostor
        document.getElementById("impostorReveladoMultijugador").classList.add("hidden");
        
        // Mostrar botón de impostor para todos
        document.getElementById("btnVotarImpostor").style.display = "block";
        document.getElementById("btnVotarImpostor").disabled = false;
        document.getElementById("btnVotarImpostor").textContent = "🔍 Impostor";
    }
});

socket.on("impostorRevelado", (data) => {
    console.log("Impostor revelado:", data.impostores);
    const impostoresTexto = data.impostores.map(i => `Jugador ${i.posicion}: ${i.nombre}`).join(", ");
    document.getElementById("impostorReveladoTextoMultijugador").textContent = impostoresTexto;
    
    // Actualizar título según cantidad de impostores
    if (data.impostores.length > 1) {
        document.getElementById("impostorTituloMultijugador").textContent = "👤 Los impostores son:";
    } else {
        document.getElementById("impostorTituloMultijugador").textContent = "👤 El impostor es:";
    }
    
    document.getElementById("impostorReveladoMultijugador").classList.remove("hidden");
    // Ocultar botón de votar después de revelar
    document.getElementById("btnVotarImpostor").style.display = "none";
});

socket.on("juegoReiniciado", () => {
    console.log("Juego reiniciado en sala:", salaActual);
    // Ya no necesitamos hacer nada aquí, el servidor enviará irPantallaVerPalabra
});

socket.on("volverConfiguracionSala", () => {
    console.log("Volviendo a configuración de sala:", salaActual);
    // Volver a la configuración inicial
    if (soyCreador) {
        mostrar("multijugador-crear");
    } else {
        mostrar("multijugador-sala-unido");
    }
});

socket.on("salaEliminada", () => {
    alert("El creador ha abandonado la sala. Todos serán desconectados.");
    salaActual = null;
    mostrar("pantalla-principal");
});

/* ---------------- FUNCIONES AUXILIARES MULTIJUGADOR ---------------- */
function actualizarLobbyCreador(data) {
    console.log("Actualizando lobby creador para sala:", data.sala);
    document.getElementById("codigoSalaCreador").textContent = data.sala;
    document.getElementById("jugadoresActuales").textContent = data.jugadores.length;
    document.getElementById("maxJugadoresDisplay").textContent = data.maxJugadores;
    
    // Actualizar lista de jugadores
    const lista = document.getElementById("listaJugadoresLobby");
    lista.innerHTML = "";
    
    data.jugadores.forEach((jugador) => {
        const div = document.createElement("div");
        div.className = "jugador-lista";
        div.textContent = `Jugador ${jugador.posicion}: ${jugador.nombre}` + (jugador.id === data.creador ? " 👑" : "");
        lista.appendChild(div);
    });
    
    // Habilitar/deshabilitar botón de iniciar
    const btnIniciar = document.getElementById("btnIniciarJuego");
    const puedeIniciar = data.jugadores.length === data.maxJugadores;
    btnIniciar.disabled = !puedeIniciar;
    
    console.log(`Puede iniciar: ${puedeIniciar} (${data.jugadores.length}/${data.maxJugadores} jugadores)`);
}

function actualizarLobbyUnido(data) {
    console.log("Actualizando lobby unido para sala:", data.sala);
    document.getElementById("codigoSalaUnido").textContent = data.sala;
    document.getElementById("jugadoresActualesUnido").textContent = data.jugadores.length;
    document.getElementById("maxJugadoresDisplayUnido").textContent = data.maxJugadores;
    
    // Actualizar configuración
    const configResumen = document.getElementById("configResumen");
    configResumen.innerHTML = `
        <div>Jugadores: ${data.jugadores.length} / ${data.maxJugadores}</div>
        <div>Impostores: ${data.impostores}</div>
        <div>Categoría: ${data.categoria}</div>
    `;
    
    // Actualizar lista de jugadores
    const lista = document.getElementById("listaJugadoresUnido");
    lista.innerHTML = "";
    
    data.jugadores.forEach((jugador) => {
        const div = document.createElement("div");
        div.className = "jugador-lista";
        div.textContent = `Jugador ${jugador.posicion}: ${jugador.nombre}` + (jugador.id === data.creador ? " 👑" : "");
        lista.appendChild(div);
    });
    
    mostrar("multijugador-sala-unido");
}

/* ---------------- INICIALIZACIÓN ---------------- */
document.addEventListener("DOMContentLoaded", () => {
    // Event listeners para modo local
    document.getElementById("cantidadJugadoresLocal")?.addEventListener("change", actualizarImpostoresLocal);
    document.getElementById("cantidadImpostoresLocal")?.addEventListener("change", function() {
        configLocal.impostores = parseInt(this.value);
    });
    
    // Event listeners para modo multijugador
    document.getElementById("cantidadJugadoresMultijugador")?.addEventListener("change", function() {
        actualizarImpostoresMultijugador();
        if (salaActual && soyCreador) {
            // Enviar nueva configuración al servidor
            socket.emit("modificarConfiguracion", {
                sala: salaActual,
                maxJugadores: parseInt(this.value),
                impostores: parseInt(document.getElementById("cantidadImpostoresMultijugador").value),
                categoria: document.getElementById("categoriaMultijugador").value
            });
        }
    });
    
    document.getElementById("cantidadImpostoresMultijugador")?.addEventListener("change", function() {
        if (salaActual && soyCreador) {
            socket.emit("modificarConfiguracion", {
                sala: salaActual,
                maxJugadores: parseInt(document.getElementById("cantidadJugadoresMultijugador").value),
                impostores: parseInt(this.value),
                categoria: document.getElementById("categoriaMultijugador").value
            });
        }
    });
    
    document.getElementById("categoriaMultijugador")?.addEventListener("change", function() {
        if (salaActual && soyCreador) {
            socket.emit("modificarConfiguracion", {
                sala: salaActual,
                maxJugadores: parseInt(document.getElementById("cantidadJugadoresMultijugador").value),
                impostores: parseInt(document.getElementById("cantidadImpostoresMultijugador").value),
                categoria: this.value
            });
        }
    });
    
    // Inicializar selects
    actualizarImpostoresLocal();
    actualizarImpostoresMultijugador();
    
    // Permitir Enter en inputs
    document.getElementById("nombreJugadorMultijugador")?.addEventListener("keypress", function(e) {
        if (e.key === "Enter") continuarMultijugador();
    });
    
    document.getElementById("codigoSalaUnirse")?.addEventListener("keypress", function(e) {
        if (e.key === "Enter") unirseSala();
    });
});
