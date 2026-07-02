import React, { useState } from 'react';

const ICON_OPTIONS = ['💪', '🏋️', '🤸', '🦵', '🦶', '💥', '🔥', '⭐', '🎯', '🏃'];

const AddBodyPartForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter a body part name';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit({ name: name.trim(), icon });
    } catch (error) {
      console.error('Add body part failed:', error);
      setErrors({ submit: 'Failed to add body part, please retry' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onCancel}
          className="text-white hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1"></span>
          Back to Home
        </button>

        <h1 className="text-xl font-bold text-white">Add Body Part</h1>

        <div className="w-8"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-6 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4">Body Part Info</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Body Part Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              placeholder="e.g., Forearms, Calves"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-12 h-12 text-2xl rounded-lg transition-all ${
                    icon === emoji
                      ? 'bg-blue-600 ring-2 ring-blue-400'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">Selected: {icon}</p>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-900 bg-opacity-30 border border-red-400 border-opacity-30 rounded-lg p-4">
            <p className="text-red-400">{errors.submit}</p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {isLoading ? 'Adding...' : 'Add Body Part'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBodyPartForm;
