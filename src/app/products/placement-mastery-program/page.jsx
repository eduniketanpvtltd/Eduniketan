'use client';

import React from 'react';
import Image from 'next/image';
import { useDemoModal } from '@/context/DemoModalContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, CheckCircle2, Star, ShieldCheck, Zap, ArrowRight, Layers, Code2, Video } from 'lucide-react';

export default function PlacementMasteryProgramPage() {
  const { openDemoModal } = useDemoModal();

  const tiers = [
    {
      name: 'Base Tier',
      tag: 'Foundation Autograder',
      desc: 'Ideal for institutions seeking structured online assessment software with essential question banks.',
      badge: 'Starter',
      variant: 'slate',
      highlights: [
        'TheEduCode Autograder Access',
        'Basic Aptitude & Coding banks',
        'Bi-weekly student tests',
        'Standard CSV performance exports',
      ],
    },
    {
      name: 'Silver Tier',
      tag: 'Core PEP Package',
      desc: 'Combines autograder software with essential mentor live training sessions.',
      badge: 'Popular',
      variant: 'blue',
      highlights: [
        'Full TheEduCode Autograder access',
        '20 Hours Live Mentorship / Semester',
        'Weekly online assessment tests',
        'Group GD & Mock Interview sessions',
        'Standard TPO analytics suite',
      ],
    },
    {
      name: 'Gold Tier',
      tag: 'Advanced Placement Prep',
      desc: 'Enhanced live mentorship, company-specific mock papers, and proctored assessment drills.',
      badge: 'Recommended',
      variant: 'amber',
      highlights: [
        'Full TheEduCode + Company Question Papers',
        '35 Hours Live Mentorship / Semester',
        'Weekly proctored coding assessments',
        'Group + 1-on-1 Mock Interview feedback',
        'Advanced TPO weakness diagnostics',
      ],
    },
    {
      name: 'Platinum Flagship',
      tag: 'Complete University PEP Suite',
      desc: 'Full-service, high-touch partnership with dedicated campus co-ordinators and 1-on-1 industry mentorship.',
      badge: 'Flagship',
      variant: 'emerald',
      highlights: [
        'Unlimited custom paper creation on TheEduCode',
        '45+ Hours Live Mentorship / Semester',
        '1-on-1 Individual Mock Panels with SDEs',
        'ATS Resume & LinkedIn Optimization for all students',
        'Dedicated On-Campus & Online Coordinators',
      ],
    },
  ];

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative rounded-3xl gradient-bg-accent text-white p-8 sm:p-14 overflow-hidden shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="amber font-bold">Flagship Institutional Solution</Badge>
          <span className="text-xs text-amber-200 font-semibold">TheEduCode + TheEduLive Combo</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Placement Mastery Program
          </h1>
          <p className="text-xl text-slate-100 font-medium leading-relaxed">
            The complete 360° Placement Enhancement Program. We combine our automated code evaluation engine with live corporate mentor sessions to drive top campus placement results.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button onClick={() => openDemoModal('Placement Mastery Program')} size="lg" variant="white" className="gap-2 text-blue-950 font-bold">
              Request Customized Tier Proposal <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="/brochures/Placement_Mastery_Program_Proposal.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Download Proposal (PDF)
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Combo Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-blue-200 bg-gradient-to-br from-blue-50/50 to-white space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-700 text-white">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">TheEduCode Included</h3>
              <span className="text-xs text-blue-700 font-semibold">Autograder Tech Infrastructure</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Weekly question-format online assessments, automated grading, live campus leaderboards, and instant diagnostic analytics for your university TPO cell.
          </p>
        </Card>

        <Card className="p-8 border-teal-200 bg-gradient-to-br from-teal-50/50 to-white space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-teal-700 text-white">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">TheEduLive Included</h3>
              <span className="text-xs text-teal-700 font-semibold">Live Mentorship & Mock Panels</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Live interactive modules covering Aptitude, GD Techniques, Mock Interviews, Resume Building, and Soft Skills delivered by corporate SDE mentors.
          </p>
        </Card>
      </div>

      {/* Tier Cards Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="blue">Flexible Collaboration</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Placement Mastery Tiers</h2>
          <p className="text-slate-600 text-sm">
            Select the perfect per-student-per-semester tier tailored to your institution size and placement targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, idx) => (
            <Card key={idx} className="flex flex-col justify-between p-6 border-slate-200 hover:border-blue-400 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={t.variant}>{t.badge}</Badge>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.name}</h3>
                  <div className="text-[11px] font-semibold text-teal-700">{t.tag}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.desc}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Includes</div>
                  <ul className="space-y-2">
                    {t.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4">
                <Button onClick={() => openDemoModal(`Placement Mastery Program - ${t.name}`)} variant="primary" size="sm" className="w-full">
                  Request {t.name} Proposal
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
