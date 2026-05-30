import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/api/',
        '/*?sort=*',
        '/*?filter=*',
        '/*?cart=*',
        '/admin/',
      ],
    },
    sitemap: 'https://sublimarte.sv/sitemap.xml',
  }
}
