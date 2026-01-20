import React from 'react'
import DataTable from './DataTable'

function KpiLayout({ kpis, tableItems }) {
  return (
    <div className="momentum-layout">
      <div className="momentum-boxes">
        {kpis.map((kpi, index) => (
          <div key={index} className="stat-box">
            <span className={`stat-val ${kpi.colorClass}`}>{kpi.value}</span>
            <span className="stat-lbl">{kpi.label}</span>
          </div>
        ))}
      </div>
      <DataTable items={tableItems} />
    </div>
  )
}

export default KpiLayout
