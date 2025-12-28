import React from 'react';
import { motion } from 'framer-motion';
import { MANIFESTO_PARAGRAPHS } from '../constants';
import { SectionId } from '../types';
import { Scroll } from 'lucide-react';

export const Lore: React.FC = () => {
  return (
    <section id={SectionId.LORE} className="relative py-24 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="inline-flex items-center gap-3 text-4xl md:text-6xl font-meme text-yellow-400 drop-shadow-md">
           <Scroll className="w-10 h-10 md:w-16 md:h-16" />
           CAPTAIN'S LOG
        </h2>
      </div>

      <div className="relative bg-[#1a1b26] border-2 border-yellow-600/50 p-8 md:p-12 rounded-lg shadow-[10px_10px_0px_rgba(202,138,4,0.2)]">
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-500 border-2 border-black" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-500 border-2 border-black" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-yellow-500 border-2 border-black" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-500 border-2 border-black" />

        <div className="space-y-8 font-mono text-lg text-slate-300">
        {MANIFESTO_PARAGRAPHS.map((para, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-50px", once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex gap-4"
          >
            <span className="text-cyan-500 font-bold shrink-0">{`>>`}</span>
            <p className="leading-relaxed">
              {para}
            </p>
          </motion.div>
        ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
         <div className="inline-block bg-slate-900 border border-slate-700 px-6 py-3 rounded-full text-slate-400 font-mono text-sm hover:text-white hover:border-cyan-500 transition-colors cursor-pointer">
             CA: 0xWHALE...DEAD...BEEF...1337
         </div>
      </div>
    </section>
  );
};
