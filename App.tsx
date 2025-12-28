import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Hero } from './components/Hero';
import { WhaleHuntGame } from './components/WhaleHuntGame';
import { Lore } from './components/Lore';
import { Tokenomics } from './components/Tokenomics';
import { WhaleRadar } from './components/WhaleRadar';
import { WhaleOracle } from './components/WhaleOracle';
import { NAV_ITEMS } from './constants';
import { Anchor, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen selection:bg-green-500 selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 to-green-500 origin-left z-50 shadow-[0_0_20px_#22c55e]"
        style={{ scaleX }}
      />

      {/* Bubble Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
         {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-cyan-500/30 bg-cyan-500/10 animate-float"
                 style={{
                     left: `${Math.random() * 100}%`,
                     bottom: '-50px',
                     width: `${Math.random() * 50 + 20}px`,
                     height: `${Math.random() * 50 + 20}px`,
                     animationDuration: `${Math.random() * 10 + 10}s`,
                     animationDelay: `${Math.random() * 5}s`
                 }}
            />
         ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <Anchor className="text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-meme text-3xl tracking-wide text-white group-hover:text-cyan-400 transition-colors">$AHAB</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all uppercase tracking-wide"
              >
                {item.label}
              </button>
            ))}
             <button className="bg-green-500 hover:bg-green-400 text-black font-black text-sm px-4 py-2 rounded uppercase tracking-wider shadow-[0_0_10px_#22c55e] transition-all transform hover:scale-105">
                Buy Now
             </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
           {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-3xl font-meme font-bold text-slate-300 hover:text-green-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <WhaleHuntGame />
        <Lore />
        <Tokenomics />
        <WhaleRadar />
        <WhaleOracle />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-12 border-t border-slate-900 text-center">
        <h4 className="font-meme text-2xl text-slate-500 mb-4">$AHAB</h4>
        <div className="flex justify-center gap-4 text-slate-600 mb-8">
            <span className="hover:text-cyan-400 cursor-pointer">Twitter</span>
            <span className="hover:text-cyan-400 cursor-pointer">Telegram</span>
            <span className="hover:text-cyan-400 cursor-pointer">DexScreener</span>
        </div>
        <p className="text-xs text-slate-700 font-mono">
            DISCLAIMER: This is a meme coin. Captain Ahab is a fictional character. <br/>
            Don't spend money you can't afford to lose to a digital whale.
        </p>
      </footer>
    </div>
  );
};

export default App;
