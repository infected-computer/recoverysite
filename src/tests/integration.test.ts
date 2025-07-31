/**
 * Integration tests for accessibility and UX enhancements
 */

import { runContentConsistencyCheck } from '../utils/contentConsistency';
import { runAllResponsiveTests } from './responsive.test';
import { auditImageAltText } from '../utils/imageAltAudit';
import { runPerformanceAudit } from '../utils/performanceOptimization';

// Integration test suite
export const runIntegrationTests = async () => {
  console.group('🧪 Integration Tests');
  
  const results = {
    accessibility: await testAccessibilityIntegration(),
    forms: await testFormIntegration(),
    navigation: await testNavigationIntegration(),
    responsive: await testResponsiveIntegration(),
    content: await testContentIntegration(),
    performance: await testPerformanceIntegration(),
    overall: true
  };

  // Calculate overall success
  results.overall = Object.values(results).every(result => 
    typeof result === 'boolean' ? result : result.success
  );

  if (results.overall) {
    console.log('✅ All integration tests passed');
  } else {
    console.error('❌ Some integration tests failed');
  }

  console.groupEnd();
  return results;
};

// Test accessibility integration
const testAccessibilityIntegration = async () => {
  console.log('Testing accessibility integration...');
  
  const issues: string[] = [];
  
  // Test color system integration
  const colorElements = document.querySelectorAll('[style*="color"], [class*="text-"], [class*="bg-"]');
  if (colorElements.length === 0) {
    issues.push('No color system elements found');
  }

  // Test ARIA integration
  const ariaElements = document.querySelectorAll('[aria-label], [aria-describedby], [role]');
  if (ariaElements.length < 5) {
    issues.push('Insufficient ARIA attributes found');
  }

  // Test focus management
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  let focusIssues = 0;
  focusableElements.forEach(element => {
    const style = window.getComputedStyle(element);
    if (style.outline === 'none' && !style.boxShadow.includes('focus')) {
      focusIssues++;
    }
  });

  if (focusIssues > focusableElements.length * 0.1) {
    issues.push(`${focusIssues} elements missing focus indicators`);
  }

  return {
    success: issues.length === 0,
    issues,
    elementsChecked: {
      color: colorElements.length,
      aria: ariaElements.length,
      focusable: focusableElements.length
    }
  };
};

// Test form integration
const testFormIntegration = async () => {
  console.log('Testing form integration...');
  
  const issues: string[] = [];
  const forms = document.querySelectorAll('form');

  forms.forEach((form, index) => {
    // Test label association
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach((input, inputIndex) => {
      const id = input.id;
      const label = form.querySelector(`label[for="${id}"]`);
      
      if (!label && !input.getAttribute('aria-label')) {
        issues.push(`Form ${index + 1}, Input ${inputIndex + 1} missing label`);
      }
    });

    // Test error handling
    const errorElements = form.querySelectorAll('[role="alert"], [aria-live]');
    if (errorElements.length === 0) {
      issues.push(`Form ${index + 1} missing error handling elements`);
    }

    // Test required field marking
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach((input, reqIndex) => {
      const hasRequiredIndicator = form.querySelector(`label[for="${input.id}"] *`) ||
                                   input.getAttribute('aria-required') === 'true';
      
      if (!hasRequiredIndicator) {
        issues.push(`Form ${index + 1}, Required input ${reqIndex + 1} not properly marked`);
      }
    });
  });

  return {
    success: issues.length === 0,
    issues,
    formsChecked: forms.length
  };
};

// Test navigation integration
const testNavigationIntegration = async () => {
  console.log('Testing navigation integration...');
  
  const issues: string[] = [];

  // Test main navigation
  const mainNav = document.querySelector('nav[role="navigation"], nav[aria-label*="ראשי"]');
  if (!mainNav) {
    issues.push('Main navigation not found');
  }

  // Test mobile menu
  const mobileMenuButton = document.querySelector('[aria-expanded], [aria-controls*="menu"]');
  if (!mobileMenuButton) {
    issues.push('Mobile menu button not found');
  }

  // Test skip links
  const skipLinks = document.querySelectorAll('a[href^="#"]');
  if (skipLinks.length === 0) {
    issues.push('No skip links found');
  }

  // Test breadcrumbs
  const breadcrumbs = document.querySelector('[aria-label*="breadcrumb"], .breadcrumb');
  // Breadcrumbs are optional, so just log if missing
  if (!breadcrumbs) {
    console.log('Note: No breadcrumbs found (optional)');
  }

  return {
    success: issues.length === 0,
    issues,
    navigationElements: {
      mainNav: !!mainNav,
      mobileMenu: !!mobileMenuButton,
      skipLinks: skipLinks.length,
      breadcrumbs: !!breadcrumbs
    }
  };
};

// Test responsive integration
const testResponsiveIntegration = async () => {
  console.log('Testing responsive integration...');
  
  const responsiveResults = runAllResponsiveTests();
  
  return {
    success: responsiveResults.overall,
    issues: [
      ...responsiveResults.responsive.forms.issues,
      ...responsiveResults.responsive.pricingCards.issues,
      ...responsiveResults.fonts.issues
    ],
    results: responsiveResults
  };
};

// Test content integration
const testContentIntegration = async () => {
  console.log('Testing content integration...');
  
  const contentResults = runContentConsistencyCheck();
  
  const allIssues = [
    ...contentResults.successRate.issues,
    ...contentResults.pricing.issues,
    ...contentResults.contact.issues,
    ...contentResults.styling.issues,
    ...contentResults.language.issues
  ];

  return {
    success: contentResults.overall,
    issues: allIssues,
    results: contentResults
  };
};

// Test performance integration
const testPerformanceIntegration = async () => {
  console.log('Testing performance integration...');
  
  const performanceResults = runPerformanceAudit();
  const issues: string[] = [];

  // Check performance thresholds
  if (performanceResults.overallScore < 80) {
    issues.push(`Performance score below threshold: ${performanceResults.overallScore}%`);
  }

  if (performanceResults.images && !performanceResults.images.optimized) {
    issues.push(`Image optimization issues: ${performanceResults.images.issues.length}`);
  }

  if (performanceResults.javascript && !performanceResults.javascript.optimized) {
    issues.push(`JavaScript optimization issues: ${performanceResults.javascript.blocking} blocking scripts`);
  }

  return {
    success: issues.length === 0,
    issues,
    score: performanceResults.overallScore,
    results: performanceResults
  };
};

// End-to-end workflow test
export const testEndToEndWorkflow = async () => {
  console.group('🔄 End-to-End Workflow Test');
  
  const workflows = [
    {
      name: 'Contact Form Submission',
      test: testContactFormWorkflow
    },
    {
      name: 'Mobile Navigation',
      test: testMobileNavigationWorkflow
    },
    {
      name: 'FAQ Interaction',
      test: testFAQWorkflow
    }
  ];

  const results = await Promise.all(
    workflows.map(async workflow => ({
      name: workflow.name,
      result: await workflow.test()
    }))
  );

  const allPassed = results.every(result => result.result.success);

  console.log('Workflow Test Results:');
  results.forEach(result => {
    console.log(`${result.result.success ? '✅' : '❌'} ${result.name}`);
    if (!result.result.success) {
      result.result.issues.forEach((issue: string) => console.log(`  - ${issue}`));
    }
  });

  console.groupEnd();
  return { success: allPassed, results };
};

// Test contact form workflow
const testContactFormWorkflow = async () => {
  const issues: string[] = [];
  
  // Find contact form
  const contactForm = document.querySelector('form');
  if (!contactForm) {
    issues.push('Contact form not found');
    return { success: false, issues };
  }

  // Test form fields
  const nameField = contactForm.querySelector('input[name="name"], input[id*="name"]');
  const phoneField = contactForm.querySelector('input[name="phone"], input[id*="phone"]');
  const messageField = contactForm.querySelector('textarea[name="message"], textarea[id*="message"]');

  if (!nameField) issues.push('Name field not found');
  if (!phoneField) issues.push('Phone field not found');
  if (!messageField) issues.push('Message field not found');

  // Test submit button
  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (!submitButton) {
    issues.push('Submit button not found');
  }

  return { success: issues.length === 0, issues };
};

// Test mobile navigation workflow
const testMobileNavigationWorkflow = async () => {
  const issues: string[] = [];
  
  // Find mobile menu button
  const menuButton = document.querySelector('[aria-expanded], button[aria-controls]');
  if (!menuButton) {
    issues.push('Mobile menu button not found');
    return { success: false, issues };
  }

  // Check ARIA attributes
  const hasAriaExpanded = menuButton.hasAttribute('aria-expanded');
  const hasAriaControls = menuButton.hasAttribute('aria-controls');

  if (!hasAriaExpanded) issues.push('Menu button missing aria-expanded');
  if (!hasAriaControls) issues.push('Menu button missing aria-controls');

  return { success: issues.length === 0, issues };
};

// Test FAQ workflow
const testFAQWorkflow = async () => {
  const issues: string[] = [];
  
  // Find FAQ section
  const faqSection = document.querySelector('[aria-labelledby*="faq"], .faq, [id*="faq"]');
  if (!faqSection) {
    issues.push('FAQ section not found');
    return { success: false, issues };
  }

  // Find FAQ items
  const faqButtons = faqSection.querySelectorAll('button[aria-expanded]');
  if (faqButtons.length === 0) {
    issues.push('No FAQ items found');
  }

  // Test first FAQ item structure
  if (faqButtons.length > 0) {
    const firstButton = faqButtons[0];
    const hasAriaControls = firstButton.hasAttribute('aria-controls');
    const hasAriaExpanded = firstButton.hasAttribute('aria-expanded');

    if (!hasAriaControls) issues.push('FAQ button missing aria-controls');
    if (!hasAriaExpanded) issues.push('FAQ button missing aria-expanded');
  }

  return { success: issues.length === 0, issues };
};

// Development helper to run all tests
export const runAllIntegrationTests = async () => {
  const integrationResults = await runIntegrationTests();
  const workflowResults = await testEndToEndWorkflow();

  const overallSuccess = integrationResults.overall && workflowResults.success;

  console.group('📋 Final Test Summary');
  console.log(`Integration Tests: ${integrationResults.overall ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Workflow Tests: ${workflowResults.success ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Overall Result: ${overallSuccess ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  console.groupEnd();

  return {
    integration: integrationResults,
    workflows: workflowResults,
    overall: overallSuccess
  };
};

// Export for development use
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).runIntegrationTests = runAllIntegrationTests;
}