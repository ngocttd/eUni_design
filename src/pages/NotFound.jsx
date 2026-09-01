import { Link } from 'react-router-dom'
import Icon from '../lib/Icon.jsx'

export default function NotFound() {
  return (
    <section className="humg-section">
      <div className="humg-container" style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ fontSize: 64, fontWeight: 800, color: 'var(--humg-primary)', margin: 0 }}>404</p>
        <h1 style={{ marginTop: 8 }}>Không tìm thấy trang</h1>
        <p style={{ color: 'var(--humg-text-secondary)' }}>
          Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển.
        </p>
        <Link to="/" className="humg-btn humg-btn--primary">
          <Icon name="arrow-left" size={16} /> Về trang chủ
        </Link>
      </div>
    </section>
  )
}
