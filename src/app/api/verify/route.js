import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || !id.trim()) {
    return NextResponse.json(
      { valid: false, error: 'Certificate ID is required.' },
      { status: 400 }
    );
  }

  const cleanId = id.trim();
  const pdfUrl = `https://eduniketanpvtltd.github.io/Certificates/certificates/${encodeURIComponent(cleanId)}.pdf`;

  try {
    const res = await fetch(pdfUrl, {
      method: 'HEAD',
      cache: 'no-store',
    });

    if (res.ok && res.status === 200) {
      return NextResponse.json({
        valid: true,
        id: cleanId,
        pdfUrl,
        githubUrl: `https://eduniketanpvtltd.github.io/Certificates/?id=${encodeURIComponent(cleanId)}`,
      });
    }

    return NextResponse.json(
      {
        valid: false,
        id: cleanId,
        error: `No verified certificate record found for ID: ${cleanId}`,
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        valid: false,
        id: cleanId,
        error: 'Unable to reach certificate verification repository.',
      },
      { status: 500 }
    );
  }
}
