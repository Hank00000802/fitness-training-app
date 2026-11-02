import React from 'react';

const BodyPartGrid = ({
  bodyParts,
  onBodyPartSelect,
  onAddBodyPart,
  onDeleteBodyPart,
  removedDefaultCount = 0,
  onRestoreDefaults
}) => {
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
                     border border-white border-opacity-20 hover:border-opacity-40 relative"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{bodyPart.icon}</span>
              <span className="text-xl font-semibold text-white">
                {bodyPart.name}
              </span>
            </div>
            {onDeleteBodyPart && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete "${bodyPart.name}" body part?`)) {
                    onDeleteBodyPart(bodyPart.id);
                  }
                }}
                className="absolute top-3 right-3 text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white border-opacity-20">
        <button
          onClick={onAddBodyPart}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <span className="text-xl">+</span>
          <span className="font-semibold">Add Body Part</span>
        </button>
        <p className="text-center text-sm text-gray-400 mt-2">
          Add your own training body parts
        </p>
        {removedDefaultCount > 0 && onRestoreDefaults && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                if (window.confirm('Restore all deleted default body parts, exercises and tips?')) {
                  onRestoreDefaults();
                }
              }}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Restore deleted default items ({removedDefaultCount})
            </button>
          </div>
        )}
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
        <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
      </div>
    </div>
  );
};

export default BodyPartGrid;
