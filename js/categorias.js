const categorias = []
const categoryContainer = document.getElementById('categoriasCardsContainer')

categorias.push(new Category(1, "Panadería", "panaderia"))
categorias.push(new Category(2, "Desayunos", "desayunos"))
categorias.push(new Category(3, "Lacteos", "lacteos"))
categorias.push(new Category(4, "Meriendas", "meriendas"))
categorias.push(new Category(5, "Bebidas", "bebidas"))
categorias.push(new Category(6, "Coffee", "coffee"))

function categoryToHTML(category) {
    const { id, title, image } = category
    const card = document.createElement('div')
    const cardImage = document.createElement('img')
    const textContainer = document.createElement('div')
    const text = document.createElement('p')

    cardImage.src = `/images/categorias/${image}.png`
    text.textContent = title
    textContainer.appendChild(text)
    card.appendChild(cardImage)
    card.appendChild(textContainer)

    return card
}

categorias.forEach(category => {
    const categoryCard = categoryToHTML(category)
    categoryContainer.appendChild(categoryCard)
})