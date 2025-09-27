import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon32() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'system-ui',
        }}
      >
        SL
      </div>
    ),
    {
      ...size,
    }
  )
}
