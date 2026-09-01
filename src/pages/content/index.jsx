import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Icon from '../../lib/Icon.jsx'
import {
  PageShell, HeroSearch, Panel, DataTable, LinkList, SupportCard, NewsMini,
  MetaBar, Chips, Pagination, ArticleRow, MediaCard, ShareBar, ArticleBody, Lightbox,
} from '../../components/ui/page.jsx'
import {
  articles, events, albums, videos, podcasts, newsCategories,
  getArticle, getEvent, getAlbum, getVideo, getPodcast,
  relatedArticles, otherEvents, categoryCounts, searchAll,
} from '../../data/content.js'
import './content.css'

/* ============================================================ TIN TỨC ============================================================ */
export function NewsListPage() {
  const [cat, setCat] = useState('Tất cả')
  const [unit, setUnit] = useState('Tất cả')
  const [sort, setSort] = useState('new')
  const counts = useMemo(categoryCounts, [])
  const units = useMemo(() => ['Tất cả', ...Array.from(new Set(articles.map((a) => a.unit)))], [])
  const list = useMemo(() => {
    let l = articles.filter((a) =>
      (cat === 'Tất cả' || a.category === cat)
      && (unit === 'Tất cả' || a.unit === unit))
    l = [...l].sort((a, b) => (sort === 'new' ? 0 : b.views - a.views))
    return l
  }, [cat, unit, sort])

  const chipOpts = [
    { key: 'Tất cả', label: 'Tất cả', count: counts['Tất cả'] },
    ...newsCategories.map((c) => ({ key: c, label: c, count: counts[c] })),
  ]

  return (
    <PageShell
      eyebrow="Trang chủ"
      title="Tin tức & Sự kiện"
      lead="Cập nhật những thông tin, hoạt động và thông báo mới nhất của Trường Đại học Mỏ - Địa chất."
      crumbs={[{ label: 'Tin tức & Sự kiện' }]}
      hero={<HeroSearch placeholder="Tìm tin tức, sự kiện…" />}
      sidebar={
        <>
          <Panel title="Danh mục tin" icon="layers" flush>
            <ul className="content-catlist">
              {chipOpts.map((o) => (
                <li key={o.key}>
                  <button type="button" className={cat === o.key ? 'is-active' : ''} onClick={() => setCat(o.key)}>
                    <span>{o.label}</span><em>{o.count}</em>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Tin nổi bật" icon="award">
            <NewsMini items={articles.slice(0, 4).map((a) => ({ date: a.date, title: a.title, to: `/tin-tuc/${a.slug}` }))} />
          </Panel>
          <SupportCard
            title="Đăng ký nhận tin"
            lead="Nhận bản tin mới nhất từ HUMG qua email."
            cta={{ label: 'Đăng ký', to: '/lien-he' }}
          />
        </>
      }
    >
      <div className="content-toolbar">
        <Chips options={chipOpts} value={cat} onChange={setCat} />
        <div className="content-toolbar__right">
          <label className="content-sel">
            <span>Đơn vị</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              {units.map((u) => <option key={u}>{u}</option>)}
            </select>
          </label>
          <label className="content-sel">
            <span>Sắp xếp</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="new">Mới nhất</option>
              <option value="view">Xem nhiều nhất</option>
            </select>
          </label>
        </div>
      </div>

      <Panel>
        <p className="content-count"><strong>{list.length}</strong> kết quả</p>
        <div className="content-list">
          {list.map((a) => (
            <ArticleRow
              key={a.slug}
              to={`/tin-tuc/${a.slug}`}
              tag={a.category}
              title={a.title}
              excerpt={a.excerpt}
              meta={[
                { icon: 'calendar', text: a.date },
                { icon: 'grid', text: `${a.views.toLocaleString('vi-VN')} lượt xem` },
                { icon: 'building', text: a.unit },
              ]}
            />
          ))}
        </div>
      </Panel>
      <Pagination page={1} total={8} />
    </PageShell>
  )
}

export function NewsDetailPage() {
  const { slug } = useParams()
  const a = getArticle(slug) || articles[0]
  return (
    <PageShell
      eyebrow={a.category}
      title={a.title}
      crumbs={[{ label: 'Tin tức & Sự kiện', to: '/tin-tuc' }, { label: a.title }]}
      hero={
        <div className="content-articlehead">
          <MetaBar
            items={[
              { icon: 'calendar', text: a.date },
              { icon: 'grid', text: `${a.views.toLocaleString('vi-VN')} lượt xem` },
              { icon: 'building', text: a.unit },
            ]}
          />
          <ShareBar />
        </div>
      }
      sidebar={
        <>
          <Panel title="Tin tức liên quan" icon="newspaper">
            <NewsMini items={relatedArticles(a.slug).map((x) => ({ date: x.date, title: x.title, to: `/tin-tuc/${x.slug}` }))} />
          </Panel>
          <LinkList
            title="Chủ đề nổi bật"
            items={['Đào tạo & Tuyển sinh', 'Nghiên cứu khoa học', 'Hợp tác quốc tế', 'Hoạt động sinh viên'].map((l) => ({ label: l, to: '/tin-tuc' }))}
          />
        </>
      }
    >
      <div className="humg-ph content-cover" data-ratio="16-9"><span>Ảnh bài viết · {a.title}</span></div>
      <ArticleBody blocks={a.body} />
      {a.docs?.length > 0 && (
        <Panel title="Tài liệu liên quan" icon="file">
          <ul className="ui-doclist">
            {a.docs.map((d, i) => (
              <li key={i}>
                <span className="ui-doclist__ic"><Icon name="file" size={16} /></span>
                <span className="ui-doclist__name">{d.name}<em>{d.meta}</em></span>
                <a href="#" className="ui-doclist__dl" aria-label="Tải xuống"><Icon name="download" size={16} /></a>
              </li>
            ))}
          </ul>
        </Panel>
      )}
      <div className="content-tags">
        <span>Tags:</span>
        {a.tags.map((t) => <Link key={t} to="/tin-tuc" className="humg-tag">{t}</Link>)}
      </div>
    </PageShell>
  )
}

/* ============================================================ SỰ KIỆN ============================================================ */
function EventRow({ e }) {
  return (
    <article className="content-event">
      <Link to={`/su-kien/${e.slug}`} className="content-event__date">
        <strong>{e.day}</strong><span>{e.month}</span>
      </Link>
      <div className="content-event__body">
        <span className="humg-tag humg-tag--accent">{e.status}</span>
        <h3><Link to={`/su-kien/${e.slug}`}>{e.title}</Link></h3>
        <MetaBar
          items={[
            { icon: 'clock', text: e.time },
            { icon: 'map-pin', text: e.place },
            { icon: 'building', text: e.organizer },
          ]}
        />
      </div>
      <Link to={`/su-kien/${e.slug}`} className="humg-btn humg-btn--ghost content-event__cta">Chi tiết</Link>
    </article>
  )
}

export function EventListPage() {
  return (
    <PageShell
      eyebrow="Trang chủ"
      title="Sự kiện sắp diễn ra"
      lead="Lịch hội thảo, hội nghị, sự kiện học thuật và hoạt động của Trường Đại học Mỏ - Địa chất."
      crumbs={[{ label: 'Sự kiện' }]}
      hero={<HeroSearch placeholder="Tìm sự kiện…" />}
      sidebar={
        <>
          <Panel title="Lịch tháng" icon="calendar">
            <NewsMini items={events.map((e) => ({ date: `${e.day}/${e.month.replace('THG ', '').padStart(2, '0')}`, title: e.title, to: `/su-kien/${e.slug}` }))} />
          </Panel>
          <SupportCard
            title="Nhận thông báo sự kiện"
            lead="Đăng ký để không bỏ lỡ hội thảo, hội nghị của HUMG."
            cta={{ label: 'Đăng ký', to: '/lien-he' }}
          />
        </>
      }
    >
      <Panel title="Tất cả sự kiện" icon="calendar">
        <div className="content-eventlist">
          {events.map((e) => <EventRow key={e.slug} e={e} />)}
        </div>
      </Panel>
      <Pagination page={1} total={3} />
    </PageShell>
  )
}

export function EventDetailPage() {
  const { slug } = useParams()
  const e = getEvent(slug) || events[0]
  return (
    <PageShell
      eyebrow="Sự kiện"
      title={e.title}
      crumbs={[{ label: 'Sự kiện', to: '/su-kien' }, { label: e.title }]}
      hero={
        <div className="content-articlehead">
          <MetaBar
            items={[
              { icon: 'calendar', text: e.date },
              { icon: 'clock', text: e.time },
              { icon: 'map-pin', text: e.place },
            ]}
          />
          <Link to="/lien-he" className="humg-btn humg-btn--accent">Đăng ký tham dự <Icon name="arrow-right" size={15} /></Link>
        </div>
      }
      sidebar={
        <>
          <Panel title="Sự kiện khác" icon="calendar">
            <NewsMini items={otherEvents(e.slug).map((x) => ({ date: x.date, title: x.title, to: `/su-kien/${x.slug}` }))} />
          </Panel>
          <div className="humg-ph content-map" data-ratio="4-3"><span>Bản đồ · {e.place}</span></div>
        </>
      }
    >
      <div className="humg-ph content-cover" data-ratio="16-9"><span>Ảnh sự kiện · {e.title}</span></div>
      <ArticleBody blocks={e.desc} />
      <Panel title="Chương trình" icon="clock">
        <ul className="content-agenda">
          {e.agenda.map((a, i) => (
            <li key={i}><span className="content-agenda__time">{a.time}</span><span>{a.item}</span></li>
          ))}
        </ul>
      </Panel>
      <Panel title="Thông tin sự kiện" icon="grid" flush>
        <DataTable
          columns={['Mục', 'Chi tiết']}
          rows={[
            ['Thời gian', `${e.date} · ${e.time}`],
            ['Địa điểm', e.placeFull],
            ['Đơn vị tổ chức', e.organizer],
            ['Đối tượng', e.audience],
            ['Liên hệ', e.contact],
          ]}
        />
      </Panel>
    </PageShell>
  )
}

/* ============================================================ MEDIA ============================================================ */
export function MediaPage() {
  const [tab, setTab] = useState('anh')
  const tabs = [
    { key: 'anh', label: `Thư viện ảnh` },
    { key: 'video', label: `Video` },
    { key: 'podcast', label: `Podcast` },
  ]
  return (
    <PageShell
      eyebrow="Trang chủ"
      title="Media HUMG"
      lead="Kho hình ảnh, video và podcast về hoạt động đào tạo, nghiên cứu và đời sống tại Trường Đại học Mỏ - Địa chất."
      crumbs={[{ label: 'Media HUMG' }]}
      hero={<HeroSearch placeholder="Tìm album, video, podcast…" />}
      sidebar={
        <>
          <Panel title="Xem nhiều nhất" icon="award">
            <NewsMini
              items={[
                { date: `${videos[0].views.toLocaleString('vi-VN')} lượt xem`, title: videos[0].title, to: `/media/video/${videos[0].slug}` },
                { date: `${podcasts[2].plays.toLocaleString('vi-VN')} lượt nghe`, title: podcasts[2].title, to: `/media/podcast/${podcasts[2].slug}` },
                { date: `${albums[0].count} ảnh`, title: albums[0].title, to: `/media/anh/${albums[0].slug}` },
              ]}
            />
          </Panel>
          <LinkList title="Kênh HUMG" items={[{ label: 'YouTube HUMG', external: true }, { label: 'Fanpage HUMG', external: true }, { label: 'Podcast trên Spotify', external: true }]} />
        </>
      }
    >
      <Chips options={tabs} value={tab} onChange={setTab} />

      {tab === 'anh' && (
        <Panel title="Album ảnh" icon="image">
          <div className="content-mgrid">
            {albums.map((a) => (
              <MediaCard key={a.slug} to={`/media/anh/${a.slug}`} kind="album" badge="Album" title={a.title} meta={`${a.date} · ${a.count} ảnh`} />
            ))}
          </div>
        </Panel>
      )}
      {tab === 'video' && (
        <Panel title="Video" icon="play">
          <div className="content-mgrid">
            {videos.map((v) => (
              <MediaCard key={v.slug} to={`/media/video/${v.slug}`} kind="video" badge={v.duration} title={v.title} meta={`${v.date} · ${v.channel}`} />
            ))}
          </div>
        </Panel>
      )}
      {tab === 'podcast' && (
        <Panel title="Podcast" icon="headphones">
          <div className="content-mgrid">
            {podcasts.map((p) => (
              <MediaCard key={p.slug} to={`/media/podcast/${p.slug}`} kind="podcast" badge={p.episode} title={p.title} meta={`${p.date} · ${p.duration}`} />
            ))}
          </div>
        </Panel>
      )}
      <Pagination page={1} total={3} />
    </PageShell>
  )
}

export function AlbumDetailPage() {
  const { slug } = useParams()
  const a = getAlbum(slug) || albums[0]
  const [open, setOpen] = useState(null)
  return (
    <PageShell
      eyebrow="Media · Thư viện ảnh"
      title={a.title}
      crumbs={[{ label: 'Media HUMG', to: '/media' }, { label: a.title }]}
      hero={<MetaBar items={[{ icon: 'calendar', text: a.date }, { icon: 'image', text: `${a.count} ảnh` }]} />}
      sidebar={
        <Panel title="Album khác" icon="image">
          <NewsMini items={albums.filter((x) => x.slug !== a.slug).map((x) => ({ date: `${x.count} ảnh`, title: x.title, to: `/media/anh/${x.slug}` }))} />
        </Panel>
      }
    >
      <Panel flush>
        <div className="content-photos">
          {a.photos.map((p, i) => (
            <button key={i} type="button" className="content-photo" onClick={() => setOpen(i)}>
              <span className="humg-ph" data-ratio="1-1"><span>{p.label}</span></span>
              <span className="content-photo__zoom"><Icon name="search" size={16} /></span>
            </button>
          ))}
        </div>
      </Panel>

      {open !== null && (
        <Lightbox photos={a.photos} startIndex={open} onClose={() => setOpen(null)} />
      )}
    </PageShell>
  )
}

export function VideoDetailPage() {
  const { slug } = useParams()
  const v = getVideo(slug) || videos[0]
  return (
    <PageShell
      eyebrow="Media · Video"
      title={v.title}
      crumbs={[{ label: 'Media HUMG', to: '/media' }, { label: v.title }]}
      hero={<MetaBar items={[{ icon: 'calendar', text: v.date }, { icon: 'play', text: v.channel }, { icon: 'clock', text: v.duration }, { icon: 'grid', text: `${v.views.toLocaleString('vi-VN')} lượt xem` }]} />}
      sidebar={
        <Panel title="Video liên quan" icon="play">
          <NewsMini items={videos.filter((x) => x.slug !== v.slug).map((x) => ({ date: x.duration, title: x.title, to: `/media/video/${x.slug}` }))} />
        </Panel>
      }
    >
      <div className="humg-ph content-player" data-ratio="16-9">
        <span className="content-player__btn"><Icon name="play" size={28} /></span>
        <span>{v.title}</span>
      </div>
      <Panel title="Mô tả" icon="newspaper"><p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>{v.desc}</p></Panel>
      <ShareBar />
    </PageShell>
  )
}

export function PodcastDetailPage() {
  const { slug } = useParams()
  const p = getPodcast(slug) || podcasts[0]
  return (
    <PageShell
      eyebrow="Media · Podcast"
      title={p.title}
      crumbs={[{ label: 'Media HUMG', to: '/media' }, { label: p.title }]}
      hero={<MetaBar items={[{ icon: 'headphones', text: p.episode }, { icon: 'calendar', text: p.date }, { icon: 'clock', text: p.duration }, { icon: 'user', text: p.host }]} />}
      sidebar={
        <Panel title="Tập khác" icon="headphones">
          <NewsMini items={podcasts.filter((x) => x.slug !== p.slug).map((x) => ({ date: x.episode, title: x.title, to: `/media/podcast/${x.slug}` }))} />
        </Panel>
      }
    >
      <div className="content-audio">
        <button type="button" className="content-audio__play" aria-label="Phát"><Icon name="play" size={22} /></button>
        <div className="content-audio__bar"><span style={{ width: '32%' }} /></div>
        <span className="content-audio__time">10:18 / {p.duration}</span>
      </div>
      <Panel title="Nội dung tập" icon="newspaper">
        <p style={{ marginTop: 0, fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
        <ul className="content-notes">
          {p.notes.map((n, i) => <li key={i}><Icon name="check" size={14} /> {n}</li>)}
        </ul>
      </Panel>
      <ShareBar />
    </PageShell>
  )
}

/* ============================================================ TÌM KIẾM ============================================================ */
export function SearchResultsPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [term, setTerm] = useState(q)
  const [type, setType] = useState('Tất cả')

  const all = useMemo(() => searchAll(q), [q])
  const types = ['Tất cả', 'Bài viết', 'Trang', 'Sự kiện', 'Tài liệu', 'Media']
  const counts = useMemo(() => {
    const m = { 'Tất cả': all.length }
    types.slice(1).forEach((t) => { m[t] = all.filter((r) => r.type === t).length })
    return m
  }, [all])
  const results = type === 'Tất cả' ? all : all.filter((r) => r.type === type)

  const submit = (e) => {
    e.preventDefault()
    setParams(term ? { q: term } : {})
  }

  return (
    <PageShell
      eyebrow="Tìm kiếm"
      title="Kết quả tìm kiếm"
      crumbs={[{ label: 'Kết quả tìm kiếm toàn cục' }]}
      hero={
        <form className="pg-search" onSubmit={submit}>
          <Icon name="search" size={18} />
          <input type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Nhập từ khóa…" />
          <button type="submit" className="humg-btn humg-btn--primary">Tìm kiếm</button>
        </form>
      }
      sidebar={
        <>
          <div className="ui-linklist">
            <h3>Loại nội dung</h3>
            <ul>
              {types.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    className={`content-typebtn ${type === t ? 'is-active' : ''}`}
                    onClick={() => setType(t)}
                  >
                    <span>{t}</span><em>{counts[t] ?? 0}</em>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <SupportCard title="Bạn cần hỗ trợ?" lead="Không tìm thấy thông tin bạn cần?" cta={{ label: 'Liên hệ ngay', to: '/lien-he' }} />
        </>
      }
    >
      <p className="content-searchmeta">
        {q ? <>Khoảng <strong>{all.length}</strong> kết quả cho “{q}” (0,28 giây)</> : <>Nhập từ khóa để tìm kiếm trên toàn bộ cổng thông tin.</>}
      </p>
      <Panel>
        {results.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--humg-text-secondary)' }}>Không có kết quả phù hợp.</p>
        ) : (
          <div className="content-list">
            {results.map((r, i) => (
              <ArticleRow
                key={i}
                to={r.to}
                tag={r.type}
                title={r.title}
                excerpt={r.excerpt}
                meta={[{ icon: 'layers', text: r.meta }]}
              />
            ))}
          </div>
        )}
      </Panel>
      <Pagination page={1} total={Math.max(1, Math.ceil(results.length / 10))} />
    </PageShell>
  )
}
