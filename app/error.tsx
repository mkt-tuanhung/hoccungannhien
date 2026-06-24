"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi được bắt bởi error.tsx:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <h2 className="text-3xl font-black text-red-500 mb-4">Đã có lỗi xảy ra!</h2>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-6">
        {error.message || "Lỗi không xác định."}
      </p>
      <pre className="bg-white p-4 rounded-xl shadow-inner text-sm text-red-800 max-w-2xl overflow-auto text-left w-full border border-red-100">
        {error.stack}
      </pre>
      <button
        className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
        onClick={() => reset()}
      >
        Thử lại
      </button>
    </div>
  );
}
