# Payment System Test Suite

This directory contains comprehensive tests for the hidden payment system.

## Test Structure

```
__tests__/
├── setup.ts                    # Test configuration and global mocks
├── __mocks__/                  # Mock files for assets and modules
├── utils/                      # Unit tests for utility functions
├── services/                   # Unit tests for service classes
├── components/                 # Unit tests for React components
├── integration/                # Integration tests for complete flows
├── e2e/                       # End-to-end tests (mock implementation)
└── README.md                  # This file
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test Types
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests only (mock implementation)
npm run test:e2e
```

## Test Categories

### Unit Tests
- **Utils Tests**: Validation, formatting, security utilities
- **Service Tests**: Payment processing, transaction logging, receipt generation
- **Component Tests**: Individual React components in isolation

### Integration Tests
- **Payment Flow**: Complete payment process from form to completion
- **Admin Flow**: Admin authentication and dashboard functionality
- **Security Integration**: Rate limiting, access control, error handling

### End-to-End Tests (Mock)
- **User Journeys**: Complete user flows through the payment system
- **Security Features**: HTTPS enforcement, security headers, rate limiting
- **Accessibility**: Keyboard navigation, ARIA labels, screen reader support
- **Performance**: Load times, Core Web Vitals

## Test Configuration

### Environment Variables
Tests use mock environment variables defined in `setup.ts`:
- `REACT_APP_LEMON_SQUEEZY_API_KEY`
- `REACT_APP_LEMON_SQUEEZY_STORE_ID`
- `REACT_APP_LEMON_SQUEEZY_ENVIRONMENT`
- `REACT_APP_HIDDEN_PAGE_ACCESS_TOKEN`

### Mocked Dependencies
- **localStorage/sessionStorage**: Mocked for transaction logging tests
- **fetch**: Mocked for API calls to Lemon Squeezy
- **window.location**: Mocked for redirect testing
- **crypto**: Mocked for secure random generation

## Coverage Targets

The test suite aims for:
- **70%** line coverage
- **70%** function coverage
- **70%** branch coverage
- **70%** statement coverage

## Key Test Scenarios

### Payment Form Validation
- ✅ Valid input acceptance
- ✅ Invalid amount rejection
- ✅ Email format validation
- ✅ Currency selection
- ✅ Input sanitization
- ✅ Error message display

### Payment Processing
- ✅ Successful payment flow
- ✅ API error handling
- ✅ Network error handling
- ✅ Payment data validation
- ✅ Transaction logging

### Security Features
- ✅ Access token validation
- ✅ Rate limiting
- ✅ Input sanitization
- ✅ HTTPS enforcement
- ✅ Security headers

### Admin Dashboard
- ✅ Authentication required
- ✅ Transaction display
- ✅ Filtering and search
- ✅ Export functionality
- ✅ Suspicious activity detection

### Error Handling
- ✅ Graceful error display
- ✅ Retry mechanisms
- ✅ User-friendly messages
- ✅ Error logging
- ✅ Recovery flows

## Mock Data

Tests use consistent mock data:

```typescript
const mockTransaction = {
  id: 'test-transaction-1',
  amount: 100,
  currency: 'USD',
  status: TransactionStatus.COMPLETED,
  createdAt: new Date(),
  customerInfo: {
    email: 'test@example.com',
    name: 'John Doe'
  }
};

const mockPaymentData = {
  amount: 100,
  currency: 'USD',
  customerEmail: 'test@example.com',
  customerName: 'John Doe'
};
```

## Best Practices

### Test Writing
1. **Arrange, Act, Assert**: Clear test structure
2. **Descriptive Names**: Test names explain what is being tested
3. **Single Responsibility**: Each test focuses on one behavior
4. **Mock External Dependencies**: Isolate units under test
5. **Clean Up**: Reset mocks and state between tests

### Component Testing
1. **User-Centric**: Test from user's perspective
2. **Accessibility**: Include accessibility testing
3. **Error States**: Test error conditions
4. **Loading States**: Test async behavior
5. **User Interactions**: Test form submissions, clicks, etc.

### Integration Testing
1. **Real Flows**: Test complete user journeys
2. **Error Scenarios**: Test failure paths
3. **State Management**: Test state changes across components
4. **API Integration**: Test service integration (with mocks)

## Debugging Tests

### Common Issues
1. **Async Operations**: Use `waitFor` for async behavior
2. **Mock Cleanup**: Ensure mocks are reset between tests
3. **DOM Queries**: Use appropriate queries (`getByRole`, `getByLabelText`)
4. **Timer Issues**: Use fake timers for time-dependent tests

### Debugging Commands
```bash
# Run specific test file
npm test -- PaymentForm.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should validate"

# Debug mode
npm test -- --detectOpenHandles --forceExit
```

## Continuous Integration

Tests are designed to run in CI environments:
- No external dependencies
- Deterministic results
- Fast execution
- Clear failure messages

## Future Improvements

1. **Visual Regression Testing**: Add screenshot comparison
2. **Real E2E Tests**: Implement with Playwright/Cypress
3. **Performance Testing**: Add performance benchmarks
4. **Mutation Testing**: Add mutation testing for test quality
5. **Contract Testing**: Add API contract tests