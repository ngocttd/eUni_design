import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, StatRow, Chips, FilterBar, StepList, Faq,
  DocList, LinkList, SupportCard, NewsMini, HeroSearch, MetaBar,
} from '../../components/ui/page.jsx'

const lnorm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
const datePast = (d) => {
  const [dd, mm, yy] = d.split('/').map(Number)
  return new Date(yy, mm - 1, dd) < new Date(2026, 8, 1)
}
import {
  lifeNav, lifeHub, campus, activities, getActivity, clubs, clubCategories, getClub,
  youthUnion, sportsCulture, dorm, health, campusServices, studentSupport, jobs, getJob,
} from '../../data/life.js'
import './life.css'

const ACCENT = '#0a3d91'
const NAV = <SectionNav title="Đời sống" items={lifeNav} />
const shell = (props) => <PageShell eyebrow="Đời sống" sectionNav={NAV} accent={ACCENT} {...props} />

const SUPPORT = (
  <SupportCard
    title="Trung tâm Hỗ trợ sinh viên"
    lead="Đồng hành cùng sinh viên trong học tập và đời sống."
    phone="024.3838.3830"
    email="htsv@humg.edu.vn"
    cta={{ label: 'Gửi yêu cầu hỗ trợ', to: '/lien-he' }}
  />
)

/* ======================= ĐỜI SỐNG HUMG (HUB) ======================= */
export function LifeHubPage() {
  return shell({
    title: 'Đời sống HUMG',
    lead: lifeHub.intro,
    crumbs: [{ label: 'Đời sống' }],
    sidebar: (
      <>
        <Panel title="Sự kiện sắp diễn ra" icon="calendar" action={<Link to="/su-kien" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}>
          <ul className="life-events">
            {lifeHub.feed.slice(0, 4).map((f) => {
              const [d, m] = f.date.split('/')
              return (
                <li key={f.title}>
                  <span className="life-events__day"><strong>{d}</strong><em>Th{Number(m)}</em></span>
                  <span className="life-events__body"><strong>{f.title}</strong><em>{f.place}</em></span>
                </li>
              )
            })}
          </ul>
        </Panel>
        <LinkList title="Tiện ích nhanh" items={[
          { label: 'Đăng ký tham gia hoạt động', to: '/doi-song/hoat-dong-sinh-vien' },
          { label: 'Góp ý – Phản hồi', to: '/lien-he' },
          { label: 'Hỏi đáp', to: '/doi-song/ho-tro-sinh-vien' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <div className="life-banner">
          <span className="life-banner__img humg-ph" data-ratio="16-9"><span>Đời sống sinh viên HUMG</span></span>
          <div className="life-banner__overlay">
            <strong>HUMG – Nơi kiến tạo trải nghiệm và gắn kết</strong>
            <p>Hơn 200 câu lạc bộ, đội nhóm cùng chuỗi hoạt động thể thao – văn hóa – tình nguyện quanh năm.</p>
            <Link to="/su-kien" className="humg-btn humg-btn--light">Xem sự kiện</Link>
          </div>
        </div>

        <Panel title="Đời sống trong những con số" icon="award"><StatRow items={lifeHub.stats} /></Panel>

        <Panel title="Điểm nhấn đời sống sinh viên" icon="target"><TileGrid items={lifeHub.features} cols={3} /></Panel>

        <Panel title="Tin nổi bật" icon="bell" action={<Link to="/tin-tuc" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}>
          <div className="life-newscards">
            {lifeHub.feed.slice(0, 3).map((f) => (
              <Link key={f.title} to="/tin-tuc" className="life-newscard">
                <span className="life-newscard__img humg-ph" data-ratio="16-9"><span>Ảnh</span></span>
                <span className="life-newscard__tag">{f.tag}</span>
                <strong>{f.title}</strong>
                <em>{f.date} · {f.place}</em>
              </Link>
            ))}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= CAMPUS & CƠ SỞ VẬT CHẤT ======================= */
export function CampusPage() {
  return shell({
    title: 'Campus & Cơ sở vật chất',
    lead: campus.intro,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Campus & Cơ sở vật chất' }],
    sidebar: (
      <>
        <Panel title="Thời gian mở cửa" icon="clock" flush>
          <DataTable columns={['Khu vực', 'Giờ mở cửa']} rows={campus.hours} />
        </Panel>
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <div className="humg-ph life-cover" data-ratio="16-9"><span>Toàn cảnh khuôn viên HUMG</span></div>
        <Panel title="Cơ sở vật chất chính" icon="building">
          <div className="life-facil">
            {campus.facilities.map((f) => (
              <div key={f.name} className="life-facil__item">
                <span className="life-facil__ic"><Icon name="check" size={15} /></span>
                <div><strong>{f.name}</strong><em>{f.desc}</em></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Vị trí" icon="map-pin">
          <div className="humg-ph life-map" data-ratio="16-9"><span>Bản đồ · {campus.address}</span></div>
        </Panel>
      </>
    ),
  })
}

/* ======================= HOẠT ĐỘNG SINH VIÊN (PG-LIFE-02) ======================= */
export function ActivitiesPage() {
  const tags = ['Tất cả', ...Array.from(new Set(activities.map((a) => a.tag)))]
  const [tag, setTag] = useState('Tất cả')
  const [type, setType] = useState('Tất cả')
  const [q, setQ] = useState('')
  const list = useMemo(() => activities.filter((a) =>
    (tag === 'Tất cả' || a.tag === tag)
    && (type === 'Tất cả' || a.tag === type)
    && (!q || lnorm(`${a.title} ${a.place} ${a.organizer}`).includes(lnorm(q)))), [tag, type, q])
  return shell({
    title: 'Hoạt động sinh viên',
    lead: 'Sự kiện, phong trào, cuộc thi và hoạt động trải nghiệm của sinh viên HUMG.',
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Hoạt động sinh viên' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Câu lạc bộ sinh viên', to: '/doi-song/cau-lac-bo' },
          { label: 'Đoàn – Hội', to: '/doi-song/doan-hoi' },
          { label: 'Thể thao – Văn hóa', to: '/doi-song/the-thao-van-hoa' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Danh sách hoạt động" icon="calendar">
        <Chips options={tags.map((t) => ({ key: t, label: t }))} value={tag} onChange={setTag} />
        <FilterBar
          search={q} onSearch={setQ} searchPlaceholder="Tìm hoạt động theo tên, đơn vị tổ chức…"
          selects={[{ label: 'Loại hoạt động', value: type, onChange: setType, options: tags }]}
          count={list.length} total={activities.length}
          onReset={() => { setTag('Tất cả'); setType('Tất cả'); setQ('') }}
        />
        <DataTable
          columns={['#', 'Tên hoạt động', 'Loại', 'Thời gian', 'Đơn vị tổ chức', 'Trạng thái', '']}
          rows={list.map((a, i) => [
            String(i + 1),
            <Link key="t" to={`/doi-song/hoat-dong-sinh-vien/${a.slug}`}>{a.title}</Link>,
            a.tag,
            a.date,
            a.organizer,
            <span key="s" className={`life-tag ${datePast(a.date) ? 'is-done' : 'is-open'}`}>{datePast(a.date) ? 'Đã kết thúc' : 'Sắp diễn ra'}</span>,
            <Link key="a" to={`/doi-song/hoat-dong-sinh-vien/${a.slug}`} className="humg-link-more">Chi tiết</Link>,
          ])}
        />
        {list.length === 0 && <p className="life-note">Không có hoạt động phù hợp.</p>}
      </Panel>
    ),
  })
}

/* ======================= HOẠT ĐỘNG — CHI TIẾT ======================= */
export function ActivityDetailPage() {
  const { slug } = useParams()
  const a = getActivity(slug) || activities[0]
  return shell({
    title: a.title,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Hoạt động sinh viên', to: '/doi-song/hoat-dong-sinh-vien' }, { label: a.title }],
    hero: <MetaBar items={[
      { icon: 'calendar', text: a.date },
      { icon: 'map-pin', text: a.place },
      { icon: 'users', text: `${a.people} người tham gia` },
    ]} />,
    sidebar: (
      <>
        <Panel title="Thông tin" icon="grid" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[
            ['Loại hoạt động', a.tag],
            ['Thời gian', a.date],
            ['Địa điểm', a.place],
            ['Đơn vị tổ chức', a.organizer],
          ]} />
        </Panel>
        <Panel title="Hoạt động khác" icon="calendar">
          <NewsMini items={activities.filter((x) => x.slug !== a.slug).slice(0, 4).map((x) => ({ date: x.date, title: x.title, to: `/doi-song/hoat-dong-sinh-vien/${x.slug}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <div className="humg-ph life-cover" data-ratio="16-9"><span>Ảnh hoạt động · {a.title}</span></div>
        <Panel title="Nội dung" icon="calendar">
          {a.content.map((t, i) => <p key={i} style={{ margin: i ? '12px 0 0' : 0, fontSize: 14, lineHeight: 1.75 }}>{t}</p>)}
        </Panel>
        <Panel title="Chương trình" icon="clock">
          <ul className="life-agenda">
            {a.agenda.map((x, i) => <li key={i}><span className="life-agenda__time">{x.time}</span><span>{x.item}</span></li>)}
          </ul>
        </Panel>
        <Panel title={`Hình ảnh (${a.gallery})`} icon="image">
          <div className="life-gallery">
            {Array.from({ length: a.gallery }).map((_, i) => (
              <span key={i} className="humg-ph" data-ratio="1-1"><span>{i + 1}</span></span>
            ))}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= CÂU LẠC BỘ — DANH SÁCH ======================= */
export function ClubListPage() {
  const [cat, setCat] = useState('Tất cả')
  const list = useMemo(() => (cat === 'Tất cả' ? clubs : clubs.filter((c) => c.category === cat)), [cat])
  return shell({
    title: 'Câu lạc bộ sinh viên',
    lead: 'Hơn 200 câu lạc bộ, đội, nhóm học thuật, thể thao, văn hóa – nghệ thuật và tình nguyện.',
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Câu lạc bộ sinh viên' }],
    hero: <HeroSearch placeholder="Tìm câu lạc bộ theo tên, lĩnh vực…" />,
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Hoạt động sinh viên', to: '/doi-song/hoat-dong-sinh-vien' },
          { label: 'Đoàn – Hội', to: '/doi-song/doan-hoi' },
          { label: 'Đăng ký thành lập CLB', to: '/hoc-tap/bieu-mau' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title={`Danh sách CLB (${list.length})`} icon="target">
        <Chips options={clubCategories.map((c) => ({ key: c, label: c }))} value={cat} onChange={setCat} />
        <div className="life-clubs">
          {list.map((c) => (
            <Link key={c.id} to={`/doi-song/cau-lac-bo/${c.id}`} className="life-club">
              <span className="life-club__cover humg-ph" data-ratio="16-9"><span>{c.name}</span></span>
              <span className="life-club__cat">{c.category}</span>
              <div className="life-club__body">
                <strong>{c.name}</strong>
                <p>{c.desc}</p>
                <span className="life-club__meta"><Icon name="users" size={12} /> {c.members} thành viên · Thành lập {c.founded}</span>
              </div>
            </Link>
          ))}
        </div>
      </Panel>
    ),
  })
}

/* ======================= CÂU LẠC BỘ — CHI TIẾT ======================= */
export function ClubDetailPage() {
  const { id } = useParams()
  const c = getClub(id) || clubs[0]
  return shell({
    title: c.name,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Câu lạc bộ sinh viên', to: '/doi-song/cau-lac-bo' }, { label: c.name }],
    hero: <MetaBar items={[
      { icon: 'target', text: c.category },
      { icon: 'users', text: `${c.members} thành viên` },
      { icon: 'calendar', text: `Thành lập ${c.founded}` },
    ]} />,
    sidebar: (
      <>
        <Panel title="Thông tin CLB" icon="grid" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[
            ['Lĩnh vực', c.category],
            ['Chủ nhiệm', c.lead],
            ['Số thành viên', String(c.members)],
            ['Năm thành lập', String(c.founded)],
            ['Lịch sinh hoạt', c.schedule],
            ['Fanpage', c.fanpage],
          ]} />
        </Panel>
        <SupportCard title="Tham gia CLB" lead="Liên hệ Chủ nhiệm hoặc theo dõi fanpage để biết lịch tuyển thành viên." cta={{ label: 'Liên hệ tham gia', to: '/lien-he' }} />
        <Panel title="CLB khác" icon="target">
          <NewsMini items={clubs.filter((x) => x.id !== c.id).slice(0, 5).map((x) => ({ date: x.category, title: x.name, to: `/doi-song/cau-lac-bo/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <div className="humg-ph life-cover" data-ratio="16-9"><span>Hình ảnh hoạt động · {c.name}</span></div>
        <Panel title="Giới thiệu" icon="target">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{c.desc}</p>
          <p className="life-note" style={{ marginTop: 10 }}><Icon name="clock" size={13} /> {c.schedule}</p>
        </Panel>
        <Panel title="Hoạt động thường xuyên" icon="calendar">
          <ul className="life-check">{c.activities.map((a, i) => <li key={i}><Icon name="check" size={14} /> {a}</li>)}</ul>
        </Panel>
        <Panel title="Thành tích tiêu biểu" icon="award">
          <ul className="life-check">{c.achievements.map((a, i) => <li key={i}><Icon name="award" size={14} /> {a}</li>)}</ul>
        </Panel>
        <Panel title={`Hình ảnh (${c.gallery})`} icon="image">
          <div className="life-gallery">
            {Array.from({ length: c.gallery }).map((_, i) => (
              <span key={i} className="humg-ph" data-ratio="1-1"><span>{i + 1}</span></span>
            ))}
          </div>
        </Panel>
      </>
    ),
  })
}

/* ======================= ĐOÀN – HỘI ======================= */
export function YouthUnionPage() {
  return shell({
    title: 'Đoàn Thanh niên – Hội Sinh viên',
    lead: youthUnion.intro,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Đoàn – Hội' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Hoạt động sinh viên', to: '/doi-song/hoat-dong-sinh-vien' },
          { label: 'Câu lạc bộ sinh viên', to: '/doi-song/cau-lac-bo' },
          { label: 'Thể thao – Văn hóa', to: '/doi-song/the-thao-van-hoa' },
        ]} />
        <SupportCard title="Văn phòng Đoàn – Hội" lead="Tầng 1, Nhà A" phone={youthUnion.contact.phone} email={youthUnion.contact.email} cta={{ label: 'Liên hệ', to: '/lien-he' }} />
      </>
    ),
    children: (
      <>
        <Panel title="Cơ cấu tổ chức" icon="layers">
          <ul className="life-deflist">
            {youthUnion.bodies.map((b) => <li key={b.name}><strong>{b.name}</strong><span>{b.desc}</span></li>)}
          </ul>
        </Panel>
        <Panel title="Các phong trào tiêu biểu" icon="rocket">
          <ul className="life-check">{youthUnion.movements.map((m, i) => <li key={i}><Icon name="check" size={14} /> {m}</li>)}</ul>
        </Panel>
        <Panel title="Thành tích" icon="award">
          <ul className="life-check">{youthUnion.achievements.map((a, i) => <li key={i}><Icon name="award" size={14} /> {a}</li>)}</ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= THỂ THAO – VĂN HÓA ======================= */
export function SportsCulturePage() {
  return shell({
    title: 'Thể thao – Văn hóa',
    lead: sportsCulture.intro,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Thể thao – Văn hóa' }],
    sidebar: SUPPORT,
    children: (
      <>
        <Panel title="Cơ sở vật chất thể thao" icon="grid">
          <div className="life-chiprow">{sportsCulture.facilities.map((f) => <span key={f}>{f}</span>)}</div>
        </Panel>
        <Panel title="Sự kiện thường niên" icon="calendar" flush>
          <DataTable columns={['Sự kiện', 'Thời gian']} rows={sportsCulture.events.map((e) => [e.name, e.time])} />
        </Panel>
        <Panel title="Các đội tuyển sinh viên" icon="users">
          <div className="life-chiprow">{sportsCulture.teams.map((t) => <span key={t}>{t}</span>)}</div>
        </Panel>
      </>
    ),
  })
}

/* ======================= KÝ TÚC XÁ ======================= */
export function DormPage() {
  return shell({
    title: 'Ký túc xá HUMG',
    lead: dorm.intro,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Ký túc xá' }],
    sidebar: (
      <>
        <Panel title="Thông tin nhanh" icon="grid">
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}><strong>Phí:</strong> {dorm.fee}</p>
        </Panel>
        <SupportCard title="Ban Quản lý Ký túc xá" lead="Hỗ trợ đăng ký, nhận phòng, đời sống nội trú." phone={dorm.contact.phone} email={dorm.contact.email} cta={{ label: 'Liên hệ', to: '/lien-he' }} />
      </>
    ),
    children: (
      <>
        <div className="humg-ph life-cover" data-ratio="16-9"><span>Khu ký túc xá HUMG</span></div>
        <Panel title="Các khu ký túc xá" icon="building">
          <div className="life-zones">
            {dorm.zones.map((z) => (
              <div key={z.name} className="life-zone">
                <strong>{z.name}</strong>
                <span>{z.type}</span>
                <em>{z.note}</em>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Tiện nghi & dịch vụ" icon="heart">
          <ul className="life-check">{dorm.amenities.map((a, i) => <li key={i}><Icon name="check" size={14} /> {a}</li>)}</ul>
        </Panel>
        <Panel title="Quy trình đăng ký ở ký túc xá" icon="layers"><StepList items={dorm.steps} /></Panel>
        <Panel title="Nội quy cơ bản" icon="shield">
          <ul className="life-check">{dorm.rules.map((r, i) => <li key={i}><Icon name="check" size={14} /> {r}</li>)}</ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= Y TẾ – CHĂM SÓC SỨC KHỎE ======================= */
export function HealthPage() {
  return shell({
    title: 'Y tế – Chăm sóc sức khỏe',
    lead: health.intro,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Y tế – Chăm sóc sức khỏe' }],
    sidebar: (
      <>
        <Panel title="Giờ làm việc" icon="clock" flush>
          <DataTable columns={['Ngày', 'Giờ']} rows={health.schedule} />
        </Panel>
        <SupportCard title="Trạm Y tế HUMG" lead={`Cấp cứu: ${health.contact.emergency}`} phone={health.contact.phone} email={health.contact.email} />
      </>
    ),
    children: (
      <>
        <Panel title="Dịch vụ y tế" icon="shield">
          <ul className="life-check">{health.services.map((s, i) => <li key={i}><Icon name="check" size={14} /> {s}</li>)}</ul>
        </Panel>
        <Panel title="Bảo hiểm y tế sinh viên" icon="file">
          <ul className="life-check">{health.insurance.map((s, i) => <li key={i}><Icon name="check" size={14} /> {s}</li>)}</ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= DỊCH VỤ CAMPUS ======================= */
export function CampusServicesPage() {
  return shell({
    title: 'Dịch vụ Campus',
    lead: 'Các dịch vụ tiện ích phục vụ học tập và đời sống hằng ngày của sinh viên trong khuôn viên Trường.',
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Dịch vụ Campus' }],
    sidebar: (
      <>
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Ký túc xá', to: '/doi-song/ky-tuc-xa' },
          { label: 'Y tế – Chăm sóc sức khỏe', to: '/doi-song/y-te' },
          { label: 'Hỗ trợ sinh viên', to: '/doi-song/ho-tro-sinh-vien' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <Panel title="Các dịch vụ trong khuôn viên" icon="grid">
        <div className="life-svc">
          {campusServices.map((s) => (
            <div key={s.title} className="life-svc__item">
              <span className="life-svc__ic"><Icon name={s.icon} size={18} /></span>
              <div>
                <strong>{s.title}</strong>
                <span>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    ),
  })
}

/* ======================= HỖ TRỢ SINH VIÊN ======================= */
export function StudentSupportPage() {
  return shell({
    title: 'Hỗ trợ sinh viên',
    lead: studentSupport.intro,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Hỗ trợ sinh viên' }],
    sidebar: (
      <>
        <SupportCard title="Đường dây hỗ trợ" lead={studentSupport.hotline} cta={{ label: 'Gửi yêu cầu', to: '/lien-he' }} />
        <LinkList title="Liên kết nhanh" items={[
          { label: 'Học phí & Học bổng', to: '/hoc-tap/hoc-phi-hoc-bong' },
          { label: 'Hướng dẫn học tập', to: '/hoc-tap/huong-dan' },
          { label: 'Việc làm – Khởi nghiệp', to: '/doi-song/viec-lam-khoi-nghiep' },
        ]} />
      </>
    ),
    children: (
      <>
        <Panel title="Các kênh hỗ trợ" icon="grid">
          <TileGrid items={studentSupport.channels} cols={2} />
        </Panel>
        <Panel title="Quy trình tiếp nhận & xử lý" icon="layers"><StepList items={studentSupport.steps} /></Panel>
        <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={studentSupport.faqs} /></Panel>
      </>
    ),
  })
}

/* ======================= VIỆC LÀM – KHỞI NGHIỆP ======================= */
export function JobsPage() {
  const TABS = ['Việc làm', 'Thực tập', 'Khởi nghiệp', 'Tin tức']
  const [tab, setTab] = useState('Việc làm')
  const [q, setQ] = useState('')
  const [kind, setKind] = useState('Tất cả')
  const kinds = ['Tất cả', ...Array.from(new Set(jobs.listings.map((j) => j.type)))]
  const list = useMemo(() => jobs.listings.filter((j) =>
    (kind === 'Tất cả' || j.type === kind)
    && (!q || lnorm(`${j.title} ${j.company} ${j.place}`).includes(lnorm(q)))), [q, kind])
  return shell({
    title: 'Việc làm – Khởi nghiệp',
    lead: jobs.intro,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Việc làm – Khởi nghiệp' }],
    sidebar: (
      <>
        <Panel title="Gợi ý dành cho bạn" icon="briefcase">
          <ul className="life-mini">
            {jobs.listings.slice(0, 3).map((j) => (
              <li key={j.id}>
                <strong><Link to={`/doi-song/viec-lam-khoi-nghiep/${j.id}`}>{j.title}</Link></strong>
                <em>{j.company} · {j.place}</em>
              </li>
            ))}
          </ul>
        </Panel>
        <LinkList title="Tài nguyên nghề nghiệp" items={[
          { label: 'Kỹ năng tìm việc', to: '/doi-song/ho-tro-sinh-vien' },
          { label: 'Viết CV chuyên nghiệp', to: '/doi-song/ho-tro-sinh-vien' },
          { label: 'Phỏng vấn thành công', to: '/doi-song/ho-tro-sinh-vien' },
        ]} />
        {SUPPORT}
      </>
    ),
    children: (
      <>
        <Panel title="Việc làm & Khởi nghiệp trong những con số" icon="award"><StatRow items={jobs.stats} /></Panel>
        <Panel title="Cơ hội việc làm & khởi nghiệp" icon="briefcase">
          <Chips options={TABS.map((t) => ({ key: t, label: t }))} value={tab} onChange={setTab} />

          {(tab === 'Việc làm' || tab === 'Thực tập') && (
            <>
              <FilterBar
                search={q} onSearch={setQ} searchPlaceholder="Tìm theo vị trí, công ty, địa điểm…"
                selects={[{ label: 'Hình thức', value: kind, onChange: setKind, options: kinds }]}
                count={list.length} total={jobs.listings.length}
                onReset={() => { setQ(''); setKind('Tất cả') }}
              />
              <DataTable
                columns={['Vị trí tuyển dụng', 'Công ty', 'Hình thức', 'Địa điểm', 'Mức lương', 'Hạn nộp', '']}
                rows={list.map((j) => [
                  <Link key="t" to={`/doi-song/viec-lam-khoi-nghiep/${j.id}`}>{j.title}</Link>,
                  j.company, j.type, j.place, j.salary,
                  <span key="d" className="life-job__deadline">{j.deadline}</span>,
                  <Link key="a" to={`/doi-song/viec-lam-khoi-nghiep/${j.id}`} className="humg-link-more">Chi tiết</Link>,
                ])}
              />
              {list.length === 0 && <p className="life-note">Không có tin phù hợp.</p>}
            </>
          )}

          {tab === 'Khởi nghiệp' && (
            <ul className="life-check">
              <li><Icon name="rocket" size={14} /> Vườn ươm khởi nghiệp HUMG: không gian làm việc chung, cố vấn và kết nối vốn.</li>
              <li><Icon name="rocket" size={14} /> Cuộc thi Startup HUMG thường niên và các chương trình tăng tốc khởi nghiệp.</li>
              <li><Icon name="rocket" size={14} /> Khóa học tinh thần doanh nhân, thiết kế mô hình kinh doanh và gọi vốn.</li>
            </ul>
          )}

          {tab === 'Tin tức' && (
            <NewsMini items={[
              { date: '20/05/2026', title: 'Ngày hội việc làm & Kết nối doanh nghiệp 2026', to: '/su-kien' },
              { date: 'Hằng quý', title: 'Talkshow định hướng nghề nghiệp theo nhóm ngành', to: '/su-kien' },
            ]} />
          )}
        </Panel>
        <Panel title="Dịch vụ hỗ trợ nghề nghiệp" icon="grid">
          <TileGrid items={jobs.services} cols={2} />
        </Panel>
      </>
    ),
  })
}

/* ======================= VIỆC LÀM — CHI TIẾT TIN TUYỂN DỤNG ======================= */
export function JobDetailPage() {
  const { id } = useParams()
  const j = getJob(id) || jobs.listings[0]
  return shell({
    title: j.title,
    crumbs: [{ label: 'Đời sống', to: '/doi-song' }, { label: 'Việc làm – Khởi nghiệp', to: '/doi-song/viec-lam-khoi-nghiep' }, { label: j.title }],
    hero: (
      <div className="life-jobhead">
        <MetaBar items={[
          { icon: 'briefcase', text: j.company },
          { icon: 'map-pin', text: j.place },
          { icon: 'clock', text: `Hạn nộp: ${j.deadline}` },
        ]} />
        <Link to="/lien-he" className="humg-btn humg-btn--accent">Ứng tuyển ngay <Icon name="arrow-right" size={15} /></Link>
      </div>
    ),
    sidebar: (
      <>
        <Panel title="Thông tin tuyển dụng" icon="grid" flush>
          <DataTable columns={['Mục', 'Chi tiết']} rows={[
            ['Công ty', j.company],
            ['Địa điểm', j.place],
            ['Hình thức', j.type],
            ['Mức lương', j.salary],
            ['Số lượng', j.quantity],
            ['Hạn nộp', j.deadline],
          ]} />
        </Panel>
        <Panel title="Tin tuyển dụng khác" icon="briefcase">
          <NewsMini items={jobs.listings.filter((x) => x.id !== j.id).slice(0, 4).map((x) => ({ date: x.company, title: x.title, to: `/doi-song/viec-lam-khoi-nghiep/${x.id}` }))} />
        </Panel>
      </>
    ),
    children: (
      <>
        <Panel title="Mô tả công việc" icon="briefcase">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75 }}>{j.description}</p>
        </Panel>
        <Panel title="Yêu cầu ứng viên" icon="check">
          <ul className="life-check">{j.requirements.map((r, i) => <li key={i}><Icon name="check" size={14} /> {r}</li>)}</ul>
        </Panel>
        <Panel title="Quyền lợi" icon="award">
          <ul className="life-check">{j.benefits.map((b, i) => <li key={i}><Icon name="award" size={14} /> {b}</li>)}</ul>
        </Panel>
        <Panel title="Cách thức ứng tuyển" icon="file">
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7 }}>{j.applyNote}</p>
        </Panel>
      </>
    ),
  })
}
