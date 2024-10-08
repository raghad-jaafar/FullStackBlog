import React from 'react';

const StarRating = ({ rating, onChange }) => {
  const stars = Array(5).fill(0); // Create an array of 5 elements for the stars

  // Function to handle clicking on a star
  const handleRating = (index) => {
    onChange(index + 1); // Set rating based on the index of the clicked star
  };

  return (
    <div className="star-rating">
      {stars.map((_, index) => (
        <span
          key={index}
          className={index < rating ? 'star filled' : 'star'}
          onClick={() => handleRating(index)} // Update rating on click
          style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }} // Change color
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
