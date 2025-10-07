import React from 'react'
import DarkToggle from './DarkToggle'
import { Link, useLocation } from 'react-router-dom'

export default function Header(){
  const loc = useLocation()
  const isActive = (path) => loc.pathname === path

  return (
    <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
      <div className="text-2xl font-semibold">Ajit Kumar <div className="text-xs text-slate-500">Mortgage Broker</div></div>
      <nav className="flex items-center gap-4">
        <Link to="/dashboard" className={`text-slate-700 hover:text-ajit ${isActive('/dashboard')?'font-semibold':''}`} aria-current={isActive('/dashboard')? 'page' : undefined}>Dashboard</Link>
        <Link to="/services" className={`text-slate-700 hover:text-ajit ${isActive('/services')?'font-semibold':''}`}>Features</Link>
        <Link to="/calculator" className={`text-slate-700 hover:text-ajit ${isActive('/calculator')?'font-semibold':''}`}>Calculator</Link>
        <Link to="/news" className={`text-slate-700 hover:text-ajit ${isActive('/news')?'font-semibold':''}`}>News</Link>
        <Link to="/contact" className={`text-slate-700 hover:text-ajit ${isActive('/contact')?'font-semibold':''}`}>Contact</Link>
        <DarkToggle />
      </nav>
    </header>
  )
}
