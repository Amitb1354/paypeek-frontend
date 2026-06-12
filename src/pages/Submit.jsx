import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { api } from '../lib/api'
import { ROLES, COUNTRIES, LEVELS, INDUSTRIES, CURRENCIES } from '../lib/utils'

const STEPS = ['Your Role', 'Your Pay', 'Submit']

export default function Submit() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle') // idle|loading|success|error
  const [errMsg, setErrMsg] = useState('')

  const [form, setForm] = useState({
    role: '', custom_role: '', level: '', company: '', country: '',
    amount: '', currency: 'USD', total_comp: '', years_exp: '',
    industry: '', remote: false,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    if (!form.role) return 'Please select a role.'
    if (!form.level) return 'Please select your level.'
    if (!form.country) return 'Please select your country.'
    if (!form.amount || isNaN(form.amount)) return 'Please enter a valid salary amount.'
    if (!form.years_exp || isNaN(form.years_exp)) return 'Please enter your years of experience.'
    return null
  }

  const handleSubmit = async () => {
    const err = validate()
    if (err) { setErrMsg(err); return }
    setStatus('loading')
    try {
      await api.submitSalary({
        ...form,
        role: form.role === 'Other' ? form.custom_role : form.role,
        amount: parseInt(form.amount),
        total_comp: form.total_comp ? parseInt(form.total_comp) : null,
        years_exp: parseInt(form.years_exp),
      })
      setStatus('success')
    } catch (e) {
      setErrMsg(e.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  const inputClass = "input text-sm"
  const selectClass = "select text-sm"
  const labelClass = "block text-sm font-semibold text-ink-DEFAULT mb-1.5"

  if (status === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display font-extrabold text-3xl text-ink-DEFAULT mb-3">Thank you!</h2>
        <p className="text-ink-soft mb-8">Your salary has been submitted anonymously. It'll appear after a quick review.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/browse" className="btn-primary">Browse Salaries</Link>
          <button onClick={() => { setStatus('idle'); setStep(0); setForm({ role:'',custom_role:'',level:'',company:'',country:'',amount:'',currency:'USD',total_comp:'',years_exp:'',industry:'',remote:false }) }}
            className="btn-outline">Submit Another</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title="Share Your Salary Anonymously"
        description="Share your salary anonymously on PayPeek. Help other professionals know their worth. No name, no email — just your role, pay, and location."
        canonical="/submit"
      />

      <div className="max-w-xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-light rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🤫</div>
          <h1 className="font-display font-extrabold text-3xl text-ink-DEFAULT mb-2">Share your salary</h1>
          <p className="text-ink-soft text-sm">100% anonymous. We never ask for your name or email.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'bg-emerald text-white' : i === step ? 'bg-indigo text-white' : 'bg-surface border border-surface-border text-ink-soft'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${i === step ? 'text-ink-DEFAULT' : 'text-ink-soft'}`}>{s}</span>
              {i < STEPS.length - 1 && <span className="text-ink-muted mx-1">—</span>}
            </div>
          ))}
        </div>

        <div className="card p-6 md:p-8">
          {/* Step 0: Role */}
          {step === 0 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className={labelClass}>Job title *</label>
                <select className={selectClass} value={form.role} onChange={e => set('role', e.target.value)}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                  <option value="Other">Other (type below)</option>
                </select>
              </div>
              {form.role === 'Other' && (
                <div>
                  <label className={labelClass}>Your job title</label>
                  <input className={inputClass} placeholder="e.g. Growth Engineer" value={form.custom_role}
                    onChange={e => set('custom_role', e.target.value)} />
                </div>
              )}
              <div>
                <label className={labelClass}>Experience level *</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Junior','Mid-level','Senior','Lead','Manager','Director'].map(l => (
                    <button key={l} onClick={() => set('level', l)}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                        form.level === l ? 'bg-indigo-light border-indigo text-indigo' : 'bg-surface border-surface-border text-ink-soft hover:border-indigo/40'
                      }`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Company <span className="font-normal text-ink-soft">(optional)</span></label>
                <input className={inputClass} placeholder='e.g. "Big Tech Co" or leave blank'
                  value={form.company} onChange={e => set('company', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Country *</label>
                <select className={selectClass} value={form.country} onChange={e => set('country', e.target.value)}>
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <select className={selectClass} value={form.industry} onChange={e => set('industry', e.target.value)}>
                  <option value="">Select industry</option>
                  {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => set('remote', !form.remote)}
                  className={`w-10 h-6 rounded-full transition-all flex-shrink-0 ${form.remote ? 'bg-indigo' : 'bg-surface-border'}`}>
                  <span className={`block w-4 h-4 rounded-full bg-white shadow transition-all mx-auto ${form.remote ? 'translate-x-2' : '-translate-x-2'}`} />
                </button>
                <label className="text-sm text-ink-soft cursor-pointer" onClick={() => set('remote', !form.remote)}>
                  This is a remote position
                </label>
              </div>
              <button onClick={() => {
                if (!form.role || !form.level || !form.country) { setErrMsg('Please fill required fields.'); return }
                setErrMsg(''); setStep(1)
              }} className="btn-primary w-full py-3">Continue →</button>
            </div>
          )}

          {/* Step 1: Pay */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-up">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className={labelClass}>Annual salary *</label>
                  <input type="number" className={inputClass} placeholder="e.g. 95000"
                    value={form.amount} onChange={e => set('amount', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Currency</label>
                  <select className={selectClass} value={form.currency} onChange={e => set('currency', e.target.value)}>
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Total compensation <span className="font-normal text-ink-soft">(optional — include bonus, equity)</span></label>
                <input type="number" className={inputClass} placeholder="e.g. 130000"
                  value={form.total_comp} onChange={e => set('total_comp', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Years of experience *</label>
                <input type="number" className={inputClass} placeholder="e.g. 5" min="0" max="50"
                  value={form.years_exp} onChange={e => set('years_exp', e.target.value)} />
              </div>
              <div className="bg-surface rounded-xl p-4 text-sm text-ink-soft">
                💡 Enter your base salary in the local currency. We never convert or normalize — we show exactly what you enter.
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-outline flex-1">← Back</button>
                <button onClick={() => {
                  if (!form.amount || !form.years_exp) { setErrMsg('Please fill required fields.'); return }
                  setErrMsg(''); setStep(2)
                }} className="btn-primary flex-1 py-3">Continue →</button>
              </div>
            </div>
          )}

          {/* Step 2: Review & submit */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-up">
              <h3 className="font-display font-bold text-lg text-ink-DEFAULT">Review your submission</h3>
              <div className="bg-surface rounded-2xl p-4 space-y-2 text-sm">
                {[
                  ['Role', form.role === 'Other' ? form.custom_role : form.role],
                  ['Level', form.level],
                  ['Country', form.country],
                  ['Company', form.company || '—'],
                  ['Annual salary', `${form.currency} ${parseInt(form.amount).toLocaleString()}`],
                  ['Experience', `${form.years_exp} years`],
                  ['Remote', form.remote ? 'Yes' : 'No'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-ink-soft">{k}</span>
                    <span className="font-medium text-ink-DEFAULT">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-light border border-emerald/20 rounded-xl p-3 text-sm text-emerald">
                ✓ No personal information is collected or stored. This submission is fully anonymous.
              </div>
              {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-outline flex-1">← Back</button>
                <button onClick={handleSubmit} disabled={status === 'loading'}
                  className="btn-primary flex-1 py-3 disabled:opacity-50">
                  {status === 'loading' ? 'Submitting…' : 'Submit anonymously'}
                </button>
              </div>
            </div>
          )}

          {errMsg && step < 2 && <p className="text-red-500 text-sm mt-3">{errMsg}</p>}
        </div>
      </div>
    </>
  )
}
