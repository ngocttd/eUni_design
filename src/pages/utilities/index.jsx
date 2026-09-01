import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, HeroSearch, Panel, TileGrid, DocList, DataTable, FilterBar,
  StepList, Faq, StatRow, LinkList, SupportCard, NewsMini,
} from '../../components/ui/page.jsx'
import {
  utilityGroups, elearning, digilib, forms, workCalendar, contact, webmail,
} from '../../data/utilities.js'
import { eduNav } from '../../data/education.js'
import './utilities.css'

const EDU_NAV = <SectionNav title="Học tập" items={eduNav} />
const fileType = (meta) => (meta.match(/DOCX|XLSX|PDF|PPTX|ZIP/i) || ['Khác'])[0].toUpperCase()
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
const allForms = forms.categories.flatMap((c) => c.docs.map((d) => ({ ...d, category: c.name })))

/* ======================= /tien-ich ======================= */
export function UtilitiesHubPage() {
  return (
    <PageShell
      eyebrow="Tiện ích"
      title="Tiện ích & Dịch vụ"
      lead="Tổng hợp các công cụ, cổng dịch vụ và tra cứu trực tuyến của Trường Đại học Mỏ - Địa chất."
      crumbs={[{ label: 'Tiện ích' }]}
      hero={<HeroSearch placeholder="Tìm công cụ, dịch vụ, tra cứu…" />}
      sidebar={
        <>
          <LinkList
            title="Dùng nhiều nhất"
            items={[
              { label: 'Lịch công tác', to: '/lich-cong-tac' },
              { label: 'Thư viện số', to: '/thu-vien-so' },
              { label: 'E-learning & LMS', to: '/hoc-tap/e-learning' },
              { label: 'Biểu mẫu', to: '/hoc-tap/bieu-mau' },
              { label: 'Webmail', to: '/webmail' },
              { label: 'Tra cứu tuyển sinh', to: '/hoc-tap/tuyen-sinh' },
            ]}
          />
          <SupportCard
            title="Trung tâm CNTT"
            lead="Hỗ trợ tài khoản, hệ thống và dịch vụ số của Nhà trường."
            phone="024.3838.2010"
            email="cntt@humg.edu.vn"
            cta={{ label: 'Gửi yêu cầu hỗ trợ', to: '/lien-he' }}
          />
        </>
      }
    >
      {utilityGroups.map((g) => (
        <Panel key={g.title} title={g.title} icon="grid">
          <TileGrid items={g.items} cols={3} />
        </Panel>
      ))}
    </PageShell>
  )
}

/* ======================= /hoc-tap/e-learning ======================= */
export function ELearningPage() {
  return (
    <PageShell
      sectionNav={EDU_NAV} accent="#0284c7"
      eyebrow="Học tập"
      title="E-learning & Hệ thống LMS"
      lead="Nền tảng học tập trực tuyến của HUMG: lớp học phần, khóa học, học liệu số và các công cụ dạy – học từ xa."
      crumbs={[{ label: 'Học tập', to: '/hoc-tap' }, { label: 'E-learning & LMS' }]}
      sidebar={
        <>
          <Panel title="Hướng dẫn sử dụng" icon="file"><DocList items={elearning.docs} /></Panel>
          <SupportCard
            title="Hỗ trợ kỹ thuật"
            lead="Sự cố đăng nhập, lớp học, tài khoản LMS."
            phone="024.3838.2020" email="elearning@humg.edu.vn"
            cta={{ label: 'Gửi yêu cầu hỗ trợ', to: '/lien-he' }}
          />
        </>
      }
    >
      <Panel title="Công cụ học tập" icon="grid">
        <TileGrid items={elearning.tiles} cols={2} />
      </Panel>
      <Panel title="Truy cập nhanh" icon="external">
        <div className="util-systems">
          {elearning.systems.map((s) => (
            <Link key={s.name} to={s.to} className="util-system">
              <span className="util-system__ic"><Icon name="external" size={18} /></span>
              <strong>{s.name}</strong>
              <span>{s.desc}</span>
            </Link>
          ))}
        </div>
      </Panel>
      <Panel
        title="Khóa học nổi bật"
        icon="book"
        action={<Link to="/hoc-tap" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
      >
        <ul className="util-courselist">
          {elearning.courses.map((c) => (
            <li key={c.title}>
              <span className="util-courselist__ic"><Icon name="play" size={16} /></span>
              <span><strong>{c.title}</strong><em>{c.meta}</em></span>
              <Link to="/hoc-tap/e-learning" className="humg-btn humg-btn--ghost">Vào học</Link>
            </li>
          ))}
        </ul>
      </Panel>
    </PageShell>
  )
}

/* ======================= /thu-vien-so ======================= */
export function DigitalLibraryPage() {
  const [q, setQ] = useState('')
  const [dtype, setDtype] = useState('Tất cả')
  const [dyear, setDyear] = useState('Tất cả')
  const dtypes = ['Tất cả', ...Array.from(new Set(digilib.latest.map((d) => d.type)))]
  const dyears = ['Tất cả', ...Array.from(new Set(digilib.latest.map((d) => String(d.year)))).sort().reverse()]
  const latest = useMemo(() => digilib.latest.filter((d) =>
    (dtype === 'Tất cả' || d.type === dtype)
    && (dyear === 'Tất cả' || String(d.year) === dyear)
    && (!q || norm(`${d.title} ${d.author}`).includes(norm(q)))), [q, dtype, dyear])
  return (
    <PageShell
      eyebrow="Thư viện"
      title="Thư viện số HUMG"
      lead="Kho tài nguyên tri thức số phục vụ học tập, giảng dạy, nghiên cứu khoa học và phát triển học thuật."
      crumbs={[{ label: 'Thư viện', to: '/thu-vien' }, { label: 'Thư viện số' }]}
      sidebar={
        <>
          <LinkList title="Hỗ trợ nhanh" items={digilib.help} />
          <SupportCard
            lead="Liên hệ qua email, điện thoại hoặc chat trực tuyến."
            phone="024.3838.3060" email="thuvien@humg.edu.vn"
            cta={{ label: 'Liên hệ ngay', to: '/lien-he' }}
          />
        </>
      }
    >
      <Panel title="Truy cập theo loại tài nguyên" icon="grid">
        <TileGrid items={digilib.access} cols={3} />
      </Panel>
      <Panel
        title="Tài nguyên nổi bật"
        icon="layers"
        action={<Link to="/thu-vien" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
      >
        <div className="util-resgrid">
          {digilib.resources.map((r) => (
            <div key={r.name} className="util-res">
              <span className="util-res__badge">CSDL</span>
              <strong>{r.name}</strong>
              <span>{r.meta}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Tài liệu mới cập nhật" icon="book">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên tài liệu hoặc tác giả…"
          selects={[
            { label: 'Loại', value: dtype, onChange: setDtype, options: dtypes },
            { label: 'Năm', value: dyear, onChange: setDyear, options: dyears },
          ]}
          count={latest.length} total={digilib.latest.length}
          onReset={() => { setQ(''); setDtype('Tất cả'); setDyear('Tất cả') }}
        />
        <ul className="util-courselist">
          {latest.map((d) => (
            <li key={d.title}>
              <span className="util-courselist__ic"><Icon name="file" size={16} /></span>
              <span><strong>{d.title}</strong><em>{d.author} · {d.year} · {d.type}</em></span>
              <a href="#" className="ui-doclist__dl" aria-label="Tải xuống"><Icon name="download" size={16} /></a>
            </li>
          ))}
        </ul>
        {latest.length === 0 && <p className="util-muted">Không tìm thấy tài liệu phù hợp.</p>}
      </Panel>
      <Panel title="Thống kê thư viện" icon="award"><StatRow items={digilib.stats} /></Panel>
    </PageShell>
  )
}

/* ======================= /hoc-tap/bieu-mau ======================= */
export function FormsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Tất cả')
  const [ft, setFt] = useState('Tất cả')
  const [sort, setSort] = useState('Liên quan')
  const cats = ['Tất cả', ...forms.categories.map((c) => c.name)]
  const fileTypes = ['Tất cả', ...Array.from(new Set(allForms.map((d) => fileType(d.meta)))).sort()]
  const reset = () => { setQ(''); setCat('Tất cả'); setFt('Tất cả'); setSort('Liên quan') }
  const list = useMemo(() => {
    let r = allForms.filter((d) =>
      (cat === 'Tất cả' || d.category === cat)
      && (ft === 'Tất cả' || fileType(d.meta) === ft)
      && (!q || norm(d.name).includes(norm(q))))
    if (sort === 'Tên A → Z') r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    return r
  }, [q, cat, ft, sort])
  return (
    <PageShell
      sectionNav={EDU_NAV} accent="#0284c7"
      eyebrow="Học tập"
      title="Biểu mẫu – Tra cứu"
      lead="Kho biểu mẫu dùng chung trong đào tạo, học phí – học bổng, công tác sinh viên, nghiên cứu khoa học và hành chính."
      crumbs={[{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Biểu mẫu' }]}
      sidebar={
        <>
          <LinkList title="Nhóm biểu mẫu" items={forms.categories.map((c) => ({ label: `${c.name} (${c.docs.length})`, to: '#' }))} />
          <SupportCard
            title="Cần hỗ trợ?"
            lead="Không tìm thấy biểu mẫu bạn cần?"
            phone="024.3838.2222" email="daotao@humg.edu.vn"
            cta={{ label: 'Liên hệ Phòng Đào tạo', to: '/lien-he' }}
          />
        </>
      }
    >
      <Panel title="Kho biểu mẫu" icon="file">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm biểu mẫu theo tên…"
          selects={[
            { label: 'Nhóm biểu mẫu', value: cat, onChange: setCat, options: cats },
            { label: 'Định dạng', value: ft, onChange: setFt, options: fileTypes },
          ]}
          sort={sort} onSort={setSort} sortOptions={['Liên quan', 'Tên A → Z']}
          count={list.length} total={allForms.length} onReset={reset}
        />
        <DataTable
          columns={['Tên biểu mẫu', 'Nhóm', 'Tải về']}
          rows={list.map((d) => [
            d.name,
            <span key="c" className="util-muted">{d.category}</span>,
            <a key="dl" href="#" className="util-dl" aria-label={`Tải ${d.name}`}><Icon name="download" size={15} /> {d.meta}</a>,
          ])}
        />
        {list.length === 0 && <p className="util-muted">Không tìm thấy biểu mẫu phù hợp.</p>}
      </Panel>
    </PageShell>
  )
}

/* ======================= /lich-cong-tac ======================= */
export function WorkCalendarPage() {
  return (
    <PageShell
      eyebrow="Trang chủ"
      title="Lịch công tác tuần"
      lead="Lịch làm việc và hoạt động điều hành của Ban Giám hiệu, các đơn vị trong Trường."
      crumbs={[{ label: 'Lịch công tác' }]}
      hero={
        <div className="util-weekbar">
          <button type="button" aria-label="Tuần trước"><Icon name="chevron-left" size={16} /></button>
          <strong>{workCalendar.week}</strong>
          <button type="button" aria-label="Tuần sau"><Icon name="chevron-right" size={16} /></button>
        </div>
      }
      sidebar={
        <>
          <Panel title="Thông báo điều hành" icon="bell"><NewsMini items={workCalendar.notices} /></Panel>
          <LinkList
            title="Liên kết"
            items={[
              { label: 'Lịch công tác tháng' },
              { label: 'Đăng ký lịch họp / phòng họp' },
              { label: 'Lịch tiếp công dân' },
            ]}
          />
        </>
      }
    >
      <div className="util-week">
        {workCalendar.days.map((d) => (
          <div key={d.day} className={`util-day ${d.events.length === 0 ? 'is-empty' : ''}`}>
            <div className="util-day__head">
              <strong>{d.day}</strong>
              <span>{d.date}</span>
            </div>
            {d.events.length === 0 ? (
              <p className="util-day__none">Không có lịch</p>
            ) : (
              <ul>
                {d.events.map((e, i) => (
                  <li key={i}>
                    <span className="util-day__time">{e.time}</span>
                    <span className="util-day__info">
                      <strong>{e.title}</strong>
                      <em><Icon name="map-pin" size={12} /> {e.place} · {e.unit}</em>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  )
}

/* ======================= /webmail ======================= */
export function WebmailPage() {
  return (
    <PageShell
      eyebrow="Tiện ích"
      title="Webmail HUMG"
      lead="Hộp thư điện tử @humg.edu.vn dành cho cán bộ, giảng viên và sinh viên của Trường."
      crumbs={[{ label: 'Tiện ích', to: '/tien-ich' }, { label: 'Webmail' }]}
      sidebar={
        <>
          <LinkList title="Liên kết" items={webmail.links} />
          <SupportCard
            title="Trung tâm CNTT"
            lead="Hỗ trợ tài khoản, mật khẩu, cấu hình email."
            phone="024.3838.2010" email="cntt@humg.edu.vn"
          />
        </>
      }
    >
      <Panel title="Truy cập hộp thư" icon="mail">
        <div className="util-webmail">
          <span className="util-webmail__ic"><Icon name="mail" size={26} /></span>
          <div>
            <strong>Đăng nhập Webmail HUMG</strong>
            <p>Sử dụng tài khoản dạng <code>hoten@humg.edu.vn</code> và mật khẩu được cấp.</p>
          </div>
          <a href="#" className="humg-btn humg-btn--primary">Mở Webmail <Icon name="external" size={15} /></a>
        </div>
      </Panel>
      <Panel title="Hướng dẫn cấu hình" icon="file"><DocList items={webmail.docs} /></Panel>
      <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={webmail.faqs} /></Panel>
    </PageShell>
  )
}

/* ======================= /lien-he ======================= */
export function ContactPage() {
  return (
    <PageShell
      eyebrow="Liên hệ"
      title="Liên hệ với HUMG"
      lead="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Vui lòng chọn hình thức liên hệ phù hợp hoặc gửi thông tin cho chúng tôi."
      crumbs={[{ label: 'Liên hệ' }]}
    >
      <div className="util-contactcards">
        {contact.cards.map((c) => (
          <div key={c.label} className="util-contactcard">
            <span className="util-contactcard__ic"><Icon name={c.icon} size={18} /></span>
            <strong>{c.value}</strong>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="util-contactgrid">
        <Panel title="Gửi liên hệ" icon="mail">
          <form className="util-form" onSubmit={(e) => e.preventDefault()}>
            <div className="util-form__row">
              <label>Họ và tên <span>*</span><input type="text" placeholder="Nhập họ và tên" /></label>
              <label>Email <span>*</span><input type="email" placeholder="Nhập email của bạn" /></label>
            </div>
            <div className="util-form__row">
              <label>Số điện thoại<input type="tel" placeholder="Nhập số điện thoại" /></label>
              <label>Chủ đề
                <select>
                  <option value="">-- Chọn chủ đề --</option>
                  {contact.subjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <label>Nội dung <span>*</span><textarea rows="5" placeholder="Nhập nội dung liên hệ…" /></label>
            <button type="submit" className="humg-btn humg-btn--primary humg-btn--block">
              <Icon name="mail" size={16} /> Gửi liên hệ
            </button>
          </form>
        </Panel>

        <Panel title="Bản đồ vị trí" icon="map-pin" flush>
          <div className="util-map humg-ph" data-ratio="4-3"><span>Bản đồ · 18 Phố Viên, Bắc Từ Liêm, Hà Nội</span></div>
          <div className="util-transport">
            {contact.transport.map((t) => (
              <div key={t.title}>
                <span className="util-transport__ic"><Icon name={t.icon} size={16} /></span>
                <strong>{t.title}</strong>
                <em>{t.text}</em>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="util-contactgrid">
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={contact.faqs} /></Panel>
        <Panel title="Thời gian làm việc" icon="clock" flush>
          <DataTable columns={['Ngày', 'Giờ làm việc']} rows={contact.hours} />
        </Panel>
      </div>
    </PageShell>
  )
}
