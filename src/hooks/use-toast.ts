// Simple toast hook implementation
// This is a basic implementation that can be enhanced with a proper toast library

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export const useToast = () => {
  const toast = (options: ToastOptions) => {
    // Use native browser alert for now - can be replaced with a proper toast library
    const message = options.description
      ? `${options.title}\n${options.description}`
      : options.title;

    if (options.variant === 'destructive') {
      alert(`Error: ${message}`);
    } else if (options.variant === 'success') {
      alert(`Success: ${message}`);
    } else {
      alert(message);
    }

    // For better UX, consider replacing with a proper toast library like:
    // - react-hot-toast
    // - react-toastify
    // - sonner
  };

  return { toast };
};
