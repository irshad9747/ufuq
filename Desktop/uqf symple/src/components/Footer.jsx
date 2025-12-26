import React from 'react'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 py-20 px-6 mt-10 bg-[#020205]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold tracking-tighter text-white">UFUQ</span>
            <span className="text-xs text-gray-500">2026</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Vidyarthi Bhavanam, UK Sankunni Rd,<br/>
            near KSRTC, Kozhikode,<br/>
            Kerala 673001
          </p>
          <div className="flex gap-4">
            {/* Social Icons could go here */}
          </div>
        </div>

        <div className="md:col-span-1">
          <h5 className="text-white font-bold mb-4">Company</h5>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Career Guides</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Licensing</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Backers</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h5 className="text-white font-bold mb-4">Contact Us</h5>
          <div className="space-y-3 text-sm text-gray-500">
            <p className="flex items-center gap-3">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              ufuqsciencetechnologyfest@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              +91 90613 90155, +91 80780 82546
            </p>
            <p className="flex items-center gap-3">
              <span className="w-4 h-4"></span>
              +91 97451 40174
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>&copy; Go campus 2026 — Copyright</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

