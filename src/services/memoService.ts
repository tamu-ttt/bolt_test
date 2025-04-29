import { Memo } from '../types';

const STORAGE_KEY = 'memo-app-data';

// ローカルストレージからメモを取得
export const getMemos = (): Memo[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return [];
  
  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error('メモデータの読み込みに失敗しました:', error);
    return [];
  }
};

// ローカルストレージにメモを保存
export const saveMemos = (memos: Memo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  } catch (error) {
    console.error('メモデータの保存に失敗しました:', error);
  }
};

// 新規メモの作成
export const createMemo = (): Memo => {
  const newMemo: Memo = {
    id: crypto.randomUUID(),
    title: '新しいメモ',
    content: '',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  const memos = getMemos();
  saveMemos([newMemo, ...memos]);
  
  return newMemo;
};

// メモの更新
export const updateMemo = (updatedMemo: Memo): Memo[] => {
  const memos = getMemos();
  const updatedMemos = memos.map(memo => 
    memo.id === updatedMemo.id ? {...updatedMemo, updatedAt: Date.now()} : memo
  );
  
  saveMemos(updatedMemos);
  return updatedMemos;
};

// メモの削除
export const deleteMemo = (id: string): Memo[] => {
  const memos = getMemos();
  const filteredMemos = memos.filter(memo => memo.id !== id);
  
  saveMemos(filteredMemos);
  return filteredMemos;
};