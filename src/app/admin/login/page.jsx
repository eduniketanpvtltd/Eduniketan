'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@eduniketan.com');
  const [password, setPassword] = useState('eduniketan-admin-2026');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('eduniketan_admin_token', data.token);
        localStorage.setItem('eduniketan_admin_user', JSON.stringify(data.user));
        router.push('/admin');
      } else {
        setErrorMsg(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setErrorMsg('Error connecting to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 space-y-6 border-slate-200 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 text-white p-2.5 flex items-center justify-center">
            <Image
              src="/assets/Company Logo.png"
              alt="Eduniketan Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Eduniketan Admin Portal</h1>
          <p className="text-xs text-slate-500">Internal management dashboard for team leadership</p>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" disabled={loading} className="w-full gap-2">
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center pt-2 text-[11px] text-slate-400 border-t border-slate-100">
          Eduniketan Private Limited • Secure Back-Office
        </div>
      </Card>
    </div>
  );
}
