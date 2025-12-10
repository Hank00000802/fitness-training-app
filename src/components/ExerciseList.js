import React from 'react';

const ExerciseList = ({ bodyPart, exercises, onExerciseSelect, onBack, onAddExercise }) => {
  console.log('ExerciseList - bodyPart:', bodyPart);
  console.log('ExerciseList - exercises:', exercises);
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-white hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1">←</span>
          返回首頁
        </button>
        <h1 className="text-2xl font-bold text-white">
          Exercise List - {bodyPart.name}
        </h1>
        <div className="w-8"></div>
      </div>
      
      <div className="space-y-4">
        {(exercises || []).map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => onExerciseSelect(exercise)}
            className="bg-white bg-opacity-10 rounded-lg p-6 cursor-pointer 
                     hover:bg-opacity-20 transition-all duration-200 
                     border border-white border-opacity-20 hover:border-opacity-40"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {exercise.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {exercise.description}
                </p>
              </div>
              <span className="text-blue-400">››</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white border-opacity-20">
        <button
          onClick={onAddExercise}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <span className="text-xl">+</span>
          <span className="font-semibold">Add Exercise</span>
        </button>
        <p className="text-center text-sm text-gray-400 mt-2">
          Add your own exercises for {bodyPart.name}
        </p>
      </div>
    </div>
  );
};

export default ExerciseList; 