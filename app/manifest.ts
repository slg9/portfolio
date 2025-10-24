import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sébastien Legros - Full-Stack Developer',
    short_name: 'Sébastien Legros',
    description: 'Portfolio of Sébastien Legros, full-stack developer specialized in React, TypeScript, Go and Node.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    lang: 'en',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
