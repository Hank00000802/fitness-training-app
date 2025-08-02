import React, { useState } from 'react';

const ExerciseDetail = ({ exercise, onBack }) => {
  const [imageError, setImageError] = useState(false);
  
  console.log('ExerciseDetail - exercise:', exercise);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const defaultImage = 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=運動示意圖';
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-white hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1">←</span>
          返回
        </button>
        <h1 className="text-xl font-bold text-white">
          {exercise.name} 注意事項
        </h1>
        <div className="w-8"></div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <div className="flex justify-center items-center bg-gray-900 rounded-lg p-4">
            <img
              src={imageError ? defaultImage : exercise.image}
              alt={exercise.name}
              className="max-w-full max-h-64 object-contain"
              onError={handleImageError}
            />
          </div>
          <p className="text-center text-sm text-gray-300 mt-2">
            動作示意圖
          </p>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-2">
            運動說明
          </h3>
          <p className="text-gray-300">
            {exercise.description}
          </p>
        </div>
        
        <div className="space-y-3">
          {exercise.tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Tip {index + 1}
              </h3>
              <p className="text-gray-300">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
      </div>
    </div>
  );
};

export default ExerciseDetail; 