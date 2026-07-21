'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDemoModal } from '@/context/DemoModalContext';
import { ShieldCheck, Target, Heart, Award, Mail, UserCheck } from 'lucide-react';

function LinkedinIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

const founders = [
  {
    name: 'Souvik Gupta',
    role: 'Founder & Managing Director',
    bio: 'Visionary education technologist dedicated to modernizing university placement infrastructure. Souvik leads strategic partnerships, university alliances, and core product architecture.',
    linkedin: 'https://www.linkedin.com',
  },
  {
    name: 'Saif Siddique',
    role: 'Co-Founder & Chief Technology Officer',
    bio: 'Engineering leader specializing in high-concurrency autograder platforms, real-time analytics engines, and enterprise LMS integrations for large-scale campus examinations.',
    linkedin: 'https://www.linkedin.com',
  },
];

const cultureValues = [
  {
    title: 'Student-Centric Excellence',
    desc: 'Every assessment algorithm and live mentor drill is designed to build real problem-solving confidence in students.',
    icon: Target,
  },
  {
    title: 'Institutional Trust & Transparency',
    desc: 'We operate with 99.9%+ platform uptime and provide clear, unvarnished diagnostic scorecards to university leadership.',
    icon: ShieldCheck,
  },
  {
    title: 'Continuous Innovation',
    desc: 'Rapidly updating question banks and tech tracks to reflect actual hiring patterns of Fortune 500 & top tech firms.',
    icon: Award,
  },
];

export default function AboutPage() {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="blue">About Eduniketan</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Empowering Universities, <br className="hidden sm:inline" />
          <span className="gradient-text">Unlocking Student Potential</span>
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Eduniketan Private Limited is an educational technology organization building autograder software solutions, mentor mentorship programs, and placement enhancement models for higher education institutions.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-blue-200 bg-gradient-to-br from-blue-50/40 to-white space-y-4">
          <Badge variant="blue">Our Mission</Badge>
          <h2 className="text-2xl font-bold text-slate-900">Closing the Academic-Industry Gap</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To provide higher education institutions with automated, data-driven assessment engines and corporate mentorship, ensuring every student acquires the technical and soft skills required to crack competitive hiring rounds.
          </p>
        </Card>

        <Card className="p-8 border-teal-200 bg-gradient-to-br from-teal-50/40 to-white space-y-4">
          <Badge variant="teal">Our Vision</Badge>
          <h2 className="text-2xl font-bold text-slate-900">India&apos;s Trusted Campus PEP Partner</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To become the premier institutional partner for universities nationwide—recognized for field-tested reliability, zero-incident platform performance, and measurable placement outcome growth.
          </p>
        </Card>
      </div>

      {/* Founders Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="amber">Leadership</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Meet Our Founders</h2>
          <p className="text-slate-600 text-sm">
            Driven by a passion for technical education and institutional placement transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, idx) => (
            <Card key={idx} className="p-8 space-y-6 border-slate-200 hover:border-blue-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                  {founder.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{founder.name}</h3>
                  <div className="text-xs font-semibold text-teal-700 mt-0.5">{founder.role}</div>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{founder.bio}</p>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Eduniketan Private Limited</span>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-600" /> Connect on LinkedIn
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Culture Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="indigo">Core Principles</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Company Culture & Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cultureValues.map((v, i) => {
            const IconComp = v.icon;
            return (
              <Card key={i} className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-6">
        <Card className="p-8 gradient-bg-primary text-white space-y-4 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold">Ready to Partner with Eduniketan?</h3>
          <p className="text-slate-300 text-sm">
            Let us customize a Placement Enhancement Program tailored for your university students.
          </p>
          <Button onClick={() => openDemoModal()} variant="accent" size="lg">
            Schedule Institutional Meeting
          </Button>
        </Card>
      </div>
    </div>
  );
}
