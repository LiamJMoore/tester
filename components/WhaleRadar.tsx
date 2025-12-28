import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

// Mock signals
const SIGNALS = [
  { id: 1, x: 20, y: 30, size: 40, label: 'MEGA CHAD', type: 'chad' },
  { id: 2, x: 70, y: 60, size: 20, label: 'Paper Hand', type: 'jeet' },
  { id: 3, x: 40, y: 80, size: 30, label: 'Whale 0x...99', type: 'whale' },
];

export const WhaleRadar: React.FC = () => {
  return (
    <section id={SectionId.RADAR} className="py-24 bg-black relative overflow-hidden flex flex-col items-center">
      
      <h2 className="text-5xl md:text-7xl font-meme text-center mb-12 relative z-10 text-white">
        JEET <span className="text-green-500">RADAR</span>
      </h2>

      <div className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] rounded-full bg-slate-950 border-4 border-slate-800 shadow-[0_0_100px_rgba(34,197,94,0.1)] overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0" 
             style={{ 
                 backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 opacity: 0.2
             }} 
        />
        
        {/* Radar Rings */}
        {[1, 2, 3].map(i => (
            <div key={i} className="absolute inset-0 rounded-full border border-green-900/50" style={{ margin: `${i * 15}%` }} />
        ))}
        
        {/* Scan Line */}
        <div 
          className="absolute w-full h-1/2 bg-gradient-to-b from-transparent to-green-500/30 border-b-2 border-green-400 origin-bottom shadow-[0_0_20px_#22c55e]"
          style={{ 
            top: '50%',
            left: 0,
            transformOrigin: 'top center',
            animation: 'radar-spin 3s linear infinite',
          }}
        />

        {/* Blips */}
        {SIGNALS.map((signal) => (
          <motion.div
            key={signal.id}
            className={`absolute flex flex-col items-center justify-center`}
            style={{ 
              left: `${signal.x}%`, 
              top: `${signal.y}%`, 
              width: signal.size, 
              height: signal.size 
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}
          >
             <div className={`w-full h-full rounded-full ${
                 signal.type === 'jeet' ? 'bg-red-500 shadow-[0_0_20px_#ef4444]' : 
                 signal.type === 'chad' ? 'bg-cyan-400 shadow-[0_0_20px_#22d3ee]' : 'bg-green-500 shadow-[0_0_20px_#22c55e]'
             }`} />
             
             <div className={`absolute -top-8 bg-black/80 px-2 py-1 rounded text-xs font-bold whitespace-nowrap border ${
                 signal.type === 'jeet' ? 'text-red-400 border-red-500' : 'text-green-400 border-green-500'
             }`}>
               {signal.label}
             </div>
          </motion.div>
        ))}
      </div>
      
      <p className="mt-8 text-slate-500 font-mono text-center max-w-md mx-auto px-4">
        Scanning the mempool for weak hands to liquidate. Stay strong, sailor.
      </p>

      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(0deg) translateY(-100%); }
          to { transform: rotate(360deg) translateY(-100%); }
        }
      `}</style>
    </section>
  );
};
