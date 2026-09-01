import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, Chips, FilterBar, StepList, Faq,
  DocList, LinkList, SupportCard, NewsMini, HeroSearch,
} from '../../components/ui/page.jsx'

const fileType = (meta) => (meta.match(/DOCX|XLSX|PDF|PPTX|ZIP/i) || ['Khác'])[0].toUpperCase()
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
import {
  studentNavGroups, studentQuickLinks, studentHub,
  stuLearning, stuRegulations, stuTuition, stuForms, stuLife, stuJobs, stuLibrary,
  stuPortal, stuOnboarding, stuFaq,
} from '../../data/student.js'
import './student.css'

const NAV = <SectionNav title="Sinh viên" groups={studentNavGroups} />
const shell = (props) => <PageShell eyebrow="Cổng Sinh viên" sectionNav={NAV} variant="student" {...props} />

const QUICKLINKS = <LinkList title="Liên kết nhanh" items={studentQuickLinks} />
const SUPPORT = (
  <SupportCard
    title="Trung tâm Hỗ trợ sinh viên"
    lead="Đồng hành cùng sinh viên trong học tập và đời sống."
    phone="024.3838.3830"
    email="htsv@humg.edu.vn"
    cta={{ label: 'Gửi yêu cầu hỗ trợ', to: '/lien-he' }}
  />
)

/* ======================= PG-STU-01 — CỔNG SINH VIÊN (HUB) ======================= */
export function StudentGatewayPage() {
  return shell({
    title: 'Cổng Sinh viên',
    lead: 'Lối vào nhanh các trang thông tin dành cho sinh viên. Đăng nhập My eUni để xem lịch học, điểm và học phí cá nhân.',
    crumbs: [{ label: 'Sinh viên' }],
    sidebar: (
      <>
        <Panel
          title="Thông báo"
          icon="bell"
          action={<Link to="/tin-tuc" className="humg-link-more">Tất cả <Icon name="arrow-right" size={13} /></Link>}
        >
          <ul className="stu-notice">
            {studentHub.notices.slice(0, 4).map((n) => (
              <li key={n.title}>
                <span className="stu-notice__date">{n.date}{n.tag && <em>{n.tag}</em>}</span>
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
        <Panel title="Truy cập nhanh" icon="grid"><TileGrid items={studentHub.publicTools} cols={3} /></Panel>

        <Panel
          title={`Mốc thời gian học kỳ · ${studentHub.keyDates.year}`}
          icon="calendar"
          action={<Link to="/hoc-tap/lich-hoc" className="humg-link-more">Kế hoạch đầy đủ <Icon name="arrow-right" size={13} /></Link>}
        >
          <DataTable columns={['Nội dung', 'Thời gian']} rows={studentHub.keyDates.rows.map((r) => [r[0], r[1]])} />
        </Panel>

        <p className="stu-note">
          <Icon name="compass" size={14} /> Mới nhập học? Xem <Link to="/sinh-vien/tan-sinh-vien">Sổ tay tân sinh viên</Link>
          &nbsp;và <Link to="/sinh-vien/faq">Hỏi – Đáp</Link>.
        </p>
      </>
    ),
  })
}

/* ======================= 1.1 — HỌC TẬP & ĐÀO TẠO ======================= */
export function StuLearningPage() {
  return shell({
    title: 'Học tập & Đào tạo',
    lead: stuLearning.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Học tập & Đào tạo' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={stuLearning.quickLinks} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Nội dung học tập" icon="book"><TileGrid items={stuLearning.tiles} cols={3} /></Panel>
        <Panel title="Có thể bạn cần" icon="compass">
          <ul className="stu-check">
            <li><Icon name="check" size={14} /> Xem <Link to="/hoc-tap/chuong-trinh-dao-tao">khung chương trình đào tạo</Link> theo ngành và khóa của bạn.</li>
            <li><Icon name="check" size={14} /> Theo dõi <Link to="/hoc-tap/lich-hoc">lịch học – lịch thi</Link> và đăng ký học phần đúng hạn.</li>
            <li><Icon name="check" size={14} /> Tra <Link to="/hoc-tap/tra-cuu-ket-qua">kết quả học tập</Link> và điểm rèn luyện mỗi cuối học kỳ.</li>
          </ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.2 — QUY CHẾ SINH VIÊN ======================= */
export function StuRegulationsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Tất cả')
  const [sort, setSort] = useState('Liên quan')
  const reset = () => { setQ(''); setCat('Tất cả'); setSort('Liên quan') }
  const list = useMemo(() => {
    let r = stuRegulations.docs.filter((d) =>
      (cat === 'Tất cả' || d.category === cat)
      && (!q || norm(d.name).includes(norm(q))))
    if (sort === 'Tên A → Z') r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    return r
  }, [q, cat, sort])
  return shell({
    title: 'Quy chế sinh viên',
    lead: stuRegulations.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Quy chế sinh viên' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Văn bản quy chế – quy định" icon="shield">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên văn bản…"
            selects={[{ label: 'Nhóm quy chế', value: cat, onChange: setCat, options: stuRegulations.categories }]}
            sort={sort} onSort={setSort} sortOptions={['Liên quan', 'Tên A → Z']}
            count={list.length} total={stuRegulations.docs.length} onReset={reset}
          />
          <DocList items={list.map((d) => ({ name: d.name, meta: d.meta }))} />
          {list.length === 0 && <p className="stu-muted">Không tìm thấy văn bản phù hợp.</p>}
        </Panel>
        <Panel title="Lưu ý" icon="bell">
          <p className="stu-note"><Icon name="shield" size={14} /> {stuRegulations.note}</p>
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.3 — HỌC PHÍ & HỌC BỔNG ======================= */
export function StuTuitionPage() {
  const [tab, setTab] = useState('Học phí')
  return shell({
    title: 'Học phí & Học bổng',
    lead: stuTuition.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Học phí & Học bổng' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Thông tin học phí & học bổng" icon="file">
          <Chips options={stuTuition.tabs.map((t) => ({ key: t, label: t }))} value={tab} onChange={setTab} />

          {tab === 'Học phí' && (
            <>
              <label className="stu-select">
                <span>Năm học</span>
                <select defaultValue={stuTuition.years[0]}>
                  {stuTuition.years.map((y) => <option key={y}>{y}</option>)}
                </select>
              </label>
              <DataTable columns={['Khóa', 'Chương trình / Ngành', 'Học phí (VNĐ/năm)']} rows={stuTuition.tuitionRows} />
              <p className="stu-muted">Mức học phí có thể điều chỉnh theo lộ trình được duyệt; xem thông báo chính thức từng năm học.</p>
            </>
          )}

          {tab === 'Học bổng' && (
            <ul className="stu-deflist">
              {stuTuition.scholarships.map((s) => (
                <li key={s.name}><strong>{s.name}</strong><span>{s.desc}</span></li>
              ))}
            </ul>
          )}

          {tab === 'Chính sách miễn giảm' && (
            <>
              <ul className="stu-check">
                {stuTuition.waivers.map((w, i) => <li key={i}><Icon name="check" size={14} /> {w}</li>)}
              </ul>
              <h4 className="stu-subhead">Quy trình đề nghị miễn, giảm</h4>
              <StepList items={stuTuition.waiverSteps} />
            </>
          )}
        </Panel>

        <Panel title="Thông tin thanh toán" icon="file"><TileGrid items={stuTuition.payTiles} cols={3} /></Panel>
      </>
    ),
  })
}

/* ======================= 1.4 — BIỂU MẪU SINH VIÊN ======================= */
export function StuFormsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Tất cả')
  const [ft, setFt] = useState('Tất cả')
  const [sort, setSort] = useState('Liên quan')
  const fileTypes = ['Tất cả', ...Array.from(new Set(stuForms.list.map((f) => fileType(f.meta)))).sort()]
  const reset = () => { setQ(''); setCat('Tất cả'); setFt('Tất cả'); setSort('Liên quan') }
  const list = useMemo(() => {
    let r = stuForms.list.filter((f) =>
      (cat === 'Tất cả' || f.category === cat)
      && (ft === 'Tất cả' || fileType(f.meta) === ft)
      && (!q || norm(f.name).includes(norm(q)) || norm(f.desc).includes(norm(q))))
    if (sort === 'Tên A → Z') r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    return r
  }, [q, cat, ft, sort])
  return shell({
    title: 'Biểu mẫu sinh viên',
    lead: stuForms.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Biểu mẫu sinh viên' }],
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
            { label: 'Nhóm biểu mẫu', value: cat, onChange: setCat, options: stuForms.categories },
            { label: 'Định dạng', value: ft, onChange: setFt, options: fileTypes },
          ]}
          sort={sort} onSort={setSort} sortOptions={['Liên quan', 'Tên A → Z']}
          count={list.length} total={stuForms.list.length} onReset={reset}
        />
        <DataTable
          columns={['Tên biểu mẫu', 'Mô tả', 'Tải về']}
          rows={list.map((f) => [
            f.name,
            <span key="d" className="stu-muted">{f.desc}</span>,
            <a key="dl" href="#" className="stu-dl" aria-label={`Tải ${f.name}`}><Icon name="download" size={15} /> {f.meta}</a>,
          ])}
        />
        {list.length === 0 && <p className="stu-muted">Không tìm thấy biểu mẫu phù hợp.</p>}
      </Panel>
    ),
  })
}

/* ======================= 1.5 — ĐỜI SỐNG & HỖ TRỢ SINH VIÊN ======================= */
export function StuLifePage() {
  return shell({
    title: 'Đời sống & Hỗ trợ sinh viên',
    lead: stuLife.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Đời sống & Hỗ trợ sinh viên' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Dịch vụ & hỗ trợ" icon="heart"><TileGrid items={stuLife.tiles} cols={3} /></Panel>
        <Panel title="Cần hỗ trợ?" icon="headphones">
          <p className="stu-note"><Icon name="headphones" size={14} /> {stuLife.note}</p>
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.6 — VIỆC LÀM & KHỞI NGHIỆP ======================= */
export function StuJobsPage() {
  const [tab, setTab] = useState('Việc làm')
  const list = useMemo(() => {
    if (tab === 'Việc làm') return stuJobs.listings.filter((j) => j.kind === 'Việc làm')
    if (tab === 'Thực tập') return stuJobs.listings.filter((j) => j.kind === 'Thực tập')
    return []
  }, [tab])
  return shell({
    title: 'Việc làm & Khởi nghiệp',
    lead: stuJobs.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Việc làm & Khởi nghiệp' }],
    hero: <HeroSearch placeholder="Tìm việc làm, thực tập theo ngành, công ty…" />,
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel
          title="Cơ hội nghề nghiệp"
          icon="briefcase"
          action={<Link to="/doi-song/viec-lam-khoi-nghiep" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <Chips options={stuJobs.tabs.map((t) => ({ key: t, label: t }))} value={tab} onChange={setTab} />

          {(tab === 'Việc làm' || tab === 'Thực tập') && (
            <div className="stu-jobs">
              {list.map((j) => (
                <Link key={j.id} to={`/doi-song/viec-lam-khoi-nghiep/${j.id}`} className="stu-job">
                  <span className="stu-job__ic"><Icon name="briefcase" size={16} /></span>
                  <div className="stu-job__body">
                    <strong>{j.title}</strong>
                    <em>{j.company} · {j.place}</em>
                  </div>
                  <span className="stu-job__deadline">Hạn: {j.deadline}</span>
                </Link>
              ))}
            </div>
          )}

          {tab === 'Khởi nghiệp' && (
            <ul className="stu-check">
              {stuJobs.startup.map((s, i) => <li key={i}><Icon name="rocket" size={14} /> {s}</li>)}
            </ul>
          )}

          {tab === 'Sự kiện' && (
            <NewsMini items={stuJobs.events.map((e) => ({ date: e.date, title: e.title, to: '/su-kien' }))} />
          )}
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.7 — THƯ VIỆN & E-LEARNING ======================= */
export function StuLibraryPage() {
  const [tab, setTab] = useState('Thư viện')
  return shell({
    title: 'Thư viện & E-learning',
    lead: stuLibrary.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Thư viện & E-learning' }],
    hero: <HeroSearch placeholder="Tìm sách, học liệu, khóa học…" />,
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Tài nguyên học tập" icon="library">
          <Chips options={stuLibrary.tabs.map((t) => ({ key: t, label: t }))} value={tab} onChange={setTab} />

          {tab === 'Thư viện' && (
            <>
              <h4 className="stu-subhead">Tài liệu nổi bật</h4>
              <ul className="stu-featlist">
                {stuLibrary.featured.map((f) => (
                  <li key={f.name}>
                    <span className="stu-feat__ic"><Icon name={f.icon} size={15} /></span>
                    <Link to="/thu-vien/tim-kiem">{f.name}</Link>
                    <em>{f.meta}</em>
                  </li>
                ))}
              </ul>
              <h4 className="stu-subhead">Truy cập nhanh</h4>
              <TileGrid items={stuLibrary.quickAccess} cols={2} />
            </>
          )}

          {tab === 'E-learning' && (
            <>
              <p className="stu-prose">{stuLibrary.elearning}</p>
              <Link to={stuLibrary.elearningTo} className="humg-btn humg-btn--primary">Vào hệ thống E-learning <Icon name="arrow-right" size={15} /></Link>
            </>
          )}

          {tab === 'CSDL trực tuyến' && (
            <>
              <p className="stu-prose">Danh mục cơ sở dữ liệu khoa học trong nước và quốc tế mà sinh viên HUMG được quyền khai thác (một số CSDL yêu cầu truy cập trong mạng trường hoặc VPN).</p>
              <Link to={stuLibrary.databasesTo} className="humg-btn humg-btn--primary">Xem danh mục CSDL <Icon name="arrow-right" size={15} /></Link>
            </>
          )}
        </Panel>
      </>
    ),
  })
}

/* ======================= 1.8 — MY eUNI SINH VIÊN ======================= */
export function StuPortalPage() {
  return shell({
    title: 'My eUni Sinh viên',
    lead: stuPortal.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'My eUni Sinh viên' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <div className="stu-portal">
        <div className="stu-portal__art"><Icon name="user" size={40} /></div>
        <div className="stu-portal__body">
          <h2>Đăng nhập cổng eUni Sinh viên</h2>
          <ul className="stu-check">
            {stuPortal.benefits.map((b, i) => <li key={i}><Icon name="check" size={14} /> {b}</li>)}
          </ul>
          <div className="stu-portal__actions">
            <Link to={stuPortal.loginTo} className="humg-btn humg-btn--primary">Đăng nhập ngay <Icon name="arrow-right" size={15} /></Link>
            <Link to={stuPortal.guideTo} className="humg-btn humg-btn--ghost">Xem hướng dẫn</Link>
          </div>
        </div>
      </div>
    ),
  })
}

/* ======================= SỔ TAY TÂN SINH VIÊN ======================= */
export function StuOnboardingPage() {
  return shell({
    title: 'Sổ tay tân sinh viên',
    lead: stuOnboarding.intro,
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Sổ tay tân sinh viên' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Việc cần làm khi nhập học" icon="compass"><StepList items={stuOnboarding.steps} /></Panel>
        <Panel title="Danh mục kiểm tra nhanh" icon="check">
          <ul className="stu-check">
            {stuOnboarding.checklist.map((c, i) => <li key={i}><Icon name="check" size={14} /> {c}</li>)}
          </ul>
        </Panel>
        <Panel title="Tài liệu tải về" icon="file"><DocList items={stuOnboarding.downloads} /></Panel>
      </>
    ),
  })
}

/* ======================= HỎI – ĐÁP (FAQ) ======================= */
export function StuFaqPage() {
  return shell({
    title: 'Hỏi – Đáp dành cho sinh viên',
    lead: 'Giải đáp các thắc mắc thường gặp về tài khoản, đăng ký học phần, kết quả học tập, học phí và đời sống.',
    crumbs: [{ label: 'Sinh viên', to: '/sinh-vien' }, { label: 'Hỏi – Đáp (FAQ)' }],
    sidebar: (
      <>
        {QUICKLINKS}
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={stuFaq} /></Panel>
        <Panel title="Không tìm thấy câu trả lời?" icon="phone">
          <p className="stu-note"><Icon name="headphones" size={14} /> Gửi câu hỏi tới Trung tâm Hỗ trợ sinh viên qua <Link to="/lien-he">trang Liên hệ</Link> hoặc hộp thư htsv@humg.edu.vn — bạn sẽ nhận phản hồi trong 3 – 5 ngày làm việc.</p>
        </Panel>
      </>
    ),
  })
}
