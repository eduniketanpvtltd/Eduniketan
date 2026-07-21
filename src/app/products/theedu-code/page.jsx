'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDemoModal } from '@/context/DemoModalContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Code2,
  CheckCircle2,
  BarChart3,
  Trophy,
  Zap,
  BookOpen,
  FileSpreadsheet,
  Database,
  Cpu,
  Brain,
  Calculator,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

const coursesGrid = [
  { name: 'Quantitative Aptitude', desc: 'Speed math, arithmetic, algebra, and time-distance problem banks.', icon: Calculator, category: 'Aptitude' },
  { name: 'Logical Reasoning', desc: 'Puzzles, seating arrangement, blood relations, and syllogisms.', icon: Brain, category: 'Aptitude' },
  { name: 'Verbal & English Comprehension', desc: 'Grammar, reading comprehension, error spotting, and vocabulary.', icon: MessageSquare, category: 'Soft Skills' },
  { name: 'Data Interpretation', desc: 'Bar graphs, pie charts, tabular analysis, and caselets.', icon: BarChart3, category: 'Aptitude' },
  { name: 'General & Current Affairs', desc: 'Business environment, corporate awareness, and tech trends.', icon: BookOpen, category: 'General' },
  { name: 'Data Structures & Algorithms', desc: 'Arrays, Trees, Graphs, Dynamic Programming with automated test cases.', icon: Code2, category: 'Coding' },
  { name: 'SQL & Database Basics', desc: 'Query execution, joins, indexing, and schema design exercises.', icon: Database, category: 'Coding' },
  { name: 'Excel for Business & Analytics', desc: 'Pivot tables, VLOOKUP, XLOOKUP, and financial modeling drills.', icon: FileSpreadsheet, category: 'Analytics' },
  { name: 'Python (Beginner & Data)', desc: 'Syntax, OOPs, NumPy, Pandas, and data analysis fundamentals.', icon: Cpu, category: 'Coding' },
  { name: 'Branch-Wise Core Crash Courses', desc: 'ECE, ME, EE, Civil core subject online assessment banks.', icon: Cpu, category: 'Core' },
  { name: 'Basic Coding for Non-CS', desc: 'Designed specifically for non-CS branches entering IT hiring.', icon: Zap, category: 'Foundation' },
];

const steps = [
  { step: '01', title: 'Curriculum Alignment', desc: 'We configure custom question banks matched to your university semester goals.' },
  { step: '02', title: 'Automated Evaluation', desc: 'Students solve weekly assessment tests evaluated instantaneously by our autograder.' },
  { step: '03', title: 'Live Leaderboard', desc: 'Real-time campus rankings motivate peer learning and competitive growth.' },
  { step: '04', title: 'TPO Diagnostic Insights', desc: 'University placement heads access topic-wise weakness reports and batch stats.' },
];

export default function TheEduCodePage() {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/TheEduCode Logo.png"
                alt="TheEduCode Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div>
              <Badge variant="blue">Automated Assessment Platform</Badge>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                TheEduCode
              </h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 font-medium leading-relaxed">
            The next-generation autograder & problem-solving engine designed to evaluate student performance in coding, aptitude, and core engineering subjects with zero human error.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button onClick={() => openDemoModal('TheEduCode')} size="lg" variant="primary" className="gap-2">
              Request Platform Demo <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="/brochures/TheEduCode_Brochure.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="white">
                Download Proposal (PDF)
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="space-y-2 border-blue-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Instant Autograding</h3>
          <p className="text-xs text-slate-600">Real-time compiler & test case execution for zero evaluation delay.</p>
        </Card>

        <Card className="space-y-2 border-teal-100">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Campus Leaderboard</h3>
          <p className="text-xs text-slate-600">Dynamic rankings to foster healthy competitive peer benchmarking.</p>
        </Card>

        <Card className="space-y-2 border-indigo-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">TPO Analytics Suite</h3>
          <p className="text-xs text-slate-600">Exportable CSV & PDF progress reports for department HODs.</p>
        </Card>

        <Card className="space-y-2 border-amber-100">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Weekly Assessment Drills</h3>
          <p className="text-xs text-slate-600">Automated weekly tests simulating company hiring round formats.</p>
        </Card>
      </div>

      {/* Course Catalog Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="teal">Assessment Coverage</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Comprehensive Course Catalog</h2>
          <p className="text-slate-600 text-sm">
            Over 10,000+ curated questions spanning technical, aptitude, and business analytics domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coursesGrid.map((c, i) => {
            const IconComp = c.icon;
            return (
              <Card key={i} className="p-6 space-y-3 hover:border-blue-300">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-blue-700">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {c.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How it Works Visual */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Workflow</span>
          <h2 className="text-3xl font-extrabold">How TheEduCode Integrates With Your Campus</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 relative">
              <div className="text-3xl font-black text-teal-400">{s.step}</div>
              <h3 className="text-lg font-bold text-white">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Button onClick={() => openDemoModal('TheEduCode')} variant="accent" size="lg">
            Schedule a Live Platform Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
