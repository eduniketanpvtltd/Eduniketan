import { dbStore } from '@/lib/dbStore';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'Recruitment Drives — Eduniketan Private Limited',
  description: 'Explore open recruitment opportunities at Eduniketan. Apply for our campus drives, internship programs, and placement bootcamps.',
};

export const dynamic = 'force-dynamic';

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circles */}
      <circle cx="240" cy="160" r="140" fill="rgba(37,99,235,0.06)" />
      <circle cx="240" cy="160" r="100" fill="rgba(13,148,136,0.06)" />

      {/* Central document / form */}
      <rect x="155" y="70" width="170" height="210" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="171" y="92" width="138" height="8" rx="4" fill="#dbeafe" />
      <rect x="171" y="108" width="100" height="6" rx="3" fill="#e0f2fe" />

      {/* Form fields */}
      <rect x="171" y="130" width="138" height="18" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="171" y="156" width="138" height="18" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="171" y="182" width="138" height="18" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="171" y="208" width="138" height="18" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Submit button */}
      <rect x="171" y="240" width="138" height="26" rx="13" fill="#1e3a8a" />
      <rect x="198" y="249" width="84" height="8" rx="4" fill="white" opacity="0.8" />

      {/* Graduation cap floating */}
      <g transform="translate(60, 50)">
        <polygon points="35,5 65,20 35,35 5,20" fill="#1e3a8a" opacity="0.9" />
        <rect x="57" y="20" width="3" height="20" fill="#1e3a8a" opacity="0.7" />
        <circle cx="58.5" cy="41" r="5" fill="#f59e0b" />
        <rect x="22" y="28" width="26" height="18" rx="3" fill="#2563eb" opacity="0.6" />
      </g>

      {/* Star accents */}
      <path d="M380 80 L383 90 L393 90 L385 96 L388 106 L380 100 L372 106 L375 96 L367 90 L377 90 Z" fill="#f59e0b" opacity="0.7" />
      <path d="M90 180 L92 186 L98 186 L93 190 L95 196 L90 192 L85 196 L87 190 L82 186 L88 186 Z" fill="#06b6d4" opacity="0.6" />
      <path d="M400 200 L402 207 L409 207 L403 211 L405 218 L400 214 L395 218 L397 211 L391 207 L398 207 Z" fill="#1e3a8a" opacity="0.5" />

      {/* Checkmark badge */}
      <circle cx="380" cy="130" r="22" fill="#10b981" opacity="0.15" />
      <circle cx="380" cy="130" r="16" fill="#10b981" opacity="0.25" />
      <path d="M372 130 L377 136 L388 122" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* People icons */}
      <circle cx="100" cy="250" r="18" fill="rgba(30,58,138,0.08)" />
      <circle cx="100" cy="244" r="7" fill="#2563eb" opacity="0.5" />
      <path d="M87 265 Q100 258 113 265" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      <circle cx="380" cy="250" r="18" fill="rgba(13,148,136,0.08)" />
      <circle cx="380" cy="244" r="7" fill="#0d9488" opacity="0.5" />
      <path d="M367 265 Q380 258 393 265" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      {/* Floating dots */}
      <circle cx="130" cy="110" r="4" fill="#2563eb" opacity="0.3" />
      <circle cx="355" cy="170" r="3" fill="#0d9488" opacity="0.4" />
      <circle cx="160" cy="290" r="5" fill="#f59e0b" opacity="0.3" />
      <circle cx="330" cy="60" r="4" fill="#06b6d4" opacity="0.4" />
    </svg>
  );
}

function EmptyIllustration() {
  return (
    <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-48 mx-auto opacity-70">
      <rect x="60" y="40" width="180" height="140" rx="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="150" cy="100" r="28" fill="#e2e8f0" />
      <rect x="118" y="96" width="64" height="8" rx="4" fill="#cbd5e1" />
      <rect x="130" y="112" width="40" height="6" rx="3" fill="#dde4ee" />
      <rect x="90" y="145" width="120" height="14" rx="7" fill="#dbeafe" />
      <rect x="108" y="149" width="84" height="6" rx="3" fill="#93c5fd" />
    </svg>
  );
}

// ─── Field type badges ────────────────────────────────────────────────────────

function FieldTypeBadge({ type }) {
  const map = {
    text: { label: 'Text', color: 'blue' },
    email: { label: 'Email', color: 'indigo' },
    tel: { label: 'Phone', color: 'teal' },
    number: { label: 'Number', color: 'slate' },
    textarea: { label: 'Long Text', color: 'slate' },
    select: { label: 'Dropdown', color: 'amber' },
    radio: { label: 'Radio', color: 'amber' },
    checkbox: { label: 'Checkbox', color: 'teal' },
    date: { label: 'Date', color: 'indigo' },
    file: { label: 'File Upload', color: 'emerald' },
  };
  const info = map[type] || { label: type, color: 'slate' };
  return <Badge variant={info.color}>{info.label}</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RecruitmentPage() {
  let forms = [];
  try {
    forms = await dbStore.getRecruitmentForms(true); // published only
  } catch (err) {
    console.error('Error loading recruitment forms:', err);
  }

  const now = new Date();
  const activeForms = forms.filter((f) => {
    if (!f.deadline) return true;
    const dl = new Date(f.deadline);
    dl.setHours(23, 59, 59, 999);
    return now <= dl;
  });
  const expiredForms = forms.filter((f) => {
    if (!f.deadline) return false;
    const dl = new Date(f.deadline);
    dl.setHours(23, 59, 59, 999);
    return now > dl;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-bg-primary py-20 px-4 sm:px-6 lg:px-8">
        {/* Mesh background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/90 text-xs font-semibold mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {activeForms.length > 0 ? `${activeForms.length} Active Opening${activeForms.length !== 1 ? 's' : ''}` : 'No Open Positions Right Now'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Join the{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Eduniketan
              </span>{' '}
              Ecosystem
            </h1>
            <p className="text-lg text-white/75 max-w-xl mb-8">
              Explore open recruitment drives, internship programs, and campus placement opportunities. Submit your application directly below.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {activeForms.length > 0 && (
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  View Openings
                </a>
              )}
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Learn About Us
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md animate-float">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Open Positions', value: activeForms.length },
            { label: 'Total Forms', value: forms.length },
            { label: 'Application Closed', value: expiredForms.length },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Active Openings ───────────────────────────────────────────── */}
      <section id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <Badge variant="blue" className="mb-3">Open Applications</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Current Openings</h2>
          <p className="text-slate-500 mt-2">Click on any drive to fill your application form.</p>
        </div>

        {activeForms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <EmptyIllustration />
            <h3 className="text-xl font-bold text-slate-700 mt-6">No Active Openings</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
              There are no recruitment drives open right now. Check back soon or contact us directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeForms.map((form, i) => {
              const daysLeft = form.deadline
                ? Math.ceil((new Date(form.deadline) - now) / (1000 * 60 * 60 * 24))
                : null;
              const fieldCount = (form.fields || []).length;
              const fieldTypes = [...new Set((form.fields || []).map((f) => f.type))];
              const hasFileUpload = (form.fields || []).some((f) => f.type === 'file');

              return (
                <Link
                  key={form.id}
                  href={`/form/${form.id}`}
                  className="group block bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Card top gradient bar */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500" />

                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight text-sm line-clamp-2">
                          {form.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    {form.description && (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{form.description}</p>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        {fieldCount} field{fieldCount !== 1 ? 's' : ''}
                      </span>
                      {hasFileUpload && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full font-medium">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          File Upload
                        </span>
                      )}
                      {daysLeft !== null && (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium ${daysLeft <= 3 ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {daysLeft <= 0 ? 'Closing today' : `${daysLeft}d left`}
                        </span>
                      )}
                    </div>

                    {/* Field type pills */}
                    {fieldTypes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {fieldTypes.slice(0, 4).map((t) => (
                          <FieldTypeBadge key={t} type={t} />
                        ))}
                        {fieldTypes.length > 4 && (
                          <Badge variant="slate">+{fieldTypes.length - 4} more</Badge>
                        )}
                      </div>
                    )}

                    {/* Apply CTA */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {form.deadline
                          ? `Deadline: ${new Date(form.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
                          : 'No deadline'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full group-hover:shadow-md transition-shadow">
                        Apply Now
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Expired Forms ─────────────────────────────────────────────── */}
      {expiredForms.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-8">
            <Badge variant="slate" className="mb-3">Closed</Badge>
            <h2 className="text-2xl font-bold text-slate-700">Past Drives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expiredForms.map((form) => (
              <div key={form.id} className="bg-white/60 rounded-2xl border border-slate-100 p-5 opacity-70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-600 text-sm line-clamp-1">{form.title}</div>
                    <div className="text-[11px] text-slate-400">
                      Closed: {new Date(form.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">
                  Applications Closed
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
