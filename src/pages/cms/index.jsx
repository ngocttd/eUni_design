import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import { Panel, DataTable, FilterBar, Pagination } from '../../components/ui/page.jsx'
import '../portal-student/portal-student.css'
import './cms.css'
import {
  cmsUser, cmsDashboard, cmsPosts, cmsPostTotal, cmsPostCategories, cmsPostStatuses,
  cmsEditorTabs, cmsEditorDefaults, cmsCategories, cmsMediaTabs, cmsMediaCategories,
  cmsMedia, cmsMediaTotal, cmsPageTree, cmsPageDefaults, cmsMenus, cmsMenuGroups,
  cmsUsers, cmsUserTotal, cmsUserRoles, cmsUserStatuses, cmsRoles, cmsPermissionMatrix,
  cmsSettingsSections, cmsSettings, cmsActivity, cmsLogTotal, cmsLogActions, cmsLogUsers,
  cmsBackups, cmsBackupInfo, cmsBanners, cmsBannerPositions, cmsContentShortcuts,
} from '../../data/cms.js'

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')

/* ============================ Helpers ============================ */
function Head({ title, sub, right }) {
  return (
    <div className="ps-head">
      <div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      {right && <div className="ps-head__right">{right}</div>}
    </div>
  )
}

function Tag({ v }) {
  const s = norm(v)
  const cls = /da xuat ban|hien thi|hoat dong|thanh cong/.test(s) ? 'is-done'
    : /ban nhap/.test(s) ? 'is-draft'
    : /cho duyet/.test(s) ? 'is-wait'
    : 'is-off'
  return <span className={`cms-tag ${cls}`}>{v}</span>
}

function RowActions({ editTo, onEdit }) {
  return (
    <span className="cms-rowact">
      {editTo
        ? <Link to={editTo} className="cms-rowbtn"><Icon name="file" size={13} /> Sửa</Link>
        : <button type="button" className="cms-rowbtn" onClick={onEdit}><Icon name="file" size={13} /> Sửa</button>}
      <button type="button" className="cms-rowbtn is-danger"><Icon name="x" size={13} /> Xóa</button>
    </span>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="cms-switch">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="cms-switch__track" aria-hidden="true"><span className="cms-switch__dot" /></span>
      {label && <span className="cms-switch__label">{label}</span>}
    </label>
  )
}

const DONUT_COLORS = ['#0a3d91', '#1976d2', '#f59e0b', '#94a3b8']
function Donut({ total, parts }) {
  let acc = 0
  const stops = parts.map((p, i) => {
    const from = (acc / total) * 100
    acc += p.value
    const to = (acc / total) * 100
    return `${DONUT_COLORS[i % DONUT_COLORS.length]} ${from}% ${to}%`
  }).join(', ')
  return (
    <div className="cms-donut">
      <span className="cms-donut__ring" style={{ background: `conic-gradient(${stops})` }}>
        <span className="cms-donut__hole"><strong>{total}</strong><em>Tổng</em></span>
      </span>
      <ul className="cms-legend">
        {parts.map((p, i) => (
          <li key={p.label}>
            <span className="cms-legend__dot" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
            {p.label} · <strong>{p.value}</strong> ({p.pct}%)
          </li>
        ))}
      </ul>
    </div>
  )
}

function Spark({ data }) {
  const max = Math.max(...data.flatMap((d) => [d.published, d.draft]))
  return (
    <div className="cms-spark">
      <div className="cms-spark__plot">
        {data.map((d) => (
          <div key={d.day} className="cms-spark__group">
            <span className="cms-spark__bar is-pub" style={{ height: `${(d.published / max) * 100}%` }} title={`Đã xuất bản: ${d.published}`} />
            <span className="cms-spark__bar is-draft" style={{ height: `${(d.draft / max) * 100}%` }} title={`Bản nháp: ${d.draft}`} />
            <em>{d.day}</em>
          </div>
        ))}
      </div>
      <div className="cms-spark__legend">
        <span><i className="is-pub" /> Đã xuất bản</span>
        <span><i className="is-draft" /> Bản nháp</span>
      </div>
    </div>
  )
}

const PAGE_SIZE = 8

/* ============================ CMS-01 · Tổng quan ============================ */
export function CmsDashboard() {
  const d = cmsDashboard
  return (
    <>
      <Head title={`Xin chào, ${cmsUser.name}!`} sub="Đây là tổng quan hoạt động của hệ thống CMS HUMG." right={
        <span className="cms-clock"><Icon name="clock" size={14} /> Thứ Sáu, 16/05/2025 · 10:30</span>
      } />

      <div className="cms-stats">
        {d.stats.map((s) => (
          <div key={s.label} className="cms-stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
            <em>{s.delta}</em>
          </div>
        ))}
      </div>

      <div className="ps-grid2">
        <Panel title="Thống kê bài viết (30 ngày)" icon="grid"><Spark data={d.trend} /></Panel>
        <Panel title="Bài viết theo trạng thái" icon="newspaper"><Donut total={d.status.total} parts={d.status.parts} /></Panel>
      </div>

      <div className="cms-quad">
        <Panel title="Bài viết mới nhất" icon="newspaper" action={<Link to="/cms/bai-viet" className="humg-link-more">Xem danh sách <Icon name="external" size={12} /></Link>}>
          <ul className="cms-mini">{d.latestPosts.map((p) => <li key={p.title}><p>{p.title}</p><span>{p.meta}</span></li>)}</ul>
        </Panel>
        <Panel title="Sự kiện sắp diễn ra" icon="calendar" action={<Link to="/cms/su-kien" className="humg-link-more">Xem danh sách <Icon name="external" size={12} /></Link>}>
          <ul className="cms-mini">{d.upcomingEvents.map((p) => <li key={p.title}><p>{p.title}</p><span>{p.meta}</span></li>)}</ul>
        </Panel>
        <Panel title="Media mới" icon="image" action={<Link to="/cms/media" className="humg-link-more">Xem thư viện <Icon name="external" size={12} /></Link>}>
          <ul className="cms-mini">{d.latestMedia.map((p) => <li key={p.title}><p>{p.title}</p><span>{p.meta}</span></li>)}</ul>
        </Panel>
        <Panel title="Người dùng online" icon="users">
          <div className="cms-online"><strong>{d.onlineUsers}</strong><span>người đang truy cập CMS</span></div>
        </Panel>
      </div>
    </>
  )
}

/* ============================ CMS-02 · Quản lý bài viết ============================ */
export function CmsPosts({ preset }) {
  const meta = preset ? cmsContentShortcuts[preset] : null
  const [q, setQ] = useState('')
  const [cat, setCat] = useState(meta ? meta.category : 'Tất cả danh mục')
  const [status, setStatus] = useState('Tất cả trạng thái')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => cmsPosts.filter((p) => {
    if (cat !== 'Tất cả danh mục' && p.category !== cat) return false
    if (status !== 'Tất cả trạng thái' && p.status !== status) return false
    if (q && !norm(`${p.title} ${p.author}`).includes(norm(q))) return false
    return true
  }), [q, cat, status])

  const totalLabel = meta ? filtered.length : cmsPostTotal
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <Head
        title={meta ? `Bài viết · ${meta.title}` : 'Quản lý bài viết'}
        sub={meta ? `Lối tắt lọc nhanh theo chuyên mục ${meta.title}` : 'Tạo, biên tập và xuất bản nội dung trên cổng thông tin'}
        right={<Link to="/cms/bai-viet/moi" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="file" size={13} /> Thêm bài viết</Link>}
      />
      <Panel flush>
        <FilterBar
          search={q}
          onSearch={(v) => { setQ(v); setPage(1) }}
          searchPlaceholder="Tìm kiếm tiêu đề, tác giả…"
          selects={[
            ...(meta ? [] : [{ label: 'Danh mục', value: cat, onChange: (v) => { setCat(v); setPage(1) }, options: cmsPostCategories }]),
            { label: 'Trạng thái', value: status, onChange: (v) => { setStatus(v); setPage(1) }, options: cmsPostStatuses },
          ]}
          count={pageRows.length}
          total={totalLabel}
          onReset={() => { setQ(''); if (!meta) setCat('Tất cả danh mục'); setStatus('Tất cả trạng thái'); setPage(1) }}
        />
        <DataTable
          columns={['#', 'Tiêu đề', 'Danh mục', 'Tác giả', 'Trạng thái', 'Ngày tạo', 'Thao tác']}
          rows={pageRows.map((p, i) => [
            String((page - 1) * PAGE_SIZE + i + 1),
            p.title, p.category, p.author,
            <Tag key="t" v={p.status} />, p.date,
            <RowActions key="a" editTo="/cms/bai-viet/moi" />,
          ])}
        />
        {!pageRows.length && <p className="cms-empty">Không có bài viết nào khớp bộ lọc.</p>}
        <div className="cms-pagefoot">
          <span>Hiển thị {pageRows.length ? (page - 1) * PAGE_SIZE + 1 : 0} – {(page - 1) * PAGE_SIZE + pageRows.length} trong tổng số {totalLabel} bài viết</span>
          <Pagination page={page} total={meta ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 20} />
        </div>
      </Panel>
    </>
  )
}
export const CmsEvents = () => <CmsPosts preset="su-kien" />
export const CmsAdmissions = () => <CmsPosts preset="tuyen-sinh" />
export const CmsResearch = () => <CmsPosts preset="nghien-cuu" />
export const CmsLearning = () => <CmsPosts preset="hoc-tap" />

/* ============================ CMS-03 · Thêm / Chỉnh sửa bài viết ============================ */
export function CmsPostEditor() {
  const d = cmsEditorDefaults
  const [tab, setTab] = useState(cmsEditorTabs[0])
  const [showHome, setShowHome] = useState(d.showHome)
  const [featured, setFeatured] = useState(d.featured)

  return (
    <>
      <Head title="Thêm / Chỉnh sửa bài viết" sub="CMS-03 · Biên tập nội dung" right={
        <Link to="/cms/bai-viet" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="external" size={13} /> Về danh sách</Link>
      } />
      <Panel flush>
        <div className="ps-tabs">
          {cmsEditorTabs.map((t) => (
            <button key={t} type="button" className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="ps-tabbody">
          <div className="cms-editor">
            <div className="cms-editor__main">
              {tab === 'Thông tin chung' && (
                <div className="cms-form">
                  <label>Tiêu đề <span className="cms-req">*</span>
                    <input type="text" defaultValue={d.title} />
                  </label>
                  <div className="cms-form__two">
                    <label>Danh mục <span className="cms-req">*</span>
                      <select defaultValue={d.category}>{d.categories.map((c) => <option key={c}>{c}</option>)}</select>
                    </label>
                    <label>Đường dẫn (Slug) <span className="cms-req">*</span>
                      <input type="text" defaultValue={d.slug} />
                    </label>
                  </div>
                  <label>Tóm tắt (Excerpt)
                    <textarea rows="3" defaultValue={d.excerpt} />
                  </label>
                </div>
              )}
              {tab === 'Nội dung' && (
                <div className="cms-form">
                  <div className="cms-editor__toolbar">
                    {['B', 'I', 'U', 'H2', 'H3', '“ ”', '• List', '1. List', '🔗', '🖼', '⌗ Table'].map((b) => (
                      <button key={b} type="button">{b}</button>
                    ))}
                  </div>
                  <textarea className="cms-editor__rte" rows="14" defaultValue={'Nhập nội dung bài viết ở đây… (trình soạn thảo WYSIWYG)\n\nHội thảo quốc tế về Trắc địa và GIS 2025 quy tụ các chuyên gia đầu ngành trong nước và quốc tế…'} />
                </div>
              )}
              {tab === 'SEO' && (
                <div className="cms-form">
                  <label>Tiêu đề SEO<input type="text" defaultValue={d.seoTitle} /></label>
                  <label>Mô tả SEO (Meta description)<textarea rows="3" defaultValue={d.seoDesc} /></label>
                  <label>Từ khóa<input type="text" defaultValue={d.seoKeywords} /></label>
                  <div className="cms-seopreview">
                    <strong>{d.seoTitle}</strong>
                    <span>https://humg.edu.vn/tin-tuc/{d.slug}</span>
                    <p>{d.seoDesc}</p>
                  </div>
                </div>
              )}
              {tab === 'Hình ảnh & File' && (
                <div className="cms-form">
                  <label>Ảnh đại diện</label>
                  <div className="cms-uploadbox">
                    <span className="humg-ph" data-ratio="16-9"><span>Ảnh đại diện</span></span>
                    <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="image" size={13} /> Chọn ảnh</button>
                  </div>
                  <label>Tệp đính kèm</label>
                  <div className="cms-filelist">
                    <span><Icon name="file" size={14} /> chuong-trinh-hoi-thao.pdf · 820 KB</span>
                    <button type="button" className="cms-rowbtn is-danger"><Icon name="x" size={13} /> Gỡ</button>
                  </div>
                  <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="external" size={13} /> Thêm tệp từ Media thư viện</button>
                </div>
              )}
              {tab === 'Khác' && (
                <div className="cms-form">
                  <div className="cms-form__two">
                    <label>Tác giả hiển thị<input type="text" defaultValue={cmsUser.name} /></label>
                    <label>Nguồn / Trích dẫn<input type="text" placeholder="VD: Phòng Truyền thông" /></label>
                  </div>
                  <label>Thẻ (tags)<input type="text" defaultValue="trắc địa, GIS, hội thảo" /></label>
                  <label className="cms-inline"><input type="checkbox" defaultChecked /> Cho phép bình luận</label>
                </div>
              )}
            </div>

            <aside className="cms-editor__side">
              <div className="cms-side-card">
                <h4>Xuất bản</h4>
                <label>Trạng thái
                  <select defaultValue={d.status}>{['Đã xuất bản', 'Bản nháp', 'Chờ duyệt'].map((s) => <option key={s}>{s}</option>)}</select>
                </label>
                <Toggle checked={showHome} onChange={setShowHome} label="Hiển thị trang chủ" />
                <Toggle checked={featured} onChange={setFeatured} label="Bài viết nổi bật" />
                <label>Thời gian xuất bản<input type="datetime-local" defaultValue={d.publishAt} /></label>
                <label>Thời gian hết hạn<input type="datetime-local" defaultValue={d.expireAt} /></label>
              </div>
              <div className="cms-side-actions">
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--block humg-btn--sm">Lưu bản nháp</button>
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--block humg-btn--sm"><Icon name="eye" size={13} /> Xem trước</button>
                <button type="button" className="humg-btn humg-btn--primary humg-btn--block">Cập nhật</button>
              </div>
            </aside>
          </div>
        </div>
      </Panel>
    </>
  )
}

/* ============================ CMS-04 · Quản lý danh mục ============================ */
function catRows(list, depth = 0) {
  return list.flatMap((c) => [
    [
      <span key="n" className="cms-tree__name" style={{ paddingLeft: depth * 22 }}>
        <Icon name={c.children ? 'layers' : 'file'} size={13} /> {c.name}
      </span>,
      String(c.posts),
      <Tag key="t" v={c.status} />,
      <RowActions key="a" />,
    ],
    ...(c.children ? catRows(c.children, depth + 1) : []),
  ])
}
export function CmsCategories() {
  const flat = catRows(cmsCategories)
  return (
    <>
      <Head title="Quản lý danh mục" sub="Cấu trúc chuyên mục nội dung của cổng thông tin" right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="layers" size={13} /> Thêm danh mục</button>
      } />
      <Panel flush>
        <div className="cms-tree">
          <DataTable columns={['Tên danh mục', 'Bài viết', 'Trạng thái', 'Thao tác']} rows={flat} />
        </div>
        <div className="cms-pagefoot"><span>Hiển thị 1 – {flat.length} trong tổng số {flat.length} danh mục</span></div>
      </Panel>
    </>
  )
}

/* ============================ CMS-05 · Media thư viện ============================ */
export function CmsMedia() {
  const [tab, setTab] = useState('Tất cả')
  const [cat, setCat] = useState('Tất cả danh mục')
  const [q, setQ] = useState('')
  const list = useMemo(() => cmsMedia.filter((m) => {
    if (tab !== 'Tất cả' && m.kind !== tab) return false
    if (q && !norm(m.name).includes(norm(q))) return false
    return true
  }), [tab, q])
  return (
    <>
      <Head title="Media thư viện" sub={`${cmsMediaTotal} tệp · hình ảnh, tài liệu, video, âm thanh`} right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="image" size={13} /> Tải lên</button>
      } />
      <Panel flush>
        <div className="ps-tabs">
          {cmsMediaTabs.map((t) => (
            <button key={t} type="button" className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="ps-tabbody">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm kiếm tệp…"
            selects={[{ label: 'Danh mục', value: cat, onChange: setCat, options: cmsMediaCategories }]}
            count={list.length} total={cmsMediaTotal}
            onReset={() => { setQ(''); setCat('Tất cả danh mục') }}
          />
          <div className="cms-media">
            {list.map((m) => (
              <figure key={m.name} className="cms-media__item">
                <span className={`cms-media__thumb is-${m.ext === 'pdf' ? 'pdf' : 'img'}`}>
                  {m.ext === 'pdf' ? <Icon name="file" size={26} /> : <Icon name="image" size={22} />}
                  <em>{m.ext.toUpperCase()}</em>
                </span>
                <figcaption>
                  <strong title={m.name}>{m.name}</strong>
                  <span>{m.date} · {m.size}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          {!list.length && <p className="cms-empty">Không tìm thấy tệp phù hợp.</p>}
          <div className="cms-pagefoot">
            <span>Hiển thị 1 – {list.length} trong tổng số {cmsMediaTotal} tệp</span>
            <Pagination page={1} total={25} />
          </div>
        </div>
      </Panel>
    </>
  )
}

/* ============================ CMS-06 · Quản lý trang & menu ============================ */
function pageTreeItems(list, depth = 0) {
  return list.flatMap((p) => [
    { name: p.name, slug: p.slug, depth },
    ...(p.children ? pageTreeItems(p.children, depth + 1) : []),
  ])
}
export function CmsPagesMenu() {
  const [tab, setTab] = useState('trang')
  const items = pageTreeItems(cmsPageTree)
  const [sel, setSel] = useState('Đơn vị')
  const d = cmsPageDefaults
  const [menuGroup, setMenuGroup] = useState(cmsMenuGroups[0])
  return (
    <>
      <Head title="Quản lý trang & menu" sub="Cấu trúc trang tĩnh và hệ thống menu điều hướng" />
      <Panel flush>
        <div className="ps-tabs">
          <button type="button" className={tab === 'trang' ? 'is-active' : ''} onClick={() => setTab('trang')}>Cây trang</button>
          <button type="button" className={tab === 'menu' ? 'is-active' : ''} onClick={() => setTab('menu')}>Menu</button>
        </div>
        <div className="ps-tabbody">
          {tab === 'trang' && (
            <div className="cms-split">
              <div className="cms-split__tree">
                <div className="cms-split__head">
                  <span>Cây trang</span>
                  <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">+ Thêm trang</button>
                </div>
                <ul className="cms-pagetree">
                  {items.map((p) => (
                    <li key={p.name}>
                      <button
                        type="button"
                        className={sel === p.name ? 'is-active' : ''}
                        style={{ paddingLeft: 10 + p.depth * 18 }}
                        onClick={() => setSel(p.name)}
                      >
                        <Icon name="file" size={13} /> {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <form className="cms-form cms-split__form" onSubmit={(e) => e.preventDefault()}>
                <h4>Thông tin trang</h4>
                <label>Tiêu đề <span className="cms-req">*</span><input type="text" defaultValue={sel} key={sel} /></label>
                <label>Đường dẫn (Slug) <span className="cms-req">*</span><input type="text" defaultValue={d.slug} /></label>
                <label>Trang cha
                  <select defaultValue={d.parent}>{d.parents.map((x) => <option key={x}>{x}</option>)}</select>
                </label>
                <div className="cms-form__two">
                  <label>Giao diện
                    <select defaultValue="Mặc định">{d.templates.map((x) => <option key={x}>{x}</option>)}</select>
                  </label>
                  <label>Thứ tự<input type="number" defaultValue={d.order} /></label>
                </div>
                <div className="cms-form__actions">
                  <button type="submit" className="humg-btn humg-btn--primary humg-btn--sm">Lưu</button>
                  <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Hủy</button>
                </div>
              </form>
            </div>
          )}
          {tab === 'menu' && (
            <>
              <FilterBar
                search="" onSearch={() => {}} searchPlaceholder="Tìm mục menu…"
                selects={[{ label: 'Nhóm menu', value: menuGroup, onChange: setMenuGroup, options: cmsMenuGroups }]}
                count={cmsMenus.length} total={cmsMenus.length}
              />
              <DataTable
                columns={['Thứ tự', 'Nhãn hiển thị', 'Liên kết', 'Kiểu', 'Thao tác']}
                rows={cmsMenus.map((m) => [String(m.order), m.label, m.url, m.type, <RowActions key="a" />])}
              />
              <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm" style={{ marginTop: 12 }}>+ Thêm mục menu</button>
            </>
          )}
        </div>
      </Panel>
    </>
  )
}

/* ============================ CMS-07 · Quản lý người dùng ============================ */
export function CmsUsers() {
  const [q, setQ] = useState('')
  const [role, setRole] = useState('Tất cả vai trò')
  const [status, setStatus] = useState('Tất cả trạng thái')
  const list = useMemo(() => cmsUsers.filter((u) => {
    if (role !== 'Tất cả vai trò' && u.role !== role) return false
    if (status !== 'Tất cả trạng thái' && u.status !== status) return false
    if (q && !norm(`${u.name} ${u.email}`).includes(norm(q))) return false
    return true
  }), [q, role, status])
  return (
    <>
      <Head title="Quản lý người dùng" sub={`${cmsUserTotal} tài khoản quản trị / biên tập`} right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="users" size={13} /> Thêm người dùng</button>
      } />
      <Panel flush>
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm kiếm theo tên, email…"
          selects={[
            { label: 'Vai trò', value: role, onChange: setRole, options: cmsUserRoles },
            { label: 'Trạng thái', value: status, onChange: setStatus, options: cmsUserStatuses },
          ]}
          count={list.length} total={cmsUserTotal}
          onReset={() => { setQ(''); setRole('Tất cả vai trò'); setStatus('Tất cả trạng thái') }}
        />
        <DataTable
          columns={['#', 'Họ và tên', 'Email', 'Vai trò', 'Trạng thái', 'Đăng nhập cuối', 'Thao tác']}
          rows={list.map((u, i) => [
            String(i + 1), u.name, u.email, u.role,
            <Tag key="t" v={u.status} />, u.last, <RowActions key="a" />,
          ])}
        />
        {!list.length && <p className="cms-empty">Không có người dùng nào khớp bộ lọc.</p>}
        <div className="cms-pagefoot">
          <span>Hiển thị 1 – {list.length} trong tổng số {cmsUserTotal} người dùng</span>
          <Pagination page={1} total={4} />
        </div>
      </Panel>
    </>
  )
}

/* ============================ CMS-07 · Vai trò & Phân quyền ============================ */
export function CmsRoles() {
  const m = cmsPermissionMatrix
  return (
    <>
      <Head title="Vai trò & Phân quyền" sub="Nhóm quyền và ma trận phân quyền theo chức năng" right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="shield" size={13} /> Thêm vai trò</button>
      } />
      <div className="cms-rolecards">
        {cmsRoles.map((r) => (
          <div key={r.role} className="cms-rolecard">
            <div className="cms-rolecard__top"><strong>{r.role}</strong><span>{r.users} tài khoản</span></div>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
      <Panel title="Ma trận phân quyền" icon="shield" flush>
        <DataTable
          columns={['Chức năng', ...m.roles]}
          rows={m.rows.map((row) => [
            row.module,
            ...row.perms.map((ok, i) => (
              <span key={i} className={`cms-perm ${ok ? 'is-on' : 'is-off'}`}>
                <Icon name={ok ? 'check' : 'x'} size={13} />
              </span>
            )),
          ])}
        />
        <div className="cms-form__actions" style={{ padding: '14px 16px' }}>
          <button type="button" className="humg-btn humg-btn--primary humg-btn--sm">Lưu phân quyền</button>
        </div>
      </Panel>
    </>
  )
}

/* ============================ CMS-08 · Cấu hình hệ thống ============================ */
export function CmsSettings() {
  const [sec, setSec] = useState(cmsSettingsSections[0])
  const g = cmsSettings.general
  const s = cmsSettings.seo
  const e = cmsSettings.email
  return (
    <>
      <Head title="Cấu hình hệ thống" sub="Thiết lập chung, SEO, email, bảo mật và tích hợp" />
      <div className="cms-settings">
        <nav className="cms-settings__nav">
          {cmsSettingsSections.map((x) => (
            <button key={x} type="button" className={sec === x ? 'is-active' : ''} onClick={() => setSec(x)}>{x}</button>
          ))}
        </nav>
        <Panel title={sec} icon="lock">
          <form className="cms-form" onSubmit={(ev) => ev.preventDefault()}>
            {sec === 'Thông tin chung' && (
              <>
                <label>Tên website<input type="text" defaultValue={g.siteName} /></label>
                <div className="cms-form__two">
                  <label>Email liên hệ<input type="email" defaultValue={g.email} /></label>
                  <label>Số điện thoại<input type="text" defaultValue={g.phone} /></label>
                </div>
                <label>Địa chỉ<input type="text" defaultValue={g.address} /></label>
                <div className="cms-form__two">
                  <div>
                    <label>Logo</label>
                    <div className="cms-uploadbox is-sm">
                      <span className="humg-ph" data-ratio="1-1"><span>Logo</span></span>
                      <span className="cms-uploadbox__act">
                        <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Chọn ảnh</button>
                        <button type="button" className="cms-rowbtn is-danger">Xóa</button>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label>Favicon</label>
                    <div className="cms-uploadbox is-sm">
                      <span className="humg-ph" data-ratio="1-1"><span>Favicon</span></span>
                      <span className="cms-uploadbox__act">
                        <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Chọn ảnh</button>
                        <button type="button" className="cms-rowbtn is-danger">Xóa</button>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {sec === 'SEO & Mạng xã hội' && (
              <>
                <label>Meta title mặc định<input type="text" defaultValue={s.metaTitle} /></label>
                <label>Meta description mặc định<textarea rows="3" defaultValue={s.metaDesc} /></label>
                <div className="cms-form__two">
                  <label>Facebook Page<input type="text" defaultValue={s.facebook} /></label>
                  <label>Kênh YouTube<input type="text" defaultValue={s.youtube} /></label>
                </div>
                <label>Google Analytics ID<input type="text" defaultValue={s.analytics} /></label>
              </>
            )}
            {sec === 'Email hệ thống' && (
              <>
                <div className="cms-form__two">
                  <label>SMTP Host<input type="text" defaultValue={e.smtpHost} /></label>
                  <label>SMTP Port<input type="text" defaultValue={e.smtpPort} /></label>
                </div>
                <div className="cms-form__two">
                  <label>Tên người gửi<input type="text" defaultValue={e.fromName} /></label>
                  <label>Email người gửi<input type="email" defaultValue={e.fromEmail} /></label>
                </div>
                <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Gửi email kiểm tra</button>
              </>
            )}
            {sec === 'Bảo mật' && (
              <>
                <label className="cms-inline"><input type="checkbox" defaultChecked /> Bắt buộc xác thực 2 lớp (2FA) với Admin</label>
                <label className="cms-inline"><input type="checkbox" defaultChecked /> Khóa tài khoản sau 5 lần đăng nhập sai</label>
                <label className="cms-inline"><input type="checkbox" /> Chặn truy cập CMS ngoài dải IP nội bộ</label>
                <label>Thời gian hết phiên (phút)<input type="number" defaultValue={30} /></label>
              </>
            )}
            {sec === 'Sao lưu dữ liệu' && (
              <>
                <label>Tần suất sao lưu tự động
                  <select defaultValue="Hằng ngày">{['Hằng ngày', 'Hằng tuần', 'Thủ công'].map((x) => <option key={x}>{x}</option>)}</select>
                </label>
                <label>Giờ chạy<input type="time" defaultValue="03:00" /></label>
                <label>Số bản lưu giữ lại<input type="number" defaultValue={7} /></label>
                <Link to="/cms/sao-luu" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="external" size={13} /> Mở trang Sao lưu & Phục hồi</Link>
              </>
            )}
            {sec === 'Tích hợp dịch vụ' && (
              <>
                <label className="cms-inline"><input type="checkbox" defaultChecked /> SSO Microsoft 365 (Azure AD)</label>
                <label className="cms-inline"><input type="checkbox" defaultChecked /> Thư viện số HUMG (OPAC)</label>
                <label className="cms-inline"><input type="checkbox" /> Cổng thanh toán học phí</label>
                <label>API Key nội bộ<input type="text" defaultValue="humg_live_xxxxxxxxxxxx" /></label>
              </>
            )}
            {sec === 'Lịch trình (Cron)' && (
              <DataTable
                columns={['Tác vụ', 'Lịch chạy', 'Lần chạy gần nhất', 'Trạng thái']}
                rows={[
                  ['Sao lưu CSDL', 'Hằng ngày 03:00', '16/05/2025 03:00', <Tag key="1" v="Thành công" />],
                  ['Dọn file tạm', 'Hằng ngày 04:00', '16/05/2025 04:00', <Tag key="2" v="Thành công" />],
                  ['Gửi bản tin email', 'Thứ 2 hằng tuần 07:00', '12/05/2025 07:00', <Tag key="3" v="Thành công" />],
                  ['Đồng bộ danh bạ đơn vị', 'Hằng ngày 01:00', '16/05/2025 01:00', <Tag key="4" v="Thành công" />],
                ]}
              />
            )}
            {sec === 'Nhật ký hệ thống' && (
              <>
                <p className="ps-muted">Xem nhật ký thao tác chi tiết của người dùng tại trang Nhật ký hoạt động.</p>
                <Link to="/cms/nhat-ky" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="external" size={13} /> Mở Nhật ký hoạt động</Link>
              </>
            )}
            <div className="cms-form__actions">
              <button type="submit" className="humg-btn humg-btn--primary">Lưu cấu hình</button>
            </div>
          </form>
        </Panel>
      </div>
    </>
  )
}

/* ============================ CMS-09 · Nhật ký hoạt động ============================ */
export function CmsActivity() {
  const [q, setQ] = useState('')
  const [action, setAction] = useState('Tất cả hành động')
  const [user, setUser] = useState('Tất cả người dùng')
  const list = useMemo(() => cmsActivity.filter((a) => {
    if (action !== 'Tất cả hành động' && a.action !== action) return false
    if (user !== 'Tất cả người dùng' && a.user !== user) return false
    if (q && !norm(`${a.user} ${a.action} ${a.target} ${a.ip}`).includes(norm(q))) return false
    return true
  }), [q, action, user])
  return (
    <>
      <Head title="Nhật ký hoạt động" sub={`${cmsLogTotal} bản ghi thao tác của người dùng`} />
      <Panel flush>
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo người dùng, đối tượng, IP…"
          selects={[
            { label: 'Hành động', value: action, onChange: setAction, options: cmsLogActions },
            { label: 'Người dùng', value: user, onChange: setUser, options: cmsLogUsers },
          ]}
          count={list.length} total={cmsLogTotal}
          onReset={() => { setQ(''); setAction('Tất cả hành động'); setUser('Tất cả người dùng') }}
        />
        <DataTable
          columns={['Thời gian', 'Người dùng', 'Hành động', 'Đối tượng', 'IP']}
          rows={list.map((a) => [a.time, a.user, <span key="t" className="cms-logaction">{a.action}</span>, a.target, a.ip])}
        />
        {!list.length && <p className="cms-empty">Không có nhật ký nào khớp bộ lọc.</p>}
        <div className="cms-pagefoot">
          <span>Hiển thị 1 – {list.length} trong tổng số {cmsLogTotal} nhật ký</span>
          <Pagination page={1} total={20} />
        </div>
      </Panel>
    </>
  )
}

/* ============================ CMS-10 · Sao lưu & Phục hồi ============================ */
export function CmsBackup() {
  return (
    <>
      <Head title="Sao lưu & Phục hồi" sub="Tạo bản sao lưu toàn bộ dữ liệu và phục hồi khi cần" />
      <div className="ps-grid2">
        <div className="cms-col">
          <Panel title="Sao lưu dữ liệu" icon="download">
            <p className="ps-muted" style={{ marginBottom: 12 }}>
              Tạo bản sao lưu toàn bộ dữ liệu (bài viết, danh mục, người dùng, media, cấu hình).
            </p>
            <button type="button" className="humg-btn humg-btn--primary"><Icon name="download" size={14} /> Tạo sao lưu ngay</button>
          </Panel>
          <Panel title="Lịch sử sao lưu" icon="clock" flush>
            <DataTable
              columns={['Thời gian', 'Dung lượng', 'Người tạo', 'Trạng thái', 'Thao tác']}
              rows={cmsBackups.map((b) => [
                b.time, b.size, b.by, <Tag key="t" v={b.status} />,
                <span key="a" className="cms-rowact">
                  <button type="button" className="cms-rowbtn"><Icon name="download" size={13} /> Tải</button>
                  <button type="button" className="cms-rowbtn is-danger"><Icon name="x" size={13} /> Xóa</button>
                </span>,
              ])}
            />
          </Panel>
        </div>
        <div className="cms-col">
          <Panel title="Phục hồi dữ liệu" icon="rocket">
            <form className="cms-form" onSubmit={(e) => e.preventDefault()}>
              <label>Chọn từ bản sao lưu đã có
                <select>{cmsBackups.map((b) => <option key={b.time}>{b.time} · {b.size}</option>)}</select>
              </label>
              <label>Hoặc tải lên tệp sao lưu
                <input type="file" />
              </label>
              <div className="cms-warn"><Icon name="shield" size={14} /> Việc phục hồi sẽ ghi đè toàn bộ dữ liệu hiện tại. Hãy tạo bản sao lưu mới trước khi thực hiện.</div>
              <button type="submit" className="humg-btn humg-btn--primary">Phục hồi ngay</button>
            </form>
          </Panel>
          <Panel title="Thông tin" icon="bell">
            <ul className="ps-check">
              {cmsBackupInfo.map((t) => <li key={t}><Icon name="check" size={14} /> {t}</li>)}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}

/* ============================ Banner / Slider ============================ */
export function CmsBanners() {
  const [pos, setPos] = useState('Tất cả vị trí')
  const [q, setQ] = useState('')
  const list = useMemo(() => cmsBanners.filter((b) => {
    if (pos !== 'Tất cả vị trí' && b.position !== pos) return false
    if (q && !norm(b.name).includes(norm(q))) return false
    return true
  }), [pos, q])
  return (
    <>
      <Head title="Banner / Slider" sub="Quản lý banner quảng bá trên trang chủ và các vị trí hiển thị" right={
        <button type="button" className="humg-btn humg-btn--primary humg-btn--sm"><Icon name="image" size={13} /> Thêm banner</button>
      } />
      <Panel flush>
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm banner…"
          selects={[{ label: 'Vị trí', value: pos, onChange: setPos, options: cmsBannerPositions }]}
          count={list.length} total={cmsBanners.length}
          onReset={() => { setQ(''); setPos('Tất cả vị trí') }}
        />
        <DataTable
          columns={['Thứ tự', 'Tên banner', 'Vị trí', 'Thời gian hiển thị', 'Trạng thái', 'Thao tác']}
          rows={list.map((b) => [String(b.order), b.name, b.position, b.period, <Tag key="t" v={b.status} />, <RowActions key="a" />])}
        />
        {!list.length && <p className="cms-empty">Không có banner nào khớp bộ lọc.</p>}
      </Panel>
    </>
  )
}
