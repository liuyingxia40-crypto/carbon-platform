import { Link } from 'react-router-dom'
import { ROUTES } from '../router/paths'
import ChartCard from '../components/charts/ChartCard'
import { CHART_DISCLAIMER_SHORT } from '../components/charts/chartTheme'
import '../components/charts/ChartCard.css'
import {
  buildCostStructureOption,
  buildEnergyCompareOption,
  buildHostingPathOption,
} from './chartConfigs/reportCharts'
import './ReportPage.css'

const projectInfo = [
  { label: '项目类型', value: '酒店' },
  { label: '所在区域', value: '脱敏处理' },
  { label: '建筑面积', value: '约 12,000 平方米' },
  { label: '客房数量', value: '约 180 间' },
  { label: '数据来源', value: '水电费单、基础运营信息、设备信息（脱敏样例）' },
  { label: '报告类型', value: '能碳快测初步诊断报告（非最终审计报告）' },
]

const energyMetrics = [
  { label: '年用电量', value: '约 1,280,000', unit: 'kWh' },
  { label: '年电费', value: '约 1,050,000', unit: '元' },
  { label: '单位面积电耗', value: '约 106.7', unit: 'kWh/㎡' },
  { label: '单间客房电耗', value: '约 7,111', unit: 'kWh/间' },
  { label: '年用水量', value: '约 38,000', unit: '吨' },
  { label: '年水费', value: '约 190,000', unit: '元' },
]

const carbonMetrics = [
  { label: '用电相关碳排放', value: '约 730', unit: 'tCO₂' },
  { label: '用水相关碳排放', value: '约 11', unit: 'tCO₂' },
  { label: '综合碳排放估算', value: '约 741', unit: 'tCO₂', highlight: true },
  { label: '碳排放强度', value: '约 0.062', unit: 'tCO₂/㎡' },
]

const findings = [
  '当前项目能耗数据具备进一步精细化管理价值，可作为长期托管基础。',
  '客房、公区、冷站等用能边界尚需进一步拆分，建议进一步采集分项数据。',
  '用电成本存在峰谷优化和市场化交易评估空间，具备后续评估价值。',
  '若补充分项计量，可进一步识别重点耗能设备。',
  '项目具备进入碳元平台长期托管的基础，可连接相关生态服务能力。',
]

const suggestions = [
  {
    category: '数据侧',
    content: '建议补充电表分项计量，建立水、电、燃气、设备数据台账，为后续分析打基础。',
  },
  {
    category: '能源侧',
    content: '建议评估峰谷电价、电力交易、空调系统、照明系统等方向，具备后续评估价值。',
  },
  {
    category: '碳管理侧',
    content: '建议建立年度碳排基线，为绿色建筑、绿电绿证和碳管理服务等后续工作打基础。',
  },
]

export default function ReportPage() {
  return (
    <div className="report">
      <header className="report-header">
        <div className="report-header-inner">
          <p className="report-eyebrow">脱敏样例报告</p>
          <h1>脱敏版酒店能碳快测报告样例</h1>
          <p className="report-subtitle">
            能碳快测不仅提供表单采集和指标估算，还会形成可交付的诊断报告。报告用于帮助业主、物业方或资产管理方快速判断项目是否具备进一步节能降费、碳管理和长期托管价值。本报告为快测初步诊断，不作为最终能源审计结论。
          </p>
          <div className="report-actions">
            <button
              type="button"
              className="report-btn report-btn--primary"
              onClick={() => window.alert('PDF 报告样例整理中')}
            >
              下载 PDF 报告
            </button>
            <Link to={ROUTES.demo} className="report-btn report-btn--outline">
              查看快测 Demo
            </Link>
            <Link to={ROUTES.platform} className="report-btn report-btn--outline">
              查看平台闭环
            </Link>
          </div>
        </div>
      </header>

      <div className="report-body">
        <div className="report-document">
          <div className="report-doc-header">
            <span className="report-doc-badge">脱敏样例</span>
            <h2>能碳快测初步诊断报告</h2>
            <p>酒店场景 · 脱敏样例报告预览</p>
          </div>

          <section className="report-section">
            <h3 className="report-section-title">项目基础信息</h3>
            <dl className="report-info-grid">
              {projectInfo.map((item) => (
                <div key={item.label} className="report-info-item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="report-section">
            <h3 className="report-section-title">用能数据概览</h3>
            <div className="report-metrics">
              {energyMetrics.map((item) => (
                <div key={item.label} className="report-metric">
                  <span className="report-metric-label">{item.label}</span>
                  <span className="report-metric-value">
                    {item.value}
                    <small>{item.unit}</small>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3 className="report-section-title">数据图表分析</h3>
            <p className="report-chart-intro">
              图表用于辅助识别进一步评估方向，基于脱敏样例数据形成，不代表最终能源审计结论。
            </p>
            <div className="chart-grid chart-grid--2">
              <ChartCard
                title="年度费用结构"
                description="年电费与年水费构成（脱敏样例）"
                option={buildCostStructureOption()}
                height={220}
                variant="light"
              />
              <ChartCard
                title="能耗指标对比"
                description="用于辅助识别进一步评估方向"
                option={buildEnergyCompareOption()}
                height={220}
                variant="light"
              />
            </div>
            <div className="chart-grid chart-grid--1" style={{ marginTop: '0.75rem' }}>
              <ChartCard
                title="后续托管价值路径"
                description="从数据采集到长期托管的业务演进路径"
                option={buildHostingPathOption()}
                height={200}
                variant="light"
              />
            </div>
            <p className="chart-disclaimer chart-disclaimer--light">
              {CHART_DISCLAIMER_SHORT} 正式项目需结合客户授权数据进一步核算。
            </p>
          </section>

          <section className="report-section">
            <div className="report-section-head">
              <h3 className="report-section-title">碳排放估算</h3>
              <span className="report-tag">初步估算</span>
            </div>
            <div className="report-metrics report-metrics--4">
              {carbonMetrics.map((item) => (
                <div
                  key={item.label}
                  className={`report-metric${item.highlight ? ' report-metric--highlight' : ''}`}
                >
                  <span className="report-metric-label">{item.label}</span>
                  <span className="report-metric-value">
                    {item.value}
                    <small>{item.unit}</small>
                  </span>
                </div>
              ))}
            </div>
            <p className="report-disclaimer">
              以上结果为基于脱敏样例数据形成的初步估算，正式项目需结合客户授权数据进一步核算。
            </p>
          </section>

          <section className="report-section">
            <h3 className="report-section-title">主要发现</h3>
            <div className="report-findings">
              {findings.map((item, index) => (
                <article key={item} className="report-finding-card">
                  <span className="report-finding-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3 className="report-section-title">优化建议</h3>
            <div className="report-suggestions">
              {suggestions.map((item) => (
                <article key={item.category} className="report-suggestion-card">
                  <h4>{item.category}</h4>
                  <p>{item.content}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section report-section--hosting">
            <h3 className="report-section-title">后续托管建议</h3>
            <p className="report-hosting-text">
              建议项目进入碳元平台进行持续托管，围绕能耗、碳排、设备和运营数据建立长期数据库。快测报告用于初步判断项目价值，长期托管才是数据资产沉淀的核心环节，可根据实际运行情况匹配电力交易、节能改造、绿电绿证、绿色建筑评级等服务。
            </p>
          </section>

          <footer className="report-summary">
            <p>
              快测报告用于初步判断，长期托管支撑数据资产沉淀，为后续收益兑现打基础。
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
