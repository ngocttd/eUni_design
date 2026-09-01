import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from '../common/ScrollToTop.jsx'
import './layout.css'

export default function PublicLayout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
