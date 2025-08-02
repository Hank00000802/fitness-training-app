import React, { useState, useEffect } from 'react';

const ExerciseDetail = ({ exercise, onBack }) => {
  const [imageError, setImageError] = useState(false);
  const [customTips, setCustomTips] = useState('');
  const [savedCustomTips, setSavedCustomTips] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  
  console.log('ExerciseDetail - exercise:', exercise);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const defaultImage = 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=運動示意圖';
  
  // 載入已儲存的自訂注意事項
  useEffect(() => {
    const saved = localStorage.getItem(`customTips_${exercise.id}`);
    if (saved) {
      try {
        const parsedTips = JSON.parse(saved);
        setSavedCustomTips(Array.isArray(parsedTips) ? parsedTips : []);
      } catch (e) {
        // 如果解析失敗，嘗試舊格式
        const oldFormat = saved.split('\n\n').filter(tip => tip.trim());
        setSavedCustomTips(oldFormat);
      }
    }
  }, [exercise.id]);
  
  // 儲存自訂注意事項
  const handleSaveCustomTip = () => {
    if (customTips.trim()) {
      const newCustomTips = [...savedCustomTips, customTips.trim()];
      setSavedCustomTips(newCustomTips);
      localStorage.setItem(`customTips_${exercise.id}`, JSON.stringify(newCustomTips));
      setCustomTips('');
    }
  };
  
  // 清除所有自訂注意事項
  const handleClearCustomTips = () => {
    if (window.confirm('確定要清除所有自訂注意事項嗎？此操作無法復原。')) {
      setSavedCustomTips([]);
      localStorage.removeItem(`customTips_${exercise.id}`);
    }
  };
  
  // 開始編輯
  const handleStartEdit = () => {
    setEditText(savedCustomTips.join('\n\n'));
    setIsEditing(true);
  };
  
  // 儲存編輯
  const handleSaveEdit = () => {
    const newTips = editText.split('\n\n').filter(tip => tip.trim());
    setSavedCustomTips(newTips);
    localStorage.setItem(`customTips_${exercise.id}`, JSON.stringify(newTips));
    setIsEditing(false);
    setEditText('');
  };
  
  // 取消編輯
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText('');
  };
  
  // 刪除單條注意事項
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
          {/* 原始注意事項 */}
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
          
          {/* 自訂注意事項 */}
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
                  ✕
                </button>
              </div>
              <p className="text-gray-300">
                {tip}
              </p>
            </div>
          ))}
        </div>
        
        {/* 新增自訂注意事項區域 */}
        <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">📝</span>
            新增我的注意事項
          </h3>
          
          {/* 編輯模式 */}
          {isEditing && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-blue-300">編輯所有自訂注意事項：</h4>
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
                placeholder="每行一個注意事項..."
              />
            </div>
          )}
          
          {/* 新增模式 */}
          {!isEditing && (
            <div className="space-y-3">
              <textarea
                value={customTips}
                onChange={(e) => setCustomTips(e.target.value)}
                placeholder="輸入您自己的注意事項..."
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
                  新增注意事項
                </button>
                <span className={`text-xs ${remainingChars < 50 ? 'text-red-400' : 'text-gray-400'}`}>
                  {customTips.length}/{maxLength}
                </span>
              </div>
            </div>
          )}
          
          {/* 管理按鈕 */}
          {savedCustomTips.length > 0 && !isEditing && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-600">
              <button
                onClick={handleStartEdit}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                編輯所有自訂注意事項
              </button>
              <button
                onClick={handleClearCustomTips}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                清除所有自訂注意事項
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