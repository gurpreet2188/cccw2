import React from 'react'


function AboutUS() {
  return (
    <div>
      {/* <h2>AboutUS</h2> */}
      <div class="antialiased bg-gray-100">
        <div class="flex w-full min-h-screen justify-center items-center">
          <div class=" flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-cyan-700 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
            <div class="flex flex-col space-y-8 justify-between">
              <div>
                  <h2 class="font-bold text-4xl tracking-wide">About Us</h2>
                  <p class="pt-2 text-cyan-100 text-md">This is a Prototype of a Stock and crypto 
                  trade information providing website.</p>
                  <p class="pt-2 text-cyan-100 text-md">This project involves 6 individuals who worked on various areas and together build this information hub.
                  The main focus of this project is provide the user with the valid and sufficient information about the 
                  current state of stock market and Dynamically changing values of Crypto currencies.</p>
              </div>
              {/* <div class="flex flex-col space-y-6">
                <div class="inline-flex space-x-2 items-center text-cyan-200">
                  <span>+65 8989 9898</span>
                </div>
                <div class="inline-flex space-x-2 items-center text-cyan-200">
                  <span>11, Singapore Street, Singapore Main road, Singapore</span>
                </div>
                <div class="inline-flex space-x-2 items-center text-cyan-200">
                  <span>xyz@email.com</span>
                </div>
              </div> */}
              <div class="flex space-x-4">
                <h2>Fb</h2>
                <h2>Insta</h2>
                <h2>Google</h2>
                <h2>LinkedIn</h2>
              </div>
            </div>
            <div>
              
            </div>
          </div>

        </div>

      </div>

      
    </div>
  )
}

export default AboutUS