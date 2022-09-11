let catalogo = [
    {
        id: 1,
        nombre: "Leche",
        precio: 399,
        stock: 50
    },
    {
        id: 2,
        nombre: "Huevos",
        precio: 10.99,
        stock: 1000
    },
    {
        id: 3,
        nombre: "Yerba",
        precio: 600,
        stock: 50
    },
    {
        id: 4,
        nombre: "Galletitas",
        precio: 299,
        stock: 50
    },
    {
        id: 5,
        nombre: "Café",
        precio: 799,
        stock: 30
    }
]

let stringCatalogo = catalogo.map(producto => `${producto.id} - ${producto.nombre} - Precio: $${producto.precio}\n`).join("")
let miCarrito = []
let continuar = true
while (continuar) {
    let miCompra = convertirCarrito()
    let stringPrompt = `Elija producto a comprar\n\n${stringCatalogo}\n0 - Terminar`
    if (miCompra) {
        stringPrompt = `${stringPrompt}\n\n${miCompra}`
    }
    let userInput = prompt(stringPrompt)
    userInput = parseInt(userInput)
    if (userInput === 0) continuar = false
    let productoSeleccionado = catalogo.find(producto => producto.id === userInput)
    if (productoSeleccionado) {
        miCarrito.push(productoSeleccionado)
    } else {
        console.log("No se encontro el producto seleccionado");
    }
}

let cuponInput
do {
    cuponInput = parseFloat(prompt("Ingrese % descuento"))
} while (isNaN(cuponInput))

alert(`${convertirCarrito()}\n\nTotal: ${calcularTotal()}`)

function convertirCarrito() {
    if (miCarrito.length === 0) return ""
    let stringCarrito = miCarrito.map(producto => `${producto.nombre} - $${producto.precio}\n`).join("")
    let subtotal = miCarrito.reduce((prev, curr) => prev + curr.precio, 0)
    return `${stringCarrito}\n\nSubtotal: ${subtotal}`
}

function calcularTotal() {
    let subtotal = miCarrito.reduce((prev, curr) => prev + curr.precio, 0)
    return subtotal * ((100 - cuponInput) / 100)
}