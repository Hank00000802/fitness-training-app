import React, { useState, useEffect, useCallback } from 'react';
import BodyPartGrid from './components/BodyPartGrid';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import AddExerciseForm from './components/AddExerciseForm';
import { exerciseData, addCustomExercise, getExercisesForBodyPart, deleteCustomExercise } from './data/exerciseData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [removedExerciseIds, setRemovedExerciseIds] = useState([]);

  const handleBackToHome = useCallback(() => {
    // Reset all page state
    setCurrentPage('home');
    setSelectedBodyPart(null);
    setSelectedExercise(null);
    
    // Reset popstate processing flag
    if (window.popStateHandler) {
      window.popStateHandler.isProcessingPopState = false;
    }
    
    // Clear popstate event flag
    window.isPopStateEvent = false;
    
    // Update history to home page without triggering popstate event
    window.history.replaceState(
      { page: 'home' },
      'Fitness Training App',
      '/'
    );
    
    // Update document title
    document.title = 'Fitness Training App';
    
    console.log('System state has been fully reset');
  }, []);

  const handleBackToList = useCallback(() => {
    setCurrentPage('exerciseList');
    setSelectedExercise(null);
    // Update history when returning to exercise list
    // Preserve bodyPart selection in history state
    window.history.replaceState(
      { page: 'exerciseList', bodyPart: selectedBodyPart, exercise: null },
      `${selectedBodyPart?.name} Exercises`,
      '#exerciseList'
    );
  }, [selectedBodyPart]);

  const handleAddExercise = () => {
    setCurrentPage('addExercise');
  };

  const handleSubmitExercise = async (exerciseData) => {
    if (!selectedBodyPart) {
      return;
    }
    addCustomExercise(selectedBodyPart.id, exerciseData);
    // Force re-render to show newly added exercise
    setRefreshKey(k => k + 1);
    window.alert('Exercise added successfully!');
    setCurrentPage('exerciseList');
  };

  const handleCancelAddExercise = useCallback(() => {
    setCurrentPage('exerciseList');
  }, []);
  

  // key to force re-render of lists when localStorage changes
  const [refreshKey, setRefreshKey] = useState(0);

  // load removed built-in exercises
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('removedExerciseIds');
      if (stored) {
        const parsed = JSON.parse(stored);
        setRemovedExerciseIds(Array.isArray(parsed) ? parsed : []);
      }
    } catch (err) {
      console.error('Failed to load removed exercises', err);
      setRemovedExerciseIds([]);
    }
  }, []);

  // Reload custom exercises on app mount to ensure persistence
  useEffect(() => {
    // Force re-render to load persisted custom exercises
    setRefreshKey(k => k + 1);
  }, []);

  const handleDeleteExercise = useCallback((exerciseId) => {
    if (!selectedBodyPart) return;
    try {
      const isCustom =
        (selectedExercise && selectedExercise.id === exerciseId && selectedExercise.isCustom) ||
        String(exerciseId).startsWith('custom_');

      if (isCustom) {
        // Use the deleteCustomExercise function to sync both memory and localStorage
        deleteCustomExercise(selectedBodyPart.id, exerciseId);
      } else {
        const storedRemoved = window.localStorage.getItem('removedExerciseIds');
        const removed = storedRemoved ? JSON.parse(storedRemoved) : [];
        const newRemoved = Array.from(new Set([...removed, exerciseId]));
        window.localStorage.setItem('removedExerciseIds', JSON.stringify(newRemoved));
        setRemovedExerciseIds(newRemoved);
      }

      // if viewing deleted exercise, go back to list
      if (selectedExercise && selectedExercise.id === exerciseId) {
        setSelectedExercise(null);
        setCurrentPage('exerciseList');
      }
      // Force re-render to reflect deletion
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Failed to delete custom exercise', err);
    }
  }, [selectedBodyPart, selectedExercise]);

  // Handle browser back button with popstate event
  useEffect(() => {
    // Initialize flag to prevent duplicate popstate processing
    let isProcessingPopState = false;
    
    const handlePopState = () => {
      // Prevent processing multiple popstate events in quick succession
      if (isProcessingPopState) {
        return;
      }
      
      // Set processing flag to true
      isProcessingPopState = true;
      
      // Mark this as a popstate event to prevent pushState call
      window.isPopStateEvent = true;
      
      // Navigate based on current page
      if (currentPage === 'exerciseDetail') {
        // Return to exercise list from detail view
        // Call handleBackToList function
        handleBackToList();
      } else if (currentPage === 'addExercise') {
        handleCancelAddExercise();
      } else if (currentPage === 'exerciseList') {
        // Return to home from exercise list
        handleBackToHome();
      }
      // If on home page, no action needed
      
      // Reset processing flag after a short delay
      setTimeout(() => {
        isProcessingPopState = false;
      }, 300); // 300ms delay to debounce events
    };
    
    // Store handler reference for external access
    window.popStateHandler = { isProcessingPopState };
    
    // Add listener for browser popstate event
    window.addEventListener('popstate', handlePopState);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage, selectedBodyPart, handleBackToList, handleBackToHome, handleCancelAddExercise]);

  // Update document title and history based on current page
  useEffect(() => {
    // Skip title update when on home page
    if (currentPage === 'home') {
      // No need to update title or history on home
      return;
    }

    // Generate appropriate page title based on current page
    const pageTitle = currentPage === 'exerciseList' 
      ? `${selectedBodyPart?.name} Exercises` 
      : currentPage === 'addExercise'
      ? `Add Exercise - ${selectedBodyPart?.name}`
      : `${selectedExercise?.name} Tips`;
    
    // Update document title
    document.title = `${pageTitle} - Fitness Training App`;
    
    // Only push state if this was not triggered by a popstate event
    // This prevents duplicate history entries when using browser back/forward
    if (!window.isPopStateEvent) {
      window.history.pushState(
        { page: currentPage, bodyPart: selectedBodyPart, exercise: selectedExercise },
        pageTitle,
        `#${currentPage}`
      );
    }
    // Clear popstate event flag
    window.isPopStateEvent = false;
  }, [currentPage, selectedBodyPart, selectedExercise]);

  const handleBodyPartSelect = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setCurrentPage('exerciseList');
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setCurrentPage('exerciseDetail');
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
        const filteredExercises = getExercisesForBodyPart(selectedBodyPart?.id)
          .filter(ex => !removedExerciseIds.includes(ex.id));
        return (
          <ExerciseList
            key={`exercise-list-${refreshKey}`}
            bodyPart={selectedBodyPart}
            exercises={filteredExercises}
            onExerciseSelect={handleExerciseSelect}
            onBack={handleBackToHome}
            onAddExercise={handleAddExercise}
            onDelete={handleDeleteExercise}
          />
        );
      case 'exerciseDetail':
        return (
          <ExerciseDetail
            key={`exercise-detail-${refreshKey}`}
            exercise={selectedExercise}
            onBack={handleBackToHome}
            onDelete={handleDeleteExercise}
          />
        );
      case 'addExercise':
        return (
          <AddExerciseForm
            key={`add-exercise-${refreshKey}`}
            bodyPart={selectedBodyPart}
            onSubmit={handleSubmitExercise}
            onCancel={handleCancelAddExercise}
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
