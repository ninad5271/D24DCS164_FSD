import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { motion } from 'framer-motion'
import Button from '../ui/Button'

const fetcher = url => axios.get(url).then(r=>r.data)

const SAMPLE_NEWS = [
  {title: 'Bank of Canada holds policy rate — impact on mortgages', url: 'https://www.bankofcanada.ca', created_at: new Date().toISOString()},
  {title: 'Tips for first-time home buyers in Canada', url: 'https://www.cmhc-schl.gc.ca', created_at: new Date(Date.now()-3600*1000).toISOString()},
  {title: 'How refinancing can lower monthly payments', url: '#', created_at: new Date(Date.now()-86400*1000).toISOString()},
]

function timeAgo(dateOrIso){
  try{
    const t = (typeof dateOrIso === 'number') ? dateOrIso : Date.parse(dateOrIso)
    const diff = Math.floor((Date.now() - t)/1000)
    if(diff < 60) return `${diff}s`
    if(diff < 3600) return `${Math.floor(diff/60)}m`
    if(diff < 86400) return `${Math.floor(diff/3600)}h`
    return `${Math.floor(diff/86400)}d`
  }catch(e){return ''}
}

function hostOf(url){
  try{ return new URL(url).hostname.replace(/^www\./,'') }catch(e){ return 'news' }
}

export default function NewsFeed(){
  // Use Hacker News Algolia API (CORS-friendly) to fetch finance/mortgage stories
  const api = 'https://hn.algolia.com/api/v1/search?query=mortgage+canada&tags=story'
  const {data,error,mutate} = useSWR(api, fetcher)

  const raw = (data && data.hits && data.hits.length>0) ? data.hits.slice(0,8) : SAMPLE_NEWS

  const stories = raw.map(h=>({
    title: h.title || h.story_title || 'Untitled',
    url: h.url || (h.objectID ? `https://news.ycombinator.com/item?id=${h.objectID}` : '#'),
    created_at: h.created_at || (h.created_at_i ? new Date(h.created_at_i*1000).toISOString() : undefined),
  }))

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">Mortgage & Finance News</h3>
          <div className="text-xs text-slate-500">Curated & live results — powered by Hacker News</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-500">{error ? 'Sample' : (data ? 'Live' : 'Loading…')}</div>
          <Button variant="outline" onClick={()=>mutate()} className="!px-3 !py-1 text-sm">Refresh</Button>
        </div>
      </div>

      <motion.ul layout className="mt-4 divide-y divide-slate-100 max-h-64 overflow-auto">
        {(!data && !error) ? (
          // loading skeleton
          Array.from({length:5}).map((_,i)=> (
            <li key={i} className="p-3">
              <div className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded" />
                <div className="flex-1">
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                </div>
              </div>
            </li>
          ))
        ) : (
          stories.map((n,i)=> (
            <li key={i} className="p-3 flex items-start gap-3">
              <div className="w-8 text-slate-400 mt-1 text-sm">{i+1}</div>
              <div className="flex-1">
                <a className="text-sm text-ajit font-medium hover:underline block truncate" href={n.url||'#'} target="_blank" rel="noreferrer">{n.title}</a>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                  <span>{hostOf(n.url)}</span>
                  {n.created_at && <span>• {timeAgo(n.created_at)}</span>}
                </div>
              </div>
            </li>
          ))
        )}
      </motion.ul>

      {error && <div className="mt-3 text-sm text-red-600">Could not fetch live news; showing sample items.</div>}
    </div>
  )
}
