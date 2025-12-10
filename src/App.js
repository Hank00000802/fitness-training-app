import React, { useState, useEffect, useCallback } from 'react';
import BodyPartGrid from './components/BodyPartGrid';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import AddExerciseForm from './components/AddExerciseForm';
import { exerciseData, addCustomExercise, getExercisesForBodyPart } from './data/exerciseData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleBackToHome = useCallback(() => {
    // 重置所有狀態
    setCurrentPage('home');
    setSelectedBodyPart(null);
    setSelectedExercise(null);
    
    // 重置防抖標記
    if (window.popStateHandler) {
      window.popStateHandler.isProcessingPopState = false;
    }
    
    // 重置 popstate 事件標記
    window.isPopStateEvent = false;
    
    // 完全清理瀏覽器歷史記錄，回到乾淨的首頁狀態
    window.history.replaceState(
      { page: 'home' },
      'Fitness Training App',
      '/'
    );
    
    // 更新頁面標題
    document.title = 'Fitness Training App';
    
    console.log('System state has been fully reset');
  }, []);

  const handleBackToList = useCallback(() => {
    setCurrentPage('exerciseList');
    setSelectedExercise(null);
    // 從詳情頁返回列表頁時，需要替換當前的歷史記錄
    // 這樣當用戶再次按返回時，會回到首頁而不是詳情頁
    window.history.replaceState(
      { page: 'exerciseList', bodyPart: selectedBodyPart, exercise: null },
      `${selectedBodyPart?.name} Exercises`,
      '#exerciseList'
    );
  }, [selectedBodyPart]);

  const handleAddExercise = () => {
    setCurrentPage('addExercise');
  };

  const handleSubmitExercise = async (exerciseData) => {
    if (!selectedBodyPart) {
      return;
    }
    addCustomExercise(selectedBodyPart.id, exerciseData);
    window.alert('Exercise added successfully!');
    setCurrentPage('exerciseList');
  };

  const handleCancelAddExercise = useCallback(() => {
    setCurrentPage('exerciseList');
  }, []);

  // 處理手機返回鍵
  useEffect(() => {
    // 防抖標記，防止快速連續按返回鍵
    let isProcessingPopState = false;
    
    const handlePopState = () => {
      // 如果正在處理前一個 popstate 事件，則忽略
      if (isProcessingPopState) {
        return;
      }
      
      // 設置處理標記
      isProcessingPopState = true;
      
      // 設置標記，表示這是 popstate 事件
      window.isPopStateEvent = true;
      
      // 根據當前頁面狀態決定返回行為
      if (currentPage === 'exerciseDetail') {
        // 如果在動作詳情頁，返回動作列表
        // 直接調用 handleBackToList
        handleBackToList();
      } else if (currentPage === 'addExercise') {
        handleCancelAddExercise();
      } else if (currentPage === 'exerciseList') {
        // 如果在動作列表頁，返回首頁
        // 直接調用 handleBackToHome，與左上角返回鍵完全一致
        handleBackToHome();
      }
      // 如果在首頁，不做任何處理（讓瀏覽器處理）
      
      // 延遲重置處理標記，防止快速連續觸發
      setTimeout(() => {
        isProcessingPopState = false;
      }, 300); // 300ms 的防抖延遲
    };
    
    // 將處理器暴露到全局，以便外部重置
    window.popStateHandler = { isProcessingPopState };
    
    // 監聽瀏覽器的 popstate 事件（包括手機返回鍵）
    window.addEventListener('popstate', handlePopState);

    // 清理事件監聽器
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage, selectedBodyPart, handleBackToList, handleBackToHome, handleCancelAddExercise]);

  // 更新瀏覽器歷史記錄
  useEffect(() => {
    // 根據頁面狀態更新瀏覽器歷史記錄
    if (currentPage === 'home') {
      // 首頁不需要額外處理
      return;
    }

    // 為其他頁面添加歷史記錄
    const pageTitle = currentPage === 'exerciseList' 
      ? `${selectedBodyPart?.name} Exercises` 
      : currentPage === 'addExercise'
      ? `Add Exercise - ${selectedBodyPart?.name}`
      : `${selectedExercise?.name} Tips`;
    
    // 更新頁面標題
    document.title = `${pageTitle} - Fitness Training App`;
    
    // 使用 pushState 添加新的歷史記錄，保持完整的導航歷史
    // 但只在用戶主動導航時添加，不在 popstate 事件後添加
    if (!window.isPopStateEvent) {
      window.history.pushState(
        { page: currentPage, bodyPart: selectedBodyPart, exercise: selectedExercise },
        pageTitle,
        `#${currentPage}`
      );
    }
    // 重置標記
    window.isPopStateEvent = false;
  }, [currentPage, selectedBodyPart, selectedExercise]);

  const handleBodyPartSelect = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setCurrentPage('exerciseList');
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setCurrentPage('exerciseDetail');
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
            exercises={getExercisesForBodyPart(selectedBodyPart?.id)}
            onExerciseSelect={handleExerciseSelect}
            onBack={handleBackToHome}
            onAddExercise={handleAddExercise}
          />
        );
      case 'exerciseDetail':
        return (
          <ExerciseDetail
            exercise={selectedExercise}
            onBack={handleBackToHome}
          />
        );
      case 'addExercise':
        return (
          <AddExerciseForm
            bodyPart={selectedBodyPart}
            onSubmit={handleSubmitExercise}
            onCancel={handleCancelAddExercise}
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