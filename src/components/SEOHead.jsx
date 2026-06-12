import { useEffect } from 'react'

export default function SEOHead({ title, description, canonical, jsonLd }) {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | PayPeek` : 'PayPeek – Real Anonymous Salaries'

    // Description
    let desc = document.querySelector('meta[name="description"]')
    if (desc && description) desc.setAttribute('content', description)

    // OG tags
    const og = (prop, val) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (el && val) el.setAttribute('content', val)
    }
    og('og:title', title)
    og('og:description', description)

    // Canonical
    let can = document.querySelector('link[rel="canonical"]')
    if (can && canonical) can.setAttribute('href', `https://paypeek.co${canonical}`)

    // JSON-LD
    if (jsonLd) {
      let existing = document.querySelector('#page-jsonld')
      if (existing) existing.remove()
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = 'page-jsonld'
      s.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(s)
    }
  }, [title, description, canonical, jsonLd])

  return null
}
