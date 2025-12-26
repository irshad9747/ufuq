import React from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Objectives from './components/Objectives'
import Events from './components/Events'
import Speakers from './components/Speakers'
import RecentActivity from './components/RecentActivity'
import CTA from './components/CTA'
import Footer from './components/Footer'
import DarkVeil from './components/DarkVeil'

function App() {
  return (
    <div className="scroll-smooth">
      <div className="bg-glow"></div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, pointerEvents: 'none' }}>
        <DarkVeil />
      </div>
      <Nav />
      <Hero />
      <Stats />
      <Objectives />
      <Events />
      <Speakers />
      <RecentActivity />
      <CTA />
      <Footer />
    </div>
  )
}

export default App

