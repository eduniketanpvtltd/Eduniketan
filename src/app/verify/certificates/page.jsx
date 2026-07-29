'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      router.replace(`/verify/certificates/preview?id=${encodeURIComponent(id)}`);
    } else {
      router.replace('/verify/certificates/preview');
    }
  }, [id, router]);

  return (
    <div className="py-20 text-center text-slate-500 text-sm">
      Redirecting to Certificate Verification Preview...
    </div>
  );
}

export default function VerifyCertificatesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 text-sm">Loading...</div>}>
      <RedirectContent />
    </Suspense>
  );
}
