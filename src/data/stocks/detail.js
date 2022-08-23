function detail(stockSym, setDetail) {
    const f = async () => {
        const res = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSym}&apikey=${process.env.REACT_APP_AV}`,)

        const d = await res.json()
        localStorage.setItem('stockDetail' + stockSym, JSON.stringify(d))
        setDetail(d)
        console.log(d, 'api')
    }
    if (localStorage.getItem(('stockDetail' + stockSym)) ) {
        setDetail(JSON.parse(localStorage.getItem('stockDetail' + stockSym)))
    } else {
        f()
    }
    return
}

export default detail