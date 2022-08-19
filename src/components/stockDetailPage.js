import React from 'react'

function StockDetailPage() {
    return (
        <div class="hero flex space-y-2 flex-col">
            {/* <p style={{color:'red',background:'blue'}}>Test</p> */}
            <div class="flex space-x-6">
                <button type='button'>Stock</button>
                <button type='button'>Crypto</button>
                <button type='button'>Overall</button>
            </div>

            <h2>Status</h2>

            <div class="chart flex space-x-6">
                {/* Chart area */}
                <svg width="400" height="400">
                    <circle cx="250" cy="100" r="80" />
                </svg>

                {/* Value detail area next to Pie chart */}
                <ul>
                    <h2>Total: </h2>
                    <li>Stock Price: </li>
                    <li>Stock Price: </li>
                    <li>Stock Price: </li>
                    <li>Stock Price: </li>

                </ul>
            </div>
            {/* Table Content */}
            <div>
            <table style={{border:'1px solid black'}}>
                <tr>
                    <th style={{border:'1px solid black'}}>Name</th>
                    <th style={{border:'1px solid black'}}>Blended Price</th>
                    <th style={{border:'1px solid black'}}>Present Value</th>
                    <th style={{border:'1px solid black'}}>Return</th>
                    <th style={{border:'1px solid black'}}>Ratio of Return</th>
                    <th style={{border:'1px solid black'}}>Info</th>
                </tr>
                <tr>
                    <td style={{border:'1px solid black'}}>Value</td>
                    <td style={{border:'1px solid black'}}>Value</td>
                    <td style={{border:'1px solid black'}}>Value</td>
                    <td style={{border:'1px solid black'}}>Value</td>
                    <td style={{border:'1px solid black'}}>Value</td>
                    <td style={{border:'1px solid black'}}>Value</td>
                </tr>
            </table>
            </div>
        </div>
    )
}

export default StockDetailPage