import React from 'react'

export default function Input({label, className='', ...props}){
  return (
    <label className={`block text-sm ${className}`}>
      {label && <div className="text-slate-600 mb-1">{label}</div>}
      <input {...props} className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white focus:ring-2 focus:ring-ajit outline-none" />
    </label>
  )
}
