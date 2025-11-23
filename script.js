/* ============================
   VARIABLES GLOBALES
============================ */

let jugadores = [];
let categoriaSeleccionada = "";
let cantidadImpostores = 1;
let palabraElegida = "";
let impostores = [];
let indiceJugadorActual = 0;

/* Guardado de configuración */
let ultimaConfig = {
    cantidadJugadores: 4,
    nombres: [],
    categoria: "",
    cantidadImpostores: 1
};

/* ============================
   LISTAS DE PALABRAS
============================ */

const palabras = {
    objetos: [
        "Linterna","Paraguas","Llaves","Mesa","Silla","Bolígrafo","Cuaderno","Teléfono","Reloj",
        "Cartera","Gafas","Botella","Cepillo","Pasta","Zapatos","Calcetines","Camisa","Pantalón",
        "Bufanda","Guantes","Libro","Vaso","Plato","Tenedor","Cuchara","Ventana","Puerta","Cama",
        "Almohada","Manta","Cortina","Espejo","Toalla","Jabón","Champú","Tijeras","Pegamento",
        "Cinta","Batería","Cable","Ratón","Teclado","Monitor","Impresora","Altavoz","Cámara",
        "Marco","Pintura","Florero","Alfombra","Bandeja","Cenicero","Pipa","Mechero","Fósforos",
        "Cuchillo","Olla","Sartén","Espátula","Batidora","Tostadora","Microondas","Nevera",
        "Horno","Lavadora","Secadora","Aspiradora","Escoba","Recogedor","Cubo","Trapeador",
        "Percha","Tornillo","Tuerca","Clavo","Martillo","Destornillador","Sierra","Lima","Lija",
        "Candado","Cadena","Cuerda","Tiza","Pizarra","Globo","Burbuja","Cometa","Tambor",
        "Guitarra","Flauta","Piano","Micrófono","Auriculares","Disco","Billete","Moneda",
        "Tarjeta","Ticket","Sello","Poste","Farola","Buzón","Papelera","Semáforo","Rueda","Motor",
        "Freno","Volante","Retrovisor","Asiento","Maletero","Capó","Parabrisas","Gasolina",
        "Aceite","Refrigerante","Antena","Radio","Mapa","Brújula","Binoculares","Telescopio",
        "Microscopio","Termómetro","Barómetro","Higrómetro","Calculadora","Regla","Compás",
        "Transportador","Clips","Grapadora","Taladradora","Perforadora","Archivador","Calendario",
        "Agenda","Póster","Mural","Estante","Cajón","Sótano","Ático","Terraza","Balcón","Jardín",
        "Piscina","Columpio","Tobogán","Fuente","Estatua","Piedra","Arena","Grava","Barro","Agua",
        "Hielo","Vapor","Fuego","Ceniza","Humo","Nube","Estrella","Luna","Sol","Rayo","Trueno",
        "Viento","Ola","Río","Lago","Mar","Montaña","Valle","Bosque","Árbol","Hoja","Raíz"
    ],

    animales: [
        "Perro","Gato","Vaca","Cerdo","Oveja","Cabra","Conejo","Ratón","Rata","Topo","Mula",
        "Lobo","Zorro","Oso","Ciervo","Tigre","León","Jirafa","Cebra","Burro","Alce","Búfalo",
        "Puma","Nutria","Mofeta","Panda","Chimpancé","Gorila","Delfín","Foca","Mapache","Hurón",
        "Llama","Zarigüeya","Armadillo","Hiena","Caimán","Rana","Sapo","Ganso","Pato","Pavo",
        "Gallina","Gallo","Paloma","Cuervo","Urraca","Águila","Búho","Loro","Cisne","Garza",
        "Golondrina","Pelícano","Halcón","Jilguero","Lince","Gavilán","Avestruz","Flamenco",
        "Correcaminos","Serpiente","Lagarto","Iguana","Tortuga","Gecko","Tritón","Pez","Trucha",
        "Carpa","Salmón","Anguila","Dorado","Atún","Tiburón","Raya","Avispa","Hormiga","Mosca",
        "Abeja","Araña","Grillo","Garrapata","Pulga","Termita","Cucaracha","Ciempiés","Caracol",
        "Ostra","Pulpo","Medusa","Gusano","Almeja","Mantis","Bisonte","Bóvido"
    ],

    futbolistas: [
        "Messi","Ronaldo","Neymar","Mbappé","Haaland","Benzema","Lewandowski","Modrić",
        "Casemiro","Suárez","Dybala","Kroos","Agüero","Salah","Mané"
    ],

    paises: [
        "Colombia","Argentina","Brasil","Chile","Perú","México","España","Francia","Alemania",
        "Italia","Portugal","Japón","China","Canadá","Estados Unidos","Venezuela","Ecuador",
        "Bolivia","Uruguay","Paraguay","Holanda","Suecia","Noruega","Finlandia","Rusia"
    ],

    cantantes: [
        "Shakira","Bad Bunny","Karol G","Maluma","Daddy Yankee","Ozuna","Ariana Grande","Dua Lipa",
        "Ed Sheeran","The Weeknd","Beyoncé","Rihanna","Justin Bieber","Selena Gomez","Bruno Mars",
        "Jennifer Lopez","Feid","Anuel","Rosalía","Camilo","Luis Fonsi","Camila Cabello","Taylor Swift"
    ]
};

/* ============================
   UTILIDAD PARA OCULTAR TODO
============================ */

function ocultarTodasLasPantallas() {
    document.querySelectorAll(".screen")
        .forEach((c) => c.classList.add("hidden"));
}

/* ============================
   NAVEGACIÓN
============================ */

function mostrarPantalla(tipo) {
    ocultarTodasLasPantallas();
    if (tipo === "local") {
        document.getElementById("pantalla-local").classList.remove("hidden");
    } else if (tipo === "multijugador") {
        document.getElementById("pantalla-multijugador").classList.remove("hidden");
    } else {
        document.getElementById("pantalla-principal").classList.remove("hidden");
    }
}

function volverPrincipal() {
    ocultarTodasLasPantallas();
    document.getElementById("pantalla-principal").classList.remove("hidden");
}

function volverLocal() {
    ocultarTodasLasPantallas();
    document.getElementById("pantalla-local").classList.remove("hidden");
}

function volverNombres() {
    ocultarTodasLasPantallas();
    document.getElementById("pantalla-nombres").classList.remove("hidden");
}

function volverCategoria() {
    ocultarTodasLasPantallas();
    document.getElementById("pantalla-categorias").classList.remove("hidden");
}

/* ============================
   CONFIGURACIÓN
============================ */

function irConfiguracionSala() {
    ocultarTodasLasPantallas();
    document.getElementById("cantidadJugadores").value = ultimaConfig.cantidadJugadores;
    document.getElementById("pantalla-local").classList.remove("hidden");
}

function irNombres() {
    const cantidad = parseInt(document.getElementById("cantidadJugadores").value);

    if (cantidad < 3 || cantidad > 30) {
        alert("La cantidad de jugadores debe estar entre 3 y 30.");
        return;
    }

    ultimaConfig.cantidadJugadores = cantidad;

    const contenedor = document.getElementById("contenedorNombres");
    contenedor.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "input-jugador";
        input.placeholder = `Jugador ${i + 1}`;

        if (ultimaConfig.nombres[i]) {
            input.value = ultimaConfig.nombres[i];
        }

        contenedor.appendChild(input);
    }

    ocultarTodasLasPantallas();
    document.getElementById("pantalla-nombres").classList.remove("hidden");
}

function irCategoria() {
    jugadores = [];
    let nuevosNombres = [];

    document.querySelectorAll(".input-jugador").forEach((input, i) => {
        const nombre = input.value.trim() || `Jugador ${i + 1}`;
        jugadores.push(nombre);
        nuevosNombres.push(nombre);
    });

    ultimaConfig.nombres = nuevosNombres;

    ocultarTodasLasPantallas();
    document.getElementById("pantalla-categorias").classList.remove("hidden");
}

/* ============================
   CATEGORÍAS
============================ */

function seleccionarCategoria(categoria, elemento) {
    categoriaSeleccionada = categoria;
    ultimaConfig.categoria = categoria;

    document.querySelectorAll(".categoria")
        .forEach(c => c.classList.remove("seleccionada"));

    elemento.classList.add("seleccionada");
    document.getElementById("btnCategoria").disabled = false;
}

/* ============================
   IMPOSITORES
============================ */

function irImpostores() {
    if (!categoriaSeleccionada) {
        alert("Selecciona una categoría.");
        return;
    }

    ocultarTodasLasPantallas();

    const max = Math.max(1, Math.floor(jugadores.length / 3));
    document.getElementById("maxImpostores").textContent = max;
    document.getElementById("cantidadImpostores").max = max;

    document.getElementById("cantidadImpostores").value =
        ultimaConfig.cantidadImpostores || 1;

    document.getElementById("pantalla-impostores").classList.remove("hidden");
}

function iniciarJuego() {
    cantidadImpostores =
        parseInt(document.getElementById("cantidadImpostores").value) || 1;

    const max = Math.max(1, Math.floor(jugadores.length / 3));

    if (cantidadImpostores < 1 || cantidadImpostores > max) {
        alert(`La cantidad de impostores debe estar entre 1 y ${max}.`);
        return;
    }

    ultimaConfig.cantidadImpostores = cantidadImpostores;

    // Elegir palabra (asegurar que exista la categoria)
    const lista = palabras[categoriaSeleccionada];
    if (!lista || lista.length === 0) {
        alert("Error: la categoría seleccionada no tiene palabras disponibles.");
        return;
    }

    palabraElegida = lista[Math.floor(Math.random() * lista.length)];

    // Elegir impostores aleatorios
    impostores = [];
    let temp = [...jugadores];

    for (let i = 0; i < cantidadImpostores; i++) {
        const pos = Math.floor(Math.random() * temp.length);
        impostores.push(temp[pos]);
        temp.splice(pos, 1);
    }

    indiceJugadorActual = 0;

    mostrarPantallaVer();
}

/* ============================
   MOSTRAR PALABRAS
============================ */

function mostrarPantallaVer() {
    ocultarTodasLasPantallas();

    document.getElementById("tituloJugador").textContent =
        `Turno de: ${jugadores[indiceJugadorActual]}`;

    document.getElementById("pantalla-ver").classList.remove("hidden");
}

function mostrarPalabra() {
    ocultarTodasLasPantallas();

    const jugador = jugadores[indiceJugadorActual];
    const texto = document.getElementById("textoPalabra");

    if (impostores.includes(jugador)) {
        texto.textContent = "IMPOSTOR";
        texto.className = "impostor";
    } else {
        texto.textContent = palabraElegida;
        texto.className = "";
    }

    document.getElementById("pantalla-palabra").classList.remove("hidden");
}

function siguienteJugador() {
    indiceJugadorActual++;

    if (indiceJugadorActual < jugadores.length) {
        mostrarPantallaVer();
    } else {
        ocultarTodasLasPantallas();
        document.getElementById("pantalla-jugar").classList.remove("hidden");
    }
}

/* ============================
   RONDA
============================ */

function mostrarRonda() {
    ocultarTodasLasPantallas();
    document.getElementById("pantalla-ronda").classList.remove("hidden");
}

function revelarImpostor() {
    ocultarTodasLasPantallas();

    const texto = document.getElementById("nombreImpostor");

    if (impostores.length === 1) {
        texto.textContent = `El impostor es: ${impostores[0]}`;
    } else {
        texto.textContent = `Los impostores son: ${impostores.join(", ")}`;
    }

    texto.className = "impostor";

    document.getElementById("pantalla-impostor").classList.remove("hidden");
}

/* ============================
   VOLVER A JUGAR
============================ */

function volverAJugar() {
    // reiniciar flujo desde impostores con misma config
    iniciarJuego();
}
