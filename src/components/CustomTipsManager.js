import React, { useState, useEffect } from 'react';

const CustomTipsManager = ({ exerciseData, onBack }) => {
  const [allCustomTips, setAllCustomTips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 載入所有自訂注意事項
  useEffect(() => {
    const tips = [];
    Object.values(exerciseData.exercises).flat().forEach(exercise => {
      const savedTips = localStorage.getItem(`customTips_${exercise.id}`);
      if (savedTips && savedTips.trim()) {
        try {
          const parsedTips = JSON.parse(savedTips);
          if (Array.isArray(parsedTips) && parsedTips.length > 0) {
            tips.push({
              exerciseId: exercise.id,
              exerciseName: exercise.name,
              bodyPart: Object.keys(exerciseData.exercises).find(key => 
                exerciseData.exercises[key].some(ex => ex.id === exercise.id)
              ),
              tips: parsedTips
            });
          }
        } catch (e) {
          // 如果解析失敗，嘗試舊格式
          const oldFormat = savedTips.split('\n\n').filter(tip => tip.trim());
          if (oldFormat.length > 0) {
            tips.push({
              exerciseId: exercise.id,
              exerciseName: exercise.name,
              bodyPart: Object.keys(exerciseData.exercises).find(key => 
                exerciseData.exercises[key].some(ex => ex.id === exercise.id)
              ),
              tips: oldFormat
            });
          }
        }
      }
    });
    setAllCustomTips(tips);
  }, [exerciseData]);

  // 清除特定運動的注意事項
  const handleClearExerciseTips = (exerciseId) => {
    if (window.confirm('確定要清除這個運動的所有自訂注意事項嗎？')) {
      localStorage.removeItem(`customTips_${exerciseId}`);
      setAllCustomTips(prev => prev.filter(tip => tip.exerciseId !== exerciseId));
    }
  };

  // 清除所有注意事項
  const handleClearAllTips = () => {
    if (window.confirm('確定要清除所有運動的自訂注意事項嗎？此操作無法復原。')) {
      allCustomTips.forEach(tip => {
        localStorage.removeItem(`customTips_${tip.exerciseId}`);
      });
      setAllCustomTips([]);
    }
  };

  // 過濾注意事項
  const filteredTips = allCustomTips.filter(tip =>
    tip.exerciseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.tips.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getBodyPartName = (bodyPartId) => {
    const bodyPart = exerciseData.bodyParts.find(bp => bp.id === bodyPartId);
    return bodyPart ? bodyPart.name : bodyPartId;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-white hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1">←</span>
          返回
        </button>
        <h1 className="text-xl font-bold text-white">
          我的注意事項管理
        </h1>
        <div className="w-8"></div>
      </div>

      {allCustomTips.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">?</div>
          <h2 className="text-xl font-semibold text-white mb-2">
            還沒有自訂注意事項
          </h2>
          <p className="text-gray-400">
            開始為運動添加您的個人注意事項吧！
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 搜尋和操作按鈕 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜尋運動名稱或注意事項內容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleClearAllTips}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              清除所有注意事項
            </button>
          </div>

          {/* 統計資訊 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
            <div className="flex justify-between items-center text-sm text-gray-300">
              <span>總共 {allCustomTips.length} 個運動有自訂注意事項</span>
              {searchTerm && (
                <span>搜尋結果：{filteredTips.length} 個</span>
              )}
            </div>
          </div>

          {/* 注意事項列表 */}
          <div className="space-y-4">
            {filteredTips.map((tip) => (
              <div
                key={tip.exerciseId}
                className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {tip.exerciseName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {getBodyPartName(tip.bodyPart)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleClearExerciseTips(tip.exerciseId)}
                    className="text-red-400 hover:text-red-300 transition-colors text-sm"
                  >
                    清除
                  </button>
                </div>
                <div className="bg-blue-900 bg-opacity-30 rounded-lg p-3 border border-blue-400 border-opacity-30">
                  {tip.tips.map((customTip, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <div className="text-gray-300 text-sm">
                        <span className="text-blue-300 font-semibold">Tip {index + 1}: </span>
                        {customTip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {searchTerm && filteredTips.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">
                沒有找到符合搜尋條件的注意事項
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomTipsManager; 