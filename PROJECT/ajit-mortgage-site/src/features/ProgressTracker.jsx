import React from 'react'

export default function ProgressTracker({status='submitted'}){
  const steps = ['Submitted','Under Review','Approved','Completed']
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="font-semibold">Loan Approval Progress</h3>
      <div className="mt-3 space-y-2">
        {steps.map((s,i)=> (
          <div key={s} className={`flex items-center gap-3 ${s===status? 'text-ajit font-semibold':''}`}>
            <div className={`w-3 h-3 rounded-full ${i<=steps.indexOf(status)?'bg-ajit':''} border`}></div>
            <div>{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
