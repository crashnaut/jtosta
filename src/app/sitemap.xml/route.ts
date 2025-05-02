import { MetadataRoute } from 'next'

// TODO: Fetch dynamic routes (like blog posts) in a real application
// const blogPosts = await fetch('...').then((res) => res.json())

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jstosta.com' // Replace with actual domain later

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
       url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ] as MetadataRoute.Sitemap

  // TODO: Add dynamic routes (blog posts) here
  // const dynamicBlogRoutes = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.id}`,
  //   lastModified: post.updatedAt, // Assuming posts have an update timestamp
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }))

  return [
    ...staticRoutes,
    // ...dynamicBlogRoutes,
  ]
}
