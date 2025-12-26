import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function RecentActivity() {
  const reveal = useReveal()

  const activities = [
    { month: 'May 2025', title: 'Summer School: Science & Theology', location: 'Santhapuram' },
    { month: 'Aug 2025', title: 'Aqeeda & Philosophy Workshop', location: 'Kannur' },
    { month: 'Aug 2025', title: 'Declaration Ceremony', location: 'Ernakulam' },
    { month: 'Aug 2025', title: "Let's AI It! Workshop", location: 'Kozhikode' }
  ]

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div ref={reveal} className="reveal mb-10">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-purple-500 pl-4">What we've been up to lately</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="pro-card p-6 rounded-xl">
              <p className="text-purple-400 text-xs font-bold uppercase mb-2">{activity.month}</p>
              <h4 className="font-semibold text-white">{activity.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{activity.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

