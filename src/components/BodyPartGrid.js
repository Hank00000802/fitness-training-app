import React from 'react';

const BodyPartGrid = ({ bodyParts, onBodyPartSelect }) => {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Home</h1>
      
      <div className="space-y-4">
        {bodyParts.map((bodyPart) => (
          <div
            key={bodyPart.id}
            onClick={() => onBodyPartSelect(bodyPart)}
            className="bg-white bg-opacity-10 rounded-lg p-6 cursor-pointer 
                     hover:bg-opacity-20 transition-all duration-200 
                     border border-white border-opacity-20 hover:border-opacity-40"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{bodyPart.icon}</span>
              <span className="text-xl font-semibold text-white">
                {bodyPart.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/*  */}
      <div className="flex justify-center mt-6 space-x-2">
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
      </div>
    </div>
  );
};

export default BodyPartGrid; 