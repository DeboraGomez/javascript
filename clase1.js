
// let userInput
// do {
//     userInput = window.prompt("Ingrese su nombre")
//     if(!isNaN(userInput)) {
//         window.alert("Error: debe ingresar un nombre valido")
//     }
// } while(!isNaN(userInput))

// document.body.onload = write;

// function write () {
//     const root = document.getElementById("root")
//     const h1 = document.createElement("h1")
//     h1.innerText = `Nombre ingresado: ${userInput}`
//     root.appendChild(h1)
// }

let subtotal = 0
let continuar = true
while (continuar){
    let userInput = prompt ("Elija su producto\n 1. Leche $499 \n 2. Yogurt $399 \n 3. Azucar $299 \n 4. Café $899 \n F. finalizar compra" 
    )
    switch (userInput){
        case "1": 
            subtotal = subtotal + 499  
            break
        case "2":
            subtotal = subtotal + 399
            break
        case "3":
            subtotal = subtotal + 299
            break
        case "4":
            subtotal += 899
            break
        case "f":
            continuar = false
            break
        default:
            alert ("Elija una opción correcta")
    }
    console.log(subtotal);
}   
let userInputCupon = prompt ("Ingrese su descuento")
userInputCupon = parseInt (userInputCupon)
let total = totalDescuento (subtotal, userInputCupon)
alert (`su total es: ${total}`)


function totalDescuento (subtotal, descuento){
    let total = subtotal * (100 - descuento)/100
    return total
}