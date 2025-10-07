import React, {useState} from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function amortization(principal, annualRate, years){
  const monthlyRate = (annualRate/100)/12
  const n = years*12
  const payment = (principal * monthlyRate) / (1 - Math.pow(1+monthlyRate, -n))
  let balance = principal
  const balances = []
  for(let i=0;i<=n;i++){
    balances.push(balance)
    const interest = balance*monthlyRate
    const principalPay = payment - interest
    balance -= principalPay
  }
  return {payment: Number(payment.toFixed(2)), balances}
}

export default function Calculator(){
  const [principal, setPrincipal] = useState(450000)
  const [rate, setRate] = useState(4.0)
  const [years, setYears] = useState(25)

  const result = amortization(principal, rate, years)
  const chartData = {
    labels: result.balances.map((_,i)=> i),
    datasets: [{
      label: 'Remaining Balance',
      data: result.balances,
      borderColor: '#0ea5e9',
      backgroundColor: 'rgba(14,165,233,0.15)'
    }]
  }

  return (
    <section id="calculator" className="py-12">
      <h2 className="text-2xl font-bold mb-6">Mortgage Calculator</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <Input label="Property Price" type="number" value={principal} onChange={e=>setPrincipal(Number(e.target.value))} />
          <Input label="Annual Rate (%)" type="number" step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} />
          <div className="flex items-center gap-3">
            <Button onClick={()=>setRate(3.25)}>Use 3.25%</Button>
            <Input label="Amortization (years)" type="number" value={years} onChange={e=>setYears(Number(e.target.value))} className="max-w-[120px]" />
          </div>

          <div className="mt-4">
            <div className="text-sm text-slate-600">Estimated Monthly Payment</div>
            <div className="text-2xl font-semibold">${result.payment.toLocaleString()}</div>
          </div>
        </Card>

        <Card>
          <Line data={chartData} />
        </Card>
      </div>
    </section>
  )
}
