'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Compass,
  Filter,
  Leaf,
  MapPin,
  Menu,
  Mountain,
  Search,
  ShieldCheck,
  Star,
  Users,
  X,
} from 'lucide-react'

const trails = [
  { name: 'Emerald Lake Loop', location: 'Rocky Mountain National Park, CO', difficulty: 'Moderate', distance: '5.2 mi', elevation: '682 ft', duration: '2h 40m', rating: '4.9', reviews: 328, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85', tone: 'from-emerald-950/60' },
  { name: 'Alpine Pass Trail', location: 'Mount Rainier National Park, WA', difficulty: 'Challenging', distance: '8.7 mi', elevation: '2,140 ft', duration: '5h 15m', rating: '4.8', reviews: 214, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=85', tone: 'from-slate-950/60' },
  { name: 'Fern Gully Walk', location: 'Olympic National Park, WA', difficulty: 'Easy', distance: '2.4 mi', elevation: '210 ft', duration: '1h 10m', rating: '4.7', reviews: 189, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85', tone: 'from-green-950/60' },
  { name: 'Sunrise Ridge', location: 'Zion National Park, UT', difficulty: 'Moderate', distance: '6.1 mi', elevation: '1,120 ft', duration: '3h 30m', rating: '4.9', reviews: 402, image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85', tone: 'from-orange-950/50' },
]

const reviews = [
  { quote: 'Pinnacle Paths turned a weekend idea into our favorite trip of the year. Every detail felt considered.', name: 'Maya Chen', role: 'Weekend explorer', initials: 'MC', color: 'bg-[#d7e8d7]' },
  { quote: 'The trail notes are genuinely useful. I found a quiet route that matched my pace perfectly.', name: 'Jon Bell', role: 'Colorado, USA', initials: 'JB', color: 'bg-[#e8ddcf]' },
  { quote: 'Beautiful trails, thoughtful guidance, and no endless scrolling. This is how discovery should feel.', name: 'Elena Rossi', role: 'Long-distance hiker', initials: 'ER', color: 'bg-[#dce3ee]' },
]

function TrailCard({ trail }: { trail: (typeof trails)[number] }) {
  return (
    <article className="trail-card group overflow-hidden rounded-2xl bg-white shadow-[0_12px_36px_rgba(19,48,33,0.08)] ring-1 ring-[#dfe8df]">
      <div className="relative h-60 overflow-hidden">
        <img src={trail.image} alt={`${trail.name} landscape`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-gradient-to-t ${trail.tone} to-transparent`} />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#234b36]">{trail.difficulty}</span>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm text-white"><MapPin className="size-3.5" /> {trail.location}</div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[22px] leading-tight text-[#173725]">{trail.name}</h3>
          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#173725]"><Star className="size-4 fill-[#d99d53] text-[#d99d53]" /> {trail.rating}</div>
        </div>
        <div className="mt-5 grid grid-cols-3 border-t border-[#e8eee8] pt-4 text-xs text-[#65766a]">
          <div><p className="font-semibold text-[#234b36]">{trail.distance}</p><p className="mt-1">Distance</p></div>
          <div><p className="font-semibold text-[#234b36]">{trail.elevation}</p><p className="mt-1">Elevation</p></div>
          <div><p className="font-semibold text-[#234b36]">{trail.duration}</p><p className="mt-1">Duration</p></div>
        </div>
        <button className="mt-5 flex items-center gap-2 text-sm font-bold text-[#2e6b4a] transition hover:gap-3" onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}>View trail details <ArrowRight className="size-4" /></button>
      </div>
    </article>
  )
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('All trails')
  const [menuOpen, setMenuOpen] = useState(false)
  const [fitness, setFitness] = useState('Comfortable')
  const [time, setTime] = useState('A half day')
  const [terrain, setTerrain] = useState('Forest & lakes')
  const [itinerary, setItinerary] = useState('')

  const filteredTrails = useMemo(() => trails.filter((trail) => {
    const matchesQuery = `${trail.name} ${trail.location}`.toLowerCase().includes(query.toLowerCase())
    const matchesDifficulty = difficulty === 'All trails' || trail.difficulty === difficulty
    return matchesQuery && matchesDifficulty
  }), [query, difficulty])

  function generateItinerary() {
    const route = fitness === 'New to hiking' ? 'Fern Gully Walk' : fitness === 'Trail regular' ? 'Sunrise Ridge' : 'Emerald Lake Loop'
    setItinerary(`Your ${time.replace(/^A /, '').toLowerCase()} plan: start with ${route}, pack a light lunch, and leave room for a slow viewpoint stop. ${terrain} routes around this area are looking beautiful this week.`)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf6] text-[#173725]">
      <section className="relative min-h-[700px] overflow-hidden bg-[#173725]">
        <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=90" alt="Sunlit mountain valley" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2115]/90 via-[#12331f]/50 to-[#12331f]/10" />
        <div className="absolute inset-x-0 top-0 z-20 border-b border-white/20">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8" aria-label="Main navigation">
            <a href="#top" className="flex items-center gap-2 text-white"><span className="flex size-9 items-center justify-center rounded-full border border-white/40"><Mountain className="size-5" /></span><span className="font-serif text-xl tracking-tight">Pinnacle Paths</span></a>
            <div className="hidden items-center gap-8 text-sm text-white/85 md:flex"><a href="#trails" className="hover:text-white">Explore Trails</a><a href="#planner" className="hover:text-white">Plan Trip</a><a href="#safety" className="hover:text-white">Safety</a><a href="#community" className="hover:text-white">Community</a></div>
            <button className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#173725] transition hover:bg-[#e5f0e4] md:block" onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}>Plan my trek</button>
            <button aria-label="Toggle menu" className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          </nav>
          {menuOpen && <div className="mx-4 mb-4 flex flex-col gap-4 rounded-2xl bg-white p-5 text-sm font-semibold text-[#173725] md:hidden"><a href="#trails" onClick={() => setMenuOpen(false)}>Explore Trails</a><a href="#planner" onClick={() => setMenuOpen(false)}>Plan Trip</a><a href="#safety" onClick={() => setMenuOpen(false)}>Safety</a><a href="#community" onClick={() => setMenuOpen(false)}>Community</a></div>}
        </div>
        <div id="top" className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-end px-5 pb-20 pt-36 lg:px-8 lg:pb-28"><div className="max-w-2xl"><p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#dcebd8]"><span className="h-px w-8 bg-[#b4d6b1]" /> Find your wild</p><h1 className="font-serif text-6xl leading-[0.94] tracking-[-0.04em] text-white sm:text-8xl">Elevate<br /><em className="font-normal text-[#cbe3c5]">Your Ascent</em></h1><p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg">Thoughtfully curated trails for the moments that move you. Find your next perspective, one path at a time.</p><div className="mt-9 flex flex-wrap gap-3"><button className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#173725] transition hover:bg-[#dcebd8]" onClick={() => document.getElementById('trails')?.scrollIntoView({ behavior: 'smooth' })}>Explore trails <ArrowRight className="size-4 transition group-hover:translate-x-1" /></button><button className="rounded-full border border-white/50 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10" onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}>Plan my trek</button></div></div></div>
        <div className="absolute bottom-7 right-8 z-10 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/65 lg:flex"><span className="h-px w-12 bg-white/40" /> Scroll to explore</div>
      </section>

      <section id="trails" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#659276]">The collection</p><h2 className="mt-3 font-serif text-4xl tracking-tight text-[#173725] sm:text-5xl">Paths worth taking</h2><p className="mt-4 max-w-md text-[#65766a]">Routes with a little more magic. Handpicked for their views, quiet moments, and sense of place.</p></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><label className="relative"><span className="sr-only">Search trails</span><Search className="absolute left-4 top-3.5 size-4 text-[#7e9183]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search trails" className="h-11 w-full rounded-full border border-[#dbe6db] bg-white pl-11 pr-4 text-sm outline-none ring-[#8eb897] transition focus:ring-2 sm:w-52" /></label><label className="relative"><span className="sr-only">Filter by difficulty</span><Filter className="pointer-events-none absolute left-4 top-3.5 size-4 text-[#7e9183]" /><select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="h-11 w-full appearance-none rounded-full border border-[#dbe6db] bg-white pl-11 pr-10 text-sm text-[#36543f] outline-none sm:w-44"><option>All trails</option><option>Easy</option><option>Moderate</option><option>Challenging</option></select><ChevronDown className="pointer-events-none absolute right-4 top-3.5 size-4 text-[#7e9183]" /></label></div></div><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{filteredTrails.map((trail) => <TrailCard key={trail.name} trail={trail} />)}</div>{filteredTrails.length === 0 && <div className="rounded-2xl border border-dashed border-[#cbd9cc] bg-white p-12 text-center text-[#65766a]">No paths found. Try another search or difficulty.</div>}</section>

      <section id="planner" className="bg-[#e7f0e5] px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#659276]">A route made for you</p><h2 className="mt-3 max-w-md font-serif text-4xl leading-tight tracking-tight text-[#173725] sm:text-5xl">Let&apos;s plan your next chapter.</h2><p className="mt-5 max-w-md leading-7 text-[#65766a]">Tell us what feels good today. We&apos;ll pair your energy with a trail that leaves you feeling restored, not rushed.</p><div className="mt-8 flex items-center gap-3 text-sm text-[#36543f]"><div className="flex -space-x-2"><span className="flex size-8 items-center justify-center rounded-full border-2 border-[#e7f0e5] bg-[#d7e8d7] text-xs font-bold">MC</span><span className="flex size-8 items-center justify-center rounded-full border-2 border-[#e7f0e5] bg-[#e8ddcf] text-xs font-bold">JB</span><span className="flex size-8 items-center justify-center rounded-full border-2 border-[#e7f0e5] bg-[#dce3ee] text-xs font-bold">ER</span></div><span>Loved by 12,000+ explorers</span></div></div><div className="rounded-3xl bg-white p-6 shadow-[0_16px_50px_rgba(19,48,33,0.08)] sm:p-9"><div className="grid gap-7 sm:grid-cols-3"><label className="flex flex-col gap-2 text-sm font-bold text-[#234b36]">Your fitness level<select value={fitness} onChange={(e) => setFitness(e.target.value)} className="h-12 rounded-xl border border-[#dbe6db] bg-[#f8fbf7] px-4 font-normal outline-none focus:ring-2 focus:ring-[#8eb897]"><option>New to hiking</option><option>Comfortable</option><option>Trail regular</option></select></label><label className="flex flex-col gap-2 text-sm font-bold text-[#234b36]">Available time<select value={time} onChange={(e) => setTime(e.target.value)} className="h-12 rounded-xl border border-[#dbe6db] bg-[#f8fbf7] px-4 font-normal outline-none focus:ring-2 focus:ring-[#8eb897]"><option>A couple of hours</option><option>A half day</option><option>A full day</option></select></label><label className="flex flex-col gap-2 text-sm font-bold text-[#234b36]">Terrain preference<select value={terrain} onChange={(e) => setTerrain(e.target.value)} className="h-12 rounded-xl border border-[#dbe6db] bg-[#f8fbf7] px-4 font-normal outline-none focus:ring-2 focus:ring-[#8eb897]"><option>Forest & lakes</option><option>High alpine</option><option>Desert views</option></select></label></div><button onClick={generateItinerary} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#285d40] py-3.5 text-sm font-bold text-white transition hover:bg-[#173725]">Build my itinerary <Compass className="size-4" /></button>{itinerary && <div className="mt-6 flex gap-3 rounded-2xl bg-[#f0f6ee] p-5 text-sm leading-6 text-[#36543f]" role="status"><Check className="mt-1 size-4 shrink-0 text-[#4d8c62]" /><p>{itinerary}</p></div>}</div></div></section>

      <section id="safety" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center"><div className="relative min-h-[440px] overflow-hidden rounded-3xl"><img src="https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85" alt="Hiker walking through a green forest" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#173725]/80 to-transparent" /><div className="absolute bottom-7 left-7 text-white"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#cbe3c5]">Go further, thoughtfully</p><p className="mt-2 font-serif text-3xl">Leave only footprints.</p></div></div><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#659276]">Good to know</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Adventure with intention.</h2><p className="mt-5 max-w-lg leading-7 text-[#65766a]">The best journeys respect the places that make them possible. A few simple habits keep our wild spaces beautiful for everyone.</p><div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="rounded-2xl border border-[#dfe8df] p-5"><ShieldCheck className="size-6 text-[#4d8c62]" /><h3 className="mt-4 font-bold">Know before you go</h3><p className="mt-2 text-sm leading-6 text-[#65766a]">Check weather, trail conditions, and share your route with someone at home.</p></div><div className="rounded-2xl border border-[#dfe8df] p-5"><Leaf className="size-6 text-[#4d8c62]" /><h3 className="mt-4 font-bold">Keep it wild</h3><p className="mt-2 text-sm leading-6 text-[#65766a]">Pack it in, pack it out. Stay on marked paths and give wildlife space.</p></div></div><a href="#community" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#2e6b4a]">Read our trail code <ArrowRight className="size-4" /></a></div></div></section>

      <section id="community" className="bg-[#173725] px-5 py-20 text-white lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9d0a8]">From the community</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Stories from the trail</h2></div><div className="flex items-center gap-2 text-sm text-white/70"><Users className="size-4" /> Real notes from real explorers</div></div><div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.map((review) => <figure key={review.name} className="rounded-2xl bg-white/[0.08] p-6 ring-1 ring-white/10"><div className="flex gap-1 text-[#e6b064]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div><blockquote className="mt-6 font-serif text-xl leading-8 text-white/90">&ldquo;{review.quote}&rdquo;</blockquote><figcaption className="mt-7 flex items-center gap-3"><span className={`flex size-10 items-center justify-center rounded-full text-xs font-bold text-[#234b36] ${review.color}`}>{review.initials}</span><span><strong className="block text-sm">{review.name}</strong><span className="text-xs text-white/55">{review.role}</span></span></figcaption></figure>)}</div></div></section>

      <footer className="bg-[#10291b] px-5 py-12 text-white/70 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><a href="#top" className="flex items-center gap-2 text-white"><span className="flex size-8 items-center justify-center rounded-full border border-white/30"><Mountain className="size-4" /></span><span className="font-serif text-lg">Pinnacle Paths</span></a><p className="mt-4 max-w-xs text-sm leading-6">Make space for wonder. Find the path that brings you back to yourself.</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 text-sm"><a href="#trails" className="hover:text-white">Explore</a><a href="#planner" className="hover:text-white">Plan a trip</a><a href="#safety" className="hover:text-white">Trail code</a><a href="#community" className="hover:text-white">Community</a></div><div className="flex items-center gap-4"><a href="#top" aria-label="Instagram" className="text-xs font-bold hover:text-white">IG</a><a href="#top" aria-label="Facebook" className="text-xs font-bold hover:text-white">FB</a><a href="#top" aria-label="LinkedIn" className="text-xs font-bold hover:text-white">IN</a></div></div><div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row"><span>© 2025 Pinnacle Paths. Made for the wild-hearted.</span><span className="flex items-center gap-2"><CalendarDays className="size-3" /> Curated with care</span></div></footer>
    </main>
  )
}
