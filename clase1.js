
let userInput
do {
    userInput = window.prompt("Ingrese su nombre")
    if(!isNaN(userInput)) {
        window.alert("Error: debe ingresar un nombre valido")
    }
} while(!isNaN(userInput))

document.body.onload = write;

function write () {
    const root = document.getElementById("root")
    const h1 = document.createElement("h1")
    h1.innerText = `Nombre ingresado: ${userInput}`
    root.appendChild(h1)
}