import React from 'react'

function ContactUs() {
  
  return (
   <div>
        {/* <h2>Contact US</h2> */}
        <div class="antialiased bg-gray-100">
        <div class="flex w-full min-h-screen justify-center items-center">
          <div class=" flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-cyan-700 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
            <div class="flex flex-col space-y-8 justify-between">
              <div>
                  <h2 class="font-bold text-4xl tracking-wide">Contact Us</h2>
                  <p class="pt-2 text-cyan-100 text-sm">Lorem</p>
              </div>
              <div class="flex flex-col space-y-6">
                <div class="inline-flex space-x-2 items-center text-cyan-200">
                  <span>+65 8989 9898</span>
                </div>
                <div class="inline-flex space-x-2 items-center text-cyan-200">
                  <span>11, Singapore Street, Singapore Main road, Singapore</span>
                </div>
                <div class="inline-flex space-x-2 items-center text-cyan-200">
                  <span>xyz@email.com</span>
                </div>
              </div>
              <div class="flex space-x-4">
                <h2>Fb</h2>
                <h2>Insta</h2>
                <h2>Google</h2>
                <h2>LinkedIn</h2>
              </div>
            </div>
            <div>
              <div class="bg-white rounded-xl shadow-lg p-8 text-gray-600">
                <form action="#" class="flex flex-col space-y-4">
                    <div>
                      <label for="" class="text-sm">Your name</label>
                      <input type="text" placeholder="Your name" class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"></input>
                    </div>
                    <div>
                      <label for="" class="text-sm">Your Email</label>
                      <input type="text" placeholder="Email Address" class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"></input>
                    </div>
                    <div>
                      <label for="" class="text-sm">Message</label>
                      <textarea type="text" placeholder="Message" rows="4" class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"></textarea>
                    </div>
                    <button class="inline-block self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm">Send Message</button>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ContactUs