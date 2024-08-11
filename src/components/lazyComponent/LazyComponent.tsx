import Button from '@/components/button';
import Spinner from '@/components/spinner';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface LazyComponentProps {
  children: React.ReactNode;
}

const LazyComponent = ({ children }: LazyComponentProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default LazyComponent;

interface ErrorFallbackProps {
  error: { message: string };
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <Button type="button" text="Try Again" onClick={resetErrorBoundary} isLoading={false} />
    </div>
  );
};

const LoadingFallback = () => (
  <div className="flex flex-grow justify-center items-center min-h-screen w-full bg-main-primary">
    <Spinner />
  </div>
);
