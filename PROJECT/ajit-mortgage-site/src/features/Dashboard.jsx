import React from 'react'
import ProgressTracker from './ProgressTracker'

export default function Dashboard(){
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">Client Dashboard</h2>
      <p className="text-sm text-slate-600">Secure area (placeholder) — upload documents and track loan progress.</p>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <ProgressTracker status={'Under Review'} />
        </div>
        <div className="p-4 border rounded">
          <div className="font-semibold">Upload Documents</div>
          <div className="text-sm text-slate-600 mt-2">(placeholder) Integrate with secure storage or S3 for production.</div>
        </div>
      </div>
    </div>
  )
}
