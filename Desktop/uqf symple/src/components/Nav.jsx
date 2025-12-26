import React from 'react'

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#03030a]/70">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/icons/ufuq.png" alt="UFUQ Logo" style={{ height: '35px' }} />
        </div>
        
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-400">
          <a href="#home" className="hover:text-purple-300 transition-colors">Home</a>
          <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
          <a href="#events" className="hover:text-purple-300 transition-colors">Event</a>
          <a href="#speakers" className="hover:text-purple-300 transition-colors">Speaker</a>
          <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
          <a href="#" className="btn-primary px-6 py-2.5 rounded-full text-white font-semibold tracking-wide">Register Now</a>
        </div>
        
        <button className="md:hidden text-gray-400 hover:text-purple-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  )
}

