import { Suspense } from 'react';
import { CertificatePreviewClient } from './CertificatePreviewClient';

export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.id || '';

  const title = id
    ? `Verified Certificate (${id}) — Eduniketan Private Limited`
    : 'Official Certificate Verification Engine — Eduniketan Private Limited';

  const description = id
    ? `Official Certificate Verification for ID: ${id}. Issued and authenticated by Eduniketan Private Limited on eduniketanpvtltd.com.`
    : 'Verify authentic academic and training completion certificates issued by Eduniketan Private Limited.';

  const ogImageUrl = id
    ? `https://www.eduniketanpvtltd.com/api/og/certificate?id=${encodeURIComponent(id)}`
    : 'https://www.eduniketanpvtltd.com/api/og/certificate';

  const pageUrl = id
    ? `https://www.eduniketanpvtltd.com/verify/certificates/preview?id=${encodeURIComponent(id)}`
    : 'https://www.eduniketanpvtltd.com/verify/certificates/preview';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Eduniketan Private Limited',
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: id ? `Certificate Verification Preview for ID ${id}` : 'Certificate Verification System',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function CertificatePreviewPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.id || '';

  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 text-sm">Loading Verification System...</div>}>
      <CertificatePreviewClient initialId={id} />
    </Suspense>
  );
}
