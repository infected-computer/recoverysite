import { useState } from 'react';
import { useSitemap, useSitemapSubmission } from '../hooks/useSitemap';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download } from 'lucide-react';
import { RefreshCw } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { Globe } from 'lucide-react';
import { Image } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { BarChart3 } from 'lucide-react';

interface SitemapManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SitemapManager = ({ isOpen, onClose }: SitemapManagerProps) => {
  const {
    urls,
    isLoading,
    error,
    lastGenerated,
    generateSitemap,
    downloadSitemap,
    validateSitemap,
    getSitemapStats
  } = useSitemap();

  const { submissions, submitToGoogle, submitToBing } = useSitemapSubmission();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !import.meta.env.DEV) {
    return null;
  }

  const validation = validateSitemap();
  const stats = getSitemapStats();

  const handleSubmitToSearchEngines = () => {
    const sitemapUrl = `${window.location.origin}/sitemap.xml`;
    submitToGoogle(sitemapUrl);
    submitToBing(sitemapUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Sitemap Manager
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardHeader>

        <CardContent className="overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="urls">URLs</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{stats.totalUrls}</div>
                    <div className="text-sm text-muted-foreground">Total URLs</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.withImages}</div>
                    <div className="text-sm text-muted-foreground">With Images</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {validation.isValid ? '✓' : '✗'}
                    </div>
                    <div className="text-sm text-muted-foreground">Valid</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {lastGenerated ? new Date(lastGenerated).toLocaleTimeString() : 'Never'}
                    </div>
                    <div className="text-sm text-muted-foreground">Last Generated</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={generateSitemap}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Regenerate
                </Button>

                <Button
                  onClick={() => downloadSitemap('main')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Main
                </Button>

                <Button
                  onClick={() => downloadSitemap('images')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Image className="h-4 w-4" />
                  Download Images
                </Button>

                <Button
                  onClick={() => downloadSitemap('mobile')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  Download Mobile
                </Button>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="urls" className="space-y-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {urls.map((url, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-mono text-sm">{url.loc}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {url.changefreq || 'monthly'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Priority: {url.priority?.toFixed(1) || '0.5'}
                          </Badge>
                          {url.images && url.images.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {url.images.length} images
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(url.loc, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="validation" className="space-y-4">
              <div className="flex items-center gap-2">
                {validation.isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">
                  {validation.isValid ? 'Sitemap is valid' : 'Sitemap has issues'}
                </span>
              </div>

              {validation.issues.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Issues found:</h4>
                  {validation.issues.map((issue, index) => (
                    <div key={index} className="bg-destructive/10 border border-destructive/20 rounded p-2">
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">By Priority</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {Object.entries(stats.byPriority).map(([priority, count]) => (
                      <div key={priority} className="flex justify-between text-sm">
                        <span>{priority}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">By Change Frequency</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {Object.entries(stats.byChangefreq).map(([freq, count]) => (
                      <div key={freq} className="flex justify-between text-sm">
                        <span>{freq}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="submission" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Submit to Search Engines</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit your sitemap to search engines for faster indexing.
                  </p>
                  
                  <Button onClick={handleSubmitToSearchEngines} className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Submit to Google & Bing
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Submission Status</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span>Google Search Console</span>
                      <Badge variant={submissions.google?.status === 'submitted' ? 'default' : 'secondary'}>
                        {submissions.google?.status || 'Not submitted'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span>Bing Webmaster Tools</span>
                      <Badge variant={submissions.bing?.status === 'submitted' ? 'default' : 'secondary'}>
                        {submissions.bing?.status || 'Not submitted'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Quick Links</h4>
                  <div className="space-y-1 text-sm">
                    <a 
                      href={`${window.location.origin}/sitemap.xml`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary hover:underline"
                    >
                      View Main Sitemap
                    </a>
                    <a 
                      href={`${window.location.origin}/sitemap-index.xml`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary hover:underline"
                    >
                      View Sitemap Index
                    </a>
                    <a 
                      href={`${window.location.origin}/robots.txt`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary hover:underline"
                    >
                      View Robots.txt
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SitemapManager;