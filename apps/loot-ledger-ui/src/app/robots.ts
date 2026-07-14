import { MetadataRoute } from 'next';

// Gera /robots.txt automaticamente — protege as rotas autenticadas de crawlers
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://loot.stackevo.com.br';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/login', '/'],
        disallow: ['/ledger/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
