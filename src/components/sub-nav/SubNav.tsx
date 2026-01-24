import { ReactNode } from 'react'

/**
 * @component SubNav
 * @purpose Secondary navigation bar for contextual actions
 * @where Below primary navigation, section-specific controls
 * @not-for Primary navigation (use MainNav/NavTabs), breadcrumbs (use Breadcrumb)
 *
 * @variant isVisible - true | false - Controls visibility
 *
 * @uses None (container component)
 * @related NavTabs, MainNav
 */

interface SubNavProps {
  children?: ReactNode
  isVisible?: boolean
}

export default function SubNav({ children, isVisible = true }: SubNavProps) {
  if (!isVisible) return null

  return (
    <nav className="sub-nav">
      <div className="sub-nav-content">
        {children || (
          <div className="sub-nav-placeholder">
            <span className="action-label-sm">Sub Navigation</span>
          </div>
        )}
      </div>
    </nav>
  )
}
