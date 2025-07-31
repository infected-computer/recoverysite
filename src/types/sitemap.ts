// Sitemap types and interfaces

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
  images?: Array<{
    loc: string;
    caption?: string;
    title?: string;
    license?: string;
  }>;
  videos?: Array<{
    thumbnail_loc: string;
    title: string;
    description: string;
    content_loc?: string;
    player_loc?: string;
    duration?: number;
    publication_date?: string;
  }>;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultChangefreq: SitemapUrl['changefreq'];
  defaultPriority: number;
  excludePatterns: string[];
  includeImages: boolean;
  includeVideos: boolean;
  maxUrls: number;
  compress: boolean;
}

export interface RouteConfig {
  path: string;
  priority?: number;
  changefreq?: SitemapUrl['changefreq'];
  lastmod?: string;
  dynamic?: boolean;
  generator?: () => Promise<SitemapUrl[]>;
}

export interface SitemapIndex {
  sitemaps: Array<{
    loc: string;
    lastmod?: string;
  }>;
}

export type SitemapType = 'main' | 'images' | 'videos' | 'news' | 'mobile';