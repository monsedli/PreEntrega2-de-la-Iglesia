// Variables
let nombreCliente = prompt("Ingresa tu nombre:")
let ramos = [] // Array para almacenar todos los ramos creados

// Precios de los tipos de flores
const preciosFlores = {
    1: { nombre: "Rosa", precio: 200 },
    2: { nombre: "Anturio", precio: 150 },
    3: { nombre: "Clavel", precio: 100 },
    4: { nombre: "Clavelina", precio: 180 },
    5: { nombre: "Felpillas", precio: 300 },
    6: { nombre: "Gerbera", precio: 200 },
    7: { nombre: "Celosía", precio: 150 },
    8: { nombre: "Dalia", precio: 200 },
    9: { nombre: "Crisantemo", precio: 300 },
    10: { nombre: "Moluchela", precio: 250 },
    11: { nombre: "Astromelia", precio: 150 },
    12: { nombre: "Lirio", precio: 300 },
    13: { nombre: "Peonía", precio: 400 },
    14: { nombre: "Hortensia", precio: 350 },
    15: { nombre: "Orquídea", precio: 100 },
    16: { nombre: "Fresia", precio: 200 },
    17: { nombre: "Magnolia", precio: 350 },
    18: { nombre: "Gardenia", precio: 200 },
    19: { nombre: "Lavanda", precio: 100 },
    20: { nombre: "Narciso", precio: 400 },
    21: { nombre: "Cala", precio: 400 },
    22: { nombre: "Follaje", precio: 100 }
};

// Precios base por tamaño de ramo
const preciosRamo = {
    petit: 200,
    medio: 400,
    grand: 600
};

// Cantidad máxima de tipos de flores por tamaño de ramo
const maxFloresPorTamaño = {
    petit: 3,
    medio: 4,
    grand: 5
};

// Función para buscar flor por nombre
function buscarFlorPorNombre(nombreFlor) {
    let flor = Object.values(preciosFlores).find(f => f.nombre.toLowerCase() === nombreFlor.toLowerCase());
    if (flor) {
        alert(`La flor ${flor.nombre} cuesta $${flor.precio}`);
    } else {
        alert("La flor ingresada no está en la lista.");
    }
}

let nombreFlor;
do {
    nombreFlor = prompt("¿Quieres consultar el precio de alguna flor en particular? Ingresa el nombre de la flor:");
    if (nombreFlor) {
        buscarFlorPorNombre(nombreFlor);
    } else {
        alert("Por favor ingresa un nombre válido.");
    }
} while (!Object.values(preciosFlores).some(f => f.nombre.toLowerCase() === nombreFlor.toLowerCase()) && nombreFlor);


// Filtrado de flores por precio máximo
let floresDisponibles;

function mostrarFloresPorPrecioMaximo(precioMaximo) {
    floresDisponibles = Object.values(preciosFlores).filter(f => f.precio <= precioMaximo);
    if (floresDisponibles.length > 0) {
        let listaFiltrada = floresDisponibles.map(f => `${f.nombre} ($${f.precio})`).join("\n");
        alert(`Flores disponibles por debajo de $${precioMaximo}:\n\n${listaFiltrada}`);
    } else {
        alert("No hay flores dentro de ese rango de precio.");
        floresDisponibles = Object.values(preciosFlores); // Restablecer a todas las flores si no hay ninguna en el rango
    }
}

// Solicitar el precio máximo para filtrar las flores
let precioMaximo;
do {
    precioMaximo = prompt("Ingresa el precio máximo para ver las flores disponibles:");

    // Validar que el precio ingresado sea un número
    if (precioMaximo && !isNaN(precioMaximo) && Number(precioMaximo) > 0) {
        mostrarFloresPorPrecioMaximo(Number(precioMaximo)); 
        break; // Si el precio es válido, salimos del ciclo
    } else {
        alert("Por favor ingresa un precio válido (un número positivo).");
    }
} while (true);


// Función para mostrar la lista de flores filtradas con sus precios
function mostrarListaFlores() {
    return floresDisponibles
        .map((flor, index) => `${index + 1} - ${flor.nombre} ($${flor.precio})`)
        .join("\n")
}

// Función para seleccionar los tipos de flores para el ramo
function seleccionarFlores(tamaño) {
    let maxTipos = maxFloresPorTamaño[tamaño]
    let listaFlores = mostrarListaFlores()
    let mensaje = `Elige hasta ${maxTipos} tipos de flores para tu ramo ${tamaño}. Escribe los números de las flores separados por comas.\n\n${listaFlores}`
    
    let seleccion = prompt(mensaje)
    let indicesFlores = seleccion.split(",").map(num => parseInt(num.trim()) - 1)
    
    if (indicesFlores.length > maxTipos) {
        alert(`Has seleccionado más de ${maxTipos} tipos de flores. Intenta nuevamente.`)
        return seleccionarFlores(tamaño)
    }
    
    let floresSeleccionadas = []
    for (let i = 0; i < indicesFlores.length; i++) {
        let indice = indicesFlores[i]
        
        if (floresDisponibles[indice]) {
            floresSeleccionadas.push(floresDisponibles[indice].nombre)
        } else {
            alert("Algún número de flor no es válido. Intenta nuevamente.")
            return seleccionarFlores(tamaño)
        }
    }
    
    return floresSeleccionadas
}

// Función para calcular el total del ramo
function calcularTotalRamo(ramo) {
    let total = preciosRamo[ramo.tamaño]
    ramo.flores.forEach(flor => {
        let precioFlor = preciosFlores[Object.keys(preciosFlores).find(key => preciosFlores[key].nombre === flor)].precio
        total += precioFlor
    })
    return total
}

// Ciclo para armar múltiples ramos
let seguirArmando = true
while (seguirArmando) {
    let tamañoOpcion = prompt("¿Qué tamaño de ramo deseas? Indica el número seleccionado.\n\n1 - Petit $200\n2 - Medio $400\n3 - Grand $600")
    
    let tamañoRamo;
    if (tamañoOpcion === "1") {
        tamañoRamo = "petit"
    } else if (tamañoOpcion === "2") {
        tamañoRamo = "medio"
    } else if (tamañoOpcion === "3") {
        tamañoRamo = "grand"
    } else {
        alert("Opción no válida. Intenta nuevamente.");
        continue; // Si la opción es inválida, continúa el ciclo sin hacer nada más
    }

    let floresSeleccionadas = seleccionarFlores(tamañoRamo)

    const ramo = {
        cliente: nombreCliente,
        tamaño: tamañoRamo,
        flores: floresSeleccionadas,
        calcularTotal: function () {
            return calcularTotalRamo(this)
        }
    };

    function formatearFlores(flores) {
        if (flores.length === 1) return flores[0]
        return `${flores.slice(0, -1).join(", ")} y ${flores[flores.length - 1]}`
    }

    ramos.push(ramo);
    let totalRamo = ramo.calcularTotal()
    let floresFormateadas = formatearFlores(floresSeleccionadas)
    alert(`Has creado un ramo ${tamañoRamo} con las flores: ${floresFormateadas}.\nEl total es: $${totalRamo}`)
    console.log(`Ramo creado para ${nombreCliente} - Tamaño: ${tamañoRamo}, Flores: ${floresFormateadas}, Total: $${totalRamo}`)

    // Preguntar si armar otro ramo
    do {
        let respuesta = prompt("¿Quieres armar otro ramo? (si/no)").toLowerCase()
        
        if (respuesta === "si") {
            seguirArmando = true  // Si responde "si", sigue armando ramos
        } else if (respuesta === "no") {
            seguirArmando = false // Si responde "no", termina el ciclo
        } else {
            alert("Por favor, responde con 'si' o 'no'.")
            seguirArmando = undefined  
        }
    } while (seguirArmando === undefined)
}


// Mostrar el resumen de todos los ramos creados
let resumenCarrito = "Resumen de tu selección:\n\n"
let totalAcumulado = 0

ramos.forEach((ramo, index) => {
    let precioRamo = ramo.calcularTotal()
    totalAcumulado += precioRamo
    resumenCarrito += `Ramo ${index + 1} - Tamaño: ${ramo.tamaño}\nFlores: ${ramo.flores.join(", ")}\nPrecio: $${precioRamo}\n\n`
})

resumenCarrito += `Total acumulado: $${totalAcumulado}`

alert(`Gracias por tu selección, ${nombreCliente}!\n\n${resumenCarrito}`)
console.log("Resumen de todos los ramos:", ramos)
console.log(`Total acumulado: $${totalAcumulado}`)

let confirmarCompra
do {
    confirmarCompra = prompt("¿Deseas proceder con la compra? (si/no)").toLowerCase()
    if (confirmarCompra !== "si" && confirmarCompra !== "no") {
        alert("Por favor, responde con 'si' o 'no'.")
    }
} while (confirmarCompra !== "si" && confirmarCompra !== "no")

if (confirmarCompra === "si") {
    alert(`¡Compra confirmada! El total a pagar es: $${totalAcumulado}`)
    console.log("Compra confirmada. Total:", totalAcumulado)
} else {
    alert("Compra cancelada. Esperamos que regreses pronto.")
    console.log("Compra cancelada.")
}

