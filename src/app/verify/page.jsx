'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyIndexContent() {
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
      Redirecting to Official Verification System...
    </div>
  );
}

export default function VerifyIndexPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 text-sm">Loading...</div>}>
      <VerifyIndexContent />
    </Suspense>
  );
}
