// src/components/EntryForm.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getReflection } from '../services/gemini';
import MoodSelector from './MoodSelector';

const EntryForm = ({ onSave }) => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMood, setSelectedMood] = useState('neutral');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      setIsGenerating(true);
      const reflectionText = await getReflection(text);

      const newEntry = {
        id: uuidv4(),
        text: text,
        date: new Date().toLocaleDateString(),
        reflection: reflectionText,
        mood: selectedMood,
      };

      onSave(newEntry);
      setText('');
      setIsGenerating(false);
      setSelectedMood('neutral');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <MoodSelector
        onSelectMood={setSelectedMood}
        selectedMood={selectedMood}
      />
      <textarea
        className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800"
        rows="6"
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className={`mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Save Entry'}
      </button>
    </form>
  );
};

export default EntryForm;