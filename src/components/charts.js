import React, { useEffect, useState } from 'react'

function Charts({ xAxis, xAxisLeg, vals, yMax, yMin, w, h, type, txtColor }) {
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
                <g style={{ stroke: '#fff' }} className='hidden'>
                    <line x1="0" x2="0" y1="0" y2={h}>

                    </line>
                </g>
                <g style={{ stroke: '#fff' }} className='hidden'>
                    <line x1="0" x2={w} y1={h} y2={h}></line>
                </g>

            </g>
            <defs>

                <linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="90%">
                    <stop offset="0%" style={{ stopColor: color, stopOpacity: '0.6' }} />
                    <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: '0' }} />
                </linearGradient>
            </defs>
            
            <polygon
                // fill="#grad1"
                style={{fill: 'url(#grad1)'}}
                // stroke={color}
                strokeWidth="0.8"
                points={`0,${h} ${yAxis ? yAxis : ''}, ${w},${h}`}
            />

            <g style={{ visibility: 'hidden', }}>
                <text x='10' y='12' style={{ fill: '#fff' }}>{parseInt(yLeg.max)}</text>
                <text x='10' style={{ fill: '#fff' }} y={h / 2}>{parseInt(((yLeg.max - yLeg.min) / 2) + yLeg.min)}</text>
                <text x='10' style={{ fill: '#fff' }} y={h - 10}>{parseInt(yLeg.min)}</text>
            </g>


        </svg>
    )
}

export default Charts