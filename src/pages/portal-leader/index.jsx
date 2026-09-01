import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import { Panel, DataTable, FilterBar, Pagination } from '../../components/ui/page.jsx'
import '../portal-student/portal-student.css'
import './portal-leader.css'
import {
  plYears, plTerms, plUnits, plDashboard, plBI, plReports, plApprovals,
  plSystem, plPortalSettings, plSysLog, plNotifications, plDomains,
} from '../../data/portalLeader.js'

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
const DONUT_COLORS = ['#0a3d91', '#1976d2', '#2e7d32', '#f59e0b', '#7b3fe4', '#94a3b8']

/* ============================ Helpers ============================ */
function Head({ title, sub, right }) {
  return (
    <div className="ps-head">
      <div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      {right && <div className="ps-head__right">{right}</div>}
    </div>
  )
}
function Delta({ v, down }) {
  if (!v) return null
  const isDown = down || String(v).trim().startsWith('-')
  return <span className={`pl-delta ${isDown ? 'is-down' : 'is-up'}`}>{isDown ? '▼' : '▲'} {String(v).replace('-', '')}</span>
}
function KpiGrid({ items, cols }) {
  return (
    <div className="pl-kpis" style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}>
      {items.map((s) => (
        <div key={s.label} className="pl-kpi">
          {s.icon && <span className="pl-kpi__ic"><Icon name={s.icon} size={16} /></span>}
          <strong>{s.value}</strong>
          <span>{s.label}</span>
          <Delta v={s.delta} down={s.down} />
        </div>
      ))}
    </div>
  )
}
function Donut({ total, unit, parts }) {
  let acc = 0
  const stops = parts.map((p, i) => {
    const from = acc; acc += p.pct
    return `${DONUT_COLORS[i % DONUT_COLORS.length]} ${from}% ${acc}%`
  }).join(', ')
  return (
    <div className="pl-donut">
      <span className="pl-donut__ring" style={{ background: `conic-gradient(${stops})` }}>
        <strong>{total}{unit && <em> {unit}</em>}</strong>
      </span>
      <ul className="pl-legend">
        {parts.map((p, i) => (
          <li key={p.label}><span style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />{p.label} · {p.pct}%</li>
        ))}
      </ul>
    </div>
  )
}
function BarChart({ data, total, delta }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <>
      <div className="pl-bars">
        {data.map((d) => (
          <div key={d.label} className="pl-bar">
            <span className="pl-bar__col"><span className="pl-bar__fill" style={{ height: `${(d.value / max) * 100}%` }} /></span>
            <span className="pl-bar__val">{d.value}</span>
            <span className="pl-bar__label">{d.label}</span>
          </div>
        ))}
      </div>
      {total && <p className="pl-barnote">Tổng: <strong>{total}</strong> {delta && <Delta v={delta} />}</p>}
    </>
  )
}
function LineChart({ labels, series }) {
  const w = 520, h = 170, pad = 30
  const all = series.flatMap((s) => s.points)
  const min = Math.min(...all) - 3
  const max = Math.max(...all) + 3
  const x = (i) => pad + (i * (w - pad * 2)) / (labels.length - 1)
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2)
  const stroke = ['var(--humg-secondary)', 'var(--humg-accent)']
  return (
    <div className="pl-line">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Xu hướng chỉ số theo thời gian">
        {series.map((s, si) => (
          <g key={s.name}>
            <polyline points={s.points.map((v, i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke={stroke[si % 2]} strokeWidth="2" />
            {s.points.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={stroke[si % 2]} />)}
          </g>
        ))}
      </svg>
      <div className="pl-line__labels">{labels.map((l) => <span key={l}>{l}</span>)}</div>
      <ul className="pl-line__legend">
        {series.map((s, si) => <li key={s.name}><span style={{ background: stroke[si % 2] }} />{s.name}</li>)}
      </ul>
    </div>
  )
}
function Sel({ label, value, onChange, options }) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}
function Filters({ year, setYear, term, setTerm, unit, setUnit }) {
  return (
    <form className="ps-filter" onSubmit={(e) => e.preventDefault()}>
      <Sel label="Năm học" value={year} onChange={setYear} options={plYears} />
      {setTerm ? <Sel label="Học kỳ" value={term} onChange={setTerm} options={plTerms} /> : null}
      {setUnit ? <Sel label="Đơn vị" value={unit} onChange={setUnit} options={plUnits} /> : null}
    </form>
  )
}
function SeverityTag({ v }) {
  const cls = v === 'Cao' ? 'ps-tag--cancel' : v === 'Trung bình' ? 'ps-tag--warn' : 'ps-tag--run'
  return <span className={`ps-tag ${cls}`}>{v}</span>
}

/* ============================ 12.1 · TỔNG QUAN ĐIỀU HÀNH ============================ */
export function PlDashboard() {
  const [year, setYear] = useState(plYears[0])
  const [term, setTerm] = useState(plTerms[1])
  const d = plDashboard
  return (
    <>
      <Head title="Tổng quan toàn trường" sub={`Cập nhật: ${d.updatedAt}`} right={<Filters year={year} setYear={setYear} term={term} setTerm={setTerm} />} />
      <KpiGrid items={d.stats} cols={4} />

      <div className="ps-grid2">
        <Panel title="Tuyển sinh theo ngành" icon="award">
          <Donut total={d.admissionDonut.total} parts={d.admissionDonut.parts} />
        </Panel>
        <Panel title="Doanh thu theo quý (tỷ VND)" icon="file">
          <BarChart data={d.revenue.quarters} total={d.revenue.total} delta={d.revenue.delta} />
        </Panel>
      </div>

      <div className="ps-grid2">
        <Panel title="Cảnh báo & Thông báo" icon="bell" action={<Link to="/euni/lanh-dao/canh-bao" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={13} /></Link>}>
          <ul className="pl-alertlist">
            {d.alerts.map((a) => (
              <li key={a.text} className={a.urgent ? 'is-urgent' : ''}>
                <Icon name={a.urgent ? 'bell' : 'clock'} size={14} /> {a.text}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Hoạt động gần đây" icon="clock">
          <ul className="ps-notice">
            {d.activity.map((a) => <li key={a.text}><p>{a.text}</p><span>{a.time}</span></li>)}
          </ul>
        </Panel>
      </div>
    </>
  )
}

/* ============================ 12.2 · CHỈ SỐ ĐIỀU HÀNH (BI) ============================ */
export function PlBI() {
  const [year, setYear] = useState(plYears[0])
  const [term, setTerm] = useState(plTerms[1])
  const [unit, setUnit] = useState(plUnits[0])
  return (
    <>
      <Head title="Chỉ số điều hành (BI)" sub="Bộ chỉ số điều hành theo thời gian thực" />
      <Panel title="Bộ lọc" icon="search"><Filters year={year} setYear={setYear} term={term} setTerm={setTerm} unit={unit} setUnit={setUnit} /></Panel>
      <Panel title="Chỉ số đào tạo" icon="book"><KpiGrid items={plBI.training} cols={3} /></Panel>
      <Panel title="Chỉ số nghiên cứu" icon="flask"><KpiGrid items={plBI.research} cols={3} /></Panel>
      <Panel title="Chỉ số tài chính" icon="file"><KpiGrid items={plBI.finance} cols={3} /></Panel>
      <Panel title="Xu hướng chỉ số theo thời gian" icon="grid">
        <LineChart labels={plBI.trend.labels} series={plBI.trend.series} />
      </Panel>
    </>
  )
}

/* ============================ 12.3 · BÁO CÁO & THỐNG KÊ ============================ */
export function PlReports() {
  return (
    <>
      <Head title="Báo cáo & Thống kê" right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="file" size={13} /> Tạo báo cáo mới</button>
      } />
      <Panel title="Danh mục báo cáo" icon="grid">
        <div className="pl-repcat">
          {plReports.catalog.map((r) => (
            <button key={r.title} type="button" className="pl-repcard">
              <span className="pl-repcard__ic"><Icon name={r.icon} size={18} /></span>
              <strong>{r.title}</strong>
              <span>{r.desc}</span>
            </button>
          ))}
        </div>
      </Panel>
      <Panel title="Báo cáo yêu thích" icon="award">
        <ul className="pl-favlist">
          {plReports.favorites.map((f) => (
            <li key={f[0]}>
              <Icon name="file" size={15} />
              <span className="pl-favlist__name">{f[0]}</span>
              <span className="pl-favlist__meta">{f[1]} · {f[2]}</span>
              <button type="button" aria-label="Tải xuống"><Icon name="download" size={14} /></button>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  )
}

/* ============================ 12.4 · PHÊ DUYỆT & CẢNH BÁO ============================ */
const APPROVAL_FILTERS = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Từ chối']
export function PlApprovals({ initial = 'phe-duyet' }) {
  const [tab, setTab] = useState(initial)
  const [flt, setFlt] = useState('Tất cả')
  const a = plApprovals
  const list = flt === 'Tất cả' ? a.list : a.list.filter((x) => x.status === flt)
  return (
    <>
      <Head title="Phê duyệt & Cảnh báo" sub="Xử lý yêu cầu phê duyệt và theo dõi cảnh báo điều hành" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'phe-duyet' ? 'is-active' : ''} onClick={() => setTab('phe-duyet')}>Phê duyệt</button>
          <button type="button" className={tab === 'canh-bao' ? 'is-active' : ''} onClick={() => setTab('canh-bao')}>Cảnh báo</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'phe-duyet' && (
            <>
              <div className="pl-subfilter">
                {APPROVAL_FILTERS.map((f) => (
                  <button key={f} type="button" className={flt === f ? 'is-active' : ''} onClick={() => setFlt(f)}>
                    {f} <em>({a.counts[f] ?? 0})</em>
                  </button>
                ))}
              </div>
              <ul className="pl-approval">
                {list.map((x) => (
                  <li key={x.title}>
                    <span className="pl-approval__ic"><Icon name={x.icon} size={17} /></span>
                    <div className="pl-approval__body">
                      <strong>{x.title}</strong>
                      <span>{x.unit} · {x.time}</span>
                    </div>
                    <div className="pl-approval__act">
                      <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Xem</button>
                      {x.status === 'Chờ duyệt' && <>
                        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm">Duyệt</button>
                        <button type="button" className="pl-reject">Từ chối</button>
                      </>}
                      {x.status !== 'Chờ duyệt' && <span className="ps-tag ps-tag--done">{x.status}</span>}
                    </div>
                  </li>
                ))}
              </ul>
              {!list.length && <p className="ps-empty">Không có yêu cầu nào ở trạng thái này.</p>}
              <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm" style={{ marginTop: 12 }}>Xem tất cả yêu cầu</button>
            </>
          )}
          {tab === 'canh-bao' && (
            <DataTable
              columns={['Mức độ', 'Nội dung cảnh báo', 'Đơn vị', 'Thời hạn']}
              rows={a.alerts.map((r) => [<SeverityTag key="s" v={r[0]} />, r[1], r[2], r[3]])}
            />
          )}
        </div>
      </Panel>
    </>
  )
}

/* ============================ 12.5 · QUẢN LÝ HỆ THỐNG ============================ */
export function PlSystem() {
  return (
    <>
      <Head title="Quản lý hệ thống" sub="Quản trị người dùng, cấu hình và tích hợp hệ thống" />
      {plSystem.groups.map((g) => (
        <Panel key={g.title} title={g.title} icon="grid">
          <div className="pl-sysgrid">
            {g.items.map((it) => {
              const inner = (
                <>
                  <span className="pl-sysitem__ic"><Icon name={it.icon} size={18} /></span>
                  <strong>{it.title}</strong>
                  <span>{it.desc}</span>
                </>
              )
              return it.to
                ? <Link key={it.title} to={it.to} className="pl-sysitem">{inner}</Link>
                : <button key={it.title} type="button" className="pl-sysitem">{inner}</button>
            })}
          </div>
        </Panel>
      ))}
      <Panel title="Thông tin hệ thống" icon="lock">
        <ul className="ps-kv">
          {plSystem.info.map(([k, v]) => <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
        </ul>
      </Panel>
    </>
  )
}

/* ============================ 12.6 · CÀI ĐẶT CỔNG THÔNG TIN ============================ */
export function PlPortalSettings() {
  const s = plPortalSettings
  const [tab, setTab] = useState(s.tabs[0])
  const [theme, setTheme] = useState(s.themes[0])
  const [color, setColor] = useState(s.colors[0])
  const [display, setDisplay] = useState(() => Object.fromEntries(s.display.map((d) => [d.key, d.on])))
  return (
    <>
      <Head title="Cài đặt cổng thông tin" right={
        <div className="ps-head__right">
          <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="eye" size={13} /> Xem trước</button>
          <button type="button" className="humg-btn humg-btn--primary humg-btn--sm">Lưu thay đổi</button>
        </div>
      } />
      <Panel flush>
        <div className="ps-tabs ps-tabs--wrap">
          {s.tabs.map((t) => (
            <button key={t} type="button" className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="ps-tabbody">
          {tab === 'Giao diện' ? (
            <>
              <h4 className="ps-subhead">Chọn giao diện</h4>
              <div className="pl-themes">
                {s.themes.map((th) => (
                  <button key={th} type="button" className={`pl-theme ${theme === th ? 'is-active' : ''}`} onClick={() => setTheme(th)}>
                    <span className="pl-theme__preview" />
                    {th}
                  </button>
                ))}
              </div>
              <h4 className="ps-subhead">Màu chủ đạo</h4>
              <div className="pl-colors">
                {s.colors.map((c) => (
                  <button key={c} type="button" aria-label={c} className={`pl-color ${color === c ? 'is-active' : ''}`} style={{ background: c }} onClick={() => setColor(c)} />
                ))}
              </div>
              <div className="pl-setgrid">
                <div>
                  <h4 className="ps-subhead">Tùy chọn hiển thị</h4>
                  <ul className="pl-checks">
                    {s.display.map((d) => (
                      <li key={d.key}>
                        <label>
                          <input type="checkbox" checked={display[d.key]} onChange={() => setDisplay((v) => ({ ...v, [d.key]: !v[d.key] }))} />
                          {d.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="ps-subhead">Logo & Banner</h4>
                  <div className="pl-brandset">
                    <div><span className="humg-ph" data-ratio="3-2"><span>Logo HUMG</span></span><button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Thay đổi</button></div>
                    <div><span className="humg-ph" data-ratio="16-9"><span>Banner trang chủ</span></span><button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Thay đổi</button></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="ps-muted" style={{ padding: 12 }}>Cấu hình “{tab}” — dùng chung trình biên tập với khối CMS.
              {' '}<Link to="/cms/cau-hinh" className="humg-link-more">Mở CMS <Icon name="arrow-right" size={13} /></Link>
            </p>
          )}
        </div>
      </Panel>
    </>
  )
}

/* ============================ 12.7 · NHẬT KÝ HỆ THỐNG ============================ */
export function PlSysLog() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('Tất cả')
  const rows = useMemo(() => plSysLog.rows.filter((r) => {
    if (type !== 'Tất cả' && !norm(r[2]).includes(norm(type))) return false
    if (q && !norm(`${r[1]} ${r[2]} ${r[3]}`).includes(norm(q))) return false
    return true
  }), [q, type])
  return (
    <>
      <Head title="Nhật ký hệ thống" sub={`${plSysLog.total} bản ghi thao tác`} />
      <Panel flush>
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo người dùng, sự kiện, IP…"
          selects={[{ label: 'Loại sự kiện', value: type, onChange: setType, options: plSysLog.eventTypes }]}
          count={rows.length} total={plSysLog.total}
          onReset={() => { setQ(''); setType('Tất cả') }}
        />
        <DataTable columns={['Thời gian', 'Người dùng', 'Sự kiện', 'IP / Thiết bị']} rows={rows} />
        {!rows.length && <p className="ps-empty">Không có nhật ký nào khớp bộ lọc.</p>}
        <div className="ps-listfoot">
          <span>Hiển thị 1 – {rows.length} trong tổng số {plSysLog.total} nhật ký</span>
          <Pagination page={1} total={19} />
        </div>
      </Panel>
    </>
  )
}

/* ============================ 12.8 · TRUNG TÂM THÔNG BÁO ============================ */
export function PlNotifications() {
  const n = plNotifications
  const [tab, setTab] = useState('Tất cả')
  const list = tab === 'Tất cả' ? n.list : n.list.filter((x) => x.kind === tab || (tab === 'Thông báo cá nhân' && x.kind === 'Thông báo cá nhân'))
  return (
    <>
      <Head title="Trung tâm thông báo" right={
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
              <li key={x.title}>
                <span className="ps-noti__ic"><Icon name={x.icon} size={18} /></span>
                <div className="ps-noti__body">
                  <div className="ps-noti__top"><strong>{x.title}</strong><span className="ps-tag ps-tag--run">{x.kind}</span></div>
                  <p>{x.unit}</p>
                  <em>{x.time}</em>
                </div>
              </li>
            ))}
          </ul>
          {!list.length && <p className="ps-muted" style={{ padding: 12 }}>Không có thông báo trong mục này.</p>}
          <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm" style={{ margin: 12 }}>Xem tất cả thông báo</button>
        </div>
      </Panel>
    </>
  )
}

/* ============================ Trang chuyên đề (Đào tạo · NCKH · Sinh viên · Tài chính · Nhân sự · CSVC) ============================ */
export function PlDomain({ slug }) {
  const d = plDomains[slug]
  const [year, setYear] = useState(plYears[0])
  const [unit, setUnit] = useState(plUnits[0])
  if (!d) return <Head title="Chuyên đề" sub="Không tìm thấy dữ liệu" />
  return (
    <>
      <Head title={d.title} sub="Số liệu tổng hợp theo đơn vị" right={
        <div className="ps-head__right">
          <Filters year={year} setYear={setYear} unit={unit} setUnit={setUnit} />
          <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="download" size={13} /> Xuất báo cáo</button>
        </div>
      } />
      <KpiGrid items={d.stats} cols={4} />
      <Panel title={`Chi tiết theo đơn vị · ${d.title}`} icon={d.icon} flush>
        <DataTable columns={d.columns} rows={d.rows} />
      </Panel>
    </>
  )
}
export const PlTraining = () => <PlDomain slug="dao-tao" />
export const PlResearch = () => <PlDomain slug="nghien-cuu-khoa-hoc" />
export const PlStudents = () => <PlDomain slug="sinh-vien" />
export const PlFinance = () => <PlDomain slug="tai-chinh" />
export const PlHR = () => <PlDomain slug="nhan-su" />
export const PlFacilities = () => <PlDomain slug="co-so-vat-chat" />
