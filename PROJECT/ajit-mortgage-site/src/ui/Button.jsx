import React from 'react'
import clsx from 'clsx'

export default function Button({children, variant='solid', className='', ...props}){
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold shadow-sm'
  const solid = 'bg-ajit text-white hover:bg-ajit-dark'
  const outline = 'border border-slate-200 text-slate-700 bg-white hover:bg-surface'
  return (
    <button {...props} className={clsx(base, variant==='solid'?solid:outline, className)}>
      {children}
    </button>
  )
}
