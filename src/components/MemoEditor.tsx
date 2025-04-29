import React, { useState, useEffect } from 'react';
import { Memo } from '../types';

interface MemoEditorProps {
  selectedMemo: Memo | null;
  onUpdateMemo: (memo: Memo) => void;
}

const MemoEditor: React.FC<MemoEditorProps> = ({ selectedMemo, onUpdateMemo }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  
  useEffect(() => {
    if (selectedMemo) {
      setTitle(selectedMemo.title);
      setContent(selectedMemo.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedMemo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (selectedMemo) {
      onUpdateMemo({
        ...selectedMemo,
        title: e.target.value
      });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (selectedMemo) {
      onUpdateMemo({
        ...selectedMemo,
        content: e.target.value
      });
    }
  };

  if (!selectedMemo) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50/50">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-2">メモが選択されていません</p>
          <p className="text-sm text-gray-500">
            左側のメニューからメモを選択するか、<br />
            新規メモを作成してください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-white/50">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="タイトルを入力"
          className="w-full text-xl font-medium bg-transparent border-none outline-none placeholder-gray-400"
          aria-label="メモのタイトル"
        />
        <div className="text-xs text-gray-400 mt-2 flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          自動保存されます
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="ここにメモを入力してください..."
          className="w-full h-full p-6 resize-none outline-none bg-transparent"
          aria-label="メモの内容"
        />
      </div>
    </div>
  );
};

export default MemoEditor;