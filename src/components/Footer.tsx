'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      // Store email in localStorage for now (can integrate with email service later)
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3">🚀 Promptpedia</h3>
            <p className="text-slate-400 text-sm">Professional prompt engineering platform. Discover, create, and monetize AI prompts.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/prompts" className="hover:text-white transition">Browse Prompts</Link></li>
              <li><Link href="/generate" className="hover:text-white transition">AI Optimizer</Link></li>
              <li><Link href="/submit" className="hover:text-white transition">Submit Prompt</Link></li>
              <li><Link href="/(marketing)/pricing" className="hover:text-white transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/blog" className="hover:text-white transition">Blog Guides</Link></li>
              <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
              <li><Link href="/tools" className="hover:text-white transition">Tools</Link></li>
              <li><Link href="/cheatsheet" className="hover:text-white transition">Cheatsheet</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-3">Get weekly prompts and AI tips</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-r text-sm font-medium transition disabled:opacity-50"
                >
                  {loading ? '...' : <Mail size={16} />}
                </button>
              </div>
              {subscribed && <p className="text-green-400 text-xs">✓ Thanks for subscribing!</p>}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2025 Promptpedia. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
              <a href="mailto:hello@promptpedia.com" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
