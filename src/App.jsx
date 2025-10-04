import React, { useState } from 'react'
import EntryForm from './components/EntryForm';
import JournalList from './components/JournalList';

const App = () => {

  const [journalEntries, setJournalEntries] = useState([]);
  const [currentMood, setCurrentMood] = useState('neutral');
    const handleSaveEntry = (newEntry) => {
    setJournalEntries(prevEntries => [newEntry, ...prevEntries]); // Add new entry to the front
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 p-8 font-poppins'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Clarity Journal</h1>
      <EntryForm onSave={handleSaveEntry} />
      <JournalList entries={journalEntries} />
    </div>
  )
}

export default App