import React, { useState, useMemo } from 'react'
import SummaryCard from './SummaryCard'
import GaugeLayout from './GaugeLayout'
import KpiLayout from './KpiLayout'
import TopPredictorsCard from './TopPredictorsCard'
import TrustAnalysisCard from './TrustAnalysisCard'
import NavTabs from './NavTabs'
import Header from './Header'
import Chip from './Chip'

// Design Tokens Component
const DesignTokens = () => {
  const textSizes = [
    { name: '2xs', value: '12px' },
    { name: 'xs', value: '14px' },
    { name: 's', value: '16px' },
    { name: 'm', value: '18px' },
    { name: 'l', value: '20px' },
    { name: 'xl', value: '24px' },
    { name: '2xl', value: '28px' }
  ]

  const fontWeights = [
    { name: 'Book', value: '450', var: '--weight-book' },
    { name: 'Semi', value: '530', var: '--weight-semi' },
    { name: 'Bold', value: '700', var: '--weight-bold' }
  ]

  const spacingScale = [2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]

  const whiteAlpha = [
    { name: '100%', value: 'rgba(255, 255, 255, 1)', var: '--white-100' },
    { name: '90%', value: 'rgba(255, 255, 255, 0.9)', var: '--white-90' },
    { name: '80%', value: 'rgba(255, 255, 255, 0.8)', var: '--white-80' },
    { name: '70%', value: 'rgba(255, 255, 255, 0.7)', var: '--white-70' },
    { name: '60%', value: 'rgba(255, 255, 255, 0.6)', var: '--white-60' },
    { name: '50%', value: 'rgba(255, 255, 255, 0.5)', var: '--white-50' },
    { name: '40%', value: 'rgba(255, 255, 255, 0.4)', var: '--white-40' },
    { name: '30%', value: 'rgba(255, 255, 255, 0.3)', var: '--white-30' },
    { name: '20%', value: 'rgba(255, 255, 255, 0.2)', var: '--white-20' },
    { name: '10%', value: 'rgba(255, 255, 255, 0.1)', var: '--white-10' },
    { name: '5%', value: 'rgba(255, 255, 255, 0.05)', var: '--white-5' },
    { name: '2.5%', value: 'rgba(255, 255, 255, 0.025)', var: '--white-2-5' },
    { name: '0%', value: 'rgba(255, 255, 255, 0)', var: '--white-0' }
  ]

  const blackAlpha = [
    { name: '100%', value: 'rgba(0, 0, 0, 1)', var: '--black-100' },
    { name: '90%', value: 'rgba(0, 0, 0, 0.9)', var: '--black-90' },
    { name: '80%', value: 'rgba(0, 0, 0, 0.8)', var: '--black-80' },
    { name: '70%', value: 'rgba(0, 0, 0, 0.7)', var: '--black-70' },
    { name: '60%', value: 'rgba(0, 0, 0, 0.6)', var: '--black-60' },
    { name: '50%', value: 'rgba(0, 0, 0, 0.5)', var: '--black-50' },
    { name: '40%', value: 'rgba(0, 0, 0, 0.4)', var: '--black-40' },
    { name: '30%', value: 'rgba(0, 0, 0, 0.3)', var: '--black-30' },
    { name: '20%', value: 'rgba(0, 0, 0, 0.2)', var: '--black-20' },
    { name: '10%', value: 'rgba(0, 0, 0, 0.1)', var: '--black-10' },
    { name: '5%', value: 'rgba(0, 0, 0, 0.05)', var: '--black-5' },
    { name: '2.5%', value: 'rgba(0, 0, 0, 0.025)', var: '--black-2-5' },
    { name: '0%', value: 'rgba(0, 0, 0, 0)', var: '--black-0' }
  ]

  const borderRadius = [
    { name: '2px', value: '2px', usage: 'Small elements' },
    { name: '4px', value: '4px', usage: 'Standard elements' },
    { name: '8px', value: '8px', usage: 'Cards, containers' },
    { name: '12px', value: '12px', usage: 'Large cards' },
    { name: '16px', value: '16px', usage: 'Extra large containers' },
    { name: '9000', value: '9999px', usage: 'Full/Pill shape' }
  ]

  const semanticColors = [
    { name: 'surface-0', value: '#0C0D0D', description: 'Base Gray' },
    { name: 'surface-1', value: 'rgba(255, 255, 255, 0.05)', description: 'White 5%' },
    { name: 'surface-2', value: 'rgba(255, 255, 255, 0.025)', description: 'White 2.5%' },
    { name: 'txt-primary', value: 'rgba(255, 255, 255, 0.9)', description: 'White 90%' },
    { name: 'txt-secondary', value: 'rgba(255, 255, 255, 0.6)', description: 'White 60%' },
    { name: 'txt-tertiary', value: 'rgba(255, 255, 255, 0.4)', description: 'White 40%' },
    { name: 'accent-green', value: '#30A46C', description: 'Green' },
    { name: 'accent-blue', value: '#2563EB', description: 'Blue' },
    { name: 'accent-red', value: '#E5484D', description: 'Red' },
    { name: 'accent-yellow', value: '#F5D90A', description: 'Yellow' }
  ]

  return (
    <div className="flex flex-col gap-10 py-6">
      {/* Typography */}
      <section className="flex flex-col gap-6">
        <h3 className="text-[20px] font-[530] text-txt-primary m-0 pb-3 border-b border-surface-1">Typography</h3>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Font Families</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            <div className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-2">
              <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">Primary (UI)</div>
              <div className="text-base font-[450] text-txt-primary" style={{ fontFamily: 'var(--font-ui)' }}>General Sans</div>
              <div className="text-xs font-mono text-txt-tertiary mt-1">--font-ui</div>
            </div>
            <div className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-2">
              <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">Mono (Numbers/Data)</div>
              <div className="text-base font-[450] text-txt-primary font-mono">JetBrains Mono</div>
              <div className="text-xs font-mono text-txt-tertiary mt-1">--font-mono</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Font Weights</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {fontWeights.map(fw => (
              <div key={fw.name} className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">{fw.name}</div>
                <div className="text-base text-txt-primary font-mono" style={{ fontWeight: fw.value }}>{fw.value}</div>
                <div className="text-xs font-mono text-txt-tertiary mt-1">{fw.var}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Text Sizes</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {textSizes.map(size => (
              <div key={size.name} className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">{size.name}</div>
                <div className="text-txt-primary font-mono" style={{ fontSize: size.value }}>{size.value}</div>
                <div className="text-xs font-mono text-txt-tertiary mt-1">size: {size.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Line Heights</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            <div className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-2">
              <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">Single-line</div>
              <div className="text-base text-txt-primary leading-none">100% (1.0)</div>
              <div className="text-xs font-mono text-txt-tertiary mt-1">leading-none</div>
            </div>
            <div className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-2">
              <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">Multi-line</div>
              <div className="text-base text-txt-primary leading-relaxed">150% (1.5)</div>
              <div className="text-xs font-mono text-txt-tertiary mt-1">leading-relaxed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="flex flex-col gap-6">
        <h3 className="text-[20px] font-[530] text-txt-primary m-0 pb-3 border-b border-surface-1">Spacing</h3>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Spacing Scale (px)</h4>
          <div className="flex flex-wrap gap-4 items-end p-6 bg-surface-2 border border-surface-1 rounded-lg">
            {spacingScale.map(spacing => (
              <div key={spacing} className="flex flex-col items-center gap-2">
                <div className="bg-accent-blue rounded-sm" style={{ width: `${spacing}px`, height: `${spacing}px`, minWidth: '2px', minHeight: '2px' }}></div>
                <div className="text-xs font-mono text-txt-secondary">{spacing}px</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-txt-tertiary italic mt-2">Base unit: 4px | Smallest exception: 2px</div>
        </div>
      </section>

      {/* Colors */}
      <section className="flex flex-col gap-6">
        <h3 className="text-[20px] font-[530] text-txt-primary m-0 pb-3 border-b border-surface-1">Colors</h3>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Semantic Colors</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {semanticColors.map(color => (
              <div key={color.name} className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">{color.name}</div>
                <div className="w-full h-12 rounded border border-surface-1 my-2" style={{ backgroundColor: color.value }}></div>
                <div className="text-base font-[450] text-txt-primary font-mono">{color.value}</div>
                <div className="text-xs text-txt-tertiary italic">{color.description}</div>
                <div className="text-xs font-mono text-txt-tertiary mt-1">--{color.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">White Alpha Scale</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 p-6 bg-surface-2 border border-surface-1 rounded-lg">
            {whiteAlpha.map(alpha => (
              <div key={alpha.name} className="flex flex-col items-center gap-2">
                <div className="w-full h-10 rounded border border-surface-1 bg-surface-0" style={{ backgroundColor: alpha.value }}></div>
                <div className="text-xs font-[530] text-txt-primary font-mono">{alpha.name}</div>
                <div className="text-[10px] font-mono text-txt-tertiary text-center">{alpha.var}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Black Alpha Scale</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 p-6 bg-surface-2 border border-surface-1 rounded-lg">
            {blackAlpha.map(alpha => (
              <div key={alpha.name} className="flex flex-col items-center gap-2">
                <div className="w-full h-10 rounded border border-surface-1 bg-white" style={{ backgroundColor: alpha.value }}></div>
                <div className="text-xs font-[530] text-txt-primary font-mono">{alpha.name}</div>
                <div className="text-[10px] font-mono text-txt-tertiary text-center">{alpha.var}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Borders */}
      <section className="flex flex-col gap-6">
        <h3 className="text-[20px] font-[530] text-txt-primary m-0 pb-3 border-b border-surface-1">Borders</h3>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Border Width</h4>
          <div className="bg-surface-2 border border-surface-1 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">Default</div>
                <div className="w-32 h-16 bg-surface-0 rounded border" style={{ borderWidth: '1px', borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                <div className="text-xs font-mono text-txt-tertiary">1px</div>
              </div>
              <div className="text-xs text-txt-tertiary italic">Strictly applied to all bordered elements</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Border Radius</h4>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
            {borderRadius.map(radius => (
              <div key={radius.name} className="bg-surface-2 border border-surface-1 rounded-lg p-4 flex flex-col gap-3">
                <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">{radius.name}</div>
                <div className="w-full h-16 bg-surface-0" style={{ borderRadius: radius.value }}></div>
                <div className="text-xs font-mono text-txt-tertiary">{radius.value}</div>
                <div className="text-xs text-txt-tertiary italic">{radius.usage}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-[450] text-txt-secondary m-0">Card Border</h4>
          <div className="bg-surface-2 border border-surface-1 rounded-lg p-6">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-[530] text-txt-secondary uppercase tracking-wider">card-border</div>
              <div className="w-full h-20 bg-surface-0 rounded-lg relative" style={{
                background: 'var(--card-bg-0)',
                backdropFilter: 'blur(200px)'
              }}>
                <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                  padding: '1px',
                  background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude'
                }}></div>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div><span className="font-[530] text-txt-secondary">Width:</span> <span className="font-mono text-txt-primary">1px</span></div>
                <div><span className="font-[530] text-txt-secondary">Style:</span> <span className="font-mono text-txt-primary">Linear Gradient (45deg, White 10% → White 5%)</span></div>
                <div className="text-xs font-mono text-txt-tertiary mt-1">--card-border</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="flex flex-col gap-6">
        <h3 className="text-[20px] font-[530] text-txt-primary m-0 pb-3 border-b border-surface-1">Buttons</h3>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-[450] text-txt-secondary m-0">Button Primary (High Fidelity)</h4>
            <div className="bg-surface-2 border border-surface-1 rounded-lg p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 rounded-lg font-[450] text-[16px] leading-none relative overflow-hidden" style={{
                    color: '#0C0D0D',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.7) 100%)',
                    border: 'none'
                  }}>
                    <span className="relative z-10">Primary Button</span>
                    {/* Outer border */}
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                      padding: '1px',
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude'
                    }}></div>
                    {/* Inner border */}
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                      padding: '0.5px',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.3) 100%)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude'
                    }}></div>
                  </button>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div><span className="font-[530] text-txt-secondary">Label:</span> <span className="font-mono text-txt-primary">Base Gray (#0C0D0D) | Weight: 450</span></div>
                  <div><span className="font-[530] text-txt-secondary">Background:</span> <span className="font-mono text-txt-primary">Linear Gradient (Top → Bottom): White 80% → White 70%</span></div>
                  <div><span className="font-[530] text-txt-secondary">Outer Border:</span> <span className="font-mono text-txt-primary">card-border (White 10% → White 5%)</span></div>
                  <div><span className="font-[530] text-txt-secondary">Inner Border:</span> <span className="font-mono text-txt-primary">0.5px, Gradient: White 100% → Transparent → Black 30%</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-base font-[450] text-txt-secondary m-0">Button Secondary (Glass/Ghost)</h4>
            <div className="bg-surface-2 border border-surface-1 rounded-lg p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 rounded-lg font-[450] text-[16px] leading-none relative overflow-hidden" style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    border: 'none'
                  }}>
                    <span className="relative z-10">Secondary Button</span>
                    {/* Outer border */}
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                      padding: '1px',
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude'
                    }}></div>
                    {/* Inner border */}
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                      boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.2)'
                    }}></div>
                  </button>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div><span className="font-[530] text-txt-secondary">Label:</span> <span className="font-mono text-txt-primary">txt-secondary (White 60%) | Weight: 450</span></div>
                  <div><span className="font-[530] text-txt-secondary">Background:</span> <span className="font-mono text-txt-primary">Linear Gradient (Top → Bottom): White 0% → White 10%</span></div>
                  <div><span className="font-[530] text-txt-secondary">Outer Border:</span> <span className="font-mono text-txt-primary">card-border (White 10% → White 5%)</span></div>
                  <div><span className="font-[530] text-txt-secondary">Inner Border:</span> <span className="font-mono text-txt-primary">0.5px, Black 20% (Solid inset shadow)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const componentsList = [
  {
    id: 'design-tokens',
    name: 'Design Tokens',
    description: 'Typography, spacing, and color tokens used throughout the design system.',
    category: 'Foundation',
    properties: [],
    render: () => <DesignTokens />
  },
  {
    id: 'chip',
    name: 'Chip',
    description: 'A compact element used to represent status, categories, or badges.',
    category: 'Elements',
    properties: [
      { id: 'variant', name: 'Variant', type: 'select', options: ['success', 'error', 'warning', 'info', 'neutral'], default: 'success' },
      { id: 'filled', name: 'Filled', type: 'boolean', default: true },
      { id: 'label', name: 'Label', type: 'select', options: ['BUY', 'SELL', 'HOLD', 'BEARISH', 'UPGRADE', 'DOWNGRADE'], default: 'BUY' }
    ],
    render: (props) => (
      <Chip variant={props.variant} filled={props.filled}>
        {props.label}
      </Chip>
    )
  },
  {
    id: 'summary-card',
    name: 'Summary Card',
    description: 'A versatile card component with positive/negative variants and swappable layouts (Gauge or KPI).',
    category: 'Cards',
    properties: [
      { id: 'variant', name: 'Variant', type: 'select', options: ['positive', 'negative'], default: 'positive' },
      { id: 'layout', name: 'Layout', type: 'select', options: ['gauge', 'kpi'], default: 'gauge' },
      { id: 'showBadge', name: 'Show Badge', type: 'boolean', default: true }
    ],
    render: (props) => {
      const isGauge = props.layout === 'gauge'
      const tableItems = isGauge ? [
        { label: 'Target price', value: '$132.94' },
        { label: 'Agreement', value: '94%' },
        { label: 'Confidence', value: '92%' },
        { label: 'Stability', value: '82%' }
      ] : [
        { label: 'Net change', value: '-1' },
        { label: 'Velocity', value: '-100%' },
        { label: 'Price target momentum', value: '-2273%' }
      ]

      return (
        <SummaryCard 
          title={isGauge ? "Analyst consensus" : "Rating momentum"} 
          badge={props.showBadge ? (props.variant === 'positive' ? "BUY" : "BEARISH") : null} 
          variant={props.variant}
        >
          {isGauge ? (
            <GaugeLayout 
              percentage={88} 
              label="BUY" 
              tableItems={tableItems} 
            />
          ) : (
            <KpiLayout 
              kpis={[
                { label: 'UPGRADES', value: '0' },
                { label: 'DOWNGRADES', value: '1', colorClass: props.variant === 'negative' ? 'text-red' : '' }
              ]}
              tableItems={tableItems}
            />
          )}
        </SummaryCard>
      )
    }
  },
  {
    id: 'top-predictors',
    name: 'Top Predictors',
    description: 'Lists top performing analysts with their accuracy scores.',
    category: 'Cards',
    properties: [],
    render: () => <TopPredictorsCard />
  },
  {
    id: 'trust-analysis',
    name: 'Trust Analysis',
    description: 'Detailed breakdown of trust factors and source credibility.',
    category: 'Cards',
    properties: [],
    render: () => <TrustAnalysisCard />
  },
  {
    id: 'nav-tabs',
    name: 'Navigation Tabs',
    description: 'Parallax-glow navigation tabs with custom hover effects.',
    category: 'Navigation',
    properties: [],
    render: () => <NavTabs />
  }
]

const ComponentCatalogue = ({ initialComponentId, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComponentId, setSelectedComponentId] = useState(initialComponentId)
  const [componentProps, setComponentProps] = useState({})

  // Sync state if initialComponentId changes via command palette
  React.useEffect(() => {
    setSelectedComponentId(initialComponentId)
    if (initialComponentId) {
      const comp = componentsList.find(c => c.id === initialComponentId)
      if (comp) {
        const defaults = {}
        comp.properties?.forEach(p => defaults[p.id] = p.default)
        setComponentProps(defaults)
      }
    }
  }, [initialComponentId])

  const filteredComponents = useMemo(() => {
    return componentsList.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handlePropChange = (id, value) => {
    setComponentProps(prev => ({ ...prev, [id]: value }))
  }

  const categories = useMemo(() => {
    const cats = new Set(componentsList.map(c => c.category))
    return Array.from(cats)
  }, [])

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

        <div className={`catalogue-detail-content ${selectedComponentId === 'design-tokens' ? 'full-width' : ''}`}>
          <div className="component-preview-box">
            <div className="preview-label">PREVIEW</div>
            <div className="preview-stage">
              {selectedComponent.render(componentProps)}
            </div>
          </div>

          {selectedComponentId !== 'design-tokens' && (
            <div className="component-properties-panel">
              <div className="panel-header">PROPERTIES</div>
              <div className="properties-list">
                {selectedComponent.properties?.length > 0 ? (
                  selectedComponent.properties.map(prop => (
                    <div key={prop.id} className="prop-item">
                      <label>{prop.name}</label>
                      {prop.type === 'select' ? (
                        <select 
                          value={componentProps[prop.id] || prop.default} 
                          onChange={(e) => handlePropChange(prop.id, e.target.value)}
                        >
                          {prop.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : prop.type === 'boolean' ? (
                        <div 
                          className={`toggle-switch ${componentProps[prop.id] ? 'on' : ''}`}
                          onClick={() => handlePropChange(prop.id, !componentProps[prop.id])}
                        >
                          <div className="toggle-thumb"></div>
                        </div>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="no-props">No adjustable properties</div>
                )}
              </div>

              <div className="panel-header" style={{ marginTop: '32px' }}>DESCRIPTION</div>
              <p className="prop-description">{selectedComponent.description}</p>
            </div>
          )}
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
        {categories.map(category => {
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
                        const defaults = {}
                        component.properties?.forEach(p => defaults[p.id] = p.default)
                        setComponentProps(defaults)
                      }
                    }}
                  >
                    <div className="card-preview">
                      <div className="mini-preview">
                        {component.render(component.properties?.reduce((acc, p) => ({ ...acc, [p.id]: p.default }), {}) || {})}
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
