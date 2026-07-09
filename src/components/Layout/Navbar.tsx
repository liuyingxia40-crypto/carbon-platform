import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import brandLogo from '../../assets/brand/logo.jpg'
import { ROUTES } from '../../router/paths'
import './Navbar.css'

const navItems = [
  { to: ROUTES.home, label: '项目总览', end: true },
  { to: ROUTES.demo, label: '快测 Demo' },
  { to: ROUTES.report, label: '报告样例' },
  { to: ROUTES.platform, label: '平台闭环' },
] as const

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to={ROUTES.home} className="navbar-brand" end onClick={() => setMenuOpen(false)}>
          <img
            src={brandLogo}
            alt="碳能快测"
            className="navbar-brand-logo"
            width={256}
            height={64}
          />
          <span className="navbar-brand-text">
            <strong className="navbar-brand-title">能碳快测 × 碳元平台</strong>
            <small className="navbar-brand-subtitle">直通乌镇｜比赛展示</small>
          </span>
        </NavLink>

        <button
          type="button"
          className={`navbar-toggle${menuOpen ? ' navbar-toggle--open' : ''}`}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-right${menuOpen ? ' navbar-right--open' : ''}`}>
          <nav className="navbar-nav" aria-label="主导航">
            {navItems.map(({ to, label, ...rest }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' navbar-link--active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
                {...rest}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            to={ROUTES.demo}
            className="navbar-cta"
            onClick={() => setMenuOpen(false)}
          >
            查看快测 Demo
          </Link>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="navbar-backdrop"
          aria-label="关闭菜单"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}
