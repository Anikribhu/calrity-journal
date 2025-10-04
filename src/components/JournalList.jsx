// src/components/JournalList.jsx
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const moodEmojis = {
    happy: '😄',
    content: '🙂',
    neutral: '😐',
    sad: '🙁',
    angry: '😡',
    tired: '😩',
    anxious: '😰',
};

const JournalList = ({ entries }) => {
  const emojiRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const emojiElement = emojiRefs.current[index];
    if (!emojiElement) return;

    gsap.killTweensOf(emojiElement);

    gsap.to(emojiElement, {
      scale: 1.25,
      rotation: 15,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(emojiElement, {
          rotation: -15,
          duration: 0.2,
          yoyo: true,
          repeat: 3,
          ease: "power1.inOut",
        });
      },
    });
  };

  const handleMouseLeave = (index) => {
    const emojiElement = emojiRefs.current[index];
    if (!emojiElement) return;

    gsap.killTweensOf(emojiElement);

    gsap.to(emojiElement, {
      scale: 1,
      rotation: 0,
      opacity: 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <AnimatePresence>
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: entry.id.charCodeAt(0) % 2 === 0 ? 3 : -3 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
            // Added this whileHover prop for the card animation
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
            className="relative p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-shadow duration-300 transform-gpu aspect-square flex flex-col justify-end"
          >
            <div
              className="absolute inset-0 flex items-center justify-center -z-10"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <span 
                className="text-8xl opacity-20 transform -translate-y-4"
                ref={(el) => (emojiRefs.current[index] = el)}
              >
                {moodEmojis[entry.mood]}
              </span>
            </div>

            <div className="absolute top-2 right-2 text-lg transform rotate-12 text-red-500">
              📌
            </div>
            
            <div className="z-10">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{entry.date}</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-tight overflow-hidden text-ellipsis mb-2">{entry.text}</p>
              <p className="text-xs italic text-gray-600 dark:text-gray-400">{entry.reflection}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default JournalList;