function trending(setData) {
    const f = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/search/trending')
        const d = await res.json()
        localStorage.setItem('cryptoTrending', JSON.stringify(d))
        setData(d)
    }

    if (localStorage.cryptoTrending) {
        setData(JSON.parse(localStorage.cryptoTrending))
    } else {
        f()
    }
    return
}

export default trending