/* ============================================================
   MOCK DATA — Menu "Giới thiệu HUMG" (PG-PUB-03 / PG-PUB-04)
   ============================================================ */

/* Menu khối "Giới thiệu HUMG" — rút gọn còn 7 mục chính, dễ đọc, dễ gây ấn tượng.
   Các trang phụ (con số, Ban Giám hiệu, Khoa/Phòng/Ban/Trung tâm/Đơn vị, chuyên gia,
   danh bạ) vẫn truy cập được từ trang "Cơ cấu tổ chức", sidebar "Xem nhanh" và trang chi tiết. */
export const aboutNav = [
  { label: 'Tổng quan', to: '/gioi-thieu' },
  { label: 'Thông điệp Hiệu trưởng', to: '/gioi-thieu/thong-diep-hieu-truong' },
  { label: 'Lịch sử phát triển', to: '/gioi-thieu/lich-su' },
  { label: 'Sứ mạng – Tầm nhìn – Giá trị', to: '/gioi-thieu/tam-nhin-su-mang' },
  { label: 'Thành tựu & con số nổi bật', to: '/gioi-thieu/thanh-tuu' },
  { label: 'Cơ cấu tổ chức', to: '/gioi-thieu/co-cau-to-chuc' },
  { label: 'Đội ngũ cán bộ, giảng viên', to: '/gioi-thieu/giang-vien' },
]

/* ---------------- 3.1 Tổng quan ---------------- */
export const overview = {
  intro: [
    'Trường Đại học Mỏ - Địa chất là trường đại học công lập trực thuộc Bộ Giáo dục và Đào tạo, có bề dày truyền thống trong đào tạo và nghiên cứu các lĩnh vực mỏ – địa chất – dầu khí – trắc địa bản đồ và các ngành kỹ thuật liên quan.',
    'Trải qua 60 năm xây dựng và phát triển, Nhà trường đã đào tạo hàng chục nghìn kỹ sư, cử nhân, thạc sĩ và tiến sĩ, đóng góp quan trọng cho sự nghiệp công nghiệp hóa, hiện đại hóa đất nước.',
  ],
  stats: [
    { value: '1966', label: 'Năm thành lập' },
    { value: '60+', label: 'Năm phát triển' },
    { value: '20.000+', label: 'Sinh viên, học viên' },
    { value: '600+', label: 'Giảng viên, cán bộ' },
    { value: '5', label: 'Cơ sở đào tạo' },
  ],
  more: [
    { value: '12', label: 'Khoa chuyên môn' },
    { value: '4', label: 'Viện nghiên cứu' },
    { value: '52', label: 'Chương trình đào tạo' },
    { value: '500+', label: 'Đối tác trong & ngoài nước' },
  ],
  values: ['Đổi mới sáng tạo', 'Chất lượng hàng đầu', 'Hội nhập quốc tế', 'Phát triển bền vững', 'Trách nhiệm cộng đồng'],
}

/* ---------------- 3.2 Thông điệp Hiệu trưởng ---------------- */
export const rectorMessage = {
  name: 'PGS.TS. Trần Xuân Trường',
  role: 'Hiệu trưởng Trường Đại học Mỏ - Địa chất',
  paragraphs: [
    'Với truyền thống 60 năm xây dựng và phát triển, Trường Đại học Mỏ - Địa chất không ngừng đổi mới, sáng tạo trong đào tạo, nghiên cứu khoa học và chuyển giao công nghệ, góp phần đào tạo nguồn nhân lực chất lượng cao cho đất nước.',
    'Chúng tôi cam kết xây dựng môi trường học thuật năng động, sáng tạo, hiện đại và nhân văn, nơi mỗi sinh viên được khuyến khích phát huy tối đa năng lực, bản lĩnh và tinh thần khởi nghiệp, hội nhập.',
    'Nhà trường luôn trân trọng và mong muốn tiếp tục nhận được sự đồng hành của các thế hệ thầy trò, cựu sinh viên, đối tác và toàn xã hội trên chặng đường phát triển tiếp theo.',
  ],
  sign: 'Trân trọng,',
  values: ['Đổi mới – Sáng tạo', 'Chất lượng hàng đầu', 'Hội nhập quốc tế', 'Phát triển bền vững', 'Trách nhiệm cộng đồng'],
}

/* ---------------- 3.3 Lịch sử phát triển ---------------- */
export const history = [
  { year: '1966', title: 'Thành lập Trường', text: 'Trường Đại học Mỏ - Địa chất được thành lập theo Quyết định của Hội đồng Chính phủ, trên cơ sở Khoa Mỏ - Địa chất của Trường Đại học Bách khoa Hà Nội.' },
  { year: '1975 – 1990', title: 'Xây dựng và trưởng thành', text: 'Mở rộng quy mô đào tạo, xây dựng cơ sở vật chất và đội ngũ giảng viên, khẳng định vị thế trong đào tạo ngành mỏ - địa chất.' },
  { year: '1991 – 2005', title: 'Đổi mới và hội nhập', text: 'Đa dạng hóa ngành nghề, tăng cường hợp tác quốc tế, đẩy mạnh nghiên cứu khoa học và ứng dụng.' },
  { year: '2006 – 2015', title: 'Phát triển bền vững', text: 'Nâng cao chất lượng đào tạo, mở rộng ngành nghề, đầu tư các phòng thí nghiệm trọng điểm và cơ sở vật chất hiện đại.' },
  { year: '2016 – nay', title: 'Vươn tầm quốc tế', text: 'Hướng tới đại học nghiên cứu, hội nhập quốc tế sâu rộng, đồng hành cùng chuyển đổi số và phát triển bền vững.' },
]

/* ---------------- 3.4 Sứ mạng – Tầm nhìn – Giá trị cốt lõi ---------------- */
export const vision = {
  mission:
    'Đào tạo nguồn nhân lực chất lượng cao, nghiên cứu khoa học và chuyển giao công nghệ trong lĩnh vực mỏ, địa chất, dầu khí, trắc địa - bản đồ và các lĩnh vực liên quan, phục vụ sự phát triển bền vững của đất nước.',
  visionText:
    'Đến năm 2035 trở thành đại học nghiên cứu đa ngành, có uy tín trong khu vực và quốc tế, dẫn đầu Việt Nam về đào tạo và nghiên cứu trong lĩnh vực khoa học Trái đất và mỏ.',
  core: 'Tri thức – Bản lĩnh – Sáng tạo – Hội nhập',
  principles: [
    { icon: 'award', title: 'Chất lượng hàng đầu', desc: 'Lấy chất lượng đào tạo và nghiên cứu làm nền tảng phát triển.' },
    { icon: 'rocket', title: 'Đổi mới sáng tạo', desc: 'Khuyến khích tư duy mới, giải pháp mới và tinh thần khởi nghiệp.' },
    { icon: 'globe', title: 'Hội nhập quốc tế', desc: 'Mở rộng hợp tác, liên kết đào tạo và nghiên cứu với đối tác quốc tế.' },
    { icon: 'heart', title: 'Trách nhiệm cộng đồng', desc: 'Gắn hoạt động của Nhà trường với lợi ích cộng đồng và xã hội.' },
    { icon: 'layers', title: 'Phát triển bền vững', desc: 'Cân bằng giữa tăng trưởng, con người và môi trường.' },
    { icon: 'users', title: 'Con người là trung tâm', desc: 'Tôn trọng, phát huy năng lực của mỗi cán bộ, giảng viên và sinh viên.' },
  ],
}

/* ---------------- 3.5 Thành tựu nổi bật ---------------- */
export const achievements = [
  {
    key: 'daotao', label: 'Đào tạo',
    items: [
      { title: 'Top 10 trường đại học kỹ thuật hàng đầu Việt Nam', meta: 'Bảng xếp hạng VNUR', year: '2024' },
      { title: 'Kiểm định chất lượng cơ sở giáo dục chu kỳ 2 – đạt chuẩn', meta: 'Bộ GD&ĐT', year: '2023' },
      { title: '15 chương trình đào tạo đạt chuẩn kiểm định', meta: 'AUN-QA & trong nước', year: '2022 – 2025' },
    ],
  },
  {
    key: 'nghiencuu', label: 'Nghiên cứu',
    items: [
      { title: '650+ công bố khoa học quốc tế (ISI/Scopus)', meta: 'Toàn trường', year: '2020 – 2025' },
      { title: 'Trung tâm nghiên cứu trọng điểm quốc gia lĩnh vực Mỏ - Địa chất', meta: 'Được công nhận', year: '2021' },
      { title: 'Hàng chục đề tài cấp Nhà nước, cấp Bộ nghiệm thu xuất sắc', meta: 'Nhiều lĩnh vực', year: '2016 – 2025' },
    ],
  },
  {
    key: 'hoptac', label: 'Hợp tác',
    items: [
      { title: 'Mạng lưới hơn 500 đối tác trong và ngoài nước', meta: '40+ quốc gia', year: '2025' },
      { title: 'Chương trình liên kết đào tạo quốc tế', meta: 'Đức, Hàn Quốc, Nhật Bản, Ba Lan', year: '2018 – nay' },
    ],
  },
  {
    key: 'giaithuong', label: 'Giải thưởng',
    items: [
      { title: 'Huân chương Độc lập hạng Nhì', meta: 'Nhà nước trao tặng', year: '2016' },
      { title: 'Nhiều Bằng khen của Thủ tướng Chính phủ, Bộ GD&ĐT', meta: 'Tập thể & cá nhân', year: '2016 – 2025' },
      { title: 'Giải thưởng Sáng tạo Khoa học Công nghệ Việt Nam', meta: 'Nhiều công trình', year: '2019 – 2024' },
    ],
  },
]

/* ---------------- 3.6 HUMG qua các con số ---------------- */
export const numbers = {
  big: [
    { value: '60+', label: 'Năm phát triển' },
    { value: '20.000+', label: 'Sinh viên, học viên' },
    { value: '600+', label: 'Giảng viên, cán bộ' },
    { value: '52', label: 'Chương trình đào tạo' },
    { value: '500+', label: 'Đối tác toàn cầu' },
  ],
  enrollment: [
    { year: '2019', value: 12800 }, { year: '2020', value: 13500 }, { year: '2021', value: 14200 },
    { year: '2022', value: 16400 }, { year: '2023', value: 18600 }, { year: '2024', value: 20000 },
  ],
  publications: [
    { year: '2019', value: 420 }, { year: '2020', value: 460 }, { year: '2021', value: 520 },
    { year: '2022', value: 615 }, { year: '2023', value: 850 }, { year: '2024', value: 950 },
  ],
  faculty: [
    { label: 'Giáo sư, Phó Giáo sư', value: 10 },
    { label: 'Tiến sĩ', value: 40 },
    { label: 'Thạc sĩ', value: 40 },
    { label: 'Trình độ khác', value: 10 },
  ],
}

/* ---------------- 4.1 Cơ cấu tổ chức ---------------- */
export const orgChart = {
  board: 'Ban Giám hiệu',
  support: 'Đảng ủy lãnh đạo toàn diện; Công đoàn, Đoàn Thanh niên và Hội Sinh viên phối hợp thực hiện nhiệm vụ.',
  branches: [
    'Khối Khoa / Viện đào tạo',
    'Khối Phòng / Ban chức năng',
    'Khối Trung tâm / Viện nghiên cứu',
    'Khối Đơn vị trực thuộc',
  ],
  motto: 'Minh bạch · Hiệu quả · Hợp tác · Phát triển',
}

/* ---------------- 4.2 Ban Giám hiệu ---------------- */
export const board = {
  rector: {
    name: 'PGS.TS. Trần Xuân Trường', role: 'Hiệu trưởng',
    email: 'hieutruong@humg.edu.vn', phone: '024.3838.3006',
    bio: 'Phụ trách chung, chiến lược phát triển, công tác tổ chức cán bộ, tài chính và đối ngoại của Nhà trường.',
  },
  vices: [
    { name: 'PGS.TS. Nguyễn Văn X', role: 'Phó Hiệu trưởng', email: 'pht.daotao@humg.edu.vn', phone: '024.3838.3010', bio: 'Phụ trách đào tạo đại học, sau đại học, khảo thí và đảm bảo chất lượng giáo dục.' },
    { name: 'PGS.TS. Trần Thị B', role: 'Phó Hiệu trưởng', email: 'pht.khcn@humg.edu.vn', phone: '024.3838.3012', bio: 'Phụ trách khoa học công nghệ, hợp tác quốc tế và tạp chí khoa học.' },
    { name: 'TS. Lê Văn C', role: 'Phó Hiệu trưởng', email: 'pht.csvc@humg.edu.vn', phone: '024.3838.3014', bio: 'Phụ trách cơ sở vật chất, công tác sinh viên và chuyển đổi số.' },
  ],
}

/* ---------------- 4.4 – 4.7 Đơn vị ---------------- */
/* Nhân sự đơn vị: Họ tên · Chức vụ · Email nội bộ */
const st = (name, role, slug) => ({ name, role, email: `${slug}@humg.edu.vn` })

export const units = {
  khoa: {
    label: 'Khoa / Viện đào tạo', singular: 'Khoa',
    intro: 'Các khoa và viện đào tạo trực thuộc Trường Đại học Mỏ - Địa chất, đảm nhiệm công tác giảng dạy và nghiên cứu theo lĩnh vực chuyên môn.',
    list: [
      { id: 'mo', name: 'Khoa Mỏ', head: 'PGS.TS. Nguyễn Văn A', founded: 1966, staff: 62, students: 2300, majors: ['Kỹ thuật Mỏ', 'Kỹ thuật Tuyển khoáng', 'Kỹ thuật Trắc địa mỏ'], desc: 'Đào tạo và nghiên cứu về khai thác mỏ, tuyển khoáng, an toàn và cơ điện mỏ.', phone: '024.3838.3860', email: 'khoamo@humg.edu.vn', board: [st('PGS.TS. Nguyễn Văn A', 'Trưởng khoa', 'nguyenvana'), st('PGS.TS. Đặng Vũ Chí', 'Phó Trưởng khoa phụ trách đào tạo', 'dangvuchi'), st('TS. Nguyễn Phi Hùng', 'Phó Trưởng khoa phụ trách khoa học', 'nguyenphihung'), st('ThS. Trần Thị Thu Hà', 'Trợ lý giáo vụ khoa', 'tranthithuha')] },
      { id: 'dia-chat', name: 'Khoa Khoa học & Kỹ thuật Địa chất', head: 'PGS.TS. Trần Thị B', founded: 1966, staff: 55, students: 1800, majors: ['Kỹ thuật Địa chất', 'Địa chất học', 'Địa kỹ thuật xây dựng'], desc: 'Đào tạo về địa chất, địa chất công trình, địa kỹ thuật và tài nguyên khoáng sản.', phone: '024.3838.3861', email: 'khoadiachat@humg.edu.vn', board: [st('PGS.TS. Trần Thị B', 'Trưởng khoa', 'tranthib'), st('PGS.TS. Ngô Xuân Thành', 'Phó Trưởng khoa', 'ngoxuanthanh'), st('TS. Bùi Thị Thu Hiền', 'Phó Trưởng khoa', 'buithithuhien'), st('ThS. Phạm Văn Long', 'Trợ lý giáo vụ khoa', 'phamvanlong')] },
      { id: 'dau-khi', name: 'Khoa Dầu khí', head: 'TS. Lê Văn C', founded: 1975, staff: 40, students: 1200, majors: ['Kỹ thuật Dầu khí', 'Kỹ thuật Địa vật lý'], desc: 'Đào tạo về khoan – khai thác dầu khí, địa vật lý và lọc hóa dầu.', phone: '024.3838.3862', email: 'khoadaukhi@humg.edu.vn', board: [st('TS. Lê Văn C', 'Trưởng khoa', 'levanc'), st('PGS.TS. Nguyễn Thế Vinh', 'Phó Trưởng khoa', 'nguyenthevinh'), st('TS. Doãn Ngọc San', 'Phó Trưởng khoa', 'doanngocsan'), st('ThS. Vũ Thị Minh Nguyệt', 'Trợ lý giáo vụ khoa', 'vuthiminhnguyet')] },
      { id: 'trac-dia', name: 'Khoa Trắc địa – Bản đồ và Quản lý đất đai', head: 'PGS.TS. Phạm Văn D', founded: 1966, staff: 58, students: 2000, majors: ['Kỹ thuật Trắc địa – Bản đồ', 'Quản lý đất đai', 'Kỹ thuật Địa không gian'], desc: 'Đào tạo về trắc địa, bản đồ, GIS, viễn thám và quản lý đất đai.', phone: '024.3838.3863', email: 'khoatracdia@humg.edu.vn', board: [st('PGS.TS. Phạm Văn D', 'Trưởng khoa', 'phamvand'), st('PGS.TS. Nguyễn Quang Minh', 'Phó Trưởng khoa', 'nguyenquangminh'), st('TS. Trần Thùy Dương', 'Phó Trưởng khoa', 'tranthuyduong'), st('ThS. Lê Thị Hồng Vân', 'Trợ lý giáo vụ khoa', 'lethihongvan')] },
      { id: 'cntt', name: 'Khoa Công nghệ thông tin', head: 'TS. Hoàng Văn E', founded: 2001, staff: 45, students: 1900, majors: ['Công nghệ thông tin', 'Khoa học dữ liệu', 'Hệ thống thông tin'], desc: 'Đào tạo CNTT, khoa học dữ liệu, trí tuệ nhân tạo và hệ thống thông tin địa lý.', phone: '024.3838.3864', email: 'khoacntt@humg.edu.vn', board: [st('TS. Hoàng Văn E', 'Trưởng khoa', 'hoangvane'), st('PGS.TS. Đào Anh Tuấn', 'Phó Trưởng khoa', 'daoanhtuan'), st('TS. Nguyễn Thị Hải Bình', 'Phó Trưởng khoa', 'nguyenthihaibinh'), st('ThS. Bùi Quang Hưng', 'Trợ lý giáo vụ khoa', 'buiquanghung')] },
      { id: 'co-dien', name: 'Khoa Cơ – Điện', head: 'PGS.TS. Vũ Văn F', founded: 1976, staff: 50, students: 1700, majors: ['Kỹ thuật Điều khiển & Tự động hóa', 'Kỹ thuật Điện', 'Kỹ thuật Cơ khí'], desc: 'Đào tạo về tự động hóa, điện – điện tử và cơ khí phục vụ công nghiệp.', phone: '024.3838.3865', email: 'khoacodien@humg.edu.vn', board: [st('PGS.TS. Vũ Văn F', 'Trưởng khoa', 'vuvanf'), st('TS. Đinh Văn Chiến', 'Phó Trưởng khoa', 'dinhvanchien'), st('TS. Khổng Cao Phong', 'Phó Trưởng khoa', 'khongcaophong'), st('ThS. Nguyễn Thị Vân Anh', 'Trợ lý giáo vụ khoa', 'nguyenthivananh')] },
      { id: 'kt-qtkd', name: 'Khoa Kinh tế & Quản trị kinh doanh', head: 'TS. Đỗ Văn G', founded: 1997, staff: 42, students: 2100, majors: ['Quản trị kinh doanh', 'Kế toán', 'Quản lý công nghiệp'], desc: 'Đào tạo về quản trị, kế toán, tài chính và quản lý công nghiệp – khoáng sản.', phone: '024.3838.3866', email: 'khoaktqtkd@humg.edu.vn', board: [st('TS. Đỗ Văn G', 'Trưởng khoa', 'dovang'), st('PGS.TS. Nguyễn Thị Bích Ngọc', 'Phó Trưởng khoa', 'nguyenthibichngoc'), st('TS. Phí Thị Diễm Hồng', 'Phó Trưởng khoa', 'phithidiemhong'), st('ThS. Trần Văn Tuấn', 'Trợ lý giáo vụ khoa', 'tranvantuan')] },
      { id: 'moi-truong', name: 'Khoa Môi trường', head: 'PGS.TS. Ngô Thị H', founded: 2007, staff: 30, students: 900, majors: ['Kỹ thuật Môi trường', 'Quản lý tài nguyên & Môi trường'], desc: 'Đào tạo và nghiên cứu về kỹ thuật, quản lý môi trường và tài nguyên.', phone: '024.3838.3867', email: 'khoamoitruong@humg.edu.vn', board: [st('PGS.TS. Ngô Thị H', 'Trưởng khoa', 'ngothih'), st('TS. Nguyễn Mai Hoa', 'Phó Trưởng khoa', 'nguyenmaihoa'), st('TS. Trần Thị Thanh Thủy', 'Phó Trưởng khoa', 'tranthithanhthuy'), st('ThS. Đỗ Mạnh Hùng', 'Trợ lý giáo vụ khoa', 'domanhhung')] },
    ],
  },
  'phong-ban': {
    label: 'Phòng / Ban chức năng', singular: 'Phòng / Ban',
    intro: 'Các phòng, ban chức năng tham mưu, giúp việc cho Ban Giám hiệu trong quản lý và điều hành Nhà trường.',
    list: [
      { id: 'dao-tao', name: 'Phòng Đào tạo', head: 'TS. Nguyễn Văn B', phone: '024.3838.3827', email: 'daotao@humg.edu.vn', functions: ['Quản lý đào tạo đại học', 'Xây dựng kế hoạch giảng dạy', 'Xét tốt nghiệp và cấp bằng'], desc: 'Tham mưu và tổ chức thực hiện công tác đào tạo bậc đại học.', staff: [st('TS. Nguyễn Văn B', 'Trưởng phòng', 'nguyenvanb'), st('ThS. Lê Thị Hồng Nhung', 'Phó Trưởng phòng', 'lethihongnhung'), st('ThS. Trần Quốc Toản', 'Phó Trưởng phòng', 'tranquoctoan'), st('CN. Phạm Thị Thu Trang', 'Chuyên viên quản lý kế hoạch', 'phamthithutrang-dt'), st('CN. Hoàng Minh Đức', 'Chuyên viên xét tốt nghiệp', 'hoangminhduc-dt')] },
      { id: 'sau-dai-hoc', name: 'Phòng Đào tạo Sau đại học', head: 'PGS.TS. Trần C', phone: '024.3838.3828', email: 'saudaihoc@humg.edu.vn', functions: ['Tuyển sinh và quản lý học viên cao học, NCS', 'Tổ chức bảo vệ luận văn, luận án'], desc: 'Quản lý đào tạo trình độ thạc sĩ và tiến sĩ.', staff: [st('PGS.TS. Trần C', 'Trưởng phòng', 'tranc'), st('TS. Nguyễn Thị Thanh Huyền', 'Phó Trưởng phòng', 'nguyenthithanhhuyen-sdh'), st('ThS. Đỗ Văn Khánh', 'Chuyên viên quản lý NCS', 'dovankhanh-sdh'), st('CN. Vũ Thị Lan Anh', 'Chuyên viên quản lý cao học', 'vuthilananh-sdh')] },
      { id: 'khcn', name: 'Phòng Khoa học – Công nghệ', head: 'TS. Lê D', phone: '024.3838.3829', email: 'khcn@humg.edu.vn', functions: ['Quản lý đề tài, dự án', 'Sở hữu trí tuệ', 'Tạp chí khoa học'], desc: 'Quản lý hoạt động nghiên cứu khoa học và chuyển giao công nghệ.', staff: [st('TS. Lê D', 'Trưởng phòng', 'led'), st('TS. Phạm Thị Nhàn', 'Phó Trưởng phòng', 'phamthinhan-khcn'), st('ThS. Nguyễn Bá Dũng', 'Chuyên viên quản lý đề tài', 'nguyenbadung-khcn'), st('CN. Trần Thị Kiều Oanh', 'Chuyên viên sở hữu trí tuệ', 'tranthikieuoanh-khcn')] },
      { id: 'ctsv', name: 'Phòng Công tác chính trị & Sinh viên', head: 'ThS. Phạm E', phone: '024.3838.3830', email: 'ctsv@humg.edu.vn', functions: ['Quản lý sinh viên', 'Học bổng, chính sách', 'Hỗ trợ việc làm'], desc: 'Tổ chức công tác chính trị, tư tưởng và hỗ trợ sinh viên.', staff: [st('ThS. Phạm E', 'Trưởng phòng', 'phame'), st('ThS. Nguyễn Đức Thắng', 'Phó Trưởng phòng', 'nguyenducthang-ctsv'), st('CN. Lê Thị Phương Thảo', 'Chuyên viên học bổng, chính sách', 'lethiphuongthao-ctsv'), st('CN. Đặng Quang Hải', 'Chuyên viên hỗ trợ việc làm', 'dangquanghai-ctsv')] },
      { id: 'htqt', name: 'Phòng Hợp tác quốc tế', head: 'TS. Hoàng F', phone: '024.3838.3831', email: 'htqt@humg.edu.vn', functions: ['Quan hệ đối tác quốc tế', 'Chương trình trao đổi', 'Quản lý người nước ngoài'], desc: 'Đầu mối hợp tác quốc tế của Nhà trường.', staff: [st('TS. Hoàng F', 'Trưởng phòng', 'hoangf'), st('ThS. Nguyễn Thị Quỳnh Trang', 'Phó Trưởng phòng', 'nguyenthiquynhtrang-htqt'), st('CN. Phan Anh Tú', 'Chuyên viên chương trình trao đổi', 'phananhtu-htqt'), st('CN. Bùi Thị Hải Yến', 'Chuyên viên quản lý lưu học sinh', 'buithihaiyen-htqt')] },
      { id: 'tccb', name: 'Phòng Tổ chức – Cán bộ', head: 'ThS. Vũ G', phone: '024.3838.3832', email: 'tccb@humg.edu.vn', functions: ['Tổ chức bộ máy', 'Quản lý nhân sự', 'Chế độ, chính sách'], desc: 'Tham mưu công tác tổ chức và cán bộ.', staff: [st('ThS. Vũ G', 'Trưởng phòng', 'vug'), st('ThS. Trần Thị Minh Tâm', 'Phó Trưởng phòng', 'tranthiminhtam-tccb'), st('CN. Nguyễn Văn Hiếu', 'Chuyên viên quản lý hồ sơ nhân sự', 'nguyenvanhieu-tccb'), st('CN. Lê Thị Ngọc Ánh', 'Chuyên viên chế độ, chính sách', 'lethingocanh-tccb')] },
      { id: 'ke-hoach-tai-chinh', name: 'Phòng Kế hoạch – Tài chính', head: 'ThS. Đỗ H', phone: '024.3838.3833', email: 'tckt@humg.edu.vn', functions: ['Kế hoạch tài chính', 'Quản lý thu – chi', 'Học phí'], desc: 'Quản lý tài chính, kế toán và học phí.', staff: [st('ThS. Đỗ H', 'Trưởng phòng – Kế toán trưởng', 'doh'), st('ThS. Nguyễn Thị Thu Hương', 'Phó Trưởng phòng', 'nguyenthithuhuong-tckt'), st('CN. Phạm Văn Quyết', 'Chuyên viên kế toán thanh toán', 'phamvanquyet-tckt'), st('CN. Trần Thị Thanh Loan', 'Chuyên viên quản lý học phí', 'tranthithanhloan-tckt')] },
      { id: 'quan-tri', name: 'Phòng Quản trị – Đời sống', head: 'ThS. Ngô K', phone: '024.3838.3834', email: 'quantri@humg.edu.vn', functions: ['Quản lý cơ sở vật chất', 'Điện nước, vệ sinh', 'Phục vụ đời sống'], desc: 'Quản lý cơ sở vật chất và phục vụ đời sống trong Trường.', staff: [st('ThS. Ngô K', 'Trưởng phòng', 'ngok'), st('KS. Trần Văn Bình', 'Phó Trưởng phòng', 'tranvanbinh-qt'), st('KS. Nguyễn Hữu Phước', 'Chuyên viên quản lý công trình', 'nguyenhuuphuoc-qt'), st('CN. Lê Thị Hồng Gấm', 'Chuyên viên quản trị thiết bị', 'lethihonggam-qt')] },
    ],
  },
  'trung-tam-vien': {
    label: 'Trung tâm / Viện nghiên cứu', singular: 'Trung tâm / Viện',
    intro: 'Các trung tâm, viện nghiên cứu và đơn vị dịch vụ khoa học công nghệ của Trường.',
    list: [
      { id: 'vien-khcn-mo', name: 'Viện Khoa học Công nghệ Mỏ - Địa chất', head: 'PGS.TS. Nguyễn A', phone: '024.3838.3840', email: 'vienkhcn@humg.edu.vn', functions: ['Nghiên cứu ứng dụng', 'Chuyển giao công nghệ', 'Dịch vụ KHCN'], desc: 'Nghiên cứu và chuyển giao công nghệ trong lĩnh vực mỏ - địa chất.', staff: [st('PGS.TS. Nguyễn A', 'Viện trưởng', 'nguyena-vien'), st('TS. Trần Mạnh Cường', 'Phó Viện trưởng', 'tranmanhcuong-vien'), st('TS. Lê Thị Bích Hạnh', 'Phó Viện trưởng', 'lethibichhanh-vien'), st('ThS. Phạm Đình Long', 'Trưởng phòng Nghiên cứu ứng dụng', 'phamdinhlong-vien'), st('ThS. Nguyễn Thị Vân', 'Chuyên viên quản lý dự án', 'nguyenthivan-vien')] },
      { id: 'tt-ngoai-ngu-tin-hoc', name: 'Trung tâm Ngoại ngữ – Tin học', head: 'ThS. Trần B', phone: '024.3838.3841', email: 'nnth@humg.edu.vn', functions: ['Đào tạo và thi chứng chỉ ngoại ngữ, tin học', 'Bồi dưỡng kỹ năng số'], desc: 'Đào tạo và tổ chức thi chứng chỉ ngoại ngữ, tin học.', staff: [st('ThS. Trần B', 'Giám đốc', 'tranb-nnth'), st('ThS. Nguyễn Thị Thu Hà', 'Phó Giám đốc', 'nguyenthithuha-nnth'), st('CN. Đỗ Trọng Nghĩa', 'Cán bộ khảo thí', 'dotrongnghia-nnth'), st('CN. Lê Thị Ánh Tuyết', 'Chuyên viên đào tạo', 'lethianhtuyet-nnth')] },
      { id: 'tt-thu-vien', name: 'Trung tâm Thông tin – Thư viện', head: 'ThS. Lê C', phone: '024.3838.3842', email: 'thuvien@humg.edu.vn', functions: ['Quản lý thư viện và học liệu', 'CSDL khoa học', 'Thư viện số'], desc: 'Quản lý tài nguyên thông tin, thư viện và học liệu số.', staff: [st('ThS. Lê C', 'Giám đốc', 'lec-tv'), st('ThS. Phạm Thị Hồng Minh', 'Phó Giám đốc', 'phamthihongminh-tv'), st('CN. Nguyễn Văn Trường', 'Cán bộ thư viện số', 'nguyenvantruong-tv'), st('CN. Trần Thị Bích Ngọc', 'Cán bộ phục vụ bạn đọc', 'tranthibichngoc-tv')] },
      { id: 'tt-tuyen-sinh', name: 'Trung tâm Tuyển sinh & Hướng nghiệp', head: 'ThS. Phạm D', phone: '024.3838.3843', email: 'tuyensinh@humg.edu.vn', functions: ['Tư vấn tuyển sinh', 'Hướng nghiệp', 'Truyền thông tuyển sinh'], desc: 'Tổ chức tư vấn, truyền thông tuyển sinh và hướng nghiệp.', staff: [st('ThS. Phạm D', 'Giám đốc', 'phamd-ts'), st('ThS. Nguyễn Hoàng Nam', 'Phó Giám đốc', 'nguyenhoangnam-ts'), st('CN. Vũ Thị Thùy Dương', 'Chuyên viên truyền thông', 'vuthithuyduong-ts'), st('CN. Đặng Văn Hòa', 'Chuyên viên tư vấn tuyển sinh', 'dangvanhoa-ts')] },
      { id: 'tt-phan-tich-thi-nghiem', name: 'Trung tâm Phân tích, Thí nghiệm', head: 'TS. Hoàng E', phone: '024.3838.3844', email: 'thinghiem@humg.edu.vn', functions: ['Phân tích mẫu', 'Kiểm định', 'Dịch vụ thí nghiệm'], desc: 'Cung cấp dịch vụ phân tích, thí nghiệm và kiểm định.', staff: [st('TS. Hoàng E', 'Giám đốc', 'hoange-ptn'), st('TS. Nguyễn Thị Thu Thủy', 'Phó Giám đốc', 'nguyenthithuthuy-ptn'), st('ThS. Trần Đăng Khoa', 'Phụ trách phòng thí nghiệm hóa', 'trandangkhoa-ptn'), st('KS. Lê Văn Sơn', 'Kỹ thuật viên phân tích', 'levanson-ptn')] },
    ],
  },
  'don-vi-truc-thuoc': {
    label: 'Đơn vị trực thuộc', singular: 'Đơn vị',
    intro: 'Các đơn vị sự nghiệp, dịch vụ trực thuộc Trường Đại học Mỏ - Địa chất.',
    list: [
      { id: 'ky-tuc-xa', name: 'Ban Quản lý Ký túc xá', head: 'ThS. Nguyễn F', phone: '024.3838.3850', email: 'ktx@humg.edu.vn', functions: ['Quản lý chỗ ở sinh viên', 'An ninh, trật tự', 'Đời sống nội trú'], desc: 'Quản lý và phục vụ chỗ ở cho sinh viên nội trú.', staff: [st('ThS. Nguyễn F', 'Trưởng ban', 'nguyenf-ktx'), st('CN. Trần Văn Hùng', 'Phó Trưởng ban', 'tranvanhung-ktx'), st('CN. Lê Thị Thu Hằng', 'Cán bộ quản lý sinh viên nội trú', 'lethithuhang-ktx'), st('NV. Phạm Văn Đô', 'Tổ trưởng bảo vệ ký túc xá', 'phamvando-ktx')] },
      { id: 'tram-y-te', name: 'Trạm Y tế', head: 'BS. Trần G', phone: '024.3838.3851', email: 'yte@humg.edu.vn', functions: ['Chăm sóc sức khỏe ban đầu', 'Khám sức khỏe định kỳ', 'Bảo hiểm y tế'], desc: 'Chăm sóc sức khỏe cho cán bộ và sinh viên.', staff: [st('BS. Trần G', 'Trưởng trạm', 'trang-yte'), st('BS. Nguyễn Thị Hoài Thu', 'Bác sĩ điều trị', 'nguyenthihoaithu-yte'), st('YS. Đỗ Thị Kim Dung', 'Y sĩ', 'dothikimdung-yte'), st('CN. Hoàng Văn Lâm', 'Cán bộ bảo hiểm y tế', 'hoangvanlam-yte')] },
      { id: 'xuong-in', name: 'Nhà xuất bản / Xưởng in', head: 'ThS. Lê H', phone: '024.3838.3852', email: 'nxb@humg.edu.vn', functions: ['Xuất bản giáo trình, tài liệu', 'In ấn nội bộ'], desc: 'Xuất bản và in ấn giáo trình, tài liệu học tập.', staff: [st('ThS. Lê H', 'Giám đốc – Tổng biên tập', 'leh-nxb'), st('CN. Nguyễn Đức Anh', 'Phó Giám đốc', 'nguyenducanh-nxb'), st('CN. Trần Thị Lệ Quyên', 'Biên tập viên', 'tranthilequyen-nxb'), st('KTV. Vũ Mạnh Toàn', 'Kỹ thuật viên chế bản', 'vumanhtoan-nxb')] },
      { id: 'tap-chi-khoa-hoc', name: 'Tòa soạn Tạp chí Khoa học Kỹ thuật Mỏ - Địa chất', head: 'PGS.TS. Vũ K', phone: '024.3838.3853', email: 'tapchi@humg.edu.vn', functions: ['Biên tập, xuất bản tạp chí', 'Tổ chức phản biện khoa học'], desc: 'Xuất bản tạp chí khoa học của Nhà trường.', staff: [st('PGS.TS. Vũ K', 'Tổng biên tập', 'vuk-tapchi'), st('PGS.TS. Nguyễn Văn Sáng', 'Phó Tổng biên tập', 'nguyenvansang-tapchi'), st('ThS. Đỗ Thị Thanh Nga', 'Thư ký tòa soạn', 'dothithanhnga-tapchi'), st('CN. Lê Quang Vinh', 'Biên tập – trị sự', 'lequangvinh-tapchi')] },
    ],
  },
}

export const getUnit = (kind, id) => units[kind]?.list.find((u) => u.id === id)

/* ============================================================
   Luồng công khai: KHOA → BỘ MÔN → ĐỘI NGŨ GIẢNG VIÊN → HỒ SƠ GIẢNG VIÊN
   ============================================================ */
const L = (id, name, position, fields, pubs = 12) => ({
  id, name, position, fields, pubs,
  email: `${id}@humg.edu.vn`, phone: '024.3838.3800',
})
const D = (id, name, head, desc, research, size, lecturers) => ({ id, name, head, desc, research, size, lecturers })

export const facultyDepartments = {
  mo: [
    D('khai-thac-ham-lo', 'Bộ môn Khai thác hầm lò', 'PGS.TS. Trần Văn Anh',
      'Đào tạo và nghiên cứu công nghệ khai thác khoáng sản bằng phương pháp hầm lò, cơ giới hóa và an toàn mỏ.',
      ['Cơ giới hóa khấu than', 'Ổn định công trình ngầm', 'Thông gió và an toàn mỏ'], 15, [
        L('tran-van-anh', 'PGS.TS. Trần Văn Anh', 'Trưởng bộ môn', ['Cơ giới hóa khấu than', 'Ổn định công trình ngầm'], 52),
        L('nguyen-quang-huy-hl', 'TS. Nguyễn Quang Huy', 'Phó Trưởng bộ môn', ['Thông gió mỏ', 'An toàn mỏ hầm lò'], 24),
        L('le-thi-mai-hl', 'TS. Lê Thị Mai', 'Giảng viên chính', ['Cơ học đá', 'Chống giữ lò'], 18),
        L('pham-cong-son-hl', 'ThS. Phạm Công Sơn', 'Giảng viên', ['Vận tải hầm lò', 'Thiết bị mỏ'], 7),
      ]),
    D('khai-thac-lo-thien', 'Bộ môn Khai thác lộ thiên', 'TS. Phạm Văn Dũng',
      'Nghiên cứu công nghệ và tối ưu hóa khai thác mỏ lộ thiên, vận tải mỏ và hoàn thổ.',
      ['Tối ưu biên giới mỏ', 'Nổ mìn và khoan', 'Vận tải mỏ lộ thiên'], 12, [
        L('pham-van-dung-lt', 'TS. Phạm Văn Dũng', 'Trưởng bộ môn', ['Tối ưu biên giới mỏ', 'Kế hoạch hóa khai thác'], 33),
        L('hoang-minh-tuan-lt', 'PGS.TS. Hoàng Minh Tuấn', 'Giảng viên cao cấp', ['Nổ mìn và khoan', 'Rung chấn nổ mìn'], 41),
        L('do-thi-hoa-lt', 'ThS. Đỗ Thị Hoa', 'Giảng viên', ['Vận tải mỏ lộ thiên', 'Hoàn thổ – phục hồi'], 6),
      ]),
    D('tuyen-khoang', 'Bộ môn Tuyển khoáng', 'PGS.TS. Ngô Văn Giang',
      'Đào tạo, nghiên cứu công nghệ tuyển và chế biến khoáng sản, thu hồi kim loại và xử lý quặng đuôi.',
      ['Tuyển nổi', 'Tuyển trọng lực', 'Chế biến sâu khoáng sản'], 10, [
        L('ngo-van-giang-tk', 'PGS.TS. Ngô Văn Giang', 'Trưởng bộ môn', ['Tuyển nổi', 'Chế biến sâu khoáng sản'], 47),
        L('vu-thi-lan-tk', 'TS. Vũ Thị Lan', 'Giảng viên chính', ['Tuyển trọng lực', 'Thu hồi kim loại quý'], 20),
        L('bui-duc-thang-tk', 'ThS. Bùi Đức Thắng', 'Giảng viên', ['Xử lý quặng đuôi', 'Hóa tuyển'], 8),
      ]),
  ],
  'dia-chat': [
    D('dia-chat-cong-trinh', 'Bộ môn Địa chất công trình – Địa kỹ thuật', 'TS. Nguyễn Thị Bình',
      'Nghiên cứu tính chất cơ lý của đất đá, ổn định nền móng, hố đào và các bài toán địa kỹ thuật.',
      ['Ổn định mái dốc', 'Nền móng công trình', 'Địa kỹ thuật môi trường'], 14, [
        L('nguyen-thi-binh-dcct', 'TS. Nguyễn Thị Bình', 'Trưởng bộ môn', ['Ổn định mái dốc', 'Nền móng công trình'], 29),
        L('tran-quoc-viet-dcct', 'PGS.TS. Trần Quốc Việt', 'Giảng viên cao cấp', ['Địa kỹ thuật môi trường', 'Cơ học đất không bão hòa'], 44),
        L('le-hoang-nam-dcct', 'TS. Lê Hoàng Nam', 'Giảng viên chính', ['Hố đào sâu', 'Gia cố nền đất yếu'], 17),
        L('pham-thu-ha-dcct', 'ThS. Phạm Thu Hà', 'Giảng viên', ['Khảo sát địa chất công trình'], 6),
      ]),
    D('khoang-san-dia-hoa', 'Bộ môn Khoáng sản – Địa hóa', 'PGS.TS. Hoàng Văn Long',
      'Đào tạo và nghiên cứu về tìm kiếm, thăm dò khoáng sản, địa hóa và đánh giá tài nguyên.',
      ['Địa hóa thăm dò', 'Khoáng sản kim loại hiếm', 'Mô hình hóa mỏ khoáng'], 12, [
        L('hoang-van-long-ksdh', 'PGS.TS. Hoàng Văn Long', 'Trưởng bộ môn', ['Địa hóa thăm dò', 'Khoáng sản kim loại hiếm'], 45),
        L('nguyen-thi-nga-ksdh', 'TS. Nguyễn Thị Nga', 'Phó Trưởng bộ môn', ['Thạch luận', 'Mô hình hóa mỏ khoáng'], 21),
        L('do-van-khoa-ksdh', 'ThS. Đỗ Văn Khoa', 'Giảng viên', ['Đánh giá tài nguyên', 'Địa chất kinh tế'], 7),
      ]),
  ],
  'dau-khi': [
    D('khoan-khai-thac', 'Bộ môn Khoan – Khai thác dầu khí', 'TS. Phạm Văn Cường',
      'Nghiên cứu công nghệ khoan, hoàn thiện giếng và nâng cao hệ số thu hồi dầu.',
      ['Thủy lực khoan', 'Nâng cao thu hồi dầu (EOR)', 'Mô phỏng mỏ'], 13, [
        L('pham-van-cuong-kkt', 'TS. Phạm Văn Cường', 'Trưởng bộ môn', ['Thủy lực khoan', 'Hoàn thiện giếng'], 31),
        L('le-anh-tuan-kkt', 'PGS.TS. Lê Anh Tuấn', 'Giảng viên cao cấp', ['Nâng cao thu hồi dầu (EOR)', 'Mô phỏng mỏ'], 49),
        L('tran-thi-thu-kkt', 'ThS. Trần Thị Thu', 'Giảng viên', ['Dung dịch khoan', 'An toàn giàn khoan'], 8),
      ]),
    D('dia-vat-ly', 'Bộ môn Địa vật lý', 'PGS.TS. Lê Văn Phú',
      'Đào tạo và nghiên cứu các phương pháp địa vật lý thăm dò và địa vật lý giếng khoan.',
      ['Địa chấn thăm dò', 'Địa vật lý giếng khoan', 'Xử lý – minh giải tài liệu'], 11, [
        L('le-van-phu-dvl', 'PGS.TS. Lê Văn Phú', 'Trưởng bộ môn', ['Địa chấn thăm dò', 'Xử lý – minh giải tài liệu'], 46),
        L('nguyen-hai-son-dvl', 'TS. Nguyễn Hải Sơn', 'Giảng viên chính', ['Địa vật lý giếng khoan', 'Nghịch đảo địa chấn'], 19),
        L('vu-thi-oanh-dvl', 'ThS. Vũ Thị Oanh', 'Giảng viên', ['Địa vật lý môi trường', 'Từ – trọng lực'], 6),
      ]),
  ],
  'trac-dia': [
    D('trac-dia-cao-cap', 'Bộ môn Trắc địa cao cấp – Địa không gian', 'PGS.TS. Phạm Văn Định',
      'Nghiên cứu trắc địa cao cấp, GNSS, trọng lực và hệ quy chiếu, quan trắc chuyển dịch biến dạng.',
      ['GNSS – định vị chính xác', 'Quan trắc lún – biến dạng', 'Hệ quy chiếu quốc gia'], 16, [
        L('pham-van-dinh-tdcc', 'PGS.TS. Phạm Văn Định', 'Trưởng bộ môn', ['GNSS – định vị chính xác', 'Hệ quy chiếu quốc gia'], 58),
        L('nguyen-thi-uyen-tdcc', 'TS. Nguyễn Thị Uyên', 'Phó Trưởng bộ môn', ['Quan trắc lún – biến dạng', 'Trắc địa công trình'], 26),
        L('hoang-trung-kien-tdcc', 'TS. Hoàng Trung Kiên', 'Giảng viên chính', ['Trọng lực – geoid', 'Xử lý số liệu trắc địa'], 15),
        L('le-thi-thanh-tdcc', 'ThS. Lê Thị Thanh', 'Giảng viên', ['Trắc địa địa hình', 'Đo đạc UAV'], 7),
      ]),
    D('ban-do-vien-tham-gis', 'Bộ môn Bản đồ – Viễn thám – GIS', 'PGS.TS. Hoàng Văn Em',
      'Đào tạo và nghiên cứu thành lập bản đồ, xử lý ảnh viễn thám và phân tích không gian GIS.',
      ['Viễn thám và học sâu', 'WebGIS', 'Giám sát biến động lớp phủ'], 14, [
        L('hoang-van-em-btvg', 'PGS.TS. Hoàng Văn Em', 'Trưởng bộ môn', ['Viễn thám và học sâu', 'Giám sát biến động lớp phủ'], 71),
        L('tran-minh-quan-btvg', 'TS. Trần Minh Quân', 'Phó Trưởng bộ môn', ['WebGIS', 'Phân tích không gian'], 28),
        L('nguyen-thi-ly-btvg', 'TS. Nguyễn Thị Lý', 'Giảng viên chính', ['Bản đồ số', 'Cơ sở dữ liệu địa lý'], 16),
        L('do-manh-hung-btvg', 'ThS. Đỗ Mạnh Hùng', 'Giảng viên', ['Xử lý ảnh vệ tinh', 'Học máy không gian'], 9),
      ]),
    D('quan-ly-dat-dai', 'Bộ môn Quản lý đất đai', 'TS. Nguyễn Thị Út',
      'Nghiên cứu chính sách, quy hoạch sử dụng đất, định giá đất và hệ thống hồ sơ địa chính.',
      ['Quy hoạch sử dụng đất', 'Định giá bất động sản', 'Địa chính số'], 12, [
        L('nguyen-thi-ut-qldd', 'TS. Nguyễn Thị Út', 'Trưởng bộ môn', ['Quy hoạch sử dụng đất', 'Chính sách đất đai'], 27),
        L('le-van-truong-qldd', 'PGS.TS. Lê Văn Trường', 'Giảng viên cao cấp', ['Định giá bất động sản', 'Kinh tế đất'], 40),
        L('pham-thi-hang-qldd', 'ThS. Phạm Thị Hằng', 'Giảng viên', ['Địa chính số', 'Đăng ký đất đai'], 8),
      ]),
  ],
  cntt: [
    D('khoa-hoc-may-tinh', 'Bộ môn Khoa học máy tính', 'TS. Lê Văn Chính',
      'Đào tạo nền tảng khoa học máy tính, trí tuệ nhân tạo và học máy ứng dụng.',
      ['Học máy – học sâu', 'Thị giác máy tính', 'Tối ưu hóa'], 18, [
        L('le-van-chinh-khmt', 'TS. Lê Văn Chính', 'Trưởng bộ môn', ['Học máy – học sâu', 'Tối ưu hóa'], 38),
        L('nguyen-hoang-anh-khmt', 'PGS.TS. Nguyễn Hoàng Anh', 'Giảng viên cao cấp', ['Thị giác máy tính', 'Xử lý ngôn ngữ tự nhiên'], 55),
        L('tran-thi-bich-ngoc-khmt', 'TS. Trần Thị Bích Ngọc', 'Giảng viên chính', ['Học tăng cường', 'Đồ họa máy tính'], 22),
        L('vu-quang-hai-khmt', 'ThS. Vũ Quang Hải', 'Giảng viên', ['Thuật toán', 'Lập trình thi đấu'], 9),
      ]),
    D('he-thong-thong-tin', 'Bộ môn Hệ thống thông tin', 'TS. Vũ Văn Zũng',
      'Nghiên cứu phân tích – thiết kế hệ thống, cơ sở dữ liệu và hệ thống thông tin doanh nghiệp.',
      ['Dữ liệu lớn', 'Hệ khuyến nghị', 'Kho dữ liệu – BI'], 14, [
        L('vu-van-zung-httt', 'TS. Vũ Văn Zũng', 'Trưởng bộ môn', ['Dữ liệu lớn', 'Kho dữ liệu – BI'], 34),
        L('nguyen-thanh-tung-httt', 'TS. Nguyễn Thanh Tùng', 'Phó Trưởng bộ môn', ['Hệ khuyến nghị', 'Khai phá dữ liệu'], 20),
        L('le-thi-huong-httt', 'ThS. Lê Thị Hương', 'Giảng viên', ['Phân tích thiết kế hệ thống', 'CSDL quan hệ'], 7),
      ]),
    D('mang-may-tinh', 'Bộ môn Mạng máy tính & An toàn thông tin', 'PGS.TS. Hoàng Văn Bằng',
      'Đào tạo về mạng máy tính, hệ thống phân tán và an toàn – bảo mật thông tin.',
      ['An toàn hệ thống', 'IoT', 'Điện toán đám mây'], 12, [
        L('hoang-van-bang-mmt', 'PGS.TS. Hoàng Văn Bằng', 'Trưởng bộ môn', ['An toàn hệ thống', 'Mật mã ứng dụng'], 43),
        L('tran-cong-minh-mmt', 'TS. Trần Công Minh', 'Giảng viên chính', ['IoT', 'Điện toán biên'], 18),
        L('nguyen-thi-thao-mmt', 'ThS. Nguyễn Thị Thảo', 'Giảng viên', ['Điện toán đám mây', 'Quản trị mạng'], 8),
      ]),
  ],
  'co-dien': [
    D('tu-dong-hoa', 'Bộ môn Tự động hóa', 'PGS.TS. Vũ Văn Phong',
      'Nghiên cứu điều khiển tự động, hệ thống nhúng, IoT và tự động hóa dây chuyền công nghiệp mỏ.',
      ['Điều khiển hiện đại', 'IoT công nghiệp', 'SCADA – DCS'], 15, [
        L('vu-van-phong-tdh', 'PGS.TS. Vũ Văn Phong', 'Trưởng bộ môn', ['Điều khiển hiện đại', 'SCADA – DCS'], 41),
        L('nguyen-duc-thinh-tdh', 'TS. Nguyễn Đức Thịnh', 'Phó Trưởng bộ môn', ['IoT công nghiệp', 'Hệ thống nhúng'], 23),
        L('le-thi-yen-tdh', 'ThS. Lê Thị Yến', 'Giảng viên', ['Điều khiển logic khả trình (PLC)', 'Robot công nghiệp'], 8),
      ]),
    D('ky-thuat-dien', 'Bộ môn Kỹ thuật điện', 'TS. Lê Văn Phúc',
      'Đào tạo và nghiên cứu hệ thống điện, truyền động điện và cung cấp điện cho mỏ và công nghiệp.',
      ['Cung cấp điện mỏ', 'Truyền động điện', 'Năng lượng tái tạo'], 12, [
        L('le-van-phuc-ktd', 'TS. Lê Văn Phúc', 'Trưởng bộ môn', ['Cung cấp điện mỏ', 'Chất lượng điện năng'], 30),
        L('pham-quang-dat-ktd', 'PGS.TS. Phạm Quang Đạt', 'Giảng viên cao cấp', ['Truyền động điện', 'Điện tử công suất'], 47),
        L('tran-thi-nhung-ktd', 'ThS. Trần Thị Nhung', 'Giảng viên', ['Năng lượng tái tạo', 'Lưới điện thông minh'], 9),
      ]),
    D('co-khi', 'Bộ môn Kỹ thuật cơ khí', 'PGS.TS. Đỗ Văn Hải',
      'Nghiên cứu thiết kế, chế tạo và bảo trì máy – thiết bị mỏ và công nghiệp.',
      ['Thiết kế máy', 'CAD/CAM/CNC', 'Bảo trì thiết bị mỏ'], 13, [
        L('do-van-hai-ck', 'PGS.TS. Đỗ Văn Hải', 'Trưởng bộ môn', ['Thiết kế máy', 'Bảo trì thiết bị mỏ'], 39),
        L('nguyen-van-toan-ck', 'TS. Nguyễn Văn Toàn', 'Giảng viên chính', ['CAD/CAM/CNC', 'Công nghệ chế tạo máy'], 17),
        L('le-cong-danh-ck', 'ThS. Lê Công Danh', 'Giảng viên', ['Cơ điện tử', 'Mô phỏng động lực học'], 7),
      ]),
  ],
  'kt-qtkd': [
    D('quan-tri-kinh-doanh', 'Bộ môn Quản trị kinh doanh', 'TS. Đỗ Văn Giàu',
      'Đào tạo và nghiên cứu quản trị doanh nghiệp, quản trị dự án và khởi nghiệp trong lĩnh vực tài nguyên.',
      ['Quản trị chiến lược', 'Quản trị dự án khai khoáng', 'Khởi nghiệp đổi mới sáng tạo'], 16, [
        L('do-van-giau-qtkd', 'TS. Đỗ Văn Giàu', 'Trưởng bộ môn', ['Quản trị chiến lược', 'Khởi nghiệp đổi mới sáng tạo'], 26),
        L('nguyen-thi-thu-hien-qtkd', 'PGS.TS. Nguyễn Thị Thu Hiền', 'Giảng viên cao cấp', ['Quản trị dự án khai khoáng', 'Quản trị vận hành'], 38),
        L('tran-van-loc-qtkd', 'ThS. Trần Văn Lộc', 'Giảng viên', ['Marketing', 'Hành vi tổ chức'], 6),
      ]),
    D('ke-toan', 'Bộ môn Kế toán', 'TS. Lê Thị Lam',
      'Đào tạo và nghiên cứu kế toán tài chính, kế toán quản trị và kiểm toán.',
      ['Kế toán quản trị chi phí', 'Phân tích tài chính', 'Kiểm toán nội bộ'], 12, [
        L('le-thi-lam-kt', 'TS. Lê Thị Lam', 'Trưởng bộ môn', ['Kế toán quản trị chi phí', 'Phân tích tài chính'], 24),
        L('pham-van-quyet-kt', 'TS. Phạm Văn Quyết', 'Phó Trưởng bộ môn', ['Kiểm toán nội bộ', 'Kế toán tài chính'], 19),
        L('nguyen-thi-diu-kt', 'ThS. Nguyễn Thị Dịu', 'Giảng viên', ['Thuế', 'Kế toán chi phí mỏ'], 7),
      ]),
  ],
  'moi-truong': [
    D('ky-thuat-moi-truong', 'Bộ môn Kỹ thuật môi trường', 'PGS.TS. Ngô Thị Hồng',
      'Nghiên cứu công nghệ xử lý nước, khí, chất thải rắn và phục hồi môi trường sau khai thác.',
      ['Xử lý nước thải mỏ', 'Hoàn nguyên môi trường mỏ', 'Kinh tế tuần hoàn'], 12, [
        L('ngo-thi-hong-ktmt', 'PGS.TS. Ngô Thị Hồng', 'Trưởng bộ môn', ['Xử lý nước thải mỏ', 'Hoàn nguyên môi trường mỏ'], 36),
        L('tran-van-phuong-ktmt', 'TS. Trần Văn Phương', 'Giảng viên chính', ['Xử lý khí thải', 'Kinh tế tuần hoàn'], 18),
        L('le-thi-kim-ktmt', 'ThS. Lê Thị Kim', 'Giảng viên', ['Quản lý chất thải rắn', 'Quan trắc môi trường'], 8),
      ]),
    D('quan-ly-tai-nguyen', 'Bộ môn Quản lý tài nguyên & Môi trường', 'TS. Trần Văn Phát',
      'Đào tạo và nghiên cứu quản lý tổng hợp tài nguyên, chính sách và phát triển bền vững.',
      ['Quản lý tổng hợp lưu vực', 'Chính sách tài nguyên', 'Biến đổi khí hậu'], 10, [
        L('tran-van-phat-qltn', 'TS. Trần Văn Phát', 'Trưởng bộ môn', ['Quản lý tổng hợp lưu vực', 'Chính sách tài nguyên'], 22),
        L('nguyen-thi-hoa-qltn', 'PGS.TS. Nguyễn Thị Hoa', 'Giảng viên cao cấp', ['Biến đổi khí hậu', 'Đánh giá tác động môi trường'], 33),
        L('do-van-son-qltn', 'ThS. Đỗ Văn Sơn', 'Giảng viên', ['GIS trong quản lý tài nguyên', 'Phát triển bền vững'], 7),
      ]),
  ],
}

export const getDepartment = (khoaId, deptId) => (facultyDepartments[khoaId] || []).find((d) => d.id === deptId)
export const getLecturer = (khoaId, deptId, lecId) =>
  (getDepartment(khoaId, deptId)?.lecturers || []).find((l) => l.id === lecId)

