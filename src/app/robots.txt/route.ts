import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://jstosta.com' // Replace with actual domain later

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow specific paths if needed, e.g., admin areas
      // disallow: '/admin/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
