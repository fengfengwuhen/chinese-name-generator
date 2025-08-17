import { TimeSlot, WuxingType } from '@/types';

// 十二时辰定义
export const timeSlots: TimeSlot[] = [
  { name: '子时', startHour: 23, endHour: 1 },
  { name: '丑时', startHour: 1, endHour: 3 },
  { name: '寅时', startHour: 3, endHour: 5 },
  { name: '卯时', startHour: 5, endHour: 7 },
  { name: '辰时', startHour: 7, endHour: 9 },
  { name: '巳时', startHour: 9, endHour: 11 },
  { name: '午时', startHour: 11, endHour: 13 },
  { name: '未时', startHour: 13, endHour: 15 },
  { name: '申时', startHour: 15, endHour: 17 },
  { name: '酉时', startHour: 17, endHour: 19 },
  { name: '戌时', startHour: 19, endHour: 21 },
  { name: '亥时', startHour: 21, endHour: 23 },
];

// 天干
export const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
export const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干五行属性
export const tianGanWuxing: Record<string, WuxingType> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行属性
export const diZhiWuxing: Record<string, WuxingType> = {
  '子': '水', '亥': '水',
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '申': '金', '酉': '金',
  '辰': '土', '戌': '土', '丑': '土', '未': '土'
};

// 五行相生关系
export const wuxingSheng: Record<WuxingType, WuxingType> = {
  '木': '火',
  '火': '土',
  '土': '金',
  '金': '水',
  '水': '木'
};

// 五行相克关系
export const wuxingKe: Record<WuxingType, WuxingType> = {
  '木': '土',
  '火': '金',
  '土': '水',
  '金': '木',
  '水': '火'
};

// 根据小时获取时辰
export const getTimeSlotByHour = (hour: number): string => {
  const slot = timeSlots.find(slot => {
    if (slot.startHour > slot.endHour) {
      // 跨日的时辰（如子时）
      return hour >= slot.startHour || hour < slot.endHour;
    } else {
      return hour >= slot.startHour && hour < slot.endHour;
    }
  });
  return slot ? slot.name : '子时';
};

// 计算年份对应的天干地支
export const getGanZhi = (year: number): string => {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return tianGan[ganIndex] + diZhi[zhiIndex];
};

// 计算月份对应的天干地支（简化版）
export const getMonthGanZhi = (year: number, month: number): string => {
  // 这里使用简化的计算方法
  const yearGanIndex = (year - 4) % 10;
  const monthGanIndex = (yearGanIndex * 2 + month) % 10;
  const monthZhiIndex = (month + 1) % 12;
  return tianGan[monthGanIndex] + diZhi[monthZhiIndex];
};

// 计算日期对应的天干地支（简化版）
export const getDayGanZhi = (year: number, month: number, day: number): string => {
  // 这里使用简化的计算方法
  const totalDays = year * 365 + month * 30 + day;
  const ganIndex = totalDays % 10;
  const zhiIndex = totalDays % 12;
  return tianGan[ganIndex] + diZhi[zhiIndex];
};

// 计算时辰对应的天干地支
export const getHourGanZhi = (dayGan: string, hour: number): string => {
  const timeSlot = getTimeSlotByHour(hour);
  const zhiIndex = diZhi.findIndex(zhi => timeSlot.includes(zhi.charAt(0)));
  const dayGanIndex = tianGan.findIndex(gan => gan === dayGan);
  const hourGanIndex = (dayGanIndex * 2 + Math.floor(hour / 2)) % 10;
  return tianGan[hourGanIndex] + diZhi[zhiIndex >= 0 ? zhiIndex : 0];
};