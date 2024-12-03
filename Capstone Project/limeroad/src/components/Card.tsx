import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  images: string[]; // Array of image URLs
  followers: number | string;
  likes: number;
  itemsCount: number;
  id: string; // Unique ID for navigation
}

const Card: React.FC<CardProps> = ({
  title,
  images,
  followers,
  likes,
  itemsCount,
  id,
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  // Handle like button click
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Handle share button click
  const handleShare = () => {
    alert(`Share this card: ${title}`);
  };

  // Handle card click (navigate to new page)
  const handleCardClick = () => {
    navigate(`/product-display`);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <h2 className="text-base  font-semibold">{title}</h2>
      {/* Image Carousel */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} ${index + 1}`}
            className="w-auto h-320 object-cover rounded-md"
          />
        ))}
      </div>
      <div className="flex flex-row space-x-8">
        <img
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
          src="https://n-img4.junaroad.com/user_profile/profile_657192eefd1d3c10d4fe9684-1705637616.png"
          alt="trent"
        />
        {/* +{itemsCount} */}
        <p className="text-sm text-gray-500 ">
          <span>By</span> <span className="font-bold">Trend Experts</span>
          <p>{followers.toLocaleString()} Followers</p>
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        {/* Like Button */}
        <button
          className={`text-lg font-semibold ${
            isLiked ? "text-pink-500" : "text-gray-500"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation on button click
            handleLike();
          }}
        >
          ❤️ {likeCount} Likes
        </button>
        {/* Share Button */}
        <button
          className="text-lg text-green-500 font-semibold"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation on button click
            handleShare();
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Card;
