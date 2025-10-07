import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../ui/Button'

export default function Hero(){
  const navigate = useNavigate()
  return (
    <motion.section initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="grid lg:grid-cols-2 gap-8 items-center py-16">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-ajit flex items-center justify-center text-white font-bold" aria-hidden="true">A</div>
          <div>
            <div className="text-xs text-slate-500">Ajit Kumar</div>
            <div className="text-sm text-slate-400">Mortgage Broker — Canada</div>
          </div>
        </div>

  <h1 className="text-5xl font-bold leading-tight">Modern mortgage guidance that puts you first</h1>
        <p className="text-lg text-slate-600 max-w-2xl">Customized rates, fast pre-approvals and a secure client portal — helping Canadians buy and refinance smarter.</p>

        <div className="flex gap-4 items-center">
          <button onClick={()=>navigate('/contact')}><Button>Get a Free Consultation</Button></button>
          <button onClick={()=>navigate('/calculator')}><Button variant="outline">Estimate Payments</Button></button>
        </div>
        <div className="mt-4 text-sm text-slate-500">Licensed in Canada • Multilingual support • Transparent fees</div>
      </div>

      <motion.div initial={{opacity:0, x:20}} animate={{opacity:1,x:0}} whileHover={{scale:1.02}} className="card p-6 rounded-xl" role="img" aria-label="Modern home and mortgage assistance image">
        <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0f6d3e5c" alt="Modern home interior" className="w-full rounded-lg object-cover h-72" />
        <div className="mt-4 text-sm text-slate-600">Personalized service and fast pre-approvals — talk to Ajit today.</div>
      </motion.div>
    </motion.section>
  )
}
