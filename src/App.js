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
  const [removedExerciseIds, setRemovedExerciseIds] = useState([]);

  const handleBackToHome = useCallback(() => {
    // ���m�Ҧ����A
    setCurrentPage('home');
    setSelectedBodyPart(null);
    setSelectedExercise(null);
    
    // ���m���ݼаO
    if (window.popStateHandler) {
      window.popStateHandler.isProcessingPopState = false;
    }
    
    // ���m popstate �ƥ�аO
    window.isPopStateEvent = false;
    
    // �����M�z�s�������v�O���A�^�찮�b���������A
    window.history.replaceState(
      { page: 'home' },
      'Fitness Training App',
      '/'
    );
    
    // ��s�������D
    document.title = 'Fitness Training App';
    
    console.log('System state has been fully reset');
  }, []);

  const handleBackToList = useCallback(() => {
    setCurrentPage('exerciseList');
    setSelectedExercise(null);
    // �q�Ա�����^�C�����ɡA�ݭn�������e�����v�O��
    // �o�˷��Τ�A������^�ɡA�|�^�쭺���Ӥ��O�Ա���
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
  

  // key to force re-render of lists when localStorage changes
  const [, setRefreshKey] = useState(0);

  // load removed built-in exercises
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('removedExerciseIds');
      if (stored) {
        const parsed = JSON.parse(stored);
        setRemovedExerciseIds(Array.isArray(parsed) ? parsed : []);
      }
    } catch (err) {
      console.error('Failed to load removed exercises', err);
      setRemovedExerciseIds([]);
    }
  }, []);

  const handleDeleteExercise = useCallback((exerciseId) => {
    if (!selectedBodyPart) return;
    try {
      const isCustom =
        (selectedExercise && selectedExercise.id === exerciseId && selectedExercise.isCustom) ||
        String(exerciseId).startsWith('custom_');

      if (isCustom) {
        const stored = window.localStorage.getItem('customExercises');
        const data = stored ? JSON.parse(stored) : {};
        const list = data[selectedBodyPart.id] || [];
        const newList = list.filter(e => e.id !== exerciseId);
        if (newList.length) {
          data[selectedBodyPart.id] = newList;
        } else {
          delete data[selectedBodyPart.id];
        }
        window.localStorage.setItem('customExercises', JSON.stringify(data));
      } else {
        const storedRemoved = window.localStorage.getItem('removedExerciseIds');
        const removed = storedRemoved ? JSON.parse(storedRemoved) : [];
        const newRemoved = Array.from(new Set([...removed, exerciseId]));
        window.localStorage.setItem('removedExerciseIds', JSON.stringify(newRemoved));
        setRemovedExerciseIds(newRemoved);
      }

      // if viewing deleted exercise, go back to list
      if (selectedExercise && selectedExercise.id === exerciseId) {
        setSelectedExercise(null);
        setCurrentPage('exerciseList');
      }
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Failed to delete custom exercise', err);
    }
  }, [selectedBodyPart, selectedExercise]);

  // �B�z�����^��
  useEffect(() => {
    // ���ݼаO�A����ֳt�s�����^��
    let isProcessingPopState = false;
    
    const handlePopState = () => {
      // �p�G���b�B�z�e�@�� popstate �ƥ�A�h����
      if (isProcessingPopState) {
        return;
      }
      
      // �]�m�B�z�аO
      isProcessingPopState = true;
      
      // �]�m�аO�A���ܳo�O popstate �ƥ�
      window.isPopStateEvent = true;
      
      // �ھڷ��e�������A�M�w��^�欰
      if (currentPage === 'exerciseDetail') {
        // �p�G�b�ʧ@�Ա����A��^�ʧ@�C��
        // �����ե� handleBackToList
        handleBackToList();
      } else if (currentPage === 'addExercise') {
        handleCancelAddExercise();
      } else if (currentPage === 'exerciseList') {
        // �p�G�b�ʧ@�C�����A��^����
        // �����ե� handleBackToHome�A�P���W����^�䧹���@�P
        handleBackToHome();
      }
      // �p�G�b�����A��������B�z�]���s�����B�z�^
      
      // ���𭫸m�B�z�аO�A����ֳt�s��Ĳ�o
      setTimeout(() => {
        isProcessingPopState = false;
      }, 300); // 300ms �����ݩ���
    };
    
    // �N�B�z�����S������A�H�K�~�����m
    window.popStateHandler = { isProcessingPopState };
    
    // ��ť�s������ popstate �ƥ�]�]�A�����^��^
    window.addEventListener('popstate', handlePopState);

    // �M�z�ƥ��ť��
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage, selectedBodyPart, handleBackToList, handleBackToHome, handleCancelAddExercise]);

  // ��s�s�������v�O��
  useEffect(() => {
    // �ھڭ������A��s�s�������v�O��
    if (currentPage === 'home') {
      // �������ݭn�B�~�B�z
      return;
    }

    // ����L�����K�[���v�O��
    const pageTitle = currentPage === 'exerciseList' 
      ? `${selectedBodyPart?.name} Exercises` 
      : currentPage === 'addExercise'
      ? `Add Exercise - ${selectedBodyPart?.name}`
      : `${selectedExercise?.name} Tips`;
    
    // ��s�������D
    document.title = `${pageTitle} - Fitness Training App`;
    
    // �ϥ� pushState �K�[�s�����v�O���A�O�����㪺�ɯ���v
    // ���u�b�Τ�D�ʾɯ�ɲK�[�A���b popstate �ƥ��K�[
    if (!window.isPopStateEvent) {
      window.history.pushState(
        { page: currentPage, bodyPart: selectedBodyPart, exercise: selectedExercise },
        pageTitle,
        `#${currentPage}`
      );
    }
    // ���m�аO
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
        const filteredExercises = getExercisesForBodyPart(selectedBodyPart?.id)
          .filter(ex => !removedExerciseIds.includes(ex.id));
        return (
          <ExerciseList
            bodyPart={selectedBodyPart}
            exercises={filteredExercises}
            onExerciseSelect={handleExerciseSelect}
            onBack={handleBackToHome}
            onAddExercise={handleAddExercise}
            onDelete={handleDeleteExercise}
          />
        );
      case 'exerciseDetail':
        return (
          <ExerciseDetail
            exercise={selectedExercise}
            onBack={handleBackToHome}
            onDelete={handleDeleteExercise}
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