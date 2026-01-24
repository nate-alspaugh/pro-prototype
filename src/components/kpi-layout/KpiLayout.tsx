import React from 'react'
import DataTable from '../data-table'

/**
 * @component KpiLayout
 * @purpose Display large KPI boxes with supporting data table
 * @where SummaryCards, momentum displays, stat comparisons
 * @not-for Single metrics (use StatBox), charts (use GaugeLayout)
 *
 * @variant None (data-driven via props)
 *
 * @uses DataTable
 * @related GaugeLayout (alternative card content), SummaryCard (parent container)
 */

interface KpiItem {
  label: string
  value: string
  colorClass?: string
}

interface DataTableItem {
  label: string
  value: string
  colorClass?: string
}

interface KpiLayoutProps {
  kpis: KpiItem[]
  tableItems: DataTableItem[]
}

export default function KpiLayout({ kpis, tableItems }: KpiLayoutProps) {
  return (
    <div className="momentum-layout">
      <div className="momentum-boxes">
        {kpis.map((kpi, index) => (
          <div key={index} className="stat-box">
            <span className={`stat-val tabular-nums ${kpi.colorClass || ''}`}>{kpi.value}</span>
            <span className="stat-lbl">{kpi.label}</span>
          </div>
        ))}
      </div>
      <DataTable items={tableItems} />
    </div>
  )
}
