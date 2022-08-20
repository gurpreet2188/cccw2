import React from 'react'
import NewsCarousel from '../components/NewsCarousel'

function News() {
  return (
    // Main Section
    <div class="hero                                        ">
        <h1>Trending News</h1>
        <div class="Tnews">
           <NewsCarousel/>
        </div>
        <h1>News</h1>
        <div class="NewStories flex space-y-2 flex-col">
            <h2>Title</h2>

            <h2>Story head</h2>


            <p>lorem ipsum</p>


        </div>
    </div>
  )
}

export default News