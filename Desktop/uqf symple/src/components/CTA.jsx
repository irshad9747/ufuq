import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const reveal = useReveal()

  return (
    <section className="py-20 px-6 relative reveal" ref={reveal}>
      <div className="max-w-5xl mx-auto pro-card rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/8 to-transparent"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us. Enjoy. Create. Succeed.</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">Shape Your Future with UFUQ 2026.</p>
          <a href="#" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-xl font-bold text-lg">
            Register Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

