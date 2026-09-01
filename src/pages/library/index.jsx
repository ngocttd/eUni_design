import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, DataTable, StatRow, Chips, FilterBar, StepList, Faq,
  DocList, LinkList, SupportCard, NewsMini, HeroSearch, MetaBar, Pagination,
} from '../../components/ui/page.jsx'

const lnorm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
import {
  libraryNav, libraryHub, collections, items, getItem,
  resourceTypeFacets, yearFacets, languageFacets, searchLangs, searchFaculties,
  databaseGroups, myItems, libraryGuide,
} from '../../data/library.js'
import './library.css'

const NAV = <SectionNav title="Thư viện" items={libraryNav} />
const shell = (props) => <PageShell eyebrow="Thư viện" sectionNav={NAV} {...props} />

const SUPPORT = (
  <SupportCard
    title="Trung tâm Thông tin – Thư viện"
    lead="Hỗ trợ tra cứu, mượn – trả và khai thác tài nguyên số."
    phone={libraryGuide.contact.phone}
    email={libraryGuide.contact.email}
    cta={{ label: 'Gửi yêu cầu hỗ trợ', to: '/lien-he' }}
  />
)

const TYPE_ICON = { 'Sách': 'book', 'Tạp chí': 'newspaper', 'Luận văn': 'graduation', 'Tài liệu số': 'layers', 'Khác': 'file' }

function CopyState({ copies }) {
  if (!copies) return null
  const cls = copies.available > 0 ? 'is-ok' : 'is-out'
  return (
    <span className={`lib-avail ${cls}`}>
      {copies.available > 0 ? `Còn ${copies.available}/${copies.total} bản` : 'Hết bản in – có thể đặt mượn'}
    </span>
  )
}

/* ======================= TỔNG QUAN THƯ VIỆN (PG-LIB-01) ======================= */
export function LibraryHubPage() {
  const [tab, setTab] = useState('Tất cả')
  return shell({
    title: 'Thư viện HUMG',
    lead: libraryHub.intro,
    crumbs: [{ label: 'Thư viện' }],
    hero: <HeroSearch placeholder="Tìm tài liệu, sách, tạp chí, luận văn…" />,
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={libraryHub.quickLinks} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Tra cứu nhanh" icon="search">
          <Chips
            options={libraryHub.tabs.map((t) => ({ key: t, label: t }))}
            value={tab}
            onChange={setTab}
          />
          <form className="lib-quicksearch" onSubmit={(e) => e.preventDefault()}>
            <Icon name="search" size={16} />
            <input type="search" placeholder={`Nhập từ khóa, tên tài liệu, tác giả, chủ đề… (${tab})`} />
            <Link to="/thu-vien/tim-kiem" className="humg-btn humg-btn--primary">Tìm nâng cao</Link>
          </form>
        </Panel>

        <Panel title="Thư viện trong những con số" icon="award"><StatRow items={libraryHub.stats} /></Panel>

        <Panel
          title="Bộ sưu tập nổi bật"
          icon="layers"
          action={<Link to="/thu-vien/bo-suu-tap" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <div className="lib-collections">
            {collections.slice(0, 6).map((c) => (
              <Link key={c.id} to="/thu-vien/bo-suu-tap" className="lib-collection">
                <span className="lib-collection__ic"><Icon name={c.icon} size={20} /></span>
                <strong>{c.name}</strong>
                <span className="lib-collection__count">{c.count}</span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Thông báo Thư viện"
          icon="bell"
          action={<Link to="/tin-tuc" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <NewsMini items={libraryHub.notices.map((n) => ({ ...n, to: '/tin-tuc' }))} />
        </Panel>
      </>
    ),
  })
}

/* ======================= TÌM TÀI LIỆU & KẾT QUẢ (PG-LIB-01.1) ======================= */
export function LibrarySearchPage() {
  const [params, setParams] = useSearchParams()
  const known = resourceTypeFacets.map((f) => f.key)
  const initial = known.includes(params.get('loai')) ? params.get('loai') : 'Tất cả'
  const [type, setTypeRaw] = useState(initial)
  const setType = (v) => {
    setTypeRaw(v)
    const p = new URLSearchParams(params)
    if (v === 'Tất cả') p.delete('loai'); else p.set('loai', v)
    setParams(p, { replace: true })
  }
  const [view, setView] = useState('list')
  const list = useMemo(
    () => (type === 'Tất cả' ? items : items.filter((it) => it.type === type)),
    [type],
  )
  return shell({
    title: 'Tìm tài liệu',
    lead: 'Tra cứu mục lục trực tuyến (OPAC) và tài nguyên số của Thư viện HUMG.',
    crumbs: [{ label: 'Thư viện', to: '/thu-vien' }, { label: 'Tìm tài liệu' }],
    hero: (
      <div className="lib-searchhero">
        <form className="pg-search" onSubmit={(e) => e.preventDefault()}>
          <Icon name="search" size={18} />
          <input type="search" defaultValue="quản lý tài nguyên nước" aria-label="Từ khóa tìm kiếm" />
          <button type="submit" className="humg-btn humg-btn--primary">Tìm kiếm</button>
        </form>
        <div className="lib-filterbar">
          {[
            ['Loại tài liệu', 'Tất cả'],
            ['Ngôn ngữ', 'Tất cả'],
            ['Năm xuất bản', 'Tất cả'],
            ['Khoa / Viện', 'Tất cả'],
          ].map(([lb, val]) => (
            <label key={lb} className="lib-select">
              <span>{lb}</span>
              <select defaultValue={val}>
                <option>{val}</option>
              </select>
            </label>
          ))}
          <button type="button" className="humg-btn humg-btn--ghost lib-morefilter">
            Thêm bộ lọc <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </div>
    ),
    sidebar: (
      <>
        <Panel title="Thu hẹp kết quả" icon="layers" flush>
          <div className="lib-facet">
            <h4>Loại tài liệu</h4>
            <ul>
              {resourceTypeFacets.map((f) => (
                <li key={f.key}>
                  <button
                    type="button"
                    className={type === f.key ? 'is-active' : ''}
                    onClick={() => setType(f.key)}
                  >
                    <span>{f.label}</span><em>{f.count}</em>
                  </button>
                </li>
              ))}
            </ul>
            <h4>Năm xuất bản</h4>
            <ul>
              {yearFacets.map(([y, n]) => (
                <li key={y}><label className="lib-check"><input type="checkbox" /> <span>{y}</span><em>{n}</em></label></li>
              ))}
            </ul>
            <h4>Ngôn ngữ</h4>
            <ul>
              {languageFacets.map(([l, n]) => (
                <li key={l}><label className="lib-check"><input type="checkbox" /> <span>{l}</span><em>{n}</em></label></li>
              ))}
            </ul>
          </div>
        </Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Kết quả tìm kiếm" icon="search">
        <div className="lib-resulttop">
          <span>Khoảng <strong>1.256</strong> kết quả cho “quản lý tài nguyên nước”</span>
          <div className="lib-resulttop__right">
            <label className="lib-select lib-select--sm">
              <span>Sắp xếp</span>
              <select defaultValue="Liên quan nhất"><option>Liên quan nhất</option><option>Mới nhất</option><option>Cũ nhất</option></select>
            </label>
            <div className="lib-viewtoggle" role="group" aria-label="Kiểu hiển thị">
              <button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label="Danh sách"><Icon name="menu" size={15} /></button>
              <button type="button" className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label="Lưới"><Icon name="grid" size={15} /></button>
            </div>
          </div>
        </div>

        <Chips
          options={resourceTypeFacets.map((f) => ({ key: f.key, label: f.label, count: f.count }))}
          value={type}
          onChange={setType}
        />

        <div className={`lib-results ${view === 'grid' ? 'is-grid' : ''}`}>
          {list.map((it) => (
            <article key={it.id} className="lib-result">
              <Link to={`/thu-vien/tai-lieu/${it.id}`} className="lib-result__cover humg-ph" data-ratio="3-4"><span>Ảnh bìa</span></Link>
              <div className="lib-result__body">
                <span className="lib-result__type"><Icon name={TYPE_ICON[it.type] || 'file'} size={12} /> {it.type}</span>
                <h3><Link to={`/thu-vien/tai-lieu/${it.id}`}>{it.title}</Link></h3>
                <p className="lib-result__meta">{it.authors} · {it.publisher} · {it.year} · {it.idLabel} {it.idValue}</p>
                <div className="lib-result__foot">
                  <CopyState copies={it.copies} />
                  {it.format && <span className="lib-result__fmt"><Icon name="file" size={12} /> {it.format}</span>}
                </div>
                <div className="lib-actions">
                  <Link to={`/thu-vien/tai-lieu/${it.id}`} className="humg-btn humg-btn--ghost humg-btn--sm">Xem chi tiết</Link>
                  {it.online && <Link to={`/thu-vien/tai-lieu/${it.id}`} className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="eye" size={13} /> Đọc online</Link>}
                  {it.copies && <button type="button" className="humg-btn humg-btn--primary humg-btn--sm" disabled={it.copies.available === 0}>{it.copies.available ? 'Mượn sách' : 'Đặt mượn'}</button>}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Pagination page={1} total={63} />
      </Panel>
    ),
  })
}

/* ======================= BỘ SƯU TẬP (PG-LIB-01) ======================= */
export function CollectionsPage() {
  return shell({
    title: 'Bộ sưu tập',
    lead: 'Các nhóm tài liệu được tổ chức theo chủ đề, loại hình và mục đích sử dụng để bạn khám phá nhanh hơn.',
    crumbs: [{ label: 'Thư viện', to: '/thu-vien' }, { label: 'Bộ sưu tập' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={libraryHub.quickLinks} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Tất cả bộ sưu tập" icon="layers">
          <div className="lib-collections lib-collections--lg">
            {collections.map((c) => (
              <Link key={c.id} to="/thu-vien/tim-kiem" className="lib-collection lib-collection--lg">
                <span className="lib-collection__ic"><Icon name={c.icon} size={22} /></span>
                <strong>{c.name}</strong>
                <span className="lib-collection__count">{c.count}</span>
                <span className="lib-collection__desc">{c.desc}</span>
              </Link>
            ))}
          </div>
        </Panel>
        <Panel title="Chủ đề nổi bật" icon="target">
          <div className="lib-topics">
            {['Địa chất', 'Khai thác mỏ', 'Dầu khí', 'Trắc địa – Bản đồ', 'Môi trường', 'Cơ điện mỏ', 'Xây dựng công trình ngầm', 'Công nghệ thông tin', 'Kinh tế – Quản trị', 'Vật liệu'].map((t) => (
              <Link key={t} to="/thu-vien/tim-kiem" className="lib-topic">{t}</Link>
            ))}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= CSDL KHOA HỌC (PG-LIB-01) ======================= */
export function DatabasesPage() {
  const flat = useMemo(
    () => databaseGroups.flatMap((g) => g.items.map((d) => ({ ...d, group: g.group }))),
    [],
  )
  const [q, setQ] = useState('')
  const [grp, setGrp] = useState('Tất cả')
  const [acc, setAcc] = useState('Tất cả')
  const groups = ['Tất cả', ...databaseGroups.map((g) => g.group)]
  const accs = ['Tất cả', ...Array.from(new Set(flat.map((d) => d.access)))]
  const reset = () => { setQ(''); setGrp('Tất cả'); setAcc('Tất cả') }
  const list = useMemo(() => flat.filter((d) =>
    (grp === 'Tất cả' || d.group === grp)
    && (acc === 'Tất cả' || d.access === acc)
    && (!q || lnorm(`${d.name} ${d.desc}`).includes(lnorm(q)))), [flat, q, grp, acc])
  return shell({
    title: 'CSDL khoa học & liên kết',
    lead: 'Danh mục cơ sở dữ liệu khoa học trong nước và quốc tế mà bạn đọc HUMG được quyền khai thác.',
    crumbs: [{ label: 'Thư viện', to: '/thu-vien' }, { label: 'CSDL khoa học' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={libraryHub.quickLinks} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Cơ sở dữ liệu khoa học" icon="library">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên hoặc mô tả CSDL…"
            selects={[
              { label: 'Nhóm', value: grp, onChange: setGrp, options: groups },
              { label: 'Quyền truy cập', value: acc, onChange: setAcc, options: accs },
            ]}
            count={list.length} total={flat.length} onReset={reset}
          />
          <div className="lib-db">
            {list.map((d) => (
              <div key={d.name} className="lib-db__item">
                <span className="lib-db__ic"><Icon name="library" size={16} /></span>
                <div className="lib-db__main">
                  <strong>{d.name}</strong>
                  <p>{d.desc}</p>
                  <span className="lib-db__access"><Icon name="lock" size={11} /> {d.access} · {d.group}</span>
                </div>
                <a href="#" className="humg-btn humg-btn--ghost humg-btn--sm" aria-label={`Truy cập ${d.name}`}>Truy cập <Icon name="external" size={13} /></a>
              </div>
            ))}
          </div>
          {list.length === 0 && <p className="lib-note">Không tìm thấy CSDL phù hợp.</p>}
        </Panel>
        <Panel title="Truy cập từ xa" icon="shield">
          <p className="lib-note">
            <Icon name="shield" size={14} />
            Các CSDL có phí giới hạn theo dải IP của Trường. Khi ở ngoài trường, hãy kết nối VPN HUMG
            hoặc dùng tài khoản truy cập từ xa do Thư viện cấp. Xem “Hướng dẫn truy cập từ xa (VPN)” trong mục Hướng dẫn sử dụng.
          </p>
        </Panel>
      </>
    ),
  })
}

/* ======================= TÀI LIỆU CỦA TÔI (PG-LIB-01.4) ======================= */
export function MyItemsPage() {
  const [tab, setTab] = useState('Đang mượn')
  const counts = {
    'Đang mượn': myItems.borrowing.length,
    'Đặt mượn': myItems.reserved.length,
    'Ưa thích': myItems.favorites.length,
    'Lịch sử tìm kiếm': myItems.history.length,
  }
  return shell({
    title: 'Tài liệu của tôi',
    lead: 'Quản lý tài liệu đang mượn, đặt mượn, danh sách ưa thích và lịch sử tra cứu của bạn.',
    crumbs: [{ label: 'Thư viện', to: '/thu-vien' }, { label: 'Tài liệu của tôi' }],
    sidebar: (
      <>
        <Panel title="Tài khoản thư viện" icon="user" flush>
          <DataTable columns={['Mục', 'Thông tin']} rows={[
            ['Chủ thẻ', 'Nguyễn Văn An'],
            ['Mã thẻ', 'TV-325.3/NG-A'],
            ['Loại bạn đọc', 'Sinh viên'],
            ['Quyền mượn', '05 tài liệu / lần'],
            ['Trạng thái', 'Đang hoạt động'],
          ]} />
        </Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Danh mục của tôi" icon="user">
          <Chips
            options={myItems.tabs.map((t) => ({ key: t, label: t, count: counts[t] }))}
            value={tab}
            onChange={setTab}
          />

          {tab === 'Đang mượn' && (
            <DataTable
              columns={['Tên tài liệu', 'Loại', 'Ngày mượn', 'Hạn trả', 'Trạng thái', 'Thao tác']}
              rows={myItems.borrowing.map((b) => [
                <Link key="t" to={`/thu-vien/tai-lieu/${b.id}`}>{b.name}</Link>,
                b.type, b.borrowed, b.due,
                <span key="s" className={`lib-tag ${b.state === 'warn' ? 'is-warn' : 'is-ok'}`}>{b.status}</span>,
                <button key="a" type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Gia hạn</button>,
              ])}
            />
          )}

          {tab === 'Đặt mượn' && (
            <DataTable
              columns={['Tên tài liệu', 'Loại', 'Ngày đặt', 'Trạng thái', 'Thao tác']}
              rows={myItems.reserved.map((r) => [
                <Link key="t" to={`/thu-vien/tai-lieu/${r.id}`}>{r.name}</Link>,
                r.type, r.reservedOn,
                <span key="s" className="lib-tag is-wait">{r.status}</span>,
                <button key="a" type="button" className="humg-btn humg-btn--ghost humg-btn--sm">Hủy đặt</button>,
              ])}
            />
          )}

          {tab === 'Ưa thích' && (
            <ul className="lib-favlist">
              {myItems.favorites.map((f) => (
                <li key={f.id}>
                  <span className="lib-fav__ic"><Icon name={TYPE_ICON[f.type] || 'file'} size={15} /></span>
                  <Link to={`/thu-vien/tai-lieu/${f.id}`}>{f.name}</Link>
                  <em>{f.type} · {f.year}</em>
                  <button type="button" className="lib-fav__x" aria-label="Bỏ ưa thích"><Icon name="x" size={14} /></button>
                </li>
              ))}
            </ul>
          )}

          {tab === 'Lịch sử tìm kiếm' && (
            <DataTable
              columns={['Từ khóa', 'Thời điểm', 'Số kết quả', 'Thao tác']}
              rows={myItems.history.map((h) => [
                h.q, h.when, h.results.toLocaleString('vi-VN'),
                <Link key="a" to="/thu-vien/tim-kiem" className="humg-link-more">Tìm lại</Link>,
              ])}
            />
          )}
        </Panel>

        <Panel title="Lưu ý" icon="shield">
          <ul className="lib-check">
            {myItems.note.map((n, i) => <li key={i}><Icon name="check" size={14} /> {n}</li>)}
          </ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= HƯỚNG DẪN SỬ DỤNG (PG-LIB-01) ======================= */
export function LibraryGuidePage() {
  return shell({
    title: 'Hướng dẫn sử dụng thư viện',
    lead: libraryGuide.intro,
    crumbs: [{ label: 'Thư viện', to: '/thu-vien' }, { label: 'Hướng dẫn sử dụng' }],
    sidebar: (
      <>
        <Panel title="Giờ mở cửa" icon="clock" flush>
          <DataTable columns={['Thời gian', 'Giờ phục vụ']} rows={libraryGuide.hours} />
        </Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Các bước sử dụng thư viện" icon="layers"><StepList items={libraryGuide.steps} /></Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={libraryGuide.faqs} /></Panel>
        <Panel title="Nội quy thư viện" icon="shield">
          <ul className="lib-check">
            {libraryGuide.rules.map((r, i) => <li key={i}><Icon name="check" size={14} /> {r}</li>)}
          </ul>
        </Panel>
        <Panel title="Tài liệu hướng dẫn" icon="file"><DocList items={libraryGuide.downloads} /></Panel>
      </>
    ),
  })
}

/* ======================= CHI TIẾT TÀI LIỆU (PG-LIB-01.2 / 01.3) ======================= */
export function ItemDetailPage() {
  const { id } = useParams()
  const it = getItem(id) || items[0]
  const isJournal = it.type === 'Tạp chí'
  const baseTabs = isJournal
    ? ['Tóm tắt', 'Thông tin chi tiết', 'Trích dẫn', 'Tài liệu liên quan']
    : ['Mô tả', 'Thông tin chi tiết', ...(it.toc ? ['Mục lục'] : []), 'Tài liệu liên quan']
  const [tab, setTab] = useState(baseTabs[0])
  const related = (it.related || []).map(getItem).filter(Boolean)

  const detailRows = [
    ['Loại tài liệu', it.type],
    ['Tác giả', it.authors],
    ['Nhà xuất bản / Nguồn', it.publisher],
    ['Năm', String(it.year)],
    [it.idLabel, it.idValue],
    ['Số trang', String(it.pages)],
    ['Ngôn ngữ', it.language],
    ['Khoa / Viện', it.faculty],
    it.doi ? ['DOI', it.doi] : null,
    it.format ? ['Định dạng số', it.format] : null,
  ].filter(Boolean)

  return shell({
    title: it.title,
    crumbs: [
      { label: 'Thư viện', to: '/thu-vien' },
      { label: 'Tìm tài liệu', to: '/thu-vien/tim-kiem' },
      { label: 'Chi tiết tài liệu' },
    ],
    hero: <MetaBar items={[
      { icon: TYPE_ICON[it.type] || 'file', text: it.type },
      { icon: 'calendar', text: String(it.year) },
      { icon: 'file', text: `${it.idLabel} ${it.idValue}` },
    ]} />,
    sidebar: (
      <>
        {isJournal ? (
          <Panel title="Thông tin bài báo" icon="grid" flush>
            <DataTable columns={['Mục', 'Chi tiết']} rows={[
              ['Tác giả', it.authors],
              ['Cơ quan', it.org || it.faculty],
              ['Ngôn ngữ', it.language],
              ['Năm xuất bản', String(it.year)],
              ['Số trang', String(it.pages)],
              ['DOI', it.doi || '—'],
            ]} />
          </Panel>
        ) : (
          <Panel title="Thông tin mượn" icon="grid" flush>
            <DataTable columns={['Mục', 'Chi tiết']} rows={[
              ['Vị trí', it.copies?.location || '—'],
              ['Ký hiệu xếp giá', it.copies?.callNumber || '—'],
              ['Tổng số bản', it.copies ? String(it.copies.total) : '—'],
              ['Bản sẵn sàng', it.copies ? String(it.copies.available) : '—'],
            ]} />
          </Panel>
        )}
        <Panel title="Quy định mượn" icon="shield">
          <ul className="lib-check">
            <li><Icon name="check" size={14} /> Thời gian mượn 14 ngày (SV) / 30 ngày (CB–GV).</li>
            <li><Icon name="check" size={14} /> Gia hạn tối đa 02 lần nếu không có người đặt.</li>
            <li><Icon name="check" size={14} /> Phí quá hạn 1.000 đ/ngày/cuốn.</li>
          </ul>
        </Panel>
        {related.length > 0 && (
          <Panel title="Tài liệu liên quan" icon="layers">
            <NewsMini items={related.map((r) => ({ date: r.type, title: r.title, to: `/thu-vien/tai-lieu/${r.id}` }))} />
          </Panel>
        )}
      </>
    ),
    children: (
      <>
        <div className="lib-detailhead">
          <div className="lib-detailhead__cover humg-ph" data-ratio="3-4"><span>Ảnh bìa</span></div>
          <div className="lib-detailhead__body">
            <span className="lib-result__type"><Icon name={TYPE_ICON[it.type] || 'file'} size={12} /> {it.type}</span>
            <h2>{it.title}</h2>
            <p className="lib-detailhead__by">{it.authors}</p>
            <p className="lib-detailhead__pub">{it.publisher} · {it.year} · {it.idLabel} {it.idValue}</p>
            <div className="lib-chiprow">{it.tags.map((t) => <span key={t}>{t}</span>)}</div>
            {!isJournal && <div className="lib-detailhead__avail"><CopyState copies={it.copies} />{it.copies && <span className="lib-muted"> · {it.copies.location}</span>}</div>}
            <div className="lib-actions lib-actions--lg">
              {it.online && <button type="button" className="humg-btn humg-btn--primary"><Icon name="eye" size={15} /> Đọc online{isJournal ? ' (PDF)' : ''}</button>}
              {it.copies && <button type="button" className="humg-btn humg-btn--accent" disabled={it.copies.available === 0}>{it.copies.available ? 'Mượn sách' : 'Đặt mượn'}</button>}
              <button type="button" className="humg-btn humg-btn--ghost"><Icon name="heart" size={14} /> Yêu thích</button>
              <button type="button" className="humg-btn humg-btn--ghost"><Icon name="external" size={14} /> Trích dẫn</button>
            </div>
          </div>
        </div>

        <Panel title="Chi tiết" icon="book">
          <div className="lib-tabs" role="tablist">
            {baseTabs.map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>

          {(tab === 'Mô tả' || tab === 'Tóm tắt') && (
            <p className="lib-prose">{it.abstract}</p>
          )}

          {tab === 'Thông tin chi tiết' && (
            <DataTable columns={['Trường', 'Giá trị']} rows={detailRows} />
          )}

          {tab === 'Mục lục' && it.toc && (
            <ul className="lib-toc">{it.toc.map((c, i) => <li key={i}><Icon name="chevron-right" size={12} /> {c}</li>)}</ul>
          )}

          {tab === 'Trích dẫn' && (
            <div className="lib-cite">
              <h4>APA</h4>
              <p>{it.authors} ({it.year}). <em>{it.title}</em>. {it.publisher}.</p>
              <h4>IEEE</h4>
              <p>{it.authors}, “{it.title},” {it.publisher}, {it.year}.</p>
              <button type="button" className="humg-btn humg-btn--ghost humg-btn--sm"><Icon name="download" size={13} /> Tải tệp .ris (Zotero/EndNote)</button>
            </div>
          )}

          {tab === 'Tài liệu liên quan' && (
            related.length > 0 ? (
              <ul className="lib-favlist">
                {related.map((r) => (
                  <li key={r.id}>
                    <span className="lib-fav__ic"><Icon name={TYPE_ICON[r.type] || 'file'} size={15} /></span>
                    <Link to={`/thu-vien/tai-lieu/${r.id}`}>{r.title}</Link>
                    <em>{r.type} · {r.year}</em>
                  </li>
                ))}
              </ul>
            ) : <p className="lib-muted">Chưa có tài liệu liên quan.</p>
          )}
        </Panel>
      </>
    ),
  })
}
