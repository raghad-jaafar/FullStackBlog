import React from 'react';

const StarRating = ({ rating, onChange }) => {
  const stars = Array(5).fill(0); // Create an array of 5 elements for the stars

 

  return (
    <div className="star-rating" role="radiogroup" aria-label="Star Rating">
      {stars.map((_, index) => (
        <span
          key={index}
          className={index < rating ? 'star filled' : 'star'}
          onClick={() => handleRating(index)} // Update rating on click
          onMouseEnter={() => setHoverRating(index + (steps === 0.5 ? 0.5 : 1))}
          onMouseLeave={() => setHoverRating(0)}
          style={{
            cursor: 'pointer',
            color: index < rating ? 'gold' : 'gray',
            transition: 'color 0.2s ease', // Smooth color transition
            fontSize: '24px', // Adjust font size for better visibility
          }}
          role="radio"
          aria-checked={index < rating}
          tabIndex={0} // Make stars focusable
          onKeyPress={(e) => { if (e.key === 'Enter') handleRating(index); }} // Allow keyboard interaction
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
