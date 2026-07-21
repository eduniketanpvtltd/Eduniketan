'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDemoModal } from '@/context/DemoModalContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Tv,
  Video,
  Code2,
  Clock,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
  BookOpen
} from 'lucide-react';

export default function TheEduBootCampPage() {
  const { openDemoModal } = useDemoModal();
  const [activeTrack, setActiveTrack] = useState('track1');

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative rounded-3xl gradient-bg-primary text-white p-8 sm:p-14 overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="emerald">LPU Field-Tested PEP</Badge>
          <span className="text-xs text-teal-300 font-semibold">Deployment Success Story</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            TheEduBootCamp
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">
            Industry-Aligned Placement Enhancement Program (PEP) explicitly closing the gap between university syllabus and what top tech companies test in online assessments.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button onClick={() => openDemoModal('TheEduBootCamp')} size="lg" variant="accent" className="gap-2">
              Request LPU Case Study <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="/brochures/TheEduBootCamp_Brochure.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="white">
                Download Proposal (PDF)
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Proof Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center">
          <div className="text-3xl font-extrabold">99.9%</div>
          <div className="text-xs font-semibold text-emerald-700 mt-1">Platform Uptime at LPU</div>
        </div>
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-center">
          <div className="text-3xl font-extrabold">Zero</div>
          <div className="text-xs font-semibold text-blue-700 mt-1">Security Incidents</div>
        </div>
        <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-center">
          <div className="text-3xl font-extrabold">91 / 100</div>
          <div className="text-xs font-semibold text-indigo-700 mt-1">Faculty NPS Score</div>
        </div>
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-center">
          <div className="text-3xl font-extrabold">87 / 100</div>
          <div className="text-xs font-semibold text-amber-700 mt-1">Student NPS Score</div>
        </div>
      </div>

      {/* The Gap Comparison Table */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="blue font-bold">Why PEP is Essential</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">The Curriculum Gap Breakdown</h2>
          <p className="text-slate-600 text-sm">
            How traditional academic coverage compares with company screening tests and our solution.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-md bg-white">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4 font-bold">Domain</th>
                <th className="p-4 font-bold text-red-300">What Universities Teach</th>
                <th className="p-4 font-bold text-amber-300">What Companies Test</th>
                <th className="p-4 font-bold text-emerald-300">What TheEduBootCamp Delivers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">Data Structures</td>
                <td className="p-4 text-slate-600">Theoretical code on paper / basic linked lists</td>
                <td className="p-4 text-slate-800 font-semibold">LeetCode Medium/Hard time & space complexity</td>
                <td className="p-4 text-emerald-700 font-bold bg-emerald-50/50">45+ hrs live problem solving with autograder test cases</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">Aptitude & Speed</td>
                <td className="p-4 text-slate-600">Formula memorization without time limits</td>
                <td className="p-4 text-slate-800 font-semibold">60-second-per-question speed tests</td>
                <td className="p-4 text-emerald-700 font-bold bg-emerald-50/50">Weekly proctored speed assessments & shortcut drills</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">Tech Stacks</td>
                <td className="p-4 text-slate-600">Outdated C/C++ static console programs</td>
                <td className="p-4 text-slate-800 font-semibold">MERN, Flutter, AI/ML, Cloud & DevOps basics</td>
                <td className="p-4 text-emerald-700 font-bold bg-emerald-50/50">Hands-on project tracks with Github deployment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Three Pillars of TheEduBootCamp</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 border-blue-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1. Live Interactive Streaming</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              45 hours of live classes conducted online with live chat, code walk-throughs, and real-time Q&A.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-teal-100">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">2. Recorded Lectures</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete session recordings provided for revision during exam periods and campus placement weeks.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-emerald-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">3. TheEduCode Platform Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Included FREE with every programming bootcamp—giving students full access to automated evaluations.
            </p>
          </Card>
        </div>
      </div>

      {/* Course Catalog Tracks */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <Badge variant="emerald">Bootcamp Tracks</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Specialized Learning Tracks</h2>
          </div>

          <div className="inline-flex p-1 bg-slate-200 rounded-full text-xs font-bold">
            <button
              onClick={() => setActiveTrack('track1')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTrack === 'track1' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              Track 1: DSA & Logic (₹2,199)
            </button>
            <button
              onClick={() => setActiveTrack('track2')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTrack === 'track2' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              Track 2: Emerging Tech (₹2,599)
            </button>
          </div>
        </div>

        {activeTrack === 'track1' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 border-blue-200 space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="blue">Core DSA</Badge>
                <span className="text-lg font-extrabold text-blue-700">₹2,199 / student</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">OOPS & Basic DSA (C++ / Java)</h3>
              <p className="text-sm text-slate-600">
                Foundational object-oriented programming concepts, memory layout, stacks, queues, linked lists, and recursion.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> C++ STL / Java Collections Framework</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Time & Space Complexity analysis</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> 20+ Autograder Problem Statements</li>
              </ul>
              <Button onClick={() => openDemoModal('TheEduBootCamp Track 1')} variant="primary" className="w-full">
                Enroll Batch for Track 1
              </Button>
            </Card>

            <Card className="p-8 border-indigo-200 space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="indigo">Advanced LeetCode</Badge>
                <span className="text-lg font-extrabold text-indigo-700">₹2,199 / student</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Job Ready DSA BootCamp with LeetCode</h3>
              <p className="text-sm text-slate-600">
                Targeted problem solving covering Trees, Graphs, Dynamic Programming, and Greedy algorithms in C++, Java, or Python.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> 100+ LeetCode Medium/Hard Patterns</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Company-specific past question drills</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Mock online screening tests</li>
              </ul>
              <Button onClick={() => openDemoModal('TheEduBootCamp Track 1')} variant="primary" className="w-full">
                Enroll Batch for Track 1
              </Button>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 border-teal-200 space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="teal">Web Dev</Badge>
                <span className="text-lg font-extrabold text-teal-700">₹2,599 / student</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Full-Stack MERN Development</h3>
              <p className="text-sm text-slate-600">
                MongoDB, Express.js, React.js, and Node.js with live project building and RESTful API deployment.
              </p>
              <Button onClick={() => openDemoModal('TheEduBootCamp Track 2')} variant="accent" className="w-full">
                Enroll Batch for Track 2
              </Button>
            </Card>

            <Card className="p-8 border-emerald-200 space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="emerald">Mobile & AI</Badge>
                <span className="text-lg font-extrabold text-emerald-700">₹2,599 / student</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Flutter, AI/ML & Cloud DevOps</h3>
              <p className="text-sm text-slate-600">
                Cross-platform mobile apps with Flutter, Python ML model integration, Docker, and AWS cloud deployment.
              </p>
              <Button onClick={() => openDemoModal('TheEduBootCamp Track 2')} variant="accent" className="w-full">
                Enroll Batch for Track 2
              </Button>
            </Card>
          </div>
        )}
      </div>

      {/* Engagement Parameters & Kickoff */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <Card className="p-6">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-bold text-slate-900">~55 Hours Total</h4>
          <p className="text-xs text-slate-600">45h live training + 10h doubt resolution + final coding viva.</p>
        </Card>
        <Card className="p-6">
          <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
          <h4 className="font-bold text-slate-900">40–60 Students / Batch</h4>
          <p className="text-xs text-slate-600">Optimal batch sizing for individual trainer attention.</p>
        </Card>
        <Card className="p-6">
          <Zap className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <h4 className="font-bold text-slate-900">9 Working Days Kickoff</h4>
          <p className="text-xs text-slate-600">Fast institutional onboarding and LMS setup timeline.</p>
        </Card>
      </div>
    </div>
  );
}
