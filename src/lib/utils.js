export function formatSalary(amount, currency = 'USD') {
  const symbols = {
    USD: '$', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$', INR: '₹',
    SGD: 'S$', AED: 'AED ', JPY: '¥', CHF: 'CHF ', SEK: 'kr', NOK: 'kr',
    DKK: 'kr', NZD: 'NZ$', HKD: 'HK$', MXN: 'MX$', BRL: 'R$', ZAR: 'R',
    PLN: 'zł', CZK: 'Kč', HUF: 'Ft', TRY: '₺', KRW: '₩', CNY: '¥',
    TWD: 'NT$', MYR: 'RM', PHP: '₱', THB: '฿', IDR: 'Rp', SAR: 'SAR ',
    QAR: 'QAR ', KWD: 'KWD ', BHD: 'BHD ', OMR: 'OMR ', ILS: '₪',
  }
  const sym = symbols[currency] || currency + ' '
  if (amount >= 1000000) return sym + (amount / 1000000).toFixed(1) + 'M'
  if (amount >= 1000) return sym + (amount / 1000).toFixed(0) + 'K'
  return sym + amount.toLocaleString()
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export const ROLES = [
  'Software Engineer','Frontend Engineer','Backend Engineer','Full Stack Engineer',
  'Mobile Engineer','iOS Engineer','Android Engineer','Embedded Engineer',
  'Product Manager','Project Manager','Program Manager','Scrum Master',
  'Data Scientist','Data Analyst','Data Engineer','Machine Learning Engineer',
  'AI/ML Researcher','Business Intelligence Analyst',
  'UX Designer','UI Designer','Product Designer','Graphic Designer',
  'DevOps Engineer','Cloud Engineer','Site Reliability Engineer','Platform Engineer',
  'Security Engineer','Network Engineer','Systems Administrator',
  'Marketing Manager','Growth Manager','Content Strategist','SEO Specialist',
  'Sales Manager','Account Executive','Business Development Manager',
  'HR Manager','Recruiter','People Operations',
  'Finance Analyst','Financial Controller','CFO','Accountant',
  'Business Analyst','Management Consultant','Strategy Analyst',
  'Nurse','Doctor','Pharmacist','Physiotherapist',
  'Teacher','Professor','Curriculum Designer',
  'Lawyer','Paralegal','Legal Counsel',
  'Architect','Civil Engineer','Mechanical Engineer','Electrical Engineer',
]

export const COUNTRIES = [
  // North America
  'United States', 'Canada', 'Mexico',
  // Europe
  'United Kingdom', 'Germany', 'France', 'Netherlands', 'Switzerland',
  'Sweden', 'Norway', 'Denmark', 'Finland', 'Ireland', 'Belgium',
  'Austria', 'Spain', 'Italy', 'Portugal', 'Poland', 'Czech Republic',
  'Romania', 'Hungary', 'Greece', 'Ukraine',
  // Asia Pacific
  'Australia', 'New Zealand', 'Singapore', 'Japan', 'South Korea',
  'China', 'India', 'Hong Kong', 'Taiwan', 'Malaysia', 'Philippines',
  'Thailand', 'Indonesia', 'Vietnam', 'Pakistan', 'Bangladesh',
  // Middle East
  'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Israel',
  // Africa
  'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Ghana',
  // Latin America
  'Brazil', 'Argentina', 'Colombia', 'Chile', 'Peru',
  // Other
  'Turkey', 'Russia',
]

export const LEVELS = ['Junior', 'Mid-level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive']

export const INDUSTRIES = [
  'Technology', 'Finance / Banking', 'Healthcare', 'Education',
  'E-commerce / Retail', 'Media / Entertainment', 'Consulting',
  'Government / Public Sector', 'Non-profit', 'Manufacturing',
  'Real Estate', 'Transportation / Logistics', 'Energy / Oil & Gas',
  'Legal', 'Pharmaceutical / Biotech', 'Telecommunications',
  'Insurance', 'Hospitality / Travel', 'Agriculture',
]

export const CURRENCIES = [
  // Major
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY',
  // Asia Pacific
  'SGD', 'HKD', 'NZD', 'CNY', 'KRW', 'TWD', 'MYR',
  'INR', 'PHP', 'THB', 'IDR',
  // Middle East
  'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'ILS',
  // Europe (non-Euro)
  'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'TRY',
  // Americas
  'MXN', 'BRL',
  // Africa
  'ZAR',
]

// Seed salaries — realistic, diverse, top-country data (no Nepal)
export const SEED_SALARIES = [
  { id: 's1',  role: 'Software Engineer',        level: 'Senior',   company: 'Tech Startup',       country: 'United States',   amount: 165000, currency: 'USD', years_exp: 6,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 *  2).toISOString() },
  { id: 's2',  role: 'Product Manager',           level: 'Mid-level',company: 'Fintech Co',         country: 'United Kingdom',  amount: 72000,  currency: 'GBP', years_exp: 4,  industry: 'Finance / Banking',  remote: false, created_at: new Date(Date.now() - 86400000 *  5).toISOString() },
  { id: 's3',  role: 'Data Scientist',            level: 'Senior',   company: 'Big Tech',           country: 'Australia',       amount: 145000, currency: 'AUD', years_exp: 7,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 *  1).toISOString() },
  { id: 's4',  role: 'UX Designer',              level: 'Junior',   company: 'Design Agency',      country: 'Germany',         amount: 48000,  currency: 'EUR', years_exp: 1,  industry: 'Technology',         remote: false, created_at: new Date(Date.now() - 86400000 *  8).toISOString() },
  { id: 's5',  role: 'Machine Learning Engineer', level: 'Senior',   company: 'AI Startup',         country: 'United States',   amount: 210000, currency: 'USD', years_exp: 5,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 *  4).toISOString(), total_comp: 290000 },
  { id: 's6',  role: 'DevOps Engineer',           level: 'Senior',   company: 'Anonymous Company',  country: 'Canada',          amount: 135000, currency: 'CAD', years_exp: 8,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 * 12).toISOString() },
  { id: 's7',  role: 'Marketing Manager',         level: 'Mid-level',company: 'E-commerce Brand',   country: 'UAE',             amount: 180000, currency: 'AED', years_exp: 5,  industry: 'E-commerce / Retail',remote: false, created_at: new Date(Date.now() - 86400000 *  7).toISOString() },
  { id: 's8',  role: 'Finance Analyst',           level: 'Mid-level',company: 'Investment Bank',    country: 'Singapore',       amount: 88000,  currency: 'SGD', years_exp: 3,  industry: 'Finance / Banking',  remote: false, created_at: new Date(Date.now() - 86400000 *  6).toISOString() },
  { id: 's9',  role: 'Full Stack Engineer',       level: 'Mid-level',company: 'SaaS Company',       country: 'India',           amount: 2600000,currency: 'INR', years_exp: 4,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 *  9).toISOString() },
  { id: 's10', role: 'Backend Engineer',          level: 'Senior',   company: 'Unicorn Startup',    country: 'Germany',         amount: 95000,  currency: 'EUR', years_exp: 7,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 *  3).toISOString() },
  { id: 's11', role: 'Cloud Engineer',            level: 'Senior',   company: 'Big 4 Consulting',   country: 'Switzerland',     amount: 130000, currency: 'CHF', years_exp: 6,  industry: 'Consulting',         remote: false, created_at: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: 's12', role: 'Product Manager',           level: 'Senior',   company: 'FAANG',              country: 'United States',   amount: 195000, currency: 'USD', years_exp: 8,  industry: 'Technology',         remote: false, created_at: new Date(Date.now() - 86400000 *  2).toISOString(), total_comp: 350000 },
  { id: 's13', role: 'Data Engineer',             level: 'Mid-level',company: 'Tech Scale-up',      country: 'Netherlands',     amount: 72000,  currency: 'EUR', years_exp: 4,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 * 14).toISOString() },
  { id: 's14', role: 'iOS Engineer',              level: 'Senior',   company: 'Mobile Agency',      country: 'Sweden',          amount: 750000, currency: 'SEK', years_exp: 6,  industry: 'Technology',         remote: false, created_at: new Date(Date.now() - 86400000 *  5).toISOString() },
  { id: 's15', role: 'Security Engineer',        level: 'Lead',     company: 'Bank',               country: 'United Kingdom',  amount: 95000,  currency: 'GBP', years_exp: 9,  industry: 'Finance / Banking',  remote: true,  created_at: new Date(Date.now() - 86400000 *  1).toISOString() },
  { id: 's16', role: 'Software Engineer',        level: 'Mid-level',company: 'Anonymous Company',  country: 'Japan',           amount: 8500000,currency: 'JPY', years_exp: 3,  industry: 'Technology',         remote: false, created_at: new Date(Date.now() - 86400000 * 11).toISOString() },
  { id: 's17', role: 'Business Analyst',         level: 'Mid-level',company: 'Consulting Firm',    country: 'Hong Kong',       amount: 520000, currency: 'HKD', years_exp: 4,  industry: 'Consulting',         remote: false, created_at: new Date(Date.now() - 86400000 *  8).toISOString() },
  { id: 's18', role: 'UX Designer',             level: 'Senior',   company: 'Tech Giant',         country: 'Canada',          amount: 110000, currency: 'CAD', years_exp: 6,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 *  3).toISOString() },
  { id: 's19', role: 'Frontend Engineer',        level: 'Junior',   company: 'Startup',            country: 'Brazil',          amount: 72000,  currency: 'BRL', years_exp: 1,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 * 13).toISOString() },
  { id: 's20', role: 'Site Reliability Engineer',level: 'Senior',   company: 'Cloud Provider',     country: 'Ireland',         amount: 105000, currency: 'EUR', years_exp: 7,  industry: 'Technology',         remote: true,  created_at: new Date(Date.now() - 86400000 *  6).toISOString() },
]
