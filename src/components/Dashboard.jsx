import { motion } from 'framer-motion'
import Header from './Header'
import NavTabs from './NavTabs'
import SummaryCard from './SummaryCard'
import GaugeLayout from './GaugeLayout'
import KpiLayout from './KpiLayout'
import TopPredictorsCard from './TopPredictorsCard'
import TrustAnalysisCard from './TrustAnalysisCard'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart approximation
    }
  })
}

function Dashboard() {
  return (
    <div className="dashboard-container">
      <motion.div 
        className="top-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Header />
        <NavTabs />
      </motion.div>

      <main className="dashboard-main">
        <div className="dashboard-grid-top">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={{ height: '100%', display: 'flex' }}
          >
            <SummaryCard 
              title="Analyst consensus" 
              badge="BUY" 
              variant="positive"
            >
              <GaugeLayout 
                percentage={88} 
                label="BUY" 
                tableItems={[
                  { label: 'Target price', value: '$132.94' },
                  { label: 'Agreement', value: '94%' },
                  { label: 'Confidence', value: '92%' },
                  { label: 'Stability', value: '82%' }
                ]} 
              />
            </SummaryCard>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={{ height: '100%', display: 'flex' }}
          >
            <SummaryCard 
              title="Rating momentum" 
              badge="BEARISH" 
              variant="negative"
            >
              <KpiLayout 
                kpis={[
                  { label: 'UPGRADES', value: '0' },
                  { label: 'DOWNGRADES', value: '1', colorClass: 'text-red' }
                ]}
                tableItems={[
                  { label: 'Net change', value: '-1' },
                  { label: 'Velocity', value: '-100%' },
                  { label: 'Price target momentum', value: '-2273%' }
                ]}
              />
            </SummaryCard>
          </motion.div>
        </div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <TopPredictorsCard />
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <TrustAnalysisCard />
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
