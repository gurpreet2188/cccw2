import React, { useEffect, useState } from 'react'

function Charts({ xAxis, xAxisLeg, vals, yMax, yMin, w, h, type }) {
    console.log(xAxis, 'test')
    const [yAxis, setYAxis] = useState([])
    const [yLeg, setYLeg] = useState({ 'max': 0, 'min': 0 })
    const [color, setColor] = useState('#00FF00')

    useEffect(() => {
        if (vals) {
            const maxVal = Math.max(...vals)
            const minVal = Math.min(...vals)
            yLeg.max = maxVal + (maxVal * yMax)
            yLeg.min = minVal - (minVal * yMin)
            let xy = []
            // if (yAxis.length === 0) {
            vals.map((v, i) => {
                const diff = yLeg.max - yLeg.min
                const diffV = yLeg.max - v
                const deltaY = diff - diffV
                // console.log(diff - diffV)
                xy = [...xy, [xAxis[i], parseInt((w - (w * ((deltaY / diff) * 100) / 100)))]]
            })
            setYAxis(xy)
            // }
            vals[0] > vals[vals.length - 1] ? setColor('#FF0000') : setColor(color)
        }
        console.log(vals, 'chart')
    }, [vals, xAxis, yMax, yMin])



    // console.log(yAxis, vals)
    return (
        <svg width={w} height={h} className='m-auto'>
            <g style={{ visibility: type === 'compact' ? 'hidden' : '' }}>
                <g style={{ stroke: '#000' }}>
                    <line x1="0" x2="0" y1="0" y2={h}>

                    </line>
                </g>
                <g style={{ stroke: '#000' }}>
                    <line x1="0" x2={w} y1={h} y2={h}></line>
                </g>

            </g>
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="0.8"
                points={`${yAxis ? yAxis : ''}`}
            />

            <g style={{ visibility: type === 'compact' ? 'hidden' : '' }}>
                <text x='10' y='10'>{parseInt(yLeg.max)}</text>
                <text x='10' y={h / 2}>{parseInt(((yLeg.max - yLeg.min) / 2) + yLeg.min)}</text>
                <text x='10' y={h - 10}>{parseInt(yLeg.min)}</text>
            </g>


        </svg>
    )
}

export default Charts