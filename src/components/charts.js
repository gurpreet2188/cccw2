import React, { useEffect, useState } from 'react'

function Charts({ xAxis, vals, yMax, yMin, w, h, type}) {
    console.log(vals, 'test')
    const [yAxis, setYAxis] = useState([])
    const [yLeg, setYLeg] = useState({ 'max': 0, 'min': 0 })

    useEffect(() => {
        if (vals) {
            const maxVal = Math.max(...vals)
            const minVal = Math.min(...vals)
            yLeg.max = maxVal + (maxVal * yMax)
            yLeg.min = minVal - (minVal * yMin)
            if (yAxis.length < xAxis.length) {
                vals.map((v, i) => {
                    const diff = yLeg.max - yLeg.min
                    const diffV = yLeg.max - v
                    const deltaY = diff - diffV
                    console.log(diff - diffV)
                    setYAxis(yAxis => [...yAxis, [xAxis[i], parseInt((w - (w * ((deltaY / diff) * 100) / 100)))]])
                })
            }
        }
        console.log(vals)
    }, [vals, xAxis, yMax, yMin])

    console.log(yAxis, vals)
    return (
        <div className=''>
            <svg width={w} height={h}>
                <g style={{ visibility: type === 'compact' ? 'hidden' : '' }}>
                    <g class="" style={{ stroke: '#000' }}>
                        <line x1="0" x2="0" y1="0" y2="200">

                        </line>
                    </g>
                    <g class="" style={{ stroke: '#000' }}>
                        <line x1="0" x2="200" y1="200" y2="200"></line>
                    </g>

                </g>
                <polyline
                    fill="none"
                    stroke="#0074d9"
                    stroke-width="0.8"
                    points={`${yAxis ? yAxis : ''}`}
                />

                <g style={{ visibility: type === 'compact' ? 'hidden' : '' }}>
                    <text x='10' y='10'>{parseInt(yLeg.max)}</text>
                    <text x='10' y='100'>{parseInt(((yLeg.max - yLeg.min) / 2) + yLeg.min)}</text>
                    <text x='10' y='190'>{parseInt(yLeg.min)}</text>
                </g>


            </svg>
        </div>
    )
}

export default Charts