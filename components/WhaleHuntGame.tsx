import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId } from '../types';
import confetti from 'canvas-confetti';
import { Trophy } from 'lucide-react';

interface Harpoon {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export const WhaleHuntGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [whalePos, setWhalePos] = useState({ top: '50%', left: '50%' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hits, setHits] = useState<{id: number, x: number, y: number, val: string}[]>([]);
  const [harpoons, setHarpoons] = useState<Harpoon[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const moveWhale = () => {
    if (!gameAreaRef.current) return;
    const x = Math.random() * 80 + 10; // keep within 10-90%
    const y = Math.random() * 80 + 10;
    setWhalePos({ top: `${y}%`, left: `${x}%` });
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setHits([]);
    setHarpoons([]);
    moveWhale();
  };

  const handleWhaleClick = (e: React.MouseEvent) => {
    if (!isPlaying) return;
    
    // Add score
    const points = Math.floor(Math.random() * 100) + 50;
    setScore(prev => prev + points);

    // Visual feedback (Score + Harpoon)
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotation = Math.random() * 60 - 30; // Random angle
        
        // Add hit text
        const newHit = { id: Date.now(), x, y, val: `+${points}` };
        setHits(prev => [...prev, newHit]);
        setTimeout(() => setHits(prev => prev.filter(h => h.id !== newHit.id)), 1000);

        // Add harpoon graphic
        const newHarpoon = { id: Date.now() + Math.random(), x, y, rotation };
        setHarpoons(prev => [...prev, newHarpoon]);
        // Remove harpoon after a short while so screen doesn't get cluttered, or keep them?
        // Let's keep them for a bit then fade out
        setTimeout(() => setHarpoons(prev => prev.filter(h => h.id !== newHarpoon.id)), 2000);
    }

    // Move whale
    moveWhale();

    // Confetti burst on every 5th hit
    if (Math.random() > 0.7) {
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ['#22d3ee', '#4ade80', '#ffffff']
        });
    }
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [isPlaying, timeLeft]);

  return (
    <section id={SectionId.GAME} className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-meme text-5xl md:text-6xl text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          HARPOON THE WHALE
        </h2>
        <p className="text-slate-400 font-mono mb-8">Click the beast to farm $AHAB before time runs out!</p>

        <div className="relative w-full aspect-video bg-slate-950 rounded-3xl border-4 border-cyan-800 overflow-hidden shadow-2xl cursor-crosshair select-none" ref={gameAreaRef}>
           {/* HUD */}
           <div className="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none">
              <div className="bg-slate-900/80 backdrop-blur border border-green-500 text-green-400 px-4 py-2 rounded-lg font-mono font-bold text-xl flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                 <Trophy size={20} /> {score} $AHAB
              </div>
              <div className="bg-slate-900/80 backdrop-blur border border-red-500 text-red-400 px-4 py-2 rounded-lg font-mono font-bold text-xl shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                 TIME: {timeLeft}s
              </div>
           </div>

           {/* Game Overlay */}
           {!isPlaying && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
                {timeLeft === 0 ? (
                    <div className="text-center mb-6">
                        <h3 className="font-meme text-5xl text-yellow-400 mb-2">HUNT OVER!</h3>
                        <p className="text-white font-display text-xl">You harvested {score} $AHAB</p>
                    </div>
                ) : null}
                <button 
                    onClick={startGame}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-black font-meme text-3xl px-10 py-4 rounded-full border-b-8 border-cyan-700 active:border-b-0 active:translate-y-2 transition-all shadow-[0_0_50px_rgba(34,211,238,0.5)]"
                >
                    {timeLeft === 0 ? 'HUNT AGAIN' : 'START HUNT'}
                </button>
             </div>
           )}

           {/* Harpoons (Visual Effect) */}
           <AnimatePresence>
             {harpoons.map(harpoon => (
                <motion.div
                  key={harpoon.id}
                  initial={{ opacity: 1, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute pointer-events-none z-10 w-12 h-12"
                  style={{ 
                      left: harpoon.x - 24, 
                      top: harpoon.y - 24, 
                      rotate: `${harpoon.rotation + 45}deg` 
                  }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
                        <path d="m19 5-3 3"/>
                        <path d="m2 22 3-3"/>
                        <path d="M22 2 2 22"/>
                        <path d="m14 10-2-2"/>
                    </svg>
                </motion.div>
             ))}
           </AnimatePresence>

           {/* The Whale */}
           <AnimatePresence>
            {isPlaying && (
                <motion.button
                    layout
                    initial={{ scale: 0 }}
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 5, 0],
                    }}
                    transition={{ 
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        layout: { duration: 0.2 }
                    }}
                    exit={{ scale: 0 }}
                    style={{ top: whalePos.top, left: whalePos.left }}
                    className="absolute w-24 h-24 -ml-12 -mt-12 z-10 cursor-pointer"
                    onClick={handleWhaleClick}
                >
                    <div className="w-full h-full text-7xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] filter hover:brightness-125 transition-all">
                       🐋
                    </div>
                </motion.button>
            )}
           </AnimatePresence>

           {/* Hit Numbers */}
           {hits.map(hit => (
               <motion.div
                 key={hit.id}
                 initial={{ opacity: 1, y: 0, scale: 0.5, rotate: Math.random() * 20 - 10 }}
                 animate={{ opacity: 0, y: -80, scale: 1.5 }}
                 className="absolute text-yellow-400 font-black font-meme text-4xl pointer-events-none z-20 stroke-black stroke-2"
                 style={{ 
                     left: hit.x, 
                     top: hit.y, 
                     textShadow: '2px 2px 0 #000' 
                 }}
               >
                   {hit.val}
               </motion.div>
           ))}
           
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(#0891b2 1px, transparent 1px), linear-gradient(90deg, #0891b2 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} 
            />
        </div>
      </div>
    </section>
  );
};
