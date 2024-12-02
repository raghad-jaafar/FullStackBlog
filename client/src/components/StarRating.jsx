import React, { useState } from 'react';

const StarRating = ({ rating, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0); // State for hover rating
  const stars = Array(5).fill(0); // Create an array of 5 elements for the stars

  const handleRating = (index) => {
    onChange(index + 1); // Update the rating in the parent component
  };

  return (
    <div className="star-rating" role="radiogroup" aria-label="Star Rating">
      {stars.map((_, index) => (
        <span
          key={index}
          className={index < (hoverRating || rating) ? 'star filled' : 'star'}
          onClick={() => handleRating(index)} // Update rating on click
          onMouseEnter={() => setHoverRating(index + 1)} // Set hover rating on mouse enter
          onMouseLeave={() => setHoverRating(0)} // Reset hover rating on mouse leave
          style={{
            cursor: 'pointer',
            color: index < (hoverRating || rating) ? 'gold' : 'gray',
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
