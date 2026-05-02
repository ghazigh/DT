// landing_page/src/lib/seo.ts
export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

export const DEFAULT_SEO: Required<Omit<SeoProps, 'canonical'>> = {
  title: 'Sat Lab — Digital twins for critical infrastructure',
  description:
    'Sat Lab builds AI-powered digital twins of the world\'s critical infrastructure — starting with the power grid. Satellite, AI, and 3D twins that predict vegetation-caused outages before they happen.',
  image: '/og-image.png',
  type: 'website'
};

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sat Lab',
  description: DEFAULT_SEO.description,
  url: 'https://satlab.io',
  logo: 'https://satlab.io/og-image.png'
};
