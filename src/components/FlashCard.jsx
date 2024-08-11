import React, { useState, useEffect } from 'react';

const FlashCard = ({ flashcard, onClose }) => {
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger the grow-in effect on mount
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 `}
      onClick={onClose}
    >
      <div
        className={`relative w-[38rem] h-[30rem]  shadow-2xl rounded-lg flip-container ${
          flipped ? 'flipped' : ''
        } ${
            visible ? 'grow-in' : 'opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on card click
      >
        <div className="flip-card-inner">
          {/* Front Side - Question */}
          <div className="flip-card-front p-8">
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
            <h2 className="card-title text-2xl mb-4">{flashcard.question}</h2>
            <p className="flex-grow overflow-auto text-lg custom-scrollbar break-words">
              {flashcard.description}
            </p>
            {/* Button to flip card */}
            <div className="absolute bottom-4 right-4">
              <button className="btn btn-primary" onClick={handleFlip}>
                Show Solution
              </button>
            </div>
          </div>

          {/* Back Side - Answer */}
          <div className="flip-card-back p-8">
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
            <p className="flex-grow overflow-auto text-lg custom-scrollbar break-words">
              {flashcard.answer}
            </p>
            {/* Button to flip card */}
            <div className="absolute bottom-4 right-4">
              <button className="btn btn-secondary" onClick={handleFlip}>
                Back to Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
