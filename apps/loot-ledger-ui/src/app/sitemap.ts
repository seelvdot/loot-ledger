import { MetadataRoute } from 'next';

// Gera /sitemap.xml automaticamente — indexa apenas as páginas públicas
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://loot.stackevo.com.br';

  return [
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
