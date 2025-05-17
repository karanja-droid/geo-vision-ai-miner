
import '@types/jest';

declare global {
  // Extend jest global namespace if needed
  namespace jest {
    interface Matchers<R> {
      // Add custom matchers here if needed
    }
  }
}
