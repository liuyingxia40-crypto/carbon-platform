import { lazy, Suspense } from 'react'
import type { EChartsOption } from 'echarts'
import { useIsMobile } from '../../hooks/useMediaQuery'
import './ChartCard.css'

const ReactECharts = lazy(() => import('echarts-for-react'))

interface ChartCardProps {
  title: string
  description?: string
  option: EChartsOption
  height?: number
  mobileHeight?: number
  variant?: 'dark' | 'light'
  scrollable?: boolean
}

export default function ChartCard({
  title,
  description,
  option,
  height = 240,
  mobileHeight,
  variant = 'light',
  scrollable = false,
}: ChartCardProps) {
  const isMobile = useIsMobile()
  const chartHeight = isMobile ? (mobileHeight ?? Math.min(height, 210)) : height

  return (
    <div className={`chart-card chart-card--${variant}`}>
      <h4 className="chart-card-title">{title}</h4>
      {description && <p className="chart-card-desc">{description}</p>}
      <div
        className={`chart-card-body${scrollable ? ' chart-card-body--scroll' : ''}`}
      >
        <Suspense
          fallback={<div className="chart-loading">图表加载中…</div>}
        >
          <ReactECharts
            option={option}
            style={{ height: chartHeight, width: '100%', minWidth: scrollable ? 480 : undefined }}
            opts={{ renderer: 'svg' }}
            notMerge
            lazyUpdate
          />
        </Suspense>
      </div>
    </div>
  )
}
