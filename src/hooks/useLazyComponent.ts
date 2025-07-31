import { useState, useEffect, useRef, ComponentType } from 'react';

interface UseLazyComponentOptions {
  preload?: boolean;
  delay?: number;
  fallback?: ComponentType;
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

interface LazyComponentState<T> {
  Component: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook for lazy loading components with advanced options
 */
export function useLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: UseLazyComponentOptions = {}
): LazyComponentState<T> {
  const {
    preload = false,
    delay = 0,
    fallback,
    onError,
    onLoad
  } = options;

  const [state, setState] = useState<LazyComponentState<T>>({
    Component: null,
    isLoading: false,
    error: null
  });

  const importPromiseRef = useRef<Promise<{ default: T }> | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadComponent = async () => {
    if (state.Component || state.isLoading) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Use cached promise if available
      if (!importPromiseRef.current) {
        importPromiseRef.current = importFn();
      }

      const module = await importPromiseRef.current;
      
      setState({
        Component: module.default,
        isLoading: false,
        error: null
      });

      onLoad?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to load component');
      
      setState({
        Component: fallback || null,
        isLoading: false,
        error: err
      });

      onError?.(err);
    }
  };

  // Preload component if requested
  useEffect(() => {
    if (preload) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(loadComponent, delay);
      } else {
        loadComponent();
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [preload, delay]);

  // Expose load function for manual triggering
  const load = () => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(loadComponent, delay);
    } else {
      loadComponent();
    }
  };

  return {
    ...state,
    load
  } as LazyComponentState<T> & { load: () => void };
}

/**
 * Hook for intersection-based lazy loading
 */
export function useIntersectionLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: UseLazyComponentOptions & {
    rootMargin?: string;
    threshold?: number;
  } = {}
) {
  const { rootMargin = '100px', threshold = 0.1, ...lazyOptions } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const lazyState = useLazyComponent(importFn, {
    ...lazyOptions,
    preload: isInView
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return {
    ...lazyState,
    ref: elementRef
  };
}

/**
 * Hook for route-based preloading
 */
export function useRoutePreloader() {
  const preloadedRoutes = useRef(new Set<string>());

  const preloadRoute = (routeImport: () => Promise<any>, routePath: string) => {
    if (preloadedRoutes.current.has(routePath)) return;

    preloadedRoutes.current.add(routePath);
    
    // Start loading but don't wait
    routeImport().catch(error => {
      console.warn(`Failed to preload route ${routePath}:`, error);
      preloadedRoutes.current.delete(routePath);
    });
  };

  const preloadRoutes = (routes: Array<{ import: () => Promise<any>; path: string }>) => {
    routes.forEach(({ import: routeImport, path }) => {
      preloadRoute(routeImport, path);
    });
  };

  return {
    preloadRoute,
    preloadRoutes,
    isPreloaded: (routePath: string) => preloadedRoutes.current.has(routePath)
  };
}

/**
 * Hook for component chunking and splitting
 */
export function useComponentChunking() {
  const loadedChunks = useRef(new Set<string>());

  const loadChunk = async (
    chunkName: string,
    importFn: () => Promise<any>
  ): Promise<any> => {
    if (loadedChunks.current.has(chunkName)) {
      return; // Already loaded
    }

    try {
      const module = await importFn();
      loadedChunks.current.add(chunkName);
      return module;
    } catch (error) {
      console.error(`Failed to load chunk ${chunkName}:`, error);
      throw error;
    }
  };

  const preloadChunk = (chunkName: string, importFn: () => Promise<any>) => {
    if (!loadedChunks.current.has(chunkName)) {
      loadChunk(chunkName, importFn).catch(() => {
        // Ignore preload errors
      });
    }
  };

  return {
    loadChunk,
    preloadChunk,
    isChunkLoaded: (chunkName: string) => loadedChunks.current.has(chunkName)
  };
}