// src/components/MoodSelector.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';

const moods = [
  { emoji: '😄', value: 'happy' },
  { emoji: '🙂', value: 'content' },
  { emoji: '😐', value: 'neutral' },
  { emoji: '🙁', value: 'sad' },
  { emoji: '😡', value: 'angry' },
  { emoji: '😩', value: 'tired' },
  { emoji: '😰', value: 'anxious' },
];

const MoodSelector = ({ onSelectMood, selectedMood }) => {
  const buttonRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const button = buttonRefs.current[index];
    gsap.killTweensOf(button);
    gsap.to(button, {
      scale: 1.25,
      rotation: 15,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(button, {
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
    const button = buttonRefs.current[index];
    gsap.killTweensOf(button);
    gsap.to(button, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="flex justify-center space-x-4 mb-4">
      {moods.map((mood, index) => (
        <button
          key={mood.value}
          onClick={() => onSelectMood(mood.value)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          ref={(el) => (buttonRefs.current[index] = el)}
          className={`
            p-2 rounded-full text-3xl
            ${selectedMood === mood.value ? 'ring-4 ring-purple-500' : ''}
          `}
          aria-label={`Select mood: ${mood.value}`}
        >
          {mood.emoji}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;