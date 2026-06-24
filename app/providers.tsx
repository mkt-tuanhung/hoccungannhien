"use client";

import { AuthProvider } from "@/lib/auth";
import { ChildProvider } from "@/lib/child-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChildProvider>
        {children}
      </ChildProvider>
    </AuthProvider>
  );
}
