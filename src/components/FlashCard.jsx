import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlashCard = ({ flashcard, onClose, onNext, onPrev, isNextDisabled, isPrevDisabled }) => {
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger the grow-in effect on mount
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 100 },  // Start off-screen to the right
    enter: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }, // Simple fade and slide in
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.5 },  // Simple fade and slide out
    },
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 gap-8`}
      onClick={onClose}
    >
      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`btn  ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onPrev}
          disabled={isPrevDisabled}
        >
          Previous
        </button>
      </div>
      
      <div className="relative w-[38rem] h-[30rem]">
        <AnimatePresence initial={false}>
          <motion.div
            key={flashcard.id}  // This key triggers animation on flashcard change
            className={`absolute top-0 left-0 w-full h-full shadow-2xl rounded-lg flip-container ${
              flipped ? 'flipped' : ''
            } ${visible ? 'grow-in' : 'opacity-0'}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing on card click
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
          >
            <div className="flip-card-inner flex flex-col h-full">
              {/* Front Side - Question */}
              <div className="flip-card-front p-8 flex flex-col justify-between h-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false); // Start fade-out effect
                    setTimeout(onClose, 300); // Delay close to match fade-out
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl z-50"
                >
                  &times;
                </button>
                <h2 className="card-title text-2xl mb-4">Question:</h2>
                <p className="flex-grow overflow-auto text-lg break-words p-4 bg-gray-100 rounded-md">
                  {flashcard.question}
                </p>
                <div className="flex justify-end mt-3">
                  <button className="btn btn-primary" onClick={handleFlip}>
                    Show Solution
                  </button>
                </div>
              </div>

              {/* Back Side - Answer */}
              <div className="flip-card-back p-8 flex flex-col justify-between h-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false); // Start fade-out effect
                    setTimeout(onClose, 300); // Delay close to match fade-out
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl z-50"
                >
                  &times;
                </button>
                <h2 className="card-title text-2xl mb-4">Answer:</h2>
                <div
                  className="flex-grow overflow-auto text-lg p-4 bg-gray-100 rounded-md"
                  dangerouslySetInnerHTML={{ __html: flashcard.answer }}
                />
                <div className="flex justify-end mt-3">
                  <button className="btn btn-secondary" onClick={handleFlip}>
                    Back to Question
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`btn  ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
