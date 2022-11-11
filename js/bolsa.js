
function hideBagIfClickOutside(event) {
    const myBag = document.getElementById('myBag')
    // const container = document.getElementById('myBagContainer')
    if (myBag && !myBag.contains(event.target)) {
        hideBag()
    }
}

document.addEventListener('click', hideBagIfClickOutside);

function openBag(event) {
    event.stopPropagation()
    window.scrollTo(0, 0)
    const strMyBag = window.localStorage.getItem('myBag')
    let myBag = []
    if (strMyBag) {
        myBag = JSON.parse(strMyBag)
    }

    if (myBag.length) {
        updateBagView()
    } else {
        //toast empty bag
    }
}

function showBag() {
    const htmlBag = document.getElementById('myBagContainer')
    htmlBag.classList.add('myBagContainer')
    htmlBag.classList.remove('myBagContainerHidden')
}

function hideBag() {
    console.log("HIDING BAG");
    const htmlBag = document.getElementById('myBagContainer')
    htmlBag.classList.add('myBagContainerHidden')
    htmlBag.classList.remove('myBagContainer')
}

function increase(event) {
    event.stopPropagation()
    const id = parseInt(event.target.name)
    const product = myBag.find(p => p.id === id)
    product.quantity += 1
    refreshLocalStorage()
}

function decrease(event) {
    event.stopPropagation()
    const id = parseInt(event.target.name)
    const product = myBag.find(p => p.id === id)
    if (product.quantity > 1) {
        product.quantity -= 1
    }
    refreshLocalStorage()
}

function remove(event) {
    event.stopPropagation()
    const id = parseInt(event.target.name)
    myBag = myBag.filter(p => p.id !== id)
    refreshLocalStorage()
    refreshBadge()
    if (!myBag.length) hideBag()
}

function refreshLocalStorage() {
    window.localStorage.setItem('myBag', JSON.stringify(myBag))
    updateBagView()
}

function handleInput(event) {
    const value = event.target.value
    const lastChar = value[value.length - 1]

    if (isNaN(lastChar)) {
        const newValue = value.slice(0, -1)
        event.target.value = newValue
    } else {
        updateDiscount(value)
    }
}

function updateDiscount(discount) {

    const exchangeRate = window.localStorage.getItem('exchangeRate') || 1
    const total = document.getElementById('bagTotal')
    const subtotal = (myBag.reduce((prev, curr) => {
        prev += curr.quantity * curr.price
        return prev
    }, 0) * exchangeRate)
    discount = parseInt(discount)

    if (discount >= 100) {
        total.textContent = "0.00"
    } else {
        total.textContent = (subtotal * (1 - discount / 100)).toFixed(2)
    }
}

function updateBagView() {
    const exchangeRate = window.localStorage.getItem('exchangeRate') || 1
    const myBagContainer = document.getElementById('myBagContainer')
    const subtotal = (myBag.reduce((prev, curr) => {
        prev += curr.quantity * curr.price
        return prev
    }, 0) * exchangeRate).toFixed(2)
    let discount = ""
    let total = 0
    const discountInput = document.getElementById('discount')
    if (discountInput) {
        discount = discountInput.value
    }
    if (discount) {
        total = (subtotal * (1 - discount / 100)).toFixed(2)
    }
    const bagTemplate =
        `<div class="myBag" id="myBag" >
            <h2>Mi Bolsa</h2>
            <div id="myBagProducts">
            </div>
            <p>Subtotal: $${subtotal}</p>
            <p>Añadir un cupón de descuento</p>
            <input type="text" id="discount" value="${discount}" onkeyup="handleInput(event)"/>
            <p id="bagTotal">TOTAL: $${total || subtotal}</p>
            <button>Continuar</button>
        </div>`
    myBagContainer.innerHTML = bagTemplate
    const myBagCardContainer = document.getElementById('myBagProducts')
    myBagToHTML().forEach(p => myBagCardContainer.appendChild(p))
    showBag()
}

function myBagToHTML() {
    const exchangeRate = window.localStorage.getItem('exchangeRate') || 1

    const htmlBag = myBag.map(product => {
        const myBagProductCard = document.createElement('div')
        const cardTemplate =
            `<div>
        <img src="/images/ofertas/${product.image}.png" alt="${product.name}">
        </div>
        <div>
        <p>${product.title}</p>
        <p>Cod. del producto: 030949999</p>
        <div>
        <p>$${(product.price * exchangeRate).toFixed(2)} kg</p>
        <button onclick="decrease(event)" name="${product.id}">-</button>
        <span>${product.quantity}</span>
        <button onclick="increase(event)" name="${product.id}">+</button>
        </div>
        </div>
        <div>
        <button onclick="remove(event)" name="${product.id}">
        <img src="/images/icons/trash.png" alt="" name="${product.id}">
        </button>
        </div>`

        myBagProductCard.classList.add('myBagProductCard')
        myBagProductCard.innerHTML = cardTemplate
        return myBagProductCard
    })
    return htmlBag
}
