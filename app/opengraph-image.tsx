import { ImageResponse } from 'next/og'

export const alt = 'glotfiles: one file, every format'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social preview card. Generated at build time rather than shipped as a static
 * PNG so it stays in sync with the brand marks in app/icon.svg.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          padding: '72px',
        }}
      >
        {/* Brand row: the two-files mark, redrawn with plain divs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', position: 'relative', width: '64px', height: '64px' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '40px',
                height: '52px',
                borderRadius: '8px',
                background: '#FF5C35',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '22px',
                top: '12px',
                width: '40px',
                height: '52px',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '4px solid #0A0A0A',
              }}
            />
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            glotfiles
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            One file that is
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 82,
              fontWeight: 700,
              color: '#FF5C35',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            every file
          </div>
          <div style={{ marginTop: '28px', fontSize: 30, color: '#A1A1AA', lineHeight: 1.35 }}>
            Fuse a PDF, image, video, ZIP or HTML into a single set of bytes
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px' }}>
          {['PDF', 'IMAGE', 'VIDEO', 'ZIP', 'HTML'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: '9px',
                border: '2px solid #27272A',
                color: '#A1A1AA',
                fontSize: 22,
                letterSpacing: '0.06em',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
