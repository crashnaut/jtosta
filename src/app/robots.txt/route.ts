import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://jtosta.com' 

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
