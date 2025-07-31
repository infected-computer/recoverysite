import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/lib/utils';
import InfoBox from './InfoBox';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className 
}) => {
  // Process Hebrew content for better display
  const processHebrewContent = (text: string) => {
    return text
      // Convert Hebrew bullet points
      .replace(/^[\s]*[-*+]\s+/gm, '• ')
      // Convert Hebrew numbered lists
      .replace(/^[\s]*(\d+)[\.\)]\s+/gm, '$1. ')
      // Handle Hebrew emphasis markers
      .replace(/\*\*(.*?)\*\*/g, '**$1**')
      // Handle Hebrew checkmarks and X marks
      .replace(/✅/g, '✅')
      .replace(/❌/g, '❌')
      .replace(/⚠️/g, '⚠️')
      .replace(/🚨/g, '🚨')
      .replace(/🔧/g, '🔧')
      .replace(/💾/g, '💾');
  };

  const processedContent = processHebrewContent(content);

  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom heading components with Hebrew support
          h1: ({ children, ...props }) => (
            <h1 
              className="text-4xl font-bold mb-6 text-text-dark-redesign border-b-2 border-primary-redesign pb-3"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 
              className="text-3xl font-semibold mb-5 mt-8 text-text-dark-redesign"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 
              className="text-2xl font-semibold mb-4 mt-6 text-text-dark-redesign"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 
              className="text-xl font-semibold mb-3 mt-5 text-text-dark-redesign"
              {...props}
            >
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 
              className="text-lg font-semibold mb-3 mt-4 text-text-dark-redesign"
              {...props}
            >
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 
              className="text-base font-semibold mb-2 mt-3 text-text-dark-redesign"
              {...props}
            >
              {children}
            </h6>
          ),
          
          // Paragraph with proper spacing
          p: ({ children, ...props }) => (
            <p 
              className="mb-4 leading-relaxed text-text-muted-redesign text-lg"
              {...props}
            >
              {children}
            </p>
          ),
          
          // Lists with Hebrew support
          ul: ({ children, ...props }) => (
            <ul 
              className="mb-4 mr-6 space-y-2 list-disc"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol 
              className="mb-4 mr-6 space-y-2 list-decimal"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li 
              className="text-text-muted-redesign leading-relaxed"
              {...props}
            >
              {children}
            </li>
          ),
          
          // Blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote 
              className="border-r-4 border-primary-redesign bg-gray-50 pr-4 py-3 mb-4 italic"
              {...props}
            >
              {children}
            </blockquote>
          ),
          
          // Code blocks
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code 
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Tables with Hebrew support
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-6 rounded-lg shadow-sm border border-gray-200">
              <table 
                className="min-w-full border-collapse bg-white"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-50" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-gray-200" {...props}>
              {children}
            </tbody>
          ),
          th: ({ children, ...props }) => (
            <th 
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td 
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
              {...props}
            >
              {children}
            </td>
          ),
          
          // Links
          a: ({ children, href, ...props }) => (
            <a 
              href={href}
              className="text-primary-redesign hover:text-primary-dark-redesign underline transition-colors duration-200"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          
          // Images
          img: ({ src, alt, ...props }) => (
            <img 
              src={src}
              alt={alt || 'תמונה במאמר - תוכן רלוונטי לנושא השחזור נתונים'}
              className="max-w-full h-auto rounded-lg shadow-md mb-4 mx-auto"
              loading="lazy"
              {...props}
            />
          ),
          
          // Horizontal rule
          hr: ({ ...props }) => (
            <hr 
              className="my-8 border-t-2 border-gray-200"
              {...props}
            />
          ),
          
          // Strong/Bold text
          strong: ({ children, ...props }) => (
            <strong 
              className="font-bold text-text-dark-redesign"
              {...props}
            >
              {children}
            </strong>
          ),
          
          // Emphasis/Italic text
          em: ({ children, ...props }) => (
            <em 
              className="italic text-text-muted-redesign"
              {...props}
            >
              {children}
            </em>
          ),
          
          // Custom components for special formatting
          div: ({ className, children, ...props }) => {
            // Handle special div classes for Hebrew content
            if (className?.includes('warning') || className?.includes('אזהרה')) {
              return (
                <InfoBox type="warning">
                  {children}
                </InfoBox>
              );
            }
            
            if (className?.includes('success') || className?.includes('הצלחה')) {
              return (
                <InfoBox type="success">
                  {children}
                </InfoBox>
              );
            }
            
            if (className?.includes('error') || className?.includes('שגיאה')) {
              return (
                <InfoBox type="error">
                  {children}
                </InfoBox>
              );
            }
            
            if (className?.includes('info') || className?.includes('מידע')) {
              return (
                <InfoBox type="info">
                  {children}
                </InfoBox>
              );
            }
            
            return (
              <div className={className} {...props}>
                {children}
              </div>
            );
          }
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;