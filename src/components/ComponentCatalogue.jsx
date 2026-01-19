import React, { useState, useMemo } from 'react'
import AnalystConsensusCard from './AnalystConsensusCard'
import RatingMomentumCard from './RatingMomentumCard'
import TopPredictorsCard from './TopPredictorsCard'
import TrustAnalysisCard from './TrustAnalysisCard'
import NavTabs from './NavTabs'
import Header from './Header'

const componentsList = [
  {
    id: 'analyst-consensus',
    name: 'Analyst Consensus',
    description: 'Displays buy/sell sentiment with a circular gauge and key metrics.',
    category: 'Cards',
    component: <AnalystConsensusCard />
  },
  {
    id: 'rating-momentum',
    name: 'Rating Momentum',
    description: 'Visualizes rating changes over time with an area chart.',
    category: 'Cards',
    component: <RatingMomentumCard />
  },
  {
    id: 'top-predictors',
    name: 'Top Predictors',
    description: 'Lists top performing analysts with their accuracy scores.',
    category: 'Cards',
    component: <TopPredictorsCard />
  },
  {
    id: 'trust-analysis',
    name: 'Trust Analysis',
    description: 'Detailed breakdown of trust factors and source credibility.',
    category: 'Cards',
    component: <TrustAnalysisCard />
  },
  {
    id: 'nav-tabs',
    name: 'Navigation Tabs',
    description: 'Parallax-glow navigation tabs with custom hover effects.',
    category: 'Navigation',
    component: <NavTabs />
  }
]

const ComponentCatalogue = ({ initialComponentId, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComponentId, setSelectedComponentId] = useState(initialComponentId)

  // Sync state if initialComponentId changes via command palette
  React.useEffect(() => {
    setSelectedComponentId(initialComponentId)
  }, [initialComponentId])

  const filteredComponents = useMemo(() => {
    return componentsList.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const selectedComponent = componentsList.find(c => c.id === selectedComponentId)

  if (selectedComponent) {
    return (
      <div className="catalogue-page">
        <div className="catalogue-detail-header">
          <button className="btn-secondary back-btn" onClick={() => {
            if (onNavigate) {
              onNavigate(null)
            } else {
              setSelectedComponentId(null)
            }
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to List
          </button>
          <div className="header-info">
            <h1>{selectedComponent.name}</h1>
            <span className="category-tag">{selectedComponent.category}</span>
          </div>
        </div>

        <div className="catalogue-detail-content">
          <div className="component-preview-box">
            <div className="preview-label">PREVIEW</div>
            <div className="preview-stage">
              {selectedComponent.component}
            </div>
          </div>

          <div className="component-info-pane">
            <section className="info-section">
              <h3>Description</h3>
              <p>{selectedComponent.description}</p>
            </section>
            
            <section className="info-section">
              <h3>Properties</h3>
              <div className="props-table">
                <div className="prop-row header">
                  <span>Prop</span>
                  <span>Type</span>
                  <span>Default</span>
                </div>
                <div className="prop-row">
                  <span>variant</span>
                  <span>'default' | 'compact'</span>
                  <span>'default'</span>
                </div>
                <div className="prop-row">
                  <span>theme</span>
                  <span>'dark' | 'light'</span>
                  <span>'dark'</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="catalogue-page">
      <Header title="Catalogue" subtitle="Component Library" showLogo={false} />
      
      <div className="catalogue-search-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search components..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="catalogue-search-input"
        />
      </div>

      <div className="catalogue-content">
        {['Cards', 'Navigation'].map(category => {
          const catComponents = filteredComponents.filter(c => c.category === category)
          if (catComponents.length === 0) return null

          return (
            <section key={category} className="catalogue-section">
              <h2>{category}</h2>
              <div className="catalogue-grid">
                {catComponents.map(component => (
                  <div 
                    key={component.id} 
                    className="catalogue-card"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(component.id)
                      } else {
                        setSelectedComponentId(component.id)
                      }
                    }}
                  >
                    <div className="card-preview">
                      <div className="mini-preview">
                        {component.component}
                      </div>
                    </div>
                    <div className="card-info">
                      <h3>{component.name}</h3>
                      <p>{component.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default ComponentCatalogue
