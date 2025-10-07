import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const items = [
  {title:'Residential Mortgages', desc:'Purchase and refinance options across Canada.'},
  {title:'Commercial Lending', desc:'Tailored loans for businesses and investors.'},
  {title:'First-Time Buyers', desc:'Guidance, incentives, and program navigation.'},
  {title:'Refinancing', desc:'Lower payments, cash-out, and debt consolidation.'},
]

const unique = [
  {title:'Rate Watch', desc:'Live rate alerts and custom notifications.'},
  {title:'Pre-Approval FastTrack', desc:'Submit once — get matched to multiple lenders.'},
  {title:'Client Portal', desc:'Secure document upload and progress tracking.'},
]

export default function Features(){
  const navigate = useNavigate()
  return (
    <motion.section id="features" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="py-12">
      <h2 className="text-3xl font-bold mb-6">Services & Tools</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
          {items.map(i=> (
            <div key={i.title} className="card p-6" role="article" aria-label={i.title}>
              <div className="font-semibold text-lg flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h18" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"/></svg>
                {i.title}
              </div>
              <div className="text-sm text-slate-600 mt-2">{i.desc}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="font-semibold text-lg">Unique Tools</h3>
            <div className="mt-3 space-y-3">
              {unique.map(u=> (
                <div key={u.title} className="p-3 rounded-md border">
                  <div className="font-semibold">{u.title}</div>
                  <div className="text-sm text-slate-700">{u.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button onClick={()=>navigate('/contact?subject=Rate%20Watch&message=I%20would%20like%20to%20subscribe%20to%20Rate%20Watch%20alerts.')}>Request Rate Watch</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
