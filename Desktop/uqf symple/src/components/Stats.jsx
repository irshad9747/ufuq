import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Stats() {
  const reveal = useReveal()

  const stats = [
    { value: '2,000+', label: 'Delegates' },
    { value: '50+', label: 'Guests' },
    { value: '20+', label: 'Sessions' },
    { value: '05+', label: 'Stages' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32 reveal" ref={reveal}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="pro-card p-6 rounded-2xl text-center group hover:bg-white/5">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2">{stat.value}</p>
            <p className="text-xs text-purple-300/80 uppercase tracking-widest font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

