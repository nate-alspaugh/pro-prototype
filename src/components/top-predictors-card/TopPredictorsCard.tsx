import { useRef } from 'react'
import { useCardHover } from '../../hooks'
import TopPredictorCard from '../top-predictor-card'

/**
 * @component TopPredictorsCard
 * @purpose Display ranked list of top analyst predictors in a card
 * @where Dashboard, analyst insights section
 * @not-for Generic leaderboards (extend this pattern), single predictor (use TopPredictorCard)
 *
 * @variant None (composition of TopPredictorCards)
 *
 * @uses Card (base), TopPredictorCard, useCardHover hook
 * @related Card (base), TopPredictorCard (child)
 */

interface PredictorData {
  rank: string
  accuracy: number
  accuracyColor: string
  name: string
  firm: string
  smartScore: number
  smartScoreColor: string
  sampleSize: string
  avgError: string
}

const predictors: PredictorData[] = [
  {
    rank: '1st',
    accuracy: 86,
    accuracyColor: 'accent-green',
    name: 'Nick Mckay',
    firm: 'Freedom Capital Markets',
    smartScore: 88,
    smartScoreColor: 'accent-green',
    sampleSize: '56 PREDICTIONS',
    avgError: '±23.4%'
  },
  {
    rank: '2nd',
    accuracy: 75,
    accuracyColor: 'accent-green',
    name: 'Mathew Thorton',
    firm: 'Truist Securities',
    smartScore: 77,
    smartScoreColor: 'accent-green',
    sampleSize: '44 PREDICTIONS',
    avgError: '±23.4%'
  },
  {
    rank: '3rd',
    accuracy: 73,
    accuracyColor: 'accent-yellow',
    name: 'Mike Hickey',
    firm: 'Benchmark Company',
    smartScore: 73,
    smartScoreColor: 'accent-yellow',
    sampleSize: '48 PREDICTIONS',
    avgError: '±23.4%'
  }
]

export default function TopPredictorsCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  useCardHover(cardRef)

  return (
    <div ref={cardRef} className="card">
      <div className="card-header">
        <h2>Top analyst predictors</h2>
      </div>
      <div className="card-body predictors-layout">
        {predictors.map((predictor) => (
          <TopPredictorCard key={predictor.rank} {...predictor} />
        ))}
      </div>
    </div>
  )
}
