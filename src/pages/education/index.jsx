import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, StatRow, Chips, FilterBar, StepList, Faq,
  DocList, LinkList, SupportCard, NewsMini, HeroSearch, MetaBar, Pagination,
} from '../../components/ui/page.jsx'

const enorm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')

const WEEK_DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
const WEEK_SLOTS = ['Tiết 1–3', 'Tiết 4–6', 'Tiết 7–9', 'Tiết 10–12']
function WeekGrid({ rows }) {
  return (
    <div className="edu-week-wrap">
      <div className="edu-week">
        <span className="edu-week__corner">Tiết \ Thứ</span>
        {WEEK_DAYS.map((d) => <span key={d} className="edu-week__head">{d}</span>)}
        {WEEK_SLOTS.map((slot) => (
          <div key={slot} className="edu-week__row" style={{ display: 'contents' }}>
            <span className="edu-week__slot">{slot}</span>
            {WEEK_DAYS.map((d) => {
              const cell = rows.find((r) => r.day === d && r.period === slot)
              return (
                <span key={d} className={`edu-week__cell ${cell ? 'has-class' : ''}`}>
                  {cell && (
                    <>
                      <strong>{cell.course}</strong>
                      <em>{cell.room}</em>
                      <em>{cell.time}</em>
                    </>
                  )}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
import {
  eduNav, eduHub, programs, programTypes, getProgram, outcomesGeneral,
  generalInfo, tuition, academicCalendar, resultLookup, studyGuides, surveys,
} from '../../data/education.js'
import './education.css'

const NAV = <SectionNav title="Học tập" items={eduNav} />
const shell = (props) => <PageShell eyebrow="Học tập" sectionNav={NAV} accent="#0284c7" {...props} />

const SUPPORT = (
  <SupportCard
    title="Hỗ trợ học tập"
    lead="Phòng Đào tạo – Bộ phận một cửa"
    phone="024.3838.2222"
    email="daotao@humg.edu.vn"
    cta={{ label: 'Gửi yêu cầu hỗ trợ', to: '/lien-he' }}
  />
)

/* ======================= TỔNG QUAN HỌC TẬP ======================= */
export function EducationHubPage() {
  return shell({
    title: 'Học tập tại HUMG',
    lead: 'Nền tảng cung cấp thông tin toàn diện về đào tạo, học phí, học bổng, quy chế và các dịch vụ hỗ trợ người học.',
    crumbs: [{ label: 'Học tập' }],
    hero: <HeroSearch placeholder="Tìm thông tin học tập, quy chế, biểu mẫu…" />,
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={eduHub.quickLinks.map((q) => ({ label: q.title, to: q.to }))} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Đào tạo trong những con số" icon="award"><StatRow items={eduHub.stats} /></Panel>

        <Panel
          title="Mốc thời gian học kỳ"
          icon="calendar"
          action={<Link to="/hoc-tap/lich-hoc" className="humg-link-more">Kế hoạch đầy đủ <Icon name="arrow-right" size={14} /></Link>}
        >
          <p className="edu-muted" style={{ marginTop: 0 }}>{academicCalendar.year}</p>
          <DataTable columns={academicCalendar.plan.columns} rows={academicCalendar.plan.rows.slice(0, 5)} />
        </Panel>

        <Panel
          title="Chương trình đào tạo nổi bật"
          icon="book"
          action={<Link to="/hoc-tap/chuong-trinh-dao-tao" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <div className="edu-featgrid">
            {programs.slice(0, 6).map((p) => (
              <Link key={p.id} to={`/hoc-tap/chuong-trinh-dao-tao/${p.id}`} className="edu-feat">
                <span className="edu-feat__ic"><Icon name="graduation" size={16} /></span>
                <strong>{p.name}</strong>
                <span>{p.faculty} · {p.degree}</span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Thông báo học vụ"
          icon="bell"
          action={<Link to="/tin-tuc" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <NewsMini items={eduHub.notices.map((n) => ({ ...n, to: '/tin-tuc' }))} />
        </Panel>
      </>
    ),
  })
}

/* ======================= CHƯƠNG TRÌNH ĐÀO TẠO — DANH SÁCH ======================= */
export function ProgramListPage() {
  const [type, setType] = useState('Tất cả')
  const list = useMemo(
    () => (type === 'Tất cả' ? programs : programs.filter((p) => p.type === type)),
    [type],
  )
  const opts = programTypes.map((t) => ({ key: t, label: t, count: t === 'Tất cả' ? programs.length : programs.filter((p) => p.type === t).length }))

  return shell({
    title: 'Chương trình đào tạo',
    lead: 'Danh mục các chương trình đào tạo đại học, chất lượng cao và liên kết quốc tế của HUMG.',
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Chương trình đào tạo' }],
    hero: <HeroSearch placeholder="Tìm ngành / chương trình đào tạo…" />,
    sidebar: (
      <>
        <LinkList
          title="Liên kết nhanh"
          items={[
            { label: 'Chuẩn đầu ra', to: '/hoc-tap/chuan-dau-ra' },
            { label: 'Quy chế đào tạo', to: '/hoc-tap/thong-tin-chung' },
            { label: 'Học phí & Học bổng', to: '/hoc-tap/hoc-phi-hoc-bong' },
            { label: 'Hướng dẫn đăng ký học phần', to: '/hoc-tap/huong-dan' },
          ]}
        />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Thống kê" icon="award">
          <StatRow items={[
            { value: '52', label: 'Chương trình đào tạo' },
            { value: '12', label: 'Ngành trình độ đại học' },
            { value: '15', label: 'CTĐT chất lượng cao' },
            { value: '06', label: 'CTĐT quốc tế' },
          ]} />
        </Panel>
        <Panel title={`Danh sách chương trình (${list.length})`} icon="book">
          <Chips options={opts} value={type} onChange={setType} />
          <div className="edu-programs">
            {list.map((p) => (
              <Link key={p.id} to={`/hoc-tap/chuong-trinh-dao-tao/${p.id}`} className="edu-program">
                <span className="edu-program__code">{p.code}</span>
                <span className="edu-program__body">
                  <strong>{p.name}</strong>
                  <em>{p.level} · {p.faculty}</em>
                </span>
                <span className={`edu-program__tag ${p.type !== 'Chương trình chuẩn' ? 'is-special' : ''}`}>{p.type}</span>
                <Icon name="arrow-right" size={16} />
              </Link>
            ))}
          </div>
        </Panel>
        <Pagination page={1} total={5} />
      </>
    ),
  })
}

/* ======================= CHƯƠNG TRÌNH ĐÀO TẠO — CHI TIẾT ======================= */
export function ProgramDetailPage() {
  const { id } = useParams()
  const p = getProgram(id) || programs[0]
  const [tab, setTab] = useState('tong-quan')
  const tabs = [
    { key: 'tong-quan', label: 'Tổng quan' },
    { key: 'muc-tieu', label: 'Mục tiêu' },
    { key: 'chuan-dau-ra', label: 'Chuẩn đầu ra' },
    { key: 'khung-ct', label: 'Khung chương trình' },
    { key: 'nghe-nghiep', label: 'Cơ hội nghề nghiệp' },
    { key: 'hoc-phi', label: 'Học phí' },
  ]
  const totalCredits = p.curriculum.reduce((s, b) => s + b.credits, 0)

  return shell({
    title: p.name,
    crumbs: [
      { label: 'Học tập', to: '/hoc-tap' },
      { label: 'Chương trình đào tạo', to: '/hoc-tap/chuong-trinh-dao-tao' },
      { label: p.name },
    ],
    hero: <MetaBar items={[
      { icon: 'grid', text: `Mã ngành: ${p.code}` },
      { icon: 'building', text: p.faculty },
      { icon: 'graduation', text: p.type },
    ]} />,
    sidebar: (
      <>
        <Panel title="Tài liệu chương trình" icon="file"><DocList items={p.docs} /></Panel>
        <SupportCard
          title="Đăng ký tư vấn"
          lead={`Tư vấn về ngành ${p.name}`}
          phone="0888 123 456"
          email="tuyensinh@humg.edu.vn"
          cta={{ label: 'Đăng ký tư vấn', to: '/lien-he' }}
        />
      </>
    ),
    children: (
      <>
        <Panel>
          <StatRow items={[
            { value: p.level, label: 'Trình độ đào tạo' },
            { value: p.duration, label: 'Thời gian đào tạo' },
            { value: String(totalCredits), label: 'Tổng số tín chỉ' },
            { value: String(p.quota), label: 'Chỉ tiêu (2026)' },
            { value: p.degree, label: 'Văn bằng' },
          ]} />
        </Panel>

        <Panel flush>
          <div className="edu-tabs">
            {tabs.map((t) => (
              <button key={t.key} type="button" className={t.key === tab ? 'is-active' : ''} onClick={() => setTab(t.key)}>{t.label}</button>
            ))}
          </div>
          <div className="edu-tabbody">
            {tab === 'tong-quan' && (
              <>
                <p className="edu-lead">{p.desc}</p>
                <h3>Định hướng chuyên ngành</h3>
                <ul className="edu-check">{p.orientations.map((o) => <li key={o}><Icon name="check" size={14} /> {o}</li>)}</ul>
                <h3>Tổ hợp môn xét tuyển</h3>
                <div className="edu-chiprow">{p.combos.map((c) => <span key={c}>{c}</span>)}</div>
                <h3>Thông tin nhanh</h3>
                <DataTable
                  columns={['Mục', 'Chi tiết']}
                  rows={[
                    ['Khoa quản lý', p.faculty],
                    ['Hình thức đào tạo', 'Chính quy'],
                    ['Ngôn ngữ giảng dạy', 'Tiếng Việt'],
                    ['Tổ hợp xét tuyển', p.combos.join(', ')],
                  ]}
                />
              </>
            )}
            {tab === 'muc-tieu' && (
              <ul className="edu-check">{p.objectives.map((o, i) => <li key={i}><Icon name="check" size={14} /> {o}</li>)}</ul>
            )}
            {tab === 'chuan-dau-ra' && (
              <>
                <h3>Về kiến thức</h3>
                <ul className="edu-num">{p.outcomes.knowledge.map((o, i) => <li key={i}>{o}</li>)}</ul>
                <h3>Về kỹ năng</h3>
                <ul className="edu-num">{p.outcomes.skills.map((o, i) => <li key={i}>{o}</li>)}</ul>
                <h3>Về mức tự chủ và trách nhiệm</h3>
                <ul className="edu-num">{p.outcomes.autonomy.map((o, i) => <li key={i}>{o}</li>)}</ul>
              </>
            )}
            {tab === 'khung-ct' && (
              <>
                <DataTable
                  columns={['Khối kiến thức', 'Số tín chỉ']}
                  rows={[...p.curriculum.map((b) => [b.block, String(b.credits)]), ['Tổng cộng', String(totalCredits)]]}
                />
                <p className="edu-note">Khung chương trình chi tiết (danh mục học phần theo học kỳ) xem trong tài liệu “Đề cương chi tiết chương trình đào tạo”.</p>
              </>
            )}
            {tab === 'nghe-nghiep' && (
              <ul className="edu-check">{p.careers.map((c, i) => <li key={i}><Icon name="briefcase" size={14} /> {c}</li>)}</ul>
            )}
            {tab === 'hoc-phi' && (
              <>
                <DataTable
                  columns={['Mục', 'Mức']}
                  rows={[
                    ['Đơn giá tín chỉ', p.tuition.perCredit],
                    ['Học phí ước tính / năm', p.tuition.perYear],
                  ]}
                />
                <p className="edu-note">{p.tuition.note}</p>
                <Link to="/hoc-tap/hoc-phi-hoc-bong" className="humg-link-more">Xem chính sách học phí & học bổng <Icon name="arrow-right" size={14} /></Link>
              </>
            )}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= CHUẨN ĐẦU RA ======================= */
export function LearningOutcomesPage() {
  const [prog, setProg] = useState(programs[0].id)
  const [year, setYear] = useState(outcomesGeneral.years[0])
  const [tab, setTab] = useState('ctdt')
  const p = programs.find((x) => x.id === prog) || programs[0]
  return shell({
    title: 'Chuẩn đầu ra',
    lead: outcomesGeneral.intro,
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Chuẩn đầu ra' }],
    sidebar: (
      <>
        <LinkList
          title="Chuẩn đầu ra theo ngành"
          items={programs.slice(0, 8).map((x) => ({ label: x.name, to: `/hoc-tap/chuong-trinh-dao-tao/${x.id}` }))}
        />
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Chuẩn đầu ra chương trình đào tạo" icon="target">
        <form className="edu-form" onSubmit={(e) => e.preventDefault()}>
          <label>Chương trình đào tạo
            <select value={prog} onChange={(e) => setProg(e.target.value)}>
              {programs.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </label>
          <label>Áp dụng
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {outcomesGeneral.years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </label>
          <a href="#" className="humg-btn humg-btn--ghost"><Icon name="download" size={15} /> Tải chuẩn đầu ra (PDF)</a>
        </form>

        <div className="edu-tabs">
          <button type="button" className={tab === 'ctdt' ? 'is-active' : ''} onClick={() => setTab('ctdt')}>Chuẩn đầu ra chương trình</button>
          <button type="button" className={tab === 'hp' ? 'is-active' : ''} onClick={() => setTab('hp')}>Chuẩn đầu ra học phần</button>
        </div>

        <p className="edu-muted"><strong>{p.name}</strong> · {p.faculty} · {year}</p>

        {tab === 'ctdt' && outcomesGeneral.groups.map((g) => (
          <div key={g.title} style={{ marginTop: 14 }}>
            <h4 className="edu-subhead"><Icon name={g.icon} size={13} /> {g.title}</h4>
            <ul className="edu-num">{g.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
          </div>
        ))}

        {tab === 'hp' && (
          <DataTable
            columns={['Mã HP', 'Tên học phần', 'TC', 'PLO liên quan']}
            rows={outcomesGeneral.courseOutcomes.map((c) => [c.code, c.name, String(c.credits), c.plo.join(', ')])}
          />
        )}
      </Panel>
    ),
  })
}

/* ======================= THÔNG TIN CHUNG ======================= */
export function GeneralInfoPage() {
  return shell({
    title: 'Thông tin chung về đào tạo',
    lead: 'Các hệ đào tạo, hình thức đào tạo, quy chế học vụ, thang điểm và điều kiện tốt nghiệp.',
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Thông tin chung' }],
    sidebar: (
      <>
        <Panel title="Văn bản, quy chế" icon="file"><DocList items={generalInfo.docs} /></Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Các hệ & hình thức đào tạo" icon="layers">
          <div className="edu-syslist">
            {generalInfo.systems.map((s) => (
              <div key={s.name} className="edu-sys">
                <span className="edu-sys__ic"><Icon name="graduation" size={16} /></span>
                <div><strong>{s.name}</strong><em>{s.desc}</em></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Thang điểm & xếp loại" icon="award" flush>
          <DataTable columns={generalInfo.grading.columns} rows={generalInfo.grading.rows} />
        </Panel>
        <Panel title="Điều kiện tốt nghiệp" icon="check">
          <ul className="edu-check">{generalInfo.graduation.map((g, i) => <li key={i}><Icon name="check" size={14} /> {g}</li>)}</ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= HỌC PHÍ & HỌC BỔNG ======================= */
export function TuitionScholarshipPage() {
  return shell({
    title: 'Học phí & Học bổng',
    lead: 'Mức học phí, phương thức nộp, các loại học bổng và chính sách miễn giảm học phí.',
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Học phí & Học bổng' }],
    sidebar: (
      <>
        <Panel title="Tài liệu" icon="file"><DocList items={tuition.docs} /></Panel>
        <SupportCard title="Phòng Kế hoạch – Tài chính" lead="Hỗ trợ về học phí, hóa đơn, gia hạn." phone="024.3838.3833" email="tckt@humg.edu.vn" cta={{ label: 'Liên hệ', to: '/lien-he' }} />
      </>
    ),
    children: (
      <>
        <Panel title="Mức học phí năm học 2025 – 2026" icon="file" flush>
          <DataTable columns={tuition.table.columns} rows={tuition.table.rows} />
        </Panel>
        <Panel title="Phương thức & thời hạn nộp học phí" icon="clock">
          <StepList items={tuition.payment} />
        </Panel>
        <Panel title="Các loại học bổng" icon="award">
          <div className="edu-scholar">
            {tuition.scholarships.map((s) => (
              <div key={s.name} className="edu-scholar__item">
                <span className="edu-scholar__ic"><Icon name="award" size={18} /></span>
                <strong>{s.name}</strong>
                <span className="edu-scholar__value">{s.value}</span>
                <em>{s.cond}</em>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Đối tượng được miễn / giảm học phí" icon="shield">
          <ul className="edu-check">{tuition.waiver.map((w, i) => <li key={i}><Icon name="check" size={14} /> {w}</li>)}</ul>
        </Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={tuition.faqs} /></Panel>
      </>
    ),
  })
}

/* ======================= LỊCH HỌC – LỊCH THI ======================= */
export function AcademicCalendarPage() {
  const [params, setParams] = useSearchParams()
  const role = params.get('vaitro') === 'giang-vien' ? 'giang-vien' : 'sinh-vien'
  const tab0 = params.get('tab') === 'thi' ? 'thi' : (params.get('tab') === 'ke-hoach' ? 'ke-hoach' : 'hoc')
  const [tab, setTabRaw] = useState(tab0)
  const setTab = (v) => {
    setTabRaw(v)
    const p = new URLSearchParams(params)
    p.set('tab', v === 'hoc' ? 'hoc' : v)
    setParams(p, { replace: true })
  }
  const [term, setTerm] = useState(academicCalendar.terms[0])
  const [fac, setFac] = useState('Tất cả')
  const [cls, setCls] = useState('Tất cả')
  const [q, setQ] = useState('')
  const reset = () => { setTerm(academicCalendar.terms[0]); setFac('Tất cả'); setCls('Tất cả'); setQ('') }
  const match = (r) => r.term === term
    && (fac === 'Tất cả' || r.faculty === fac)
    && (cls === 'Tất cả' || r.class === cls)
    && (!q || enorm(`${r.course} ${r.code} ${r.lecturer || ''} ${r.room} ${r.class}`).includes(enorm(q)))
  const tt = useMemo(() => academicCalendar.timetable.filter(match), [term, fac, cls, q])
  const ex = useMemo(() => academicCalendar.exams.filter(match), [term, fac, cls, q])

  const filters = (
    <FilterBar
      search={q} onSearch={setQ} searchPlaceholder="Tìm theo học phần, mã HP, giảng viên, phòng…"
      selects={[
        { label: 'Học kỳ', value: term, onChange: setTerm, options: academicCalendar.terms },
        { label: 'Khoa', value: fac, onChange: setFac, options: academicCalendar.faculties },
        { label: 'Lớp', value: cls, onChange: setCls, options: academicCalendar.classes },
      ]}
      count={tab === 'thi' ? ex.length : tt.length}
      total={(tab === 'thi' ? academicCalendar.exams : academicCalendar.timetable).filter((r) => r.term === term).length}
      onReset={reset}
    />
  )

  return shell({
    title: role === 'giang-vien' ? 'Lịch giảng dạy – Lịch thi' : 'Lịch học – Lịch thi',
    lead: `Tra cứu thời khóa biểu, lịch thi và kế hoạch năm học của Trường (${academicCalendar.year}).`,
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Lịch học – Lịch thi' }],
    sidebar: (
      <>
        <Panel title={`Kế hoạch ${academicCalendar.year}`} icon="calendar" flush>
          <DataTable columns={academicCalendar.plan.columns} rows={academicCalendar.plan.rows} />
        </Panel>
        <Panel title="Lưu ý khi thi" icon="clock">
          <ul className="edu-check">{academicCalendar.exam.map((e, i) => <li key={i}><Icon name="check" size={14} /> {e}</li>)}</ul>
        </Panel>
        <Panel title="Tài liệu" icon="file"><DocList items={academicCalendar.docs} /></Panel>
        <SupportCard title="Lịch cá nhân" lead="Đăng nhập để xem thời khóa biểu, lịch thi và lịch giảng dạy của riêng bạn." cta={{ label: 'Đăng nhập My eUni', to: '/dang-nhap' }} />
      </>
    ),
    children: (
      <Panel
        title={tab === 'thi' ? 'Lịch thi' : (tab === 'ke-hoach' ? 'Kế hoạch năm học' : (role === 'giang-vien' ? 'Lịch giảng dạy' : 'Thời khóa biểu'))}
        icon="calendar"
      >
        <div className="edu-tabs">
          <button type="button" className={tab === 'hoc' ? 'is-active' : ''} onClick={() => setTab('hoc')}>
            {role === 'giang-vien' ? 'Lịch giảng dạy' : 'Lịch học (TKB)'}
          </button>
          <button type="button" className={tab === 'thi' ? 'is-active' : ''} onClick={() => setTab('thi')}>Lịch thi</button>
          <button type="button" className={tab === 'ke-hoach' ? 'is-active' : ''} onClick={() => setTab('ke-hoach')}>Kế hoạch năm học</button>
        </div>

        {tab === 'ke-hoach' && (
          <DataTable columns={academicCalendar.plan.columns} rows={academicCalendar.plan.rows} />
        )}

        {tab === 'hoc' && (
          <>
            {filters}
            <WeekGrid rows={tt} />
            <h4 className="edu-subhead">Danh sách chi tiết</h4>
            <DataTable
              columns={['Thứ', 'Tiết', 'Giờ', 'Học phần', 'Mã HP', 'Giảng viên', 'Phòng', 'Tuần']}
              rows={tt.map((r) => [r.day, r.period, r.time, r.course, r.code, r.lecturer, r.room, r.weeks])}
            />
            {tt.length === 0 && <p className="edu-muted">Không có lịch học phù hợp bộ lọc.</p>}
          </>
        )}

        {tab === 'thi' && (
          <>
            {filters}
            <DataTable
              columns={['Học phần', 'Mã HP', 'Lớp', 'Ngày thi', 'Ca thi', 'Phòng', 'Hình thức', 'SL']}
              rows={ex.map((r) => [r.course, r.code, r.class, r.date, r.session, r.room, r.form, String(r.students)])}
            />
            {ex.length === 0 && <p className="edu-muted">Không có lịch thi phù hợp bộ lọc.</p>}
          </>
        )}
      </Panel>
    ),
  })
}

/* ======================= TRA CỨU KẾT QUẢ HỌC TẬP ======================= */
export function ResultLookupPage() {
  const [term, setTerm] = useState(resultLookup.terms[0])
  const [prog, setProg] = useState(resultLookup.programs[0])
  const [shown, setShown] = useState(false)
  const s = resultLookup.sample.summary
  return shell({
    title: 'Tra cứu kết quả học tập',
    lead: 'Xem điểm học phần, GPA và tiến độ tích lũy tín chỉ.',
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Tra cứu kết quả học tập' }],
    sidebar: (
      <>
        <SupportCard
          title="Cổng sinh viên My eUni"
          lead="Đăng nhập để xem đầy đủ kết quả học tập, bảng điểm và tiến độ."
          cta={{ label: 'Đăng nhập My eUni', to: '/dang-nhap' }}
        />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Tra cứu kết quả" icon="search">
          <form className="edu-form" onSubmit={(e) => { e.preventDefault(); setShown(true) }}>
            <label>Mã số sinh viên <input type="text" placeholder="VD: 2151000123" required /></label>
            <label>Học kỳ
              <select value={term} onChange={(e) => setTerm(e.target.value)}>
                {resultLookup.terms.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label>Chương trình
              <select value={prog} onChange={(e) => setProg(e.target.value)}>
                {resultLookup.programs.map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
            <label>Mã xác nhận <input type="text" placeholder="Nhập mã hiển thị" required /></label>
            <button type="submit" className="humg-btn humg-btn--primary">Tra cứu</button>
          </form>
          <p className="edu-note">Kết quả tra cứu nhanh mang tính minh họa. Để xem đầy đủ và tải bảng điểm, vui lòng đăng nhập Cổng sinh viên.</p>
        </Panel>

        {shown && (
          <Panel
            title={`Kết quả học tập · ${term}`}
            icon="award"
            action={<a href="#" className="humg-link-more"><Icon name="download" size={14} /> Xem bảng điểm PDF</a>}
          >
            <DataTable
              columns={['STT', 'Mã HP', 'Tên học phần', 'TC', 'Điểm', 'Điểm chữ']}
              rows={resultLookup.sample.rows}
            />
            <div className="edu-resultsum">
              <div><strong>{s.credits}</strong><span>Tín chỉ trong kỳ</span></div>
              <div><strong>{s.gpa10}</strong><span>Điểm TB (hệ 10)</span></div>
              <div><strong>{s.gpa4}</strong><span>GPA (hệ 4)</span></div>
              <div><strong>{s.rank}</strong><span>Xếp loại</span></div>
            </div>
          </Panel>
        )}

        <Panel title="Các bước tra cứu trên My eUni" icon="check"><StepList items={resultLookup.steps} /></Panel>
        <Panel title="Thang điểm quy đổi" icon="award" flush>
          <DataTable columns={resultLookup.grading.columns} rows={resultLookup.grading.rows} />
        </Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={resultLookup.faqs} /></Panel>
      </>
    ),
  })
}

/* ======================= HƯỚNG DẪN HỌC TẬP ======================= */
export function StudyGuidesPage() {
  return shell({
    title: 'Hướng dẫn học tập',
    lead: 'Quy chế, hướng dẫn đăng ký học phần, cố vấn học tập và các kênh hỗ trợ người học.',
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Hướng dẫn học tập' }],
    sidebar: (
      <>
        <Panel title="Tài liệu hướng dẫn" icon="file"><DocList items={studyGuides.docs} /></Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Chủ đề hướng dẫn" icon="grid"><TileGrid items={studyGuides.tiles} cols={3} /></Panel>
        <Panel title="Video hướng dẫn" icon="play">
          <ul className="edu-linkrows">
            {studyGuides.videos.map((v) => (
              <li key={v.title}>
                <Link to={v.to}><span className="edu-linkrows__ic"><Icon name="play" size={14} /></span>{v.title}<Icon name="arrow-right" size={14} /></Link>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={studyGuides.faqs} /></Panel>
      </>
    ),
  })
}

/* ======================= KHẢO SÁT & ĐÁNH GIÁ ======================= */
export function SurveyPage() {
  return shell({
    title: 'Khảo sát & Đánh giá',
    lead: 'Khảo sát lấy ý kiến người học, cựu người học và nhà tuyển dụng phục vụ cải tiến chất lượng đào tạo.',
    crumbs: [{ label: 'Học tập', to: '/hoc-tap' }, { label: 'Khảo sát & Đánh giá' }],
    sidebar: (
      <>
        <Panel title="Báo cáo khảo sát" icon="file"><DocList items={surveys.closed} /></Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Khảo sát đang mở" icon="check">
          <div className="edu-surveys">
            {surveys.open.map((s) => (
              <div key={s.name} className="edu-survey">
                <div>
                  <strong>{s.name}</strong>
                  <MetaBar items={[{ icon: 'users', text: s.audience }, { icon: 'clock', text: `Hạn: ${s.deadline}` }]} />
                </div>
                <Link to="/lien-he" className="humg-btn humg-btn--primary">Tham gia</Link>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Về hoạt động khảo sát" icon="layers">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{surveys.about}</p>
        </Panel>
        <Panel title="Kết quả khảo sát gần đây" icon="award">
          <div className="edu-pct">
            {surveys.results.map((r) => (
              <div key={r.label} className="edu-pct__row">
                <span className="edu-pct__label">{r.label}</span>
                <span className="edu-pct__track"><span style={{ width: `${r.value}%` }} /></span>
                <span className="edu-pct__val">{r.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </>
    ),
  })
}
