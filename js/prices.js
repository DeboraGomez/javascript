const myHeaders = new Headers();

myHeaders.append("apikey", "OnrmtOERSVZqkilwzMzHF3SvxWOLgSzO");
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};


function udpatePrices(event) {
    console.log("updating prices")
    const targetCurrency = event.target.value
    const total = myBag.reduce((prev, curr) => {
        prev += curr.quantity * curr.price
        return prev
    }, 0)
    console.log(targetCurrency, total);
    fetch(`https://api.apilayer.com/fixer/convert?to=${targetCurrency}&from=ARS&amount=${total}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            window.localStorage.setItem('exchangeRate', result.info.rate)
            refreshView()
        })
        .catch(error => console.log('error', error));
}