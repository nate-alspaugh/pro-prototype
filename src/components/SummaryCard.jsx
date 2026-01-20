import { useRef } from 'react'
import { useCardHover } from '../hooks/useCardHover'
import Chip from './Chip'

function SummaryCard({ title, badge, variant = 'positive', children }) {
  const cardRef = useRef(null)
  useCardHover(cardRef)

  const variantClass = variant === 'positive' ? 'card-glow-green' : 'card-glow-red'
  const chipVariant = variant === 'positive' ? 'success' : 'error'

  return (
    <div ref={cardRef} className={`card ${variantClass}`}>
      <div className="card-header">
        <h2>{title}</h2>
        {badge && <Chip variant={chipVariant}>{badge}</Chip>}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default SummaryCard
