import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import SalaryCard from '../components/SalaryCard'
import AdSlot from '../components/AdSlot'
import { Logo } from '../components/Logo'
import { api } from '../lib/api'
import { formatSalary, SEED_SALARIES } from '../lib/utils'

// Ticker item
function TickerItem({ s }) {
  return (
    <span className="inline-flex items-center gap-2 mx-6 text-sm text-white/80 whitespace-nowrap">
      <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
      <span className="font-semibold text-white">{s.role}</span>
      <span className="text-white/50">in {s.country}</span>
      <span className="font-bold text-emerald">{formatSalary(s.amount, s.currency)}/yr</span>
    </span>
  )
}

export default function Home() {
  const [recent, setRecent] = useState(SEED_SALARIES.slice(0, 6))
  const [stats, setStats]   = useState({ total: 100, countries: 60, roles: 200 })

  useEffect(() => {
    api.getRecent(6).then(d => { if (d?.length) setRecent(d) }).catch(() => {})
    api.getStats().then(d => {
      if (d) setStats(prev => ({
        total:     Math.max(prev.total,     d.total     || 0),
        countries: Math.max(prev.countries, d.countries || 0),
        roles:     Math.max(prev.roles,     d.roles     || 0),
      }))
    }).catch(() => {})
  }, [])

  const ticker = [...SEED_SALARIES, ...SEED_SALARIES]

  return (
    <>
      <SEOHead
        title="Real Anonymous Salaries Shared by Professionals"
        description="Browse anonymous salary data from software engineers, product managers, designers and more. See real salaries by role, company, and country. Free, no signup."
        canonical="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: 'PayPeek Salary Database',
          description: 'Anonymous salary data shared by professionals worldwide',
          url: 'https://paypeek.co',
          creator: { '@type': 'Organization', name: 'PayPeek' },
        }}
      />

      {/* HERO — dark navy, signature ticker */}
      <section style={{ background: '#0F1629' }} className="overflow-hidden">
        {/* Live salary ticker — the signature element */}
        <div style={{ background: '#1A2540', borderBottom: '1px solid #252F4A' }} className="py-2.5 overflow-hidden">
          <div className="flex animate-ticker" style={{ width: 'max-content' }}>
            {ticker.map((s, i) => <TickerItem key={i} s={s} />)}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', color: '#10B981' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10B981' }} />
            {stats.total.toLocaleString()}+ salaries shared anonymously
          </div>

          <h1
            className="font-display font-extrabold text-5xl md:text-7xl leading-[1.08] tracking-tight mb-6"
            style={{ color: '#FFFFFF' }}
          >
            What are people<br />
            <span style={{
              background: 'linear-gradient(135deg, #818CF8 0%, #5B6BF8 50%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>actually</span> getting paid?
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Real anonymous salaries from professionals in{' '}
            <span style={{ color: '#10B981', fontWeight: 700 }}>{stats.countries}+ countries</span>.
            {' '}No accounts. No filters. Just honest numbers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/browse" className="btn-primary px-8 py-3 text-base">Browse Salaries</Link>
            <Link
              to="/submit"
              className="font-semibold px-8 py-3 rounded-xl transition-all text-base"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF' }}
            >
              Share Mine Anonymously →
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="flex flex-wrap justify-center gap-10 mt-16 pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[
              [stats.total.toLocaleString() + '+', 'Salaries shared'],
              [stats.countries + '+', 'Countries'],
              [stats.roles + '+', 'Job roles'],
              ['100%', 'Anonymous'],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <p
                  className="font-display font-extrabold text-4xl tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >{val}</p>
                <p className="text-xs font-semibold uppercase tracking-widest mt-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad banner */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot type="leaderboard" />
      </div>

      {/* Recent salaries */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-ink-DEFAULT">Recently shared</h2>
          <Link to="/browse" className="btn-outline">See all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map(s => <SalaryCard key={s.id} salary={s} />)}
        </div>
      </section>

      {/* Browse by role — SEO hub links */}
      <section className="bg-white border-y border-surface-border py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-ink-DEFAULT mb-2">Browse by role</h2>
          <p className="text-ink-soft text-sm mb-7">See salary ranges for the most searched job titles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {['Software Engineer','Product Manager','Data Scientist','UX Designer',
              'Machine Learning Engineer','DevOps Engineer','Full Stack Engineer','Cloud Engineer',
              'Marketing Manager','Finance Analyst','Business Analyst','Security Engineer',
              'iOS Engineer','Data Engineer','Site Reliability Engineer','Management Consultant'].map(role => (
              <Link key={role} to={`/browse?role=${encodeURIComponent(role)}`}
                className="card p-4 hover:border-indigo/40 hover:shadow-sm transition-all group">
                <p className="font-semibold text-sm text-ink-DEFAULT group-hover:text-indigo transition-colors leading-snug">
                  {role}
                </p>
                <p className="text-xs text-ink-soft mt-1">View salaries →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — trust builder */}
      <section className="max-w-4xl mx-auto px-4 py-14 text-center">
        <h2 className="font-display font-bold text-2xl text-ink-DEFAULT mb-2">How PayPeek works</h2>
        <p className="text-ink-soft text-sm mb-10">Transparent, anonymous, always free</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '👁️', title: 'Browse anonymously', desc: 'No account needed to browse salary data from professionals worldwide.' },
            { icon: '🤫', title: 'Share anonymously', desc: 'We never ask for your name or email. Just your role, location, and pay.' },
            { icon: '📊', title: 'Real data grows', desc: 'Every submission makes the dataset more useful for everyone.' },
          ].map(s => (
            <div key={s.title} className="card p-6">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-display font-bold text-lg text-ink-DEFAULT mb-2">{s.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO content block */}
      <section className="bg-white border-t border-surface-border py-14">
        <div className="max-w-3xl mx-auto px-4 prose prose-sm text-ink-soft">
          <h2 className="font-display font-bold text-xl text-ink-DEFAULT">Why salary transparency matters</h2>
          <p>Pay gaps persist partly because salaries remain taboo to discuss. PayPeek gives professionals a safe, anonymous way to share what they earn — helping everyone negotiate better, identify pay gaps, and make informed career decisions.</p>
          <p>Whether you're a software engineer wondering if you're underpaid, a product manager comparing offers across countries, or a student researching careers — real salary data matters. Glassdoor has it behind walls. LinkedIn guesses. We just show you what people actually shared.</p>
          <h2 className="font-display font-bold text-xl text-ink-DEFAULT mt-8">How is salary data collected?</h2>
          <p>Every salary on PayPeek is voluntarily and anonymously submitted by a real professional. We don't scrape, estimate, or fabricate data. We collect: job title, experience level, company (optional), country, annual salary, currency, and industry. Nothing that could identify you personally.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mt-6 mb-12">
        <AdSlot type="leaderboard" />
      </div>
    </>
  )
}
