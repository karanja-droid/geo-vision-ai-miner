
import { handlePerformanceIssue } from "../performance/performanceHandlers";

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if ('PerformanceObserver' in window) {
    try {
      // Observe large layout shifts
      const layoutObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && (entry as any).value > 0.1) {
            handlePerformanceIssue('Large layout shift detected', 'layout', {
              value: (entry as any).value,
              url: window.location.href
            });
          }
        }
      });
      layoutObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // 50ms threshold for long tasks
            handlePerformanceIssue('Long task detected', 'task', {
              duration: entry.duration,
              url: window.location.href
            });
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      
      // More performance monitoring can be added here
      
    } catch (err) {
      console.error('Error setting up performance monitoring:', err);
    }
  }
}
