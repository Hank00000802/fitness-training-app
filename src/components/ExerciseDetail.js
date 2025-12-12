import React, { useState, useEffect } from 'react';

const ExerciseDetail = ({ exercise, onBack, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [customTips, setCustomTips] = useState('');
  const [savedCustomTips, setSavedCustomTips] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  
  console.log('ExerciseDetail - exercise:', exercise);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const defaultImage = 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=%E6%88%AA%E5%9C%96';
  
  // Load custom tips for this exercise from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`customTips_${exercise.id}`);
    if (saved) {
      try {
        const parsedTips = JSON.parse(saved);
        setSavedCustomTips(Array.isArray(parsedTips) ? parsedTips : []);
      } catch (e) {
        // Fallback: legacy plain-text format separated by blank lines
        const oldFormat = saved.split('\n\n').filter(tip => tip.trim());
        setSavedCustomTips(oldFormat);
      }
    }
  }, [exercise.id]);
  
  // Save a new custom tip to localStorage
  const handleSaveCustomTip = () => {
    if (customTips.trim()) {
      const newCustomTips = [...savedCustomTips, customTips.trim()];
      setSavedCustomTips(newCustomTips);
      localStorage.setItem(`customTips_${exercise.id}`, JSON.stringify(newCustomTips));
      setCustomTips('');
    }
  };
  
  // Clear all custom tips for this exercise
  const handleClearCustomTips = () => {
    if (window.confirm('確定要清除所有自訂提示嗎？')) {
      setSavedCustomTips([]);
      localStorage.removeItem(`customTips_${exercise.id}`);
    }
  };
  
  // Start editing existing custom tips
  const handleStartEdit = () => {
    setEditText(savedCustomTips.join('\n\n'));
    setIsEditing(true);
  };
  
  // Save edited custom tips back to localStorage
  const handleSaveEdit = () => {
    const newTips = editText.split('\n\n').filter(tip => tip.trim());
    setSavedCustomTips(newTips);
    localStorage.setItem(`customTips_${exercise.id}`, JSON.stringify(newTips));
    setIsEditing(false);
    setEditText('');
  };
  
  // Cancel editing state
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText('');
  };
  
  // Delete a single custom tip and sync to localStorage
  const handleDeleteTip = (index) => {
    const newTips = savedCustomTips.filter((_, i) => i !== index);
    setSavedCustomTips(newTips);
    localStorage.setItem(`customTips_${exercise.id}`, JSON.stringify(newTips));
  };
  
  const maxLength = 500;
  const remainingChars = maxLength - customTips.length;
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-white hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1"></span>
          返回上一頁
        </button>
        <h1 className="text-xl font-bold text-white">
          {exercise.name} 詳細資訊
        </h1>
        <div className="w-8">
          {/* Allow deletion when handler is provided */}
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
              src={imageError ? defaultImage : exercise.image}
              alt={exercise.name}
              className="max-w-full max-h-64 object-contain"
              onError={handleImageError}
            />
          </div>
          <p className="text-center text-sm text-gray-300 mt-2">
            圖片預覽
          </p>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-2">
            動作描述
          </h3>
          <p className="text-gray-300">
            {exercise.description}
          </p>
        </div>
        
        <div className="space-y-3">
          {/* 原始提示 */}
          {exercise.tips.map((tip, index) => (
            <div
              key={`original-${index}`}
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
          
          {/* 自訂提示 */}
          {savedCustomTips.map((tip, index) => (
            <div
              key={`custom-${index}`}
              className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-400 border-opacity-30"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-blue-300">
                  Tip {exercise.tips.length + index + 1}
                </h3>
                <button
                  onClick={() => handleDeleteTip(index)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  刪除
                </button>
              </div>
              <p className="text-gray-300">
                {tip}
              </p>
            </div>
          ))}
        </div>
        
        {/* 自訂提示管理：編輯 / 新增 / 清除 */}
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">提示</span>
            自訂提示區
          </h3>
          
          {/* 編輯模式 */}
          {isEditing && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-blue-300">編輯自訂提示，使用空行分隔多筆</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded transition-colors"
                  >
                    儲存
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                rows="6"
                placeholder="在此編輯自訂提示，使用空行分隔多筆..."
              />
            </div>
          )}
          
          {/* 新增模式 */}
          {!isEditing && (
            <div className="space-y-3">
              <textarea
                value={customTips}
                onChange={(e) => setCustomTips(e.target.value)}
                placeholder="在此輸入自訂提示..."
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
                  新增提示
                </button>
                <span className={`text-xs ${remainingChars < 50 ? 'text-red-400' : 'text-gray-400'}`}>
                  {customTips.length}/{maxLength}
                </span>
              </div>
            </div>
          )}
          
          {/* 管理控制區 */}
          {savedCustomTips.length > 0 && !isEditing && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-600">
              <button
                onClick={handleStartEdit}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                編輯自訂提示
              </button>
              <button
                onClick={handleClearCustomTips}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                清除全部提示
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