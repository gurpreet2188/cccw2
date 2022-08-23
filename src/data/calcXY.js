

function calcXY(data, dataName, size) {
    const baseNum = size / data.length
    let vals = []
    let xAxis = []
    data.map((v, i) => {
        vals = [...vals, parseFloat(v[dataName])]
        xAxis = [...xAxis, baseNum * i]
    })

    return [ vals, xAxis ]
}

export default calcXY