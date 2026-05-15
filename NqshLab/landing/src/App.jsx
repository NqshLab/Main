import { useState } from 'react'

/* ══════════════════════════════════════════════════════════════
   CONFIGURATION  ·  Swap all placeholder values before launch
   ──────────────────────────────────────────────────────────
   BOOK_URL  → your Calendly or cal.com link
   PILOT_URL → your Typeform, Notion form, or intake page
   EMAIL     → your contact email
   BRAND     → your actual company name
══════════════════════════════════════════════════════════════ */
const BRAND     = '[StartupName]'
const BOOK_URL  = '#book-call'
const PILOT_URL = '#pilot'
const EMAIL     = 'hello@yourdomain.com'
const LINKEDIN  = '#'

/*
  ── HEADLINE VARIATIONS ─────────────────────────────────────
  Pick one or A/B test:

  A) "Expert annotation for AI that can't afford to be wrong."  ← current
  B) "Your AI is only as good as your training data. Make it expert."
  C) "Better labels. Smarter AI. Domain experts, not crowd workers."
  D) "High-stakes AI needs high-expertise annotation."
  E) "Stop outsourcing your data quality to generalists."

  ── CTA VARIATIONS ──────────────────────────────────────────
  Primary:
    "Request a pilot →"          ← current
    "Start with a scope call →"
    "Get a custom proposal →"
    "See if we're a fit →"

  Secondary:
    "Book a 30-min call"         ← current
    "Talk to our team"
    "Schedule a free consult"
*/


/* ══════════════════════════════════════════════════════════════
   ICONS  ·  Inline SVG — zero dependencies
══════════════════════════════════════════════════════════════ */
function CheckIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XMarkIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ChevronDownIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function ArrowRightIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}


/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const CROWD_CONS = [
  'Generalist workers with no domain expertise',
  'Inconsistent quality on nuanced or complex tasks',
  'No accountability for subjective edge cases',
  'High error rates on specialized terminology',
  'Poorly suited for regulated or sensitive data',
]

const EXPERT_PROS = [
  'Annotators matched to your specific domain',
  'PhD researchers, clinicians, lawyers, and field specialists',
  'Rigorous QA with inter-annotator agreement scoring',
  'Deep command of domain jargon and edge cases',
  'Compliant workflows for regulated industries',
]

const STEPS = [
  {
    num: '01',
    title: 'Tell us about your task',
    body: 'Share your data types, annotation schema, quality standards, and timeline. We ask the right questions upfront to understand exactly what expertise your project requires.',
  },
  {
    num: '02',
    title: 'We build your expert team',
    body: 'We source and vet annotators with directly relevant domain knowledge — not generalists. Every team member passes task-specific calibration before the first label is applied.',
  },
  {
    num: '03',
    title: 'Annotate with built-in QA',
    body: 'Your expert team annotates with continuous quality monitoring, inter-annotator agreement checks, and structured review cycles — managed end-to-end by us.',
  },
  {
    num: '04',
    title: 'Receive validated, clean data',
    body: 'You get audit-ready, structured output with a full quality report — ready to power your training pipeline, evaluation suite, or model review process.',
  },
]

const INDUSTRIES = [
  {
    name: 'Healthcare & Life Sciences',
    cases: ['Clinical note classification', 'Medical imaging labels', 'Drug interaction tagging', 'Clinical trial data'],
    accent: 'bg-blue-50 border-blue-100',
    dot: 'bg-blue-500',
    tag: 'text-blue-700 bg-blue-100',
  },
  {
    name: 'Legal & Compliance',
    cases: ['Contract clause review', 'Case outcome labeling', 'Regulatory document parsing', 'Risk classification'],
    accent: 'bg-violet-50 border-violet-100',
    dot: 'bg-violet-500',
    tag: 'text-violet-700 bg-violet-100',
  },
  {
    name: 'Finance & Risk',
    cases: ['Financial document extraction', 'Transaction labeling', 'Fraud signal annotation', 'Earnings call analysis'],
    accent: 'bg-emerald-50 border-emerald-100',
    dot: 'bg-emerald-500',
    tag: 'text-emerald-700 bg-emerald-100',
  },
  {
    name: 'Scientific Research',
    cases: ['Literature review tagging', 'Experimental data labels', 'Biomedical NER', 'Research classification'],
    accent: 'bg-amber-50 border-amber-100',
    dot: 'bg-amber-500',
    tag: 'text-amber-700 bg-amber-100',
  },
  {
    name: 'AI & LLM Evaluation',
    cases: ['RLHF preference data', 'LLM eval benchmarks', 'Instruction-following labels', 'Reasoning chain annotation'],
    accent: 'bg-rose-50 border-rose-100',
    dot: 'bg-rose-500',
    tag: 'text-rose-700 bg-rose-100',
  },
  {
    name: 'Enterprise & Regulated',
    cases: ['Policy classification', 'Compliance review', 'Internal record labeling', 'Audit trail creation'],
    accent: 'bg-slate-50 border-slate-200',
    dot: 'bg-slate-500',
    tag: 'text-slate-700 bg-slate-200',
  },
]

const QUALITY_PILLARS = [
  {
    title: 'Rigorous Expert Vetting',
    body: 'Every annotator passes a multi-stage screen: credential review, domain knowledge assessment, and task-specific calibration on representative examples before being assigned to any project.',
  },
  {
    title: 'Multi-Layer Quality Assurance',
    body: 'We apply inter-annotator agreement (IAA) scoring, expert review passes, gold-standard calibration tasks, and statistical anomaly detection to every deliverable.',
  },
  {
    title: 'Secure & Compliant Workflows',
    body: 'All annotators sign project-specific NDAs. We support HIPAA, GDPR, and SOC2-aligned workflows with granular data access controls and audit logging.',
  },
  {
    title: 'Full Audit Trail',
    body: 'Every deliverable comes with annotation statistics, agreement rates, reviewer notes, and a complete audit trail so you see exactly how each label was produced.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'We tried two crowd annotation platforms before switching. The quality difference with domain experts was immediately obvious — fewer edge-case errors and far less time spent in post-processing review.',
    name: 'Head of ML',
    org: '[Healthcare AI Company]',
  },
  {
    quote: 'Our legal NLP model needed annotators who understood contract law — not people clicking through a form. This team knew the domain and caught nuances we hadn\'t even spec\'d for.',
    name: 'Applied Research Lead',
    org: '[LegalTech Startup]',
  },
  {
    quote: 'For RLHF we needed annotators who could reason about model output quality. Expert annotators made a measurable difference in our preference label reliability versus what we\'d been getting.',
    name: 'ML Research Engineer',
    org: '[Foundation Model Lab]',
  },
]

const FAQS = [
  {
    q: 'What kinds of annotation tasks do you handle?',
    a: 'We specialize in tasks where domain knowledge is essential: medical record classification, legal document review, scientific literature labeling, financial instrument tagging, RLHF preference data, LLM evaluation benchmarks, and more. If accuracy depends on subject-matter expertise, it\'s in our wheelhouse.',
  },
  {
    q: 'How are you different from Scale AI, Appen, or Mechanical Turk?',
    a: 'Those platforms are optimized for volume using general crowd labor. We\'re optimized for quality using domain specialists. We\'re the right choice when task accuracy requires genuine subject-matter knowledge — not the right choice for high-volume, low-complexity labeling at the lowest possible cost.',
  },
  {
    q: 'Are you a software platform or a service?',
    a: 'We\'re a managed service, not a self-serve SaaS platform. We work closely with each client to scope the task, source the right experts, and manage quality end-to-end. Think of us as a specialist annotation partner, not a tool you configure yourself.',
  },
  {
    q: 'How do you source and vet annotators?',
    a: 'We recruit from academic networks, professional communities, and direct domain outreach. Every annotator is screened for credentials, domain knowledge, and annotation calibration on task-representative examples before being assigned to a project.',
  },
  {
    q: 'How do you ensure annotation quality?',
    a: 'We use inter-annotator agreement (IAA) scoring, gold-standard calibration tasks, expert review passes, and anomaly detection. Every deliverable includes a quality report with agreement rates, reviewer notes, and confidence metrics.',
  },
  {
    q: 'Can you handle sensitive or regulated data (HIPAA, GDPR, SOC2)?',
    a: 'Yes. We support data handling workflows aligned with HIPAA, GDPR, and SOC2 requirements. All annotators sign project-specific NDAs, and we can work within client-defined security environments, including air-gapped or on-premise setups when needed.',
  },
  {
    q: 'How quickly can you start a new project?',
    a: 'For most projects we can scope, staff, and begin annotation within 1–2 weeks of kickoff. Timeline varies based on domain specificity and team size. We\'ll give you an honest estimate on the first call.',
  },
  {
    q: 'What does pricing look like?',
    a: 'Pricing is project-based and depends on task complexity, domain, annotation schema, and volume. We don\'t publish standard rates because no two projects are identical. Book a call and we\'ll scope a proposal for your specific needs.',
  },
]


/* ══════════════════════════════════════════════════════════════
   LAYOUT HELPERS
══════════════════════════════════════════════════════════════ */
function Container({ children, className = '' }) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-slate-500 leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    ['#why-us',       'Why experts'],
    ['#how-it-works', 'How it works'],
    ['#industries',   'Industries'],
    ['#faq',          'FAQ'],
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label={BRAND}>
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors p-1.5">
              <LogoMark />
            </div>
            <span className="font-semibold text-slate-900 text-[17px]">{BRAND}</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="hidden md:block text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              {EMAIL}
            </a>
            <a
              href={BOOK_URL}
              className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Book a call
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-slate-100 flex flex-col gap-4" aria-label="Mobile navigation">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {label}
              </a>
            ))}
            <a href={`mailto:${EMAIL}`} className="text-sm font-medium text-slate-600">
              {EMAIL}
            </a>
          </nav>
        )}
      </Container>
    </header>
  )
}


/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Status badge */}
        <span className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 border border-blue-100 text-sm font-medium px-3.5 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
          Expert Annotation Service · Now onboarding clients
        </span>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-slate-900 tracking-tight leading-[1.06] mb-6">
          Expert annotation for AI<br className="hidden sm:block" />{' '}
          that{' '}
          <span className="text-blue-600">can't afford</span>
          {' '}to be wrong.
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
          We connect AI and ML teams with PhD researchers, clinicians, lawyers, and domain specialists for complex data labeling — no crowd labor, no quality shortcuts.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={PILOT_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-colors shadow-sm"
          >
            Request a pilot
            <ArrowRightIcon />
          </a>
          <a
            href={BOOK_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-base px-7 py-3.5 rounded-xl transition-colors"
          >
            Book a 30-min call
          </a>
        </div>

        {/* Domain trust tags */}
        <div className="mt-14 pt-10 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] mb-5">
            Annotation expertise in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {['Healthcare', 'Legal', 'Finance', 'Life Sciences', 'AI / LLMs', 'Scientific Research', 'Enterprise'].map(d => (
              <span key={d} className="text-sm text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full font-medium">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   WHY US  ·  Crowd vs. Expert comparison
══════════════════════════════════════════════════════════════ */
function WhyUs() {
  const features = [
    { title: 'Domain-matched',    desc: 'Every annotator selected for your specific subject matter' },
    { title: 'Managed end-to-end', desc: 'We handle sourcing, QA, and delivery — you focus on building' },
    { title: 'Rigorous QA',       desc: 'Multi-layer quality checks applied to every annotation batch' },
    { title: 'Compliance-ready',  desc: 'HIPAA, GDPR, and SOC2-aligned data handling by default' },
  ]

  return (
    <section id="why-us" className="py-20 md:py-28 bg-slate-50">
      <Container>
        <SectionHeader
          eyebrow="Why it matters"
          title="Generic crowd labor isn't built for complex AI."
          subtitle="Most annotation platforms optimize for speed and cost. For high-stakes, domain-specific tasks, that tradeoff breaks down — fast."
        />

        {/* Comparison cards */}
        <div className="mt-14 grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">

          {/* Crowd column */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center border border-red-100">
                <XMarkIcon className="w-4 h-4 text-red-500" />
              </span>
              <h3 className="font-semibold text-slate-900">Crowd annotation</h3>
            </div>
            <ul className="space-y-3.5">
              {CROWD_CONS.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <XMarkIcon className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-slate-500 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expert column */}
          <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <CheckIcon className="w-4 h-4 text-blue-600" />
              </span>
              <h3 className="font-semibold text-slate-900">{BRAND} expert annotation</h3>
            </div>
            <ul className="space-y-3.5">
              {EXPERT_PROS.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-slate-800 text-sm leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {features.map(({ title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="w-2 h-2 rounded-full bg-blue-500 mb-3" aria-hidden="true" />
              <h4 className="font-semibold text-slate-900 text-sm mb-1.5">{title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════════════════════ */
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Process"
          title="A managed service, not a DIY platform."
          subtitle="We handle every step — from task scoping and expert sourcing to quality assurance and final delivery. You stay focused on your product."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map(({ num, title, body }) => (
            <div key={num} className="relative">
              <span
                className="block text-5xl font-extrabold text-blue-100 leading-none mb-5 select-none tabular-nums"
                aria-hidden="true"
              >
                {num}
              </span>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div className="mt-14 text-center">
          <a
            href={BOOK_URL}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
          >
            Walk us through your task on a quick call
            <ArrowRightIcon />
          </a>
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   INDUSTRIES
══════════════════════════════════════════════════════════════ */
function Industries() {
  return (
    <section id="industries" className="py-20 md:py-28 bg-slate-50">
      <Container>
        <SectionHeader
          eyebrow="Use cases"
          title="Built for expert-heavy domains."
          subtitle="We work with AI teams in industries where annotation quality directly determines model safety, accuracy, or regulatory compliance."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map(({ name, cases, accent, dot, tag }) => (
            <div
              key={name}
              className={`rounded-2xl border p-6 hover:shadow-md transition-shadow bg-white ${accent}`}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className={`w-2 h-2 rounded-full ${dot} shrink-0`} aria-hidden="true" />
                <h3 className="font-semibold text-slate-900 text-sm">{name}</h3>
              </div>
              <ul className="space-y-2">
                {cases.map(c => (
                  <li key={c} className="flex items-start gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-slate-400">
          Don't see your industry?{' '}
          <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:underline font-medium">
            Get in touch →
          </a>
        </p>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   QUALITY & TRUST
══════════════════════════════════════════════════════════════ */
function Quality() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Quality & trust"
          title="We take quality as seriously as you do."
          subtitle="Our QA methodology is built for the kind of high-stakes annotation work where errors have real-world consequences."
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {QUALITY_PILLARS.map(({ title, body }, i) => (
            <div key={title} className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-5">
                <span className="text-white text-xs font-bold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2.5">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS  ·  Placeholder quotes — replace with real ones
══════════════════════════════════════════════════════════════ */
function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <Container>
        <SectionHeader
          eyebrow="From clients"
          title="What teams say about working with us."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ quote, name, org }) => (
            <div key={name} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-7 flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5">
                "{quote}"
              </p>
              <div className="border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-900 text-sm">{name}</p>
                <p className="text-slate-400 text-xs mt-0.5">{org}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-xs text-slate-400 italic">
          Testimonials are representative of client feedback. Specific details anonymised.
        </p>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   BOTTOM CTA
══════════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section id="book-call" className="py-20 md:py-28">
      <Container>
        <div className="bg-slate-900 rounded-3xl px-8 md:px-14 py-14 md:py-16 text-center">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.15em] mb-4">
            Get started
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Ready to get better labels?
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
            Book a 30-minute call to walk through your annotation needs. We'll be direct about whether we're the right fit — and what a pilot would look like.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BOOK_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold text-base px-7 py-3.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Book a 30-min call
              <ArrowRightIcon />
            </a>
            <a
              href={PILOT_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Request a pilot project
            </a>
          </div>
          <p className="mt-7 text-slate-500 text-sm">
            Or email us directly:{' '}
            <a href={`mailto:${EMAIL}`} className="text-slate-300 hover:text-white transition-colors">
              {EMAIL}
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   FAQ  ·  Accordion
══════════════════════════════════════════════════════════════ */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-900 text-sm md:text-[15px] group-hover:text-blue-600 transition-colors leading-snug">
          {q}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <ChevronDownIcon className="w-3.5 h-3.5 text-slate-600" />
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm md:text-[15px] text-slate-500 leading-relaxed pr-10">
          {a}
        </p>
      )}
    </div>
  )
}

function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions."
          />

          <div className="mt-10 bg-white rounded-2xl border border-slate-200 px-6 md:px-8">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-slate-400">
            Have a question not covered here?{' '}
            <a href={`mailto:${EMAIL}`} className="text-blue-600 font-medium hover:underline">
              Email us →
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 py-10 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center p-1">
                <LogoMark />
              </div>
              <span className="font-semibold text-slate-900">{BRAND}</span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed">
              Expert-led data annotation and evaluation for AI teams building high-stakes products.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Product</p>
              <ul className="space-y-2">
                {[['#why-us', 'Why experts'], ['#how-it-works', 'How it works'], ['#industries', 'Industries']].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Company</p>
              <ul className="space-y-2">
                {[
                  ['#faq', 'FAQ'],
                  [`mailto:${EMAIL}`, 'Contact'],
                  [LINKEDIN, 'LinkedIn'],
                ].map(([href, label]) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© {year} {BRAND}. All rights reserved.</p>
          <p className="text-xs text-slate-400">
            <a href={`mailto:${EMAIL}`} className="hover:text-slate-600 transition-colors">{EMAIL}</a>
          </p>
        </div>
      </Container>
    </footer>
  )
}


/* ══════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <HowItWorks />
        <Industries />
        <Quality />
        <Testimonials />
        <BottomCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
