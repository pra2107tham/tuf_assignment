import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Flashcard from './FlashCard';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedFlashcardIndex, setSelectedFlashcardIndex] = useState(null);
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

  const handleFlashcardClick = (index) => {
    setSelectedFlashcardIndex(index);
  };

  const handleNext = () => {
    setSelectedFlashcardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setSelectedFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="relative bg-transparent">
      <div className="flex justify-center p-4">
        <div className="w-full max-w-screen-sm">
          <h2 className="text-4xl font-bold mb-6 text-center drop-shadow-2xl">!!QUESTIONS!!</h2>
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="skeleton h-12 w-full bg-#E6E5E5 rounded-lg"
                ></div>
              ))
            ) : (
              flashcards.map((flashcard, index) => (
                <div
                  key={flashcard.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 cursor-pointer text-left transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                  onClick={() => handleFlashcardClick(index)}
                >
                  <h3 className="text-lg font-semibold truncate ">{flashcard.question}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedFlashcardIndex !== null && (
        <Flashcard
          flashcard={flashcards[selectedFlashcardIndex]}
          onClose={() => setSelectedFlashcardIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          isNextDisabled={selectedFlashcardIndex >= flashcards.length - 1}
          isPrevDisabled={selectedFlashcardIndex <= 0}
        />
      )}
    </div>
  );
};

export default FlashcardList;
