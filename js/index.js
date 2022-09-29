class Product {
    constructor(id, title, price, stock) {
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
        this.quantity = 1
    }
}
const market = []
const storageCart = window.localStorage.getItem('myCart')
const jsonCart = JSON.parse(storageCart)
const myCart = jsonCart || []
market.push(new Product(1, "Yerba", 180, 17))
market.push(new Product(2, "Leche", 111, 25))
market.push(new Product(3, "Bizcochos", 80, 21))
market.push(new Product(4, "Huevos", 13, 97))
market.push(new Product(5, "Harina", 90, 17))
market.push(new Product(6, "Queso", 190, 33))
market.push(new Product(7, "Salame", 220, 9))
market.push(new Product(8, "Pan", 115, 12))
market.push(new Product(9, "Coca-Cola", 360, 36))

const productsContainer = document.getElementById("productsContainer")

const htmlProducts = market.map(product => productToHTMLConverter(product, true))

htmlProducts.forEach(product => productsContainer.appendChild(product))

refreshCart()


function productToHTMLConverter(product) {
    const { id, title, price, stock } = product
    const card = document.createElement("div")
    const productTitle = document.createElement("h3")
    productTitle.textContent = title
    card.appendChild(productTitle)
    const productPrice = document.createElement("p")
    productPrice.textContent = `Precio: ${price}`
    card.appendChild(productPrice)
    const addButton = document.createElement("button")
    addButton.textContent = "Agregar"
    addButton.addEventListener('click', () => addProductToCart(id))
    card.appendChild(addButton)
    card.setAttribute('class', 'productCard')
    return card
}


function cartToHTMLConverter(cart) {
    return cart.map(product => {
        const { id, title, price, quantity } = product
        const card = document.createElement("div")
        const productTitle = document.createElement("h3")
        productTitle.textContent = title
        card.appendChild(productTitle)
        const productQuantity = document.createElement("p")
        productQuantity.textContent = `Cantidad: ${quantity}`
        card.appendChild(productQuantity)
        const subTotal = document.createElement("p")
        subTotal.textContent = `Subtotal: ${price * quantity}`
        card.appendChild(subTotal)
        card.setAttribute('class', 'productCard')
        return card
    })
}

function addProductToCart(productId) {
    const product = market.find(product => product.id === productId)
    if (product) {
        const productExists = myCart.find(prod => prod.id === product.id)
        if (productExists) {
            productExists.quantity++
        }
        else myCart.push(product)
        refreshCart()
    }
}

function refreshCart() {
    const jsonString = JSON.stringify(myCart)
    window.localStorage.setItem('myCart', jsonString)
    const htmlCart = cartToHTMLConverter(myCart)
    const myCartContainer = document.getElementById("cartContainer")
    const cartTitle = document.createElement("h3")
    const total = myCart.reduce((total, product) => total + (product.price * product.quantity), 0)
    const htmlTotal = document.createElement("h2")

    myCartContainer.innerHTML = ""
    cartTitle.textContent = "Mi Carrito"
    htmlTotal.textContent = `Total: ${total}`

    myCartContainer.appendChild(cartTitle)
    htmlCart.forEach(product => myCartContainer.appendChild(product))
    myCartContainer.appendChild(htmlTotal)
}