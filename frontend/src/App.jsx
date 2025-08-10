import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export default function App() {
  const [summary, setSummary] = useState(null)
  const [ts, setTs] = useState([])
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/health`).then(r=>r.json()).then(setHealth).catch(()=>setHealth({status:'error'}))
    fetch(`${API_BASE}/api/sentiment/summary`).then(r=>r.json()).then(setSummary)
    fetch(`${API_BASE}/api/sentiment/timeseries`).then(r=>r.json()).then(setTs)
  }, [])

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-1">PulseBoard</h1>
      <p className="text-gray-600 mb-6">Monitoring + NLP insights</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Service Health</h2>
          <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(health, null, 2)}</pre>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Sentiment Summary</h2>
          <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(summary, null, 2)}</pre>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Metrics Tips</h2>
          <ul className="text-sm list-disc pl-5">
            <li>Prometheus: <code>/metrics</code> on backend</li>
            <li>Try hitting: <code>{API_BASE}/api/sentiment/summary</code></li>
            <li>Grafana dashboard included</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <h2 className="font-semibold mb-2">Daily Sentiment (pos/neg/neu)</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={ts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pos" dot={false} />
              <Line type="monotone" dataKey="neg" dot={false} />
              <Line type="monotone" dataKey="neu" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
