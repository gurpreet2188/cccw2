import React from 'react'
import React, { useEffect, useState } from 'react'

function useGetXY({ xAxis, vals, yMax, yMin }) {
    const [xyAxis, setXYAxis] = useState([])
    const [yLeg, setYLeg] = useState({ 'max': 0, 'mid': 0, 'min': 0 })

    useEffect(() => {
        if (vals) {
            const maxVal = Math.max(...vals)
            const minVal = Math.min(...vals)
            yLeg.max = maxVal + (maxVal * yMax)
            yLeg.min = minVal - (minVal * yMin)
            yLeg.mid = ((yLeg.max - yLeg.min) / 2) + yLeg.min
            if (xyAxis.length < xAxis.length) {
                vals.map((v, i) => {
                    const diff = yLeg.max - yLeg.min
                    const diffV = yLeg.max - v
                    const deltaY = diff - diffV
                    console.log(diff - diffV)
                    setXYAxis(xyAxis => [...xyAxis, [xAxis[i], parseInt((w - (w * ((deltaY / diff) * 100) / 100)))]])
                })
            }
        }
        // console.log(vals)
    }, [vals, xAxis, yMax, yMin])
    return { xyAxis, yLeg }
}

export default useGetXY