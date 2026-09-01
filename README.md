# HUMG Digital Portal — Prototype (React)

Prototype cổng thông tin điện tử Trường Đại học Mỏ - Địa chất, dựng theo
`sitemap_new.png` và bộ wireframe trong `wireframe_humg/`.

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production -> dist/
npm run preview  # xem thử bản build
```

## Cấu trúc thư mục

```
src/
  routes/sitemap.js        # KHAI BÁO TOÀN BỘ CẤU TRÚC WEBSITE theo sitemap
  App.jsx                  # sinh <Route> từ sitemap.js
  data/home.js             # mock data trang chủ
  lib/Icon.jsx             # bộ icon nội tuyến (không phụ thuộc lib ngoài)
  components/
    common/                # Brand, Breadcrumb, ScrollToTop
    layout/                # Header, Footer, PublicLayout, AuthLayout, PortalLayout
  pages/
    home/HomePage.jsx      # ✅ TRANG CHỦ (PG-PUB-01) — đã dựng hoàn chỉnh
    PlaceholderPage.jsx    # khung dùng chung cho các màn hình chưa dựng chi tiết
    NotFound.jsx
```

## Trạng thái

| Nhóm | Route | Trạng thái |
|------|-------|-----------|
| Trang chủ | `/` | ✅ Hoàn chỉnh (hero carousel, quick links, "Dành cho bạn", Tin tức / Sự kiện / Media, Đối tác) |
| 10 khối công khai | `/gioi-thieu`, `/hoc-tap`, `/nghien-cuu`, `/hop-tac`, `/doi-song`, `/thu-vien`, `/sinh-vien`, `/giang-vien`, `/phu-huynh` … | 🧩 Khung + điều hướng (PlaceholderPage) |
| Auth | `/dang-nhap`, `/dang-nhap-phu-huynh`, `/doi-mat-khau`, `/quen-mat-khau` | 🧩 Khung + layout |
| MY eUni Portal | `/euni/sinh-vien`, `/euni/giang-vien`, `/euni/phu-huynh`, `/euni/lanh-dao` | 🧩 Khung + sidebar theo vai trò |
| CMS | `/cms` | 🧩 Khung + sidebar |

Header có mega-menu đầy đủ 11 khối; mỗi mục Placeholder hiển thị mã wireframe
tham chiếu và danh sách trang cùng nhóm để tiếp tục dựng ở bước sau.

## Bảng màu (từ wireframe)

`--humg-primary #0A3D91` · `--humg-secondary #1976D2` · `--humg-accent #FF9800`
· nền `#F8FAFC` · container `1200px` · radius card `12px` / button `8px`.
