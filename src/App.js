import React, { useState, useEffect } from 'react';
import BodyPartGrid from './components/BodyPartGrid';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import { exerciseData } from './data/exerciseData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // 處理手機返回鍵
  useEffect(() => {
    const handlePopState = () => {
      // 根據當前頁面狀態決定返回行為
      if (currentPage === 'exerciseDetail') {
        // 如果在動作詳情頁，返回動作列表
        setCurrentPage('exerciseList');
        setSelectedExercise(null);
      } else if (currentPage === 'exerciseList') {
        // 如果在動作列表頁，返回首頁
        setCurrentPage('home');
        setSelectedBodyPart(null);
      }
      // 如果在首頁，不做任何處理（讓瀏覽器處理）
    };

    // 監聽瀏覽器的 popstate 事件（包括手機返回鍵）
    window.addEventListener('popstate', handlePopState);

    // 清理事件監聽器
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage]);

  // 更新瀏覽器歷史記錄
  useEffect(() => {
    // 根據頁面狀態更新瀏覽器歷史記錄
    if (currentPage === 'home') {
      // 首頁不需要額外處理
      return;
    }

    // 為其他頁面添加歷史記錄
    const pageTitle = currentPage === 'exerciseList' 
      ? `${selectedBodyPart?.name} 動作列表` 
      : `${selectedExercise?.name} 注意事項`;
    
    // 更新頁面標題
    document.title = `${pageTitle} - 健身訓練 APP`;
    
    // 添加歷史記錄
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
    // 返回首頁時，回到瀏覽器歷史記錄的根目錄
    window.history.pushState({ page: 'home' }, '健身訓練 APP', '/');
  };

  const handleBackToList = () => {
    setCurrentPage('exerciseList');
    setSelectedExercise(null);
    // 返回動作列表時，更新歷史記錄
    window.history.pushState(
      { page: 'exerciseList', bodyPart: selectedBodyPart },
      `${selectedBodyPart?.name} 動作列表 - 健身訓練 APP`,
      `#exerciseList`
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <BodyPartGrid 
            bodyParts={exerciseData.bodyParts}
            onBodyPartSelect={handleBodyPartSelect}
          />
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