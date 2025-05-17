
import React, { useState, useEffect } from 'react';

// Background images for the rotating gallery
const backgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1624355851366-8c1dc2736c6e?q=80&w=1800",
    alt: "Mining machinery in operation",
    caption: "Advanced mining operations"
  },
  {
    url: "https://images.unsplash.com/photo-1629873981360-17a8f031075c?q=80&w=1800",
    alt: "Geological survey team",
    caption: "Field survey teams collecting data"
  },
  {
    url: "https://images.unsplash.com/photo-1578146055250-a64e7a4382a6?q=80&w=1800",
    alt: "Drone survey equipment",
    caption: "Remote sensing technology"
  },
  {
    url: "https://images.unsplash.com/photo-1614108831136-f8b5d49c10f8?q=80&w=1800",
    alt: "Mining data visualization",
    caption: "AI-powered data analysis"
  }
];

export const BackgroundGallery: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    // Rotate background images every 8 seconds
    const intervalId = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 bg-cover bg-center ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image.url})` }}
          aria-hidden="true"
        />
      ))}
      {/* Overlay with caption */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-end pb-12">
        <div className="text-white/80 text-sm font-light animate-fade-in max-w-md text-center px-4">
          {backgroundImages[currentBgIndex].caption}
        </div>
      </div>
    </div>
  );
};
