import React, { useState, useEffect } from 'react';
import { Memo } from './types';
import { getMemos, createMemo, updateMemo, deleteMemo } from './services/memoService';
import MemoList from './components/MemoList';
import MemoEditor from './components/MemoEditor';

function App() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  useEffect(() => {
    const loadedMemos = getMemos();
    setMemos(loadedMemos);
    
    if (loadedMemos.length > 0) {
      setSelectedMemoId(loadedMemos[0].id);
    }
    
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileView && selectedMemoId) {
      setShowSidebar(false);
    }
  }, [selectedMemoId, isMobileView]);

  const selectedMemo = memos.find(memo => memo.id === selectedMemoId) || null;

  const handleCreateMemo = () => {
    const newMemo = createMemo();
    setMemos([newMemo, ...memos]);
    setSelectedMemoId(newMemo.id);
    
    if (isMobileView) {
      setShowSidebar(false);
    }
  };

  const handleSelectMemo = (id: string) => {
    setSelectedMemoId(id);
  };

  const handleUpdateMemo = (updatedMemo: Memo) => {
    const updatedMemos = updateMemo(updatedMemo);
    setMemos(updatedMemos);
  };

  const handleDeleteMemo = (id: string) => {
    const updatedMemos = deleteMemo(id);
    setMemos(updatedMemos);
    
    if (id === selectedMemoId) {
      setSelectedMemoId(updatedMemos.length > 0 ? updatedMemos[0].id : null);
      
      if (isMobileView && updatedMemos.length === 0) {
        setShowSidebar(true);
      }
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">メモアプリ</h1>
          
          {isMobileView && (
            <button 
              onClick={toggleSidebar}
              className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              {showSidebar ? 'エディタを表示' : 'メモ一覧を表示'}
            </button>
          )}
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {(!isMobileView || showSidebar) && (
          <div className={`${isMobileView ? 'w-full' : 'w-1/3 md:w-1/4'} border-r border-gray-200 bg-white/80 backdrop-blur-sm`}>
            <MemoList
              memos={memos}
              selectedMemoId={selectedMemoId}
              onSelectMemo={handleSelectMemo}
              onCreateMemo={handleCreateMemo}
              onDeleteMemo={handleDeleteMemo}
            />
          </div>
        )}
        
        {(!isMobileView || !showSidebar) && (
          <div className={`${isMobileView ? 'w-full' : 'flex-1'} bg-white/90 backdrop-blur-sm`}>
            <MemoEditor
              selectedMemo={selectedMemo}
              onUpdateMemo={handleUpdateMemo}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;