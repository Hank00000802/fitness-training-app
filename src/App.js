import React, { useState, useEffect } from 'react';
import BodyPartGrid from './components/BodyPartGrid';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import CustomTipsManager from './components/CustomTipsManager';
import { exerciseData } from './data/exerciseData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // �B�z�����^��
  useEffect(() => {
    const handlePopState = () => {
      // �ھڷ�e�������A�M�w��^�欰
      if (currentPage === 'exerciseDetail') {
        // �p�G�b�ʧ@�Ա����A��^�ʧ@�C��
        setCurrentPage('exerciseList');
        setSelectedExercise(null);
      } else if (currentPage === 'exerciseList') {
        // �p�G�b�ʧ@�C���A��^����
        setCurrentPage('home');
        setSelectedBodyPart(null);
      }
      // �p�G�b�����A��������B�z�]���s�����B�z�^
    };

    // ��ť�s������ popstate �ƥ�]�]�A�����^��^
    window.addEventListener('popstate', handlePopState);

    // �M�z�ƥ��ť��
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage]);

  // ��s�s�������v�O��
  useEffect(() => {
    // �ھڭ������A��s�s�������v�O��
    if (currentPage === 'home') {
      // �������ݭn�B�~�B�z
      return;
    }

    // ����L�����K�[���v�O��
    const pageTitle = currentPage === 'exerciseList' 
      ? `${selectedBodyPart?.name} �ʧ@�C��` 
      : `${selectedExercise?.name} �`�N�ƶ�`;
    
    // ��s�������D
    document.title = `${pageTitle} - �����V�m APP`;
    
    // �K�[���v�O��
    window.history.pushState(
      { page: currentPage, bodyPart: selectedBodyPart, exercise: selectedExercise },
      pageTitle,
      `#${currentPage}`
    );
  }, [currentPage, selectedBodyPart, selectedExercise]);

  const handleBodyPartSelect = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setCurrentPage('exerciseList');
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setCurrentPage('exerciseDetail');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedBodyPart(null);
    setSelectedExercise(null);
    // ��^�����ɡA�^���s�������v�O�����ڥؿ�
    window.history.pushState({ page: 'home' }, '�����V�m APP', '/');
  };

  const handleBackToList = () => {
    setCurrentPage('exerciseList');
    setSelectedExercise(null);
    // ��^�ʧ@�C��ɡA��s���v�O��
    window.history.pushState(
      { page: 'exerciseList', bodyPart: selectedBodyPart },
      `${selectedBodyPart?.name} �ʧ@�C�� - �����V�m APP`,
      `#exerciseList`
    );
  };

  const handleGoToCustomTips = () => {
    setCurrentPage('customTips');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div>
            <div className="mb-6">
              <button
                onClick={handleGoToCustomTips}
                className="w-full mb-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <span className="mr-2">????</span>
                ??��????????注�??�????
              </button>
            </div>
            <BodyPartGrid 
              bodyParts={exerciseData.bodyParts}
              onBodyPartSelect={handleBodyPartSelect}
            />
          </div>
        );
      case 'exerciseList':
        return (
          <ExerciseList
            bodyPart={selectedBodyPart}
            exercises={exerciseData.exercises[selectedBodyPart.id]}
            onExerciseSelect={handleExerciseSelect}
            onBack={handleBackToHome}
          />
        );
      case 'exerciseDetail':
        return (
          <ExerciseDetail
            exercise={selectedExercise}
            onBack={handleBackToList}
          />
        );
      case 'customTips':
        return (
          <CustomTipsManager
            exerciseData={exerciseData}
            onBack={handleBackToHome}
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