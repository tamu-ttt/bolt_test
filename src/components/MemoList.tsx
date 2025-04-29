import React from 'react';
import { Memo } from '../types';
import { PlusCircle, Trash2 } from 'lucide-react';

interface MemoListProps {
  memos: Memo[];
  selectedMemoId: string | null;
  onSelectMemo: (id: string) => void;
  onCreateMemo: () => void;
  onDeleteMemo: (id: string) => void;
}

const MemoList: React.FC<MemoListProps> = ({ 
  memos, 
  selectedMemoId, 
  onSelectMemo, 
  onCreateMemo,
  onDeleteMemo
}) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white/50">
        <h2 className="text-lg font-semibold text-gray-800">メモ一覧</h2>
        <button 
          onClick={onCreateMemo}
          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
          aria-label="新規メモ作成"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {memos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500">
            <div className="w-16 h-16 mb-4 text-gray-400">
              <PlusCircle size={64} />
            </div>
            <p className="text-center">
              メモがありません<br />
              「+」ボタンを押して<br />新規メモを作成しましょう
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {memos.map(memo => (
              <li 
                key={memo.id}
                className={`relative hover:bg-blue-50/50 cursor-pointer transition-all duration-200 ${
                  selectedMemoId === memo.id ? 'bg-blue-100/50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div 
                  onClick={() => onSelectMemo(memo.id)}
                  className="p-4 pr-12"
                >
                  <h3 className="font-medium text-gray-900 truncate mb-1">
                    {memo.title || '無題のメモ'}
                  </h3>
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {memo.content || '内容なし'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(memo.updatedAt)}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMemo(memo.id);
                  }}
                  className="absolute right-3 top-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                  aria-label="メモを削除"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MemoList