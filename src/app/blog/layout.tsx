import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Guides | Promptpedia',
  description: 'Learn prompt engineering best practices, techniques, and strategies from our comprehensive guides.',
  openGraph: {
    title: 'Blog & Guides | Promptpedia',
    description: 'Master prompt engineering with our in-depth guides and tutorials',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
