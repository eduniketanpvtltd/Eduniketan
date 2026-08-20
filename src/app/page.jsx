'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDemoModal } from '@/context/DemoModalContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { Marquee } from '@/components/ui/Marquee';
import { LiveFeedbackTicker } from '@/components/ui/LiveFeedbackTicker';
import { FeedbackWidget } from '@/components/ui/FeedbackWidget';
import {
  Code2,
  Video,
  Rocket,
  Award,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Zap,
  GraduationCap,
  Sparkles,
  Star
} from 'lucide-react';

const productsList = [
  {
    id: 'placement-mastery-program',
    title: 'Placement Mastery Program',
    badge: 'Flagship Combo',
    badgeColor: 'amber',
    tagline: 'The ultimate semester-wise integrated Placement Enhancement Program combining platform autograding & mentor live delivery.',
    features: ['Semester-wise Base/Silver/Gold/Platinum tiers', 'Full access to TheEduCode + TheEduLive', 'Custom tailored for university NAAC & placement goals'],
    link: '/products/placement-mastery-program',
    icon: Award,
    logoImg: '/assets/Company Logo.png',
  },
  {
    id: 'theedu-code',
    title: 'TheEduCode Platform',
    badge: 'Autograder Tech',
    badgeColor: 'blue',
    tagline: 'Automated problem-solving & code autograder platform with instant test reports and real-time student performance analytics.',
    features: ['Weekly question-format online assessments', 'Branch-wise crash course question banks', 'Live leaderboard & institutional dashboards'],
    link: '/products/theedu-code',
    icon: Code2,
    logoImg: '/assets/TheEduCode Logo.png',
  },
  {
    id: 'theedu-live',
    title: 'TheEduLive Mentorship',
    badge: 'Live Mentorship',
    badgeColor: 'teal',
    tagline: 'Mentor-led live sessions focused on Soft Skills, GD Techniques, Personal Interviews, and Corporate Communication.',
    features: ['1-on-1 Mock Interviews & GD Panels', 'Resume & LinkedIn Optimization Bootcamps', 'Active SDE & corporate mentor panel'],
    link: '/products/theedu-live',
    icon: Video,
    logoImg: '/assets/TheEduLive Logo.png',
  },
  {
    id: 'theedu-bootcamp',
    title: 'TheEduBootCamp',
    badge: 'Proven Deployment',
    badgeColor: 'emerald',
    tagline: 'High-impact placement enhancement bootcamp, successfully deployed at Lovely Professional University (LPU).',
    features: ['Track 1: Job-Ready DSA & LeetCode (₹2,199)', 'Track 2: MERN, AI/ML, Flutter, DevOps (₹2,599)', '99.9% Uptime & 91/100 Faculty NPS'],
    link: '/products/theedu-bootcamp',
    icon: Rocket,
    logoImg: '/assets/Company Logo.png',
  },
];

const whyUsTiles = [
  {
    icon: TrendingUp,
    title: 'Impact at Scale',
    desc: 'Empowering thousands of students across campuses with structured assessment engines and enterprise-grade learning modules.',
  },
  {
    icon: Zap,
    title: 'Placement-Focused Curriculum',
    desc: 'Designed around top tech hiring trends—bridging university syllabus with real corporate online screening patterns.',
  },
  {
    icon: Users,
    title: 'Dedicated Industry Mentors',
    desc: 'Trainers with active SDE and domain experience delivering live interactive sessions and personalized feedback.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Campus Analytics',
    desc: 'Deep-dive institutional dashboards allowing TPOs and HODs to track student progress, weak topics, and test participation.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Incident Platform Stability',
    desc: 'Field-tested infrastructure with 99.9%+ uptime during massive simultaneous online university examinations.',
  },
];

export default function HomePage() {
  const { openDemoModal } = useDemoModal();
  const [stats, setStats] = useState({
    students: 15000,
    campuses: 25,
    uptime: 99,
    nps: 91,
  });

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const map = {};
          data.data.forEach((s) => (map[s.key] = s.value));
          setStats((prev) => ({ ...prev, ...map }));
        }
      })
      .catch((err) => console.error('Error fetching stats:', err));
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* Floating Real-Time Feedback Widget */}
      <FeedbackWidget />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center hero-mesh pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold shadow-xs animate-pulse-subtle">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Transforming Higher Education & Campus Placement Ecosystems</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Bridging the Gap Between <br className="hidden sm:inline" />
            <span className="gradient-text">Academic Syllabus & Corporate Hiring</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Eduniketan provides automated assessment platforms (<span className="font-semibold text-blue-700">TheEduCode</span>), mentor-led training (<span className="font-semibold text-teal-700">TheEduLive</span>), and comprehensive placement enhancement bootcamps for colleges and universities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => openDemoModal('Placement Mastery Program')}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto text-base gap-2 group shadow-xl"
            >
              Request Institutional Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                Explore All Offerings
              </Button>
            </Link>
          </div>

          {/* Quick Trust Highlights */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-xs border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">Deployed at LPU</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-xs border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">99.9% Platform Uptime</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-xs border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">91/100 Faculty NPS</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-xs border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">Active SDE Mentors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Partner Strip */}
      <section className="space-y-4">
        <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Trusted by Top Universities & Campus Networks
        </div>
        <Marquee />
      </section>

      {/* Product Overview Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="blue">Core Offerings</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Integrated Platforms & High-Impact Programs
          </h2>
          <p className="text-slate-600 text-base">
            From autograding software platforms to campus-wide placement mastery bootcamps, explore our specialized solutions tailored for institutional success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productsList.map((product) => {
            const IconComponent = product.icon;
            return (
              <Card key={product.id} className="relative flex flex-col justify-between p-8 border-slate-200/90 group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center p-2 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Image
                        src={product.logoImg}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="object-contain max-h-10"
                      />
                    </div>
                    <Badge variant={product.badgeColor}>{product.badge}</Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">{product.tagline}</p>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={product.link}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 group/link"
                  >
                    Learn Details <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  <Button
                    onClick={() => openDemoModal(product.title)}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Request Proposal
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Why Eduniketan Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-500/30">
              Why Eduniketan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for Institutional Growth & Placement Excellence
            </h2>
            <p className="text-slate-400 text-base">
              Why leading TPOs and Vice-Chancellors trust Eduniketan as their official Placement Enhancement Program partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsTiles.map((tile, idx) => {
              const IconComp = tile.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/50 transition-all duration-300 space-y-4 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{tile.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{tile.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter Section (Dynamic from DB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCounter end={stats.students} suffix="+" label="Students Onboarded" icon={Users} />
          <StatsCounter end={stats.campuses} suffix="+" label="Campus Partners" icon={GraduationCap} />
          <StatsCounter end={stats.uptime} suffix=".9%" label="Platform Uptime" icon={ShieldCheck} />
          <StatsCounter end={stats.nps} suffix="/100" label="Faculty NPS Score" icon={Award} />
        </div>
      </section>

      {/* Live Feedback Stream Section (Fetched directly from DB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="teal">Real-Time Reviews</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">What Students & TPO Leaders Say</h2>
        </div>

        <LiveFeedbackTicker />
      </section>

      {/* Recruitment Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden gradient-bg-primary rounded-3xl shadow-2xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-teal-400/15 blur-3xl" />
          </div>
          <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8 sm:p-12">
            <div className="flex-1 text-white text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Now Hiring — Recruitment Open
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                Join the{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">Eduniketan</span>{' '}
                Ecosystem
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg mb-6">
                We're building India's most impactful campus placement technology. Explore open positions, internships, and campus drives — apply directly on our platform.
              </p>
              <Link
                href="/recruitment"
                className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-200 text-sm"
              >
                <GraduationCap className="w-4 h-4" />
                View All Openings
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[{e:'🚀',l:'High-Impact Work'},{e:'🎓',l:'Learning Culture'},{e:'🤝',l:'Remote Friendly'}].map((p) => (
                  <div key={p.l} className="text-center">
                    <div className="text-2xl mb-1">{p.e}</div>
                    <div className="text-white/80 text-xs font-semibold">{p.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full max-w-xs lg:max-w-sm animate-float">
              <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="20" y="60" width="170" height="100" rx="14" fill="white" opacity="0.12" />
                <rect x="35" y="78" width="90" height="8" rx="4" fill="white" opacity="0.5" />
                <rect x="35" y="93" width="65" height="6" rx="3" fill="white" opacity="0.3" />
                <rect x="35" y="110" width="120" height="24" rx="12" fill="white" opacity="0.2" />
                <rect x="48" y="117" width="80" height="10" rx="5" fill="white" opacity="0.4" />
                <rect x="210" y="40" width="170" height="120" rx="14" fill="white" opacity="0.1" />
                <rect x="226" y="58" width="70" height="7" rx="3.5" fill="white" opacity="0.4" />
                <rect x="226" y="72" width="100" height="6" rx="3" fill="white" opacity="0.25" />
                <rect x="226" y="88" width="138" height="3" rx="1.5" fill="white" opacity="0.15" />
                <rect x="226" y="88" width="90" height="3" rx="1.5" fill="rgba(52,211,153,0.8)" />
                <rect x="226" y="98" width="138" height="3" rx="1.5" fill="white" opacity="0.15" />
                <rect x="226" y="98" width="110" height="3" rx="1.5" fill="rgba(96,165,250,0.8)" />
                <rect x="226" y="108" width="138" height="3" rx="1.5" fill="white" opacity="0.15" />
                <rect x="226" y="108" width="60" height="3" rx="1.5" fill="rgba(251,191,36,0.8)" />
                <rect x="80" y="185" width="240" height="110" rx="16" fill="white" opacity="0.14" />
                <circle cx="155" cy="225" r="20" fill="rgba(52,211,153,0.25)" />
                <path d="M146 225 L152 231 L164 218" stroke="rgba(52,211,153,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="185" y="213" width="115" height="8" rx="4" fill="white" opacity="0.5" />
                <rect x="185" y="228" width="85" height="6" rx="3" fill="white" opacity="0.3" />
                <rect x="185" y="242" width="105" height="6" rx="3" fill="white" opacity="0.2" />
                <rect x="95" y="266" width="210" height="18" rx="9" fill="rgba(255,255,255,0.2)" />
                <rect x="140" y="271" width="120" height="8" rx="4" fill="white" opacity="0.5" />
                <circle cx="55" cy="30" r="18" fill="rgba(255,255,255,0.1)" />
                <text x="46" y="36" fontSize="14" fill="white" opacity="0.8">🎓</text>
                <circle cx="355" cy="200" r="16" fill="rgba(255,255,255,0.1)" />
                <text x="346" y="206" fontSize="12" fill="white" opacity="0.8">🚀</text>
                <circle cx="20" cy="200" r="14" fill="rgba(255,255,255,0.08)" />
                <text x="12" y="206" fontSize="12" fill="white" opacity="0.7">⭐</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-bg-primary rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <span className="inline-block px-3 py-1 bg-white/10 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20">
            Empower Your Institution Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold max-w-3xl mx-auto leading-tight">
            Ready to Boost Your Campus Placement Stats?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Schedule a personalized demo for your TPO team or request a customized program proposal for the upcoming semester.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button onClick={() => openDemoModal()} size="lg" variant="accent" className="w-full sm:w-auto text-base">
              Book Live Demo Now
            </Button>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="white" className="w-full sm:w-auto text-base">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
