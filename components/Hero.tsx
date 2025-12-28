import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const yText = useTransform(scrollY, [0, 300], [0, 150]);

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-slate-950 to-black z-0" />
      
      {/* Floating Green Candles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-500 w-2 md:w-4 rounded-sm shadow-[0_0_15px_#22c55e]"
            style={{
              left: `${Math.random() * 100}%`,
              top: '110%',
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: [0, -1200],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 text-center px-4 flex flex-col items-center max-w-5xl mx-auto"
      >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mb-8 bg-cyan-950/50 border border-cyan-500 px-6 py-2 rounded-full backdrop-blur-md"
        >
            <span className="text-cyan-400 font-mono text-sm md:text-base uppercase tracking-[0.2em] font-bold">
               Mission: Kill The White Whale
            </span>
        </motion.div>

        {/* Logo Adjustment: Better sizing and spacing */}
        <div className="relative mb-6">
           <h1 className="font-meme text-9xl md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-cyan-600 via-cyan-200 to-white drop-shadow-[0_0_40px_rgba(6,182,212,0.6)] select-none">
             $AHAB
           </h1>
           {/* Glitch/Shadow Layer */}
           <h1 className="absolute inset-0 font-meme text-9xl md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-tighter text-cyan-500/20 blur-sm translate-x-2 translate-y-2 -z-10 select-none">
             $AHAB
           </h1>
        </div>
        
        <p className="max-w-2xl mt-4 text-xl md:text-3xl font-display font-bold text-slate-300 drop-shadow-md leading-relaxed">
          The Captain's Obsession. <br/>
          <span className="text-green-400">Harpooning the Green God Candle</span> till the end of time.
        </p>
        
        <div className="mt-12 flex flex-col md:flex-row gap-6">
            <button 
                onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-green-500 hover:bg-green-400 text-black font-black font-meme text-2xl px-10 py-4 rounded-xl border-b-[6px] border-green-700 active:border-b-0 active:translate-y-1 transition-all shadow-[0_0_30px_#22c55e] overflow-hidden"
            >
                <span className="relative z-10">JOIN THE HUNT</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button 
                onClick={() => window.open('https://pump.fun', '_blank')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold font-display text-xl px-10 py-4 rounded-xl border-b-[6px] border-slate-950 active:border-b-0 active:translate-y-1 transition-all"
            >
                BUY BAGS
            </button>
        </div>
      </motion.div>

      {/* Foreground Waves */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute bottom-[-20px] left-0 w-full z-30 pointer-events-none"
      >
         <svg className="w-full h-32 md:h-64" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#020617" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
      </motion.div>
    </div>
  );
};
