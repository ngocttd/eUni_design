import { Routes, Route } from 'react-router-dom'

import PublicLayout from './components/layout/PublicLayout.jsx'
import AuthLayout from './components/layout/AuthLayout.jsx'
import PortalLayout from './components/layout/PortalLayout.jsx'

import HomePage from './pages/home/HomePage.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import NotFound from './pages/NotFound.jsx'
import {
  UtilitiesHubPage, ELearningPage, DigitalLibraryPage,
  FormsPage, WorkCalendarPage, WebmailPage, ContactPage,
} from './pages/utilities/index.jsx'
import {
  AdmissionsHubPage, AdmInfoPage, AdmMethodsPage, AdmDossierPage, AdmTimelinePage,
  AdmGuidePage, AdmBenchmarkPage, AdmRegulationsPage, AdmVideosPage, AdmAdvisoryPage, AdmFaqPage,
} from './pages/admissions/index.jsx'
import {
  NewsListPage, NewsDetailPage, EventListPage, EventDetailPage,
  MediaPage, AlbumDetailPage, VideoDetailPage, PodcastDetailPage, SearchResultsPage,
} from './pages/content/index.jsx'
import {
  OverviewPage, RectorMessagePage, HistoryPage, VisionPage, AchievementsPage, NumbersPage,
  OrgChartPage, BoardPage, UnitListPage, UnitDetailPage,
  DepartmentDetailPage, LecturerDetailPage, FacultyStaffPage,
} from './pages/about/index.jsx'
import {
  EducationHubPage, ProgramListPage, ProgramDetailPage, LearningOutcomesPage, GeneralInfoPage,
  TuitionScholarshipPage, AcademicCalendarPage, ResultLookupPage, StudyGuidesPage, SurveyPage,
} from './pages/education/index.jsx'
import {
  LoginPage, ParentLoginPage, ChangePasswordPage, ForgotPasswordPage,
} from './pages/auth/index.jsx'
import {
  ResearchHubPage, ProjectListPage, ProjectDetailPage, PublicationListPage, PublicationDetailPage,
  ExpertListPage, ExpertDetailPage, ResearchGroupsPage, ResearchGroupDetailPage,
  ConferencesPage, ConferenceDetailPage, LabsPage, LabDetailPage, TechTransferPage, PhdTrainingPage,
} from './pages/research/index.jsx'
import {
  CoopHubPage, PartnerListPage, PartnerDetailPage, CoopProgramListPage, CoopProgramDetailPage,
  ExchangePage, IntlStudentsPage, IntlLecturersPage, OpportunitiesPage,
} from './pages/cooperation/index.jsx'
import {
  LifeHubPage, CampusPage, ActivitiesPage, ActivityDetailPage, ClubListPage, ClubDetailPage,
  YouthUnionPage, SportsCulturePage, DormPage, HealthPage, CampusServicesPage,
  StudentSupportPage, JobsPage, JobDetailPage,
} from './pages/life/index.jsx'
import {
  LibraryHubPage, LibrarySearchPage, CollectionsPage, MyItemsPage,
  DatabasesPage, LibraryGuidePage, ItemDetailPage,
} from './pages/library/index.jsx'
import {
  StudentGatewayPage, StuLearningPage, StuRegulationsPage, StuTuitionPage, StuFormsPage,
  StuLifePage, StuJobsPage, StuLibraryPage, StuPortalPage, StuOnboardingPage, StuFaqPage,
} from './pages/student/index.jsx'
import {
  StaffGatewayPage, StfTeachingPage, StfResearchPage, StfRegulationsPage,
  StfFormsPage, StfUtilitiesPage, StfPortalPage, StaffDirectoryPage,
} from './pages/staff/index.jsx'
import { ParentGatewayPage, AlumniPage } from './pages/audience/index.jsx'
import {
  PsDashboard, PsStudyCorner, PsResults, PsSchedule, PsTuition,
  PsForms, PsProgress, PsProfile, PsServices, PsLibrary,
  PsRegCourses, PsRegThesis, PsRegIntern,
  PsNotifications, PsTickets, PsSettings,
} from './pages/portal-student/index.jsx'

import {
  PgDashboard, PgSchedule, PgClasses, PgModules, PgSyllabus,
  PgScholar, PgMaterials, PgStudents, PgResearch, PgTools,
  PgSupervision, PgInternship,
  PgGrades, PgAdmin, PgFinance, PgProfile, PgNotifications, PgTickets, PgSettings,
} from './pages/portal-staff/index.jsx'
import {
  PpDashboard, PpChild, PpResults, PpTuition, PpAttendance, PpSchedule,
  PpNotices, PpContact, PpServices, PpSettings,
} from './pages/portal-parent/index.jsx'
import {
  PlDashboard, PlBI, PlReports, PlApprovals, PlSystem, PlPortalSettings,
  PlSysLog, PlNotifications, PlTraining, PlResearch, PlStudents, PlFinance, PlHR, PlFacilities,
} from './pages/portal-leader/index.jsx'
import {
  CmsDashboard, CmsPosts, CmsEvents, CmsAdmissions, CmsResearch, CmsLearning,
  CmsPostEditor, CmsCategories, CmsMedia, CmsPagesMenu, CmsUsers, CmsRoles,
  CmsSettings, CmsActivity, CmsBackup, CmsBanners,
} from './pages/cms/index.jsx'

/* CMS / Editor (CMS-01 → CMS-10 + lối tắt chuyên mục) */
const cmsPages = {
  '': <CmsDashboard />,
  'bai-viet': <CmsPosts />,
  'bai-viet/moi': <CmsPostEditor />,
  'danh-muc': <CmsCategories />,
  'media': <CmsMedia />,
  'trang-menu': <CmsPagesMenu />,
  'su-kien': <CmsEvents />,
  'tuyen-sinh': <CmsAdmissions />,
  'nghien-cuu': <CmsResearch />,
  'hoc-tap': <CmsLearning />,
  'banner': <CmsBanners />,
  'nguoi-dung': <CmsUsers />,
  'phan-quyen': <CmsRoles />,
  'cau-hinh': <CmsSettings />,
  'nhat-ky': <CmsActivity />,
  'sao-luu': <CmsBackup />,
}

/* MY eUni Portal · Lãnh đạo & Quản trị (PG-PORT-ADMIN · 12.1 → 12.8) */
const portalLeaderPages = {
  '': <PlDashboard />,
  'chi-so-dieu-hanh': <PlBI />,
  'dao-tao': <PlTraining />,
  'nghien-cuu-khoa-hoc': <PlResearch />,
  'sinh-vien': <PlStudents />,
  'tai-chinh': <PlFinance />,
  'nhan-su': <PlHR />,
  'co-so-vat-chat': <PlFacilities />,
  'bao-cao-thong-ke': <PlReports />,
  'canh-bao': <PlApprovals initial="canh-bao" />,
  'phe-duyet': <PlApprovals initial="phe-duyet" />,
  'he-thong': <PlSystem />,
  'cai-dat': <PlPortalSettings />,
  'nhat-ky': <PlSysLog />,
  'thong-bao': <PlNotifications />,
}

/* MY eUni Portal · Phụ huynh (PG-PORT-PARENT · POR-20 → POR-26 + Cài đặt) */
const portalParentPages = {
  '': <PpDashboard />,
  'thong-tin-hoc-sinh': <PpChild />,
  'ket-qua-hoc-tap': <PpResults />,
  'diem-danh': <PpAttendance />,
  'hoc-phi-thanh-toan': <PpTuition />,
  'thong-bao': <PpNotices />,
  'lich-hoc': <PpSchedule />,
  'dang-ky-dich-vu': <PpServices />,
  'lien-he-nha-truong': <PpContact />,
  'cai-dat': <PpSettings />,
}

/* MY eUni Portal · Giảng viên — trang thật cho từng mục (PG-PORT-STAFF · POR-11 → POR-19) */
const portalStaffPages = {
  '': <PgDashboard />,
  'lich-giang-day': <PgSchedule />,
  'quan-ly-lop-hoc': <PgClasses />,
  'ket-qua-hoc-tap': <PgGrades />,
  'nghien-cuu': <PgResearch />,
  'cong-tac': <PgAdmin />,
  'tai-chinh': <PgFinance />,
  'ho-so': <PgProfile />,
  'thong-bao': <PgNotifications />,
  'ho-tro': <PgTickets />,
  'sinh-vien': <PgStudents />,
  'quan-ly-hoc-phan': <PgModules />,
  'de-cuong-tai-lieu': <PgSyllabus />,
  'csdl-khoa-hoc': <PgScholar />,
  'hoc-lieu-so': <PgMaterials />,
  'huong-dan-do-an': <PgSupervision />,
  'thuc-tap-doanh-nghiep': <PgInternship />,
  'tien-ich-elearning': <PgTools />,
  'cai-dat': <PgSettings />,
}

/* MY eUni Portal · Sinh viên — trang thật cho từng mục (PG-PORT · POR-01 → POR-10) */
const portalStudentPages = {
  '': <PsDashboard />,
  'lich-hoc': <PsSchedule />,
  'ket-qua-hoc-tap': <PsResults />,
  'hoc-phi': <PsTuition />,
  'thong-tin-ca-nhan': <PsProfile />,
  'thong-bao': <PsNotifications />,
  'ho-tro': <PsTickets />,
  'goc-hoc-tap': <PsStudyCorner />,
  'dang-ky-mon-hoc': <PsRegCourses />,
  'dang-ky-do-an': <PsRegThesis />,
  'dang-ky-thuc-tap': <PsRegIntern />,
  'tien-do-hoc-tap': <PsProgress />,
  'bieu-mau': <PsForms />,
  'dich-vu-noi-bo': <PsServices />,
  'thu-vien-elearning': <PsLibrary />,
  'cai-dat': <PsSettings />,
}

import { publicRoutes, portals, cmsConfig } from './routes/sitemap.js'

/* Trang chi tiết đã dựng đầy đủ (ngoài các route sinh tự động) */
const builtPages = {
  // Khối "Tiện ích nổi bật"
  '/tien-ich': <UtilitiesHubPage />,
  '/lich-cong-tac': <WorkCalendarPage />,
  '/webmail': <WebmailPage />,
  '/hoc-tap/tuyen-sinh': <AdmissionsHubPage />,
  '/hoc-tap/tuyen-sinh/thong-tin': <AdmInfoPage />,
  '/hoc-tap/tuyen-sinh/phuong-thuc': <AdmMethodsPage />,
  '/hoc-tap/tuyen-sinh/ho-so': <AdmDossierPage />,
  '/hoc-tap/tuyen-sinh/thoi-gian': <AdmTimelinePage />,
  '/hoc-tap/tuyen-sinh/huong-dan': <AdmGuidePage />,
  '/hoc-tap/tuyen-sinh/diem-chuan': <AdmBenchmarkPage />,
  '/hoc-tap/tuyen-sinh/quy-che': <AdmRegulationsPage />,
  '/hoc-tap/tuyen-sinh/video-nganh': <AdmVideosPage />,
  '/hoc-tap/tuyen-sinh/tu-van': <AdmAdvisoryPage />,
  '/hoc-tap/tuyen-sinh/hoi-dap': <AdmFaqPage />,
  '/hoc-tap/e-learning': <ELearningPage />,
  '/hoc-tap/bieu-mau': <FormsPage />,
  '/thu-vien-so': <DigitalLibraryPage />,
  '/lien-he': <ContactPage />,
  // Tin tức · Sự kiện · Media · Tìm kiếm
  '/tim-kiem': <SearchResultsPage />,
  '/tin-tuc': <NewsListPage />,
  '/tin-tuc/:slug': <NewsDetailPage />,
  '/su-kien': <EventListPage />,
  '/su-kien/:slug': <EventDetailPage />,
  '/media': <MediaPage />,
  '/media/anh/:slug': <AlbumDetailPage />,
  '/media/video/:slug': <VideoDetailPage />,
  '/media/podcast/:slug': <PodcastDetailPage />,
  // Giới thiệu HUMG (PG-PUB-03 / PG-PUB-04)
  '/gioi-thieu': <OverviewPage />,
  '/gioi-thieu/thong-diep-hieu-truong': <RectorMessagePage />,
  '/gioi-thieu/lich-su': <HistoryPage />,
  '/gioi-thieu/tam-nhin-su-mang': <VisionPage />,
  '/gioi-thieu/thanh-tuu': <AchievementsPage />,
  '/gioi-thieu/con-so': <NumbersPage />,
  '/gioi-thieu/co-cau-to-chuc': <OrgChartPage />,
  '/gioi-thieu/ban-giam-hieu': <BoardPage />,
  '/gioi-thieu/khoa': <UnitListPage kind="khoa" />,
  '/gioi-thieu/khoa/:id': <UnitDetailPage kind="khoa" />,
  '/gioi-thieu/khoa/:khoaId/bo-mon/:bmId': <DepartmentDetailPage />,
  '/gioi-thieu/khoa/:khoaId/bo-mon/:bmId/giang-vien/:gvId': <LecturerDetailPage />,
  '/gioi-thieu/giang-vien': <FacultyStaffPage />,
  '/gioi-thieu/phong-ban': <UnitListPage kind="phong-ban" />,
  '/gioi-thieu/phong-ban/:id': <UnitDetailPage kind="phong-ban" />,
  '/gioi-thieu/trung-tam-vien': <UnitListPage kind="trung-tam-vien" />,
  '/gioi-thieu/trung-tam-vien/:id': <UnitDetailPage kind="trung-tam-vien" />,
  '/gioi-thieu/don-vi-truc-thuoc': <UnitListPage kind="don-vi-truc-thuoc" />,
  '/gioi-thieu/don-vi-truc-thuoc/:id': <UnitDetailPage kind="don-vi-truc-thuoc" />,
  // Học tập (PG-EDU-01 → PG-EDU-11)
  '/hoc-tap': <EducationHubPage />,
  '/hoc-tap/chuong-trinh-dao-tao': <ProgramListPage />,
  '/hoc-tap/chuong-trinh-dao-tao/:id': <ProgramDetailPage />,
  '/hoc-tap/chuan-dau-ra': <LearningOutcomesPage />,
  '/hoc-tap/thong-tin-chung': <GeneralInfoPage />,
  '/hoc-tap/hoc-phi-hoc-bong': <TuitionScholarshipPage />,
  '/hoc-tap/lich-hoc': <AcademicCalendarPage />,
  '/hoc-tap/tra-cuu-ket-qua': <ResultLookupPage />,
  '/hoc-tap/huong-dan': <StudyGuidesPage />,
  '/hoc-tap/khao-sat': <SurveyPage />,
  // Nghiên cứu (PG-PUB-08 / PG-RES-01 → 05)
  '/nghien-cuu': <ResearchHubPage />,
  '/nghien-cuu/de-tai': <ProjectListPage />,
  '/nghien-cuu/de-tai/:id': <ProjectDetailPage />,
  '/nghien-cuu/cong-bo': <PublicationListPage />,
  '/nghien-cuu/cong-bo/:id': <PublicationDetailPage />,
  '/nghien-cuu/chuyen-gia': <ExpertListPage />,
  '/nghien-cuu/chuyen-gia/:id': <ExpertDetailPage />,
  '/nghien-cuu/nhom-nghien-cuu': <ResearchGroupsPage />,
  '/nghien-cuu/nhom-nghien-cuu/:id': <ResearchGroupDetailPage />,
  '/nghien-cuu/hoi-nghi-hoi-thao': <ConferencesPage />,
  '/nghien-cuu/hoi-nghi-hoi-thao/:slug': <ConferenceDetailPage />,
  '/nghien-cuu/phong-thi-nghiem': <LabsPage />,
  '/nghien-cuu/phong-thi-nghiem/:id': <LabDetailPage />,
  '/nghien-cuu/chuyen-giao-cong-nghe': <TechTransferPage />,
  '/nghien-cuu/nghien-cuu-sinh': <PhdTrainingPage />,
  // Hợp tác (PG-COO-01 → PG-COO-05)
  '/hop-tac': <CoopHubPage />,
  '/hop-tac/doi-tac': <PartnerListPage scope="all" />,
  '/hop-tac/doi-tac/:id': <PartnerDetailPage />,
  '/hop-tac/doi-tac-trong-nuoc': <PartnerListPage scope="trong-nuoc" />,
  '/hop-tac/doi-tac-quoc-te': <PartnerListPage scope="quoc-te" />,
  '/hop-tac/chuong-trinh-du-an': <CoopProgramListPage />,
  '/hop-tac/chuong-trinh-du-an/:id': <CoopProgramDetailPage />,
  '/hop-tac/trao-doi': <ExchangePage />,
  '/hop-tac/sinh-vien-quoc-te': <IntlStudentsPage />,
  '/hop-tac/giang-vien-quoc-te': <IntlLecturersPage />,
  '/hop-tac/co-hoi-hop-tac': <OpportunitiesPage />,
  // Đời sống (PG-LIFE-01 → PG-LIFE-06)
  '/doi-song': <LifeHubPage />,
  '/doi-song/campus-co-so-vat-chat': <CampusPage />,
  '/doi-song/hoat-dong-sinh-vien': <ActivitiesPage />,
  '/doi-song/hoat-dong-sinh-vien/:slug': <ActivityDetailPage />,
  '/doi-song/cau-lac-bo': <ClubListPage />,
  '/doi-song/cau-lac-bo/:id': <ClubDetailPage />,
  '/doi-song/doan-hoi': <YouthUnionPage />,
  '/doi-song/the-thao-van-hoa': <SportsCulturePage />,
  '/doi-song/ky-tuc-xa': <DormPage />,
  '/doi-song/y-te': <HealthPage />,
  '/doi-song/dich-vu-campus': <CampusServicesPage />,
  '/doi-song/ho-tro-sinh-vien': <StudentSupportPage />,
  '/doi-song/viec-lam-khoi-nghiep': <JobsPage />,
  '/doi-song/viec-lam-khoi-nghiep/:id': <JobDetailPage />,
  // Thư viện (PG-LIB-01 → PG-LIB-01.4)
  '/thu-vien': <LibraryHubPage />,
  '/thu-vien/tim-kiem': <LibrarySearchPage />,
  '/thu-vien/bo-suu-tap': <CollectionsPage />,
  '/thu-vien/tai-lieu-cua-toi': <MyItemsPage />,
  '/thu-vien/csdl-khoa-hoc': <DatabasesPage />,
  '/thu-vien/huong-dan': <LibraryGuidePage />,
  '/thu-vien/tai-lieu/:id': <ItemDetailPage />,
  // Cổng Sinh viên (PG-STU-01 → PG-STU-01.8)
  '/sinh-vien': <StudentGatewayPage />,
  '/sinh-vien/hoc-tap': <StuLearningPage />,
  '/sinh-vien/quy-che': <StuRegulationsPage />,
  '/sinh-vien/hoc-phi-hoc-bong': <StuTuitionPage />,
  '/sinh-vien/bieu-mau': <StuFormsPage />,
  '/sinh-vien/doi-song-ho-tro': <StuLifePage />,
  '/sinh-vien/viec-lam-khoi-nghiep': <StuJobsPage />,
  '/sinh-vien/thu-vien-elearning': <StuLibraryPage />,
  '/sinh-vien/my-euni': <StuPortalPage />,
  '/sinh-vien/tan-sinh-vien': <StuOnboardingPage />,
  '/sinh-vien/faq': <StuFaqPage />,
  // Cổng Giảng viên / Cán bộ (PG-STAFF-01 → PG-STAFF-01.7)
  '/giang-vien': <StaffGatewayPage />,
  '/giang-vien/giang-day': <StfTeachingPage />,
  '/giang-vien/nghien-cuu': <StfResearchPage />,
  '/giang-vien/quy-dinh': <StfRegulationsPage />,
  '/giang-vien/bieu-mau': <StfFormsPage />,
  '/giang-vien/tien-ich': <StfUtilitiesPage />,
  '/giang-vien/danh-ba': <StaffDirectoryPage />,
  '/giang-vien/my-euni': <StfPortalPage />,
  // Cổng đối tượng
  '/phu-huynh': <ParentGatewayPage />,
  '/cuu-sinh-vien': <AlumniPage />,
}

export default function App() {
  return (
    <Routes>
      {/* ---------- Trang công khai ---------- */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />

        {/* Trang chi tiết đã hoàn thiện */}
        {Object.entries(builtPages).map(([path, el]) => (
          <Route key={path} path={path} element={el} />
        ))}

        {/* Các trang còn lại: khung điều hướng */}
        {publicRoutes
          .filter((r) => !builtPages[r.path])
          .map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={<PlaceholderPage title={r.title} wireframe={r.wireframe} />}
            />
          ))}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ---------- Đăng nhập (AUTH-01 → 04) ---------- */}
      <Route element={<AuthLayout />}>
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-nhap-phu-huynh" element={<ParentLoginPage />} />
        <Route path="/doi-mat-khau" element={<ChangePasswordPage />} />
        <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />
      </Route>

      {/* ---------- MY eUni Portal (POR-*) ---------- */}
      {portals.map((cfg) => {
        const real = cfg.key === 'sinh-vien' ? portalStudentPages
          : cfg.key === 'giang-vien' ? portalStaffPages
          : cfg.key === 'phu-huynh' ? portalParentPages
          : cfg.key === 'lanh-dao' ? portalLeaderPages : null
        return (
          <Route key={cfg.base} path={cfg.base} element={<PortalLayout config={cfg} />}>
            {cfg.items.map((it) => {
              const el = (real && real[it.path || '']) || (
                <PlaceholderPage title={it.title} wireframe={it.wireframe} />
              )
              return it.path
                ? <Route key={it.path} path={it.path} element={el} />
                : <Route key="index" index element={el} />
            })}
          </Route>
        )
      })}

      {/* ---------- CMS / Editor (CMS-01 → CMS-10) ---------- */}
      <Route path={cmsConfig.base} element={<PortalLayout config={cmsConfig} variant="cms" />}>
        {cmsConfig.items.map((it) => {
          const el = cmsPages[it.path || ''] || <PlaceholderPage title={it.title} wireframe={it.wireframe} />
          return it.path
            ? <Route key={it.path} path={it.path} element={el} />
            : <Route key="index" index element={el} />
        })}
      </Route>
    </Routes>
  )
}
