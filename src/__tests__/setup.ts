import '@testing-library/jest-dom';

// Mock environment variables
process.env.REACT_APP_LEMON_SQUEEZY_API_KEY = 'test-api-key';
process.env.REACT_APP_LEMON_SQUEEZY_STORE_ID = 'test-store-id';
process.env.REACT_APP_LEMON_SQUEEZY_ENVIRONMENT = 'sandbox';
process.env.REACT_APP_HIDDEN_PAGE_ACCESS_TOKEN = 'test-access-token';

// Mock import.meta.env for tests
const mockImportMetaEnv = {
  VITE_LEMON_SQUEEZY_API_KEY: 'test-api-key',
  VITE_LEMON_SQUEEZY_STORE_ID: 'test-store-id',
  VITE_LEMON_SQUEEZY_ENVIRONMENT: 'sandbox',
  VITE_LEMON_SQUEEZY_WEBHOOK_SECRET: 'test-webhook-secret',
  VITE_HIDDEN_PAGE_ACCESS_TOKEN: 'test-access-token',
  DEV: true,
};

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: mockImportMetaEnv,
    },
  },
  writable: true,
});

// Mock window.location (temporarily commented out due to JSDOM limitations)
/*
const mockLocation = {
  _href: 'http://localhost:3000',
  _origin: 'http://localhost:3000',
  _pathname: '/',
  _search: '',
  _hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

Object.defineProperty(window, 'location', {
  configurable: true,
  get: () => ({
    href: mockLocation._href,
    origin: mockLocation._origin,
    pathname: mockLocation._pathname,
    search: mockLocation._search,
    hash: mockLocation._hash,
    assign: mockLocation.assign,
    replace: mockLocation.replace,
    reload: mockLocation.reload,
  }),
  set: (value) => {
    mockLocation._href = value.href || mockLocation._href;
    mockLocation._origin = value.origin || mockLocation._origin;
    mockLocation._pathname = value.pathname || mockLocation._pathname;
    mockLocation._search = value.search || mockLocation._search;
    mockLocation._hash = value.hash || mockLocation._hash;
  },
});
*/

// Mock console methods to reduce noise in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps') ||
       args[0].includes('componentWillUpdate'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback, options) => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn(() => []), // Add takeRecords method
    root: null,
    rootMargin: '',
    thresholds: [],
  };
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock crypto for secure random generation
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
    randomUUID: () => 'test-uuid-' + Math.random().toString(36).substr(2, 9),
  },
});

// Mock fetch globally
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
  sessionStorageMock.getItem.mockReturnValue(null);
  (global.fetch as jest.Mock).mockClear();
});

// Mock timers for tests that need them
jest.useFakeTimers();

// Clean up after each test
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.useFakeTimers();
});