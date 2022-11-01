const ofertas = []
let myBag = []
const ofertasContainer = document.getElementById('ofertasCardsContainer')

ofertas.push(new Product(1, 'Frutillas del bosque', 300, 'frutillas'))
ofertas.push(new Product(2, 'Limones de las sierras', 170, 'limones'))
ofertas.push(new Product(3, 'Mangos del norte', 240, 'mangos'))
ofertas.push(new Product(4, 'Manzanas patagónicas', 145, 'manzanas'))
ofertas.push(new Product(5, 'Duraznos del rey', 195, 'duraznos'))
ofertas.push(new Product(6, 'Lechuga americana', 760, 'lechuga'))
ofertas.push(new Product(7, 'Arandanos del rey', 550, 'arandanos'))
ofertas.push(new Product(8, 'Kiwis patagónicos', 960, 'kiwis'))

insertOfertas()
getFromLocalStorage()
refreshBadge()

function productToHTMLCard() {
    return ofertas.map(product => {
        const { id, title, price, image } = product
        const card = document.createElement("div")
        const productImage = document.createElement("img")
        const cardText = document.createElement("div")
        const productTitle = document.createElement("p")
        const bottomDivision = document.createElement("div")
        const productPrice = document.createElement("p")
        const buyButton = document.createElement("button")

        productImage.src = `/images/ofertas/${image}.png`
        productTitle.textContent = title
        productPrice.textContent = `$${price} kg`
        buyButton.textContent = "Comprar"
        buyButton.addEventListener('click', () => addProductToCart(id))
        card.appendChild(productImage)
        card.appendChild(cardText)
        cardText.appendChild(productTitle)
        cardText.appendChild(bottomDivision)
        bottomDivision.appendChild(productPrice)
        bottomDivision.appendChild(buyButton)

        return card
    })
}

function insertOfertas() {
    productToHTMLCard().forEach(card => ofertasContainer.appendChild(card))
}

function addProductToCart(id) {
    const productToAdd = ofertas.find(product => product.id === id)
    Toastify({
        text: `Se agregó: ${productToAdd.title} a tu bolsa!`,
        duration: 1200
    }).showToast();
    const productAlreadyInBag = myBag.find(product => product.id === id)
    if (productAlreadyInBag) {
        productAlreadyInBag.quantity += 1
    } else {
        myBag.push(productToAdd)
    }
    saveInLocalStorage()
    refreshBadge()
}

function refreshBadge() {
    const badgeElement = document.getElementById('badge')
    const badge = myBag.length
    if (badge) {
        badgeElement.textContent = badge
        badgeElement.classList.add('displayBadge')
        badgeElement.classList.remove('hiddenBadge')
    } else {
        badgeElement.classList.add('hiddenBadge')
        badgeElement.classList.remove('displayBadge')
    }
}

function getFromLocalStorage() {
    const localStorageBag = JSON.parse(window.localStorage.getItem('myBag'))
    if (localStorageBag) myBag = localStorageBag
}

function saveInLocalStorage() {
    window.localStorage.setItem('myBag', JSON.stringify(myBag))
}




