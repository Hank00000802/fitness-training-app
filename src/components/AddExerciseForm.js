import React, { useState } from 'react';

/**
 * AddExerciseForm component - Add a custom exercise
 *
 * Features:
 * 1. Collect exercise info from user input
 * 2. Support image upload (convert to base64)
 * 3. Dynamically add/remove tips
 * 4. Form validation and error handling
 *
 * Props:
 * @param {Object} bodyPart   - current selected body part object
 * @param {Function} onSubmit - callback when submitting
 * @param {Function} onCancel - callback when canceling
 */
const AddExerciseForm = ({ bodyPart, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '此運動的簡單介紹',
    image: null,
    imagePreview: null,
    tips: ['']
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Please select an image file' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image file must be <= 5MB' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        image: e.target?.result,
        imagePreview: e.target?.result
      }));
    };
    reader.readAsDataURL(file);
    setErrors(prev => ({ ...prev, image: '' }));
  };

  const addTip = () => setFormData(prev => ({ ...prev, tips: [...prev.tips, ''] }));

  const removeTip = (index) => {
    if (formData.tips.length <= 1) return;
    setFormData(prev => ({ ...prev, tips: prev.tips.filter((_, i) => i !== index) }));
  };

  const updateTip = (index, value) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.map((tip, i) => (i === index ? value : tip))
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter an exercise name';
    const validTips = formData.tips.filter(tip => tip.trim());
    if (validTips.length === 0) newErrors.tips = 'Please enter at least one tip';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim() || 'N/A',
        image: formData.image || '/images/exercises/default.png',
        tips: formData.tips.filter(tip => tip.trim())
      };
      await onSubmit(submitData);
      // Success notice in English to avoid garbled characters
      window.alert('Exercise added successfully!');
    } catch (error) {
      console.error('Add exercise failed:', error);
      setErrors(prev => ({ ...prev, submit: 'Add exercise failed, please retry' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onCancel}
          className="text-white hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1">←</span>
          Back
        </button>

        <h1 className="text-xl font-bold text-white">
          Add Exercise - {bodyPart.name}
        </h1>

        <div className="w-8"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-6 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4">Exercise Info</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Exercise Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Machine Chest Fly"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the movement..."
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-6 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4">Exercise Image</h3>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
            >
              Choose Image
            </label>
            <p className="text-sm text-gray-400 mt-2">
              Supports JPG/PNG, max 5MB
            </p>
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {formData.imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Image Preview:</p>
              <div className="w-32 h-32 bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={formData.imagePreview}
                  alt="Exercise preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-6 border border-white border-opacity-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Tips *</h3>
            <button
              type="button"
              onClick={addTip}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
            >
              + Add
            </button>
          </div>

          <div className="space-y-3">
            {formData.tips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={tip}
                    onChange={(e) => updateTip(index, e.target.value)}
                    placeholder={`Tip ${index + 1}`}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {formData.tips.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTip(index)}
                    className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {errors.tips && (
            <p className="text-red-400 text-sm mt-2">{errors.tips}</p>
          )}
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
            {isLoading ? 'Adding...' : 'Add Exercise'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExerciseForm;
