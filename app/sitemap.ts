import { MetadataRoute } from 'next'
import { departmentsData } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sublimarte.sv'
  
  // Collections list
  const collections = ['anime', 'artistas', 'deportes']

  const departmentUrls = departmentsData.map((dept) => ({
    url: `${baseUrl}/camisetas-personalizadas/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const collectionUrls = collections.map((col) => ({
    url: `${baseUrl}/colecciones/${col}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...collectionUrls,
    ...departmentUrls,
  ]
}
