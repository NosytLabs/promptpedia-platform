'use client';

import { useState } from 'react';
import { Share2, Copy, Check, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SharePromptButtonProps {
  promptId: string;
  title: string;
  description?: string;
}

export function SharePromptButton({ promptId, title, description }: SharePromptButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${baseUrl}/prompts/${promptId}`;
  const shareText = `Check out "${title}" on Promptpedia - a curated prompt engineering platform.`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      'twitter-share',
      'width=550,height=420'
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      'linkedin-share',
      'width=750,height=600'
    );
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-50 p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-2">
            {/* Copy Link */}
            <button
              onClick={copyLink}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-left text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span className="flex-1">{copied ? 'Copied!' : 'Copy link'}</span>
            </button>

            {/* Twitter Share */}
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-left text-sm"
            >
              <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
              <span>Share on Twitter</span>
            </button>

            {/* LinkedIn Share */}
            <button
              onClick={shareToLinkedIn}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-left text-sm"
            >
              <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>Share on LinkedIn</span>
            </button>

            {/* Email Share */}
            <button
              onClick={shareViaEmail}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-left text-sm"
            >
              <Mail className="w-4 h-4 text-slate-600" />
              <span>Share via email</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
