/**
 * THE MUDDLED RENDERINGS PROJECT - Header
 * 
 * Minimal, editorial header establishing the artistic identity
 * without unrequested navigation or SaaS clichés.
 */

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header id="project-header" className="w-full max-w-6xl mx-auto pt-10 pb-6 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-[11px] font-mono tracking-widest uppercase text-white/40 mb-1.5 flex items-center gap-2">
            <span>OECD Economic Atlas</span>
            <span>•</span>
            <span>Experimental Generative Field</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight uppercase">
            The Muddled Renderings Project
          </h1>
        </div>

        <div className="max-w-md text-xs text-white/60 font-light leading-relaxed">
          <p>
            An experimental visual atlas of OECD economies. National statistics on digitalization, innovation, and living conditions are translated into physical mass, crystalline spires, and continuous living terrain.
          </p>
        </div>
      </div>
    </header>
  );
};
