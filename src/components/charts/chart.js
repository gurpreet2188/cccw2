import React from 'react'

function Chart({type, yAxis,w, h }) {
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
                    <text x='10' y='100'>{parseInt(yLeg.mid)}</text>
                    <text x='10' y='190'>{parseInt(yLeg.min)}</text>
                </g>


            </svg>
        </div>
    )
}

export default Chart