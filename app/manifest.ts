import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sébastien Legros - Développeur Full-Stack',
    short_name: 'Sébastien Legros',
    description: 'Portfolio de Sébastien Legros, développeur full-stack spécialisé en React, TypeScript, Go et Node.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
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
