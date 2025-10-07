import React from 'react'
import Dashboard from '../features/Dashboard'
import Hero from '../components/Hero'

export default function DashboardPage(){
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Hero />
      <Dashboard />
    </div>
  )
}
