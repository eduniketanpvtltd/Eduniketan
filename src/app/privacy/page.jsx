'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function PrivacyPage() {
  return (
    <div className="space-y-8 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Badge variant="slate">Legal & Policy</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: July 2026 • Eduniketan Private Limited</p>
      </div>

      <Card className="p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Eduniketan Private Limited collects institutional contact information (name, official university email, phone number, institution name) provided during demo requests, partnership enquiries, and platform onboarding.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Student & Campus Data</h2>
          <p>
            Assessment data generated on <span className="font-semibold text-blue-700">TheEduCode</span> autograder platform is strictly used for evaluating student code correctness, generating diagnostic performance scorecards, and delivering TPO placement insights to authorized campus administrators.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Data Security & Storage</h2>
          <p>
            We implement enterprise-grade encryption and proctoring security measures. We do not sell or rent institutional or student personal information to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Contact Us</h2>
          <p>
            If you have questions regarding data privacy, contact our legal desk at <a href="mailto:contact@eduniketan.com" className="text-blue-700 font-semibold underline">contact@eduniketan.com</a>.
          </p>
        </section>
      </Card>
    </div>
  );
}
