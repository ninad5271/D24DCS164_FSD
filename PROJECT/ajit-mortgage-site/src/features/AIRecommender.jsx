import React, {useState} from 'react'

export default function AIRecommender(){
  const [income, setIncome] = useState(90000)
  const [down, setDown] = useState(20000)
  const [goal, setGoal] = useState('buy')
  const [result, setResult] = useState(null)

  function suggest(){
    // Simple heuristic: LTV and income ratio
    const maxLoan = income * 4
    const suggested = Math.round(maxLoan + down)
    setResult({loan: suggested, reason: 'Estimated borrowing capacity based on income ×4.'})
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="font-semibold">AI Mortgage Recommendation</h3>
      <div className="mt-3 space-y-2">
        <input type="number" value={income} onChange={e=>setIncome(Number(e.target.value))} className="w-full p-2 border rounded" />
        <input type="number" value={down} onChange={e=>setDown(Number(e.target.value))} className="w-full p-2 border rounded" />
        <select value={goal} onChange={e=>setGoal(e.target.value)} className="w-full p-2 border rounded">
          <option value="buy">Buy</option>
          <option value="refinance">Refinance</option>
        </select>
        <button onClick={suggest} className="px-4 py-2 bg-ajit text-white rounded">Suggest Plan</button>
        {result && (
          <div className="mt-3 p-3 bg-sky-50 rounded">
            <div className="font-semibold">Suggested Loan: ${result.loan.toLocaleString()}</div>
            <div className="text-sm text-slate-600">{result.reason}</div>
          </div>
        )}
      </div>
    </div>
  )
}
