import { formatSalary, timeAgo } from '../lib/utils'

const LEVEL_COLORS = {
  'Junior':     'bg-blue-50 text-blue-700 border-blue-200',
  'Mid-level':  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Senior':     'bg-purple-50 text-purple-700 border-purple-200',
  'Lead':       'bg-amber-50 text-amber-700 border-amber-200',
  'Manager':    'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Director':   'bg-rose-50 text-rose-700 border-rose-200',
  'Executive':  'bg-gray-100 text-gray-700 border-gray-200',
}

export default function SalaryCard({ salary, className = '' }) {
  const levelClass = LEVEL_COLORS[salary.level] || 'bg-surface text-ink-soft border-surface-border'

  return (
    <article className={`card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all ${className}`}
      itemScope itemType="https://schema.org/JobPosting">
      <meta itemProp="title" content={salary.role} />
      <meta itemProp="jobLocation" content={salary.country} />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-ink-DEFAULT text-base leading-tight truncate"
            itemProp="hiringOrganization">
            {salary.role}
          </h3>
          <p className="text-ink-soft text-sm mt-0.5">
            {salary.company || 'Anonymous Company'} · {salary.country}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border flex-shrink-0 ${levelClass}`}>
          {salary.level}
        </span>
      </div>

      {/* Salary amount — the hero number */}
      <div className="mb-3">
        <p className="font-bold text-3xl tracking-tight text-ink-DEFAULT" itemProp="baseSalary">
          {formatSalary(salary.amount, salary.currency)}
          <span className="text-base font-medium text-ink-soft ml-1.5 tracking-normal">/ yr</span>
        </p>
        {salary.total_comp && salary.total_comp !== salary.amount && (
          <p className="text-xs text-ink-soft mt-0.5">
            Total comp: {formatSalary(salary.total_comp, salary.currency)}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="tag">{salary.years_exp} yrs exp</span>
        {salary.industry && <span className="tag">{salary.industry}</span>}
        {salary.remote && <span className="tag">🌐 Remote</span>}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-ink-muted border-t border-surface-border pt-3 mt-1">
        <span>{timeAgo(salary.created_at)}</span>
        <span>Verified anonymous</span>
      </div>
    </article>
  )
}
