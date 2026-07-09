import { Link } from 'react-router-dom'
import { ROUTES } from '../router/paths'
import './HomePage.css'

const showcaseNodes = [
  {
    title: '能碳快测入口',
    description: '低门槛采集基础用能信息',
    position: 'tl',
    to: ROUTES.demo,
  },
  {
    title: '报告生成',
    description: '形成初步诊断与托管建议',
    position: 'tr',
    to: ROUTES.report,
  },
  {
    title: '服务连接',
    description: '连接电力、节能、绿电绿证等能力',
    position: 'bl',
    to: ROUTES.platform,
  },
  {
    title: '数据资产沉淀',
    description: '形成长期可复用的数据基础',
    position: 'br',
    to: ROUTES.platform,
  },
] as const

const showcaseTags = [
  { label: '脱敏样例演示', to: ROUTES.report },
  { label: '初步估算', to: ROUTES.demo },
  { label: '长期托管闭环', to: ROUTES.platform },
]

const coreChain = [
  { label: '快速诊断', accent: true },
  { label: '报告生成', accent: false },
  { label: '平台托管', accent: true },
  { label: '服务连接', accent: false },
  { label: '收益兑现', accent: false },
  { label: '数据资产沉淀', accent: true },
]

const problems = [
  {
    icon: 'entry',
    title: '低成本诊断入口不足',
    description:
      '传统能源审计周期长、成本高，酒店、商办和园区难以快速完成用能与碳排快测判断。',
  },
  {
    icon: 'data',
    title: '能耗与碳排数据分散',
    description:
      '水电燃气账单、设备信息和运营数据分散在不同环节，难以形成可持续的数据基础。',
  },
  {
    icon: 'connect',
    title: '服务能力缺少统一连接入口',
    description:
      '电力交易、节能改造、绿电绿证、绿色建筑评级等服务彼此割裂，缺少统一承接入口。',
  },
]

const capabilities = [
  {
    num: '01',
    icon: 'diag',
    title: '快测诊断',
    description: '采集基础用能信息，形成能耗与碳排初步判断。',
    to: ROUTES.demo,
  },
  {
    num: '02',
    icon: 'report',
    title: '报告生成',
    description: '形成可交付的脱敏样例报告和后续托管建议。',
    to: ROUTES.report,
  },
  {
    num: '03',
    icon: 'platform',
    title: '平台托管',
    description: '持续沉淀能耗、碳排、设备和运营数据。',
    to: ROUTES.platform,
  },
  {
    num: '04',
    icon: 'connect',
    title: '服务连接',
    description:
      '连接电力交易、节能改造、绿电绿证、绿色建筑等生态服务能力。',
    to: ROUTES.platform,
  },
]

const scenarios = [
  {
    icon: 'hotel',
    name: '酒店',
    description: '适用于连锁与单体酒店的用能快测、报告输出与数据托管。',
  },
  {
    icon: 'apartment',
    name: '公寓',
    description: '覆盖长租公寓与商办公寓的能耗账单与运营数据沉淀。',
  },
  {
    icon: 'building',
    name: '商业楼宇',
    description: '面向写字楼与综合体的能碳快测判断与平台托管。',
  },
  {
    icon: 'park',
    name: '园区',
    description: '服务产业园区与托管园区的多主体能碳数据管理。',
  },
]

const reasons = [
  {
    num: '01',
    title: '低门槛进入客户',
    description:
      '以基础单据和快测表单降低进入成本，无需重型审计作为前置条件。',
  },
  {
    num: '02',
    title: '快速形成可交付结果',
    description:
      '完成初步估算与快测判断后，可输出脱敏报告样例与后续建议方向。',
  },
  {
    num: '03',
    title: '后续可进入长期托管',
    description:
      '快测结果可作为碳元平台长期托管的数据基础，支撑持续沉淀与连接。',
  },
]

function ProblemIcon({ type }: { type: string }) {
  if (type === 'entry') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 7h16M4 12h10M4 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }
  if (type === 'data') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="9" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 11.2 15.5 7M8.5 12.8 15.5 17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function CapIcon({ type }: { type: string }) {
  if (type === 'diag') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 18V6M8 18V10M12 18V14M16 18V8M20 18V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'report') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'platform') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="14" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 7.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 12h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ScenarioIcon({ type }: { type: string }) {
  if (type === 'hotel') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 20V8l8-4 8 4v12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'apartment') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 10h16M10 4v16" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }
  if (type === 'building') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="6" y="3" width="12" height="18" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 10h18v10H3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 10V6h10v4M12 6V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className="home">
      {/* 第一屏：Hero */}
      <section className="home-section home-hero">
        <div className="home-container home-hero-container">
          <div className="home-hero-grid">
            <div className="home-hero-content">
              <p className="home-eyebrow">直通乌镇｜数字服务赋能组</p>
              <h1 className="home-hero-title">
                <span>能碳快测 ×</span>
                <span>碳元平台</span>
              </h1>
              <p className="home-hero-subtitle">
                面向酒店、公寓、商业楼宇和园区的企业碳能数据资产平台
              </p>
              <p className="home-hero-desc">
                以能碳快测为前端入口，快速完成企业用能与碳排放初步诊断；以碳元平台为长期托管底座，持续沉淀企业能耗、碳排、设备和运营数据。
              </p>
              <div className="home-hero-actions">
                <Link to={ROUTES.demo} className="home-btn home-btn--primary">
                  查看快测 Demo
                </Link>
                <Link to={ROUTES.report} className="home-btn home-btn--outline">
                  查看报告样例
                </Link>
                <Link to={ROUTES.platform} className="home-btn home-btn--outline">
                  查看平台闭环
                </Link>
              </div>
            </div>

            <div className="home-showcase" aria-label="企业碳能数据资产平台展示">
              <h2 className="home-showcase-title">企业碳能数据资产平台</h2>

              <div className="home-showcase-body">
                <div className="home-showcase-orbit">
                  {showcaseNodes.map((node) => (
                    <Link
                      key={node.title}
                      to={node.to}
                      className={`home-showcase-node home-showcase-node--${node.position}`}
                    >
                      <strong>{node.title}</strong>
                      <p>{node.description}</p>
                    </Link>
                  ))}

                  <div className="home-showcase-main">
                    <span className="home-showcase-main-label">核心平台</span>
                    <strong>碳元平台</strong>
                    <p>长期托管企业能耗、碳排、设备和运营数据</p>
                  </div>
                </div>
              </div>

              <div className="home-showcase-tags">
                {showcaseTags.map((tag) => (
                  <Link key={tag.label} to={tag.to} className="home-showcase-tag">
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 第二屏：核心链路 */}
      <section className="home-section home-chain-band">
        <div className="home-container home-chain-band-inner">
          <p className="home-chain-band-label">业务闭环</p>
          <h2 className="home-chain-band-title">
            从<span className="home-text-accent">快测入口</span>到
            <span className="home-text-accent">数据资产沉淀</span>
          </h2>
          <div className="home-chain-strip">
            {coreChain.map((item, index) => (
              <div key={item.label} className="home-chain-strip-item">
                <span className={`home-chain-chip${item.accent ? ' home-chain-chip--accent' : ''}`}>
                  <span className="home-chain-chip-num">{index + 1}</span>
                  {item.label}
                </span>
                {index < coreChain.length - 1 && (
                  <span className="home-chain-strip-arrow" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 第三屏：我们解决什么问题 */}
      <section className="home-section home-section--alt">
        <div className="home-container">
          <header className="home-section-header">
            <span className="home-section-label">问题洞察</span>
            <h2 className="home-section-title">我们解决什么问题</h2>
            <p className="home-section-lead">
              聚焦企业能碳数据难以快速诊断、持续沉淀、统一连接的真实痛点。
            </p>
          </header>
          <div className="home-card-grid home-card-grid--3">
            {problems.map((item, index) => (
              <article key={item.title} className="home-card home-card--problem">
                <div className="home-problem-head">
                  <span className="home-problem-icon">
                    <ProblemIcon type={item.icon} />
                  </span>
                  <span className="home-card-num">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 第四屏：产品能力 */}
      <section className="home-section home-section--white">
        <div className="home-container">
          <header className="home-section-header">
            <span className="home-section-label">产品能力</span>
            <h2 className="home-section-title">产品能力</h2>
            <p className="home-section-lead">
              形成可交付、可沉淀、可连接的产品能力，支撑企业碳能数据资产建设。
            </p>
          </header>
          <div className="home-cap-grid">
            {capabilities.map((item) => (
              <Link key={item.title} to={item.to} className="home-cap-card">
                <div className="home-cap-head">
                  <span className="home-cap-icon"><CapIcon type={item.icon} /></span>
                  <span className="home-cap-num">{item.num}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 第五屏：适用场景 */}
      <section className="home-section home-section--alt">
        <div className="home-container">
          <header className="home-section-header">
            <span className="home-section-label">适用场景</span>
            <h2 className="home-section-title">适用场景</h2>
            <p className="home-section-lead">
              酒店、公寓、商业楼宇和园区等场景，均可通过快测进入并沉淀数据资产。
            </p>
          </header>
          <div className="home-scenario-grid">
            {scenarios.map((item) => (
              <article key={item.name} className="home-scenario-card">
                <span className="home-scenario-icon"><ScenarioIcon type={item.icon} /></span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 第六屏：为什么先从快测进入 */}
      <section className="home-section home-section--white">
        <div className="home-container">
          <header className="home-section-header">
            <span className="home-section-label">进入路径</span>
            <h2 className="home-section-title">为什么先从快测进入？</h2>
            <p className="home-section-lead">
              以能碳快测作为前端入口，降低客户进入门槛，再逐步承接平台长期托管。
            </p>
          </header>
          <div className="home-reason-grid">
            {reasons.map((item) => (
              <article key={item.title} className="home-reason-card">
                <span className="home-reason-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 第七屏：底部行动区 */}
      <section className="home-section home-cta">
        <div className="home-container home-cta-inner">
          <h2 className="home-cta-title">快测负责进入客户，平台负责长期托管</h2>
          <div className="home-cta-actions">
            <Link to={ROUTES.demo} className="home-btn home-btn--primary home-btn--lg">
              体验能碳快测 Demo
            </Link>
            <Link to={ROUTES.report} className="home-btn home-btn--outline home-btn--lg">
              查看脱敏报告样例
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
