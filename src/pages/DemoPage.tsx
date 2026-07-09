import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../router/paths'
import ChartCard from '../components/charts/ChartCard'
import { CHART_DISCLAIMER } from '../components/charts/chartTheme'
import '../components/charts/ChartCard.css'
import {
  buildCarbonCompositionOption,
  buildEnergyStructureOption,
  buildPriorityOption,
} from './chartConfigs/demoCharts'
import {
  computeDemoResult,
  DEFAULT_FORM,
  formatNumber,
  SCENE_OPTIONS,
  type DemoFormData,
  type DemoResult,
  type SceneType,
} from './demoCalc'
import './DemoPage.css'

function YesNoField({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="demo-field demo-field--inline">
      <span className="demo-label">{label}</span>
      <div className="demo-toggle" role="group" aria-label={label}>
        <button
          type="button"
          className={`demo-toggle-btn${value ? ' demo-toggle-btn--active' : ''}`}
          onClick={() => onChange(true)}
        >
          是
        </button>
        <button
          type="button"
          className={`demo-toggle-btn${!value ? ' demo-toggle-btn--active' : ''}`}
          onClick={() => onChange(false)}
        >
          否
        </button>
      </div>
    </div>
  )
}

export default function DemoPage() {
  const [form, setForm] = useState<DemoFormData>(DEFAULT_FORM)
  const [result, setResult] = useState<DemoResult | null>(null)
  const [showBookingTip, setShowBookingTip] = useState(false)

  const updateField = <K extends keyof DemoFormData>(
    key: K,
    value: DemoFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleGenerate = () => {
    setResult(computeDemoResult(form))
    setShowBookingTip(false)
  }

  const handleBooking = () => {
    setShowBookingTip(true)
  }

  const energyChartOption = useMemo(
    () => (result ? buildEnergyStructureOption(result, form) : null),
    [result, form],
  )
  const carbonChartOption = useMemo(
    () => (result ? buildCarbonCompositionOption(result) : null),
    [result],
  )
  const priorityChartOption = useMemo(
    () => (result ? buildPriorityOption(form) : null),
    [result, form],
  )

  return (
    <div className="demo">
      <header className="demo-header">
        <div className="demo-header-inner">
          <p className="demo-eyebrow">脱敏样例演示</p>
          <h1>能碳快测 Demo</h1>
          <p className="demo-subtitle">
            输入基础用能信息，快速生成企业能耗、碳排和优化方向初步判断。
          </p>
          <p className="demo-notice">
            本演示采用脱敏样例数据，用于展示能碳快测的业务流程和结果结构。正式项目中，系统将结合客户授权提供的账单、设备和运营数据进行进一步分析。
          </p>
        </div>
      </header>

      <div className="demo-workspace">
        <div className="demo-layout">
          {/* 左侧表单 */}
          <aside className="demo-panel demo-panel--form">
            <form
              className="demo-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleGenerate()
              }}
            >
              <section className="demo-form-section">
                <h2 className="demo-form-title">选择场景</h2>
                <div className="demo-scene-group" role="radiogroup" aria-label="场景类型">
                  {SCENE_OPTIONS.map((scene) => (
                    <button
                      key={scene}
                      type="button"
                      role="radio"
                      aria-checked={form.scene === scene}
                      className={`demo-scene-btn${form.scene === scene ? ' demo-scene-btn--active' : ''}`}
                      onClick={() => updateField('scene', scene as SceneType)}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              </section>

              <section className="demo-form-section">
                <h2 className="demo-form-title">基础信息</h2>
                <div className="demo-field-grid">
                  <label className="demo-field">
                    <span className="demo-label">项目名称</span>
                    <input
                      type="text"
                      className="demo-input"
                      value={form.projectName}
                      onChange={(e) => updateField('projectName', e.target.value)}
                      placeholder="请输入项目名称"
                    />
                  </label>
                  <label className="demo-field">
                    <span className="demo-label">所在城市</span>
                    <input
                      type="text"
                      className="demo-input"
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="请输入所在城市"
                    />
                  </label>
                  <label className="demo-field">
                    <span className="demo-label">建筑面积（平方米）</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="demo-input"
                      value={form.buildingArea}
                      onChange={(e) => updateField('buildingArea', e.target.value)}
                      placeholder="12000"
                    />
                  </label>
                  <label className="demo-field">
                    <span className="demo-label">客房数量</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="demo-input"
                      value={form.roomCount}
                      onChange={(e) => updateField('roomCount', e.target.value)}
                      placeholder="180"
                    />
                  </label>
                  <label className="demo-field">
                    <span className="demo-label">年用电量（kWh）</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="demo-input"
                      value={form.annualElectricity}
                      onChange={(e) =>
                        updateField('annualElectricity', e.target.value)
                      }
                      placeholder="2800000"
                    />
                  </label>
                  <label className="demo-field">
                    <span className="demo-label">年电费（元）</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="demo-input"
                      value={form.annualElectricityCost}
                      onChange={(e) =>
                        updateField('annualElectricityCost', e.target.value)
                      }
                      placeholder="2200000"
                    />
                  </label>
                  <label className="demo-field">
                    <span className="demo-label">年用水量（吨）</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="demo-input"
                      value={form.annualWater}
                      onChange={(e) => updateField('annualWater', e.target.value)}
                      placeholder="45000"
                    />
                  </label>
                  <label className="demo-field">
                    <span className="demo-label">年水费（元）</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="demo-input"
                      value={form.annualWaterCost}
                      onChange={(e) =>
                        updateField('annualWaterCost', e.target.value)
                      }
                      placeholder="180000"
                    />
                  </label>
                </div>
              </section>

              <section className="demo-form-section">
                <h2 className="demo-form-title">设备与管理情况</h2>
                <div className="demo-equipment-list">
                  <YesNoField
                    label="是否有中央空调"
                    value={form.hasCentralAC}
                    onChange={(v) => updateField('hasCentralAC', v)}
                  />
                  <YesNoField
                    label="是否有冷站"
                    value={form.hasChillerPlant}
                    onChange={(v) => updateField('hasChillerPlant', v)}
                  />
                  <YesNoField
                    label="是否有电梯"
                    value={form.hasElevator}
                    onChange={(v) => updateField('hasElevator', v)}
                  />
                  <YesNoField
                    label="是否有独立餐饮区域"
                    value={form.hasRestaurant}
                    onChange={(v) => updateField('hasRestaurant', v)}
                  />
                  <YesNoField
                    label="是否已有能源管理系统"
                    value={form.hasEms}
                    onChange={(v) => updateField('hasEms', v)}
                  />
                  <YesNoField
                    label="是否已有分项计量"
                    value={form.hasSubMetering}
                    onChange={(v) => updateField('hasSubMetering', v)}
                  />
                </div>
              </section>

              <button type="submit" className="demo-submit-btn">
                生成快测结果
              </button>
            </form>
          </aside>

          {/* 右侧结果 */}
          <main className="demo-panel demo-panel--result">
            {!result ? (
              <div className="demo-empty">
                <div className="demo-empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none">
                    <rect
                      x="6"
                      y="10"
                      width="36"
                      height="28"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 22h20M14 28h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p>请填写左侧信息，生成快测结果预览</p>
              </div>
            ) : (
              <div className="demo-results demo-results--visible">
                <div className="demo-result-header">
                  <h2>快测结果预览</h2>
                  <p>
                    {form.projectName || '样例项目'} · {form.scene} ·{' '}
                    {form.city || '未填写城市'}
                  </p>
                </div>

                {/* 年度能耗概览 */}
                <section className="demo-result-block">
                  <h3>年度能耗概览</h3>
                  <div className="demo-metrics">
                    <div className="demo-metric">
                      <span className="demo-metric-label">年用电量</span>
                      <span className="demo-metric-value">
                        {formatNumber(result.annualElectricity, 0)}
                        <small>kWh</small>
                      </span>
                    </div>
                    <div className="demo-metric">
                      <span className="demo-metric-label">年电费</span>
                      <span className="demo-metric-value">
                        {formatNumber(result.annualElectricityCost, 0)}
                        <small>元</small>
                      </span>
                    </div>
                    <div className="demo-metric demo-metric--accent">
                      <span className="demo-metric-label">单位面积电耗</span>
                      <span className="demo-metric-value">
                        {formatNumber(result.unitAreaElectricity)}
                        <small>kWh/m²</small>
                      </span>
                    </div>
                    <div className="demo-metric demo-metric--accent">
                      <span className="demo-metric-label">单间客房电耗</span>
                      <span className="demo-metric-value">
                        {formatNumber(result.unitRoomElectricity)}
                        <small>kWh/间</small>
                      </span>
                    </div>
                  </div>
                </section>

                {/* 碳排放估算 */}
                <section className="demo-result-block">
                  <div className="demo-result-block-head">
                    <h3>碳排放估算</h3>
                    <span className="demo-tag">初步估算</span>
                  </div>
                  <div className="demo-metrics demo-metrics--3">
                    <div className="demo-metric">
                      <span className="demo-metric-label">年度用电碳排估算</span>
                      <span className="demo-metric-value">
                        {formatNumber(result.electricityCarbon)}
                        <small>tCO₂</small>
                      </span>
                    </div>
                    <div className="demo-metric">
                      <span className="demo-metric-label">用水相关碳排估算</span>
                      <span className="demo-metric-value">
                        {formatNumber(result.waterCarbon)}
                        <small>tCO₂</small>
                      </span>
                    </div>
                    <div className="demo-metric demo-metric--highlight">
                      <span className="demo-metric-label">综合碳排估算</span>
                      <span className="demo-metric-value">
                        {formatNumber(result.totalCarbon)}
                        <small>tCO₂</small>
                      </span>
                    </div>
                  </div>
                </section>

                {/* 数据可视化 */}
                {energyChartOption && carbonChartOption && priorityChartOption && (
                  <section className="demo-result-block">
                    <h3>数据可视化</h3>
                    <div className="chart-grid chart-grid--2">
                      <ChartCard
                        title="能耗结构"
                        description="展示影响能耗的主要因素构成（初步估算）"
                        option={energyChartOption}
                        height={220}
                        variant="light"
                      />
                      <ChartCard
                        title="碳排放构成初步估算"
                        description="基于快测公式计算的用电与用水碳排构成"
                        option={carbonChartOption}
                        height={220}
                        variant="light"
                      />
                    </div>
                    <div className="chart-grid chart-grid--1" style={{ marginTop: '0.75rem' }}>
                      <ChartCard
                        title="优化优先级"
                        description="优先级评分用于识别建议关注方向，不代表收益保证"
                        option={priorityChartOption}
                        height={200}
                        variant="light"
                      />
                    </div>
                    <p className="chart-disclaimer">{CHART_DISCLAIMER}</p>
                  </section>
                )}

                {/* 主要风险点 */}
                <section className="demo-result-block">
                  <h3>主要风险点</h3>
                  <ul className="demo-list demo-list--risk">
                    {result.risks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* 优化建议 */}
                <section className="demo-result-block">
                  <h3>优化建议</h3>
                  <ul className="demo-list demo-list--suggest">
                    {result.suggestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* 后续托管建议 */}
                <section className="demo-result-block demo-result-block--actions">
                  <h3>后续托管建议</h3>
                  <p className="demo-hosting-hint">
                    快测判断具备后续评估价值，建议结合客户授权数据进一步分析，并评估是否进入碳元平台长期托管。
                  </p>
                  <div className="demo-actions">
                    <Link to={ROUTES.report} className="demo-action-btn demo-action-btn--primary">
                      查看报告样例
                    </Link>
                    <Link
                      to={ROUTES.platform}
                      className="demo-action-btn demo-action-btn--secondary"
                    >
                      进入碳元平台托管
                    </Link>
                    <button
                      type="button"
                      className="demo-action-btn demo-action-btn--outline"
                      onClick={handleBooking}
                    >
                      建议进一步采集
                    </button>
                  </div>
                  {showBookingTip && (
                    <p className="demo-booking-tip" role="status">
                      已记录进一步采集意向，后续将结合客户授权数据开展分析。
                    </p>
                  )}
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
