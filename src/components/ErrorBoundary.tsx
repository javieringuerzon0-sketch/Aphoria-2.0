import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-aphoria-bg flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-4xl font-brand font-light text-aphoria-black mb-4">Something went wrong.</h2>
                    <p className="text-aphoria-mid mb-8 max-w-md">
                        The clinical synthesis encountered an unexpected error. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-aphoria-black text-white rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-aphoria-gold transition-colors"
                    >
                        Refine & Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
