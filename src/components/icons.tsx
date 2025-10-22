import * as React from 'react';

export const Icons = {
  rocket: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 16.5l3 3m12-12l-12 12-3-3 12-12z" />
      <path d="M15 9l-6 6" />
      <path d="M9 15L4 20" />
      <path d="M18 3a3 3 0 013 3v0a3 3 0 01-3 3h-3l-6 6H6l-3 3" />
    </svg>
  ),
  play: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 4v16l13-8-13-8z" />
    </svg>
  ),
  phone: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.65A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.07.39 2.12.76 3.12a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c1 .37 2.05.63 3.12.76A2 2 0 0122 16.92z" />
    </svg>
  ),
};
