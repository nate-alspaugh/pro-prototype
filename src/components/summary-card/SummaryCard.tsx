import { useRef, ReactNode } from 'react'
import { useCardHover } from '../../hooks'
import Chip from '../chip'

/**
 * @component SummaryCard
 * @purpose Display key metrics with positive/negative sentiment glow
 * @where Dashboard KPI sections, performance summaries, trend highlights
 * @not-for Detailed data tables (use DataTable), neutral content (use Card)
 *
 * @variant variant - positive | negative - Determines glow color (green/red)
 *
 * @uses Card (base), Chip, useCardHover hook
 * @related Card (base), KpiLayout (arranges multiple)
 */

interface SummaryCardProps {
  title: string
  badge?: string
  variant?: 'positive' | 'negative'
  children: ReactNode
}

export default function SummaryCard({ title, badge, variant = 'positive', children }: SummaryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
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
