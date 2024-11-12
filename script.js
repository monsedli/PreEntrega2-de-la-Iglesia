// Variables
let nombreCliente = prompt("Ingresa tu nombre:");
let ramos = []; // Array para almacenar todos los ramos creados

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
    12: { nombre: "Follaje", precio: 100 }
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

// Función para mostrar la lista de flores con sus precios
function mostrarListaFlores() {
    return Object.keys(preciosFlores)
        .map(numero => `${numero} - ${preciosFlores[numero].nombre} ($${preciosFlores[numero].precio})`)
        .join("\n");
}

// Función para seleccionar los tipos de flores para el ramo
function seleccionarFlores(tamaño) {
    let maxTipos = maxFloresPorTamaño[tamaño];
    let listaFlores = mostrarListaFlores();
    let mensaje = `Elige hasta ${maxTipos} tipos de flores para tu ramo ${tamaño}. Escribe los números de las flores separados por comas.\n\n${listaFlores}`;
    
    // Capturar la entrada del usuario y procesarla
    let seleccion = prompt(mensaje);
    let indicesFlores = seleccion.split(",").map(num => num.trim());
    
    // Validar que no haya más tipos de flores de los permitidos
    if (indicesFlores.length > maxTipos) {
        alert(`Has seleccionado más de ${maxTipos} tipos de flores. Intenta nuevamente.`);
        return seleccionarFlores(tamaño); // Reiniciar si se excede el límite
    }
    
    // Validar y seleccionar las flores
    let floresSeleccionadas = [];
    for (let i = 0; i < indicesFlores.length; i++) {
        let indice = indicesFlores[i];
        
        // Verificar si el índice es válido
        if (preciosFlores[indice]) {
            floresSeleccionadas.push(preciosFlores[indice].nombre);
        } else {
            alert("Algún número de flor no es válido. Intenta nuevamente.");
            return seleccionarFlores(tamaño); // Reiniciar si hay un error en los números ingresados
        }
    }
    
    return floresSeleccionadas;
}

// Función para calcular el total del ramo
function calcularTotalRamo(ramo) {
    let total = preciosRamo[ramo.tamaño];
    ramo.flores.forEach(flor => {
        let precioFlor = Object.values(preciosFlores).find(f => f.nombre === flor).precio;
        total += precioFlor;
    });
    return total;
}

// Ciclo para armar múltiples ramos
let seguirArmando = true;
while (seguirArmando) {
    // Selección del tamaño del ramo con precios visibles
    let tamañoOpcion = prompt("¿Qué tamaño de ramo deseas? Indica el número seleccionado.\n\n1 - Petit $200\n2 - Medio $400\n3 - Grand $600");
    
    // Convertir la selección numérica en el nombre del tamaño
    let tamañoRamo;
    if (tamañoOpcion === "1") {
        tamañoRamo = "petit";
    } else if (tamañoOpcion === "2") {
        tamañoRamo = "medio";
    } else if (tamañoOpcion === "3") {
        tamañoRamo = "grand";
    } else {
        alert("Opción no válida. Intenta nuevamente.");
        continue; // Volver a preguntar si la opción es inválida
    }

    // Selección de las flores para el ramo
    let floresSeleccionadas = seleccionarFlores(tamañoRamo);

    // Crear objeto para el ramo actual
    const ramo = {
        cliente: nombreCliente,
        tamaño: tamañoRamo,
        flores: floresSeleccionadas,
        calcularTotal: function () {
            return calcularTotalRamo(this);
        }
    };

    // Formatear la lista de flores seleccionadas para que la última flor esté separada por "y"
function formatearFlores(flores) {
    if (flores.length === 1) return flores[0];
    return `${flores.slice(0, -1).join(", ")} y ${flores[flores.length - 1]}`;
}

// Agregar el ramo al arreglo de ramos y mostrar el total del ramo
ramos.push(ramo);
let totalRamo = ramo.calcularTotal();
let floresFormateadas = formatearFlores(floresSeleccionadas);
alert(`Has creado un ramo ${tamañoRamo} con las flores: ${floresFormateadas}.\nEl total es: $${totalRamo}`);
console.log(`Ramo creado para ${nombreCliente} - Tamaño: ${tamañoRamo}, Flores: ${floresFormateadas}, Total: $${totalRamo}`);

// Preguntar si quiere armar otro ramo con validación de respuesta
let seguirArmando;
do {
    let respuesta = prompt("¿Quieres armar otro ramo? (si/no)").toLowerCase();
    if (respuesta === "si") {
        seguirArmando = true;
    } else if (respuesta === "no") {
        seguirArmando = false;
    } else {
        alert("Por favor, responde con 'si' o 'no'.");
        seguirArmando = undefined; // Resetear para mantener el bucle si la respuesta es inválida
    }
} while (seguirArmando === undefined);


// Mostrar el resumen de todos los ramos creados
let resumenCarrito = "Resumen de tu selección:\n\n";
let totalAcumulado = 0;

ramos.forEach((ramo, index) => {
    let precioRamo = ramo.calcularTotal();
    totalAcumulado += precioRamo;
    resumenCarrito += `Ramo ${index + 1} - Tamaño: ${ramo.tamaño}\nFlores: ${ramo.flores.join(", ")}\nPrecio: $${precioRamo}\n\n`;
});

resumenCarrito += `Total acumulado: $${totalAcumulado}`;

alert(`Gracias por tu selección, ${nombreCliente}!\n\n${resumenCarrito}`);
console.log("Resumen de todos los ramos:", ramos);
console.log(`Total acumulado: $${totalAcumulado}`);

// Confirmación de compra con validación de respuesta
let confirmarCompra;
do {
    confirmarCompra = prompt("¿Deseas proceder con la compra? (si/no)").toLowerCase();
    if (confirmarCompra !== "si" && confirmarCompra !== "no") {
        alert("Por favor, responde con 'si' o 'no'.");
    }
} while (confirmarCompra !== "si" && confirmarCompra !== "no");

if (confirmarCompra === "si") {
    alert(`¡Compra confirmada! El total a pagar es: $${totalAcumulado}`);
    console.log("Compra confirmada. Total:", totalAcumulado);
} else {
    alert("Has decidido no proceder con la compra. Gracias por tu visita.");
    console.log("Compra cancelada por el usuario.");
}
}
