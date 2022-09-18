class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let catalogo = [
    new Producto(1,"Leche",399,50),
    new Producto(2,"Huevos",10.99,1000),
    new Producto(3,"Yerba",600,50),
    new Producto(4,"Galletitas",299,50),
    new Producto(5,"Café",799,30)
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