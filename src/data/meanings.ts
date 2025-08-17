import { MeaningCategory } from '@/types';

// 寓意分类数据
export const meaningCategories: MeaningCategory[] = [
  {
    category: '品德修养',
    meanings: ['仁爱', '诚信', '谦逊', '勇敢', '正义', '善良', '忠诚', '孝顺'],
    characters: ['仁', '诚', '谦', '勇', '正', '善', '忠', '孝', '德', '义', '礼', '信']
  },
  {
    category: '才华智慧',
    meanings: ['聪慧', '博学', '文雅', '艺术', '创新', '才华', '智慧', '学识'],
    characters: ['智', '慧', '博', '文', '雅', '艺', '创', '才', '学', '书', '诗', '画']
  },
  {
    category: '事业成功',
    meanings: ['成功', '领导', '创业', '稳重', '进取', '奋斗', '成就', '辉煌'],
    characters: ['成', '功', '领', '创', '稳', '进', '奋', '就', '辉', '煌', '业', '达']
  },
  {
    category: '健康平安',
    meanings: ['长寿', '健康', '活力', '平安', '康宁', '福泽', '吉祥', '安康'],
    characters: ['寿', '康', '健', '活', '安', '平', '福', '祥', '吉', '泽', '宁', '和']
  },
  {
    category: '自然美景',
    meanings: ['山水', '花草', '日月', '四季', '清风', '明月', '青山', '绿水'],
    characters: ['山', '水', '花', '草', '日', '月', '春', '夏', '秋', '冬', '风', '雨']
  },
  {
    category: '美好品质',
    meanings: ['温柔', '优雅', '纯洁', '美丽', '善良', '贤淑', '端庄', '秀美'],
    characters: ['温', '柔', '雅', '纯', '洁', '美', '丽', '善', '贤', '淑', '端', '秀']
  },
  {
    category: '志向理想',
    meanings: ['远大', '理想', '抱负', '志向', '梦想', '追求', '目标', '愿望'],
    characters: ['远', '大', '理', '想', '抱', '负', '志', '向', '梦', '追', '求', '愿']
  },
  {
    category: '家庭和睦',
    meanings: ['和谐', '团结', '温馨', '幸福', '美满', '和睦', '亲情', '温暖'],
    characters: ['和', '谐', '团', '结', '温', '馨', '幸', '福', '满', '睦', '亲', '暖']
  }
];

// 获取指定寓意的推荐字符
export const getCharactersByMeaningCategory = (category: string): string[] => {
  const found = meaningCategories.find(cat => cat.category === category);
  return found ? found.characters : [];
};

// 获取所有寓意选项
export const getAllMeanings = (): string[] => {
  return meaningCategories.flatMap(cat => cat.meanings);
};

// 根据寓意关键词获取相关字符
export const getRecommendedCharacters = (meanings: string[]): string[] => {
  const recommendedChars = new Set<string>();
  
  meanings.forEach(meaning => {
    meaningCategories.forEach(category => {
      if (category.meanings.includes(meaning)) {
        category.characters.forEach(char => recommendedChars.add(char));
      }
    });
  });
  
  return Array.from(recommendedChars);
};