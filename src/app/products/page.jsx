'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDemoModal } from '@/context/DemoModalContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Code2, Video, Rocket, Award, CheckCircle2, ArrowRight, Layers, ShieldCheck, Star, Download } from 'lucide-react';

export default function ProductsPage() {
  const { openDemoModal } = useDemoModal();
  const [activeTab, setActiveTab] = useState('all');

  const products = [
    {
      id: 'placement-mastery-program',
      category: 'programs',
      title: 'Placement Mastery Program',
      subtitle: 'Flagship Integrated PEP Solution',
      tagline: 'Comprehensive, semester-wise placement enhancement program bundling platform autograding (TheEduCode) with mentor-led live training (TheEduLive).',
      badge: 'Flagship Combo',
      badgeVariant: 'amber',
      icon: Award,
      href: '/products/placement-mastery-program',
      brochureUrl: '/brochures/Placement_Mastery_Program_Proposal.pdf',
      features: [
        'Tiered Options: Base, Silver, Gold, Platinum',
        'Semester-by-semester structured curriculum',
        'Includes both online autograder & live trainer sessions',
        'Custom institution branding & TPO dashboard',
      ],
      pricing: 'Per-Student Per-Semester Tiers',
    },
    {
      id: 'theedu-code',
      category: 'platforms',
      title: 'TheEduCode',
      subtitle: 'Autograder & Online Assessment Engine',
      tagline: 'Custom question-bank engine and coding autograder platform equipped with weekly tests, automated evaluation, live leaderboards, and institutional analytics.',
      badge: 'Software Platform',
      badgeVariant: 'blue',
      icon: Code2,
      href: '/products/theedu-code',
      brochureUrl: '/brochures/TheEduCode_Brochure.pdf',
      features: [
        'Aptitude, Reasoning, Verbal, DSA & Core CS Banks',
        'Instant test reports & automated solution analysis',
        'Branch-wise crash course practice modules',
        'Leaderboard & weakness diagnostic tools',
      ],
      pricing: 'Platform SaaS Subscription / Campus License',
    },
    {
      id: 'theedu-live',
      category: 'platforms',
      title: 'TheEduLive',
      subtitle: 'Mentor-Led Interactive Live Mentorship',
      tagline: 'Live interactive classes delivered by experienced corporate mentors, covering Group Discussions, Mock Interviews, Resume & LinkedIn optimization, and Soft Skills.',
      badge: 'Live Mentorship',
      badgeVariant: 'teal',
      icon: Video,
      href: '/products/theedu-live',
      brochureUrl: '/brochures/TheEduLive_Brochure.pdf',
      features: [
        'Dedicated mentors with active SDE credentials',
        '1-on-1 & Group Mock Interview panels',
        'Public Speaking & Body Language workshops',
        'GD Techniques & HR preparation drills',
      ],
      pricing: 'Per-Batch / Per-Student Workshop Model',
    },
    {
      id: 'theedu-bootcamp',
      category: 'programs',
      title: 'TheEduBootCamp',
      subtitle: 'Placement Enhancement Program (PEP)',
      tagline: 'High-energy, focused placement enhancement bootcamp explicitly closing the gap between university syllabus and online hiring tests. Deployed at LPU.',
      badge: 'Proven PEP Deployment',
      badgeVariant: 'emerald',
      icon: Rocket,
      href: '/products/theedu-bootcamp',
      brochureUrl: '/brochures/TheEduBootCamp_Brochure.pdf',
      features: [
        'Deployed at LPU with 99.9% platform uptime',
        'Track 1: OOPS & DSA BootCamp with LeetCode (₹2,199)',
        'Track 2: Emerging Tech - MERN, AI/ML, DevOps (₹2,599)',
        '45 hrs core live training + 10 hrs doubt clearing',
      ],
      pricing: '₹2,199 – ₹2,599 Per Student',
    },
  ];

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="blue">Product Catalog</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Empowering Institutions with <span className="gradient-text">Next-Gen Placement Tools</span>
        </h1>
        <p className="text-slate-600 text-lg">
          Choose from our autograder software platforms or full-service placement enhancement programs designed for university excellence.
        </p>

        {/* Tab Filters */}
        <div className="inline-flex p-1.5 bg-slate-200/70 rounded-full text-sm font-semibold mt-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'all' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Offerings ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('platforms')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'platforms' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Software Platforms (2)
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'programs' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Integrated Programs (2)
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProducts.map((p) => {
          const IconComponent = p.icon;
          return (
            <Card key={p.id} className="flex flex-col justify-between p-8 border-slate-200/90 hover:border-blue-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <Badge variant={p.badgeVariant}>{p.badge}</Badge>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{p.title}</h2>
                  <div className="text-xs font-semibold text-teal-700 mt-1 uppercase tracking-wider">
                    {p.subtitle}
                  </div>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">{p.tagline}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Highlights</div>
                  <ul className="space-y-2">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Model</div>
                  <div className="text-xs font-bold text-slate-800">{p.pricing}</div>
                </div>

                <div className="flex items-center gap-2">
                  {p.brochureUrl && (
                    <a href={p.brochureUrl} target="_blank" rel="noopener noreferrer" title="View Proposal PDF">
                      <Button variant="outline" size="sm" className="gap-1 text-teal-700 hover:bg-teal-50 border-teal-200">
                        <Download className="w-3.5 h-3.5" /> Proposal
                      </Button>
                    </a>
                  )}
                  <Link href={p.href}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                  <Button onClick={() => openDemoModal(p.title)} variant="primary" size="sm">
                    Request Demo
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Institutional Tier Overview Table */}
      <div className="pt-10 space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="teal">Model Comparison</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Program Tiers & Packaging</h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Flexible collaboration options designed to fit university semester budgets and PEP requirements.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-md bg-white">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4 font-bold">Feature / Deliverable</th>
                <th className="p-4 font-bold text-teal-300">Base Tier</th>
                <th className="p-4 font-bold text-blue-300">Silver Tier</th>
                <th className="p-4 font-bold text-amber-300">Gold Tier</th>
                <th className="p-4 font-bold text-emerald-300">Platinum Flagship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">TheEduCode Autograder Access</td>
                <td className="p-4">Basic Question Bank</td>
                <td className="p-4">Full Question Bank</td>
                <td className="p-4">Full + Company Papers</td>
                <td className="p-4 font-semibold text-teal-700">Unlimited + Custom Papers</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">Weekly Assessment Tests</td>
                <td className="p-4">Bi-Weekly</td>
                <td className="p-4">Weekly</td>
                <td className="p-4">Weekly + Leaderboard</td>
                <td className="p-4 font-semibold text-teal-700">Weekly + Proctored Drills</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">TheEduLive Mentor Sessions</td>
                <td className="p-4">—</td>
                <td className="p-4">20 Hours / Semester</td>
                <td className="p-4">35 Hours / Semester</td>
                <td className="p-4 font-semibold text-teal-700">45+ Hours Live Mentorship</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">GD & Mock Interview Drills</td>
                <td className="p-4">—</td>
                <td className="p-4">Group Format</td>
                <td className="p-4">Group + 1-on-1 Sample</td>
                <td className="p-4 font-semibold text-teal-700">1-on-1 Individual Mock Panels</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">TPO Analytics Dashboard</td>
                <td className="p-4">Basic Export</td>
                <td className="p-4">Standard Dashboard</td>
                <td className="p-4">Advanced Analytics</td>
                <td className="p-4 font-semibold text-teal-700">Dedicated University Suite</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
