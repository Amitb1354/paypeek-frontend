import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { useState } from 'react'

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/browse',  label: 'Browse Salaries' },
    { to: '/submit',  label: 'Share Your Salary' },
    { to: '/about',   label: 'About' },
  ]

  return (
    <nav className="bg-white border-b border-surface-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" aria-label="PayPeek home">
          <Logo size={28} dark />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname.startsWith(l.to)
                  ? 'bg-indigo-light text-indigo'
                  : 'text-ink-soft hover:text-ink-DEFAULT hover:bg-surface'
              }`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/submit" className="btn-primary">+ Add Salary</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-xl hover:bg-surface" onClick={() => setOpen(o => !o)}>
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-ink-DEFAULT transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}/>
            <span className={`block w-5 h-0.5 bg-ink-DEFAULT transition-all ${open ? 'opacity-0' : ''}`}/>
            <span className={`block w-5 h-0.5 bg-ink-DEFAULT transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}/>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-surface-border bg-white px-4 py-3 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-ink-soft hover:bg-surface hover:text-ink-DEFAULT">
              {l.label}
            </Link>
          ))}
          <Link to="/submit" onClick={() => setOpen(false)} className="block btn-primary text-center mt-2">
            + Add Your Salary
          </Link>
        </div>
      )}
    </nav>
  )
}
