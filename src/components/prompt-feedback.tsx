'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

interface PromptFeedbackProps {
  promptId: string;
  onFeedback?: (feedback: 'helpful' | 'not-helpful' | 'comment') => void;
}

export function PromptFeedback({ promptId, onFeedback }: PromptFeedbackProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    setFeedback(type);
    onFeedback?.(type);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onFeedback?.('comment');
      setComment('');
      setShowComment(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className="border-t border-slate-200 pt-6 mt-6">
      <p className="text-sm font-semibold text-slate-900 mb-3">Was this prompt helpful?</p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleFeedback('helpful')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            feedback === 'helpful'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium">Yes</span>
        </button>

        <button
          onClick={() => handleFeedback('not-helpful')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            feedback === 'not-helpful'
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm font-medium">No</span>
        </button>

        <button
          onClick={() => setShowComment(!showComment)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Feedback</span>
        </button>

        {submitted && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-600 font-medium">
            ✓ Thank you!
          </motion.span>
        )}
      </div>

      {showComment && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-50 rounded-lg">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us how we can improve this prompt..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            rows={3}
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCommentSubmit}
              disabled={!comment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
            >
              Send Feedback
            </button>
            <button
              onClick={() => setShowComment(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
