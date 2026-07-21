'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDemoModal } from '@/context/DemoModalContext';
import { Calendar, Rocket, Award, ShieldCheck, Building2, Flag, CheckCircle2 } from 'lucide-react';

const milestones = [
  {
    year: 'Jul 2024',
    title: 'Research Kickoff',
    badge: 'Research',
    badgeVariant: 'blue',
    icon: Flag,
    description: 'Product and market research started to evaluate existing gaps in university placement assessments.',
    highlights: ['Market demand analysis', 'Competitor benchmarking'],
  },
  {
    year: 'Jan 2025',
    title: 'First Prototype Launch',
    badge: 'Prototype',
    badgeVariant: 'teal',
    icon: Rocket,
    description: 'Developed and rolled out the first working prototype of TheEduCode autograding engine.',
    highlights: ['Basic compiler integrations', 'Auto-evaluation checks'],
  },
  {
    year: 'Jul 2025',
    title: 'Security Research',
    badge: 'Security',
    badgeVariant: 'indigo',
    icon: ShieldCheck,
    description: 'Conducted intensive security research and testing to ensure compilation and proctoring resilience.',
    highlights: ['Sandboxed execution audits', 'Proctoring security updates'],
  },
  {
    year: 'Sep 2025',
    title: 'TheEduLive Blueprint',
    badge: 'Blueprint',
    badgeVariant: 'slate',
    icon: Award,
    description: 'Presented the blueprint for TheEduLive mentor-led training and interactive workshop structure.',
    highlights: ['Curriculum guidelines established', 'SDE mentor onboarding framework'],
  },
  {
    year: '22 Oct 2025',
    title: 'Company Incorporation',
    badge: 'Incorporation',
    badgeVariant: 'blue',
    icon: Building2,
    description: 'Eduniketan Private Limited officially incorporated and completed all ministry paperwork.',
    highlights: ['MCA incorporation completed', 'Founder roles finalized'],
  },
  {
    year: 'Dec 2025',
    title: 'Real Environment Testing',
    badge: 'Testing',
    badgeVariant: 'emerald',
    icon: ShieldCheck,
    description: 'Conducted testing in real environments and LPU ground to validate high concurrency loads.',
    highlights: ['Simultaneous user drills', 'Load balancing audits'],
  },
  {
    year: 'Jan 2026',
    title: 'LPU Deal Signing',
    badge: 'Deal',
    badgeVariant: 'amber',
    icon: Award,
    description: 'Officially signed the deal with Lovely Professional University (LPU) for PEP rollout.',
    highlights: ['PEP program scope alignment', 'Student database mapping'],
  },
  {
    year: 'Feb 2026',
    title: 'TheEduLive Beta Launch',
    badge: 'Beta',
    badgeVariant: 'teal',
    icon: Rocket,
    description: 'Launched the Beta version of TheEduLive platform for interactive remote training sessions.',
    highlights: ['Live chat features', 'Scorecard feedback modules'],
  },
  {
    year: 'Mar-Apr 2026',
    title: 'Collaborations & Events',
    badge: 'Events',
    badgeVariant: 'blue',
    icon: Building2,
    description: 'Initiated multiple events and collaborations across regional technical college networks.',
    highlights: ['MoU groundwork discussions', 'Student seminar workshops'],
  },
  {
    year: 'Apr-May 2026',
    title: 'PEP Course Selection',
    badge: 'Selection',
    badgeVariant: 'indigo',
    icon: Award,
    description: 'PEP courses officially got selected and granted by LPU Training & Placement Officer (TPO).',
    highlights: ['Curriculum approval', 'Timeline calendars finalized'],
  },
  {
    year: 'May 1, 2026',
    title: 'TheEduBootCamp Announced',
    badge: 'Announcement',
    badgeVariant: 'emerald',
    icon: Rocket,
    description: 'TheEduBootCamp program officially announced to university students and faculty.',
    highlights: ['LPU registration kickoff', 'Syllabus handbook launch'],
  },
  {
    year: 'Jun 15, 2026',
    title: 'First TheEduLive Class',
    badge: 'Class Start',
    badgeVariant: 'teal',
    icon: Calendar,
    description: 'Delivered the first live class on TheEduLive platform for TheEduBootCamp program.',
    highlights: ['Direct instructor interaction', 'Platform dashboard login tests'],
  },
  {
    year: '18 Jun 2026',
    title: 'Pyramid College MoU',
    badge: 'Strategic MoU',
    badgeVariant: 'amber',
    icon: Award,
    description: 'Signed a comprehensive Memorandum of Understanding (MoU) with Pyramid College of Business & Tech.',
    highlights: ['Annual PEP licensing', 'Student performance tracking'],
  },
];

export default function JourneyPage() {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="blue">Our Timeline</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          The Journey of <span className="gradient-text">Eduniketan</span>
        </h1>
        <p className="text-slate-600 text-lg">
          From a vision to solve campus placement gaps to powering assessments for thousands of students at top universities across India.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-blue-200/80 ml-4 sm:ml-32 space-y-12 py-4">
        {milestones.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div key={idx} className="relative pl-8 sm:pl-10 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-4 border-blue-700 text-blue-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <IconComp className="w-3.5 h-3.5" />
              </div>

              {/* Year label (Desktop left) */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {m.year}
                </span>
              </div>

              {/* Content Card */}
              <Card className="p-6 sm:p-8 space-y-4 border-slate-200 group-hover:border-blue-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="sm:hidden text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    {m.year}
                  </span>
                  <Badge variant={m.badgeVariant}>{m.badge}</Badge>
                </div>

                <h3 className="text-2xl font-bold text-slate-900">{m.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{m.description}</p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Highlights</div>
                  <ul className="space-y-1.5">
                    {m.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="text-center pt-8">
        <Card className="p-8 gradient-bg-primary text-white space-y-4 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold">Be Part of Our Next Milestone</h3>
          <p className="text-slate-300 text-sm">
            Partner with Eduniketan for the upcoming academic semester and elevate your campus placement readiness.
          </p>
          <Button onClick={() => openDemoModal()} variant="accent" size="lg">
            Discuss Partnership Opportunities
          </Button>
        </Card>
      </div>
    </div>
  );
}
