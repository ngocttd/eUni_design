import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, StatRow, Chips, FilterBar, StepList, Faq,
  DocList, LinkList, SupportCard, NewsMini, HeroSearch, MetaBar, Pagination,
} from '../../components/ui/page.jsx'

const rnorm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
const NOW_YEAR = 2026
const projectPct = (p) => {
  if (p.status === 'Đã nghiệm thu') return 100
  if (p.status === 'Kêu gọi hợp tác' || p.status === 'Đang tuyển sinh') return 0
  const span = (p.endYear - p.startYear) || 1
  return Math.max(10, Math.min(95, Math.round(((NOW_YEAR - p.startYear + 0.5) / span) * 100)))
}
import {
  resNav, researchFields, resHub, projects, projectLevels, getProject,
  publications, publicationTypes, getPublication, experts, expertStats, strongFields,
  getExpert, researchGroups, getGroup, conferences, getConference, labs, getLab,
  techTransfer, phdTraining,
} from '../../data/research.js'
import './research.css'

const NAV = <SectionNav title="Nghiên cứu" items={resNav} />
const shell = (props) => <PageShell eyebrow="Nghiên cứu" sectionNav={NAV} accent="#6d28d9" {...props} />

const SUPPORT = (
  <SupportCard
    title="Phòng Khoa học – Công nghệ"
    lead="Hỗ trợ đề tài, công bố, sở hữu trí tuệ và chuyển giao."
    phone="024.3838.3829"
    email="khcn@humg.edu.vn"
    cta={{ label: 'Gửi yêu cầu', to: '/lien-he' }}
  />
)

function StatusTag({ status }) {
  const map = { 'Đang thực hiện': 'is-run', 'Đã nghiệm thu': 'is-done', 'Tạm dừng': 'is-hold', 'Sắp diễn ra': 'is-run', 'Đã tổ chức': 'is-done' }
  return <span className={`res-status ${map[status] || ''}`}>{status}</span>
}

/* ======================= TỔNG QUAN KH&CN ======================= */
export function ResearchHubPage() {
  return shell({
    title: 'Khoa học & Công nghệ',
    lead: 'Cập nhật hoạt động nghiên cứu khoa học, công bố, đề tài – dự án, chuyển giao công nghệ và đổi mới sáng tạo của HUMG.',
    crumbs: [{ label: 'Nghiên cứu' }],
    hero: <HeroSearch placeholder="Tìm đề tài, công bố, chuyên gia…" />,
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={resHub.quickLinks} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Số liệu KH&CN" icon="award"><StatRow items={resHub.stats} /></Panel>

        <Panel title="Lĩnh vực nghiên cứu" icon="target">
          <div className="res-chiprow">{researchFields.map((f) => <span key={f}>{f}</span>)}</div>
        </Panel>

        <Panel
          title="Đề tài / dự án tiêu biểu"
          icon="flask"
          action={<Link to="/nghien-cuu/de-tai" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <div className="res-list">
            {projects.slice(0, 3).map((p) => (
              <Link key={p.id} to={`/nghien-cuu/de-tai/${p.id}`} className="res-item">
                <span className="res-item__code">{p.code}</span>
                <span className="res-item__body">
                  <strong>{p.title}</strong>
                  <em>{p.leader} · {p.field} · {p.startYear}–{p.endYear}</em>
                </span>
                <StatusTag status={p.status} />
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Công bố khoa học nổi bật"
          icon="newspaper"
          action={<Link to="/nghien-cuu/cong-bo" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <div className="res-list">
            {publications.slice(0, 3).map((p) => (
              <Link key={p.id} to={`/nghien-cuu/cong-bo/${p.id}`} className="res-item">
                <span className="res-item__body">
                  <strong>{p.title}</strong>
                  <em>{p.authors} · {p.journal} · {p.year}</em>
                </span>
                {p.quartile !== '—' && <span className="res-q">{p.quartile}</span>}
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Sự kiện KH&CN sắp diễn ra"
          icon="calendar"
          action={<Link to="/nghien-cuu/hoi-nghi-hoi-thao" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <div className="res-list">
            {conferences.filter((c) => c.status === 'Sắp diễn ra').slice(0, 3).map((c) => (
              <Link key={c.slug} to={`/nghien-cuu/hoi-nghi-hoi-thao/${c.slug}`} className="res-item">
                <span className="res-item__body">
                  <strong>{c.name}</strong>
                  <em>{c.date} · {c.place} · {c.scope}</em>
                </span>
                <Icon name="arrow-right" size={15} />
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Tin tức & thông báo KH&CN"
          icon="bell"
          action={<Link to="/tin-tuc" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <NewsMini items={resHub.notices.map((n) => ({ ...n, to: '/tin-tuc' }))} />
        </Panel>
      </>
    ),
  })
}

/* ======================= ĐỀ TÀI / DỰ ÁN — DANH SÁCH ======================= */
export function ProjectListPage() {
  const [q, setQ] = useState('')
  const [level, setLevel] = useState('Tất cả')
  const [status, setStatus] = useState('Tất cả')
  const [field, setField] = useState('Tất cả')
  const [sort, setSort] = useState('Mới nhất')
  const statuses = ['Tất cả', ...Array.from(new Set(projects.map((p) => p.status)))]
  const fields = ['Tất cả', ...Array.from(new Set(projects.map((p) => p.field)))]
  const reset = () => { setQ(''); setLevel('Tất cả'); setStatus('Tất cả'); setField('Tất cả'); setSort('Mới nhất') }
  const list = useMemo(() => {
    let r = projects.filter((p) =>
      (level === 'Tất cả' || p.level === level)
      && (status === 'Tất cả' || p.status === status)
      && (field === 'Tất cả' || p.field === field)
      && (!q || rnorm(`${p.title} ${p.code} ${p.leader}`).includes(rnorm(q))))
    if (sort === 'Mới nhất') r = [...r].sort((a, b) => b.startYear - a.startYear)
    else if (sort === 'Cũ nhất') r = [...r].sort((a, b) => a.startYear - b.startYear)
    else r = [...r].sort((a, b) => a.title.localeCompare(b.title, 'vi'))
    return r
  }, [q, level, status, field, sort])

  return shell({
    title: 'Đề tài / Dự án',
    lead: 'Danh sách đề tài, dự án khoa học công nghệ các cấp của Trường Đại học Mỏ - Địa chất.',
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Đề tài / Dự án' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Công bố khoa học', to: '/nghien-cuu/cong-bo' },
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
          { label: 'Nhóm nghiên cứu', to: '/nghien-cuu/nhom-nghien-cuu' },
          { label: 'Mẫu thuyết minh đề tài', to: '/hoc-tap/bieu-mau' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Thống kê" icon="award">
          <StatRow items={[
            { value: '142', label: 'Tổng số đề tài' },
            { value: '48', label: 'Đang thực hiện' },
            { value: '76', label: 'Đã nghiệm thu' },
            { value: '18', label: 'Cấp Nhà nước / Bộ' },
          ]} />
        </Panel>
        <Panel title="Danh sách đề tài" icon="flask">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên, mã số, chủ nhiệm…"
            selects={[
              { label: 'Cấp đề tài', value: level, onChange: setLevel, options: projectLevels },
              { label: 'Trạng thái', value: status, onChange: setStatus, options: statuses },
              { label: 'Lĩnh vực', value: field, onChange: setField, options: fields },
            ]}
            sort={sort} onSort={setSort} sortOptions={['Mới nhất', 'Cũ nhất', 'Tên A → Z']}
            count={list.length} total={projects.length} onReset={reset}
          />
          <div className="res-cards">
            {list.map((p) => {
              const pct = projectPct(p)
              return (
                <Link key={p.id} to={`/nghien-cuu/de-tai/${p.id}`} className="res-card">
                  <span className="res-card__ic"><Icon name="flask" size={18} /></span>
                  <div className="res-card__body">
                    <div className="res-card__top">
                      <strong>{p.title}</strong>
                      <StatusTag status={p.status} />
                    </div>
                    <p className="res-card__meta">Mã số: {p.code} · {p.level} · {p.field}</p>
                    <p className="res-card__meta">Chủ nhiệm: {p.leader} · {p.startYear}–{p.endYear}{p.budget ? ` · Kinh phí: ${p.budget}` : ''}</p>
                    <div className="res-progress">
                      <span className="res-progress__track"><span style={{ width: `${pct}%` }} /></span>
                      <span className="res-progress__val">{pct}%</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          {list.length === 0 && <p className="res-lead">Không tìm thấy đề tài phù hợp.</p>}
        </Panel>
      </>
    ),
  })
}

/* ======================= ĐỀ TÀI — CHI TIẾT ======================= */
export function ProjectDetailPage() {
  const { id } = useParams()
  const p = getProject(id) || projects[0]
  const [tab, setTab] = useState('tong-quan')
  const tabs = [
    { key: 'tong-quan', label: 'Tổng quan' },
    { key: 'muc-tieu', label: 'Mục tiêu – Nội dung' },
    { key: 'ket-qua', label: 'Kết quả' },
    { key: 'san-pham', label: 'Sản phẩm' },
    { key: 'thanh-vien', label: 'Thành viên' },
  ]
  return shell({
    title: p.title,
    crumbs: [
      { label: 'Nghiên cứu', to: '/nghien-cuu' },
      { label: 'Đề tài / Dự án', to: '/nghien-cuu/de-tai' },
      { label: p.code },
    ],
    hero: <MetaBar items={[
      { icon: 'grid', text: `Mã số: ${p.code}` },
      { icon: 'award', text: p.level },
      { icon: 'user', text: p.leader },
    ]} />,
    sidebar: (
      <>
        <Panel title="Văn bản, tài liệu" icon="file"><DocList items={p.docs} /></Panel>
        <Panel title="Đề tài khác" icon="flask">
          <NewsMini items={projects.filter((x) => x.id !== p.id).slice(0, 4).map((x) => ({ date: x.code, title: x.title, to: `/nghien-cuu/de-tai/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <Panel>
          <StatRow items={[
            { value: p.level, label: 'Cấp đề tài' },
            { value: `${p.startYear}–${p.endYear}`, label: 'Thời gian' },
            { value: p.budget, label: 'Kinh phí' },
            { value: p.status, label: 'Trạng thái' },
          ]} />
        </Panel>
        <Panel flush>
          <div className="res-tabs">
            {tabs.map((t) => (
              <button key={t.key} type="button" className={t.key === tab ? 'is-active' : ''} onClick={() => setTab(t.key)}>{t.label}</button>
            ))}
          </div>
          <div className="res-tabbody">
            {tab === 'tong-quan' && (
              <>
                <p className="res-lead">{p.summary}</p>
                <DataTable
                  columns={['Mục', 'Chi tiết']}
                  rows={[
                    ['Chủ nhiệm', p.leader],
                    ['Cơ quan chủ trì', p.org],
                    ['Lĩnh vực', p.field],
                    ['Thời gian thực hiện', `${p.startYear} – ${p.endYear}`],
                    ['Kinh phí', p.budget],
                  ]}
                />
              </>
            )}
            {tab === 'muc-tieu' && <ul className="res-check">{p.objectives.map((o, i) => <li key={i}><Icon name="check" size={14} /> {o}</li>)}</ul>}
            {tab === 'ket-qua' && <ul className="res-check">{p.results.map((o, i) => <li key={i}><Icon name="check" size={14} /> {o}</li>)}</ul>}
            {tab === 'san-pham' && <ul className="res-check">{p.products.map((o, i) => <li key={i}><Icon name="award" size={14} /> {o}</li>)}</ul>}
            {tab === 'thanh-vien' && (
              <div className="res-members">
                {p.members.map((m) => (
                  <div key={m.name} className="res-member">
                    <span className="res-member__ic"><Icon name="user" size={15} /></span>
                    <span><strong>{m.name}</strong><em>{m.role}</em></span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= CÔNG BỐ KHOA HỌC — DANH SÁCH ======================= */
export function PublicationListPage() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('Tất cả')
  const [year, setYear] = useState('Tất cả')
  const [sort, setSort] = useState('Mới nhất')
  const years = ['Tất cả', ...Array.from(new Set(publications.map((p) => String(p.year)))).sort().reverse()]
  const reset = () => { setQ(''); setType('Tất cả'); setYear('Tất cả'); setSort('Mới nhất') }
  const list = useMemo(() => {
    let r = publications.filter((p) =>
      (type === 'Tất cả' || p.type === type)
      && (year === 'Tất cả' || String(p.year) === year)
      && (!q || rnorm(`${p.title} ${p.authors} ${p.journal}`).includes(rnorm(q))))
    if (sort === 'Mới nhất') r = [...r].sort((a, b) => b.year - a.year)
    else if (sort === 'Cũ nhất') r = [...r].sort((a, b) => a.year - b.year)
    else r = [...r].sort((a, b) => a.title.localeCompare(b.title, 'vi'))
    return r
  }, [q, type, year, sort])

  return shell({
    title: 'Công bố khoa học',
    lead: 'Danh mục bài báo, công trình khoa học của cán bộ, giảng viên và nghiên cứu sinh HUMG.',
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Công bố khoa học' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Đề tài / Dự án', to: '/nghien-cuu/de-tai' },
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
          { label: 'Nhóm nghiên cứu', to: '/nghien-cuu/nhom-nghien-cuu' },
          { label: 'Tòa soạn Tạp chí KHKT Mỏ - Địa chất', to: '/gioi-thieu/don-vi-truc-thuoc/tap-chi-khoa-hoc' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Thống kê" icon="award">
          <StatRow items={[
            { value: '1.247', label: 'Tổng công bố' },
            { value: '652', label: 'Quốc tế (ISI/Scopus)' },
            { value: '325', label: 'Trong nước' },
            { value: '270', label: 'Hội nghị / khác' },
          ]} />
        </Panel>
        <Panel title="Danh sách công bố" icon="newspaper">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tiêu đề, tác giả, tạp chí…"
            selects={[
              { label: 'Loại công bố', value: type, onChange: setType, options: publicationTypes },
              { label: 'Năm', value: year, onChange: setYear, options: years },
            ]}
            sort={sort} onSort={setSort} sortOptions={['Mới nhất', 'Cũ nhất', 'Tên A → Z']}
            count={list.length} total={publications.length} onReset={reset}
          />
          <DataTable
            columns={['#', 'Tên công bố', 'Tác giả', 'Tạp chí / Hội nghị', 'Năm', 'CSDL']}
            rows={list.map((p, i) => [
              String(i + 1),
              <Link key="t" to={`/nghien-cuu/cong-bo/${p.id}`}>{p.title}{p.quartile !== '—' && <span className="res-q res-q--sm">{p.quartile}</span>}</Link>,
              p.authors,
              p.journal,
              String(p.year),
              p.quartile !== '—' ? 'Scopus / WoS' : 'Trong nước',
            ])}
          />
          {list.length === 0 && <p className="res-lead">Không tìm thấy công bố phù hợp.</p>}
        </Panel>
      </>
    ),
  })
}

/* ======================= CÔNG BỐ — CHI TIẾT ======================= */
export function PublicationDetailPage() {
  const { id } = useParams()
  const p = getPublication(id) || publications[0]
  return shell({
    title: p.title,
    crumbs: [
      { label: 'Nghiên cứu', to: '/nghien-cuu' },
      { label: 'Công bố khoa học', to: '/nghien-cuu/cong-bo' },
      { label: p.titleVi },
    ],
    hero: <MetaBar items={[
      { icon: 'calendar', text: `Năm ${p.year}` },
      { icon: 'newspaper', text: p.type },
      p.quartile !== '—' ? { icon: 'award', text: p.quartile } : null,
    ].filter(Boolean)} />,
    sidebar: (
      <>
        <Panel title="Tải bài báo" icon="download">
          <a href="#" className="humg-btn humg-btn--primary humg-btn--block"><Icon name="download" size={16} /> Tải PDF</a>
          <p className="res-note" style={{ marginTop: 10 }}>{p.downloads} lượt tải · {p.citations} lượt trích dẫn</p>
        </Panel>
        <Panel title="Công bố liên quan" icon="newspaper">
          <NewsMini items={publications.filter((x) => x.id !== p.id).slice(0, 4).map((x) => ({ date: String(x.year), title: x.title, to: `/nghien-cuu/cong-bo/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <Panel title="Thông tin bài báo" icon="file" flush>
          <DataTable
            columns={['Mục', 'Chi tiết']}
            rows={[
              ['Tên tiếng Việt', p.titleVi],
              ['Tác giả', p.authors],
              ['Tạp chí / Kỷ yếu', p.journal],
              ['Năm', String(p.year)],
              ['Loại', p.type + (p.quartile !== '—' ? ` (${p.quartile})` : '')],
              ['DOI', p.doi],
              ['Impact Factor', p.impactFactor],
              ['Lượt trích dẫn', String(p.citations)],
            ]}
          />
        </Panel>
        <Panel title="Tóm tắt (Abstract)" icon="newspaper">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{p.abstract}</p>
        </Panel>
        <Panel title="Từ khóa" icon="target">
          <div className="res-chiprow">{p.keywords.map((k) => <span key={k}>{k}</span>)}</div>
        </Panel>
        <Panel title="Trích dẫn (APA)" icon="file">
          <div className="res-cite">{p.apa}</div>
        </Panel>
      </>
    ),
  })
}

/* ======================= DANH SÁCH CHUYÊN GIA ======================= */
const degreeOf = (name) => (name.match(/GS\.TS|PGS\.TS|TS|ThS/) || ['Khác'])[0]
export function ExpertListPage() {
  const [q, setQ] = useState('')
  const [fac, setFac] = useState('Tất cả')
  const [deg, setDeg] = useState('Tất cả')
  const [sort, setSort] = useState('h-index')
  const facs = ['Tất cả', ...Array.from(new Set(experts.map((e) => e.faculty)))]
  const degs = ['Tất cả', 'GS.TS', 'PGS.TS', 'TS', 'ThS']
  const reset = () => { setQ(''); setFac('Tất cả'); setDeg('Tất cả'); setSort('h-index') }
  const list = useMemo(() => {
    let r = experts.filter((e) =>
      (fac === 'Tất cả' || e.faculty === fac)
      && (deg === 'Tất cả' || degreeOf(e.name) === deg)
      && (!q || rnorm(`${e.name} ${e.position} ${e.faculty} ${e.fields.join(' ')}`).includes(rnorm(q))))
    if (sort === 'h-index') r = [...r].sort((a, b) => b.hIndex - a.hIndex)
    else if (sort === 'Số công bố') r = [...r].sort((a, b) => b.pubs - a.pubs)
    else r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    return r
  }, [q, fac, deg, sort])
  return shell({
    title: 'Danh sách chuyên gia',
    lead: 'Đội ngũ chuyên gia, nhà khoa học của HUMG theo lĩnh vực nghiên cứu.',
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Danh sách chuyên gia' }],
    sidebar: (
      <>
        <Panel title="Lĩnh vực nghiên cứu mạnh" icon="target">
          <div className="res-pct">
            {strongFields.map((f) => (
              <div key={f.label} className="res-pct__row">
                <span className="res-pct__label">{f.label}</span>
                <span className="res-pct__track"><span style={{ width: `${(f.value / 56) * 100}%` }} /></span>
                <span className="res-pct__val">{f.value}</span>
              </div>
            ))}
          </div>
        </Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Thống kê chuyên gia" icon="award"><StatRow items={expertStats} /></Panel>
        <Panel title="Chuyên gia" icon="users">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên, chuyên môn, đơn vị…"
            selects={[
              { label: 'Đơn vị', value: fac, onChange: setFac, options: facs },
              { label: 'Học hàm / học vị', value: deg, onChange: setDeg, options: degs },
            ]}
            sort={sort} onSort={setSort} sortOptions={['h-index', 'Số công bố', 'Tên A → Z']}
            count={list.length} total={experts.length} onReset={reset}
          />
          <div className="res-experts">
            {list.map((e) => (
              <Link key={e.id} to={`/nghien-cuu/chuyen-gia/${e.id}`} className="res-expert">
                <span className="res-expert__photo humg-ph" data-ratio="1-1"><span>Ảnh</span></span>
                <div className="res-expert__body">
                  <strong>{e.name}</strong>
                  <span className="res-expert__pos">{e.position}</span>
                  <span className="res-expert__fac">{e.faculty}</span>
                  <div className="res-expert__fields">{e.fields.map((f) => <span key={f}>{f}</span>)}</div>
                  <div className="res-expert__meta">
                    <span><Icon name="newspaper" size={12} /> {e.pubs} công bố</span>
                    <span><Icon name="flask" size={12} /> {e.projects} đề tài</span>
                    <span><Icon name="award" size={12} /> h-index {e.hIndex}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {list.length === 0 && <p className="res-lead">Không tìm thấy chuyên gia phù hợp.</p>}
        </Panel>
      </>
    ),
  })
}

/* ======================= NHÓM NGHIÊN CỨU ======================= */
export function ResearchGroupsPage() {
  const [q, setQ] = useState('')
  const [field, setField] = useState('Tất cả')
  const [sort, setSort] = useState('Thành lập mới nhất')
  const fields = ['Tất cả', ...Array.from(new Set(researchGroups.map((g) => g.field)))]
  const reset = () => { setQ(''); setField('Tất cả'); setSort('Thành lập mới nhất') }
  const list = useMemo(() => {
    let r = researchGroups.filter((g) =>
      (field === 'Tất cả' || g.field === field)
      && (!q || rnorm(`${g.name} ${g.focus} ${g.leader}`).includes(rnorm(q))))
    if (sort === 'Thành lập mới nhất') r = [...r].sort((a, b) => b.established - a.established)
    else if (sort === 'Nhiều thành viên') r = [...r].sort((a, b) => b.members - a.members)
    else r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    return r
  }, [q, field, sort])
  return shell({
    title: 'Nhóm nghiên cứu',
    lead: 'Các nhóm nghiên cứu và nhóm nghiên cứu mạnh của Trường Đại học Mỏ - Địa chất.',
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Nhóm nghiên cứu' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
          { label: 'Đề tài / Dự án', to: '/nghien-cuu/de-tai' },
          { label: 'Phòng thí nghiệm', to: '/nghien-cuu/phong-thi-nghiem' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Danh sách nhóm nghiên cứu" icon="target">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên nhóm, hướng nghiên cứu, trưởng nhóm…"
          selects={[{ label: 'Lĩnh vực', value: field, onChange: setField, options: fields }]}
          sort={sort} onSort={setSort} sortOptions={['Thành lập mới nhất', 'Nhiều thành viên', 'Tên A → Z']}
          count={list.length} total={researchGroups.length} onReset={reset}
        />
        <div className="res-groupgrid">
          {list.map((g) => (
            <Link key={g.id} to={`/nghien-cuu/nhom-nghien-cuu/${g.id}`} className="res-groupcard">
              <span className="res-groupcard__cover humg-ph" data-ratio="16-9"><span>{g.name}</span></span>
              <span className="res-groupcard__body">
                <strong>{g.name}</strong>
                <em>{g.field}</em>
                <span className="res-groupcard__meta"><Icon name="user" size={12} /> {g.leader}</span>
                <span className="res-groupcard__meta"><Icon name="users" size={12} /> {g.members} thành viên · Thành lập {g.established}</span>
              </span>
              <span className="res-groupcard__go">Xem chi tiết <Icon name="arrow-right" size={13} /></span>
            </Link>
          ))}
        </div>
        {list.length === 0 && <p className="res-lead">Không tìm thấy nhóm nghiên cứu phù hợp.</p>}
      </Panel>
    ),
  })
}

/* ======================= HỘI NGHỊ / HỘI THẢO ======================= */
const MONTHS_VI = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
export function ConferencesPage() {
  const [tab, setTab] = useState('all')
  const [scope, setScope] = useState('Tất cả')
  const [year, setYear] = useState('Tất cả')
  const years = ['Tất cả', ...Array.from(new Set(conferences.map((c) => c.date.slice(-4)))).sort().reverse()]
  const opts = [
    { key: 'all', label: 'Tất cả', count: conferences.length },
    { key: 'Sắp diễn ra', label: 'Sắp diễn ra', count: conferences.filter((c) => c.status === 'Sắp diễn ra').length },
    { key: 'Đã tổ chức', label: 'Đã tổ chức', count: conferences.filter((c) => c.status === 'Đã tổ chức').length },
  ]
  const list = conferences.filter((c) =>
    (tab === 'all' || c.status === tab)
    && (scope === 'Tất cả' || c.scope === scope)
    && (year === 'Tất cả' || c.date.slice(-4) === year))
  return shell({
    title: 'Hội nghị / Hội thảo khoa học',
    lead: 'Các hội nghị, hội thảo khoa học trong nước và quốc tế do HUMG tổ chức hoặc đồng tổ chức.',
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Hội nghị / Hội thảo' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Đề tài / Dự án', to: '/nghien-cuu/de-tai' },
          { label: 'Công bố khoa học', to: '/nghien-cuu/cong-bo' },
          { label: 'Nhóm nghiên cứu', to: '/nghien-cuu/nhom-nghien-cuu' },
          { label: 'Tin tức & Sự kiện', to: '/tin-tuc' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Danh sách sự kiện khoa học" icon="calendar">
        <Chips options={opts} value={tab} onChange={setTab} />
        <FilterBar
          selects={[
            { label: 'Phạm vi', value: scope, onChange: setScope, options: ['Tất cả', 'Quốc tế', 'Trong nước'] },
            { label: 'Năm', value: year, onChange: setYear, options: years },
          ]}
          count={list.length} total={conferences.length}
          onReset={() => { setTab('all'); setScope('Tất cả'); setYear('Tất cả') }}
        />
        <div className="res-conflist">
          {list.map((c) => {
            const [d, m, y] = c.date.split('/')
            return (
              <div key={c.slug} className="res-confrow">
                <span className="res-confdate">
                  <strong>{d}</strong>
                  <em>Th{MONTHS_VI.indexOf(m) + 1}/{y}</em>
                </span>
                <div className="res-confrow__body">
                  <Link to={`/nghien-cuu/hoi-nghi-hoi-thao/${c.slug}`}><strong>{c.name}</strong></Link>
                  <MetaBar items={[
                    { icon: 'map-pin', text: c.place },
                    { icon: 'building', text: c.organizer },
                    { icon: 'globe', text: c.scope },
                  ]} />
                </div>
                <div className="res-confrow__act">
                  {c.status === 'Sắp diễn ra'
                    ? <Link to="/lien-he" className="humg-btn humg-btn--accent humg-btn--sm">Đăng ký tham dự</Link>
                    : <Link to={`/nghien-cuu/hoi-nghi-hoi-thao/${c.slug}`} className="humg-btn humg-btn--ghost humg-btn--sm">Xem chi tiết</Link>}
                  <StatusTag status={c.status} />
                </div>
              </div>
            )
          })}
        </div>
        {list.length === 0 && <p className="res-lead">Không có sự kiện phù hợp.</p>}
      </Panel>
    ),
  })
}

/* ======================= PHÒNG THÍ NGHIỆM ======================= */
export function LabsPage() {
  return shell({
    title: 'Phòng thí nghiệm',
    lead: 'Hệ thống phòng thí nghiệm phục vụ đào tạo, nghiên cứu và cung cấp dịch vụ khoa học công nghệ.',
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Phòng thí nghiệm' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Nhóm nghiên cứu', to: '/nghien-cuu/nhom-nghien-cuu' },
          { label: 'Chuyển giao công nghệ', to: '/nghien-cuu/chuyen-giao-cong-nghe' },
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
          { label: 'Đề tài / Dự án', to: '/nghien-cuu/de-tai' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <div className="res-labs">
        {labs.map((l) => (
          <Panel
            key={l.id}
            title={l.name}
            icon="grid"
            action={<Link to={`/nghien-cuu/phong-thi-nghiem/${l.id}`} className="humg-link-more">Chi tiết <Icon name="arrow-right" size={14} /></Link>}
          >
            <p className="res-lead" style={{ marginTop: 0 }}>{l.desc}</p>
            <p className="res-note"><Icon name="user" size={13} /> Phụ trách: {l.head} · {l.faculty}</p>
            <div className="res-labcols">
              <div>
                <h4>Thiết bị chính</h4>
                <ul className="res-check">{l.equipment.map((x) => <li key={x}><Icon name="check" size={13} /> {x}</li>)}</ul>
              </div>
              <div>
                <h4>Dịch vụ</h4>
                <ul className="res-check">{l.services.map((x) => <li key={x}><Icon name="check" size={13} /> {x}</li>)}</ul>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    ),
  })
}

/* ======================= CHUYỂN GIAO CÔNG NGHỆ ======================= */
export function TechTransferPage() {
  return shell({
    title: 'Chuyển giao công nghệ',
    lead: techTransfer.intro,
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Chuyển giao công nghệ' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Phòng thí nghiệm', to: '/nghien-cuu/phong-thi-nghiem' },
          { label: 'Nhóm nghiên cứu', to: '/nghien-cuu/nhom-nghien-cuu' },
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Quy trình chuyển giao" icon="layers"><StepList items={techTransfer.steps} /></Panel>
        <Panel title="Sản phẩm / hợp đồng tiêu biểu" icon="handshake">
          <div className="res-tt">
            {techTransfer.products.map((t) => (
              <div key={t.name} className="res-tt__item">
                <strong>{t.name}</strong>
                <span className="res-tt__value">{t.value}</span>
                <em>{t.field} · Đối tác: {t.partner} · {t.year}</em>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Năng lực cung cấp dịch vụ" icon="check">
          <ul className="res-check">{techTransfer.capabilities.map((c, i) => <li key={i}><Icon name="check" size={14} /> {c}</li>)}</ul>
        </Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={techTransfer.faqs} /></Panel>
      </>
    ),
  })
}

/* ======================= NGHIÊN CỨU SINH ======================= */
export function PhdTrainingPage() {
  return shell({
    title: 'Đào tạo Nghiên cứu sinh',
    lead: phdTraining.intro,
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Nghiên cứu sinh' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Tuyển sinh sau đại học', to: '/hoc-tap/tuyen-sinh' },
          { label: 'Chương trình đào tạo', to: '/hoc-tap/chuong-trinh-dao-tao' },
          { label: 'Công bố khoa học', to: '/nghien-cuu/cong-bo' },
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
        ]} />
        <Panel title="Văn bản, biểu mẫu" icon="file"><DocList items={phdTraining.docs} /></Panel>
        <SupportCard
          title="Phòng Đào tạo Sau đại học"
          lead="Tư vấn tuyển sinh và quản lý NCS."
          phone="024.3838.3828"
          email="saudaihoc@humg.edu.vn"
          cta={{ label: 'Liên hệ', to: '/lien-he' }}
        />
      </>
    ),
    children: (
      <>
        <Panel title="Số liệu đào tạo tiến sĩ" icon="award"><StatRow items={phdTraining.stats} /></Panel>
        <Panel title="Các ngành đào tạo trình độ tiến sĩ" icon="graduation">
          <div className="res-chiprow">{phdTraining.fields.map((f) => <span key={f}>{f}</span>)}</div>
        </Panel>
        <Panel title="Quy trình đào tạo" icon="layers"><StepList items={phdTraining.steps} /></Panel>
        <Panel
          title="Thông báo"
          icon="bell"
          action={<Link to="/tin-tuc" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <NewsMini items={phdTraining.notices.map((n) => ({ ...n, to: '/tin-tuc' }))} />
        </Panel>
      </>
    ),
  })
}

/* ============================================================ TRANG CHI TIẾT ============================================================ */
const GENERIC_EDU = [
  'Tiến sĩ — chuyên ngành phù hợp (đào tạo trong nước / nước ngoài)',
  'Thạc sĩ — Trường Đại học Mỏ - Địa chất',
  'Kỹ sư / Cử nhân — Trường Đại học Mỏ - Địa chất',
]
const GENERIC_FOCUS = [
  'Nghiên cứu cơ bản định hướng ứng dụng',
  'Phát triển công nghệ và giải pháp kỹ thuật',
  'Đào tạo sau đại học, bồi dưỡng nhóm nghiên cứu trẻ',
]
const GENERIC_ACHI = [
  'Chủ trì nhiều đề tài cấp Bộ, cấp Nhà nước',
  'Hàng chục công bố ISI/Scopus trong 5 năm gần đây',
  'Hợp tác nghiên cứu với đối tác quốc tế và doanh nghiệp',
]
const GENERIC_MEMBERS = [
  { name: 'PGS.TS. Trần Văn A', role: 'Trưởng nhóm' },
  { name: 'TS. Nguyễn Thị B', role: 'Thành viên chủ chốt' },
  { name: 'TS. Lê Văn C', role: 'Thành viên' },
  { name: 'ThS. Phạm Thị D', role: 'Nghiên cứu viên' },
  { name: 'KS. Hoàng Văn E', role: 'Nghiên cứu viên' },
]

/* ---------- Chi tiết chuyên gia ---------- */
export function ExpertDetailPage() {
  const { id } = useParams()
  const e = getExpert(id) || experts[0]
  return shell({
    title: e.name,
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' }, { label: e.name }],
    hero: <MetaBar items={[
      { icon: 'award', text: e.position },
      { icon: 'building', text: e.faculty },
      { icon: 'mail', text: e.email },
    ]} />,
    sidebar: (
      <>
        <Panel title="Liên hệ" icon="phone" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[['Đơn vị', e.faculty], ['Email', e.email], ['Điện thoại', e.phone]]} />
        </Panel>
        <Panel title="Chuyên gia khác" icon="users">
          <NewsMini items={experts.filter((x) => x.id !== e.id).slice(0, 5).map((x) => ({ date: x.faculty, title: x.name, to: `/nghien-cuu/chuyen-gia/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <Panel>
          <StatRow items={[
            { value: String(e.pubs), label: 'Công bố khoa học' },
            { value: String(e.projects), label: 'Đề tài / dự án' },
            { value: String(e.hIndex), label: 'Chỉ số h-index' },
            { value: String(e.fields.length), label: 'Lĩnh vực chuyên môn' },
          ]} />
        </Panel>
        <Panel title="Giới thiệu" icon="user">
          <div className="res-profile">
            <span className="res-profile__photo humg-ph" data-ratio="3-2"><span>Chân dung</span></span>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>
              {e.name} hiện là {e.position.toLowerCase()} tại {e.faculty}, chuyên gia trong các lĩnh vực {e.fields.join(', ')}.
              Ông/Bà đã chủ trì và tham gia nhiều đề tài nghiên cứu các cấp, công bố hàng chục bài báo khoa học trên các tạp chí trong nước và quốc tế,
              đồng thời tham gia hướng dẫn nghiên cứu sinh và học viên cao học.
            </p>
          </div>
        </Panel>
        <Panel title="Lĩnh vực nghiên cứu" icon="target">
          <div className="res-chiprow">{e.fields.map((f) => <span key={f}>{f}</span>)}</div>
        </Panel>
        <Panel title="Quá trình đào tạo" icon="graduation">
          <ul className="res-check">{GENERIC_EDU.map((x, i) => <li key={i}><Icon name="check" size={14} /> {x}</li>)}</ul>
        </Panel>
        <Panel title="Công bố tiêu biểu" icon="newspaper">
          <ul className="res-list">
            {publications.slice(0, 3).map((p) => (
              <Link key={p.id} to={`/nghien-cuu/cong-bo/${p.id}`} className="res-item">
                <span className="res-item__body"><strong>{p.title}</strong><em>{p.journal} · {p.year}</em></span>
                {p.quartile !== '—' && <span className="res-q">{p.quartile}</span>}
              </Link>
            ))}
          </ul>
        </Panel>
      </>
    ),
  })
}

/* ---------- Chi tiết nhóm nghiên cứu ---------- */
export function ResearchGroupDetailPage() {
  const { id } = useParams()
  const g = getGroup(id) || researchGroups[0]
  return shell({
    title: g.name,
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Nhóm nghiên cứu', to: '/nghien-cuu/nhom-nghien-cuu' }, { label: g.name }],
    hero: <MetaBar items={[
      { icon: 'user', text: `Trưởng nhóm: ${g.leader}` },
      { icon: 'users', text: `${g.members} thành viên` },
      { icon: 'calendar', text: `Thành lập ${g.established}` },
    ]} />,
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
          { label: 'Đề tài / Dự án', to: '/nghien-cuu/de-tai' },
          { label: 'Công bố khoa học', to: '/nghien-cuu/cong-bo' },
        ]} />
        <Panel title="Nhóm khác" icon="target">
          <NewsMini items={researchGroups.filter((x) => x.id !== g.id).slice(0, 4).map((x) => ({ date: x.field, title: x.name, to: `/nghien-cuu/nhom-nghien-cuu/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <Panel title="Giới thiệu" icon="target">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{g.focus} Nhóm thuộc lĩnh vực <strong>{g.field}</strong>, do {g.leader} làm trưởng nhóm, được thành lập năm {g.established}.</p>
        </Panel>
        <Panel title="Hướng nghiên cứu trọng tâm" icon="layers">
          <ul className="res-check">{GENERIC_FOCUS.map((x, i) => <li key={i}><Icon name="check" size={14} /> {x}</li>)}</ul>
        </Panel>
        <Panel title="Thành viên" icon="users">
          <div className="res-members">
            {GENERIC_MEMBERS.map((m) => (
              <div key={m.name} className="res-member">
                <span className="res-member__ic"><Icon name="user" size={15} /></span>
                <span><strong>{m.name}</strong><em>{m.role}</em></span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Thành tựu tiêu biểu" icon="award">
          <ul className="res-check">{GENERIC_ACHI.map((x, i) => <li key={i}><Icon name="award" size={14} /> {x}</li>)}</ul>
        </Panel>
      </>
    ),
  })
}

/* ---------- Chi tiết hội nghị / hội thảo ---------- */
export function ConferenceDetailPage() {
  const { slug } = useParams()
  const c = getConference(slug) || conferences[0]
  return shell({
    title: c.name,
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Hội nghị / Hội thảo', to: '/nghien-cuu/hoi-nghi-hoi-thao' }, { label: c.name }],
    hero: (
      <div className="res-confhead">
        <MetaBar items={[
          { icon: 'calendar', text: c.date },
          { icon: 'clock', text: c.time },
          { icon: 'map-pin', text: c.place },
        ]} />
        {c.status === 'Sắp diễn ra' && <Link to="/lien-he" className="humg-btn humg-btn--accent">Đăng ký tham dự <Icon name="arrow-right" size={15} /></Link>}
      </div>
    ),
    sidebar: (
      <>
        <Panel title="Thông tin" icon="grid" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[
            ['Phạm vi', c.scope],
            ['Đơn vị tổ chức', c.organizer],
            ['Thời gian', `${c.date} · ${c.time}`],
            ['Địa điểm', c.place],
            ['Trạng thái', c.status],
          ]} />
        </Panel>
        <Panel title="Sự kiện khác" icon="calendar">
          <NewsMini items={conferences.filter((x) => x.slug !== c.slug).slice(0, 4).map((x) => ({ date: x.date, title: x.name, to: `/nghien-cuu/hoi-nghi-hoi-thao/${x.slug}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <div className="humg-ph res-cover" data-ratio="16-9"><span>Ảnh sự kiện · {c.name}</span></div>
        <Panel title="Giới thiệu" icon="calendar">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>
            {c.name} là {c.scope === 'Quốc tế' ? 'hội thảo khoa học quốc tế' : 'sự kiện khoa học trong nước'} do {c.organizer} tổ chức,
            là diễn đàn để các nhà khoa học, chuyên gia và doanh nghiệp trao đổi kết quả nghiên cứu, thúc đẩy hợp tác và chuyển giao công nghệ.
          </p>
        </Panel>
        <Panel title="Các chủ đề chính" icon="target">
          <ul className="res-check">
            {['Xu hướng nghiên cứu mới trong lĩnh vực', 'Ứng dụng công nghệ số, AI và dữ liệu lớn', 'Phát triển bền vững và chuyển đổi xanh', 'Hợp tác nghiên cứu – đào tạo – doanh nghiệp'].map((t, i) => (
              <li key={i}><Icon name="check" size={14} /> {t}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="Chương trình dự kiến" icon="clock">
          <ul className="res-agenda">
            {[
              { time: '08:00', item: 'Đón tiếp đại biểu & khai mạc' },
              { time: '09:00', item: 'Báo cáo phiên toàn thể' },
              { time: '10:30', item: 'Các phiên chuyên đề song song' },
              { time: '13:30', item: 'Phiên poster & triển lãm' },
              { time: '15:30', item: 'Thảo luận bàn tròn & bế mạc' },
            ].map((a, i) => (
              <li key={i}><span className="res-agenda__time">{a.time}</span><span>{a.item}</span></li>
            ))}
          </ul>
        </Panel>
      </>
    ),
  })
}

/* ---------- Chi tiết phòng thí nghiệm ---------- */
export function LabDetailPage() {
  const { id } = useParams()
  const l = getLab(id) || labs[0]
  return shell({
    title: l.name,
    crumbs: [{ label: 'Nghiên cứu', to: '/nghien-cuu' }, { label: 'Phòng thí nghiệm', to: '/nghien-cuu/phong-thi-nghiem' }, { label: l.name }],
    hero: <MetaBar items={[
      { icon: 'building', text: l.faculty },
      { icon: 'user', text: `Phụ trách: ${l.head}` },
    ]} />,
    sidebar: (
      <>
        <SupportCard title="Đăng ký sử dụng dịch vụ" lead={`Liên hệ ${l.faculty} hoặc Phòng KHCN.`} phone="024.3838.3829" email="khcn@humg.edu.vn" cta={{ label: 'Gửi yêu cầu', to: '/lien-he' }} />
        <Panel title="Phòng thí nghiệm khác" icon="grid">
          <NewsMini items={labs.filter((x) => x.id !== l.id).slice(0, 4).map((x) => ({ date: x.faculty, title: x.name, to: `/nghien-cuu/phong-thi-nghiem/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <div className="humg-ph res-cover" data-ratio="16-9"><span>Ảnh phòng thí nghiệm · {l.name}</span></div>
        <Panel title="Giới thiệu" icon="grid">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{l.desc}</p>
        </Panel>
        <Panel title="Thiết bị chính" icon="layers">
          <ul className="res-check">{l.equipment.map((x) => <li key={x}><Icon name="check" size={14} /> {x}</li>)}</ul>
        </Panel>
        <Panel title="Dịch vụ cung cấp" icon="handshake">
          <ul className="res-check">{l.services.map((x) => <li key={x}><Icon name="check" size={14} /> {x}</li>)}</ul>
        </Panel>
        <Panel title="Năng lực & tiêu chuẩn" icon="award">
          <ul className="res-check">
            {['Đội ngũ cán bộ được đào tạo bài bản, có kinh nghiệm', 'Quy trình thí nghiệm theo tiêu chuẩn hiện hành', 'Phục vụ đào tạo, nghiên cứu và dịch vụ cho doanh nghiệp'].map((t, i) => (
              <li key={i}><Icon name="check" size={14} /> {t}</li>
            ))}
          </ul>
        </Panel>
      </>
    ),
  })
}
