import React from 'react'

const Container = ({ children, className }) => {
  return (
    <div className={className + " py-8 px-8 min-h-screen w-full bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 via-slate-600/40 to-green-500/40 text-white"}>
      {children}
    </div>
  )
}

export default Container
