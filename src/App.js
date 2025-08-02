import React, { useState } from 'react';
import BodyPartGrid from './components/BodyPartGrid';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import { exerciseData } from './data/exerciseData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleBodyPartSelect = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setCurrentPage('exerciseList');
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setCurrentPage('exerciseDetail');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedBodyPart(null);
    setSelectedExercise(null);
  };

  const handleBackToList = () => {
    setCurrentPage('exerciseList');
    setSelectedExercise(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <BodyPartGrid 
            bodyParts={exerciseData.bodyParts}
            onBodyPartSelect={handleBodyPartSelect}
          />
        );
      case 'exerciseList':
        return (
          <ExerciseList
            bodyPart={selectedBodyPart}
            exercises={exerciseData.exercises[selectedBodyPart.id]}
            onExerciseSelect={handleExerciseSelect}
            onBack={handleBackToHome}
          />
        );
      case 'exerciseDetail':
        return (
          <ExerciseDetail
            exercise={selectedExercise}
            onBack={handleBackToList}
          />
        );
      default:
        return <BodyPartGrid 
          bodyParts={exerciseData.bodyParts}
          onBodyPartSelect={handleBodyPartSelect}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        {renderPage()}
      </div>
    </div>
  );
}

export default App; 