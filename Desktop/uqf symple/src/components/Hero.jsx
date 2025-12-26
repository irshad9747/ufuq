import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Hero() {
  const reveal1 = useReveal()
  const reveal2 = useReveal()

  return (
    <header id="home" className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div ref={reveal1} className="reveal delay-[100ms]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300 mb-6">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Kozhikode, Kerala &bull; 25-26 Jan 2026
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-8">
            Science and <br/>
            <span className="gradient-text">Technology Fest</span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
            Resisting both uncritical acceptance and blanket refusal of advances in science and technology, SIO seeks to critically engage with them -- questioning, redefining, and reshaping their course, while remaining grounded in the foundations of Islam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="btn-primary px-8 py-4 rounded-xl font-semibold text-center">Register Now</a>
            <button className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all text-sm font-medium text-gray-300">View Brochure</button>
          </div>
        </div>

        <div ref={reveal2} className="relative reveal delay-[300ms]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-600/25 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="pro-card p-8 md:p-10 rounded-3xl relative z-10">
            <div className="font-arabic text-2xl md:text-3xl text-right text-purple-100 mb-4 leading-loose opacity-90" dir="rtl">
              "سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ حَتَّى يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ"
            </div>
            <p className="text-sm text-gray-400 italic mb-8 leading-relaxed border-l-2 border-purple-500/40 pl-4">
              "We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the Truth" (41:53)
            </p>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

            <p className="text-sm text-gray-300 leading-relaxed">
              This verse embodies the idea that every pursuit of knowledge, whether through the vast horizons of the universe or the depths of the human self, is ultimately a journey towards recognizing the ultimate reality: Allah.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

