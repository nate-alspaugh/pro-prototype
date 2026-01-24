import React from 'react'

/**
 * @component DataTable
 * @purpose Display key/value pairs in a compact list format
 * @where Card bodies, detail panels, summary sections
 * @not-for Full data grids (use Table), editable data (use Form)
 *
 * @variant None (data-driven display)
 *
 * @uses None (atomic component)
 * @related GaugeLayout (uses this), KpiLayout (uses this)
 */

interface DataTableItem {
  label: string
  value: string
  colorClass?: string
}

interface DataTableProps {
  items: DataTableItem[]
}

export default function DataTable({ items }: DataTableProps) {
  return (
    <div className="data-list">
      {items.map((item, index) => (
        <div key={index} className="data-row">
          <span>{item.label}</span>
          <strong className={`tabular-nums ${item.colorClass || ''}`}>{item.value}</strong>
        </div>
      ))}
    </div>
  )
}
