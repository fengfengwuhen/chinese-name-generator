// 基础类型定义
export interface BirthDate {
  year?: number;
  month?: number;
  day?: number;
  hour?: number; // 0-23小时制
}

export interface NameRequest {
  surname: string;
  gender: 'male' | 'female';
  birthDate?: BirthDate;
  meanings?: string[];
  characterCount: 2 | 3 | 4;
}

export interface GeneratedName {
  fullName: string;
  characters: string[];
  meanings: string[];
  wuxingAnalysis: WuxingAnalysis;
  score: number;
  explanation: string;
}

export interface WuxingAnalysis {
  elements: WuxingElement[];
  missing: WuxingType[];
  balance: number;
  recommendation: string;
}

export interface WuxingElement {
  character: string;
  element: WuxingType;
}

export type WuxingType = '金' | '木' | '水' | '火' | '土';

export interface Character {
  char: string;
  pinyin: string;
  meaning: string;
  wuxing: WuxingType;
  gender: 'male' | 'female' | 'neutral';
  stroke: number;
  commonMeanings: string[];
}

export interface MeaningCategory {
  category: string;
  meanings: string[];
  characters: string[];
}

// 时辰定义
export interface TimeSlot {
  name: string;
  startHour: number;
  endHour: number;
}