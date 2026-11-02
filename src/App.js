import React, { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import BodyPartGrid from './components/BodyPartGrid';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import AddExerciseForm from './components/AddExerciseForm';
import AddBodyPartForm from './components/AddBodyPartForm';
import InstallPWA from './components/InstallPWA';
import UpdatePrompt from './components/UpdatePrompt';
import UndoToast from './components/UndoToast';
import { addCustomExercise, getExercisesForBodyPart, deleteCustomExercise, restoreCustomExercise, initCustomExercises, getAllBodyParts, addCustomBodyPart, deleteCustomBodyPart, restoreCustomBodyPart, initCustomBodyParts } from './data/exerciseData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [removedExerciseIds, setRemovedExerciseIds] = useState([]);
  // Built-in content cannot be removed from the code, so deleting it just hides it.
  // These are persisted in localforage next to `removedExerciseIds`.
  const [removedBodyPartIds, setRemovedBodyPartIds] = useState([]);
  // { [exerciseId]: [tip text, ...] } - tips are identified by their text, not position
  const [removedTips, setRemovedTips] = useState({});

  // "Undo" bar shown at the bottom after ANY deletion: { id, message, undo }.
  // A newer deletion replaces the previous bar.
  const [undoToast, setUndoToast] = useState(null);
  const showUndo = useCallback((message, undo) => {
    setUndoToast({ id: Date.now() + Math.random(), message, undo });
  }, []);
  const dismissUndo = useCallback(() => setUndoToast(null), []);
  const handleUndo = useCallback(async () => {
    const current = undoToast;
    setUndoToast(null);
    if (!current || typeof current.undo !== 'function') return;
    try {
      await current.undo();
    } catch (err) {
      console.error('Undo failed', err);
    }
  }, [undoToast]);

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

  const handleAddBodyPart = () => {
    setCurrentPage('addBodyPart');
  };

  const handleSubmitBodyPart = async (bodyPartData) => {
    await addCustomBodyPart(bodyPartData);
    setRefreshKey(k => k + 1);
    window.alert('Body part added successfully!');
    setCurrentPage('home');
  };

  const handleCancelAddBodyPart = useCallback(() => {
    setCurrentPage('home');
  }, []);

  const handleDeleteBodyPart = useCallback(async (bodyPartId) => {
    try {
      const target = getAllBodyParts().find(bp => bp.id === bodyPartId);
      const name = target ? target.name : 'Body part';
      let undo = null;
      if (target && target.isCustom) {
        // Real deletion (also removes the custom exercises under it); keep a snapshot for Undo.
        const snapshot = await deleteCustomBodyPart(bodyPartId);
        if (snapshot) {
          undo = async () => {
            await restoreCustomBodyPart(snapshot);
            setRefreshKey(k => k + 1);
          };
        }
      } else {
        // Built-in body part: only hide it. (Do NOT use deleteCustomBodyPart here, it
        // would also wipe any custom exercises the user added under this body part.)
        const stored = await localforage.getItem('removedBodyPartIds');
        const removed = Array.isArray(stored) ? stored : [];
        const newRemoved = Array.from(new Set([...removed, bodyPartId]));
        await localforage.setItem('removedBodyPartIds', newRemoved);
        setRemovedBodyPartIds(newRemoved);
        undo = async () => {
          const current = await localforage.getItem('removedBodyPartIds');
          const next = (Array.isArray(current) ? current : []).filter(id => id !== bodyPartId);
          await localforage.setItem('removedBodyPartIds', next);
          setRemovedBodyPartIds(next);
          setRefreshKey(k => k + 1);
        };
      }
      if (selectedBodyPart?.id === bodyPartId) {
        setSelectedBodyPart(null);
        setCurrentPage('home');
      }
      setRefreshKey(k => k + 1);
      if (undo) showUndo(`Deleted "${name}"`, undo);
    } catch (err) {
      console.error('Failed to delete body part', err);
    }
  }, [selectedBodyPart, showUndo]);

  const handleSubmitExercise = async (exerciseData) => {
    if (!selectedBodyPart) {
      return;
    }
    await addCustomExercise(selectedBodyPart.id, exerciseData);
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

  // Initialize all persisted data from localforage on app mount
  useEffect(() => {
    const init = async () => {
      await initCustomExercises();
      await initCustomBodyParts();
      try {
        const stored = await localforage.getItem('removedExerciseIds');
        if (Array.isArray(stored)) {
          setRemovedExerciseIds(stored);
        }
      } catch (err) {
        console.error('Failed to load removed exercises', err);
      }
      try {
        const storedParts = await localforage.getItem('removedBodyPartIds');
        if (Array.isArray(storedParts)) {
          setRemovedBodyPartIds(storedParts);
        }
        const storedTips = await localforage.getItem('removedTips');
        if (storedTips && typeof storedTips === 'object' && !Array.isArray(storedTips)) {
          setRemovedTips(storedTips);
        }
      } catch (err) {
        console.error('Failed to load removed body parts / tips', err);
      }
      setRefreshKey(k => k + 1);
    };
    init();
  }, []);

  const handleDeleteExercise = useCallback(async (exerciseId) => {
    if (!selectedBodyPart) return;
    try {
      const bodyPartId = selectedBodyPart.id;
      const isCustom =
        (selectedExercise && selectedExercise.id === exerciseId && selectedExercise.isCustom) ||
        String(exerciseId).startsWith('custom_');
      // Read the name before deleting (a custom exercise is gone afterwards).
      const exerciseName =
        getExercisesForBodyPart(bodyPartId).find(e => e.id === exerciseId)?.name || 'Exercise';
      let undo = null;

      if (isCustom) {
        const result = await deleteCustomExercise(bodyPartId, exerciseId);
        if (result) {
          undo = async () => {
            await restoreCustomExercise(bodyPartId, result.exercise, result.index);
            setRefreshKey(k => k + 1);
          };
        }
      } else {
        const stored = await localforage.getItem('removedExerciseIds');
        const removed = Array.isArray(stored) ? stored : [];
        const newRemoved = Array.from(new Set([...removed, exerciseId]));
        await localforage.setItem('removedExerciseIds', newRemoved);
        setRemovedExerciseIds(newRemoved);
        undo = async () => {
          const current = await localforage.getItem('removedExerciseIds');
          const next = (Array.isArray(current) ? current : []).filter(id => id !== exerciseId);
          await localforage.setItem('removedExerciseIds', next);
          setRemovedExerciseIds(next);
          setRefreshKey(k => k + 1);
        };
      }

      // if viewing deleted exercise, go back to list
      if (selectedExercise && selectedExercise.id === exerciseId) {
        setSelectedExercise(null);
        setCurrentPage('exerciseList');
      }
      // Force re-render to reflect deletion
      setRefreshKey(k => k + 1);
      if (undo) showUndo(`Deleted "${exerciseName}"`, undo);
    } catch (err) {
      console.error('Failed to delete exercise', err);
    }
  }, [selectedBodyPart, selectedExercise, showUndo]);

  // Hide one built-in tip of an exercise (identified by its text).
  // Intentionally does not bump refreshKey: re-mounting the detail page would wipe
  // whatever the user is currently typing in the custom tip box.
  const handleDeleteTip = useCallback(async (exerciseId, tipText) => {
    try {
      const stored = await localforage.getItem('removedTips');
      const all = stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
      const current = Array.isArray(all[exerciseId]) ? all[exerciseId] : [];
      const next = { ...all, [exerciseId]: Array.from(new Set([...current, tipText])) };
      await localforage.setItem('removedTips', next);
      setRemovedTips(next);
      showUndo('Tip removed', async () => {
        const latest = await localforage.getItem('removedTips');
        const latestAll =
          latest && typeof latest === 'object' && !Array.isArray(latest) ? latest : {};
        const remaining = (Array.isArray(latestAll[exerciseId]) ? latestAll[exerciseId] : [])
          .filter(t => t !== tipText);
        const restored = { ...latestAll };
        if (remaining.length) {
          restored[exerciseId] = remaining;
        } else {
          delete restored[exerciseId];
        }
        await localforage.setItem('removedTips', restored);
        setRemovedTips(restored);
      });
    } catch (err) {
      console.error('Failed to delete tip', err);
    }
  }, [showUndo]);

  // Bring back everything the user hid (built-in body parts, exercises and tips).
  const handleRestoreDefaults = useCallback(async () => {
    try {
      await localforage.setItem('removedBodyPartIds', []);
      await localforage.setItem('removedExerciseIds', []);
      await localforage.setItem('removedTips', {});
      setRemovedBodyPartIds([]);
      setRemovedExerciseIds([]);
      setRemovedTips({});
      setUndoToast(null); // any pending Undo would now be redundant
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Failed to restore default items', err);
    }
  }, []);

  const removedDefaultCount =
    removedBodyPartIds.length +
    removedExerciseIds.length +
    Object.values(removedTips).reduce(
      (sum, list) => sum + (Array.isArray(list) ? list.length : 0),
      0
    );

  const getVisibleBodyParts = () =>
    getAllBodyParts().filter(bp => !removedBodyPartIds.includes(bp.id));

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
      } else if (currentPage === 'addBodyPart') {
        handleCancelAddBodyPart();
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
  }, [currentPage, selectedBodyPart, handleBackToList, handleBackToHome, handleCancelAddExercise, handleCancelAddBodyPart]);

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
      : currentPage === 'addBodyPart'
      ? 'Add Body Part'
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
            key={`body-part-grid-${refreshKey}`}
            bodyParts={getVisibleBodyParts()}
            onBodyPartSelect={handleBodyPartSelect}
            onAddBodyPart={handleAddBodyPart}
            onDeleteBodyPart={handleDeleteBodyPart}
            removedDefaultCount={removedDefaultCount}
            onRestoreDefaults={handleRestoreDefaults}
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
            onBack={handleBackToList}
            onDelete={handleDeleteExercise}
            removedTips={removedTips[selectedExercise?.id] || []}
            onDeleteTip={handleDeleteTip}
            onUndoable={showUndo}
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
      case 'addBodyPart':
        return (
          <AddBodyPartForm
            key={`add-body-part-${refreshKey}`}
            onSubmit={handleSubmitBodyPart}
            onCancel={handleCancelAddBodyPart}
          />
        );
      default:
        return <BodyPartGrid 
          key={`body-part-grid-${refreshKey}`}
          bodyParts={getVisibleBodyParts()}
          onBodyPartSelect={handleBodyPartSelect}
          onAddBodyPart={handleAddBodyPart}
          onDeleteBodyPart={handleDeleteBodyPart}
          removedDefaultCount={removedDefaultCount}
          onRestoreDefaults={handleRestoreDefaults}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        {renderPage()}
      </div>
      <InstallPWA />
      <UpdatePrompt />
      <UndoToast toast={undoToast} onUndo={handleUndo} onDismiss={dismissUndo} />
    </div>
  );
}

export default App;
