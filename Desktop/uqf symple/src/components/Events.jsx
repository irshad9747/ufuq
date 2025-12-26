import React, { useMemo } from 'react'
import { useReveal, useRevealMultiple } from '../hooks/useReveal'

export default function Events() {
  const revealTitle = useReveal()

  const events = useMemo(() => [
    {
      tags: ['Pre Event', 'Summer School'],
      title: 'Exploring Intersections of Science, Technology, Society & Theology',
      speakers: 'Dr. Abdussalam Ahmad, Dr. Arun Ashokan, Dr. Sunandan KN, Dr. Sadiq Mampad, Dr. Badeeuzzaman',
      date: '27, 28, 29 May 2025',
      location: 'Al Jamia Al Islamia Santhapuram'
    },
    {
      tags: ['Pre Event', 'Workshop'],
      title: 'Aqeeda, Philosophy and Science: Navigating Technology',
      speakers: 'Thafasal Ijyas, Shuhaib C, Shameer Ali Hudawi',
      date: '03 August 2025',
      location: 'Unity Centre, Kannur'
    },
    {
      tags: ['Pre Event', 'Ceremony'],
      title: 'Fest Declaration Ceremony',
      speakers: 'Dr. Syed Mustafa Ali, Dr. Nahas Mala, Adv. Abdul Vahid, Sahel Bas',
      date: '17 August 2025',
      location: 'Ernakulam Town Hall'
    },
    {
      tags: ['Pre Event', 'AI Workshop'],
      title: "Let's Ai It! AI Orientation Workshop",
      speakers: 'Amjad Ali EM, Ameen Ahsan',
      date: '24 August 2025',
      location: 'Kozhikode'
    }
  ], [])

  const setRevealRef = useRevealMultiple(events.length)

  return (
    <section id="events" className="py-20 px-6 max-w-7xl mx-auto">
      <div ref={revealTitle} className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Events</h2>
          <p className="text-gray-400 max-w-2xl">Engage with thought-provoking discussions, workshops, and exhibitions that explore the intersection of Islamic thought and scientific inquiry.</p>
        </div>
        <a href="#" className="hidden md:inline-flex items-center text-sm font-semibold text-purple-400 hover:text-purple-300 mt-4 md:mt-0">
          View Schedule <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} ref={setRevealRef(index)} className="pro-card p-6 md:p-8 rounded-2xl reveal hover:border-purple-500/50 group">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div className="flex-1">
                <div className="flex gap-2 mb-2">
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        tagIndex === 0
                          ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">{event.title}</h3>
                <p className="text-sm text-gray-400">
                  <span className="text-purple-400">Speakers:</span> {event.speakers}
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-1 min-w-[180px] border-l border-white/5 pl-6 md:border-l-0 md:pl-0">
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="font-semibold">{event.date}</span>
                </div>
                <div className="text-sm text-gray-500">{event.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

