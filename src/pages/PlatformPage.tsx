import { Link } from 'react-router-dom'
import { ROUTES } from '../router/paths'
import './PlatformPage.css'

const assetInputNodes = [
  { title: '能耗数据', description: '水、电、燃气、热力等基础用能数据' },
  { title: '碳排数据', description: '碳排基线、强度与年度管理记录' },
  { title: '设备数据', description: '空调、冷站、电梯等重点设备信息' },
  { title: '运营数据', description: '建筑面积、客房数量等运营指标' },
]

const assetOutputNodes = [
  { title: '降本分析', description: '支撑电费优化与节能方向评估' },
  { title: '碳管理', description: '支撑碳排基线与碳管理记录' },
  { title: '绿色资产配置', description: '支撑绿电绿证与绿色资产方向' },
  { title: '服务履约记录', description: '沉淀服务连接与履约过程数据' },
]

const loopSteps = [
  {
    title: '真实用能场景',
    description:
      '聚焦酒店、公寓、商业楼宇、园区和存量资产改造等真实用能场景。',
  },
  {
    title: '数据接入',
    description:
      '接入电费单、水费单、燃气费单、建筑面积、设备清单及重点用能设备基础数据。',
  },
  {
    title: '能碳建模',
    description:
      '将基础数据转化为结构化能碳数据模型，形成能耗与碳排基线、用能结构等快测判断基础。',
  },
  {
    title: '风险识别',
    description:
      '识别能耗偏高、计量不足、设备效率、峰谷结构和碳管理资料等方面的待评估问题。',
  },
  {
    title: '服务连接',
    description:
      '可连接电力交易、售电服务、节能改造、绿电绿证、绿色建筑评级、碳咨询等生态服务能力。',
  },
  {
    title: '收益兑现',
    description:
      '为电费优化、节能改造、绿电绿证配置、ESG 增信等后续收益兑现打基础，不直接承诺固定收益。',
  },
  {
    title: '数据资产沉淀',
    description:
      '沉淀企业能耗、碳排、设备和运营数据，构成可复用的碳能数据资产基础设施。',
  },
]

const hostingData = [
  {
    title: '能耗数据',
    description: '水、电、燃气、热力等基础用能数据，形成企业长期能耗台账。',
  },
  {
    title: '碳排数据',
    description:
      '基于用能数据形成碳排基线、碳排强度和年度碳管理记录。',
  },
  {
    title: '设备数据',
    description:
      '沉淀空调、冷站、电梯、照明、公区设备等重点设备运行信息。',
  },
  {
    title: '运营数据',
    description:
      '结合建筑面积、客房数量、入住率、公区面积等数据，辅助单位运营指标能耗判断。',
  },
]

const services = [
  '电力交易 / 售电服务',
  '峰谷电价优化',
  '节能改造',
  '光伏与分布式能源',
  '绿电绿证',
  '绿色建筑评级',
  '碳咨询',
  '中远期碳资产服务',
]

const products = [
  {
    name: '能碳快测',
    role: '前端诊断入口',
    description:
      '快速采集基础用能信息，输出快测判断和报告样例，降低客户进入门槛。',
  },
  {
    name: '碳元平台',
    role: '长期托管底座',
    description:
      '持续托管能耗、碳排、设备和运营数据，支撑服务连接与后续价值评估。',
  },
  {
    name: '数据资产',
    role: '长期沉淀结果',
    description:
      '形成企业可复用的碳能数据基础，为降本、碳管理、绿色资产配置和收益兑现提供支撑。',
  },
]

const scenarios = [
  {
    name: '酒店',
    description:
      '支持水电费快测、单位客房能耗分析和空调公区节能方向评估，具备后续评估价值。',
  },
  {
    name: '公寓',
    description: '支持集中用能管理、公区用能分析和长期运营数据沉淀。',
  },
  {
    name: '商业楼宇',
    description:
      '支持公区能源管理、分项计量升级和绿色建筑、电力优化等方向评估。',
  },
  {
    name: '园区',
    description: '支持多主体能耗管理、企业碳排台账和园区级数据资产沉淀。',
  },
]

export default function PlatformPage() {
  return (
    <div className="platform">
      <header className="platform-hero">
        <div className="platform-container platform-hero-inner">
          <p className="platform-eyebrow">碳元平台</p>
          <h1>碳元平台：企业碳能数据资产托管底座</h1>
          <p className="platform-hero-subtitle">
            从一次快测进入长期托管，持续沉淀企业能耗、碳排、设备和运营数据。
          </p>
          <p className="platform-hero-desc">
            碳元平台围绕真实用能场景建立企业能碳数据底座，将分散的水电燃气账单、设备信息、运营数据和后续服务记录结构化沉淀，并可连接电力交易、节能改造、绿电绿证、绿色建筑和碳咨询等相关生态服务能力。
          </p>
          <div className="platform-hero-actions">
            <Link to={ROUTES.home} className="platform-btn platform-btn--outline">
              返回项目总览
            </Link>
            <Link to={ROUTES.demo} className="platform-btn platform-btn--primary">
              查看快测 Demo
            </Link>
            <Link to={ROUTES.report} className="platform-btn platform-btn--outline">
              查看报告样例
            </Link>
          </div>
        </div>
      </header>

      <section className="platform-section platform-section--dark platform-section--loop">
        <div className="platform-container">
          <h2 className="platform-section-title platform-section-title--light">
            从快测到托管的数据服务闭环
          </h2>
          <div className="platform-loop-grid">
            <div className="platform-loop-row">
              {loopSteps.slice(0, 4).map((step, index) => (
                <div key={step.title} className="platform-loop-cell">
                  <article className="platform-loop-card">
                    <span className="platform-loop-index">{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                  {index < 3 && (
                    <span className="platform-loop-arrow" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
            <div className="platform-loop-row-bridge" aria-hidden="true">
              <span className="platform-loop-bridge-line" />
              <span className="platform-loop-bridge-arrow" />
            </div>
            <div className="platform-loop-row platform-loop-row--secondary">
              {loopSteps.slice(4).map((step, index) => (
                <div key={step.title} className="platform-loop-cell">
                  <article className="platform-loop-card">
                    <span className="platform-loop-index">{index + 5}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                  {index < 2 && (
                    <span className="platform-loop-arrow" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="platform-section platform-section--after-dark">
        <div className="platform-container">
          <h2 className="platform-section-title">平台托管什么数据？</h2>
          <div className="platform-card-grid platform-card-grid--4">
            {hostingData.map((item) => (
              <article key={item.title} className="platform-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-section platform-section--soft">
        <div className="platform-container">
          <h2 className="platform-section-title">碳元平台数据资产沉淀结构</h2>
          <p className="platform-asset-intro">
            四类基础数据汇聚为企业碳能数据资产底座，支撑降本分析、碳管理与绿色资产配置等后续能力。
          </p>

          <div className="platform-asset-flow">
            <div className="platform-asset-layer">
              <p className="platform-asset-layer-label">数据接入</p>
              <div className="platform-asset-cards">
                {assetInputNodes.map((item) => (
                  <article key={item.title} className="platform-asset-node">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="platform-asset-connector" aria-hidden="true">
              <span className="platform-asset-connector-line" />
              <span className="platform-asset-connector-arrow" />
            </div>

            <div className="platform-asset-layer platform-asset-layer--core">
              <p className="platform-asset-layer-label">平台沉淀</p>
              <article className="platform-asset-core">
                <h3>企业碳能数据资产底座</h3>
                <p>
                  汇聚企业能耗、碳排、设备和运营数据，形成长期可复用的数据基础。
                </p>
              </article>
            </div>

            <div className="platform-asset-connector" aria-hidden="true">
              <span className="platform-asset-connector-line" />
              <span className="platform-asset-connector-arrow" />
            </div>

            <div className="platform-asset-layer">
              <p className="platform-asset-layer-label">价值输出</p>
              <div className="platform-asset-cards">
                {assetOutputNodes.map((item) => (
                  <article key={item.title} className="platform-asset-node">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <p className="platform-asset-note">
            结构图用于展示数据沉淀路径，不代表最终核算结论。
          </p>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-container">
          <h2 className="platform-section-title">
            连接生态服务，识别价值方向
          </h2>
          <div className="platform-service-grid">
            {services.map((name) => (
              <div key={name} className="platform-service-item">
                <span className="platform-service-dot" aria-hidden="true" />
                {name}
              </div>
            ))}
          </div>
          <p className="platform-service-note">
            碳元平台不直接承诺固定收益，而是基于客户真实能碳数据，识别具备进一步评估价值的方向，并连接相关生态服务能力。
          </p>
        </div>
      </section>

      <section className="platform-section platform-section--soft">
        <div className="platform-container">
          <h2 className="platform-section-title">
            能碳快测与碳元平台如何协同？
          </h2>
          <div className="platform-card-grid platform-card-grid--3">
            {products.map((item) => (
              <article key={item.name} className="platform-card platform-card--product">
                <span className="platform-card-role">{item.role}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-container">
          <h2 className="platform-section-title">首批聚焦真实存量资产场景</h2>
          <div className="platform-card-grid platform-card-grid--4">
            {scenarios.map((item) => (
              <article key={item.name} className="platform-card platform-card--scenario">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-section platform-cta">
        <div className="platform-container platform-cta-inner">
          <h2 className="platform-section-title">
            能碳快测负责进入客户，碳元平台负责长期托管。
          </h2>
          <p className="platform-cta-desc">
            能碳快测帮助企业完成低门槛快测判断，碳元平台围绕真实能耗、碳排、设备和运营数据建立长期托管体系。数据资产最终支撑降本、碳管理、绿色资产配置和收益兑现，共同构成面向酒店、公寓、商业楼宇和园区的企业碳能数据资产基础设施。
          </p>
          <div className="platform-cta-actions">
            <Link to={ROUTES.demo} className="platform-btn platform-btn--primary platform-btn--lg">
              查看快测 Demo
            </Link>
            <Link to={ROUTES.report} className="platform-btn platform-btn--outline platform-btn--lg">
              查看报告样例
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
