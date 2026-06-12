import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const ROLES = ['Software Engineer','Product Manager','Data Scientist','UX Designer','Marketing Manager','DevOps Engineer']
const COUNTRIES = ['United States','United Kingdom','Australia','Canada','Germany','India','Nepal','UAE']

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Logo size={26} dark={true} />
            <p className="text-ink-soft text-sm mt-3 leading-relaxed">
              Real anonymous salaries shared by professionals worldwide. No login. No BS.
            </p>
          </div>

          {/* Browse by role — SEO internal links */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Browse by role</p>
            <ul className="space-y-2">
              {ROLES.map(r => (
                <li key={r}>
                  <Link to={`/browse?role=${encodeURIComponent(r)}`}
                    className="text-sm text-ink-soft hover:text-ink-DEFAULT transition-colors">
                    {r} Salaries
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse by country */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Browse by country</p>
            <ul className="space-y-2">
              {COUNTRIES.map(c => (
                <li key={c}>
                  <Link to={`/browse?country=${encodeURIComponent(c)}`}
                    className="text-sm text-ink-soft hover:text-ink-DEFAULT transition-colors">
                    Salaries in {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site links */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">PayPeek</p>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/browse', 'Browse Salaries'], ['/submit', 'Share Your Salary'], ['/about', 'About']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-ink-soft hover:text-ink-DEFAULT transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-ink-soft">
          <p>© {new Date().getFullYear()} PayPeek · Anonymous salary data from real professionals</p>
          <p>All salaries are self-reported and anonymous. For reference only.</p>
        </div>
      </div>
    </footer>
  )
}
