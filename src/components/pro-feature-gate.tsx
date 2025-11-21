'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProFeatureGateProps {
  children: ReactNode;
  isPro: boolean;
  featureName: string;
}

export function ProFeatureGate({ children, isPro, featureName }: ProFeatureGateProps) {
  if (isPro) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg mb-2">Pro Feature</h3>
          <p className="text-sm text-slate-600 mb-4">
            {featureName} is available on Pro and above plans.
          </p>
          <Link href="/pricing">
            <Button size="sm">Upgrade to Pro</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
