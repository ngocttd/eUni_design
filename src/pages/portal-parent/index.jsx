import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import { Panel, DataTable, Pagination } from '../../components/ui/page.jsx'
import '../portal-student/portal-student.css'
import './portal-parent.css'
import {
  ppParent, ppChild, ppTerm, ppDashboard, ppResults, ppTuition, ppAttendance,
  ppSchedule, ppNotices, ppRequestTypes, ppContactInfo, ppWorkingHours,
  ppRequestHistory, ppServices, ppLinks,
} from '../../data/portalParent.js'

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
const DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
const DONUT_COLORS = ['#0a3d91', '#1976d2', '#f59e0b', '#94a3b8', '#ef4444']

function Head({ title, sub, right }) {
  return <div className="ps-head"><div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>{right && <div className="ps-head__right">{right}</div>}</div>
}
function Stats({ items }) {
  return <div className="ps-stats">{items.map((s) => <div key={s.label} className="ps-stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}</div>
}
function Tag({ v }) {
  const s = norm(v)
  const cls = /da thanh toan|thanh cong|hoan thanh|da phan hoi|da xuat|co mat|on dinh|cai thien/.test(s) ? 'ps-tag--done'
    : /dang xu ly|cho/.test(s) ? 'ps-tag--warn'
    : /vang|khong phep/.test(s) ? 'ps-tag--cancel'
    : 'ps-tag--run'
  return <span className={`ps-tag ${cls}`}>{v}</span>
}
function Week({ rows, slots }) {
  return (
    <div className="ps-week-wrap"><div className="ps-week">
      <span className="ps-week__corner">Tiết \ Thứ</span>
      {DAYS.map((d) => <span key={d} className="ps-week__head">{d}</span>)}
      {slots.map((slot) => (
        <div key={slot} style={{ display: 'contents' }}>
          <span className="ps-week__slot">{slot}</span>
          {DAYS.map((d) => {
            const c = rows.find((r) => r.day === d && r.slot === slot)
            return <span key={d} className={`ps-week__cell ${c ? 'has' : ''}`}>{c && <><strong>{c.course}</strong><em>{c.room}</em></>}</span>
          })}
        </div>
      ))}
    </div></div>
  )
}
function MultiDonut({ centerTop, centerBottom, parts }) {
  let acc = 0
  const stops = parts.map((p, i) => {
    const from = acc; acc += p.pct
    return `${DONUT_COLORS[i % DONUT_COLORS.length]} ${from}% ${acc}%`
  }).join(', ')
  return (
    <div className="pp-donut">
      <span className="pp-donut__ring" style={{ background: `conic-gradient(${stops})` }}>
        <span className="pp-donut__hole"><strong>{centerTop}</strong><em>{centerBottom}</em></span>
      </span>
      <ul className="pp-legend">
        {parts.map((p, i) => (
          <li key={p.label}><span style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />{p.label} · {p.pct}%</li>
        ))}
      </ul>
    </div>
  )
}
function LineChart({ labels, points }) {
  const w = 480, h = 150, pad = 26
  const min = Math.min(...points) - 0.2
  const max = Math.max(...points) + 0.2
  const x = (i) => pad + (i * (w - pad * 2)) / (points.length - 1)
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2)
  return (
    <div className="pp-linechart">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Điểm trung bình theo học kỳ">
        <polyline points={points.map((v, i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke="var(--humg-secondary)" strokeWidth="2" />
        {points.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="var(--humg-primary)" />)}
        {points.map((v, i) => <text key={`t${i}`} x={x(i)} y={y(v) - 9} textAnchor="middle" fontSize="10" fill="var(--humg-text-secondary)">{v.toFixed(2)}</text>)}
      </svg>
      <div className="pp-linechart__labels">{labels.map((l) => <span key={l}>{l}</span>)}</div>
    </div>
  )
}

/* ======================= 13.1 · TỔNG QUAN (DASHBOARD) ======================= */
export function PpDashboard() {
  const [year, setYear] = useState(ppDashboard.years[0])
  const d = ppDashboard
  const c = ppChild
  return (
    <>
      <Head title={`Xin chào, ${ppParent.name}! 👋`} sub={`Dưới đây là thông tin học tập của ${ppParent.child}`} right={
        <label className="ps-filter"><span>Năm học</span>
          <select value={year} onChange={(e) => setYear(e.target.value)}>{d.years.map((y) => <option key={y}>{y}</option>)}</select>
        </label>
      } />

      <div className="pp-studentcard">
        <span className="humg-ph" data-ratio="1-1"><span>Ảnh</span></span>
        <div>
          <strong>{c.name}</strong>
          <ul>
            <li><span>MSSV</span>{c.mssv}</li>
            <li><span>Khoa</span>{c.faculty}</li>
            <li><span>Ngành</span>{c.major}</li>
            <li><span>Lớp</span>{c.class}</li>
            <li><span>Hệ đào tạo</span>{c.mode}</li>
            <li><span>Năm học</span>{c.year}</li>
          </ul>
        </div>
      </div>

      <div className="ps-stats pp-stats6">
        {d.stats.map((s) => (
          <div key={s.label} className="ps-stat">
            <strong>{s.value}{s.unit && <i> {s.unit}</i>}</strong>
            <span>{s.label}</span>
            {s.note && <em className="pp-stat__note">{s.note}</em>}
          </div>
        ))}
      </div>

      <div className="ps-grid2">
        <Panel title="Kết quả học tập kỳ 2 (2024 – 2025)" icon="award" action={<Link className="humg-link-more" to="/euni/phu-huynh/ket-qua-hoc-tap">Xem chi tiết <Icon name="arrow-right" size={13} /></Link>}>
          <MultiDonut centerTop={d.gradeDonut.total} centerBottom="môn" parts={d.gradeDonut.parts} />
        </Panel>
        <Panel title="Điểm trung bình theo học kỳ" icon="grid" action={<Link className="humg-link-more" to="/euni/phu-huynh/ket-qua-hoc-tap">Xem toàn bộ <Icon name="arrow-right" size={13} /></Link>}>
          <LineChart labels={d.gpaTrend.labels} points={d.gpaTrend.points} />
        </Panel>
      </div>

      <Panel title="Thông báo mới nhất" icon="bell" action={
        <Link className="humg-link-more" to="/euni/phu-huynh/thong-bao">Xem tất cả <Icon name="arrow-right" size={13} /></Link>
      }>
        <ul className="ps-notice">{d.notices.map((n) => <li key={n.title}><span>{n.date}</span><p>{n.title}</p></li>)}</ul>
      </Panel>
    </>
  )
}

/* ======================= THÔNG TIN SINH VIÊN ======================= */
export function PpChild() {
  const [tab, setTab] = useState('cn')
  const c = ppChild
  return (
    <>
      <Head title="Thông tin sinh viên" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'cn' ? 'is-active' : ''} onClick={() => setTab('cn')}>Thông tin cá nhân</button>
          <button type="button" className={tab === 'dt' ? 'is-active' : ''} onClick={() => setTab('dt')}>Thông tin đào tạo</button>
          <button type="button" className={tab === 'gd' ? 'is-active' : ''} onClick={() => setTab('gd')}>Thông tin gia đình</button>
        </div>
        <div className="ps-tabbody ps-profile">
          <div className="ps-profile__photo"><span className="humg-ph" data-ratio="1-1"><span>Ảnh</span></span></div>
          {tab === 'cn' && <DataTable columns={['Mục', 'Thông tin']} rows={[
            ['Họ và tên', c.name], ['MSSV', c.mssv], ['Ngày sinh', c.dob], ['Giới tính', c.gender], ['Dân tộc', c.ethnic],
            ['CCCD', c.cccd], ['Ngày cấp', c.issued], ['Nơi cấp', c.issuedBy], ['Email nhà trường', c.email], ['Địa chỉ', c.address],
          ]} />}
          {tab === 'dt' && <DataTable columns={['Mục', 'Thông tin']} rows={[
            ['Khoa', c.faculty], ['Ngành', c.major], ['Chương trình', c.program], ['Hệ đào tạo', c.mode],
            ['Lớp', c.class], ['Khóa', c.cohort], ['Năm học hiện tại', c.year],
          ]} />}
          {tab === 'gd' && <DataTable columns={['Mục', 'Thông tin']} rows={c.family} />}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 13.2 · KẾT QUẢ HỌC TẬP ======================= */
export function PpResults() {
  const [tab, setTab] = useState('hk')
  const [term, setTerm] = useState(ppResults.terms[0])
  return (
    <>
      <Head title="Kết quả học tập" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'hk' ? 'is-active' : ''} onClick={() => setTab('hk')}>Theo học kỳ</button>
          <button type="button" className={tab === 'mh' ? 'is-active' : ''} onClick={() => setTab('mh')}>Theo môn học</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'hk' && (
            <>
              <div className="pp-bar">
                <label className="ps-filter"><span>Học kỳ</span>
                  <select value={term} onChange={(e) => setTerm(e.target.value)}>{ppResults.terms.map((t) => <option key={t}>{t}</option>)}</select>
                </label>
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="download" size={13} /> Xuất PDF</button>
              </div>
              <DataTable
                columns={['STT', 'Mã học phần', 'Tên học phần', 'Số tín chỉ', 'Điểm chữ', 'Điểm số']}
                rows={ppResults.courses}
              />
              <div className="ps-stats pp-stats4">
                {ppResults.summary.map((s) => <div key={s.label} className="ps-stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}
              </div>
            </>
          )}
          {tab === 'mh' && (
            <DataTable
              columns={ppResults.bySubject.columns}
              rows={ppResults.bySubject.rows.map((r) => [...r.slice(0, 4), <Tag key="x" v={r[4]} />])}
            />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 13.3 · HỌC PHÍ & THANH TOÁN ======================= */
export function PpTuition() {
  const [tab, setTab] = useState('tq')
  const t = ppTuition
  return (
    <>
      <Head title="Học phí & Thanh toán" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'tq' ? 'is-active' : ''} onClick={() => setTab('tq')}>Tổng quan</button>
          <button type="button" className={tab === 'ls' ? 'is-active' : ''} onClick={() => setTab('ls')}>Lịch sử thanh toán</button>
          <button type="button" className={tab === 'hd' ? 'is-active' : ''} onClick={() => setTab('hd')}>Hóa đơn</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'tq' && (
            <>
              <h4 className="ps-subhead">Tổng quan học phí</h4>
              <div className="ps-stats pp-stats4">
                <div className="ps-stat"><strong>{t.overview.total}</strong><span>Tổng học phí phải đóng</span></div>
                <div className="ps-stat"><strong>{t.overview.paid}</strong><span>Đã thanh toán</span></div>
                <div className="ps-stat"><strong>{t.overview.due}</strong><span>Còn phải nộp</span></div>
                <div className="ps-stat"><strong><Tag v={t.overview.status} /></strong><span>Trạng thái</span></div>
              </div>
              <h4 className="ps-subhead">{t.detailTitle}</h4>
              <DataTable
                columns={['Khoản thu', 'Số tiền (VNĐ)', 'Trạng thái']}
                rows={[
                  ...t.fees.map((f) => [f[0], f[1], f[2] === '–' ? '–' : <Tag key="s" v={f[2]} />]),
                  [<strong key="t">{t.totalRow[0]}</strong>, <strong key="v">{t.totalRow[1]}</strong>, <Tag key="s" v={t.totalRow[2]} />],
                ]}
              />
            </>
          )}
          {tab === 'ls' && (
            <DataTable columns={['Ngày', 'Nội dung', 'Số tiền', 'Hình thức', 'Trạng thái']}
              rows={t.history.map((r) => [...r.slice(0, 4), <Tag key="s" v={r[4]} />])} />
          )}
          {tab === 'hd' && (
            <DataTable columns={['Số hóa đơn', 'Nội dung', 'Số tiền', 'Ngày xuất', 'Trạng thái']}
              rows={t.invoices.map((r) => [...r.slice(0, 4), <Tag key="s" v={r[4]} />])} />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 13.4 · ĐIỂM DANH ======================= */
export function PpAttendance() {
  const a = ppAttendance
  const [term, setTerm] = useState(a.terms[0])
  const [subject, setSubject] = useState(a.subjects[0])
  return (
    <>
      <Head title="Điểm danh" right={
        <form className="ps-filter" onSubmit={(e) => e.preventDefault()}>
          <select value={term} onChange={(e) => setTerm(e.target.value)}>{a.terms.map((t) => <option key={t}>{t}</option>)}</select>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>{a.subjects.map((s) => <option key={s}>{s}</option>)}</select>
        </form>
      } />
      <div className="ps-stats pp-stats4">
        {a.stats.map((s) => (
          <div key={s.label} className="ps-stat">
            <strong className={s.tone === 'ok' ? 'pp-ok' : s.tone === 'bad' ? 'pp-bad' : ''}>{s.value}</strong>
            <span>{s.label}{s.note && <em className="pp-stat__note"> ({s.note})</em>}</span>
          </div>
        ))}
      </div>
      <Panel title="Lịch sử điểm danh" icon="check">
        <DataTable
          columns={['Ngày', 'Buổi', 'Nội dung', 'Trạng thái', 'Ghi chú']}
          rows={a.history.map((r) => [r[0], r[1], r[2], <Tag key="s" v={r[3]} />, r[4]])}
        />
      </Panel>
    </>
  )
}

/* ======================= 13.5 · THÔNG BÁO ======================= */
export function PpNotices() {
  const n = ppNotices
  const [tab, setTab] = useState('Tất cả')
  const list = tab === 'Tất cả' ? n.list : n.list.filter((x) => x.cat === tab)
  return (
    <>
      <Head title="Thông báo" sub={`${n.total} thông báo`} right={
        <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="check" size={13} /> Đánh dấu đã đọc</button>
      } />
      <Panel flush>
        <div className="ps-tabs ps-tabs--wrap">
          {n.tabs.map((t) => (
            <button key={t} type="button" className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="ps-tabbody">
          <ul className="ps-noti">
            {list.map((x) => (
              <li key={x.title} className={x.unread ? 'is-unread' : ''}>
                <span className="ps-noti__ic"><Icon name={x.icon} size={18} /></span>
                <div className="ps-noti__body">
                  <div className="ps-noti__top"><strong>{x.title}</strong><span className="ps-tag ps-tag--run">{x.cat}</span></div>
                  <p>{x.desc}</p>
                  <em>{x.date}</em>
                </div>
              </li>
            ))}
          </ul>
          {!list.length && <p className="ps-muted" style={{ padding: 12 }}>Không có thông báo trong mục này.</p>}
          <div className="ps-listfoot">
            <span>Hiển thị 1 – {list.length} trong tổng số {n.total} thông báo</span>
            <Pagination page={1} total={3} />
          </div>
        </div>
      </Panel>
    </>
  )
}

/* ======================= 13.6 · LIÊN HỆ NHÀ TRƯỜNG ======================= */
export function PpContact() {
  const [tab, setTab] = useState('gui')
  return (
    <>
      <Head title="Liên hệ nhà trường" />
      <div className="pp-contactgrid">
        <Panel flush>
          <div className="ps-tabs">
            <button type="button" className={tab === 'gui' ? 'is-active' : ''} onClick={() => setTab('gui')}>Gửi yêu cầu</button>
            <button type="button" className={tab === 'ls' ? 'is-active' : ''} onClick={() => setTab('ls')}>Lịch sử yêu cầu</button>
          </div>
          <div className="ps-tabbody">
            {tab === 'gui' && (
              <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
                <label className="ps-formgrid__wide">Loại yêu cầu
                  <select>{ppRequestTypes.map((r) => <option key={r}>{r}</option>)}</select>
                </label>
                <label className="ps-formgrid__wide">Tiêu đề<input type="text" placeholder="Nhập tiêu đề yêu cầu" /></label>
                <label className="ps-formgrid__wide">Nội dung<textarea rows="5" placeholder="Nhập nội dung chi tiết yêu cầu…" /></label>
                <label className="ps-formgrid__wide">Tệp đính kèm
                  <input type="file" />
                  <em className="pp-hint">Định dạng: PDF, JPG, PNG (Tối đa 5MB)</em>
                </label>
                <div className="pp-formact">
                  <button type="button" className="humg-btn humg-btn--ghost">Hủy bỏ</button>
                  <button type="submit" className="humg-btn humg-btn--primary">Gửi yêu cầu</button>
                </div>
              </form>
            )}
            {tab === 'ls' && (
              <DataTable
                columns={['Mã yêu cầu', 'Tiêu đề', 'Đơn vị xử lý', 'Ngày gửi', 'Trạng thái']}
                rows={ppRequestHistory.map((r) => [...r.slice(0, 4), <Tag key="s" v={r[4]} />])}
              />
            )}
          </div>
        </Panel>

        <Panel title="Thông tin liên hệ" icon="phone">
          <ul className="pp-contactlist">
            {ppContactInfo.map((c) => (
              <li key={c.unit}>
                <strong>{c.unit}</strong>
                <span><Icon name="phone" size={13} /> {c.phone}</span>
                <span><Icon name="mail" size={13} /> {c.email}</span>
              </li>
            ))}
            <li>
              <strong>Thời gian làm việc</strong>
              {ppWorkingHours.map((h) => <span key={h}><Icon name="clock" size={13} /> {h}</span>)}
            </li>
          </ul>
        </Panel>
      </div>
    </>
  )
}

/* ======================= ĐĂNG KÝ DỊCH VỤ ======================= */
export function PpServices() {
  const s = ppServices
  const [tab, setTab] = useState('dk')
  return (
    <>
      <Head title="Đăng ký dịch vụ" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'dk' ? 'is-active' : ''} onClick={() => setTab('dk')}>Dịch vụ khả dụng</button>
          <button type="button" className={tab === 'ls' ? 'is-active' : ''} onClick={() => setTab('ls')}>Yêu cầu của tôi</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'dk' && (
            <div className="pp-svcgrid">
              {s.catalog.map((x) => (
                <div key={x.title} className="pp-svc">
                  <span className="pp-svc__ic"><Icon name={x.icon} size={20} /></span>
                  <strong>{x.title}</strong>
                  <span>Lệ phí: {x.fee}</span>
                  <span>Thời gian: {x.time}</span>
                  <button type="button" className="humg-btn humg-btn--primary humg-btn--sm humg-btn--block">Đăng ký</button>
                </div>
              ))}
            </div>
          )}
          {tab === 'ls' && (
            <DataTable
              columns={['Mã yêu cầu', 'Dịch vụ', 'Ngày gửi', 'Trạng thái']}
              rows={s.history.map((r) => [r[0], r[1], r[2], <Tag key="s" v={r[3]} />])}
            />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= LỊCH HỌC (POR-24) ======================= */
export function PpSchedule() {
  const [tab, setTab] = useState('hoc')
  const [week, setWeek] = useState(ppSchedule.weeks[0])
  return (
    <>
      <Head title="Lịch học – Lịch thi" sub={ppTerm} />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'hoc' ? 'is-active' : ''} onClick={() => setTab('hoc')}>Lịch học</button>
          <button type="button" className={tab === 'thi' ? 'is-active' : ''} onClick={() => setTab('thi')}>Lịch thi</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'hoc' && (
            <>
              <form className="ps-filter" onSubmit={(e) => e.preventDefault()} style={{ marginBottom: 14 }}>
                <span>Chọn tuần</span>
                <select value={week} onChange={(e) => setWeek(e.target.value)}>{ppSchedule.weeks.map((w) => <option key={w}>{w}</option>)}</select>
              </form>
              <Week rows={ppSchedule.timetable} slots={ppSchedule.slots} />
            </>
          )}
          {tab === 'thi' && <DataTable columns={['Học phần', 'Mã HP', 'Ngày thi', 'Ca thi', 'Phòng']} rows={ppSchedule.exams} />}
        </div>
      </Panel>
    </>
  )
}

/* ======================= CÀI ĐẶT TÀI KHOẢN ======================= */
export function PpSettings() {
  const [tab, setTab] = useState('tk')
  return (
    <>
      <Head title="Cài đặt tài khoản" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'tk' ? 'is-active' : ''} onClick={() => setTab('tk')}>Thông tin tài khoản</button>
          <button type="button" className={tab === 'mk' ? 'is-active' : ''} onClick={() => setTab('mk')}>Đổi mật khẩu</button>
          <button type="button" className={tab === 'lk' ? 'is-active' : ''} onClick={() => setTab('lk')}>Quản lý liên kết</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'tk' && <DataTable columns={['Mục', 'Thông tin']} rows={[
            ['Họ và tên', ppParent.name], ['Quan hệ với sinh viên', ppParent.relation], ['Email', ppParent.email],
            ['Số điện thoại', ppParent.phone], ['Địa chỉ', ppParent.address],
          ]} />}
          {tab === 'mk' && (
            <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
              <label>Mật khẩu hiện tại<input type="password" /></label>
              <label>Mật khẩu mới<input type="password" /></label>
              <label>Nhập lại mật khẩu mới<input type="password" /></label>
              <button type="submit" className="humg-btn humg-btn--primary">Cập nhật</button>
            </form>
          )}
          {tab === 'lk' && (
            <>
              <DataTable columns={['STT', 'Họ và tên', 'MSSV', 'Lớp', 'Quan hệ']} rows={ppLinks} />
              <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm" style={{ marginTop: 12 }}><Icon name="arrow-right" size={13} /> Thêm học sinh</button>
            </>
          )}
        </div>
      </Panel>
    </>
  )
}
