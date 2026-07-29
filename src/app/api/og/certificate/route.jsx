import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || 'VERIFIED-CERTIFICATE';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0f172a',
            backgroundImage:
              'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.35) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(13, 148, 136, 0.25) 0%, transparent 50%)',
            padding: '48px 56px',
            fontFamily: 'sans-serif',
            boxSizing: 'border-box',
            border: '12px solid #1e3a8a',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '2px',
                }}
              >
                EDUNIKETAN
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#2dd4bf',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  marginTop: -4,
                }}
              >
                Private Limited
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '1.5px solid rgba(52, 211, 153, 0.5)',
                borderRadius: '9999px',
                padding: '8px 20px',
                color: '#34d399',
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '1px',
              }}
            >
              ✓ VERIFIED AUTHENTIC CERTIFICATE
            </div>
          </div>

          {/* Main Body Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              margin: '20px 0',
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#94a3b8',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Official Certificate Identification Number
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1e293b',
                border: '2px solid #fbbf24',
                borderRadius: '16px',
                padding: '16px 40px',
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.2)',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 44,
                  fontWeight: 900,
                  color: '#fef08a',
                  letterSpacing: '4px',
                }}
              >
                {id}
              </span>
            </div>

            <p
              style={{
                fontSize: 18,
                color: '#cbd5e1',
                marginTop: 24,
                maxWidth: 800,
                lineHeight: 1.5,
              }}
            >
              This academic & training credential is authenticated and registered on the official verification network of{' '}
              <strong style={{ color: '#ffffff' }}>Eduniketan Private Limited</strong>.
            </p>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: 20,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>
                Verified Domain:
              </span>
              <span style={{ fontSize: 16, color: '#38bdf8', fontWeight: 800 }}>
                eduniketanpvtltd.com
              </span>
            </div>

            <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
              Eduniketan Institutional Placement & Assessment Ecosystem
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the OG image`, {
      status: 500,
    });
  }
}
