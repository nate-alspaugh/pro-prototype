import { useRef, ReactNode } from 'react'
import { useCardHover } from '../../hooks'

/**
 * @component Card
 * @purpose Base container with glassmorphism styling and hover effects
 * @where Dashboard sections, content grouping, feature highlights
 * @not-for Full-width sections (use Section), inline content (use Box)
 *
 * @variant None (base component, extend via SummaryCard etc.)
 *
 * @uses useCardHover hook
 * @related SummaryCard (extends with status), TopPredictorsCard (extends with data)
 */

interface CardProps {
  title: string
  badge?: ReactNode
  children: ReactNode
}

export default function Card({ title, badge, children }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  useCardHover(cardRef)

  return (
    <div ref={cardRef} className="card">
      <div className="card-header">
        <h2>{title}</h2>
        {badge && badge}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}
