function detail(stockSym, setDetail) {
    const f = async () => {
        const res = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSym}&apikey=${process.env.REACT_APP_AV}`,)

        const d = await res.json()
        if (Object.keys(d).length === 0) {
            
        } else {
            localStorage.setItem('stockDetail' + stockSym, JSON.stringify(d))
            setDetail(d)
            console.log(d, 'api')

        }
    }
    if (localStorage.getItem(('stockDetail' + stockSym))) {
        if (Object.keys(JSON.parse(localStorage.getItem(('stockDetail' + stockSym)))).length === 0) {
            localStorage.removeItem('stockDetail' + stockSym)
        } else {
            setDetail(JSON.parse(localStorage.getItem('stockDetail' + stockSym)))
        }
    } else {
        f()
    }
    return
}

export default detail