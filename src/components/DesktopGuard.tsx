/**
 * THE MUDDLED RENDERINGS PROJECT - Desktop Viewport Guard
 * 
 * Informs visitors on narrow mobile screens (<1024px) that the experimental
 * visual atlas is crafted specifically for wide desktop monitors.
 */

import React, { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

export const DesktopGuard: React.FC = () => {
  const [isNarrow, setIsNarrow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsNarrow(window.innerWidth < 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  if (!isNarrow || dismissed) return null;

  return (
    <div
      id="desktop-viewport-notice"
      className="fixed bottom-4 left-4 right-4 z-50 p-4 rounded-xl border border-amber-500/30 bg-[#0d0f18]/95 backdrop-blur-xl text-white shadow-2xl flex items-start justify-between gap-3 text-xs animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
          <Monitor size={16} />
        </div>
        <div>
          <h4 className="font-serif-display text-sm text-white font-medium">
            Designed for Desktop Viewports (1024px+)
          </h4>
          <p className="text-white/60 text-[11px] mt-0.5 leading-relaxed">
            The Muddled Renderings Project is an experimental spatial data artwork with 38 interconnected landscapes. For the intended visual immersion, please explore on a desktop or wide laptop display.
          </p>
        </div>
      </div>

      <button
        id="dismiss-narrow-viewport-button"
        onClick={() => setDismissed(true)}
        className="p-1 rounded text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss notice"
      >
        <X size={14} />
      </button>
    </div>
  );
};
