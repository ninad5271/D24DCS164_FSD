import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './ui/Header'
import ChatWidget from './features/ChatWidget'

import Home from './pages/Home'
import Services from './pages/Services'
import CalculatorPage from './pages/CalculatorPage'
import AIRecommenderPage from './pages/AIRecommenderPage'
import NewsPage from './pages/NewsPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-slate-50 text-slate-900">
        <Header />

        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/calculator" element={<CalculatorPage/>} />
            <Route path="/ai" element={<AIRecommenderPage/>} />
            <Route path="/news" element={<NewsPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} />
          </Routes>
        </main>

        <footer className="max-w-6xl mx-auto p-6 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Ajit Kumar — Mortgage Services in Canada
        </footer>
        <ChatWidget phone="+14165550123" />
      </div>
    </BrowserRouter>
  )
}
