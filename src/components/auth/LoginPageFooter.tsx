
import React from 'react';

export const LoginPageFooter: React.FC = () => {
  return (
    <div className="absolute bottom-2 left-0 right-0 flex justify-center flex-wrap gap-1 z-10">
      <span className="bg-white/10 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-full text-[10px]">Geological Surveys</span>
      <span className="bg-white/10 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-full text-[10px]">Remote Sensing</span>
      <span className="bg-white/10 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-full text-[10px]">Mineral Detection</span>
    </div>
  );
};
