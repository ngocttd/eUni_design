import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import { Panel, DataTable, FilterBar, Pagination } from '../../components/ui/page.jsx'
import '../portal-student/portal-student.css'
import './portal-staff.css'
import {
  pgStaff, pgTerm, pgDashboard, pgClasses, pgSchedule, pgModules, pgSyllabus,
  pgScholar, pgMaterials, pgStudents, pgResearch, pgTools,
  pgSupervision, pgInternship, pgGrades, pgAdmin, pgFinance, pgProfile,
  pgNotifications, pgTickets, pgSettings,
} from '../../data/portalStaff.js'

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')

function Head({ title, sub, right }) {
  return (
    <div className="ps-head">
      <div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      {right && <div className="ps-head__right">{right}</div>}
    </div>
  )
}
function Stats({ items, four }) {
  return (
    <div className={`ps-stats ${four ? 'ps-stats--4' : ''}`}>
      {items.map((s) => <div key={s.label} className="ps-stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}
    </div>
  )
}

/* Lịch dạng lưới thời gian (dùng .ps-cal* của portal-student.css) */
function StaffCalendar({ data }) {
  const HOURS = pgSchedule.hours
  const H = 46
  const first = HOURS[0]
  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
  return (
    <div className="ps-cal-wrap">
      <div className="ps-cal">
        <div className="ps-cal__corner" />
        {days.map((d, i) => (
          <div key={d} className="ps-cal__dayhead"><strong>{d}</strong><span>{pgSchedule.dayDates[i]}</span></div>
        ))}
        <div className="ps-cal__timecol">
          {HOURS.map((h) => <div key={h} className="ps-cal__hour" style={{ height: H }}>{String(h).padStart(2, '0')}:00</div>)}
        </div>
        {days.map((d, di) => (
          <div key={d} className="ps-cal__daycol" style={{ height: HOURS.length * H }}>
            {HOURS.map((h) => <div key={h} className="ps-cal__slot" style={{ height: H }} />)}
            {data.filter((e) => e.day === di).map((e, k) => (
              <div key={k} className={`ps-cal__event is-${e.type}`} style={{ top: (e.start - first) * H, height: (e.end - e.start) * H }}>
                <strong>{e.course}</strong>
                <span>{e.group} · {e.room}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* Lịch tháng thu nhỏ */
function MiniCal({ label, firstDow = 3, days = 31, today }) {
  const cells = [...Array(firstDow).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  return (
    <div className="ps-minical">
      <div className="ps-minical__head">{label}</div>
      <div className="ps-minical__grid">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => <span key={d} className="ps-minical__dow">{d}</span>)}
        {cells.map((c, i) => (
          <span key={i} className={`ps-minical__day ${c === today ? 'is-today' : ''} ${c == null ? 'is-empty' : ''}`}>{c}</span>
        ))}
      </div>
    </div>
  )
}

function ToolGrid({ items }) {
  return (
    <div className="ps-servicegrid">
      {items.map((t) => (
        <button key={t.title} type="button" className="ps-service">
          <span className="ps-service__ic"><Icon name={t.icon} size={20} /></span>
          {t.title}{t.meta && <span className="ps-service__meta">{t.meta}</span>}
        </button>
      ))}
    </div>
  )
}
function Tag({ v }) {
  const done = /nghiệm thu|hoàn thành|đúng/i.test(v)
  const warn = /chậm|chưa|tạm/i.test(v)
  return <span className={`ps-tag ${done ? 'ps-tag--done' : warn ? 'ps-tag--warn' : 'ps-tag--run'}`}>{v}</span>
}

/* ======================= 11.1 · TỔNG QUAN (DASHBOARD) ======================= */
function ClassStatusPill({ v }) {
  const live = /đang diễn ra/i.test(v)
  return <span className={`ps-clspill ${live ? 'is-live' : 'is-soon'}`}>{v}</span>
}
export function PgDashboard() {
  const d = pgDashboard
  return (
    <>
      <Head title={`Xin chào, ${pgStaff.displayName} 👋`} sub={`Hôm nay là ${d.today} · ${pgTerm}`} />
      <div className="ps-stats ps-stats--4">
        {d.stats.map((s) => (
          <div key={s.label} className="ps-tstat">
            <span className="ps-tstat__ic"><Icon name={s.icon} size={16} /></span>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="ps-grid2">
        <Panel title="Lịch giảng hôm nay" icon="calendar" action={<Link to="/euni/giang-vien/lich-giang-day" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={13} /></Link>}>
          {d.todayClasses.map((c) => (
            <div key={c.time} className="ps-todaycard">
              <span className="ps-todaycard__time">{c.time}</span>
              <div>
                <strong>{c.course} <ClassStatusPill v={c.status} /></strong>
                <span>{c.group} · Phòng {c.room}</span>
              </div>
            </div>
          ))}
        </Panel>
        <Panel title="Thông báo mới" icon="bell" action={<Link to="/euni/giang-vien/thong-bao" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={13} /></Link>}>
          <ul className="ps-notice">
            {d.notices.map((n) => <li key={n.title}><span>{n.date}</span><p>{n.title}</p></li>)}
          </ul>
        </Panel>
      </div>

      <div className="ps-grid2">
        <Panel title="Nghiên cứu khoa học" icon="flask" action={<Link to="/euni/giang-vien/nghien-cuu" className="humg-link-more">Chi tiết <Icon name="arrow-right" size={13} /></Link>}>
          <div className="ps-ministat">
            {d.research.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
        </Panel>
        <Panel title="Công tác – Hành chính" icon="building" action={<Link to="/euni/giang-vien/cong-tac" className="humg-link-more">Chi tiết <Icon name="arrow-right" size={13} /></Link>}>
          <div className="ps-ministat">
            {d.admin.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
        </Panel>
      </div>
    </>
  )
}

/* ======================= 11.2 · LỊCH GIẢNG DẠY ======================= */
export function PgSchedule() {
  const [tab, setTab] = useState('tuan')
  const [wk, setWk] = useState(0)
  return (
    <>
      <Head title="Lịch giảng dạy" sub={pgTerm} />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'tuan' ? 'is-active' : ''} onClick={() => setTab('tuan')}>Theo tuần</button>
          <button type="button" className={tab === 'thang' ? 'is-active' : ''} onClick={() => setTab('thang')}>Theo tháng</button>
          <button type="button" className={tab === 'ds' ? 'is-active' : ''} onClick={() => setTab('ds')}>Danh sách</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'tuan' && (
            <>
              <div className="ps-calbar">
                <div className="ps-weeknav">
                  <button type="button" onClick={() => setWk((w) => Math.max(0, w - 1))} aria-label="Tuần trước"><Icon name="chevron-left" size={16} /></button>
                  <span>{pgSchedule.weeks[wk]}</span>
                  <button type="button" onClick={() => setWk((w) => Math.min(pgSchedule.weeks.length - 1, w + 1))} aria-label="Tuần sau"><Icon name="chevron-right" size={16} /></button>
                </div>
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm" onClick={() => setWk(0)}>Hôm nay</button>
              </div>
              <StaffCalendar data={pgSchedule.timetable} />
              <div className="ps-callegend">
                <span><i className="is-giang-lt" /> Giảng lý thuyết</span>
                <span><i className="is-giang-th" /> Giảng thực hành</span>
                <span><i className="is-huong-dan" /> Hướng dẫn</span>
                <span><i className="is-khac" /> Khác</span>
              </div>
            </>
          )}
          {tab === 'thang' && (
            <div className="ps-monthview">
              <MiniCal label={pgAdmin.monthLabel} today={16} />
              <div>
                <h4 className="ps-subhead">Buổi giảng trong tuần</h4>
                <DataTable columns={['Ngày', 'Giờ', 'Học phần', 'Lớp', 'Phòng', 'Hình thức']} rows={pgSchedule.listView} />
              </div>
            </div>
          )}
          {tab === 'ds' && (
            <DataTable columns={['Ngày', 'Giờ', 'Học phần', 'Lớp', 'Phòng', 'Hình thức']} rows={pgSchedule.listView} />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 11.3 · QUẢN LÝ LỚP HỌC ======================= */
export function PgClasses() {
  const [term, setTerm] = useState(pgClasses.terms[0])
  const [q, setQ] = useState('')
  const list = useMemo(() => pgClasses.list.filter((c) => !q || norm(`${c.code} ${c.course} ${c.group}`).includes(norm(q))), [q])
  return (
    <>
      <Head title="Quản lý lớp học" sub={pgTerm} right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="users" size={13} /> Thêm lớp</button>
      } />
      <Panel title="Danh sách lớp đang giảng dạy" icon="users" flush>
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo mã lớp, tên học phần…"
          selects={[{ label: 'Học kỳ', value: term, onChange: setTerm, options: pgClasses.terms }]}
          count={list.length} total={pgClasses.list.length}
          onReset={() => { setQ(''); setTerm(pgClasses.terms[0]) }}
        />
        <DataTable
          columns={['STT', 'Mã lớp', 'Tên học phần', 'Lớp', 'Sĩ số', 'Học kỳ', 'Thao tác']}
          rows={list.map((c, i) => [
            String(i + 1), c.code, c.course, c.group, c.size, c.term,
            <button key="a" type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="users" size={13} /> Mở lớp</button>,
          ])}
        />
      </Panel>
      <Panel title="Công cụ quản lý lớp" icon="grid"><ToolGrid items={pgClasses.tools} /></Panel>
      <Panel title="Thông báo lớp học" icon="bell" action={<Link to="/euni/giang-vien/thong-bao" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={13} /></Link>}>
        <ul className="ps-notice">
          {pgClasses.notices.map((n) => <li key={n.title}><span>{n.date}</span><p>{n.title}</p></li>)}
        </ul>
      </Panel>
    </>
  )
}

/* ======================= POR-13 · QUẢN LÝ HỌC PHẦN ======================= */
export function PgModules() {
  const [term, setTerm] = useState(pgClasses.terms[0])
  return (
    <>
      <Head title="Quản lý học phần" sub={pgTerm} right={
        <label className="ps-filter"><span>Học kỳ</span>
          <select value={term} onChange={(e) => setTerm(e.target.value)}>{pgClasses.terms.map((t) => <option key={t}>{t}</option>)}</select>
        </label>
      } />
      <Panel title="Danh sách học phần" icon="book" flush>
        <DataTable
          columns={['Mã HP', 'Học phần', 'Số TC', 'Số lớp', 'Trạng thái']}
          rows={pgModules.list.map((m) => [m.code, m.course, String(m.credits), String(m.groups), <Tag key="t" v={m.status} />])}
        />
      </Panel>
      <Panel title="Công cụ học phần" icon="grid"><ToolGrid items={pgModules.tools} /></Panel>
    </>
  )
}

/* ======================= POR-14 · ĐỀ CƯƠNG & TÀI LIỆU ======================= */
export function PgSyllabus() {
  const [mod, setMod] = useState(pgSyllabus.modules[0])
  const [tab, setTab] = useState('dc')
  const i = pgSyllabus.info
  return (
    <>
      <Head title="Đề cương & Tài liệu học phần" right={
        <label className="ps-filter"><span>Học phần</span>
          <select value={mod} onChange={(e) => setMod(e.target.value)}>{pgSyllabus.modules.map((m) => <option key={m}>{m}</option>)}</select>
        </label>
      } />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'dc' ? 'is-active' : ''} onClick={() => setTab('dc')}>Đề cương</button>
          <button type="button" className={tab === 'tl' ? 'is-active' : ''} onClick={() => setTab('tl')}>Tài liệu</button>
          <button type="button" className={tab === 'kh' ? 'is-active' : ''} onClick={() => setTab('kh')}>Kế hoạch giảng dạy</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'dc' && (
            <>
              <DataTable columns={['Mục', 'Nội dung']} rows={[
                ['Tên học phần', i.name], ['Số tín chỉ', String(i.credits)], ['Học kỳ', i.term], ['Khoa', i.faculty],
              ]} />
              <div className="ps-payact">
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="eye" size={13} /> Xem đề cương</button>
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Chỉnh sửa đề cương</button>
              </div>
            </>
          )}
          {tab === 'tl' && (
            <>
              <DataTable
                columns={['Tài liệu', 'Loại', 'Ngày tải', 'Hành động']}
                rows={pgSyllabus.files.map((f) => [f[0], f[1], f[2],
                  <span key="a" className="ps-rowact"><button type="button" aria-label="Tải xuống"><Icon name="download" size={14} /></button><button type="button" aria-label="Xóa"><Icon name="x" size={14} /></button></span>])}
              />
              <button type="button" className="humg-btn humg-btn--primary humg-btn--sm" style={{ marginTop: 12 }}><Icon name="arrow-right" size={13} /> Tải lên tài liệu mới</button>
            </>
          )}
          {tab === 'kh' && (
            <DataTable columns={['Thời gian', 'Nội dung', 'Hình thức']} rows={pgSyllabus.plan} />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= POR-15 · CSDL KHOA HỌC (CỦA TÔI) ======================= */
export function PgScholar() {
  const [tab, setTab] = useState('bb')
  return (
    <>
      <Head title="CSDL khoa học của tôi" sub="Công bố, đề tài, hội thảo và sách đã khai báo" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'bb' ? 'is-active' : ''} onClick={() => setTab('bb')}>Bài báo</button>
          <button type="button" className={tab === 'dt' ? 'is-active' : ''} onClick={() => setTab('dt')}>Đề tài</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'bb' && (
            <ul className="ps-publist">
              {pgScholar.papers.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <em>{p.authors} · {p.venue} · {p.year}</em>
                  <span className="ps-rowact"><button type="button" aria-label="Xem"><Icon name="eye" size={14} /></button><button type="button" aria-label="Tải xuống"><Icon name="download" size={14} /></button></span>
                </li>
              ))}
            </ul>
          )}
          {tab === 'dt' && (
            <DataTable
              columns={['Mã đề tài', 'Tên đề tài', 'Vai trò', 'Thời gian', 'Trạng thái']}
              rows={pgScholar.projectsMine.map((r) => [r[0], r[1], r[2], r[3], <Tag key="t" v={r[4]} />])}
            />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= POR-16 · HỌC LIỆU SỐ ======================= */
export function PgMaterials() {
  const [q, setQ] = useState('')
  const [type, setType] = useState(pgMaterials.types[0])
  return (
    <>
      <Head title="Học liệu số" />
      <Panel title="Kho học liệu" icon="layers">
        <form className="ps-filter ps-filter--full" onSubmit={(e) => e.preventDefault()}>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm học liệu…" />
          <select value={type} onChange={(e) => setType(e.target.value)}>{pgMaterials.types.map((t) => <option key={t}>{t}</option>)}</select>
        </form>
        <ToolGrid items={pgMaterials.tiles} />
        <h4 className="ps-subhead">Học liệu mới nhất</h4>
        <DataTable columns={['Tên học liệu', 'Loại', 'Ngày tải']} rows={pgMaterials.latest} />
      </Panel>
    </>
  )
}

/* ======================= POR-17 · SINH VIÊN ======================= */
export function PgStudents() {
  const [group, setGroup] = useState(pgStudents.groups[0])
  const [q, setQ] = useState('')
  const list = useMemo(() => pgStudents.list.filter((r) => !q || norm(`${r[0]} ${r[1]} ${r[2]}`).includes(norm(q))), [q])
  return (
    <>
      <Head title="Sinh viên" right={
        <form className="ps-filter" onSubmit={(e) => e.preventDefault()}>
          <select value={group} onChange={(e) => setGroup(e.target.value)}>{pgStudents.groups.map((g) => <option key={g}>{g}</option>)}</select>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm sinh viên…" />
        </form>
      } />
      <Stats items={pgStudents.stats} four />
      <Panel title={`Danh sách sinh viên · ${group}`} icon="user" flush>
        <DataTable
          columns={['MSSV', 'Họ và tên', 'Lớp', 'Email', 'Trạng thái']}
          rows={list.map((r) => [r[0], r[1], r[2], r[3], <Tag key="t" v={r[4]} />])}
        />
      </Panel>
    </>
  )
}

/* ======================= 11.5 · QUẢN LÝ NGHIÊN CỨU KHOA HỌC ======================= */
const RESEARCH_TABS = [
  { key: 'dt', label: 'Đề tài – Dự án', data: 'projects', cols: ['STT', 'Tên đề tài / Dự án', 'Vai trò', 'Cấp', 'Năm', 'Trạng thái', 'Thao tác'] },
  { key: 'bb', label: 'Bài báo', data: 'papers', cols: ['STT', 'Tên bài báo', 'Vai trò', 'Nơi công bố', 'Năm', 'Trạng thái', 'Thao tác'] },
  { key: 'ht', label: 'Hội thảo', data: 'conferences', cols: ['STT', 'Tên hội thảo', 'Vai trò', 'Địa điểm', 'Năm', 'Trạng thái', 'Thao tác'] },
  { key: 'sc', label: 'Sáng chế', data: 'patents', cols: ['STT', 'Tên sáng chế / GPHI', 'Vai trò', 'Loại', 'Năm', 'Trạng thái', 'Thao tác'] },
  { key: 'sg', label: 'Sách – Giáo trình', data: 'books', cols: ['STT', 'Tên sách / Giáo trình', 'Vai trò', 'Nhà xuất bản', 'Năm', 'Trạng thái', 'Thao tác'] },
]
export function PgResearch() {
  const [tab, setTab] = useState(RESEARCH_TABS[0].key)
  const [q, setQ] = useState('')
  const active = RESEARCH_TABS.find((t) => t.key === tab)
  const raw = pgResearch[active.data]
  const rows = useMemo(() => raw.filter((r) => !q || norm(`${r[0]} ${r[2]} ${r[3]}`).includes(norm(q))), [raw, q])
  return (
    <>
      <Head title="Quản lý nghiên cứu khoa học" sub={`Hoạt động khoa học – công nghệ của ${pgStaff.displayName}`} right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="flask" size={13} /> Đăng ký đề tài mới</button>
      } />
      <Panel flush>
        <div className="ps-tabs ps-tabs--wrap">
          {RESEARCH_TABS.map((t) => (
            <button key={t.key} type="button" className={tab === t.key ? 'is-active' : ''} onClick={() => { setTab(t.key); setQ('') }}>{t.label}</button>
          ))}
        </div>
        <div className="ps-tabbody">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên, vai trò, đơn vị…"
            count={rows.length} total={raw.length} onReset={() => setQ('')}
          />
          <DataTable
            columns={active.cols}
            rows={rows.map((r, i) => [
              String(i + 1), r[0], r[1], r[2], r[3], <Tag key="t" v={r[4]} />,
              <button key="a" type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="eye" size={13} /> Xem</button>,
            ])}
          />
          {!rows.length && <p className="ps-empty">Không có mục nào khớp bộ lọc.</p>}
        </div>
      </Panel>
      <Panel title="Thống kê nhanh" icon="grid">
        <div className="ps-tstats">
          {pgResearch.quickStats.map((s) => (
            <div key={s.label} className="ps-tstat">
              <strong>{s.value}</strong><span>{s.label}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

function ProgBar({ pct }) {
  const done = pct >= 100
  return (
    <span className={`ps-progbar ${done ? 'is-done' : ''}`}>
      <span className="ps-progbar__track"><span className="ps-progbar__fill" style={{ width: `${Math.min(pct, 100)}%` }} /></span>
      <em>{pct}%</em>
    </span>
  )
}

/* ======================= HƯỚNG DẪN ĐỒ ÁN / LUẬN VĂN (POR-18.1) ======================= */
const SUP_SORTS = ['Tiến độ cao → thấp', 'Tiến độ thấp → cao', 'Tên sinh viên A → Z']
export function PgSupervision() {
  const [q, setQ] = useState('')
  const [kind, setKind] = useState('Tất cả')
  const [status, setStatus] = useState('Tất cả')
  const [sort, setSort] = useState(SUP_SORTS[0])
  const rows = useMemo(() => {
    let r = pgSupervision.list.filter((x) => {
      if (kind !== 'Tất cả' && x[2] !== kind) return false
      if (status !== 'Tất cả' && x[6] !== status) return false
      if (q && !norm(`${x[0]} ${x[1]} ${x[3]}`).includes(norm(q))) return false
      return true
    })
    r = [...r].sort((a, b) => sort === SUP_SORTS[0] ? b[5] - a[5]
      : sort === SUP_SORTS[1] ? a[5] - b[5]
      : norm(a[1]).localeCompare(norm(b[1])))
    return r
  }, [q, kind, status, sort])
  return (
    <>
      <Head title="Hướng dẫn đồ án / luận văn" sub={`Đồ án, khóa luận, luận văn và luận án đã và đang hướng dẫn · ${pgTerm}`} />
      <Stats items={pgSupervision.stats} four />
      <Panel flush>
        <FilterBar
          search={q}
          onSearch={setQ}
          searchPlaceholder="Tìm theo MSSV, họ tên hoặc tên đề tài…"
          selects={[
            { label: 'Loại', value: kind, onChange: setKind, options: pgSupervision.kinds },
            { label: 'Trạng thái', value: status, onChange: setStatus, options: pgSupervision.statuses },
          ]}
          sort={sort}
          onSort={setSort}
          sortOptions={SUP_SORTS}
          count={rows.length}
          total={pgSupervision.list.length}
          onReset={() => { setQ(''); setKind('Tất cả'); setStatus('Tất cả'); setSort(SUP_SORTS[0]) }}
        />
        <DataTable
          columns={['MSSV', 'Học viên / Sinh viên', 'Loại', 'Tên đề tài', 'Bắt đầu', 'Tiến độ', 'Trạng thái', '']}
          rows={rows.map((r) => [
            r[0], r[1], r[2], r[3], r[4],
            <ProgBar key="p" pct={r[5]} />,
            <Tag key="t" v={r[6]} />,
            <Link key="a" to="/euni/giang-vien/sinh-vien" className="humg-link-more">Chi tiết</Link>,
          ])}
        />
        {!rows.length && <p className="ps-empty">Không có đề tài nào khớp bộ lọc.</p>}
      </Panel>
      <Panel title="Thao tác nhanh" icon="grid">
        <div className="ps-servicegrid">
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="file" size={20} /></span>Giao đề tài mới</button>
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="check" size={20} /></span>Duyệt nhật ký tiến độ</button>
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="calendar" size={20} /></span>Lịch bảo vệ</button>
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="award" size={20} /></span>Nhập điểm hướng dẫn</button>
        </div>
      </Panel>
    </>
  )
}

/* ======================= THỰC TẬP DOANH NGHIỆP (POR-18.2) ======================= */
export function PgInternship() {
  const [round, setRound] = useState(pgInternship.rounds[0])
  const [q, setQ] = useState('')
  const [company, setCompany] = useState('Tất cả')
  const [status, setStatus] = useState('Tất cả')
  const rows = useMemo(() => pgInternship.list.filter((x) => {
    if (company !== 'Tất cả' && x[3] !== company) return false
    if (status !== 'Tất cả' && x[7] !== status) return false
    if (q && !norm(`${x[0]} ${x[1]} ${x[2]} ${x[3]}`).includes(norm(q))) return false
    return true
  }), [q, company, status])
  return (
    <>
      <Head title="Thực tập doanh nghiệp" sub="Danh sách sinh viên thực tập tại doanh nghiệp do tôi phụ trách" right={
        <label className="ps-filter"><span>Đợt</span>
          <select value={round} onChange={(e) => setRound(e.target.value)}>{pgInternship.rounds.map((r) => <option key={r}>{r}</option>)}</select>
        </label>
      } />
      <Stats items={pgInternship.stats} four />
      <Panel flush>
        <FilterBar
          search={q}
          onSearch={setQ}
          searchPlaceholder="Tìm theo MSSV, họ tên, lớp hoặc doanh nghiệp…"
          selects={[
            { label: 'Doanh nghiệp', value: company, onChange: setCompany, options: pgInternship.companies },
            { label: 'Trạng thái', value: status, onChange: setStatus, options: pgInternship.statuses },
          ]}
          count={rows.length}
          total={pgInternship.list.length}
          onReset={() => { setQ(''); setCompany('Tất cả'); setStatus('Tất cả') }}
        />
        <DataTable
          columns={['MSSV', 'Họ và tên', 'Lớp', 'Doanh nghiệp', 'Vị trí', 'Thời gian', 'Cán bộ hướng dẫn (DN)', 'Trạng thái']}
          rows={rows.map((r) => [r[0], r[1], r[2], r[3], r[4], r[5], r[6], <Tag key="t" v={r[7]} />])}
        />
        {!rows.length && <p className="ps-empty">Không có sinh viên nào khớp bộ lọc.</p>}
      </Panel>
      <Panel title="Thao tác nhanh" icon="grid">
        <div className="ps-servicegrid">
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="file" size={20} /></span>Tạo đợt thực tập</button>
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="check" size={20} /></span>Xác nhận tiếp nhận của DN</button>
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="layers" size={20} /></span>Biểu mẫu thực tập</button>
          <button type="button" className="ps-service"><span className="ps-service__ic"><Icon name="award" size={20} /></span>Nhập điểm thực tập</button>
        </div>
      </Panel>
    </>
  )
}

/* ======================= POR-19 · TIỆN ÍCH & E-LEARNING ======================= */
export function PgTools() {
  return (
    <>
      <Head title="Tiện ích & E-learning" />
      <Panel title="Tiện ích" icon="grid"><ToolGrid items={pgTools.utilities} /></Panel>
      <Panel title="E-learning" icon="play">
        <div className="ps-elgrid">
          {pgTools.elearning.map((e) => (
            <a key={e.title} href={e.href || 'https://lms.humg.edu.vn'} target="_blank" rel="noreferrer" className="ps-el">
              <span className="ps-el__ic"><Icon name={e.icon} size={20} /></span>
              <strong>{e.title}</strong>
              <span>{e.desc}</span>
            </a>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 11.4 · KẾT QUẢ HỌC TẬP (QUẢN LÝ ĐIỂM) ======================= */
function GradeTag({ v }) {
  const cls = v === 'Giỏi' ? 'ps-tag--done' : v === 'Trung bình' || v === 'Yếu' ? 'ps-tag--warn' : 'ps-tag--run'
  return <span className={`ps-tag ${cls}`}>{v}</span>
}
export function PgGrades() {
  const g = pgGrades
  const [tab, setTab] = useState('ql')
  const [term, setTerm] = useState(g.terms[0])
  const [cls, setCls] = useState(g.classes[0])
  return (
    <>
      <Head title="Kết quả học tập" sub={`Quản lý điểm lớp học phần · ${pgTerm}`} />
      <Panel flush>
        <div className="ps-tabs ps-tabs--wrap">
          <button type="button" className={tab === 'ql' ? 'is-active' : ''} onClick={() => setTab('ql')}>Quản lý điểm</button>
          <button type="button" className={tab === 'np' ? 'is-active' : ''} onClick={() => setTab('np')}>Nhập điểm</button>
          <button type="button" className={tab === 'bd' ? 'is-active' : ''} onClick={() => setTab('bd')}>Bảng điểm</button>
          <button type="button" className={tab === 'tk' ? 'is-active' : ''} onClick={() => setTab('tk')}>Thống kê</button>
        </div>
        <div className="ps-tabbody">
          <div className="ps-calbar">
            <label className="ps-filter"><span>Học kỳ</span>
              <select value={term} onChange={(e) => setTerm(e.target.value)}>{g.terms.map((t) => <option key={t}>{t}</option>)}</select>
            </label>
            <label className="ps-filter"><span>Lớp học phần</span>
              <select value={cls} onChange={(e) => setCls(e.target.value)}>{g.classes.map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="download" size={13} /> Xuất Excel</button>
          </div>

          {tab === 'tk' ? (
            <>
              <div className="ps-stats ps-stats--4">
                {g.stats.map((s) => <div key={s.label} className="ps-stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}
              </div>
              <h4 className="ps-subhead">Phân bố xếp loại</h4>
              <DataTable columns={['Xếp loại', 'Số lượng', 'Tỷ lệ']} rows={[
                ['Giỏi', '18', '40.0%'], ['Khá', '20', '44.4%'], ['Trung bình', '5', '11.1%'], ['Yếu / Không đạt', '2', '4.4%'],
              ]} />
            </>
          ) : (
            <>
              <DataTable
                columns={g.columns}
                rows={g.rows.map((r) => [...r.slice(0, 8), <GradeTag key="x" v={r[8]} />])}
              />
              <div className="ps-listfoot">
                <span>Hiển thị 1 – {g.rows.length} trong tổng số {g.total} sinh viên</span>
                <Pagination page={1} total={9} />
              </div>
              {tab === 'np' && (
                <div className="ps-payact">
                  <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Nhập từ file Excel</button>
                  <button type="button" className="humg-btn humg-btn--primary humg-btn--sm">Lưu bảng điểm</button>
                </div>
              )}
              <div className="ps-stats ps-stats--4" style={{ marginTop: 16 }}>
                {g.stats.map((s) => <div key={s.label} className="ps-stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}
              </div>
            </>
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= 11.6 · CÔNG TÁC – HÀNH CHÍNH ======================= */
function TaskTag({ v }) {
  const cls = /hoàn thành|đã nhận/i.test(v) ? 'ps-tag--done'
    : /đang thực hiện/i.test(v) ? 'ps-tag--run'
    : /chờ duyệt/i.test(v) ? 'ps-tag--warn' : 'ps-tag--cancel'
  return <span className={`ps-tag ${cls}`}>{v}</span>
}
export function PgAdmin() {
  const a = pgAdmin
  const [tab, setTab] = useState('nv')
  return (
    <>
      <Head title="Công tác – Hành chính" sub={pgTerm} />
      <div className="ps-admingrid">
        <Panel flush>
          <div className="ps-tabs ps-tabs--wrap">
            <button type="button" className={tab === 'nv' ? 'is-active' : ''} onClick={() => setTab('nv')}>Nhiệm vụ</button>
            <button type="button" className={tab === 'hs' ? 'is-active' : ''} onClick={() => setTab('hs')}>Hồ sơ – Công văn</button>
            <button type="button" className={tab === 'lc' ? 'is-active' : ''} onClick={() => setTab('lc')}>Lịch công tác</button>
          </div>
          <div className="ps-tabbody">
            {tab === 'nv' && (
              <>
                <h4 className="ps-subhead">Danh sách nhiệm vụ</h4>
                <DataTable
                  columns={['Nhiệm vụ', 'Giao bởi', 'Hạn hoàn thành', 'Trạng thái']}
                  rows={a.tasks.map((r) => [r[0], r[1], r[2], <TaskTag key="t" v={r[3]} />])}
                />
                <p className="ps-muted" style={{ marginTop: 12 }}>Hiển thị toàn bộ {a.tasks.length} nhiệm vụ được phân công.</p>
              </>
            )}
            {tab === 'hs' && (
              <DataTable
                columns={['Số hiệu', 'Trích yếu', 'Đơn vị / Nguồn', 'Ngày', 'Trạng thái']}
                rows={a.docs.map((r) => [r[0], r[1], r[2], r[3], <TaskTag key="t" v={r[4]} />])}
              />
            )}
            {tab === 'lc' && (
              <DataTable columns={['Ngày', 'Giờ', 'Nội dung', 'Địa điểm']} rows={a.weekEvents} />
            )}
          </div>
        </Panel>

        <div className="ps-col">
          <Panel title="Lịch công tác tuần" icon="calendar">
            <MiniCal label={a.monthLabel} today={16} />
          </Panel>
          <Panel title={`Hôm nay – ${a.todayDate}`} icon="clock">
            <ul className="ps-agenda">
              {a.agenda.map((x) => (
                <li key={x.time}><span>{x.time}</span><div><strong>{x.title}</strong><em>{x.place}</em></div></li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}

/* ======================= TÀI CHÍNH ======================= */
export function PgFinance() {
  const f = pgFinance
  const [tab, setTab] = useState('tq')
  return (
    <>
      <Head title="Tài chính" sub={`Cập nhật đến ngày ${f.asOf}`} />
      <Panel flush>
        <div className="ps-tabs ps-tabs--wrap">
          <button type="button" className={tab === 'tq' ? 'is-active' : ''} onClick={() => setTab('tq')}>Tổng quan</button>
          <button type="button" className={tab === 'luong' ? 'is-active' : ''} onClick={() => setTab('luong')}>Bảng lương</button>
          <button type="button" className={tab === 'gio' ? 'is-active' : ''} onClick={() => setTab('gio')}>Giờ giảng</button>
          <button type="button" className={tab === 'dt' ? 'is-active' : ''} onClick={() => setTab('dt')}>Kinh phí đề tài</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'tq' && (
            <div className="ps-stats ps-stats--4">
              {f.summary.map((s) => <div key={s.label} className="ps-stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}
            </div>
          )}
          {tab === 'luong' && (
            <DataTable columns={['Kỳ lương', 'Lương cơ bản', 'Phụ cấp / Vượt giờ', 'Thực nhận', 'Trạng thái']}
              rows={f.payslips.map((r) => [r[0], r[1], r[2], r[3], <Tag key="t" v={r[4]} />])} />
          )}
          {tab === 'gio' && (
            <DataTable columns={['Học kỳ', 'Giờ đã giảng', 'Định mức', 'Chênh lệch']} rows={f.teachingLoad} />
          )}
          {tab === 'dt' && (
            <DataTable columns={['Đề tài', 'Vai trò', 'Tổng kinh phí', 'Đã giải ngân']} rows={f.grants} />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= HỒ SƠ CÁ NHÂN ======================= */
export function PgProfile() {
  const p = pgProfile
  const [sec, setSec] = useState(p.sections[0])
  return (
    <>
      <Head title="Hồ sơ cá nhân" right={<button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Đề nghị cập nhật</button>} />
      <div className="ps-profgrid">
        <aside className="ps-profcard">
          <span className="humg-ph" data-ratio="1-1"><span>Ảnh</span></span>
          <strong>{pgStaff.displayName}</strong>
          <ul>
            <li><span>Mã CB</span>{pgStaff.code}</li>
            <li><span>Email</span>{pgStaff.email}</li>
            <li><span>Điện thoại</span>{pgStaff.phone}</li>
            <li><span>Đơn vị</span>{pgStaff.faculty}</li>
            <li><span>Bộ môn</span>{pgStaff.department}</li>
            <li><span>Chức danh</span>{pgStaff.title}</li>
          </ul>
        </aside>
        <div className="ps-profmain">
          <div className="ps-tabs ps-tabs--wrap">
            {p.sections.map((x) => (
              <button key={x} type="button" className={sec === x ? 'is-active' : ''} onClick={() => setSec(x)}>{x}</button>
            ))}
          </div>
          <div className="ps-tabbody">
            {sec === 'Thông tin cá nhân' && <DataTable columns={['Mục', 'Thông tin']} rows={p.personal} />}
            {sec === 'Thông tin công tác' && <DataTable columns={['Mục', 'Thông tin']} rows={p.work} />}
            {sec === 'Trình độ – Học hàm' && <DataTable columns={['Văn bằng / Học vị', 'Nơi đào tạo', 'Năm']} rows={p.degrees} />}
            {sec === 'Quá trình công tác' && <DataTable columns={['Thời gian', 'Chức danh', 'Đơn vị']} rows={p.history} />}
            {sec === 'Giấy tờ – Minh chứng' && (
              <DataTable
                columns={['Loại giấy tờ', 'Hình thức nộp', 'Trạng thái']}
                rows={p.documents.map((d) => [d[0], d[1], <span key="s" className={`ps-tag ${d[2] === 'Đã xác thực' ? 'ps-tag--done' : 'ps-tag--warn'}`}>{d[2]}</span>])}
              />
            )}
            {sec === 'Cài đặt bảo mật' && (
              <form className="ps-formgrid" onSubmit={(e) => e.preventDefault()}>
                <label>Mật khẩu hiện tại<input type="password" /></label>
                <label>Mật khẩu mới<input type="password" /></label>
                <label>Nhập lại mật khẩu mới<input type="password" /></label>
                <label className="ps-formgrid__wide ps-inline"><input type="checkbox" defaultChecked /> Bật xác thực 2 lớp (2FA)</label>
                <button type="submit" className="humg-btn humg-btn--primary">Cập nhật bảo mật</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/* ======================= THÔNG BÁO ======================= */
export function PgNotifications() {
  const n = pgNotifications
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

/* ======================= TICKET HỖ TRỢ ======================= */
function TicketTag({ v }) {
  const cls = v === 'Đã hoàn thành' ? 'ps-tag--done'
    : v === 'Chờ phản hồi' ? 'ps-tag--warn'
    : v === 'Đã đóng' ? 'ps-tag--cancel' : 'ps-tag--run'
  return <span className={`ps-tag ${cls}`}>{v}</span>
}
export function PgTickets() {
  const t = pgTickets
  const [tab, setTab] = useState('list')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('Tất cả trạng thái')
  const list = useMemo(() => t.list.filter((x) =>
    (status === 'Tất cả trạng thái' || x.status === status)
    && (!q || norm(`${x.id} ${x.title} ${x.cat}`).includes(norm(q)))), [q, status])
  return (
    <>
      <Head title="Ticket hỗ trợ" />
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
                    <strong>{s.value}</strong><span>{s.label}</span>
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
              <button type="submit" className="humg-btn humg-btn--primary">Gửi ticket</button>
            </form>
          )}
        </div>
      </Panel>
    </>
  )
}

/* ======================= CÀI ĐẶT TÀI KHOẢN ======================= */
export function PgSettings() {
  const s = pgSettings
  const [prefs, setPrefs] = useState(() => Object.fromEntries(s.prefs.map((p) => [p.key, p.on])))
  return (
    <>
      <Head title="Cài đặt tài khoản" />
      <Panel title="Thông tin tài khoản" icon="user"><DataTable columns={['Mục', 'Thông tin']} rows={s.account} /></Panel>
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
