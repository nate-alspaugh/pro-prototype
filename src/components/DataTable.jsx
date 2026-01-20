import React from 'react'

function DataTable({ items }) {
  return (
    <div className="data-list">
      {items.map((item, index) => (
        <div key={index} className="data-row">
          <span>{item.label}</span>
          <strong className={item.colorClass}>{item.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default DataTable
