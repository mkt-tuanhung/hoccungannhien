"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-8 bg-red-50 text-red-600 rounded-2xl w-full max-w-lg mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">Đã xảy ra lỗi hệ thống!</h2>
          <p className="font-mono text-sm mb-4">{this.state.error?.message}</p>
          <pre className="text-xs bg-white p-4 rounded overflow-auto max-h-64">
            {this.state.error?.stack}
          </pre>
          <button
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full font-bold"
            onClick={() => window.location.reload()}
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
