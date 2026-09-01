import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, StatRow, Chips, FilterBar, StepList, Faq,
  DocList, LinkList, SupportCard, NewsMini, HeroSearch, MetaBar, Pagination,
} from '../../components/ui/page.jsx'

const cnorm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
import {
  coopNav, coopFields, coopHub, partners, partnerCategories, getPartner,
  coopPrograms, coopProgramTypes, getCoopProgram,
  exchange, intlStudents, intlLecturers, opportunities,
} from '../../data/cooperation.js'
import './cooperation.css'

const NAV = <SectionNav title="Hợp tác" items={coopNav} />
const shell = (props) => <PageShell eyebrow="Hợp tác" sectionNav={NAV} accent="#0f766e" {...props} />

const SUPPORT = (
  <SupportCard
    title="Phòng Hợp tác quốc tế"
    lead="Đầu mối hợp tác trong nước và quốc tế của HUMG."
    phone="024.3838.3831"
    email="htqt@humg.edu.vn"
    cta={{ label: 'Gửi đề xuất hợp tác', to: '/lien-he' }}
  />
)

function StatusTag({ status }) {
  const map = { 'Đang thực hiện': 'is-run', 'Đang tuyển sinh': 'is-run', 'Đã nghiệm thu': 'is-done' }
  return <span className={`coop-status ${map[status] || ''}`}>{status}</span>
}

function mono(name) {
  return name.replace(/[^A-Za-zÀ-ỹ ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

/* ======================= TỔNG QUAN HỢP TÁC ======================= */
export function CoopHubPage() {
  return shell({
    title: 'Hợp tác & Hội nhập',
    lead: 'Thông tin về đối tác, chương trình liên kết, trao đổi và các cơ hội hợp tác trong nước và quốc tế của HUMG.',
    crumbs: [{ label: 'Hợp tác' }],
    hero: <HeroSearch placeholder="Tìm đối tác, chương trình hợp tác…" />,
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={coopHub.quickLinks} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Hợp tác trong những con số" icon="award"><StatRow items={coopHub.stats} /></Panel>

        <Panel title="Lĩnh vực hợp tác chủ yếu" icon="target">
          <div className="coop-chiprow">{coopFields.map((f) => <span key={f}>{f}</span>)}</div>
        </Panel>

        <Panel
          title="Đối tác nổi bật"
          icon="handshake"
          action={<Link to="/hop-tac/doi-tac" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <div className="coop-logogrid">
            {partners.slice(0, 8).map((p) => (
              <Link key={p.id} to={`/hop-tac/doi-tac/${p.id}`} className="coop-logo">
                <span className="coop-logo__mono">{mono(p.name)}</span>
                <span className="coop-logo__name">{p.name}</span>
                <span className="coop-logo__country"><Icon name={p.type === 'Quốc tế' ? 'globe' : 'map-pin'} size={11} /> {p.country}</span>
                <span className="coop-logo__go">Xem chi tiết <Icon name="arrow-right" size={12} /></span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Chương trình / dự án tiêu biểu"
          icon="layers"
          action={<Link to="/hop-tac/chuong-trinh-du-an" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <div className="coop-list">
            {coopPrograms.slice(0, 4).map((cp) => (
              <Link key={cp.id} to={`/hop-tac/chuong-trinh-du-an/${cp.id}`} className="coop-item">
                <span className="coop-item__body">
                  <strong>{cp.title}</strong>
                  <em>Đối tác: {cp.partner} · {cp.startYear}–{cp.endYear}</em>
                </span>
                <StatusTag status={cp.status} />
                <Icon name="arrow-right" size={15} />
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title={`Hoạt động hợp tác nổi bật năm ${coopHub.yearActivity.year}`} icon="globe">
          <div className="coop-yearstat">
            {coopHub.yearActivity.items.map((it) => (
              <div key={it.label} className="coop-ys">
                <strong>{it.value}</strong>
                <span>{it.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Tin tức & thông báo hợp tác"
          icon="bell"
          action={<Link to="/tin-tuc" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <NewsMini items={coopHub.notices.map((n) => ({ ...n, to: '/tin-tuc' }))} />
        </Panel>
      </>
    ),
  })
}

/* ======================= DANH SÁCH ĐỐI TÁC (dùng chung) ======================= */
export function PartnerListPage({ scope = 'all' }) {
  const scoped = useMemo(() => {
    if (scope === 'trong-nuoc') return partners.filter((p) => p.type === 'Trong nước')
    if (scope === 'quoc-te') return partners.filter((p) => p.type === 'Quốc tế')
    return partners
  }, [scope])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Tất cả')
  const [country, setCountry] = useState('Tất cả')
  const cats = ['Tất cả', ...partnerCategories.slice(1).filter((c) => scoped.some((p) => p.category === c))]
  const countries = ['Tất cả', ...Array.from(new Set(scoped.map((p) => p.country)))]
  const list = useMemo(() => scoped.filter((p) =>
    (cat === 'Tất cả' || p.category === cat)
    && (country === 'Tất cả' || p.country === country)
    && (!q || cnorm(`${p.name} ${p.country} ${p.fields.join(' ')}`).includes(cnorm(q)))), [scoped, q, cat, country])

  const meta = {
    all: { title: 'Danh sách đối tác', lead: 'Toàn bộ đối tác trong nước và quốc tế của Trường Đại học Mỏ - Địa chất.', crumb: 'Danh sách đối tác' },
    'trong-nuoc': { title: 'Đối tác trong nước', lead: 'Các doanh nghiệp, viện nghiên cứu, trường đại học và cơ quan quản lý trong nước.', crumb: 'Đối tác trong nước' },
    'quoc-te': { title: 'Đối tác quốc tế', lead: 'Các trường, viện và tổ chức quốc tế từ nhiều quốc gia trên thế giới.', crumb: 'Đối tác quốc tế' },
  }[scope]

  return shell({
    title: meta.title,
    lead: meta.lead,
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: meta.crumb }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Đối tác trong nước', to: '/hop-tac/doi-tac-trong-nuoc' },
          { label: 'Đối tác quốc tế', to: '/hop-tac/doi-tac-quoc-te' },
          { label: 'Chương trình / Dự án', to: '/hop-tac/chuong-trinh-du-an' },
          { label: 'Cơ hội hợp tác', to: '/hop-tac/co-hoi-hop-tac' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Thống kê" icon="award">
          <StatRow items={[
            { value: '128', label: 'Tổng số đối tác' },
            { value: String(partners.filter((p) => p.type === 'Trong nước').length * 6), label: 'Đối tác trong nước' },
            { value: '46', label: 'Quốc gia' },
            { value: '24', label: 'Chương trình liên kết' },
          ]} />
        </Panel>
        <Panel title="Danh sách đối tác" icon="handshake">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên, quốc gia, lĩnh vực…"
            selects={[
              { label: 'Quốc gia', value: country, onChange: setCountry, options: countries },
              { label: 'Loại đối tác', value: cat, onChange: setCat, options: cats },
            ]}
            count={list.length} total={scoped.length}
            onReset={() => { setQ(''); setCat('Tất cả'); setCountry('Tất cả') }}
          />
          <DataTable
            columns={['#', 'Tên đối tác', 'Quốc gia', 'Loại đối tác', 'Lĩnh vực hợp tác', 'Trạng thái', '']}
            rows={list.map((p, i) => [
              String(i + 1),
              <Link key="t" to={`/hop-tac/doi-tac/${p.id}`}>{p.name}</Link>,
              p.country,
              p.category,
              p.fields.slice(0, 2).join(', '),
              <span key="s" className="coop-status is-run">Đang hợp tác</span>,
              <Link key="a" to={`/hop-tac/doi-tac/${p.id}`} className="humg-link-more">Chi tiết</Link>,
            ])}
          />
          {list.length === 0 && <p className="coop-note">Không tìm thấy đối tác phù hợp.</p>}
        </Panel>
      </>
    ),
  })
}

/* ======================= CHI TIẾT ĐỐI TÁC ======================= */
export function PartnerDetailPage() {
  const { id } = useParams()
  const p = getPartner(id) || partners[0]
  return shell({
    title: p.name,
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: 'Danh sách đối tác', to: '/hop-tac/doi-tac' }, { label: p.name }],
    hero: <MetaBar items={[
      { icon: p.type === 'Quốc tế' ? 'globe' : 'map-pin', text: p.country },
      { icon: 'building', text: p.category },
      { icon: 'calendar', text: `Hợp tác từ ${p.since}` },
    ]} />,
    sidebar: (
      <>
        <Panel title="Thông tin đối tác" icon="grid" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[
            ['Quốc gia', p.country],
            ['Loại hình', p.category],
            ['Thiết lập quan hệ', String(p.since)],
            ['MOU gần nhất', String(p.mou)],
          ]} />
        </Panel>
        <Panel title="Đối tác khác" icon="handshake">
          <NewsMini items={partners.filter((x) => x.id !== p.id).slice(0, 5).map((x) => ({ date: x.country, title: x.name, to: `/hop-tac/doi-tac/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <Panel title="Giới thiệu" icon="building">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{p.desc}</p>
        </Panel>
        <Panel title="Lĩnh vực hợp tác" icon="target">
          <div className="coop-chiprow">{p.fields.map((f) => <span key={f}>{f}</span>)}</div>
        </Panel>
        <Panel title="Hoạt động hợp tác" icon="layers">
          <ul className="coop-check">{p.activities.map((a, i) => <li key={i}><Icon name="check" size={14} /> {a}</li>)}</ul>
        </Panel>
        {p.programs?.length > 0 && (
          <Panel title="Chương trình / dự án liên quan" icon="handshake">
            <ul className="coop-linkrows">
              {p.programs.map((name) => (
                <li key={name}>
                  <Link to="/hop-tac/chuong-trinh-du-an">
                    <span className="coop-linkrows__ic"><Icon name="layers" size={14} /></span>{name}<Icon name="arrow-right" size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </>
    ),
  })
}

/* ======================= CHƯƠNG TRÌNH / DỰ ÁN — DANH SÁCH ======================= */
export function CoopProgramListPage() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('Tất cả')
  const [status, setStatus] = useState('Tất cả')
  const statuses = ['Tất cả', ...Array.from(new Set(coopPrograms.map((p) => p.status)))]
  const list = useMemo(() => coopPrograms.filter((p) =>
    (type === 'Tất cả' || p.type === type)
    && (status === 'Tất cả' || p.status === status)
    && (!q || cnorm(`${p.title} ${p.partner} ${p.field}`).includes(cnorm(q)))), [q, type, status])

  return shell({
    title: 'Chương trình / Dự án hợp tác',
    lead: 'Các chương trình liên kết đào tạo, nghiên cứu chung, trao đổi và dự án tài trợ với đối tác trong và ngoài nước.',
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: 'Chương trình / Dự án' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Danh sách đối tác', to: '/hop-tac/doi-tac' },
          { label: 'Chương trình trao đổi', to: '/hop-tac/trao-doi' },
          { label: 'Mẫu đề xuất hợp tác', to: '/hoc-tap/bieu-mau' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Thống kê" icon="award">
          <StatRow items={[
            { value: String(coopPrograms.length), label: 'Chương trình / dự án' },
            { value: '24', label: 'Liên kết đào tạo' },
            { value: '46', label: 'Quốc gia' },
            { value: '350+', label: 'Lượt trao đổi / năm' },
          ]} />
        </Panel>
        <Panel title="Danh sách chương trình / dự án" icon="layers">
          <FilterBar
            search={q} onSearch={setQ} searchPlaceholder="Tìm theo tên chương trình, đối tác, lĩnh vực…"
            selects={[
              { label: 'Loại', value: type, onChange: setType, options: coopProgramTypes },
              { label: 'Trạng thái', value: status, onChange: setStatus, options: statuses },
            ]}
            count={list.length} total={coopPrograms.length}
            onReset={() => { setQ(''); setType('Tất cả'); setStatus('Tất cả') }}
          />
          <DataTable
            columns={['#', 'Tên chương trình / dự án', 'Đối tác', 'Thời gian', 'Trạng thái', '']}
            rows={list.map((p, i) => [
              String(i + 1),
              <Link key="t" to={`/hop-tac/chuong-trinh-du-an/${p.id}`}>{p.title}</Link>,
              p.partner,
              `${p.startYear}–${p.endYear}`,
              <StatusTag key="s" status={p.status} />,
              <Link key="a" to={`/hop-tac/chuong-trinh-du-an/${p.id}`} className="humg-link-more">Chi tiết</Link>,
            ])}
          />
          {list.length === 0 && <p className="coop-note">Không tìm thấy chương trình phù hợp.</p>}
        </Panel>
      </>
    ),
  })
}

/* ======================= CHƯƠNG TRÌNH — CHI TIẾT ======================= */
export function CoopProgramDetailPage() {
  const { id } = useParams()
  const p = getCoopProgram(id) || coopPrograms[0]
  const [tab, setTab] = useState('tong-quan')
  const tabs = [
    { key: 'tong-quan', label: 'Tổng quan' },
    { key: 'muc-tieu', label: 'Mục tiêu' },
    { key: 'ket-qua', label: 'Kết quả' },
  ]
  return shell({
    title: p.title,
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: 'Chương trình / Dự án', to: '/hop-tac/chuong-trinh-du-an' }, { label: p.title }],
    hero: <MetaBar items={[
      { icon: 'handshake', text: p.partner },
      { icon: 'layers', text: p.type },
      { icon: 'calendar', text: `${p.startYear} – ${p.endYear}` },
    ]} />,
    sidebar: (
      <>
        <Panel title="Tài liệu" icon="file"><DocList items={p.docs} /></Panel>
        <Panel title="Chương trình khác" icon="layers">
          <NewsMini items={coopPrograms.filter((x) => x.id !== p.id).slice(0, 4).map((x) => ({ date: x.type, title: x.title, to: `/hop-tac/chuong-trinh-du-an/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <Panel>
          <StatRow items={[
            { value: p.type, label: 'Loại hình' },
            { value: p.scope, label: 'Phạm vi' },
            { value: `${p.startYear}–${p.endYear}`, label: 'Thời gian' },
            { value: p.status, label: 'Trạng thái' },
          ]} />
        </Panel>
        <Panel flush>
          <div className="coop-tabs">
            {tabs.map((t) => (
              <button key={t.key} type="button" className={t.key === tab ? 'is-active' : ''} onClick={() => setTab(t.key)}>{t.label}</button>
            ))}
          </div>
          <div className="coop-tabbody">
            {tab === 'tong-quan' && (
              <>
                <p className="coop-lead">{p.summary}</p>
                <DataTable columns={['Mục', 'Chi tiết']} rows={[
                  ['Đối tác', p.partner],
                  ['Lĩnh vực', p.field],
                  ['Phạm vi', p.scope],
                  ['Thời gian', `${p.startYear} – ${p.endYear}`],
                ]} />
              </>
            )}
            {tab === 'muc-tieu' && <ul className="coop-check">{p.objectives.map((o, i) => <li key={i}><Icon name="check" size={14} /> {o}</li>)}</ul>}
            {tab === 'ket-qua' && <ul className="coop-check">{p.results.map((o, i) => <li key={i}><Icon name="award" size={14} /> {o}</li>)}</ul>}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= CHƯƠNG TRÌNH TRAO ĐỔI ======================= */
export function ExchangePage() {
  return shell({
    title: 'Chương trình trao đổi',
    lead: exchange.intro,
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: 'Chương trình trao đổi' }],
    sidebar: (
      <>
        <Panel title="Tài liệu" icon="file"><DocList items={exchange.docs} /></Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Các chương trình trao đổi" icon="users" flush>
          <DataTable
            columns={['Chương trình', 'Đối tác', 'Thời lượng', 'Đối tượng']}
            rows={exchange.programs.map((p) => [p.name, p.partner, p.dur, p.level])}
          />
        </Panel>
        <Panel title="Quy trình đăng ký" icon="layers"><StepList items={exchange.steps} /></Panel>
        <Panel title="Quyền lợi" icon="award">
          <ul className="coop-check">{exchange.benefits.map((b, i) => <li key={i}><Icon name="check" size={14} /> {b}</li>)}</ul>
        </Panel>
        <Panel title="Điều kiện tham gia" icon="shield">
          <ul className="coop-check">{exchange.eligibility.map((e, i) => <li key={i}><Icon name="check" size={14} /> {e}</li>)}</ul>
        </Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={exchange.faqs} /></Panel>
      </>
    ),
  })
}

/* ======================= SINH VIÊN QUỐC TẾ ======================= */
export function IntlStudentsPage() {
  return shell({
    title: 'Sinh viên quốc tế',
    lead: intlStudents.intro,
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: 'Sinh viên quốc tế' }],
    sidebar: (
      <>
        <Panel title="Tài liệu" icon="file"><DocList items={intlStudents.docs} /></Panel>
        <SupportCard title="Văn phòng Sinh viên quốc tế" lead="Hỗ trợ tuyển sinh, nhập học và đời sống." phone={intlStudents.contact.phone} email={intlStudents.contact.email} cta={{ label: 'Liên hệ', to: '/lien-he' }} />
      </>
    ),
    children: (
      <>
        <Panel title="Số liệu" icon="award"><StatRow items={intlStudents.stats} /></Panel>
        <Panel title="Các hình thức học tập" icon="graduation" flush>
          <DataTable columns={['Hình thức', 'Thời lượng', 'Ghi chú']} rows={intlStudents.programs.map((p) => [p.name, p.dur, p.note])} />
        </Panel>
        <Panel title="Quy trình nhập học" icon="layers"><StepList items={intlStudents.steps} /></Panel>
        <Panel title="Dịch vụ hỗ trợ" icon="heart">
          <TileGrid items={intlStudents.support.map((s) => ({ icon: s.icon, title: s.title, desc: s.text }))} cols={2} />
        </Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={intlStudents.faqs} /></Panel>
      </>
    ),
  })
}

/* ======================= GIẢNG VIÊN QUỐC TẾ ======================= */
export function IntlLecturersPage() {
  return shell({
    title: 'Giảng viên quốc tế',
    lead: intlLecturers.intro,
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: 'Giảng viên quốc tế' }],
    sidebar: (
      <>
        <Panel title="Văn bản, biểu mẫu" icon="file"><DocList items={intlLecturers.docs} /></Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Hình thức tham gia" icon="users">
          <ul className="coop-deflist">
            {intlLecturers.programs.map((p) => (
              <li key={p.name}><strong>{p.name}</strong><span>{p.text}</span></li>
            ))}
          </ul>
        </Panel>
        <Panel title="Quy trình mời chuyên gia" icon="layers"><StepList items={intlLecturers.steps} /></Panel>
        <Panel title="Quyền lợi & hỗ trợ" icon="award">
          <ul className="coop-check">{intlLecturers.benefits.map((b, i) => <li key={i}><Icon name="check" size={14} /> {b}</li>)}</ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= CƠ HỘI HỢP TÁC ======================= */
export function OpportunitiesPage() {
  return shell({
    title: 'Cơ hội hợp tác',
    lead: opportunities.intro,
    crumbs: [{ label: 'Hợp tác', to: '/hop-tac' }, { label: 'Cơ hội hợp tác' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Danh sách đối tác', to: '/hop-tac/doi-tac' },
          { label: 'Chương trình / Dự án', to: '/hop-tac/chuong-trinh-du-an' },
          { label: 'Mẫu đề xuất hợp tác', to: '/hoc-tap/bieu-mau' },
        ]} />
        <SupportCard title="Đề xuất hợp tác" lead="Gửi đề xuất tới Phòng Hợp tác quốc tế." phone={opportunities.contact.phone} email={opportunities.contact.email} cta={{ label: 'Gửi đề xuất', to: '/lien-he' }} />
      </>
    ),
    children: (
      <>
        <Panel title="Các hình thức hợp tác" icon="grid">
          <TileGrid items={opportunities.forms.map((f) => ({ icon: f.icon, title: f.title, desc: f.text }))} cols={2} />
        </Panel>
        <Panel title="Lĩnh vực ưu tiên" icon="target">
          <ul className="coop-check">{opportunities.priorities.map((p, i) => <li key={i}><Icon name="check" size={14} /> {p}</li>)}</ul>
        </Panel>
        <Panel title="Cam kết của HUMG" icon="shield">
          <ul className="coop-check">{opportunities.commitments.map((c, i) => <li key={i}><Icon name="check" size={14} /> {c}</li>)}</ul>
        </Panel>
        <Panel title="Quy trình đề xuất & ký kết" icon="layers"><StepList items={opportunities.steps} /></Panel>
      </>
    ),
  })
}
