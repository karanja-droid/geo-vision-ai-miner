
// Mock global objects and setup test environment
global.fetch = jest.fn();
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0
};

// Mock window properties
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
    hostname: 'localhost',
    search: '',
    hash: ''
  },
  writable: true
});

// Mock console methods
console.error = jest.fn();
console.warn = jest.fn();
