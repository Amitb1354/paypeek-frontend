const BASE = '/api'

async function req(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  getSalaries: (params = {}) => {
    const q = new URLSearchParams(Object.entries(params).filter(([,v]) => v))
    return req(`/salaries?${q}`)
  },
  submitSalary: (data) => req('/salaries', { method: 'POST', body: JSON.stringify(data) }),
  getStats:     ()     => req('/stats'),
  getRecent:    (n=8)  => req(`/salaries?limit=${n}&sort=newest`),
}
