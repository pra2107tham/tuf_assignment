import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Flashcard from './FlashCard';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('flashcards')
        .select('*');

      if (error) {
        console.error('Error fetching flashcards:', error);
      } else {
        setFlashcards(data);
      }
      setLoading(false);
    };

    fetchFlashcards();
  }, []);

  const handleFlashcardClick = (flashcard) => {
    setSelectedFlashcard(flashcard);
  };

  return (
    <div className="relative bg-transparent">
      <div className="flex justify-center p-4">
        <div className="w-full max-w-screen-sm">
          <h2 className="text-4xl font-bold mb-6 text-center drop-shadow-2xl">!!QUESTIONS!!</h2>
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              // Skeleton Loader
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="skeleton h-12 w-full bg-#E6E5E5 rounded-lg"
                ></div>
              ))
            ) : (
              // Flashcards Display
              flashcards.map((flashcard) => (
                <div
                  key={flashcard.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 cursor-pointer text-left transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                  onClick={() => handleFlashcardClick(flashcard)}
                >
                  <h3 className="text-lg font-semibold">{flashcard.question}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedFlashcard && (
        <Flashcard 
          flashcard={selectedFlashcard} 
          onClose={() => setSelectedFlashcard(null)} 
        />
      )}
    </div>
  );
};

export default FlashcardList;
