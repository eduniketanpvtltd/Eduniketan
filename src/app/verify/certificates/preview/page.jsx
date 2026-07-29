'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Award
} from 'lucide-react';

function CertificatePreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idParam = searchParams.get('id') || '';

  const [idInput, setIdInput] = useState(idParam);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    setIdInput(idParam);
    setIframeLoading(true);
    setIframeError(false);
  }, [idParam]);

  const certificateUrl = idParam
    ? `https://eduniketanpvtltd.github.io/Certificates/?id=${encodeURIComponent(idParam)}`
    : '';
  const pdfUrl = idParam
    ? `https://eduniketanpvtltd.github.io/Certificates/certificates/${encodeURIComponent(idParam)}.pdf`
    : '';

  const handleSearch = (e) => {
    e.preventDefault();
    if (idInput.trim()) {
      router.push(`/verify/certificates/preview?id=${encodeURIComponent(idInput.trim())}`);
    }
  };

  const handleCopyId = () => {
    if (idParam) {
      navigator.clipboard.writeText(idParam);
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

      {/* Verification Search Bar (If looking up or changing ID) */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 bg-white p-2.5 rounded-2xl shadow-lg border border-slate-200">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. EDU-2026-8901)"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
            />
          </div>
          <Button type="submit" variant="primary" className="shrink-0 px-6 py-2.5 text-sm font-semibold">
            Verify Certificate
          </Button>
        </form>
      </div>

      {/* If ID is present */}
      {idParam ? (
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
                      {idParam}
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
                  This certificate has been officially verified by <strong className="text-white">Eduniketan Private Limited</strong>. The credentials and achievement record associated with ID <span className="font-mono text-amber-300">{idParam}</span> are valid and registered on our official verification system.
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
                  <ExternalLink className="w-3.5 h-3.5" /> Open PDF
                </a>
                <a
                  href={pdfUrl}
                  download={`Certificate-${idParam}.pdf`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-900 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            </div>

            {/* Embedded Container */}
            <div className="relative w-full min-h-[600px] sm:min-h-[750px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-300 gap-3 z-10">
                  <RefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
                  <p className="text-sm font-medium">Fetching certificate record from repository...</p>
                  <span className="text-xs font-mono text-slate-500">ID: {idParam}</span>
                </div>
              )}

              <iframe
                src={pdfUrl}
                title={`Certificate Preview - ${idParam}`}
                className="w-full h-full min-h-[600px] sm:min-h-[750px] border-0"
                onLoad={() => setIframeLoading(false)}
                onError={() => {
                  setIframeLoading(false);
                  setIframeError(true);
                }}
              />

              {iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-200 p-6 text-center gap-4">
                  <AlertCircle className="w-12 h-12 text-amber-400" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">Document Viewer Fallback</h3>
                    <p className="text-xs text-slate-400 max-w-md">
                      If the embedded inline PDF browser preview is restricted by your browser, you can directly access or download the verified document from the link below.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                    >
                      Open GitHub Certificate URL
                    </a>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                    >
                      Open PDF Directly
                    </a>
                  </div>
                </div>
              )}
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
              <strong className="font-mono text-slate-900">{idParam}</strong> is verified by{' '}
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
      ) : (
        /* Empty State: Prompt user to enter Certificate ID */
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

export default function CertificatePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-blue-600" /> Loading Certificate Verification Portal...
        </div>
      }
    >
      <CertificatePreviewContent />
    </Suspense>
  );
}
