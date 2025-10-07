import React, {useEffect, useState} from 'react'

export default function DarkToggle(){
  const [theme, setTheme] = useState(() => {
    try{
      const saved = localStorage.getItem('theme')
      if(saved === 'dark' || saved === 'light') return saved
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }catch{
      return 'light'
    }
  })

  useEffect(()=>{
    const root = document.documentElement
    if(theme === 'dark'){
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try{ localStorage.setItem('theme', theme) }catch{}
  },[theme])

  function toggle(){
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <button onClick={toggle} aria-pressed={theme==='dark'} aria-label="Toggle dark mode" className="px-3 py-1 border rounded flex items-center gap-2">
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
      <span className="text-sm">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
