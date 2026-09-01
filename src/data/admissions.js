/* ============================================================
   MOCK DATA — Tuyển sinh (thuộc khối Học tập, PG-EDU-01)
   ============================================================ */
import { admission } from './utilities.js'

export { admission }

export const admissionsNav = [
  { label: 'Tổng quan tuyển sinh', to: '/hoc-tap/tuyen-sinh' },
  { label: 'Thông tin tuyển sinh', to: '/hoc-tap/tuyen-sinh/thong-tin' },
  { label: 'Phương thức xét tuyển', to: '/hoc-tap/tuyen-sinh/phuong-thuc' },
  { label: 'Hồ sơ & Giấy tờ', to: '/hoc-tap/tuyen-sinh/ho-so' },
  { label: 'Thời gian tuyển sinh', to: '/hoc-tap/tuyen-sinh/thoi-gian' },
  { label: 'Hướng dẫn đăng ký', to: '/hoc-tap/tuyen-sinh/huong-dan' },
  { label: 'Tra cứu điểm chuẩn', to: '/hoc-tap/tuyen-sinh/diem-chuan' },
  { label: 'Quy chế tuyển sinh', to: '/hoc-tap/tuyen-sinh/quy-che' },
  { label: 'Video giới thiệu ngành', to: '/hoc-tap/tuyen-sinh/video-nganh' },
  { label: 'Tư vấn tuyển sinh', to: '/hoc-tap/tuyen-sinh/tu-van' },
  { label: 'Câu hỏi thường gặp', to: '/hoc-tap/tuyen-sinh/hoi-dap' },
]

/* ---------- Tổ hợp xét tuyển theo ngành ---------- */
export const admissionCombos = {
  columns: ['Ngành', 'Mã ngành', 'Tổ hợp xét tuyển'],
  rows: [
    ['Kỹ thuật Mỏ', '7520601', 'A00, A01, B00, D07'],
    ['Kỹ thuật Dầu khí', '7520604', 'A00, A01, D07'],
    ['Kỹ thuật Địa chất', '7520501', 'A00, A01, B00, D07'],
    ['Kỹ thuật Trắc địa – Bản đồ', '7520503', 'A00, A01, D01'],
    ['Quản lý đất đai', '7850103', 'A00, A01, C04, D01'],
    ['Công nghệ thông tin', '7480201', 'A00, A01, D01, D07'],
    ['Kỹ thuật Điều khiển & Tự động hóa', '7520216', 'A00, A01, D07'],
    ['Kỹ thuật Môi trường', '7520320', 'A00, A01, B00, D07'],
    ['Kế toán', '7340301', 'A00, A01, D01, C04'],
    ['Quản trị kinh doanh', '7340101', 'A00, A01, D01, C04'],
  ],
}

/* ---------- Mốc thời gian tuyển sinh ---------- */
export const admissionTimeline = [
  { phase: 'Xét tuyển sớm (học bạ, ĐGNL, kết hợp)', time: '01/03 – 30/05/2026', note: 'Nộp trực tuyến trên Cổng tuyển sinh HUMG' },
  { phase: 'Thi tốt nghiệp THPT', time: '26/06 – 29/06/2026', note: 'Theo lịch của Bộ GD&ĐT' },
  { phase: 'Đăng ký nguyện vọng trên Cổng Bộ GD&ĐT', time: '10/07 – 25/07/2026', note: 'Không giới hạn số nguyện vọng' },
  { phase: 'Lọc ảo & xử lý nguyện vọng', time: '26/07 – 15/08/2026', note: '' },
  { phase: 'Công bố điểm chuẩn & kết quả trúng tuyển', time: '20/08/2026', note: 'Tra cứu trên website Nhà trường' },
  { phase: 'Xác nhận nhập học trực tuyến', time: 'Trước 27/08/2026', note: 'Bắt buộc để giữ chỗ' },
  { phase: 'Nhập học & tuần sinh hoạt công dân', time: '18/08 – 24/08/2026', note: 'Theo thông báo của Khoa' },
]

/* ---------- Hồ sơ ---------- */
export const admissionDossier = {
  common: [
    'Phiếu đăng ký xét tuyển theo mẫu của Nhà trường',
    'Học bạ THPT (bản sao công chứng)',
    'Bằng tốt nghiệp THPT hoặc giấy chứng nhận tốt nghiệp tạm thời (bản sao công chứng)',
    'Căn cước công dân (bản sao) và 02 ảnh 3×4 chụp trong 6 tháng gần nhất',
    'Giấy chứng nhận đối tượng ưu tiên, khu vực (nếu có)',
  ],
  bySpecial: [
    ['Xét tuyển thẳng', 'Giấy chứng nhận đạt giải quốc gia / quốc tế; hồ sơ theo quy chế tuyển thẳng của Bộ GD&ĐT.'],
    ['Xét tuyển kết hợp', 'Chứng chỉ ngoại ngữ quốc tế còn hạn (IELTS, TOEFL…), chứng chỉ SAT/ACT hoặc minh chứng thành tích.'],
    ['Xét kết quả ĐGNL', 'Giấy báo điểm kỳ thi Đánh giá năng lực của ĐHQG Hà Nội năm 2026.'],
  ],
  submit: 'Nộp trực tuyến trên Cổng tuyển sinh HUMG hoặc gửi chuyển phát về Phòng Đào tạo – Trường Đại học Mỏ - Địa chất, 18 Phố Viên, Đức Thắng, Bắc Từ Liêm, Hà Nội.',
}

/* ---------- Điểm chuẩn các năm ---------- */
export const admissionBenchmarks = {
  years: ['2025', '2024', '2023'],
  method: 'Điểm thi tốt nghiệp THPT',
  data: {
    2025: [
      ['Công nghệ thông tin', '24.50', '25.10'],
      ['Kỹ thuật Điều khiển & Tự động hóa', '23.10', '24.00'],
      ['Kỹ thuật Dầu khí', '22.00', '22.75'],
      ['Kỹ thuật Mỏ', '19.50', '20.10'],
      ['Kỹ thuật Địa chất', '18.00', '18.50'],
      ['Quản trị kinh doanh', '22.25', '22.90'],
      ['Kế toán', '21.80', '22.40'],
      ['Quản lý đất đai', '20.10', '20.80'],
    ],
    2024: [
      ['Công nghệ thông tin', '23.80', '24.40'],
      ['Kỹ thuật Điều khiển & Tự động hóa', '22.50', '23.20'],
      ['Kỹ thuật Dầu khí', '21.25', '22.00'],
      ['Kỹ thuật Mỏ', '18.75', '19.40'],
      ['Kỹ thuật Địa chất', '17.50', '18.00'],
      ['Quản trị kinh doanh', '21.50', '22.10'],
      ['Kế toán', '21.00', '21.60'],
      ['Quản lý đất đai', '19.50', '20.10'],
    ],
    2023: [
      ['Công nghệ thông tin', '23.00', '23.60'],
      ['Kỹ thuật Điều khiển & Tự động hóa', '21.75', '22.40'],
      ['Kỹ thuật Dầu khí', '20.50', '21.10'],
      ['Kỹ thuật Mỏ', '18.00', '18.60'],
      ['Kỹ thuật Địa chất', '16.50', '17.00'],
      ['Quản trị kinh doanh', '20.75', '21.30'],
      ['Kế toán', '20.25', '20.80'],
      ['Quản lý đất đai', '18.50', '19.00'],
    ],
  },
}

/* ---------- Video giới thiệu ngành ---------- */
export const admissionVideos = [
  { title: 'Giới thiệu ngành Công nghệ thông tin', meta: '05:20 · Khoa CNTT' },
  { title: 'Giới thiệu ngành Kỹ thuật Dầu khí', meta: '04:45 · Khoa Dầu khí' },
  { title: 'Giới thiệu ngành Kỹ thuật Mỏ', meta: '06:10 · Khoa Mỏ' },
  { title: 'Giới thiệu ngành Quản lý đất đai', meta: '04:30 · Khoa Trắc địa – Bản đồ' },
  { title: 'Một ngày của sinh viên HUMG', meta: '03:50 · Truyền thông HUMG' },
  { title: 'Cơ hội việc làm sau tốt nghiệp', meta: '05:05 · Trung tâm Hỗ trợ sinh viên' },
]

/* ---------- Tư vấn tuyển sinh ---------- */
export const admissionAdvisory = {
  channels: [
    { icon: 'phone', label: 'Hotline tuyển sinh', value: '0888 123 456 (08:00 – 21:00 hằng ngày)' },
    { icon: 'mail', label: 'Email', value: 'tuyensinh@humg.edu.vn' },
    { icon: 'zalo', label: 'Zalo OA', value: 'HUMG Tuyển sinh' },
    { icon: 'facebook', label: 'Fanpage', value: 'facebook.com/tuyensinhHUMG' },
  ],
  note: 'Điền thông tin bên dưới, cán bộ tư vấn sẽ liên hệ lại trong 24 giờ làm việc.',
}

/* ---------- Quy chế / văn bản ---------- */
export const admissionRegulations = [
  { name: 'Đề án tuyển sinh trình độ đại học năm 2026', meta: 'PDF · 1.2 MB' },
  { name: 'Quy chế tuyển sinh đại học (Bộ GD&ĐT)', meta: 'PDF · 980 KB' },
  { name: 'Quy định xét tuyển thẳng và ưu tiên xét tuyển', meta: 'PDF · 640 KB' },
  { name: 'Hướng dẫn quy đổi điểm chứng chỉ ngoại ngữ', meta: 'PDF · 420 KB' },
  { name: 'Bảng phân chia khu vực và đối tượng ưu tiên', meta: 'PDF · 380 KB' },
]
