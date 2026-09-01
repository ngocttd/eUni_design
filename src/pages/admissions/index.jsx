import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, DataTable, StatRow, StepList, Faq, DocList, LinkList, SupportCard, NewsMini, MediaCard,
} from '../../components/ui/page.jsx'
import { eduNav } from '../../data/education.js'
import {
  admission, admissionsNav, admissionCombos, admissionTimeline, admissionDossier,
  admissionBenchmarks, admissionVideos, admissionAdvisory, admissionRegulations,
} from '../../data/admissions.js'
import './admissions.css'

const NAV = <SectionNav title="Học tập" items={eduNav} />
const SUB = <LinkList title="Mục tuyển sinh" items={admissionsNav} />
const SUPPORT = (
  <SupportCard
    title="Tư vấn tuyển sinh"
    lead="Hotline 08:00 – 21:00 hằng ngày."
    phone="0888 123 456"
    email="tuyensinh@humg.edu.vn"
    cta={{ label: 'Đăng ký tư vấn', to: '/hoc-tap/tuyen-sinh/tu-van' }}
  />
)
const crumbs = (label) => [
  { label: 'Học tập', to: '/hoc-tap' },
  { label: 'Tuyển sinh', to: '/hoc-tap/tuyen-sinh' },
  ...(label ? [{ label }] : []),
]
const shell = (props) => (
  <PageShell sectionNav={NAV} accent="#0284c7" eyebrow="Học tập"
    sidebar={<>{SUB}{SUPPORT}</>} {...props} />
)

/* ======================= TỔNG QUAN TUYỂN SINH ======================= */
export function AdmissionsHubPage() {
  return shell({
    title: 'Tuyển sinh đại học chính quy',
    lead: 'Thông tin tuyển sinh hệ đại học chính quy của HUMG: chỉ tiêu, phương thức xét tuyển, ngành đào tạo, hồ sơ, thời gian và hướng dẫn đăng ký.',
    crumbs: crumbs(),
    children: (
      <>
        <Panel title="Tuyển sinh 2026 trong những con số" icon="award">
          <StatRow items={[
            { value: '2.850', label: 'Chỉ tiêu ĐH chính quy 2026' },
            { value: String(admissionCombos.rows.length), label: 'Ngành đào tạo' },
            { value: String(admission.methods.length), label: 'Phương thức xét tuyển' },
            { value: '20/08/2026', label: 'Dự kiến công bố điểm chuẩn' },
          ]} />
        </Panel>

        <Panel
          title="Phương thức xét tuyển năm 2026"
          icon="layers"
          action={<Link to="/hoc-tap/tuyen-sinh/phuong-thuc" className="humg-link-more">Chi tiết <Icon name="arrow-right" size={14} /></Link>}
        >
          <StepList items={admission.methods} />
        </Panel>

        <Panel
          title="Mốc thời gian quan trọng"
          icon="calendar"
          action={<Link to="/hoc-tap/tuyen-sinh/thoi-gian" className="humg-link-more">Lịch đầy đủ <Icon name="arrow-right" size={14} /></Link>}
        >
          <ol className="adm-timeline">
            {admissionTimeline.slice(0, 5).map((t) => (
              <li key={t.phase}>
                <span className="adm-timeline__time">{t.time}</span>
                <span className="adm-timeline__body">
                  <strong>{t.phase}</strong>
                  {t.note && <em>{t.note}</em>}
                </span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel
          title="Tin tức & Thông báo tuyển sinh"
          icon="newspaper"
          action={<Link to="/tin-tuc" className="humg-link-more">Xem tất cả <Icon name="arrow-right" size={14} /></Link>}
        >
          <NewsMini items={admission.news} />
        </Panel>

        <Panel title="Tài liệu tuyển sinh" icon="file"><DocList items={admission.docs} /></Panel>
      </>
    ),
  })
}

/* ======================= THÔNG TIN TUYỂN SINH ======================= */
export function AdmInfoPage() {
  return shell({
    title: 'Thông tin tuyển sinh 2026',
    lead: 'Chỉ tiêu dự kiến, ngành đào tạo và tổ hợp xét tuyển năm 2026.',
    crumbs: crumbs('Thông tin tuyển sinh'),
    children: (
      <>
        <Panel title="Chỉ tiêu dự kiến năm 2026" icon="book" flush>
          <DataTable columns={admission.quota.columns} rows={admission.quota.rows} />
        </Panel>
        <Panel title="Ngành đào tạo & tổ hợp xét tuyển" icon="graduation" flush>
          <DataTable columns={admissionCombos.columns} rows={admissionCombos.rows} />
        </Panel>
        <Panel title="Tài liệu tuyển sinh" icon="file"><DocList items={admission.docs} /></Panel>
      </>
    ),
  })
}

/* ======================= PHƯƠNG THỨC XÉT TUYỂN ======================= */
export function AdmMethodsPage() {
  return shell({
    title: 'Phương thức xét tuyển',
    lead: 'HUMG sử dụng 5 phương thức xét tuyển vào hệ đại học chính quy năm 2026.',
    crumbs: crumbs('Phương thức xét tuyển'),
    children: (
      <>
        <Panel title="Các phương thức xét tuyển" icon="layers"><StepList items={admission.methods} /></Panel>
        <Panel title="Lưu ý" icon="bell">
          <ul className="adm-check">
            <li><Icon name="check" size={14} /> Thí sinh được đăng ký nhiều phương thức; hệ thống xét theo phương thức có lợi nhất.</li>
            <li><Icon name="check" size={14} /> Điểm ưu tiên khu vực và đối tượng áp dụng theo Quy chế tuyển sinh hiện hành.</li>
            <li><Icon name="check" size={14} /> Ngưỡng đảm bảo chất lượng đầu vào công bố sau khi có kết quả thi tốt nghiệp THPT.</li>
          </ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= HỒ SƠ & GIẤY TỜ ======================= */
export function AdmDossierPage() {
  return shell({
    title: 'Hồ sơ & Giấy tờ',
    lead: 'Danh mục hồ sơ cần chuẩn bị khi đăng ký xét tuyển vào HUMG.',
    crumbs: crumbs('Hồ sơ & Giấy tờ'),
    children: (
      <>
        <Panel title="Hồ sơ chung" icon="file">
          <ul className="adm-check">
            {admissionDossier.common.map((x) => <li key={x}><Icon name="check" size={14} /> {x}</li>)}
          </ul>
        </Panel>
        <Panel title="Hồ sơ theo phương thức đặc thù" icon="layers" flush>
          <DataTable columns={['Phương thức', 'Giấy tờ bổ sung']} rows={admissionDossier.bySpecial} />
        </Panel>
        <Panel title="Nơi nộp hồ sơ" icon="map-pin">
          <p className="adm-prose">{admissionDossier.submit}</p>
        </Panel>
      </>
    ),
  })
}

/* ======================= THỜI GIAN TUYỂN SINH ======================= */
export function AdmTimelinePage() {
  return shell({
    title: 'Thời gian tuyển sinh 2026',
    lead: 'Các mốc thời gian quan trọng trong kỳ tuyển sinh đại học chính quy năm 2026.',
    crumbs: crumbs('Thời gian tuyển sinh'),
    children: (
      <Panel title="Lịch tuyển sinh" icon="calendar">
        <ol className="adm-timeline">
          {admissionTimeline.map((t) => (
            <li key={t.phase}>
              <span className="adm-timeline__time">{t.time}</span>
              <span className="adm-timeline__body">
                <strong>{t.phase}</strong>
                {t.note && <em>{t.note}</em>}
              </span>
            </li>
          ))}
        </ol>
      </Panel>
    ),
  })
}

/* ======================= HƯỚNG DẪN ĐĂNG KÝ ======================= */
export function AdmGuidePage() {
  return shell({
    title: 'Hướng dẫn đăng ký xét tuyển',
    lead: 'Quy trình đăng ký xét tuyển trực tuyến trên Cổng tuyển sinh HUMG và Cổng của Bộ GD&ĐT.',
    crumbs: crumbs('Hướng dẫn đăng ký'),
    children: (
      <>
        <Panel title="Quy trình đăng ký trực tuyến" icon="check">
          <StepList items={[
            { title: 'Tạo tài khoản trên Cổng tuyển sinh HUMG', text: 'Dùng số CCCD và email cá nhân; xác thực qua mã OTP.' },
            { title: 'Khai hồ sơ & tải minh chứng', text: 'Nhập thông tin cá nhân, kết quả học tập; tải học bạ, chứng chỉ, giấy tờ ưu tiên.' },
            { title: 'Chọn ngành / phương thức & nộp lệ phí', text: 'Sắp xếp nguyện vọng theo thứ tự ưu tiên; nộp lệ phí xét tuyển trực tuyến.' },
            { title: 'Đăng ký nguyện vọng trên Cổng Bộ GD&ĐT', text: 'Với phương thức dùng điểm thi THPT, đăng ký trong thời gian Bộ quy định.' },
            { title: 'Theo dõi kết quả & xác nhận nhập học', text: 'Nhận thông báo qua email/tài khoản; xác nhận nhập học trực tuyến đúng hạn.' },
          ]} />
        </Panel>
        <Panel title="Tài liệu hướng dẫn" icon="file">
          <DocList items={[
            { name: 'Hướng dẫn đăng ký xét tuyển trực tuyến', meta: 'PDF · 1.5 MB' },
            { name: 'Video hướng dẫn khai hồ sơ trên Cổng HUMG', meta: 'MP4 · 12 phút' },
            { name: 'Mẫu đơn đăng ký xét tuyển', meta: 'DOCX · 256 KB' },
          ]} />
        </Panel>
      </>
    ),
  })
}

/* ======================= TRA CỨU ĐIỂM CHUẨN ======================= */
export function AdmBenchmarkPage() {
  const [year, setYear] = useState(admissionBenchmarks.years[0])
  const rows = admissionBenchmarks.data[year] || []
  return shell({
    title: 'Tra cứu điểm chuẩn các năm',
    lead: `Điểm trúng tuyển theo ${admissionBenchmarks.method.toLowerCase()} các năm gần đây.`,
    crumbs: crumbs('Tra cứu điểm chuẩn'),
    children: (
      <Panel title="Điểm chuẩn theo ngành" icon="award">
        <label className="adm-select">
          <span>Năm tuyển sinh</span>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {admissionBenchmarks.years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </label>
        <DataTable columns={['Ngành', `Điểm chuẩn ${year} (A00)`, `Điểm chuẩn ${year} (D01)`]} rows={rows} />
        <p className="adm-muted">Điểm chuẩn mang tính tham khảo; ngưỡng nhận hồ sơ và điểm trúng tuyển chính thức công bố theo từng đợt.</p>
      </Panel>
    ),
  })
}

/* ======================= QUY CHẾ TUYỂN SINH ======================= */
export function AdmRegulationsPage() {
  return shell({
    title: 'Quy chế tuyển sinh',
    lead: 'Đề án tuyển sinh, quy chế và các văn bản liên quan đến tuyển sinh đại học chính quy.',
    crumbs: crumbs('Quy chế tuyển sinh'),
    children: (
      <>
        <Panel title="Văn bản, đề án" icon="file"><DocList items={admissionRegulations} /></Panel>
        <Panel title="Nội dung chính" icon="shield">
          <ul className="adm-check">
            <li><Icon name="check" size={14} /> Đối tượng, điều kiện dự tuyển và chính sách ưu tiên.</li>
            <li><Icon name="check" size={14} /> Các phương thức xét tuyển và nguyên tắc xét tuyển.</li>
            <li><Icon name="check" size={14} /> Quy đổi điểm chứng chỉ ngoại ngữ, chứng chỉ quốc tế.</li>
            <li><Icon name="check" size={14} /> Quy trình xử lý nguyện vọng, lọc ảo và công nhận trúng tuyển.</li>
          </ul>
        </Panel>
      </>
    ),
  })
}

/* ======================= VIDEO GIỚI THIỆU NGÀNH ======================= */
export function AdmVideosPage() {
  return shell({
    title: 'Video giới thiệu ngành',
    lead: 'Tìm hiểu các ngành đào tạo và đời sống sinh viên HUMG qua video.',
    crumbs: crumbs('Video giới thiệu ngành'),
    children: (
      <Panel title="Thư viện video" icon="play">
        <div className="adm-videos">
          {admissionVideos.map((v) => (
            <MediaCard key={v.title} kind="video" to="/media" title={v.title} meta={v.meta} badge="Video" />
          ))}
        </div>
      </Panel>
    ),
  })
}

/* ======================= TƯ VẤN TUYỂN SINH ======================= */
export function AdmAdvisoryPage() {
  return shell({
    title: 'Tư vấn tuyển sinh',
    lead: admissionAdvisory.note,
    crumbs: crumbs('Tư vấn tuyển sinh'),
    children: (
      <>
        <Panel title="Kênh tư vấn" icon="headphones">
          <ul className="adm-channels">
            {admissionAdvisory.channels.map((c) => (
              <li key={c.label}>
                <span className="adm-channels__ic"><Icon name={c.icon} size={16} /></span>
                <span><strong>{c.label}</strong><em>{c.value}</em></span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Đăng ký được tư vấn" icon="user">
          <form className="adm-form" onSubmit={(e) => e.preventDefault()}>
            <label>Họ và tên<input type="text" placeholder="Nguyễn Văn A" /></label>
            <label>Số điện thoại<input type="tel" placeholder="09xx xxx xxx" /></label>
            <label>Email<input type="email" placeholder="email@example.com" /></label>
            <label>Ngành quan tâm<input type="text" placeholder="VD: Công nghệ thông tin" /></label>
            <label className="adm-form__wide">Nội dung cần tư vấn<textarea rows="3" placeholder="Câu hỏi của bạn…" /></label>
            <button type="submit" className="humg-btn humg-btn--primary">Gửi yêu cầu tư vấn</button>
          </form>
        </Panel>
      </>
    ),
  })
}

/* ======================= CÂU HỎI THƯỜNG GẶP ======================= */
export function AdmFaqPage() {
  return shell({
    title: 'Câu hỏi thường gặp về tuyển sinh',
    lead: 'Giải đáp các thắc mắc phổ biến về phương thức, hồ sơ, học phí và học bổng tuyển sinh.',
    crumbs: crumbs('Câu hỏi thường gặp'),
    children: <Panel title="Hỏi – Đáp" icon="headphones"><Faq items={admission.faqs} /></Panel>,
  })
}
