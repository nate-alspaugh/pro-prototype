import React from 'react'
import { motion } from 'framer-motion'
import DataTable from './DataTable'

function GaugeLayout({ percentage, label, tableItems }) {
  const circumference = 251.2
  const offset = circumference - (circumference * percentage / 100)

  return (
    <div className="consensus-layout">
      <div className="gauge-wrapper">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
          <motion.circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="#00C853" 
            strokeWidth="8" 
            strokeDasharray={circumference} 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{
              duration: 1.5,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1] // easeOutExpo approximation
            }}
            transform="rotate(-90 50 50)"
            className="gauge-circle"
          />
        </svg>
        <div className="gauge-overlay-text">
          <span className="val">{percentage}%</span>
          <span className="lbl">{label}</span>
        </div>
      </div>
      <DataTable items={tableItems} />
    </div>
  )
}

export default GaugeLayout
