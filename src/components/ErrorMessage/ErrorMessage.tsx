import { AxiosError } from 'axios';

interface useErrorMessageProps {
  error: unknown;
}

const handleErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const { response } = error;

    if (response) {
      if (typeof response.data === 'object' && response.data !== null) {
        const messages = Object.entries(response.data)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');

        return messages || 'An error occurred';
      }

      // Fallback for known error structure
      return response.data?.error || 'An error occurred';
    }
  }

  // Default return value for other error types
  return 'An unknown error occurred';
};

const ErrorMessage = ({ error }: useErrorMessageProps) => {
  if (!error) return null;
  return <p className="text-danger-main">{handleErrorMessage(error)}</p>;
};

export default ErrorMessage;
