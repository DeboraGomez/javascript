document.addEventListener('click', function hideBagIfClickOutside(event) {
    const myBag = document.getElementsByClassName('myBag')[0]
    const container = document.getElementById('myBagContainer')
    if (container.classList.contains('myBagContainer') && !myBag.contains(event.target)) {
        container.classList.add('myBagContainerHidden')
        container.classList.remove('myBagContainer')
    }
});



function openBag(event) {
    event.stopPropagation()
    window.scrollTo(0, 0)
    const strMyBag = window.localStorage.getItem('myBag')
    let myBag = []
    if (strMyBag) {
        myBag = JSON.parse(strMyBag)
    }

    if (myBag.length) {
        showBag()
        refreshView()
    } else {
        //toast empty bag
    }
}

function showBag() {
    const htmlBag = document.getElementById('myBagContainer')
    htmlBag.classList.add('myBagContainer')
    htmlBag.classList.remove('myBagContainerHidden')
}

function increase(id) {
    const product = myBag.find(p => p.id === id)
    product.quantity += 1
    refreshLocalStorage()
}

function decrease(id) {
    const product = myBag.find(p => p.id === id)
    if (product.quantity > 1) {
        product.quantity -= 1
    }
    refreshLocalStorage()
}

function remove(id) {
    myBag = myBag.filter(p => p.id !== id)
    refreshLocalStorage()
}

function refreshLocalStorage() {
    window.localStorage.setItem('myBag', JSON.stringify(myBag))
    refreshView()
}

function refreshView() {
    const myBagContainer = document.getElementById('myBagContainer')
    const subtotal = myBag.reduce((prev, curr) => {
        prev += curr.quantity * curr.price
        return prev
    }, 0)
    const bagTemplate =
        `<div class="myBag">
            <h2>Mi Bolsa</h2>
            <div id="myBagProducts">
            </div>
            <p>Subtotal: $${subtotal}</p>
            <p>Añadir un cupón de descuento</p>
            <input type="text" />
            <p id="bagTotal">TOTAL: $${subtotal}</p>
            <button>Continuar</button>
        </div>`
    myBagContainer.innerHTML = bagTemplate

    const myBagCardContainer = document.getElementById('myBagProducts')
    myBagToHTML().forEach(p => myBagCardContainer.appendChild(p))
}

function myBagToHTML() {
    const htmlBag = myBag.map(product => {
        console.log(product);
        const myBagProductCard = document.createElement('div')
        const cardTemplate =
            `<div>
        <img src="/images/ofertas/${product.image}.png" alt="${product.name}">
        </div>
        <div>
        <p>${product.title}</p>
        <p>Cod. del producto: 030949999</p>
        <div>
        <p>$${product.price} kg</p>
        <button onclick="decrease(${product.id})">-</button>
        <span>${product.quantity}</span>
        <button onclick="increase(${product.id})">+</button>
        </div>
        </div>
        <div>
        <button onclick="remove(${product.id})">
        <img src="/images/icons/trash.png" alt="">
        </button>
        </div>`

        myBagProductCard.classList.add('myBagProductCard')
        myBagProductCard.innerHTML = cardTemplate
        return myBagProductCard
    })
    return htmlBag
}
