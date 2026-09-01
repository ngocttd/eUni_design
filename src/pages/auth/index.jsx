import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import './auth.css'

/* Cổng demo — không xác thực thật, chọn vai trò để vào thẳng portal */
const DEMO_PORTALS = [
  { label: 'Sinh viên', to: '/euni/sinh-vien' },
  { label: 'Giảng viên', to: '/euni/giang-vien' },
  { label: 'Phụ huynh', to: '/euni/phu-huynh' },
  { label: 'Lãnh đạo', to: '/euni/lanh-dao' },
  { label: 'CMS / Quản trị', to: '/cms' },
]

/* Ô nhập mật khẩu có nút ẩn/hiện */
function PwInput({ placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <div className="auth-field">
      <Icon name="lock" size={17} />
      <input type={show ? 'text' : 'password'} placeholder={placeholder} />
      <button type="button" className="auth-field__eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
        <Icon name={show ? 'eye-off' : 'eye'} size={17} />
      </button>
    </div>
  )
}

function MsButton({ label = 'Đăng nhập với Microsoft 365' }) {
  return (
    <button type="button" className="auth-sso">
      <Icon name="microsoft" size={16} /> {label}
    </button>
  )
}

/* ======================= AUTH-01 · Đăng nhập chung (SSO) ======================= */
export function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="auth-form">
      <h1>Đăng nhập</h1>
      <p className="auth-form__sub">Sử dụng tài khoản HUMG (SSO)</p>
      <form onSubmit={(e) => { e.preventDefault(); navigate('/euni/sinh-vien') }}>
        <div className="auth-field">
          <Icon name="user" size={17} />
          <input type="text" defaultValue="2151000123" placeholder="Tên đăng nhập / Email / Mã số" />
        </div>
        <PwInput placeholder="Mật khẩu" />
        <div className="auth-row">
          <label className="auth-check"><input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập</label>
          <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
        </div>
        <button type="submit" className="humg-btn humg-btn--primary humg-btn--block">Đăng nhập</button>
      </form>

      <div className="auth-divider"><span>hoặc vào cổng demo</span></div>
      <div className="auth-demo">
        {DEMO_PORTALS.map((d) => (
          <button
            key={d.to}
            type="button"
            className={`humg-btn humg-btn--ghost${d.to === '/cms' ? ' auth-demo__wide' : ''}`}
            onClick={() => navigate(d.to)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <p className="auth-note">Bản demo — bấm <strong>Đăng nhập</strong> hoặc chọn vai trò để vào thẳng cổng, không cần mật khẩu.</p>

      <div className="auth-divider"><span>hoặc đăng nhập bằng</span></div>
      <MsButton />
    </div>
  )
}

/* ======================= AUTH-02 · Đăng nhập phụ huynh ======================= */
export function ParentLoginPage() {
  return (
    <div className="auth-form">
      <h1>Đăng nhập phụ huynh</h1>
      <p className="auth-form__sub">Dành cho phụ huynh / người giám hộ</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field">
          <Icon name="mail" size={17} />
          <input type="email" placeholder="Email đã đăng ký" />
        </div>
        <PwInput placeholder="Mật khẩu" />
        <div className="auth-row">
          <label className="auth-check"><input type="checkbox" /> Ghi nhớ đăng nhập</label>
          <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
        </div>
        <button type="submit" className="humg-btn humg-btn--primary humg-btn--block">Đăng nhập</button>
      </form>
      <div className="auth-divider"><span>hoặc đăng nhập bằng</span></div>
      <MsButton />
      <p className="auth-note">Chưa có tài khoản? <Link to="/lien-he">Đăng ký ngay</Link></p>
    </div>
  )
}

/* ======================= AUTH-03 · Đổi mật khẩu ======================= */
export function ChangePasswordPage() {
  return (
    <div className="auth-form">
      <h1>Đổi mật khẩu</h1>
      <p className="auth-form__sub">Cập nhật mật khẩu mới để bảo mật tài khoản</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <PwInput placeholder="Mật khẩu hiện tại" />
        <PwInput placeholder="Mật khẩu mới" />
        <PwInput placeholder="Xác nhận mật khẩu mới" />
        <div className="auth-req">
          <strong>Yêu cầu mật khẩu:</strong>
          <ul>
            <li><Icon name="check" size={13} /> Tối thiểu 8 ký tự</li>
            <li><Icon name="check" size={13} /> Bao gồm chữ hoa và chữ thường</li>
            <li><Icon name="check" size={13} /> Bao gồm số và ký tự đặc biệt</li>
          </ul>
        </div>
        <button type="submit" className="humg-btn humg-btn--primary humg-btn--block">Cập nhật mật khẩu</button>
        <Link to="/dang-nhap" className="humg-btn humg-btn--ghost humg-btn--block">Hủy bỏ</Link>
      </form>
    </div>
  )
}

/* ======================= AUTH-04 · Quên mật khẩu ======================= */
export function ForgotPasswordPage() {
  return (
    <div className="auth-form">
      <h1>Quên mật khẩu</h1>
      <p className="auth-form__sub">Nhập email để nhận hướng dẫn đặt lại mật khẩu</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field">
          <Icon name="mail" size={17} />
          <input type="email" placeholder="Email đã đăng ký" />
        </div>
        <button type="submit" className="humg-btn humg-btn--primary humg-btn--block">Gửi yêu cầu</button>
      </form>
      <div className="auth-divider"><span>hoặc</span></div>
      <Link to="/dang-nhap" className="auth-back-link"><Icon name="arrow-left" size={15} /> Quay lại đăng nhập</Link>
      <div className="auth-hint">
        <Icon name="bell" size={16} />
        <span>Hệ thống sẽ gửi link đặt lại mật khẩu về email bạn đã dùng để đăng ký tài khoản.</span>
      </div>
    </div>
  )
}
