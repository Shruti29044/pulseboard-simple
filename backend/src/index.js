import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import client from 'prom-client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Health
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

// Metrics (Prometheus)
const register = new client.Registry()
client.collectDefaultMetrics({ register })

const reqs = new client.Counter({ name:'pulse_http_requests_total', help:'Total HTTP requests', labelNames:['route','code','method'] })
register.registerMetric(reqs)

const latency = new client.Histogram({
  name: 'pulse_http_request_duration_seconds',
  help: 'Request duration (s)',
  labelNames: ['route','method','code'],
  buckets: [0.02,0.05,0.1,0.2,0.5,1,2,5]
})
register.registerMetric(latency)

const cpuGauge = new client.Gauge({ name:'pulse_cpu_usage_percent', help:'Simulated CPU %'})
const memGauge = new client.Gauge({ name:'pulse_memory_usage_percent', help:'Simulated Memory %'})
register.registerMetric(cpuGauge); register.registerMetric(memGauge)

setInterval(()=>{
  cpuGauge.set(20 + Math.random()*70)
  memGauge.set(30 + Math.random()*60)
}, 4000)

app.use((req, res, next) => {
  const start = process.hrtime.bigint()
  const end = res.end
  res.end = function(...args){
    const dur = Number(process.hrtime.bigint() - start)/1e9
    reqs.inc({ route: req.path, code: res.statusCode, method: req.method })
    latency.labels(req.path, req.method, String(res.statusCode)).observe(dur)
    end.apply(this, args)
  }
  next()
})

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

// NLP Sentiment (rule-based)
function sentimentScore(text){
  const pos = ['good','great','excellent','amazing','love','happy','fast','reliable','easy','awesome','nice','best','quick']
  const neg = ['bad','terrible','slow','hate','poor','buggy','awful','worse','worst','confusing','down','error','crash']
  const tokens = (text || '').toLowerCase().split(/[^a-z]+/)
  let score = 0
  for(const t of tokens){
    if (pos.includes(t)) score += 1
    if (neg.includes(t)) score -= 1
  }
  return score
}

const reviewsPath = path.join(__dirname, '../data/reviews.json')
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'))

app.get('/api/sentiment/summary', (_req, res) => {
  let pos=0, neg=0, neu=0
  let total = 0
  for(const r of reviews){
    const s = sentimentScore(r.text)
    total++
    if (s > 0) pos++
    else if (s < 0) neg++
    else neu++
  }
  res.json({ total, positive: pos, negative: neg, neutral: neu })
})

app.get('/api/sentiment/timeseries', (_req, res) => {
  // build a tiny timeseries by day from the mock dataset
  const byDay = {}
  for(const r of reviews){
    const d = r.created_at
    byDay[d] = byDay[d] || { date: d, pos:0, neg:0, neu:0 }
    const s = sentimentScore(r.text)
    if (s>0) byDay[d].pos++
    else if (s<0) byDay[d].neg++
    else byDay[d].neu++
  }
  res.json(Object.values(byDay))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Backend on http://localhost:${PORT}`))
