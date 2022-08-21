function price(setPrices, coinIDS, currency) {
    const f = async () => {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIDS}&vs_currencies=${currency}`)
        const d = await res.json()
        localStorage.setItem('cryptoPrice', JSON.stringify(d))
        setPrices(d)
    }

    if (localStorage.cryptoPrice) {
        setPrices(JSON.parse(localStorage.cryptoPrice))
    } else {
        f()
    }
    return
}

export default price