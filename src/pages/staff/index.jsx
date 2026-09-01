import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, FilterBar,
  DocList, LinkList, SupportCard, NewsMini, HeroSearch, Pagination,
} from '../../components/ui/page.jsx'
import {
  staffNav, staffQuickLinks, staffHub,
  stfTeaching, stfResearch, stfRegulations, stfForms, stfUtilities, stfPortal, staffDirectory,
} from '../../data/staff.js'
import './staff.css'

const fileType = (meta) => (meta.match(/DOCX|XLSX|PDF|PPTX|ZIP/i) || ['Khác'])[0].toUpperCase()
const yearOf = (d) => d.slice(-4)
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')

const NAV = <SectionNav title="Giảng viên / Cán bộ" items={staffNav} />
const shell = (props) => <PageShell eyebrow="Cổng Giảng viên / Cán bộ" sectionNav={NAV} variant="staff" {...props} />

const QUICKLINKS = <LinkList title="Liên kết nhanh" items={staffQuickLinks} />
const SUPPORT = (
  <SupportCard
    title="Phòng Tổ chức – Hành chính"
    lead="Hỗ trợ giảng viên, cán bộ về nhân sự, chế độ và thủ tục hành chính."
    phone="024.3838.3801"
    email="tccb@humg.edu.vn"
    cta={{ label: 'Gửi yêu cầu hỗ trợ', to: '/lien-he' }}
  />
)

/* ======================= PG-STAFF-01 — THÔNG TIN DÀNH CHO CÁN BỘ (HUB) ======================= */
export function StaffGatewayPage() {
  return shell({
    title: 'Cổng Giảng viên / Cán bộ',
    lead: 'Lối vào nhanh các hệ thống dùng chung và thông tin điều hành. Đăng nhập My eUni để xem lịch giảng dạy, hồ sơ và nhiệm vụ cá nhân.',
    crumbs: [{ label: 'Giảng viên / Cán bộ' }],
    sidebar: (
      <>
        <Panel
          title="Thông báo"
          icon="bell"
          action={<Link to="/tin-tuc" className="humg-link-more">Tất cả <Icon name="arrow-right" size={13} /></Link>}
        >
          <ul className="stf-notice">
            {staffHub.notices.slice(0, 4).map((n) => (
              <li key={n.title}>
                <span className="stf-notice__date">{n.date}</span>
                <Link to="/tin-tuc">{n.title}</Link>
              </li>
            ))}
          </ul>
        </Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Truy cập nhanh" icon="grid"><TileGrid items={staffHub.quickTools} cols={3} /></Panel>

        <Panel
          title={`Mốc thời gian năm học · ${staffHub.keyDates.year}`}
          icon="calendar"
          action={<Link to="/hoc-tap/lich-hoc?vaitro=giang-vien" className="humg-link-more">Kế hoạch đầy đủ <Icon name="arrow-right" size={13} /></Link>}
        >
          <DataTable columns={['Nội dung', 'Thời gian']} rows={staffHub.keyDates.rows.map((r) => [r[0], r[1]])} />
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.2 — GIẢNG DẠY & ĐÀO TẠO ======================= */
export function StfTeachingPage() {
  const [term, setTerm] = useState(stfTeaching.terms[0])
  const [group, setGroup] = useState('Tất cả')
  const [q, setQ] = useState('')
  const reset = () => { setTerm(stfTeaching.terms[0]); setGroup('Tất cả'); setQ('') }
  const rows = useMemo(() => stfTeaching.schedule.filter((s) =>
    s.term === term
    && (group === 'Tất cả' || s.group === group)
    && (!q || norm(`${s.course} ${s.group} ${s.room}`).includes(norm(q)))), [term, group, q])
  return shell({
    title: 'Giảng dạy & Đào tạo',
    lead: stfTeaching.intro,
    crumbs: [{ label: 'Giảng viên / Cán bộ', to: '/giang-vien' }, { label: 'Giảng dạy & Đào tạo' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={stfTeaching.quickLinks} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel
          title="Lịch giảng dạy theo lớp học phần"
          icon="calendar"
          action={<Link to="/hoc-tap/lich-hoc?vaitro=giang-vien" className="humg-link-more">Công cụ tra cứu đầy đủ <Icon name="arrow-right" size={14} /></Link>}
        >
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo học phần, lớp, phòng…"
            selects={[
              { label: 'Học kỳ', value: term, onChange: setTerm, options: stfTeaching.terms },
              { label: 'Lớp học phần', value: group, onChange: setGroup, options: stfTeaching.groups },
            ]}
            count={rows.length} total={stfTeaching.schedule.filter((s) => s.term === term).length} onReset={reset}
          />
          <DataTable
            columns={['Thứ', 'Tiết', 'Học phần', 'TC', 'Lớp học phần', 'Phòng', 'Tuần']}
            rows={rows.map((s) => [s.day, s.period, s.course, String(s.credits), s.group, s.room, s.weeks])}
          />
          {rows.length === 0 && <p className="stf-muted">Không có lịch phù hợp bộ lọc.</p>}
          <p className="stf-note" style={{ marginTop: 12 }}>
            <Icon name="calendar" size={13} /> Lịch giảng dạy cá nhân, thay đổi phòng và lịch coi thi được cập nhật trên My eUni Giảng viên.
          </p>
        </Panel>
        <Panel title="Nội dung & quy định giảng dạy" icon="book"><TileGrid items={stfTeaching.resources} cols={3} /></Panel>
      </>
    ),
  })
}

/* ======================= 1.3 — NGHIÊN CỨU KHOA HỌC ======================= */
export function StfResearchPage() {
  return shell({
    title: 'Nghiên cứu khoa học',
    lead: stfResearch.intro,
    crumbs: [{ label: 'Giảng viên / Cán bộ', to: '/giang-vien' }, { label: 'Nghiên cứu khoa học' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Hoạt động nghiên cứu" icon="flask"><TileGrid items={stfResearch.tiles} cols={3} /></Panel>
        <Panel
          title="Tin tức nghiên cứu"
          icon="newspaper"
          action={<Link to="/nghien-cuu" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <NewsMini items={stfResearch.news.map((n) => ({ ...n, to: '/tin-tuc' }))} />
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.4 — QUY ĐỊNH – QUY CHẾ ======================= */
export function StfRegulationsPage() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('Tất cả')
  const [year, setYear] = useState('Tất cả')
  const [sort, setSort] = useState('Mới nhất')
  const years = ['Tất cả', ...Array.from(new Set(stfRegulations.docs.map((d) => yearOf(d.date)))).sort().reverse()]
  const reset = () => { setQ(''); setType('Tất cả'); setYear('Tất cả'); setSort('Mới nhất') }
  const list = useMemo(() => {
    let r = stfRegulations.docs.filter((d) =>
      (type === 'Tất cả' || d.type === type)
      && (year === 'Tất cả' || yearOf(d.date) === year)
      && (!q || norm(d.title).includes(norm(q))))
    const toTs = (d) => Number(d.date.split('/').reverse().join(''))
    if (sort === 'Mới nhất') r = [...r].sort((a, b) => toTs(b) - toTs(a))
    else if (sort === 'Cũ nhất') r = [...r].sort((a, b) => toTs(a) - toTs(b))
    else r = [...r].sort((a, b) => a.title.localeCompare(b.title, 'vi'))
    return r
  }, [q, type, year, sort])
  return shell({
    title: 'Quy định – Quy chế',
    lead: stfRegulations.intro,
    crumbs: [{ label: 'Giảng viên / Cán bộ', to: '/giang-vien' }, { label: 'Quy định – Quy chế' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Văn bản quy định – quy chế" icon="shield">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo tiêu đề văn bản…"
          selects={[
            { label: 'Loại văn bản', value: type, onChange: setType, options: stfRegulations.categories },
            { label: 'Năm ban hành', value: year, onChange: setYear, options: years },
          ]}
          sort={sort} onSort={setSort} sortOptions={['Mới nhất', 'Cũ nhất', 'Tên A → Z']}
          count={list.length} total={stfRegulations.docs.length} onReset={reset}
        />
        <DataTable
          columns={['Tiêu đề', 'Loại văn bản', 'Ngày ban hành', 'File']}
          rows={list.map((d) => [
            d.title,
            <span key="t" className="stf-tag">{d.type}</span>,
            d.date,
            <a key="f" href="#" className="stf-dl" aria-label={`Tải ${d.title}`}><Icon name="download" size={15} /> PDF</a>,
          ])}
        />
        {list.length === 0 && <p className="stf-muted">Không tìm thấy văn bản phù hợp.</p>}
      </Panel>
    ),
  })
}

/* ======================= 1.5 — BIỂU MẪU CHUNG ======================= */
export function StfFormsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Tất cả')
  const [ft, setFt] = useState('Tất cả')
  const [sort, setSort] = useState('Liên quan')
  const fileTypes = ['Tất cả', ...Array.from(new Set(stfForms.list.map((f) => fileType(f.meta)))).sort()]
  const reset = () => { setQ(''); setCat('Tất cả'); setFt('Tất cả'); setSort('Liên quan') }
  const list = useMemo(() => {
    let r = stfForms.list.filter((f) =>
      (cat === 'Tất cả' || f.category === cat)
      && (ft === 'Tất cả' || fileType(f.meta) === ft)
      && (!q || norm(f.name).includes(norm(q)) || norm(f.desc).includes(norm(q))))
    if (sort === 'Tên A → Z') r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    return r
  }, [q, cat, ft, sort])
  return shell({
    title: 'Biểu mẫu chung',
    lead: stfForms.intro,
    crumbs: [{ label: 'Giảng viên / Cán bộ', to: '/giang-vien' }, { label: 'Biểu mẫu chung' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Danh mục biểu mẫu" icon="layers">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên hoặc mô tả biểu mẫu…"
          selects={[
            { label: 'Nhóm biểu mẫu', value: cat, onChange: setCat, options: stfForms.categories },
            { label: 'Định dạng', value: ft, onChange: setFt, options: fileTypes },
          ]}
          sort={sort} onSort={setSort} sortOptions={['Liên quan', 'Tên A → Z']}
          count={list.length} total={stfForms.list.length} onReset={reset}
        />
        <DataTable
          columns={['Biểu mẫu', 'Mô tả', 'Tải về']}
          rows={list.map((f) => [
            f.name,
            <span key="d" className="stf-muted">{f.desc}</span>,
            <a key="dl" href="#" className="stf-dl" aria-label={`Tải ${f.name}`}><Icon name="download" size={15} /> {f.meta}</a>,
          ])}
        />
        {list.length === 0 && <p className="stf-muted">Không tìm thấy biểu mẫu phù hợp.</p>}
      </Panel>
    ),
  })
}

/* ======================= DANH BẠ ĐƠN VỊ & PHÒNG HỌP ======================= */
export function StaffDirectoryPage() {
  const [uq, setUq] = useState('')
  const units = useMemo(
    () => staffDirectory.units.filter((u) => !uq || norm(`${u.unit} ${u.head}`).includes(norm(uq))),
    [uq],
  )
  return shell({
    title: 'Danh bạ đơn vị & Phòng họp',
    lead: 'Tra cứu số máy, hộp thư của các đơn vị trong Trường và đăng ký sử dụng phòng họp.',
    crumbs: [{ label: 'Giảng viên / Cán bộ', to: '/giang-vien' }, { label: 'Danh bạ đơn vị & Phòng họp' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Danh bạ đơn vị" icon="users">
          <FilterBar
            search={uq} onSearch={setUq} searchPlaceholder="Tìm theo tên đơn vị hoặc người phụ trách…"
            count={units.length} total={staffDirectory.units.length} onReset={() => setUq('')}
          />
          <DataTable
            columns={['Đơn vị', 'Người phụ trách', 'Số máy', 'Hộp thư']}
            rows={units.map((u) => [u.unit, u.head, u.phone, u.email])}
          />
          {units.length === 0 && <p className="stf-muted">Không tìm thấy đơn vị phù hợp.</p>}
        </Panel>
        <Panel title="Phòng họp" icon="building">
          <DataTable
            columns={['Phòng', 'Vị trí', 'Sức chứa', 'Thiết bị', 'Trạng thái']}
            rows={staffDirectory.rooms.map((r) => [
              r.name, r.location, `${r.capacity} chỗ`, r.equipment,
              <span key="s" className={`stf-tag ${r.free ? '' : 'is-busy'}`}>{r.status}</span>,
            ])}
          />
          <p className="stf-muted">Đăng ký sử dụng phòng họp qua My eUni hoặc liên hệ Phòng Hành chính – Tổng hợp (máy lẻ 101).</p>
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.6 — TIỆN ÍCH CÁN BỘ ======================= */
export function StfUtilitiesPage() {
  return shell({
    title: 'Tiện ích cán bộ',
    lead: stfUtilities.intro,
    crumbs: [{ label: 'Giảng viên / Cán bộ', to: '/giang-vien' }, { label: 'Tiện ích cán bộ' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Tiện ích nội bộ" icon="grid"><TileGrid items={stfUtilities.tiles} cols={3} /></Panel>
        <Panel title="Liên kết ngoài" icon="external">
          <div className="stf-extlinks">
            {stfUtilities.external.map((l) => (
              <a key={l.label} href={l.href} className="stf-extlink" target="_blank" rel="noreferrer">
                <Icon name="external" size={13} /> {l.label}
              </a>
            ))}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.7 — MY eUNI GIẢNG VIÊN ======================= */
export function StfPortalPage() {
  return shell({
    title: 'My eUni Giảng viên',
    lead: stfPortal.intro,
    crumbs: [{ label: 'Giảng viên / Cán bộ', to: '/giang-vien' }, { label: 'My eUni Giảng viên' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <div className="stf-portal">
        <div className="stf-portal__art"><Icon name="user" size={40} /></div>
        <div className="stf-portal__body">
          <h2>Đăng nhập cổng eUni Giảng viên</h2>
          <ul className="stf-check">
            {stfPortal.benefits.map((b, i) => <li key={i}><Icon name="check" size={14} /> {b}</li>)}
          </ul>
          <div className="stf-portal__actions">
            <Link to={stfPortal.loginTo} className="humg-btn humg-btn--primary">Đăng nhập ngay <Icon name="arrow-right" size={15} /></Link>
            <Link to={stfPortal.guideTo} className="humg-btn humg-btn--ghost">Xem hướng dẫn</Link>
          </div>
        </div>
      </div>
    ),
  })
}
