import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function About() {
  return (
    <>
      <SEOHead
        title="About PayPeek"
        description="PayPeek is a free anonymous salary sharing platform. We believe salary transparency helps close pay gaps and empowers professionals to negotiate better."
        canonical="/about"
      />
      <div className="max-w-2xl mx-auto px-4 py-14">
        <h1 className="font-display font-extrabold text-4xl text-ink-DEFAULT mb-3">About PayPeek</h1>
        <p className="text-ink-soft text-lg mb-10">Salary transparency. No walls. No accounts. No BS.</p>

        <div className="space-y-8 text-ink-soft leading-relaxed">
          <div>
            <h2 className="font-display font-bold text-xl text-ink-DEFAULT mb-2">Why we built this</h2>
            <p>Salaries are one of the last great taboos at work. You can Google the price of a car, a house, a flight — but not what the person sitting next to you earns. That information asymmetry benefits employers, not workers.</p>
            <p className="mt-3">PayPeek exists to fix that. A simple, anonymous place where professionals share what they actually earn — so the rest of us can negotiate better, spot pay gaps, and make smarter career decisions.</p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-ink-DEFAULT mb-2">How anonymity works</h2>
            <p>We never ask for your name, email, or any identifying information. Submissions contain only: job title, experience level, company name (optional), country, salary, and industry. There is no account system. There are no cookies tracking individual users.</p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-ink-DEFAULT mb-2">Is the data accurate?</h2>
            <p>All data is self-reported. We moderate for obviously fake entries (e.g., $1 salaries, role/country mismatches) but cannot verify every submission. Use PayPeek data as a directional reference — not as a definitive source. Cross-reference with official statistics for important decisions.</p>
          </div>

          <div className="bg-indigo-light border border-indigo/20 rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-indigo mb-2">Help grow the dataset</h3>
            <p className="text-ink-soft text-sm mb-4">The more people share, the more useful PayPeek becomes. Takes 60 seconds, completely anonymous.</p>
            <Link to="/submit" className="btn-primary inline-block">Share your salary →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
