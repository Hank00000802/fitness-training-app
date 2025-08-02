import React, { useState, useEffect } from 'react';

const CustomTipsManager = ({ exerciseData, onBack }) => {
  const [allCustomTips, setAllCustomTips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ���J�Ҧ��ۭq�`�N�ƶ�
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
          // �p�G�ѪR���ѡA�����®榡
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

  // �M���S�w�B�ʪ��`�N�ƶ�
  const handleClearExerciseTips = (exerciseId) => {
    if (window.confirm('�T�w�n�M���o�ӹB�ʪ��Ҧ��ۭq�`�N�ƶ��ܡH')) {
      localStorage.removeItem(`customTips_${exerciseId}`);
      setAllCustomTips(prev => prev.filter(tip => tip.exerciseId !== exerciseId));
    }
  };

  // �M���Ҧ��`�N�ƶ�
  const handleClearAllTips = () => {
    if (window.confirm('�T�w�n�M���Ҧ��B�ʪ��ۭq�`�N�ƶ��ܡH���ާ@�L�k�_��C')) {
      allCustomTips.forEach(tip => {
        localStorage.removeItem(`customTips_${tip.exerciseId}`);
      });
      setAllCustomTips([]);
    }
  };

  // �L�o�`�N�ƶ�
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
          <span className="mr-1">��</span>
          ��^
        </button>
        <h1 className="text-xl font-bold text-white">
          �ڪ��`�N�ƶ��޲z
        </h1>
        <div className="w-8"></div>
      </div>

      {allCustomTips.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">?</div>
          <h2 className="text-xl font-semibold text-white mb-2">
            �٨S���ۭq�`�N�ƶ�
          </h2>
          <p className="text-gray-400">
            �}�l���B�ʲK�[�z���ӤH�`�N�ƶ��a�I
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* �j�M�M�ާ@���s */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="�j�M�B�ʦW�٩Ϊ`�N�ƶ����e..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleClearAllTips}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              �M���Ҧ��`�N�ƶ�
            </button>
          </div>

          {/* �έp��T */}
          <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
            <div className="flex justify-between items-center text-sm text-gray-300">
              <span>�`�@ {allCustomTips.length} �ӹB�ʦ��ۭq�`�N�ƶ�</span>
              {searchTerm && (
                <span>�j�M���G�G{filteredTips.length} ��</span>
              )}
            </div>
          </div>

          {/* �`�N�ƶ��C�� */}
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
                    �M��
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
                �S�����ŦX�j�M���󪺪`�N�ƶ�
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomTipsManager; 