import React, {useState} from 'react'

const questions = [
  {q:'Are you a Canadian resident?', key:'res'},
  {q:'Do you have a down payment >= 5%?', key:'down'},
  {q:'Is your credit score > 650?', key:'credit'},
]

export default function Quiz(){
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)

  function toggle(key,val){
    setAnswers(a=>({...a,[key]:val}))
  }

  function submit(){
    const pass = answers.res && answers.down && answers.credit
    setDone(pass)
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="font-semibold">Instant Prequalification Quiz</h3>
      <div className="mt-3 space-y-2">
        {questions.map(q=> (
          <div key={q.key} className="flex items-center gap-3">
            <div className="w-48">{q.q}</div>
            <button onClick={()=>toggle(q.key,true)} className={`px-3 py-1 border rounded ${answers[q.key] ? 'bg-ajit text-white':''}`}>Yes</button>
            <button onClick={()=>toggle(q.key,false)} className={`px-3 py-1 border rounded ${answers[q.key]===false ? 'bg-slate-300':''}`}>No</button>
          </div>
        ))}
        <div className="mt-3">
          <button onClick={submit} className="px-4 py-2 bg-ajit text-white rounded">Check</button>
          {done === true && <div className="mt-2 text-green-700">Likely prequalified — contact Ajit for next steps.</div>}
          {done === false && Object.keys(answers).length===questions.length && <div className="mt-2 text-red-700">Not prequalified, but talk to Ajit for options.</div>}
        </div>
      </div>
    </div>
  )
}
