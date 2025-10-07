import React, {useState, useEffect} from 'react'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useLocation } from 'react-router-dom'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const location = useLocation()

  useEffect(()=>{
    try{
      const params = new URLSearchParams(location.search)
      const subject = params.get('subject')
      const msg = params.get('message')
      const pre = []
      if(subject) pre.push(subject)
      if(msg) pre.push(decodeURIComponent(msg))
      if(pre.length) setMessage(pre.join('\n\n'))
    }catch(e){/* ignore */}
  },[location.search])

  function submit(e){
    e.preventDefault()
    alert('Thanks, ' + (name||'there') + '! Ajit will contact you shortly.')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section id="contact" className="py-12">
      <h2 className="text-2xl font-bold mb-6">Contact Ajit</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={submit} className="space-y-4">
          <Card>
            <Input required label="Your name" value={name} onChange={e=>setName(e.target.value)} />
            <Input required label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <label className="block text-sm">
              <div className="text-slate-600 mb-1">Message</div>
              <textarea placeholder="Message (optional)" value={message} onChange={e=>setMessage(e.target.value)} className="w-full rounded-md border border-slate-200 p-2 h-28" />
            </label>
            <div className="mt-2">
              <Button type="submit">Send Message</Button>
            </div>
          </Card>
        </form>

        <Card className="bg-surface">
          <h3 className="font-semibold">Office</h3>
          <div className="text-sm text-slate-700">Toronto, ON, Canada</div>
          <div className="mt-4">
            <div className="font-semibold">Phone</div>
            <div className="text-sm text-slate-700">+1 (416) 555-0123</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold">Languages</div>
            <div className="text-sm text-slate-700">English, Hindi, Gujarati</div>
          </div>
        </Card>
      </div>
    </section>
  )
}
