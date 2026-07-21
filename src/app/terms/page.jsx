'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function TermsPage() {
  return (
    <div className="space-y-8 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Badge variant="slate">Legal & Governance</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last updated: July 2026 • Eduniketan Private Limited</p>
      </div>

      <Card className="p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing Eduniketan Private Limited platforms (including <span className="font-semibold text-blue-700">TheEduCode</span>, <span className="font-semibold text-teal-700">TheEduLive</span>, and <span className="font-semibold text-emerald-700">TheEduBootCamp</span>), university partners, administrators, and enrolled students agree to comply with these terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Intellectual Property Rights</h2>
          <p>
            All course curricula, assessment question banks, autograder compilers, and training video recordings remain the exclusive intellectual property of Eduniketan Private Limited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Platform Use & Academic Integrity</h2>
          <p>
            Students taking proctored examinations on TheEduCode must adhere to university academic integrity standards. Attempting to tamper with automated evaluation code cases is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Institutional MoUs</h2>
          <p>
            Commercial deliverables, batch sizes, and semester timelines are governed by formal Memorandum of Understanding (MoU) agreements signed between Eduniketan Private Limited and partner institutions.
          </p>
        </section>
      </Card>
    </div>
  );
}
