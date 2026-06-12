import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import SalaryCard from '../components/SalaryCard'
import AdSlot from '../components/AdSlot'
import { api } from '../lib/api'
import { ROLES, COUNTRIES, LEVELS, INDUSTRIES, SEED_SALARIES } from '../lib/utils'

function SkeletonCard() {
  return <div className="card p-5 h-44 shimmer rounded-2xl" />
}

export default function Browse() {
  const [params, setParams] = useSearchParams()
  const [salaries, setSalaries] = useState(SEED_SALARIES)
  const [loading, setLoading]   = useState(false)
  const [total, setTotal]       = useState(SEED_SALARIES.length)

  const role     = params.get('role') || ''
  const country  = params.get('country') || ''
  const level    = params.get('level') || ''
  const industry = params.get('industry') || ''
  const sort     = params.get('sort') || 'newest'
  const q        = params.get('q') || ''

  const setParam = (key, val) => {
    const next = new URLSearchParams(params)
    if (val) next.set(key, val); else next.delete(key)
    setParams(next)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getSalaries({ role, country, level, industry, sort, q })
      setSalaries(data.salaries || data)
      setTotal(data.total || (data.salaries || data).length)
    } catch {
      // keep seed data on error
    } finally {
      setLoading(false)
    }
  }, [role, country, level, industry, sort, q])

  useEffect(() => { fetchData() }, [fetchData])

  // Dynamic SEO title
  const seoTitle = [role, country && `in ${country}`, level && `${level} level`]
    .filter(Boolean).join(' ') || 'All Salaries'

  const seoDesc = role
    ? `See real anonymous ${role} salaries${country ? ` in ${country}` : ''}.  Browse ${total}+ salary data points shared by professionals on PayPeek.`
    : `Browse ${total}+ anonymous salaries from professionals worldwide. Filter by role, country, experience level, and more.`

  const selectClass = "select text-sm py-2.5"

  return (
    <>
      <SEOHead
        title={`${seoTitle} Salaries`}
        description={seoDesc}
        canonical={`/browse${role ? `?role=${encodeURIComponent(role)}` : ''}`}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl text-ink-DEFAULT">
            {role ? `${role} Salaries` : country ? `Salaries in ${country}` : 'All Salaries'}
          </h1>
          <p className="text-ink-soft text-sm mt-1">{total.toLocaleString()} anonymous salaries</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft text-sm">🔍</span>
          <input type="text" className="input pl-10 text-sm py-3" placeholder="Search role, company, country..."
            value={q} onChange={e => setParam('q', e.target.value)} />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="relative">
            <select className={selectClass} value={role} onChange={e => setParam('role', e.target.value)}>
              <option value="">All roles</option>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <select className={selectClass} value={country} onChange={e => setParam('country', e.target.value)}>
              <option value="">All countries</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <select className={selectClass} value={level} onChange={e => setParam('level', e.target.value)}>
              <option value="">All levels</option>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <select className={selectClass} value={sort} onChange={e => setParam('sort', e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="highest">Highest salary</option>
              <option value="lowest">Lowest salary</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {(role || country || level || industry) && (
          <div className="flex flex-wrap gap-2 mb-5">
            {[['role', role], ['country', country], ['level', level], ['industry', industry]]
              .filter(([,v]) => v)
              .map(([k, v]) => (
                <span key={k} className="inline-flex items-center gap-1.5 bg-indigo-light text-indigo text-xs font-medium px-3 py-1.5 rounded-full">
                  {v}
                  <button onClick={() => setParam(k, '')} className="hover:text-indigo-dark">×</button>
                </span>
              ))}
            <button onClick={() => setParams({})} className="text-xs text-ink-soft hover:text-ink-DEFAULT underline">
              Clear all
            </button>
          </div>
        )}

        <AdSlot type="banner" className="mb-8" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : salaries.length
              ? salaries.map(s => <SalaryCard key={s.id} salary={s} />)
              : (
                <div className="col-span-3 text-center py-16">
                  <p className="text-4xl mb-3">🤷</p>
                  <p className="font-semibold text-ink-DEFAULT">No salaries found</p>
                  <p className="text-ink-soft text-sm mt-1">Try different filters or <a href="/submit" className="text-indigo hover:underline">be the first to submit one</a></p>
                </div>
              )
          }
        </div>

        <AdSlot type="leaderboard" className="mt-10" />

        {/* SEO content for role pages */}
        {role && (
          <div className="mt-12 bg-white border border-surface-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl text-ink-DEFAULT mb-3">
              About {role} Salaries
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              This page shows anonymous salary data submitted by real {role}s worldwide.
              All data is self-reported and voluntary. Salaries vary significantly based on location,
              company size, experience level, and specialization. Use this data as a reference
              when negotiating your next offer or benchmarking your current compensation.
            </p>
            {country && (
              <p className="text-ink-soft text-sm leading-relaxed mt-3">
                The salaries shown here are specifically for {role}s working in {country}.
                Local market conditions, cost of living, and industry concentration all affect pay.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
