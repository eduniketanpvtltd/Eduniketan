'use client';

import React from 'react';
import Image from 'next/image';
import { useDemoModal } from '@/context/DemoModalContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Video,
  Users,
  CheckCircle2,
  MessageSquareText,
  FileText,
  Mic,
  Smile,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const programs = [
  { title: 'Group Discussion (GD) Techniques', desc: 'Frameworks for opening, summarizing, data-backed argumentation, and handling aggressive GD rounds.', icon: Users },
  { title: 'Personal Interview (PI) & Mock Panels', desc: '1-on-1 mock interviews conducted by active industry professionals with detailed scorecard feedback.', icon: UserCheck },
  { title: 'Resume & LinkedIn Building', desc: 'ATS-compliant resume engineering, Github project showcasing, and professional LinkedIn branding.', icon: FileText },
  { title: 'Business & Email Communication', desc: 'Corporate email writing etiquette, professional vocabulary, and cross-functional team communication.', icon: MessageSquareText },
  { title: 'Public Speaking & Presentations', desc: 'Overcoming stage fear, slide deck structure, vocal modulation, and audience engagement strategies.', icon: Mic },
  { title: 'Body Language & Personal Branding', desc: 'Non-verbal cues, dress codes, posture, online interview etiquette, and professional presence.', icon: Smile },
];

export default function TheEduLivePage() {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-teal-600/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/TheEduLive Logo.png"
                alt="TheEduLive Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div>
              <Badge variant="teal">Mentor-Led Live Training</Badge>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                TheEduLive
              </h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 font-medium leading-relaxed">
            Live interactive mentorship sessions delivered by experienced corporate professionals to transform student soft skills, interview readiness, and corporate communication.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button onClick={() => openDemoModal('TheEduLive')} size="lg" variant="accent" className="gap-2">
              Book Mentorship Demo <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="/brochures/TheEduLive_Brochure.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="white">
                Download Proposal (PDF)
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Program Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-2 border-teal-100">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Active Industry Mentors</h3>
          <p className="text-xs text-slate-600">Trainers from top tech and corporate MNCs bringing real-world hiring standards.</p>
        </Card>

        <Card className="space-y-2 border-blue-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Interactive Mock Sessions</h3>
          <p className="text-xs text-slate-600">Live GDs and mock interview panels with personalized evaluation scorecards.</p>
        </Card>

        <Card className="space-y-2 border-indigo-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Weekly Progress Drills</h3>
          <p className="text-xs text-slate-600">Continuous evaluation tracking student improvement over the semester.</p>
        </Card>
      </div>

      {/* Program Catalog Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="blue">Curriculum Modules</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Mentorship Module Breakdown</h2>
          <p className="text-slate-600 text-sm">
            Targeted training modules built to ensure your students excel in non-technical interview stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, i) => {
            const IconComp = p.icon;
            return (
              <Card key={i} className="p-6 space-y-3 hover:border-teal-300">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 w-max">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Want to schedule a live demo session for your campus?</h3>
          <p className="text-slate-300 text-sm">Experience our mentor interaction and scorecard system firsthand.</p>
        </div>
        <Button onClick={() => openDemoModal('TheEduLive')} size="lg" variant="white" className="shrink-0">
          Request Mentor Demo
        </Button>
      </div>
    </div>
  );
}
