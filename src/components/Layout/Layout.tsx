import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <div className="layout-bg" aria-hidden="true" />
      <ScrollRestoration />
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
