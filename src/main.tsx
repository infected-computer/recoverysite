import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { initializeFontOptimization } from './utils/fontOptimization'
import { initializeMediaOptimization } from './utils/mediaOptimization'

// Initialize optimizations immediately
initializeFontOptimization();
initializeMediaOptimization();

// Register Service Worker for performance optimization
if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content is available, show update notification
                                if (confirm('גרסה חדשה זמינה. האם לרענן את הדף?')) {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                });
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
if (import.meta.env.PROD) {
    // Monitor basic performance metrics
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    });
}

createRoot(document.getElementById("root")!).render(<App />);
