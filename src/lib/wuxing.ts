import { BirthDate, WuxingAnalysis, WuxingType, WuxingElement } from '@/types';
import { 
  getGanZhi, 
  getMonthGanZhi, 
  getDayGanZhi, 
  getHourGanZhi,
  tianGanWuxing,
  diZhiWuxing,
  wuxingSheng,
  wuxingKe
} from '@/data/wuxing-data';

// 计算生辰八字的五行分布
export function calculateWuxing(birthDate: BirthDate): WuxingAnalysis {
  if (!birthDate.year || !birthDate.month || !birthDate.day) {
    return {
      elements: [],
      missing: [],
      balance: 0,
      recommendation: '请提供完整的生辰信息以进行五行分析'
    };
  }

  const { year, month, day, hour = 12 } = birthDate;

  // 计算四柱八字
  const yearGanZhi = getGanZhi(year);
  const monthGanZhi = getMonthGanZhi(year, month);
  const dayGanZhi = getDayGanZhi(year, month, day);
  const hourGanZhi = getHourGanZhi(dayGanZhi.charAt(0), hour);

  // 提取天干地支
  const gans = [
    yearGanZhi.charAt(0),
    monthGanZhi.charAt(0),
    dayGanZhi.charAt(0),
    hourGanZhi.charAt(0)
  ];
  
  const zhis = [
    yearGanZhi.charAt(1),
    monthGanZhi.charAt(1),
    dayGanZhi.charAt(1),
    hourGanZhi.charAt(1)
  ];

  // 统计五行分布
  const wuxingCount: Record<WuxingType, number> = {
    '金': 0,
    '木': 0,
    '水': 0,
    '火': 0,
    '土': 0
  };

  // 计算天干五行
  gans.forEach(gan => {
    const wuxing = tianGanWuxing[gan];
    if (wuxing) {
      wuxingCount[wuxing]++;
    }
  });

  // 计算地支五行
  zhis.forEach(zhi => {
    const wuxing = diZhiWuxing[zhi];
    if (wuxing) {
      wuxingCount[wuxing]++;
    }
  });

  // 找出缺失的五行
  const missing: WuxingType[] = [];
  const elements: WuxingElement[] = [];

  Object.entries(wuxingCount).forEach(([element, count]) => {
    if (count === 0) {
      missing.push(element as WuxingType);
    }
    if (count > 0) {
      elements.push({
        character: element,
        element: element as WuxingType
      });
    }
  });

  // 计算五行平衡度（0-100）
  const totalElements = Object.values(wuxingCount).reduce((sum, count) => sum + count, 0);
  const idealCount = totalElements / 5;
  const variance = Object.values(wuxingCount).reduce((sum, count) => {
    return sum + Math.pow(count - idealCount, 2);
  }, 0) / 5;
  const balance = Math.max(0, 100 - variance * 10);

  // 生成建议
  let recommendation = '';
  if (missing.length > 0) {
    recommendation = `命理缺${missing.join('、')}，建议在名字中补充${missing.join('、')}属性的字。`;
  } else {
    const maxElement = Object.entries(wuxingCount).reduce((max, [element, count]) => 
      count > max.count ? { element: element as WuxingType, count } : max
    , { element: '木' as WuxingType, count: 0 });
    
    if (maxElement.count > 3) {
      const restrainElement = Object.entries(wuxingKe).find(([_, target]) => target === maxElement.element)?.[0];
      if (restrainElement) {
        recommendation = `${maxElement.element}过旺，建议使用${restrainElement}属性的字来平衡。`;
      }
    } else {
      recommendation = '五行较为平衡，可根据个人喜好选择合适的字。';
    }
  }

  return {
    elements,
    missing,
    balance: Math.round(balance),
    recommendation
  };
}

// 根据五行缺失推荐字的五行属性
export function getRecommendedWuxing(wuxingAnalysis: WuxingAnalysis): WuxingType[] {
  if (wuxingAnalysis.missing.length > 0) {
    return wuxingAnalysis.missing;
  }
  
  // 如果没有缺失，返回相对较少的五行
  const elementCounts: Record<WuxingType, number> = {
    '金': 0,
    '木': 0,
    '水': 0,
    '火': 0,
    '土': 0
  };
  
  wuxingAnalysis.elements.forEach(element => {
    elementCounts[element.element]++;
  });
  
  const sortedElements = Object.entries(elementCounts)
    .sort(([,a], [,b]) => a - b)
    .slice(0, 2)
    .map(([element]) => element as WuxingType);
    
  return sortedElements;
}

// 检查五行相生相克关系
export function checkWuxingCompatibility(element1: WuxingType, element2: WuxingType): {
  relationship: 'sheng' | 'ke' | 'neutral';
  description: string;
} {
  if (wuxingSheng[element1] === element2) {
    return {
      relationship: 'sheng',
      description: `${element1}生${element2}，相生关系，有利于运势`
    };
  }
  
  if (wuxingKe[element1] === element2) {
    return {
      relationship: 'ke',
      description: `${element1}克${element2}，相克关系，需要注意平衡`
    };
  }
  
  return {
    relationship: 'neutral',
    description: `${element1}与${element2}关系平和`
  };
}