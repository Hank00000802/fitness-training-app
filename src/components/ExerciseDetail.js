import React, { useState, useEffect } from 'react';
import { DEFAULT_EXERCISE_IMAGE } from '../data/exerciseData';

// Custom tips live in localStorage, one entry per exercise.
const customTipsKey = (exerciseId) => `customTips_${exerciseId}`;

const readCustomTips = (exerciseId) => {
  const saved = localStorage.getItem(customTipsKey(exerciseId));
  if (!saved) return [];
  try {
    const parsedTips = JSON.parse(saved);
    return Array.isArray(parsedTips) ? parsedTips : [];
  } catch (e) {
    // Oldest format: plain text separated by blank lines
    return saved.split('\n\n').filter(tip => tip.trim());
  }
};

const writeCustomTips = (exerciseId, tips) => {
  if (tips.length) {
    localStorage.setItem(customTipsKey(exerciseId), JSON.stringify(tips));
  } else {
    localStorage.removeItem(customTipsKey(exerciseId));
  }
};

// Lets an open detail page reload its tips when an Undo changes them from outside.
const CUSTOM_TIPS_CHANGED = 'custom-tips-changed';
const notifyCustomTipsChanged = (exerciseId) => {
  window.dispatchEvent(new CustomEvent(CUSTOM_TIPS_CHANGED, { detail: { exerciseId } }));
};

const ExerciseDetail = ({ exercise, onBack, onDelete, removedTips = [], onDeleteTip, onUndoable }) => {
  const [imageError, setImageError] = useState(false);
  const [customTips, setCustomTips] = useState('');
  const [savedCustomTips, setSavedCustomTips] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  useEffect(() => {
    // A different exercise may have a working image even if the previous one failed.
    setImageError(false);
  }, [exercise.id]);

  useEffect(() => {
    setSavedCustomTips(readCustomTips(exercise.id));

    const handleChanged = (event) => {
      if (event.detail && event.detail.exerciseId === exercise.id) {
        setSavedCustomTips(readCustomTips(exercise.id));
      }
    };
    window.addEventListener(CUSTOM_TIPS_CHANGED, handleChanged);
    return () => window.removeEventListener(CUSTOM_TIPS_CHANGED, handleChanged);
  }, [exercise.id]);
  
  const handleSaveCustomTip = () => {
    if (customTips.trim()) {
      const newCustomTips = [...savedCustomTips, customTips.trim()];
      setSavedCustomTips(newCustomTips);
      writeCustomTips(exercise.id, newCustomTips);
      setCustomTips('');
    }
  };
  
  const handleClearCustomTips = () => {
    if (window.confirm('Are you sure you want to clear all custom tips?')) {
      const exerciseId = exercise.id;
      const previousTips = savedCustomTips;
      setSavedCustomTips([]);
      writeCustomTips(exerciseId, []);
      if (onUndoable && previousTips.length) {
        onUndoable('Custom tips cleared', () => {
          writeCustomTips(exerciseId, previousTips);
          notifyCustomTipsChanged(exerciseId);
        });
      }
    }
  };
  
  const handleStartEdit = () => {
    setEditText(savedCustomTips.join('\n\n'));
    setIsEditing(true);
  };
  
  const handleSaveEdit = () => {
    const newTips = editText.split('\n\n').filter(tip => tip.trim());
    setSavedCustomTips(newTips);
    writeCustomTips(exercise.id, newTips);
    setIsEditing(false);
    setEditText('');
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText('');
  };
  
  const handleDeleteTip = (index) => {
    if (!window.confirm('Remove this tip?')) return;
    const exerciseId = exercise.id;
    const removedTip = savedCustomTips[index];
    const newTips = savedCustomTips.filter((_, i) => i !== index);
    setSavedCustomTips(newTips);
    writeCustomTips(exerciseId, newTips);
    if (onUndoable) {
      onUndoable('Tip removed', () => {
        // Re-read storage so edits made after the removal are not lost.
        const current = readCustomTips(exerciseId);
        current.splice(Math.min(index, current.length), 0, removedTip);
        writeCustomTips(exerciseId, current);
        notifyCustomTipsChanged(exerciseId);
      });
    }
  };
  
  const maxLength = 500;
  const remainingChars = maxLength - customTips.length;

  // Built-in tips the user has not removed. Numbering is based on what is visible.
  const visibleTips = (exercise.tips || []).filter(tip => !removedTips.includes(tip));
  // Only the built-in exercises' own tips can be removed here (custom exercises
  // are managed by deleting the whole exercise).
  const canRemoveTips = Boolean(onDeleteTip) && !exercise.isCustom;
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-white hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1">←</span>
          Back to List
        </button>
        <h1 className="text-xl font-bold text-white">
          {exercise.name} Details
        </h1>
        <div className="w-8">
          {onDelete ? (
            <button
              onClick={() => {
                if (window.confirm('Delete this exercise?')) {
                  onDelete(exercise.id);
                }
              }}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <div className="flex justify-center items-center bg-gray-900 rounded-lg p-4">
            <img
              src={imageError || !exercise.image ? DEFAULT_EXERCISE_IMAGE : exercise.image}
              alt={exercise.name}
              className="max-w-full max-h-64 object-contain"
              onError={handleImageError}
            />
          </div>
          <p className="text-center text-sm text-gray-300 mt-2">
            Exercise Demo
          </p>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-2">
            Description
          </h3>
          <p className="text-gray-300">
            {exercise.description}
          </p>
        </div>
        
        <div className="space-y-3">
          {visibleTips.map((tip, index) => (
            <div
              key={`original-${index}-${tip}`}
              className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Tip {index + 1}
                </h3>
                {canRemoveTips && (
                  <button
                    onClick={() => {
                      if (window.confirm('Remove this tip?')) {
                        onDeleteTip(exercise.id, tip);
                      }
                    }}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-gray-300">
                {tip}
              </p>
            </div>
          ))}
          
          {savedCustomTips.map((tip, index) => (
            <div
              key={`custom-${index}`}
              className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-400 border-opacity-30"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-blue-300">
                  Tip {visibleTips.length + index + 1}
                </h3>
                <button
                  onClick={() => handleDeleteTip(index)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>
              <p className="text-gray-300">
                {tip}
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Custom Tips
          </h3>
          
          {isEditing && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-blue-300">Edit custom tips (separate with blank lines)</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                rows="6"
                placeholder="Edit your custom tips here (separate with blank lines)..."
              />
            </div>
          )}
          
          {!isEditing && (
            <div className="space-y-3">
              <textarea
                value={customTips}
                onChange={(e) => setCustomTips(e.target.value)}
                placeholder="Enter your custom tip here..."
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                rows="3"
                maxLength={maxLength}
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={handleSaveCustomTip}
                  disabled={!customTips.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Add Custom Tip
                </button>
                <span className={`text-xs ${remainingChars < 50 ? 'text-red-400' : 'text-gray-400'}`}>
                  {customTips.length}/{maxLength}
                </span>
              </div>
            </div>
          )}
          
          {savedCustomTips.length > 0 && !isEditing && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-600">
              <button
                onClick={handleStartEdit}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Edit Custom Tips
              </button>
              <button
                onClick={handleClearCustomTips}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Clear All Custom Tips
              </button>
            </div>
          )}
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
