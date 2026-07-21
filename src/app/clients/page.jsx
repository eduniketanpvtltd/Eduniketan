'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDemoModal } from '@/context/DemoModalContext';
import { Building2, Award, CheckCircle2, ShieldCheck, TrendingUp, Users, ArrowRight, Quote } from 'lucide-react';

const partners = [
  {
    name: 'Lovely Professional University (LPU)',
    location: 'Phagwara, Punjab',
    badge: 'PEP Partner',
    stats: '99.9% Uptime • 91/100 Faculty NPS',
    desc: 'Campus-wide deployment of Placement Enhancement Program (TheEduBootCamp) for technical assessment preparation.',
  },
  {
    name: 'Pyramid College of Business & Tech (PCBT)',
    location: 'Punjab Campus',
    badge: 'MoU Partner',
    stats: 'Annual Placement Mastery Program',
    desc: 'Integrated year-round autograder platform and mentor live mentorship for management & engineering streams.',
  },
  {
    name: 'West Bengal Engineering Institutions Network',
    location: 'Kolkata & Regional WB',
    badge: 'Campus Network',
    stats: 'Thousands of Students Onboarded',
    desc: 'Branch-wise crash course banks and online screening test evaluations for core and non-CS branches.',
  },
  {
    name: 'National Technical Academy Network',
    location: 'Pan-India',
    badge: 'Assessment Partner',
    stats: '10,000+ Question Bank Deployed',
    desc: 'Automated problem autograding for weekly student screening and leaderboard diagnostics.',
  },
];

const caseStudies = [
  {
    title: 'LPU Placement Enhancement Case Study',
    metrics: '91/100 Faculty NPS | Zero Incident Stability',
    quote: 'Eduniketan delivered exceptional execution during high-concurrency online examinations. The combination of live sessions and autograder tests significantly boosted student confidence.',
    role: 'Placement Coordination Team',
    institution: 'Lovely Professional University',
  },
  {
    title: 'Pyramid College Annual MoU Impact',
    metrics: 'Year-Round Autograder Integration',
    quote: 'The Placement Mastery Program provided our TPO cell with actionable weekly analytics on student weakness areas before corporate drives.',
    role: 'Head of Academic Alliances',
    institution: 'Pyramid College of Business & Tech',
  },
];

export default function ClientsPage() {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="blue">Institutional Partners</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Trusted by Top <span className="gradient-text">Colleges & Universities</span>
        </h1>
        <p className="text-slate-600 text-lg">
          Partnering with leading higher education institutions across India to deliver field-tested placement training.
        </p>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partners.map((p, idx) => (
          <Card key={idx} className="p-8 space-y-4 border-slate-200 hover:border-blue-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-base">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                  <div className="text-xs text-slate-500">{p.location}</div>
                </div>
              </div>
              <Badge variant="teal">{p.badge}</Badge>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                {p.stats}
              </span>
              <span className="text-slate-400 font-semibold">Active Institutional MoU</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Case Studies Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="emerald">Institutional Outcomes</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Partner Case Studies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <Card key={i} className="p-8 border-teal-100 bg-gradient-to-br from-white to-teal-50/20 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="teal">{cs.metrics}</Badge>
                <Quote className="w-6 h-6 text-teal-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{cs.title}</h3>
              <p className="text-slate-700 text-sm italic leading-relaxed">&ldquo;{cs.quote}&rdquo;</p>
              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-xs">{cs.role}</div>
                <div className="text-[11px] text-teal-700 font-semibold">{cs.institution}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="gradient-bg-primary text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold">Join Our Growing Campus Partner Network</h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Equip your university with autograder technology and live mentor panels before the upcoming campus placement season.
        </p>
        <Button onClick={() => openDemoModal('General Partnership')} variant="accent" size="lg">
          Request Institutional Partnership Proposal
        </Button>
      </div>
    </div>
  );
}
