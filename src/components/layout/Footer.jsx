import { Link } from 'react-router-dom'
import Brand from '../common/Brand.jsx'
import Icon from '../../lib/Icon.jsx'
import { footerColumns } from '../../routes/sitemap.js'
import './Footer.css'

const socials = [
  { icon: 'facebook', label: 'Facebook', href: '#', cls: 'is-fb' },
  { icon: 'youtube', label: 'YouTube', href: '#', cls: 'is-yt' },
  { icon: 'linkedin', label: 'LinkedIn', href: '#', cls: 'is-li' },
  { icon: 'zalo', label: 'Zalo', href: '#', cls: 'is-zl' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__about">
          <Brand variant="light" />
          <ul className="site-footer__contact">
            <li><Icon name="map-pin" size={16} /> 18 Phố Viên, Đức Thắng, Bắc Từ Liêm, Hà Nội</li>
            <li><Icon name="phone" size={16} /> 024.3838.3806</li>
            <li><Icon name="mail" size={16} /> humg@humg.edu.vn</li>
            <li><Icon name="globe" size={16} /> www.humg.edu.vn</li>
          </ul>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} className="site-footer__col" aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.path}><Icon name="chevron-right" size={12} /> {l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="site-footer__col">
          <h3>Kết nối với HUMG</h3>
          <div className="site-footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className={s.cls}>
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
          <h3 style={{ marginTop: 20 }}>Tải ứng dụng HUMG eUni</h3>
          <div className="site-footer__apps">
            <div className="site-footer__stores">
              <span className="site-footer__store"><Icon name="external" size={15} /> App Store</span>
              <span className="site-footer__store"><Icon name="external" size={15} /> Google Play</span>
            </div>
            <span className="site-footer__qr" aria-hidden="true">QR</span>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <span>© 2025 Trường Đại học Mỏ – Địa chất. All rights reserved.</span>
          <span className="site-footer__bottom-links">
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/lien-he">Liên hệ</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
