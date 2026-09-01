import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, StatRow, Chips, FilterBar, LinkList, SupportCard, MetaBar, NewsMini,
} from '../../components/ui/page.jsx'
import {
  aboutNav, overview, rectorMessage, history, vision, achievements, numbers,
  orgChart, board, units, getUnit,
  facultyDepartments, getDepartment, getLecturer,
} from '../../data/about.js'
import './about.css'

const anorm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')

const NAV = <SectionNav title="Giới thiệu HUMG" items={aboutNav} />

const DEFAULT_ASIDE = (
  <>
    <LinkList
      title="Xem nhanh"
      items={[
        { label: 'HUMG qua các con số', to: '/gioi-thieu/con-so' },
        { label: 'Ban Giám hiệu', to: '/gioi-thieu/ban-giam-hieu' },
        { label: 'Danh sách chuyên gia & hồ sơ khoa học', to: '/nghien-cuu/chuyen-gia' },
        { label: 'Danh bạ đơn vị & số máy nội bộ', to: '/giang-vien/danh-ba' },
      ]}
    />
    <SupportCard
      title="Liên hệ Nhà trường"
      lead="Phòng Hành chính – Tổng hợp"
      phone="024.3838.3806"
      email="humg@humg.edu.vn"
      cta={{ label: 'Trang liên hệ', to: '/lien-he' }}
    />
  </>
)

const shell = (props) => (
  <PageShell eyebrow="Giới thiệu HUMG" sectionNav={NAV} accent="#1e40af" sidebar={DEFAULT_ASIDE} {...props} />
)

/* ---------- Thẻ nhân sự ---------- */
function PersonCard({ p, big }) {
  return (
    <div className={`about-person ${big ? 'is-big' : ''}`}>
      <span className="about-person__photo humg-ph" data-ratio="1-1"><span>Ảnh</span></span>
      <div className="about-person__body">
        <strong>{p.name}</strong>
        <span className="about-person__role">{p.role}</span>
        {p.bio && <p>{p.bio}</p>}
        {(p.email || p.phone) && (
          <div className="about-person__contact">
            {p.phone && <span><Icon name="phone" size={13} /> {p.phone}</span>}
            {p.email && <span><Icon name="mail" size={13} /> {p.email}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Biểu đồ cột ---------- */
function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="about-bars">
      {data.map((d) => (
        <div key={d.year} className="about-bars__item">
          <span className="about-bars__col" style={{ height: `${(d.value / max) * 100}%` }}>
            <em>{d.value.toLocaleString('vi-VN')}</em>
          </span>
          <span className="about-bars__label">{d.year}</span>
        </div>
      ))}
    </div>
  )
}

/* ======================= 3.1 TỔNG QUAN ======================= */
export function OverviewPage() {
  return shell({
    title: 'Tổng quan về HUMG',
    lead: 'Trường Đại học Mỏ - Địa chất – 60 năm tri thức, bản lĩnh, sáng tạo và hội nhập.',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Tổng quan' }],
    children: (
      <>
        <Panel title="Giới thiệu chung" icon="building">
          {overview.intro.map((t, i) => <p key={i} style={{ margin: i ? '12px 0 0' : 0, fontSize: 14.5, lineHeight: 1.75 }}>{t}</p>)}
        </Panel>
        <Panel
          title="HUMG trong những con số"
          icon="award"
          action={<Link to="/gioi-thieu/con-so" className="humg-link-more">Xem đầy đủ <Icon name="arrow-right" size={14} /></Link>}
        >
          <StatRow items={overview.stats} />
        </Panel>
        <Panel><StatRow items={overview.more} /></Panel>
        <Panel title="Giá trị theo đuổi" icon="target">
          <div className="about-chips">
            {overview.values.map((v) => <span key={v}>{v}</span>)}
          </div>
        </Panel>
      </>
    ),
    sidebar: (
      <>
        <LinkList title="Có thể bạn quan tâm" items={[
          { label: 'Thông điệp Hiệu trưởng', to: '/gioi-thieu/thong-diep-hieu-truong' },
          { label: 'Lịch sử phát triển', to: '/gioi-thieu/lich-su' },
          { label: 'HUMG qua các con số', to: '/gioi-thieu/con-so' },
          { label: 'Cơ cấu tổ chức', to: '/gioi-thieu/co-cau-to-chuc' },
        ]} />
        <SupportCard title="Liên hệ Nhà trường" lead="Phòng Hành chính – Tổng hợp" phone="024.3838.3806" email="humg@humg.edu.vn" cta={{ label: 'Trang liên hệ', to: '/lien-he' }} />
      </>
    ),
  })
}

/* ======================= 3.2 THÔNG ĐIỆP HIỆU TRƯỞNG ======================= */
export function RectorMessagePage() {
  return shell({
    title: 'Thông điệp của Hiệu trưởng',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Thông điệp Hiệu trưởng' }],
    children: (
      <Panel flush>
        <div className="about-message">
          <div className="about-message__aside">
            <span className="about-person__photo humg-ph" data-ratio="4-3"><span>Chân dung Hiệu trưởng</span></span>
            <strong>{rectorMessage.name}</strong>
            <span>{rectorMessage.role}</span>
          </div>
          <div className="about-message__body">
            <Icon name="award" size={24} />
            {rectorMessage.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
            <p className="about-message__sign">{rectorMessage.sign}</p>
            <p className="about-message__name">{rectorMessage.name}</p>
            <div className="about-chips">
              {rectorMessage.values.map((v) => <span key={v}>{v}</span>)}
            </div>
          </div>
        </div>
      </Panel>
    ),
  })
}

/* ======================= 3.3 LỊCH SỬ PHÁT TRIỂN ======================= */
export function HistoryPage() {
  return shell({
    title: 'Lịch sử phát triển',
    lead: 'Chặng đường 60 năm hình thành và phát triển của Trường Đại học Mỏ - Địa chất (1966 – 2026).',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Lịch sử phát triển' }],
    children: (
      <Panel title="Dòng thời gian" icon="clock">
        <ol className="about-timeline">
          {history.map((h) => (
            <li key={h.year}>
              <span className="about-timeline__year">{h.year}</span>
              <div className="about-timeline__card">
                <strong>{h.title}</strong>
                <p>{h.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    ),
  })
}

/* ======================= 3.4 SỨ MẠNG – TẦM NHÌN – GIÁ TRỊ ======================= */
export function VisionPage() {
  return shell({
    title: 'Sứ mạng – Tầm nhìn – Giá trị cốt lõi',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Sứ mạng – Tầm nhìn – Giá trị cốt lõi' }],
    children: (
      <>
        <div className="about-vision">
          <div className="about-vision__card">
            <span className="about-vision__ic"><Icon name="target" size={22} /></span>
            <h3>Sứ mạng</h3>
            <p>{vision.mission}</p>
          </div>
          <div className="about-vision__card">
            <span className="about-vision__ic"><Icon name="rocket" size={22} /></span>
            <h3>Tầm nhìn</h3>
            <p>{vision.visionText}</p>
          </div>
          <div className="about-vision__card is-accent">
            <span className="about-vision__ic"><Icon name="award" size={22} /></span>
            <h3>Giá trị cốt lõi</h3>
            <p className="about-vision__core">{vision.core}</p>
          </div>
        </div>
        <Panel title="Nguyên tắc hoạt động" icon="layers">
          <TileGrid items={vision.principles.map((p) => ({ icon: p.icon, title: p.title, desc: p.desc }))} cols={3} />
        </Panel>
      </>
    ),
  })
}

/* ======================= 3.5 THÀNH TỰU NỔI BẬT ======================= */
export function AchievementsPage() {
  const [tab, setTab] = useState('all')
  const opts = [{ key: 'all', label: 'Tất cả' }, ...achievements.map((g) => ({ key: g.key, label: g.label }))]
  const groups = tab === 'all' ? achievements : achievements.filter((g) => g.key === tab)
  return shell({
    title: 'Thành tựu & con số nổi bật',
    lead: 'Những dấu ấn tiêu biểu của Trường Đại học Mỏ - Địa chất trong đào tạo, nghiên cứu, hợp tác và các giải thưởng.',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Thành tựu & con số nổi bật' }],
    children: (
      <>
        <Panel
          title="HUMG qua các con số"
          icon="award"
          action={<Link to="/gioi-thieu/con-so" className="humg-link-more">Xem chi tiết <Icon name="arrow-right" size={14} /></Link>}
        >
          <StatRow items={numbers.big} />
        </Panel>
        <Chips options={opts} value={tab} onChange={setTab} />
        {groups.map((g) => (
          <Panel key={g.key} title={g.label} icon="award">
            <ul className="about-achi">
              {g.items.map((it, i) => (
                <li key={i}>
                  <span className="about-achi__ic"><Icon name="check" size={15} /></span>
                  <span><strong>{it.title}</strong><em>{it.meta}</em></span>
                  <span className="about-achi__year">{it.year}</span>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </>
    ),
  })
}

/* ======================= 3.6 HUMG QUA CÁC CON SỐ ======================= */
export function NumbersPage() {
  return shell({
    title: 'HUMG qua các con số',
    lead: 'Những số liệu phản ánh quy mô, chất lượng và sự phát triển của Nhà trường.',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'HUMG qua các con số' }],
    children: (
      <>
        <Panel title="Tổng quan" icon="award"><StatRow items={numbers.big} /></Panel>
        <Panel title="Quy mô sinh viên qua các năm" icon="users"><BarChart data={numbers.enrollment} /></Panel>
        <Panel title="Công bố khoa học (2019 – 2024)" icon="flask"><BarChart data={numbers.publications} /></Panel>
        <Panel title="Đội ngũ giảng viên theo trình độ" icon="graduation">
          <div className="about-pct">
            {numbers.faculty.map((f) => (
              <div key={f.label} className="about-pct__row">
                <span className="about-pct__label">{f.label}</span>
                <span className="about-pct__track"><span style={{ width: `${f.value}%` }} /></span>
                <span className="about-pct__val">{f.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= 4.1 CƠ CẤU TỔ CHỨC ======================= */
export function OrgChartPage() {
  return shell({
    title: 'Cơ cấu tổ chức',
    lead: 'Sơ đồ tổ chức của Trường Đại học Mỏ - Địa chất.',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Cơ cấu tổ chức' }],
    children: (
      <>
        <Panel title="Sơ đồ tổ chức" icon="layers">
          <div className="orgchart">
            <div className="orgchart__row orgchart__row--1">
              <div className="orgchart__box is-top">{orgChart.board}</div>
            </div>
            <div className="orgchart__row orgchart__row--2">
              {orgChart.branches.map((b, i) => (
                <Link
                  key={b}
                  to={['/gioi-thieu/khoa', '/gioi-thieu/phong-ban', '/gioi-thieu/trung-tam-vien', '/gioi-thieu/don-vi-truc-thuoc'][i]}
                  className="orgchart__box is-leaf"
                >
                  <span className="orgchart__leaf-ic">
                    <Icon name={['graduation', 'file', 'flask', 'building'][i]} size={18} />
                  </span>
                  {b}
                </Link>
              ))}
            </div>
          </div>
          <p className="orgchart__note"><Icon name="users" size={13} /> {orgChart.support}</p>
          <p className="orgchart__motto"><Icon name="check" size={14} /> {orgChart.motto}</p>
        </Panel>
        <Panel title="Các khối đơn vị" icon="grid">
          <TileGrid
            cols={2}
            items={[
              { icon: 'award', title: 'Ban Giám hiệu', desc: 'Hiệu trưởng và các Phó Hiệu trưởng.', to: '/gioi-thieu/ban-giam-hieu' },
              { icon: 'graduation', title: 'Khoa / Viện đào tạo', desc: '12 khoa và viện đào tạo theo lĩnh vực.', to: '/gioi-thieu/khoa' },
              { icon: 'file', title: 'Phòng / Ban chức năng', desc: 'Tham mưu, giúp việc cho Ban Giám hiệu.', to: '/gioi-thieu/phong-ban' },
              { icon: 'flask', title: 'Trung tâm / Viện nghiên cứu', desc: 'Nghiên cứu, dịch vụ khoa học công nghệ.', to: '/gioi-thieu/trung-tam-vien' },
              { icon: 'building', title: 'Đơn vị trực thuộc', desc: 'Các đơn vị sự nghiệp, dịch vụ.', to: '/gioi-thieu/don-vi-truc-thuoc' },
              { icon: 'users', title: 'Đội ngũ cán bộ, giảng viên', desc: 'Quy mô đội ngũ và cách tra cứu thông tin giảng viên.', to: '/gioi-thieu/giang-vien' },
              { icon: 'award', title: 'Danh sách chuyên gia', desc: 'Hồ sơ nhà khoa học, hướng nghiên cứu, công bố.', to: '/nghien-cuu/chuyen-gia' },
            ]}
          />
        </Panel>
      </>
    ),
  })
}

/* ======================= 4.2 BAN GIÁM HIỆU ======================= */
export function BoardPage() {
  return shell({
    title: 'Ban Giám hiệu',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Ban Giám hiệu' }],
    children: (
      <>
        <Panel title="Hiệu trưởng" icon="user"><PersonCard p={board.rector} big /></Panel>
        <Panel title="Các Phó Hiệu trưởng" icon="users">
          <div className="about-people">
            {board.vices.map((v) => <PersonCard key={v.name} p={v} />)}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= 4.4–4.7 DANH SÁCH ĐƠN VỊ (PG-PUB-04) ======================= */
export function UnitListPage({ kind }) {
  const cfg = units[kind]
  const [q, setQ] = useState('')
  const list = useMemo(
    () => cfg.list.filter((u) => !q || anorm(`${u.name} ${u.head} ${u.desc}`).includes(anorm(q))),
    [cfg.list, q],
  )
  return shell({
    title: cfg.label,
    lead: cfg.intro,
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: cfg.label }],
    children: (
      <Panel title={`Danh sách ${cfg.singular.toLowerCase()}`} icon="grid">
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder={`Tìm ${cfg.singular.toLowerCase()} theo tên, người phụ trách…`}
          count={list.length} total={cfg.list.length} onReset={() => setQ('')}
        />
        {kind === 'khoa' ? (
          <div className="about-khoagrid">
            {list.map((u) => (
              <Link key={u.id} to={`/gioi-thieu/${kind}/${u.id}`} className="about-khoacard">
                <span className="about-khoacard__cover humg-ph" data-ratio="16-9"><span>{u.name}</span></span>
                <span className="about-khoacard__body">
                  <strong>{u.name}</strong>
                  <em><Icon name="user" size={12} /> {u.head}</em>
                  {(u.staff || u.majors) && (
                    <span className="about-khoacard__meta">
                      {u.staff ? `${u.staff} cán bộ` : ''}{u.staff && (u.majors || facultyDepartments[u.id]) ? ' · ' : ''}
                      {facultyDepartments[u.id] ? `${facultyDepartments[u.id].length} bộ môn` : (u.majors ? `${u.majors.length} ngành` : '')}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <DataTable
            columns={['Tên đơn vị', 'Người phụ trách', 'Điện thoại', 'Email', '']}
            rows={list.map((u) => [
              <Link key="t" to={`/gioi-thieu/${kind}/${u.id}`}>{u.name}</Link>,
              u.head || '—',
              u.phone || '—',
              u.email || '—',
              <Link key="a" to={`/gioi-thieu/${kind}/${u.id}`} className="humg-link-more">Chi tiết</Link>,
            ])}
          />
        )}
        {list.length === 0 && <p className="about-muted">Không tìm thấy đơn vị phù hợp.</p>}
      </Panel>
    ),
  })
}

/* ======================= CHI TIẾT ĐƠN VỊ (PG-PUB-04) ======================= */
export function UnitDetailPage({ kind }) {
  const { id } = useParams()
  const cfg = units[kind]
  const u = getUnit(kind, id) || cfg.list[0]
  const isKhoa = kind === 'khoa'
  const depts = isKhoa ? facultyDepartments[u.id] : null
  const staffList = Array.isArray(u.staff) ? u.staff : null

  const facts = [
    u.head && ['Trưởng đơn vị', u.head],
    u.founded && ['Năm thành lập', String(u.founded)],
    u.phone && ['Điện thoại', u.phone],
    u.email && ['Email', u.email],
  ].filter(Boolean)

  const statItems = [
    typeof u.staff === 'number' && { value: String(u.staff), label: 'Cán bộ, giảng viên' },
    staffList && { value: String(staffList.length), label: 'Nhân sự chủ chốt' },
    u.students && { value: u.students.toLocaleString('vi-VN'), label: 'Sinh viên' },
    depts ? { value: String(depts.length), label: 'Bộ môn' } : null,
    u.majors && { value: String(u.majors.length), label: 'Ngành đào tạo' },
    !isKhoa && u.functions && { value: String(u.functions.length), label: 'Nhóm chức năng' },
  ].filter(Boolean)

  const khoaTabs = [
    ...(u.board ? [['nhan-su', 'Ban chủ nhiệm khoa']] : []),
    ...(depts ? [['bo-mon', 'Bộ môn']] : []),
    ...(u.majors ? [['dao-tao', 'Đào tạo']] : []),
  ]
  const [tab, setTab] = useState(khoaTabs[0]?.[0] || 'nhan-su')

  return shell({
    title: u.name,
    lead: u.desc,
    crumbs: [
      { label: 'Giới thiệu HUMG', to: '/gioi-thieu' },
      { label: cfg.label, to: `/gioi-thieu/${kind}` },
      { label: u.name },
    ],
    sidebar: (
      <>
        <LinkList
          title={`${cfg.singular} khác`}
          items={cfg.list.filter((x) => x.id !== u.id).map((x) => ({ label: x.name, to: `/gioi-thieu/${kind}/${x.id}` }))}
        />
        <LinkList
          title="Tra cứu nhân sự"
          items={[
            { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
            { label: 'Danh bạ đơn vị & số máy', to: '/giang-vien/danh-ba' },
            { label: 'Đội ngũ cán bộ, giảng viên', to: '/gioi-thieu/giang-vien' },
          ]}
        />
      </>
    ),
    children: (
      <>
        <div className="about-unitprofile">
          <span className="about-unitprofile__img humg-ph" data-ratio="4-3"><span>{u.name}</span></span>
          <div className="about-unitprofile__facts">
            {facts.map(([k, v]) => (
              <div key={k} className="about-unitprofile__fact"><span>{k}</span><strong>{v}</strong></div>
            ))}
            {statItems.length > 0 && (
              <div className="about-unitprofile__stats">
                {statItems.map((s) => <span key={s.label}><strong>{s.value}</strong> {s.label}</span>)}
              </div>
            )}
          </div>
        </div>

        {isKhoa ? (
          <Panel flush>
            <div className="about-tabs">
              {khoaTabs.map(([k, label]) => (
                <button key={k} type="button" className={tab === k ? 'is-active' : ''} onClick={() => setTab(k)}>{label}</button>
              ))}
            </div>
            <div style={{ padding: 18 }}>
              {tab === 'nhan-su' && u.board && (
                <>
                  <DataTable columns={['Họ và tên', 'Chức vụ', 'Email']} rows={u.board.map((p) => [p.name, p.role, p.email])} />
                  <p className="about-muted" style={{ marginTop: 14 }}>
                    Danh sách giảng viên từng bộ môn xem tại tab <strong>Bộ môn</strong>; hồ sơ nhà khoa học tại <Link to="/nghien-cuu/chuyen-gia">Danh sách chuyên gia</Link>.
                  </p>
                </>
              )}
              {tab === 'bo-mon' && depts && (
                <>
                  <div className="about-depts">
                    {depts.map((d) => (
                      <Link key={d.id} to={`/gioi-thieu/khoa/${u.id}/bo-mon/${d.id}`} className="about-dept">
                        <span className="about-dept__ic"><Icon name="layers" size={16} /></span>
                        <span className="about-dept__body">
                          <strong>{d.name}</strong>
                          <em>{d.size} giảng viên · {d.head}</em>
                        </span>
                        <Icon name="arrow-right" size={15} />
                      </Link>
                    ))}
                  </div>
                  <p className="about-muted" style={{ marginTop: 14 }}>
                    Tìm hồ sơ nhà khoa học của Khoa tại <Link to="/nghien-cuu/chuyen-gia">Danh sách chuyên gia</Link>;
                    số máy, hộp thư liên hệ tại <Link to="/giang-vien/danh-ba">Danh bạ đơn vị</Link>.
                  </p>
                </>
              )}
              {tab === 'dao-tao' && u.majors && (
                <ul className="about-majors">
                  {u.majors.map((m) => (
                    <li key={m}><Link to="/hoc-tap/chuong-trinh-dao-tao">{m} <Icon name="arrow-right" size={13} /></Link></li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>
        ) : (
          <>
            {u.functions && (
              <Panel title="Chức năng, nhiệm vụ" icon="check">
                <ul className="about-funcs">
                  {u.functions.map((f) => <li key={f}><Icon name="check" size={14} /> {f}</li>)}
                </ul>
              </Panel>
            )}
            {staffList && (
              <Panel title="Nhân sự" icon="users">
                <DataTable columns={['Họ và tên', 'Chức vụ', 'Email']} rows={staffList.map((p) => [p.name, p.role, p.email])} />
                <p className="about-muted" style={{ marginTop: 14 }}>
                  Số máy nội bộ và hộp thư đầy đủ của đơn vị xem tại <Link to="/giang-vien/danh-ba">Danh bạ đơn vị &amp; số máy</Link>.
                </p>
              </Panel>
            )}
          </>
        )}
      </>
    ),
  })
}

/* ======================= CHI TIẾT BỘ MÔN ======================= */
export function DepartmentDetailPage() {
  const { khoaId, bmId } = useParams()
  const khoa = getUnit('khoa', khoaId) || units.khoa.list[0]
  const dept = getDepartment(khoaId, bmId) || (facultyDepartments[khoaId] || [])[0]
  if (!dept) return shell({ title: 'Không tìm thấy bộ môn', crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }], children: <Panel><p>Bộ môn không tồn tại.</p></Panel> })
  const lecturers = dept.lecturers || []
  return shell({
    title: dept.name,
    lead: dept.desc,
    crumbs: [
      { label: 'Giới thiệu HUMG', to: '/gioi-thieu' },
      { label: 'Khoa / Viện đào tạo', to: '/gioi-thieu/khoa' },
      { label: khoa.name, to: `/gioi-thieu/khoa/${khoaId}` },
      { label: dept.name },
    ],
    sidebar: (
      <>
        <LinkList
          title="Bộ môn khác"
          items={(facultyDepartments[khoaId] || []).filter((d) => d.id !== dept.id).map((d) => ({ label: d.name, to: `/gioi-thieu/khoa/${khoaId}/bo-mon/${d.id}` }))}
        />
        <SupportCard
          title={khoa.name}
          lead="Liên hệ Văn phòng Khoa để biết thêm thông tin đội ngũ và học phần."
          cta={{ label: 'Trang Khoa', to: `/gioi-thieu/khoa/${khoaId}` }}
        />
      </>
    ),
    children: (
      <>
        <Panel title="Thông tin bộ môn" icon="grid" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[
            ['Trưởng bộ môn', dept.head],
            ['Trực thuộc', khoa.name],
            ['Quy mô đội ngũ', `${dept.size} giảng viên`],
          ]} />
        </Panel>
        <Panel title="Giới thiệu" icon="building">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{dept.desc}</p>
        </Panel>
        <Panel title="Hướng nghiên cứu trọng tâm" icon="target">
          <div className="about-chiprow">{dept.research.map((r) => <span key={r}>{r}</span>)}</div>
        </Panel>

        {lecturers.length > 0 && (
          <Panel title="Đội ngũ giảng viên" icon="users">
            <div className="about-lecs">
              {lecturers.map((lec) => (
                <Link key={lec.id} to={`/gioi-thieu/khoa/${khoaId}/bo-mon/${dept.id}/giang-vien/${lec.id}`} className="about-lec">
                  <span className="about-lec__photo humg-ph" data-ratio="1-1"><span>Ảnh</span></span>
                  <span className="about-lec__body">
                    <strong>{lec.name}</strong>
                    <em>{lec.position} · {lec.pubs} công bố</em>
                    <span className="about-lec__tags">{lec.fields.map((f) => <span key={f}>{f}</span>)}</span>
                  </span>
                  <Icon name="arrow-right" size={15} />
                </Link>
              ))}
            </div>
            <p className="about-muted" style={{ marginTop: 12 }}>
              Danh sách một số giảng viên tiêu biểu của bộ môn. Xem thêm hồ sơ nhà khoa học tại{' '}
              <Link to="/nghien-cuu/chuyen-gia">Danh sách chuyên gia</Link>.
            </p>
          </Panel>
        )}

        <Panel title="Đào tạo & học phần phụ trách" icon="graduation">
          <p className="about-muted" style={{ marginTop: 0 }}>
            Bộ môn tham gia giảng dạy các học phần cơ sở ngành và chuyên ngành thuộc {khoa.name}.
            Xem chi tiết chương trình và đề cương học phần tại <Link to="/hoc-tap/chuong-trinh-dao-tao">Chương trình đào tạo</Link>.
          </p>
        </Panel>
      </>
    ),
  })
}

/* ======================= HỒ SƠ GIẢNG VIÊN ======================= */
const GV_EDU = [
  'Tiến sĩ chuyên ngành phù hợp – đào tạo trong nước / nước ngoài.',
  'Thạc sĩ và Kỹ sư / Cử nhân tại Trường Đại học Mỏ - Địa chất hoặc cơ sở đào tạo uy tín.',
  'Thường xuyên tham gia bồi dưỡng chuyên môn, nghiệp vụ sư phạm và hội thảo khoa học.',
]
export function LecturerDetailPage() {
  const { khoaId, bmId, gvId } = useParams()
  const khoa = getUnit('khoa', khoaId) || units.khoa.list[0]
  const dept = getDepartment(khoaId, bmId) || (facultyDepartments[khoaId] || [])[0]
  const lec = getLecturer(khoaId, bmId, gvId) || (dept?.lecturers || [])[0]
  if (!lec) return shell({ title: 'Không tìm thấy giảng viên', crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }], children: <Panel><p>Giảng viên không tồn tại.</p></Panel> })
  const others = (dept.lecturers || []).filter((x) => x.id !== lec.id)
  return shell({
    title: lec.name,
    crumbs: [
      { label: 'Giới thiệu HUMG', to: '/gioi-thieu' },
      { label: 'Khoa / Viện đào tạo', to: '/gioi-thieu/khoa' },
      { label: khoa.name, to: `/gioi-thieu/khoa/${khoaId}` },
      { label: dept.name, to: `/gioi-thieu/khoa/${khoaId}/bo-mon/${dept.id}` },
      { label: lec.name },
    ],
    hero: <MetaBar items={[
      { icon: 'award', text: lec.position },
      { icon: 'building', text: dept.name },
      { icon: 'mail', text: lec.email },
    ]} />,
    sidebar: (
      <>
        <Panel title="Liên hệ" icon="phone" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[
            ['Đơn vị', dept.name],
            ['Chức vụ', lec.position],
            ['Email', lec.email],
            ['Điện thoại', lec.phone],
          ]} />
        </Panel>
        {others.length > 0 && (
          <Panel title="Giảng viên cùng bộ môn" icon="users">
            <NewsMini items={others.map((x) => ({ date: x.position, title: x.name, to: `/gioi-thieu/khoa/${khoaId}/bo-mon/${dept.id}/giang-vien/${x.id}` }))} />
          </Panel>
        )}
        <LinkList title="Tra cứu nhân sự" items={[
          { label: 'Danh sách chuyên gia', to: '/nghien-cuu/chuyen-gia' },
          { label: 'Danh bạ đơn vị & số máy', to: '/giang-vien/danh-ba' },
        ]} />
      </>
    ),
    children: (
      <>
        <Panel>
          <StatRow items={[
            { value: String(lec.pubs), label: 'Công bố khoa học' },
            { value: String(lec.fields.length), label: 'Hướng chuyên môn' },
            { value: dept.name.replace('Bộ môn ', ''), label: 'Bộ môn' },
          ]} />
        </Panel>
        <Panel title="Giới thiệu" icon="user">
          <div className="about-person is-big">
            <span className="about-person__photo humg-ph" data-ratio="1-1"><span>Chân dung</span></span>
            <div className="about-person__body">
              <strong>{lec.name}</strong>
              <span className="about-person__role">{lec.position} · {dept.name}</span>
              <p>
                {lec.name} là {lec.position.toLowerCase()} tại {dept.name}, {khoa.name}. Hướng chuyên môn chính gồm {lec.fields.join(', ')}.
                Giảng viên tham gia giảng dạy các học phần cơ sở ngành và chuyên ngành, hướng dẫn đồ án, luận văn và chủ trì / tham gia các đề tài nghiên cứu khoa học các cấp.
              </p>
              <div className="about-person__contact">
                <span><Icon name="mail" size={13} /> {lec.email}</span>
                <span><Icon name="phone" size={13} /> {lec.phone}</span>
              </div>
            </div>
          </div>
        </Panel>
        <Panel title="Hướng chuyên môn" icon="target">
          <div className="about-chiprow">{lec.fields.map((f) => <span key={f}>{f}</span>)}</div>
        </Panel>
        <Panel title="Quá trình đào tạo" icon="graduation">
          <ul className="about-funcs">{GV_EDU.map((t) => <li key={t}><Icon name="check" size={14} /> {t}</li>)}</ul>
        </Panel>
        <Panel title="Hoạt động chuyên môn" icon="newspaper">
          <ul className="about-funcs">
            <li><Icon name="check" size={14} /> Giảng dạy đại học và sau đại học tại {khoa.name}.</li>
            <li><Icon name="check" size={14} /> Chủ trì / tham gia đề tài NCKH cấp Trường, cấp Bộ; công bố trên tạp chí trong nước và quốc tế.</li>
            <li><Icon name="check" size={14} /> Hướng dẫn đồ án tốt nghiệp, luận văn thạc sĩ; tham gia hội đồng khoa học của bộ môn.</li>
          </ul>
          <p className="about-muted" style={{ marginTop: 12 }}>
            Danh mục công bố và đề tài chi tiết được cập nhật trong CSDL khoa học của Nhà trường.
          </p>
        </Panel>
      </>
    ),
  })
}

/* ======================= ĐỘI NGŨ CÁN BỘ, GIẢNG VIÊN (thông tin chung) ======================= */
export function FacultyStaffPage() {
  const khoaRows = units.khoa.list
    .filter((k) => facultyDepartments[k.id])
    .map((k) => {
      const ds = facultyDepartments[k.id]
      return [
        <Link key="t" to={`/gioi-thieu/khoa/${k.id}`}>{k.name}</Link>,
        String(ds.length),
        String(ds.reduce((n, d) => n + d.size, 0)),
        <Link key="a" to={`/gioi-thieu/khoa/${k.id}`} className="humg-link-more">Xem khoa</Link>,
      ]
    })
  return shell({
    title: 'Đội ngũ cán bộ, giảng viên',
    lead: 'Thông tin chung về quy mô, cơ cấu và chính sách phát triển đội ngũ cán bộ, giảng viên của Trường Đại học Mỏ - Địa chất.',
    crumbs: [{ label: 'Giới thiệu HUMG', to: '/gioi-thieu' }, { label: 'Đội ngũ cán bộ, giảng viên' }],
    sidebar: (
      <>
        <LinkList title="Xem thêm" items={[
          { label: 'Ban Giám hiệu', to: '/gioi-thieu/ban-giam-hieu' },
          { label: 'Cơ cấu tổ chức', to: '/gioi-thieu/co-cau-to-chuc' },
          { label: 'Khoa / Viện đào tạo', to: '/gioi-thieu/khoa' },
          { label: 'Danh sách chuyên gia NCKH', to: '/nghien-cuu/chuyen-gia' },
        ]} />
        <SupportCard title="Phòng Tổ chức – Cán bộ" lead="Thông tin tuyển dụng và chính sách cán bộ." phone="024.3838.3832" email="tccb@humg.edu.vn" cta={{ label: 'Trang liên hệ', to: '/lien-he' }} />
      </>
    ),
    children: (
      <>
        <Panel title="Đội ngũ trong những con số" icon="award">
          <StatRow items={[
            { value: '600+', label: 'Cán bộ, giảng viên' },
            { value: '65%', label: 'Trình độ Tiến sĩ trở lên' },
            { value: '90+', label: 'GS, PGS' },
            { value: '12', label: 'Khoa đào tạo' },
          ]} />
        </Panel>

        <Panel title="Tra cứu thông tin giảng viên / chuyên gia" icon="search">
          <p className="about-muted" style={{ marginTop: 0, marginBottom: 12 }}>
            Bạn có thể tra cứu đội ngũ theo các hướng sau:
          </p>
          <div className="about-fields">
            <Link to="/gioi-thieu/khoa" className="about-fields__item">
              <span className="about-fields__ic"><Icon name="graduation" size={20} /></span>
              Khoa → Bộ môn → Danh sách giảng viên
            </Link>
            <Link to="/nghien-cuu/chuyen-gia" className="about-fields__item">
              <span className="about-fields__ic"><Icon name="award" size={20} /></span>
              Danh sách chuyên gia &amp; hồ sơ khoa học
            </Link>
            <Link to="/giang-vien/danh-ba" className="about-fields__item">
              <span className="about-fields__ic"><Icon name="phone" size={20} /></span>
              Danh bạ đơn vị &amp; số máy nội bộ
            </Link>
          </div>
          <ul className="about-funcs" style={{ marginTop: 14 }}>
            <li><Icon name="check" size={14} /> <strong>Theo Khoa – Bộ môn:</strong> mở trang Khoa → tab Bộ môn → mở bộ môn để xem danh sách giảng viên và bấm vào từng người để xem hồ sơ.</li>
            <li><Icon name="check" size={14} /> <strong>Danh sách chuyên gia:</strong> lọc theo khoa, lĩnh vực; xem hướng nghiên cứu, công bố, h-index, email liên hệ.</li>
            <li><Icon name="check" size={14} /> <strong>Danh bạ:</strong> số điện thoại và hộp thư của Văn phòng Khoa, Phòng/Ban để liên hệ trực tiếp.</li>
          </ul>
        </Panel>

        <Panel title="Quy mô đội ngũ theo khoa" icon="building">
          <DataTable columns={['Khoa', 'Số bộ môn', 'Số GV (ước tính)', '']} rows={khoaRows} />
        </Panel>
        <Panel title="Chính sách phát triển đội ngũ" icon="check">
          <ul className="about-funcs">
            {[
              'Hỗ trợ đào tạo tiến sĩ trong nước và nước ngoài, sau tiến sĩ.',
              'Thu hút nhà khoa học trình độ cao, chuyên gia đầu ngành.',
              'Khen thưởng công bố quốc tế, đề tài và sản phẩm khoa học tiêu biểu.',
            ].map((t) => <li key={t}><Icon name="check" size={14} /> {t}</li>)}
          </ul>
        </Panel>
      </>
    ),
  })
}
