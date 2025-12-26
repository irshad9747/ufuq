import React, { useMemo } from 'react'
import { useReveal, useRevealMultiple } from '../hooks/useReveal'

export default function Speakers() {
  const revealTitle = useReveal()

  const speakers = useMemo(() => [
    {
      initials: 'SK',
      name: 'Sunandan K N',
      affiliation: 'Azim Premji University',
      description: 'Researches the history and sociology of caste, knowledge production, and science; holds advanced degrees in sociology and science policy.',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      initials: 'SM',
      name: 'Dr. Salih M',
      affiliation: 'Govt. Arts & Science College',
      description: 'Completed his MPhil and PhD at Jawaharlal Nehru University, Delhi. His research interests focus on the relationship between technology and art.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      initials: 'WR',
      name: 'Wafa Razak',
      affiliation: 'PhD Candidate, JNU',
      description: 'Explores how biomedical knowledge is created and practiced in everyday settings, focusing on the interplay between science and society.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      initials: 'AA',
      name: 'Dr. Arun Ashokan',
      affiliation: 'ETH Zurich (Former)',
      description: 'Works on the history of vernacular mathematics in medieval South India. Completed postdoctoral research at ETH Zurich.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      initials: 'SH',
      name: 'Shameerali Hudawi',
      affiliation: 'Darul Huda Islamic University',
      description: 'Former Head of the Department of Civilizational Studies. He has expertise in philosophy of science and civilizational studies.',
      gradient: 'from-purple-600 to-indigo-500'
    },
    {
      initials: 'MS',
      name: 'Dr. Muhammed Shareef',
      affiliation: 'IIT Palakkad (Former)',
      description: 'Holds a Master\'s degree in Philosophy from the University of Hyderabad. Research interests lie in the field of philosophy.',
      gradient: 'from-indigo-600 to-violet-500'
    }
  ], [])

  const setRevealRef = useRevealMultiple(speakers.length)

  return (
    <section id="speakers" className="py-20 px-6 max-w-7xl mx-auto bg-white/[0.02]">
      <div ref={revealTitle} className="text-center mb-16 reveal">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Speakers</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Learn from industry leaders and renowned researchers shaping the future of science.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker, index) => (
          <div key={index} ref={setRevealRef(index)} className="pro-card p-8 rounded-2xl reveal group">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${speaker.gradient} mb-6 flex items-center justify-center text-xl font-bold text-white`}>
              {speaker.initials}
            </div>
            <h4 className="text-xl font-bold text-white">{speaker.name}</h4>
            <p className="text-xs text-purple-400 uppercase tracking-wide font-semibold mb-4">{speaker.affiliation}</p>
            <p className="text-sm text-gray-400 leading-relaxed">{speaker.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

