import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import { Panel, DataTable, FilterBar, Pagination } from '../../components/ui/page.jsx'
import {
  psStudent, psTerm, psDashboard, psStudyCorner, psResults, psSchedule,
  psTuition, psForms, psProgress, psServices, psLibrary,
  psRegCourses, psRegThesis, psRegIntern,
  psNotifications, psTickets, psSettings,
} from '../../data/portalStudent.js'
import './portal-student.css'

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')

function PageHead({ title, sub, right }) {
  return (
    <div className="ps-head">
      <div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      {right && <div className="ps-head__right">{right}</div>}
    </div>
  )
}

function Donut({ pct, caption }) {
  return (
    <div className="ps-donut" style={{ '--pct': pct }}>
      <span className="ps-donut__ring"><strong>{pct}%</strong></span>
      {caption && <span className="ps-donut__cap">{caption}</span>}
    </div>
  )
}


/* ======================= 10.1 · TỔNG QUAN (DASHBOARD) ======================= */
export function PsDashboard() {
  const d = psDashboard
  return (
    <>
      <PageHead title={`Xin chào, ${psStudent.name} 👋`} sub={`Sinh viên · ${psStudent.faculty}`} />
      <div className="ps-stats ps-stats--4">
        {d.stats.map((s) => (
          <div key={s.label} className="ps-stat">
            <strong>{s.value}{s.unit && <i> {s.unit}</i>}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="ps-grid2">
        <Panel title="Thông tin kỳ học hiện tại" icon="grid">
          <ul className="ps-kv">
            {d.termInfo.map(([k, v]) => <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
          </ul>
        </Panel>
        <Panel title="Thông báo mới" icon="bell" action={<Link to="/euni/sinh-vien/thong-bao" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={13} /></Link>}>
          <ul className="ps-notice">
            {d.notices.map((n) => <li key={n.title}><span>{n.date}</span><p>{n.title}</p></li>)}
          </ul>
        </Panel>
      </div>

      <div className="ps-grid2">
        <Panel title={`Lịch học hôm nay · ${d.today.date}`} icon="calendar" action={<Link to="/euni/sinh-vien/lich-hoc" className="humg-link-more">Xem TKB <Icon name="arrow-right" size={13} /></Link>}>
          {d.today.rows.length === 0
            ? <p className="ps-muted">Hôm nay không có lịch học.</p>
            : d.today.rows.map((r) => (
              <div key={r.course} className="ps-todaycard">
                <span className="ps-todaycard__time">{r.time}</span>
                <div>
                  <strong>{r.course}</strong>
                  <span>Phòng {r.room} · Giảng viên: {r.lecturer}</span>
                </div>
              </div>
            ))}
        </Panel>
        <Panel title="Tiến độ học tập" icon="target" action={<Link to="/euni/sinh-vien/tien-do-hoc-tap" className="humg-link-more">Xem chi tiết <Icon name="arrow-right" size={13} /></Link>}>
          <div className="ps-plan">
            <Donut pct={d.progress.pct} caption="Đã hoàn thành" />
            <p className="ps-muted">Bạn đã hoàn thành <strong>{d.progress.done}/{d.progress.total}</strong> tín chỉ toàn khóa.</p>
          </div>
        </Panel>
      </div>

      <Panel title="Tính năng nhanh" icon="grid">
        <div className="ps-quicklinks">
          {d.quickLinks.map((q) => (
            <Link key={q.label} to={q.to} className="ps-quicklink">
              <span className="ps-quicklink__ic"><Icon name={q.icon} size={20} /></span>
              {q.label}
            </Link>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* ======================= POR-02 · GÓC HỌC TẬP ======================= */
export function PsStudyCorner() {
  const p = psStudyCorner.plan
  return (
    <>
      <PageHead title="Góc học tập" sub={psTerm} />
      <Panel title="Kế hoạch học tập" icon="target" action={<Link to="/euni/sinh-vien/tien-do-hoc-tap" className="humg-link-more">Chi tiết kế hoạch <Icon name="arrow-right" size={13} /></Link>}>
        <div className="ps-plan">
          <Donut pct={p.pct} caption="Đã học / tổng CT" />
          <ul className="ps-plan__list">
            <li><span>Số tín chỉ chương trình</span><strong>{p.total}</strong></li>
            <li><span>Số tín chỉ đã tích lũy</span><strong>{p.done}</strong></li>
            <li><span>Đang đăng ký học kỳ này</span><strong>{p.required}</strong></li>
            <li><span>Số tín chỉ còn lại</span><strong>{p.remain}</strong></li>
          </ul>
        </div>
      </Panel>
      <Panel title="Môn học đang học" icon="book" action={<Link to="/euni/sinh-vien/ket-qua-hoc-tap" className="humg-link-more">Tất cả môn học <Icon name="arrow-right" size={13} /></Link>}>
        <DataTable
          columns={['Mã HP', 'Tên học phần', 'TC', 'Giảng viên', 'Trạng thái']}
          rows={psStudyCorner.courses.map((c) => [
            c.code, c.name, String(c.credits), c.lecturer,
            <span key="s" className="ps-tag ps-tag--run">{c.status}</span>,
          ])}
        />
      </Panel>
    </>
  )
}

/* ======================= 10.3 · KẾT QUẢ HỌC TẬP ======================= */
export function PsResults() {
  const [term, setTerm] = useState(psResults.terms[0])
  const [tab, setTab] = useState('hk')
  return (
    <>
      <PageHead title="Kết quả học tập" sub={psTerm} />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'hk' ? 'is-active' : ''} onClick={() => setTab('hk')}>Kết quả học kỳ</button>
          <button type="button" className={tab === 'tl' ? 'is-active' : ''} onClick={() => setTab('tl')}>Kết quả tích lũy</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'hk' && (
            <>
              <div className="ps-resbar">
                <label className="ps-filter"><span>Học kỳ</span>
                  <select value={term} onChange={(e) => setTerm(e.target.value)}>{psResults.terms.map((t) => <option key={t}>{t}</option>)}</select>
                </label>
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="download" size={13} /> Xuất PDF</button>
              </div>
              <DataTable
                columns={['STT', 'Mã học phần', 'Tên học phần', 'Số tín chỉ', 'Điểm chữ', 'Điểm số']}
                rows={psResults.courses}
              />
              <div className="ps-stats ps-stats--4 ps-resstats">
                {psResults.summary.map((s) => (
                  <div key={s.label} className="ps-stat"><strong>{s.value}</strong><span>{s.label}</span></div>
                ))}
              </div>
            </>
          )}
          {tab === 'tl' && (
            <DataTable columns={psResults.cumulative.columns} rows={psResults.cumulative.rows} />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 10.2 · THỜI KHÓA BIỂU ======================= */
function CalendarGrid({ data }) {
  const HOURS = psSchedule.hours
  const H = 46
  const first = HOURS[0]
  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
  return (
    <div className="ps-cal-wrap">
      <div className="ps-cal">
        <div className="ps-cal__corner" />
        {days.map((d, i) => (
          <div key={d} className="ps-cal__dayhead"><strong>{d}</strong><span>{psSchedule.dayDates[i]}</span></div>
        ))}
        <div className="ps-cal__timecol">
          {HOURS.map((h) => <div key={h} className="ps-cal__hour" style={{ height: H }}>{String(h).padStart(2, '0')}:00</div>)}
        </div>
        {days.map((d, di) => (
          <div key={d} className="ps-cal__daycol" style={{ height: HOURS.length * H }}>
            {HOURS.map((h) => <div key={h} className="ps-cal__slot" style={{ height: H }} />)}
            {data.filter((e) => e.day === di).map((e, k) => (
              <div
                key={k}
                className={`ps-cal__event is-${e.type}`}
                style={{ top: (e.start - first) * H, height: (e.end - e.start) * H }}
              >
                <strong>{e.course}</strong>
                <span>{e.room}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PsSchedule() {
  const [tab, setTab] = useState('tkb')
  const [term, setTerm] = useState(psSchedule.terms[0])
  const [wk, setWk] = useState(0)
  return (
    <>
      <PageHead title="Thời khóa biểu" sub={psTerm} />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'tkb' ? 'is-active' : ''} onClick={() => setTab('tkb')}>Thời khóa biểu</button>
          <button type="button" className={tab === 'thi' ? 'is-active' : ''} onClick={() => setTab('thi')}>Lịch thi</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'tkb' && (
            <>
              <div className="ps-calbar">
                <label className="ps-filter"><span>Học kỳ</span>
                  <select value={term} onChange={(e) => setTerm(e.target.value)}>{psSchedule.terms.map((t) => <option key={t}>{t}</option>)}</select>
                </label>
                <div className="ps-weeknav">
                  <button type="button" onClick={() => setWk((w) => Math.max(0, w - 1))} aria-label="Tuần trước"><Icon name="chevron-left" size={16} /></button>
                  <span>{psSchedule.weeks[wk]}</span>
                  <button type="button" onClick={() => setWk((w) => Math.min(psSchedule.weeks.length - 1, w + 1))} aria-label="Tuần sau"><Icon name="chevron-right" size={16} /></button>
                </div>
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm" onClick={() => setWk(0)}>Hôm nay</button>
              </div>
              <CalendarGrid data={psSchedule.timetable} />
              <div className="ps-callegend">
                <span><i className="is-ly-thuyet" /> Lý thuyết</span>
                <span><i className="is-thuc-hanh" /> Thực hành</span>
                <span><i className="is-tu-chon" /> Tự chọn</span>
              </div>
            </>
          )}
          {tab === 'thi' && (
            <DataTable
              columns={['Học phần', 'Mã HP', 'Ngày thi', 'Ca thi', 'Phòng', 'Hình thức']}
              rows={psSchedule.exams}
            />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 10.4 · TÀI CHÍNH ======================= */
export function PsTuition() {
  const [tab, setTab] = useState('tq')
  const t = psTuition
  return (
    <>
      <PageHead title="Tài chính" sub={`Cập nhật đến ngày ${t.asOf}`} />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'tq' ? 'is-active' : ''} onClick={() => setTab('tq')}>Tổng quan</button>
          <button type="button" className={tab === 'hp' ? 'is-active' : ''} onClick={() => setTab('hp')}>Học phí</button>
          <button type="button" className={tab === 'hb' ? 'is-active' : ''} onClick={() => setTab('hb')}>Học bổng</button>
          <button type="button" className={tab === 'ls' ? 'is-active' : ''} onClick={() => setTab('ls')}>Lịch sử giao dịch</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'tq' && (
            <div className="ps-fingrid">
              <div className="ps-balance">
                <span>Số dư hiện tại</span>
                <strong>{t.balance}</strong>
                <button type="button" className="humg-btn humg-btn--primary humg-btn--block">Thanh toán online</button>
                <em>(Tính đến ngày {t.asOf})</em>
              </div>
              <ul className="ps-kv">
                <li><span>Học kỳ</span><strong>{t.term.name}</strong></li>
                <li><span>Tổng học phí</span><strong>{t.term.total}</strong></li>
                <li><span>Đã thanh toán</span><strong>{t.term.paid}</strong></li>
                <li><span>Còn phải nộp</span><strong className="is-warn">{t.term.due}</strong></li>
                <li><span>Hạn nộp</span><strong>{t.term.deadline}</strong></li>
              </ul>
            </div>
          )}
          {tab === 'hp' && (
            <>
              <h4 className="ps-subhead">Các khoản phải nộp</h4>
              <DataTable
                columns={['Nội dung', 'Số tiền (VND)', 'Hạn nộp', 'Trạng thái']}
                rows={t.fees.map((f) => [
                  f[0], f[1], f[2],
                  <span key="s" className={`ps-tag ${f[3] === 'Đã thanh toán' ? 'ps-tag--done' : 'ps-tag--warn'}`}>{f[3]}</span>,
                ])}
              />
            </>
          )}
          {tab === 'hb' && (
            <DataTable columns={['Học kỳ', 'Loại học bổng', 'Số tiền', 'Trạng thái']} rows={t.scholarships} />
          )}
          {tab === 'ls' && (
            <DataTable columns={['Ngày', 'Nội dung', 'Số tiền', 'Hình thức', 'Trạng thái']} rows={t.history} />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= POR-06 · BIỂU MẪU ======================= */
export function PsForms() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Tất cả loại')
  const list = useMemo(() => psForms.list.filter((f) =>
    (cat === 'Tất cả loại' || f.category === cat)
    && (!q || norm(f.name).includes(norm(q)))), [q, cat])
  return (
    <>
      <PageHead title="Biểu mẫu" />
      <Panel title="Danh sách biểu mẫu" icon="layers">
        <form className="ps-filter ps-filter--full" onSubmit={(e) => e.preventDefault()}>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm biểu mẫu…" />
          <select value={cat} onChange={(e) => setCat(e.target.value)}>{psForms.categories.map((c) => <option key={c}>{c}</option>)}</select>
        </form>
        <DataTable
          columns={['#', 'Tên biểu mẫu', 'Loại', 'Định dạng', 'Tải về']}
          rows={list.map((f, i) => [
            String(i + 1), f.name, f.category, f.format,
            <button key="d" type="button" className="ps-dl" aria-label={`Tải ${f.name}`}><Icon name="download" size={14} /></button>,
          ])}
        />
      </Panel>
      <Panel title="Đơn từ của tôi" icon="file">
        <DataTable columns={['Mã đơn', 'Biểu mẫu', 'Ngày gửi', 'Trạng thái']} rows={psForms.mine} />
      </Panel>
    </>
  )
}

/* ======================= POR-07 · TIẾN ĐỘ HỌC TẬP ======================= */
export function PsProgress() {
  const o = psProgress.overall
  return (
    <>
      <PageHead title="Tiến độ học tập" sub={psProgress.program} />
      <Panel title="Tiến độ chương trình" icon="target" action={<Link to="/hoc-tap/chuong-trinh-dao-tao" className="humg-link-more">Kế hoạch chi tiết <Icon name="arrow-right" size={13} /></Link>}>
        <div className="ps-plan">
          <Donut pct={o.pct} caption="Hoàn thành" />
          <ul className="ps-plan__list">
            <li><span>Tổng số tín chỉ chương trình</span><strong>{o.total}</strong></li>
            <li><span>Đã hoàn thành</span><strong>{o.done}</strong></li>
            <li><span>Còn lại</span><strong>{o.remain}</strong></li>
          </ul>
        </div>
      </Panel>
      <Panel title="Phân bố tín chỉ" icon="grid">
        <div className="ps-bars">
          {psProgress.credits.map((c) => (
            <div key={c.label} className="ps-bar">
              <span className="ps-bar__label">{c.label}</span>
              <span className="ps-bar__track"><span style={{ width: `${c.pct}%` }} /></span>
              <span className="ps-bar__val">{c.done}/{c.total} · {c.pct}%</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Việc cần làm tiếp theo" icon="check">
        <ul className="ps-check">
          {psProgress.next.map((t) => <li key={t}><Icon name="check" size={14} /> {t}</li>)}
        </ul>
      </Panel>
    </>
  )
}

/* ======================= 10.5 · HỒ SƠ CÁ NHÂN ======================= */
const PROFILE_SECTIONS = [
  'Thông tin cá nhân', 'Thông tin liên hệ', 'Thông tin gia đình',
  'Quá trình học tập', 'Giấy tờ – Minh chứng', 'Cài đặt bảo mật',
]
export function PsProfile() {
  const [sec, setSec] = useState(PROFILE_SECTIONS[0])
  const s = psStudent
  return (
    <>
      <PageHead title="Hồ sơ cá nhân" right={<button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Chỉnh sửa thông tin</button>} />
      <div className="ps-profgrid">
        <aside className="ps-profcard">
          <span className="humg-ph" data-ratio="1-1"><span>Ảnh</span></span>
          <strong>{s.name}</strong>
          <ul>
            <li><span>MSSV</span>{s.mssv}</li>
            <li><span>Email</span>{s.email}</li>
            <li><span>Điện thoại</span>{s.phone}</li>
            <li><span>Khoa</span>{s.faculty}</li>
            <li><span>Chương trình</span>{s.program}</li>
            <li><span>Niên khóa</span>{s.cohort}</li>
          </ul>
          <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm humg-btn--block">Thay ảnh đại diện</button>
        </aside>
        <div className="ps-profmain">
          <div className="ps-tabs ps-tabs--wrap">
            {PROFILE_SECTIONS.map((x) => (
              <button key={x} type="button" className={sec === x ? 'is-active' : ''} onClick={() => setSec(x)}>{x}</button>
            ))}
          </div>
          <div className="ps-tabbody">
            {sec === 'Thông tin cá nhân' && (
              <DataTable columns={['Mục', 'Thông tin']} rows={[
                ['Ngày sinh', s.dob], ['Giới tính', s.gender], ['CCCD / Hộ chiếu', s.cccd],
                ['Quê quán', s.hometown], ['Địa chỉ thường trú', s.address], ['Nơi ở hiện tại', s.currentAddress],
              ]} />
            )}
            {sec === 'Thông tin liên hệ' && (
              <DataTable columns={['Mục', 'Thông tin']} rows={[
                ['Email nhà trường', s.email], ['Email cá nhân', s.personalEmail], ['Số điện thoại', s.phone],
                ['Địa chỉ báo tin', s.currentAddress],
                ['Liên hệ khẩn cấp', `${s.emergency.name} (${s.emergency.relation}) · ${s.emergency.phone}`],
              ]} />
            )}
            {sec === 'Thông tin gia đình' && (
              <DataTable columns={['Mục', 'Thông tin']} rows={s.family} />
            )}
            {sec === 'Quá trình học tập' && (
              <DataTable columns={['Năm học', 'Giai đoạn', 'Số TC', 'Điểm TB (hệ 4)', 'Xếp loại']} rows={s.studyHistory} />
            )}
            {sec === 'Giấy tờ – Minh chứng' && (
              <DataTable
                columns={['Loại giấy tờ', 'Hình thức nộp', 'Trạng thái']}
                rows={s.documents.map((d) => [
                  d[0], d[1],
                  <span key="s" className={`ps-tag ${d[2] === 'Đã xác thực' ? 'ps-tag--done' : 'ps-tag--warn'}`}>{d[2]}</span>,
                ])}
              />
            )}
            {sec === 'Cài đặt bảo mật' && (
              <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
                <label>Mật khẩu hiện tại<input type="password" /></label>
                <label>Mật khẩu mới<input type="password" /></label>
                <label>Nhập lại mật khẩu mới<input type="password" /></label>
                <label className="ps-formgrid__wide ps-inline"><input type="checkbox" /> Bật xác thực 2 lớp (2FA) qua email</label>
                <button type="submit" className="humg-btn humg-btn--primary">Cập nhật bảo mật</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/* ======================= 10.6 · THÔNG BÁO ======================= */
export function PsNotifications() {
  const [tab, setTab] = useState('Tất cả')
  const n = psNotifications
  const list = tab === 'Tất cả' ? n.list : n.list.filter((x) => x.cat === tab)
  return (
    <>
      <PageHead title="Thông báo" sub={`${n.total} thông báo`} right={
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
                  <div className="ps-noti__top">
                    <strong>{x.title}</strong>
                    <span className="ps-tag ps-tag--run">{x.cat}</span>
                  </div>
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

/* ======================= 10.7 · TICKET HỖ TRỢ ======================= */
function TicketTag({ v }) {
  const cls = v === 'Đã hoàn thành' ? 'ps-tag--done'
    : v === 'Chờ phản hồi' ? 'ps-tag--warn'
    : v === 'Đã đóng' ? 'ps-tag--cancel'
    : 'ps-tag--run'
  return <span className={`ps-tag ${cls}`}>{v}</span>
}
export function PsTickets() {
  const t = psTickets
  const [tab, setTab] = useState('list')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('Tất cả trạng thái')
  const list = useMemo(() => t.list.filter((x) =>
    (status === 'Tất cả trạng thái' || x.status === status)
    && (!q || norm(`${x.id} ${x.title} ${x.cat}`).includes(norm(q)))), [q, status])
  return (
    <>
      <PageHead title="Ticket hỗ trợ" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'list' ? 'is-active' : ''} onClick={() => setTab('list')}>Danh sách ticket</button>
          <button type="button" className={tab === 'new' ? 'is-active' : ''} onClick={() => setTab('new')}>Tạo ticket mới</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'list' && (
            <>
              <div className="ps-tstats">
                {t.stats.map((s) => (
                  <div key={s.label} className="ps-tstat">
                    <span className="ps-tstat__ic"><Icon name={s.icon} size={16} /></span>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <FilterBar
                search={q} onSearch={setQ} searchPlaceholder="Tìm kiếm ticket…"
                selects={[{ label: 'Trạng thái', value: status, onChange: setStatus, options: t.statuses }]}
                count={list.length} total={t.list.length}
                onReset={() => { setQ(''); setStatus('Tất cả trạng thái') }}
              />
              <DataTable
                columns={['Mã ticket', 'Tiêu đề', 'Danh mục', 'Trạng thái', 'Cập nhật lần cuối']}
                rows={list.map((x) => [x.id, x.title, x.cat, <TicketTag key="s" v={x.status} />, x.updated])}
              />
              {!list.length && <p className="ps-muted" style={{ padding: 12 }}>Không tìm thấy ticket phù hợp.</p>}
              <div className="ps-listfoot"><span>Hiển thị 1 – {list.length} trong tổng số {t.list.length} ticket</span></div>
            </>
          )}
          {tab === 'new' && (
            <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
              <label>Danh mục
                <select>{t.categories.map((c) => <option key={c}>{c}</option>)}</select>
              </label>
              <label>Mức độ ưu tiên
                <select>{['Thấp', 'Trung bình', 'Cao'].map((c) => <option key={c}>{c}</option>)}</select>
              </label>
              <label className="ps-formgrid__wide">Tiêu đề<input type="text" placeholder="Mô tả ngắn gọn vấn đề" /></label>
              <label className="ps-formgrid__wide">Nội dung chi tiết<textarea rows="4" placeholder="Mô tả chi tiết, kèm mã lỗi / ảnh chụp màn hình nếu có…" /></label>
              <label className="ps-formgrid__wide ps-inline"><input type="file" /> Đính kèm tệp (tùy chọn)</label>
              <button type="submit" className="humg-btn humg-btn--primary">Gửi ticket</button>
            </form>
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= CÀI ĐẶT TÀI KHOẢN ======================= */
export function PsSettings() {
  const s = psSettings
  const [prefs, setPrefs] = useState(() => Object.fromEntries(s.prefs.map((p) => [p.key, p.on])))
  return (
    <>
      <PageHead title="Cài đặt tài khoản" />
      <Panel title="Thông tin tài khoản" icon="user">
        <DataTable columns={['Mục', 'Thông tin']} rows={s.account} />
      </Panel>
      <Panel title="Tùy chọn thông báo" icon="bell">
        <ul className="ps-prefs">
          {s.prefs.map((p) => (
            <li key={p.key}>
              <span>{p.label}</span>
              <button
                type="button"
                className={`ps-toggle ${prefs[p.key] ? 'is-on' : ''}`}
                aria-pressed={prefs[p.key]}
                onClick={() => setPrefs((v) => ({ ...v, [p.key]: !v[p.key] }))}
              ><i /></button>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Đổi mật khẩu" icon="lock">
        <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
          <label>Mật khẩu hiện tại<input type="password" /></label>
          <label>Mật khẩu mới<input type="password" /></label>
          <label>Nhập lại mật khẩu mới<input type="password" /></label>
          <button type="submit" className="humg-btn humg-btn--primary">Cập nhật</button>
        </form>
      </Panel>
      <Panel title="Phiên đăng nhập gần đây" icon="shield">
        <DataTable columns={['Thiết bị', 'Vị trí', 'Thời gian', 'Trạng thái']} rows={s.sessions} />
      </Panel>
    </>
  )
}

/* ======================= POR-09 · DỊCH VỤ NỘI BỘ ======================= */
export function PsServices() {
  return (
    <>
      <PageHead title="Dịch vụ nội bộ" />
      <Panel title="Dịch vụ" icon="grid">
        <div className="ps-servicegrid">
          {psServices.tiles.map((t) => (
            <button key={t.title} type="button" className="ps-service">
              <span className="ps-service__ic"><Icon name={t.icon} size={20} /></span>
              {t.title}
            </button>
          ))}
        </div>
      </Panel>
      <Panel title="Yêu cầu của tôi" icon="file">
        <DataTable
          columns={['Mã yêu cầu', 'Dịch vụ', 'Ngày tạo', 'Trạng thái']}
          rows={psServices.requests.map((r) => [
            r[0], r[1], r[2],
            <span key="s" className={`ps-tag ${r[3] === 'Đã hoàn thành' ? 'ps-tag--done' : r[3] === 'Đã hủy' ? 'ps-tag--cancel' : 'ps-tag--run'}`}>{r[3]}</span>,
          ])}
        />
      </Panel>
    </>
  )
}

/* ======================= POR-10 · THƯ VIỆN & E-LEARNING ======================= */
export function PsLibrary() {
  const [tab, setTab] = useState('tv')
  return (
    <>
      <PageHead title="Thư viện & E-learning" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'tv' ? 'is-active' : ''} onClick={() => setTab('tv')}>Thư viện số</button>
          <button type="button" className={tab === 'el' ? 'is-active' : ''} onClick={() => setTab('el')}>E-learning</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'tv' && (
            <>
              <div className="ps-servicegrid">
                {psLibrary.tiles.map((t) => (
                  <Link key={t.title} to={t.to} className="ps-service">
                    <span className="ps-service__ic"><Icon name={t.icon} size={20} /></span>
                    {t.title}
                  </Link>
                ))}
              </div>
              <h4 className="ps-subhead">Tài liệu đang mượn</h4>
              <DataTable columns={['Tên tài liệu', 'Loại', 'Ngày mượn', 'Hạn trả', 'Còn lại']} rows={psLibrary.borrowing} />
            </>
          )}
          {tab === 'el' && (
            <div className="ps-elgrid">
              {psLibrary.elearning.map((e) => {
                const ext = e.href.startsWith('http')
                return (
                  <a
                    key={e.title}
                    href={e.href}
                    {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="ps-el"
                  >
                    <span className="ps-el__ic"><Icon name={e.icon} size={20} /></span>
                    <strong>{e.title}</strong>
                    <span>{e.desc}</span>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= CONDITION CHECK (dùng chung 3 trang đăng ký) ======================= */
function ConditionCheck({ items }) {
  const pass = items.every((c) => c.ok)
  return (
    <>
      <div className={`ps-cond ${pass ? 'is-ok' : 'is-block'}`}>
        <Icon name={pass ? 'check' : 'shield'} size={16} />
        {pass ? 'Bạn đã đủ điều kiện đăng ký.' : 'Bạn chưa đủ điều kiện — chưa thể đăng ký. Hãy hoàn tất các mục còn thiếu.'}
      </div>
      <ul className="ps-condlist">
        {items.map((c) => (
          <li key={c.label} className={c.ok ? 'is-ok' : 'is-fail'}>
            <Icon name={c.ok ? 'check' : 'x'} size={14} />
            <span><strong>{c.label}</strong>{c.detail && <em>{c.detail}</em>}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

/* ======================= ĐĂNG KÝ HỌC PHẦN (POR-02.1) ======================= */
export function PsRegCourses() {
  const d = psRegCourses
  const eligible = d.conditions.every((c) => c.ok)
  const [q, setQ] = useState('')
  const [type, setType] = useState('Tất cả')
  const [cart, setCart] = useState([])
  const list = useMemo(() => d.offered.filter((c) =>
    (type === 'Tất cả' || c.type === type)
    && (!q || norm(`${c.code} ${c.name}`).includes(norm(q)))), [q, type])
  const totalCr = cart.reduce((s, code) => s + (d.offered.find((c) => c.code === code)?.credits || 0), 0)
  const toggle = (code) => setCart((c) => c.includes(code) ? c.filter((x) => x !== code) : [...c, code])
  return (
    <>
      <PageHead title="Đăng ký học phần" sub={d.window} />
      <Panel title="Điều kiện đăng ký" icon="shield"><ConditionCheck items={d.conditions} /></Panel>

      <Panel title="Học phần mở đăng ký" icon="book">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo mã hoặc tên học phần…"
          selects={[{ label: 'Loại học phần', value: type, onChange: setType, options: d.types }]}
          count={list.length} total={d.offered.length} onReset={() => { setQ(''); setType('Tất cả') }}
        />
        <DataTable
          columns={['Mã HP', 'Học phần', 'TC', 'Loại', 'Nhóm', 'Lịch', 'Còn chỗ', '']}
          rows={list.map((c) => [
            c.code, c.name, String(c.credits), c.type, c.group, c.schedule,
            c.seats > 0 ? String(c.seats) : <span key="f" className="ps-tag ps-tag--cancel">Hết chỗ</span>,
            <button key="b" type="button" disabled={!eligible || c.seats === 0}
              className={`humg-btn humg-btn--sm ${cart.includes(c.code) ? 'humg-btn--ghost' : 'humg-btn--primary'}`}
              onClick={() => toggle(c.code)}>{cart.includes(c.code) ? 'Bỏ chọn' : 'Chọn'}</button>,
          ])}
        />
      </Panel>

      <Panel title="Giỏ đăng ký" icon="check">
        {cart.length === 0
          ? <p className="ps-muted">Chưa chọn học phần nào.</p>
          : (
            <>
              <ul className="ps-cart">
                {cart.map((code) => {
                  const c = d.offered.find((x) => x.code === code)
                  return <li key={code}><span>{c.code} · {c.name} ({c.credits} TC)</span><button type="button" onClick={() => toggle(code)}><Icon name="x" size={13} /></button></li>
                })}
              </ul>
              <div className="ps-payact">
                <strong>Tổng: {totalCr} / {d.maxCredits} tín chỉ</strong>
                <button type="button" className="humg-btn humg-btn--primary" disabled={!eligible || totalCr > d.maxCredits}>Xác nhận đăng ký</button>
              </div>
            </>
          )}
      </Panel>
    </>
  )
}

/* ======================= ĐĂNG KÝ ĐỒ ÁN TỐT NGHIỆP (POR-02.2) ======================= */
export function PsRegThesis() {
  const d = psRegThesis
  const eligible = d.conditions.every((c) => c.ok)
  return (
    <>
      <PageHead title="Đăng ký đồ án tốt nghiệp" sub={d.round} />
      <Panel title="Kiểm tra điều kiện" icon="shield"><ConditionCheck items={d.conditions} /></Panel>
      <Panel title="Đăng ký đề tài & giảng viên hướng dẫn" icon="graduation">
        {!eligible && <p className="ps-muted" style={{ marginBottom: 12 }}>Chức năng mở khi bạn đủ điều kiện. Bạn có thể liên hệ cố vấn học tập để được hỗ trợ.</p>}
        <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
          <label>Giảng viên hướng dẫn
            <select disabled={!eligible}>{d.advisors.map((a) => <option key={a}>{a}</option>)}</select>
          </label>
          <label>Đề tài
            <select disabled={!eligible}>{d.topics.map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label className="ps-formgrid__wide">Tên đề tài tự đề xuất (nếu có)<input type="text" disabled={!eligible} placeholder="Nhập tên đề tài" /></label>
          <label className="ps-formgrid__wide">Mô tả tóm tắt<textarea rows="3" disabled={!eligible} placeholder="Mục tiêu, phạm vi dự kiến…" /></label>
          <button type="submit" className="humg-btn humg-btn--primary" disabled={!eligible}>Gửi đăng ký</button>
        </form>
      </Panel>
    </>
  )
}

/* ======================= ĐĂNG KÝ THỰC TẬP (POR-02.3) ======================= */
export function PsRegIntern() {
  const d = psRegIntern
  const eligible = d.conditions.every((c) => c.ok)
  const [q, setQ] = useState('')
  const list = useMemo(() => d.companies.filter((c) => !q || norm(`${c.name} ${c.role} ${c.place}`).includes(norm(q))), [q])
  return (
    <>
      <PageHead title="Đăng ký thực tập doanh nghiệp" sub={d.round} />
      <Panel title="Kiểm tra điều kiện" icon="shield"><ConditionCheck items={d.conditions} /></Panel>

      <Panel title="Vị trí thực tập từ doanh nghiệp đối tác" icon="briefcase">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo doanh nghiệp, vị trí, địa điểm…"
          count={list.length} total={d.companies.length} onReset={() => setQ('')}
        />
        <DataTable
          columns={['Doanh nghiệp', 'Vị trí', 'SL', 'Địa điểm', 'Hạn đăng ký', '']}
          rows={list.map((c) => [
            c.name, c.role, String(c.slots), c.place, c.deadline,
            <button key="b" type="button" className="humg-btn humg-btn--primary humg-btn--sm" disabled={!eligible}>Đăng ký</button>,
          ])}
        />
      </Panel>

      <Panel title="Tự liên hệ doanh nghiệp" icon="user">
        <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
          <label>Tên doanh nghiệp<input type="text" disabled={!eligible} placeholder="Công ty / Tổ chức" /></label>
          <label>Vị trí thực tập<input type="text" disabled={!eligible} placeholder="VD: Lập trình viên" /></label>
          <label>Người liên hệ tại DN<input type="text" disabled={!eligible} placeholder="Họ tên · SĐT / email" /></label>
          <label>Thời gian dự kiến<input type="text" disabled={!eligible} placeholder="VD: 15/01 – 15/04/2026" /></label>
          <button type="submit" className="humg-btn humg-btn--primary" disabled={!eligible}>Gửi đề nghị</button>
        </form>
      </Panel>
    </>
  )
}
