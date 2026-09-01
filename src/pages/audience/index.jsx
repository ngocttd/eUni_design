import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, SectionNav, Panel, TileGrid, DataTable, SupportCard, NewsMini, Faq,
} from '../../components/ui/page.jsx'
import './audience.css'

/* ======================= PHỤ HUYNH — CỔNG THÔNG TIN (PG-PAR-01) ======================= */
const PARENT_NAV = (
  <SectionNav
    title="Phụ huynh"
    items={[
      { label: 'Thông tin cho phụ huynh', to: '/phu-huynh' },
      { label: 'Tuyển sinh', to: '/hoc-tap/tuyen-sinh' },
      { label: 'Chương trình đào tạo', to: '/hoc-tap/chuong-trinh-dao-tao' },
      { label: 'Học phí & Học bổng', to: '/hoc-tap/hoc-phi-hoc-bong' },
      { label: 'Tin tức & Sự kiện', to: '/tin-tuc' },
      { label: 'Liên hệ nhà trường', to: '/lien-he' },
      { label: 'My eUni Phụ huynh', to: '/dang-nhap-phu-huynh' },
    ]}
  />
)

const parentKeyDates = {
  year: 'Năm học 2026 – 2027',
  rows: [
    ['Nhập học & tuần sinh hoạt công dân', '18/08 – 24/08/2026', ''],
    ['Khai giảng & bắt đầu học kỳ I', '25/08/2026', ''],
    ['Nộp học phí học kỳ I', 'Trước 30/09/2026', 'Chuyển khoản / thu hộ ngân hàng'],
    ['Thi kết thúc học kỳ I', '30/12/2026 – 18/01/2027', ''],
    ['Công bố kết quả & xét học bổng học kỳ I', 'Tháng 02/2027', ''],
  ],
}

const parentFaq = [
  { q: 'Phụ huynh có tài khoản riêng để theo dõi kết quả học tập của con không?', a: 'Có. Nhà trường cấp tài khoản My eUni Phụ huynh liên kết với hồ sơ sinh viên; phụ huynh đăng nhập tại trang "Đăng nhập phụ huynh" để xem kết quả học tập, học phí, lịch học và thông báo.' },
  { q: 'Làm thế nào để nộp học phí cho con?', a: 'Học phí nộp qua chuyển khoản hoặc thu hộ tại ngân hàng liên kết theo thông báo mỗi học kỳ; sinh viên/phụ huynh cũng có thể thanh toán trực tuyến trên My eUni. Xem chi tiết ở mục Học phí & Học bổng.' },
  { q: 'Con tôi thuộc diện chính sách, cần làm gì để được miễn giảm học phí?', a: 'Nộp đơn theo mẫu kèm giấy tờ minh chứng về Phòng Công tác chính trị – Sinh viên trong thời hạn thông báo mỗi học kỳ.' },
  { q: 'Khi cần trao đổi với Nhà trường về tình hình của con, liên hệ ở đâu?', a: 'Liên hệ cố vấn học tập của lớp, Phòng Công tác chính trị – Sinh viên (024.3838.3830) hoặc gửi phản hồi qua trang Liên hệ.' },
]

export function ParentGatewayPage() {
  return (
    <PageShell
      eyebrow="Phụ huynh"
      title="Thông tin dành cho phụ huynh"
      lead="Trang thông tin công khai giúp phụ huynh đồng hành cùng con trong quá trình học tập tại HUMG. Đăng nhập My eUni Phụ huynh để xem kết quả học tập, học phí và lịch học của riêng con bạn."
      crumbs={[{ label: 'Phụ huynh' }]}
      sectionNav={PARENT_NAV}
      variant="student"
      sidebar={
        <>
          <Panel title="Thông báo" icon="bell" action={<Link to="/tin-tuc" className="humg-link-more">Tất cả <Icon name="arrow-right" size={13} /></Link>}>
            <NewsMini items={[
              { date: '15/08/2026', title: 'Kế hoạch đón tân sinh viên K71 và họp phụ huynh đầu khóa', to: '/tin-tuc' },
              { date: '05/08/2026', title: 'Mức học phí và lộ trình thu năm học 2026 – 2027', to: '/tin-tuc' },
              { date: '20/07/2026', title: 'Hướng dẫn đăng ký tài khoản My eUni Phụ huynh', to: '/tin-tuc' },
            ]} />
          </Panel>
          <SupportCard
            title="Hỗ trợ phụ huynh"
            lead="Giải đáp về học tập, học phí và đời sống của sinh viên."
            phone="024.3838.3830"
            email="ctsv@humg.edu.vn"
            cta={{ label: 'Gửi câu hỏi', to: '/lien-he' }}
          />
        </>
      }
    >
      <Panel title="Truy cập nhanh" icon="grid">
        <TileGrid cols={3} items={[
          { icon: 'award', title: 'Kết quả học tập của con', desc: 'Cách tra cứu điểm, GPA, rèn luyện', to: '/hoc-tap/tra-cuu-ket-qua' },
          { icon: 'file', title: 'Học phí & Học bổng', desc: 'Mức thu, chính sách, cách nộp', to: '/hoc-tap/hoc-phi-hoc-bong' },
          { icon: 'calendar', title: 'Lịch học – Lịch thi', desc: 'Kế hoạch năm học, lịch thi', to: '/hoc-tap/lich-hoc' },
          { icon: 'search', title: 'Tuyển sinh', desc: 'Chỉ tiêu, ngành, phương thức xét tuyển', to: '/hoc-tap/tuyen-sinh' },
          { icon: 'user', title: 'My eUni Phụ huynh', desc: 'Theo dõi kết quả, học phí của con', to: '/dang-nhap-phu-huynh' },
          { icon: 'phone', title: 'Liên hệ Nhà trường', desc: 'Điện thoại, email các đơn vị', to: '/lien-he' },
        ]} />
      </Panel>

      <Panel
        title={`Mốc thời gian năm học · ${parentKeyDates.year}`}
        icon="calendar"
        action={<Link to="/hoc-tap/lich-hoc" className="humg-link-more">Kế hoạch đầy đủ <Icon name="arrow-right" size={13} /></Link>}
      >
        <DataTable columns={['Nội dung', 'Thời gian']} rows={parentKeyDates.rows.map((r) => [r[0], r[1]])} />
      </Panel>

      <Panel title="Câu hỏi thường gặp" icon="headphones"><Faq items={parentFaq} /></Panel>
    </PageShell>
  )
}

/* ======================= CỰU SINH VIÊN — CỔNG THÔNG TIN ======================= */
const ALUMNI_NAV = (
  <SectionNav
    title="Cựu sinh viên"
    items={[
      { label: 'Tổng quan', to: '/cuu-sinh-vien' },
      { label: 'Việc làm & Khởi nghiệp', to: '/doi-song/viec-lam-khoi-nghiep' },
      { label: 'Tin tức & Sự kiện', to: '/tin-tuc' },
      { label: 'Hỗ trợ sinh viên', to: '/doi-song/ho-tro-sinh-vien' },
      { label: 'Liên hệ Nhà trường', to: '/lien-he' },
    ]}
  />
)

const alumniConnect = [
  { icon: 'user', title: 'Cập nhật hồ sơ cựu sinh viên', desc: 'Đăng ký thông tin để nhận bản tin, thư mời sự kiện và cơ hội nghề nghiệp.', to: '/cuu-sinh-vien' },
  { icon: 'users', title: 'Ban liên lạc theo khóa / khoa', desc: 'Kết nối với ban liên lạc cựu sinh viên của khóa và khoa bạn.', to: '/lien-he' },
  { icon: 'briefcase', title: 'Tuyển dụng & giới thiệu việc làm', desc: 'Đăng tin tuyển dụng, tìm ứng viên và kết nối doanh nghiệp với sinh viên HUMG.', to: '/doi-song/viec-lam-khoi-nghiep' },
  { icon: 'headphones', title: 'Mentoring & hỗ trợ sinh viên', desc: 'Tham gia cố vấn nghề nghiệp, chia sẻ kinh nghiệm với sinh viên đang học.', to: '/doi-song/ho-tro-sinh-vien' },
]

const alumniContribute = [
  { icon: 'award', title: 'Quỹ học bổng cựu sinh viên', desc: 'Đóng góp học bổng tiếp sức cho sinh viên vượt khó, học giỏi.' },
  { icon: 'graduation', title: 'Thỉnh giảng & đồng hướng dẫn', desc: 'Tham gia giảng dạy chuyên đề thực tế, hướng dẫn đồ án, khóa luận.' },
  { icon: 'rocket', title: 'Hiến kế phát triển Trường', desc: 'Góp ý chương trình đào tạo, kết nối hợp tác doanh nghiệp – nhà trường.' },
]

export function AlumniPage() {
  const [q, setQ] = useState('')
  return (
    <PageShell
      eyebrow="Cựu sinh viên"
      title="Cộng đồng Cựu sinh viên HUMG"
      lead="Mạng lưới kết nối cựu sinh viên Trường Đại học Mỏ - Địa chất trên toàn quốc và quốc tế: cập nhật thông tin, tham gia sự kiện, hỗ trợ nghề nghiệp và đồng hành cùng sự phát triển của Nhà trường."
      crumbs={[{ label: 'Cựu sinh viên' }]}
      sectionNav={ALUMNI_NAV}
      variant="student"
      sidebar={
        <>
          <Panel title="Sự kiện" icon="calendar" action={<Link to="/su-kien" className="humg-link-more">Tất cả <Icon name="arrow-right" size={13} /></Link>}>
            <NewsMini items={[
              { date: '10/11/2026', title: 'Gặp mặt cựu sinh viên kỷ niệm 60 năm thành lập Trường', to: '/su-kien' },
              { date: 'Hằng quý', title: 'Talkshow nghề nghiệp do cựu sinh viên chia sẻ', to: '/su-kien' },
            ]} />
          </Panel>
          <SupportCard
            title="Ban Liên lạc Cựu sinh viên"
            lead="Thường trực tại Phòng Công tác chính trị – Sinh viên."
            phone="024.3838.3830"
            email="cuusinhvien@humg.edu.vn"
            cta={{ label: 'Liên hệ', to: '/lien-he' }}
          />
        </>
      }
    >
      <Panel title="Kết nối & tham gia" icon="users"><TileGrid items={alumniConnect} cols={2} /></Panel>

      <Panel title="Đóng góp cho Trường" icon="heart">
        <div className="aud-contrib">
          {alumniContribute.map((c) => (
            <div key={c.title} className="aud-contrib__item">
              <span className="aud-contrib__ic"><Icon name={c.icon} size={18} /></span>
              <strong>{c.title}</strong>
              <span>{c.desc}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Cập nhật thông tin cựu sinh viên" icon="user">
        <form className="aud-form" onSubmit={(e) => e.preventDefault()}>
          <label>Họ và tên<input type="text" placeholder="Nguyễn Văn A" /></label>
          <label>Khoa / Khóa<input type="text" placeholder="Khoa CNTT · K58 (2013)" /></label>
          <label>Email<input type="email" value={q} onChange={(e) => setQ(e.target.value)} placeholder="email@company.com" /></label>
          <label>Đơn vị công tác<input type="text" placeholder="Công ty / Tổ chức" /></label>
          <button type="submit" className="humg-btn humg-btn--primary">Gửi thông tin</button>
        </form>
      </Panel>
    </PageShell>
  )
}
