'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Download,
  Search,
  Building2,
  Globe,
  FileCheck,
  Share2,
  AlertCircle,
  RefreshCw,
  Award,
  XCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export function CertificatePreviewClient({ initialId = '' }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentId = searchParams.get('id') || initialId;

  const [idInput, setIdInput] = useState(currentId);
  const [activeId, setActiveId] = useState(currentId);
  const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'LOADING' | 'VERIFIED' | 'NOT_FOUND'
  const [errorMessage, setErrorMessage] = useState('');
  
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Verification check runner
  const verifyId = async (idToVerify) => {
    if (!idToVerify || !idToVerify.trim()) {
      setStatus('IDLE');
      return;
    }

    const cleanId = idToVerify.trim();
    setStatus('LOADING');
    setErrorMessage('');
    setIframeLoading(true);

    try {
      // Call server verification endpoint
      const res = await fetch(`/api/verify?id=${encodeURIComponent(cleanId)}`, {
        cache: 'no-store',
      });
      const data = await res.json();

      if (res.ok && data.valid) {
        setStatus('VERIFIED');
      } else {
        setStatus('NOT_FOUND');
        setErrorMessage(data.error || `No verified certificate found for ID: ${cleanId}`);
      }
    } catch (err) {
      setStatus('NOT_FOUND');
      setErrorMessage(`Failed to connect to verification repository for ID: ${cleanId}`);
    }
  };

  useEffect(() => {
    setIdInput(currentId);
    setActiveId(currentId);
    verifyId(currentId);
  }, [currentId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = idInput.trim();
    if (query) {
      setActiveId(query);
      router.push(`/verify/certificates/preview?id=${encodeURIComponent(query)}`);
      verifyId(query);
    }
  };

  const handleCopyId = () => {
    if (activeId) {
      navigator.clipboard.writeText(activeId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const certificateUrl = activeId
    ? `https://eduniketanpvtltd.github.io/Certificates/?id=${encodeURIComponent(activeId)}`
    : '';
  const pdfUrl = activeId
    ? `https://eduniketanpvtltd.github.io/Certificates/certificates/${encodeURIComponent(activeId)}.pdf`
    : '';

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="teal" className="px-4 py-1.5 text-xs tracking-wide uppercase">
          <ShieldCheck className="w-4 h-4 text-teal-600" /> Official Verification Portal
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Certificate <span className="gradient-text">Verification Engine</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Verify the authenticity of academic and training completion certificates issued by{' '}
          <strong className="text-slate-800">Eduniketan Private Limited</strong>.
        </p>
      </div>

      {/* Verification Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 bg-white p-2.5 rounded-2xl shadow-lg border border-slate-200">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. 4827-9154-3068-7735)"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
            />
          </div>
          <Button type="submit" variant="primary" className="shrink-0 px-6 py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
            {status === 'LOADING' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Verify Certificate
              </>
            )}
          </Button>
        </form>
      </div>

      {/* State: LOADING */}
      {status === 'LOADING' && (
        <Card className="p-12 text-center space-y-4 max-w-2xl mx-auto border-blue-200 bg-blue-50/30">
          <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Querying Official Certificate Registry...</h3>
            <p className="text-xs text-slate-500 font-mono">Certificate ID: {activeId}</p>
          </div>
        </Card>
      )}

      {/* State: NOT_FOUND (Invalid or Wrong Certificate ID) */}
      {status === 'NOT_FOUND' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <Card className="p-6 sm:p-8 bg-rose-50/80 border-2 border-rose-300 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <XCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wide">
                  Unverified / Invalid Certificate Record
                </div>
                <h2 className="text-2xl font-extrabold text-rose-950">
                  No Certificate Found
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <span className="text-xs text-rose-700 font-medium">Searched ID:</span>
                  <span className="font-mono text-sm font-bold text-rose-900 bg-rose-200/80 border border-rose-300 px-3 py-1 rounded-lg">
                    {activeId}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/90 rounded-xl border border-rose-200 text-xs sm:text-sm text-slate-700 space-y-3">
              <p className="leading-relaxed">
                {errorMessage || `No official certificate record matching ID "${activeId}" was found in the Eduniketan Private Limited verification repository.`}
              </p>
              
              <div className="pt-2 border-t border-rose-100 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-rose-600" /> Troubleshooting Tips:
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs pl-1">
                  <li>Check for typos or misplaced numbers/hyphens in the Certificate ID.</li>
                  <li>Ensure you entered the full Certificate ID as printed on your certificate.</li>
                  <li>Official certificates are verified exclusively on <strong className="text-slate-800">eduniketanpvtltd.com</strong>.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 font-medium">
                Official Issuer: <strong>Eduniketan Private Limited</strong>
              </span>
              <button
                onClick={() => {
                  setIdInput('');
                  setStatus('IDLE');
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" /> Try Another ID
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* State: VERIFIED (Valid Certificate Found) */}
      {status === 'VERIFIED' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Highlighted ID Banner & Verification Status */}
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border-blue-900/50 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Column: Highlighted ID & Badge */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  VERIFIED AUTHENTIC CERTIFICATE
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Certificate Identification Number
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-300 bg-slate-800/80 border border-amber-400/30 px-4 py-2 rounded-xl shadow-inner tracking-wider selection:bg-amber-300 selection:text-slate-900">
                      {activeId}
                    </div>
                    <button
                      onClick={handleCopyId}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:scale-105"
                      title="Copy Certificate ID"
                    >
                      {copiedId ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-300" /> Copy ID
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  This certificate has been officially verified by <strong className="text-white">Eduniketan Private Limited</strong>. The credentials and achievement record associated with ID <span className="font-mono text-amber-300">{activeId}</span> are valid and registered on our official verification system.
                </p>
              </div>

              {/* Right Column: Institutional Details */}
              <div className="lg:col-span-5 bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/60 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-700/60 flex items-center justify-between">
                  <span>Verification Credentials</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                      <Building2 className="w-4 h-4 text-blue-400" /> Verifying Body:
                    </span>
                    <span className="font-bold text-white text-right">Eduniketan Private Limited</span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                      <Globe className="w-4 h-4 text-teal-400" /> Official Domain:
                    </span>
                    <span className="font-bold text-teal-300 font-mono text-right">eduniketanpvtltd.com</span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                      <FileCheck className="w-4 h-4 text-amber-400" /> Storage Repository:
                    </span>
                    <span className="font-mono text-[11px] text-slate-300 text-right truncate max-w-[200px]" title="eduniketanpvtltd.github.io/Certificates">
                      eduniketanpvtltd.github.io
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2 px-3 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Link Copied!' : 'Share Verification'}
                  </button>
                  <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    title="Open Source Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Certificate Document Viewer Component */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Live Certificate Document Preview
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Full PDF
                </a>
                <a
                  href={pdfUrl}
                  download={`Certificate-${activeId}.pdf`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-900 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              </div>
            </div>

            {/* Embedded Container */}
            <div className="relative w-full min-h-[600px] sm:min-h-[750px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-300 gap-3 z-10">
                  <RefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
                  <p className="text-sm font-medium">Rendering PDF Certificate Document...</p>
                  <span className="text-xs font-mono text-slate-500">ID: {activeId}</span>
                </div>
              )}

              <iframe
                src={pdfUrl}
                title={`Certificate Preview - ${activeId}`}
                className="w-full h-full min-h-[600px] sm:min-h-[750px] border-0"
                onLoad={() => setIframeLoading(false)}
              />
            </div>
          </div>

          {/* Official Verification Disclaimer Box */}
          <Card className="p-6 bg-blue-50/50 border-blue-200 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              Official Verification Statement from Eduniketan Private Limited
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This verification endpoint explicitly confirms that the certificate bearing ID{' '}
              <strong className="font-mono text-slate-900">{activeId}</strong> is verified by{' '}
              <strong>Eduniketan Private Limited</strong>. All official verification links must originate from our official domain{' '}
              <a href="https://www.eduniketanpvtltd.com" className="font-bold text-blue-700 hover:underline">
                eduniketanpvtltd.com
              </a>{' '}
              and fetch records directly from our secure document server. If you suspect any fraudulent alteration, please contact us at{' '}
              <a href="mailto:hr.shreya@eduniketanpvtltd.com" className="font-bold text-blue-700 hover:underline">
                hr.shreya@eduniketanpvtltd.com
              </a>.
            </p>
          </Card>
        </div>
      )}

      {/* State: IDLE (No ID provided yet) */}
      {status === 'IDLE' && (
        <Card className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto border-dashed border-2 border-slate-300">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Enter Certificate ID to Begin</h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
              Please enter the unique Certificate ID provided on your physical or digital certificate issued by Eduniketan Private Limited.
            </p>
          </div>

          <div className="pt-2 text-xs text-slate-500 font-medium">
            Official Domain Verification: <span className="font-bold text-slate-800">eduniketanpvtltd.com</span>
          </div>
        </Card>
      )}
    </div>
  );
}
