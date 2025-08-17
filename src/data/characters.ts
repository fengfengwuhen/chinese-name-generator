import { Character } from '@/types';

// 常用取名汉字库
export const characters: Character[] = [
  // 男性常用字
  { char: '伟', pinyin: 'wěi', meaning: '伟大、宏伟', wuxing: '土', gender: 'male', stroke: 11, commonMeanings: ['伟大', '宏伟', '卓越'] },
  { char: '强', pinyin: 'qiáng', meaning: '强壮、坚强', wuxing: '木', gender: 'male', stroke: 12, commonMeanings: ['强壮', '坚强', '有力'] },
  { char: '军', pinyin: 'jūn', meaning: '军队、军人', wuxing: '木', gender: 'male', stroke: 6, commonMeanings: ['军人', '勇敢', '正义'] },
  { char: '华', pinyin: 'huá', meaning: '华丽、中华', wuxing: '水', gender: 'neutral', stroke: 14, commonMeanings: ['华丽', '繁荣', '精华'] },
  { char: '明', pinyin: 'míng', meaning: '光明、聪明', wuxing: '火', gender: 'neutral', stroke: 8, commonMeanings: ['光明', '聪明', '清楚'] },
  { char: '志', pinyin: 'zhì', meaning: '志向、意志', wuxing: '火', gender: 'male', stroke: 7, commonMeanings: ['志向', '意志', '理想'] },
  { char: '勇', pinyin: 'yǒng', meaning: '勇敢、勇气', wuxing: '土', gender: 'male', stroke: 9, commonMeanings: ['勇敢', '勇气', '无畏'] },
  { char: '智', pinyin: 'zhì', meaning: '智慧、聪明', wuxing: '火', gender: 'neutral', stroke: 12, commonMeanings: ['智慧', '聪明', '才智'] },
  { char: '文', pinyin: 'wén', meaning: '文化、文雅', wuxing: '水', gender: 'neutral', stroke: 4, commonMeanings: ['文化', '文雅', '学问'] },
  { char: '武', pinyin: 'wǔ', meaning: '武艺、武力', wuxing: '水', gender: 'male', stroke: 8, commonMeanings: ['武艺', '武力', '勇武'] },
  
  // 女性常用字
  { char: '美', pinyin: 'měi', meaning: '美丽、美好', wuxing: '水', gender: 'female', stroke: 9, commonMeanings: ['美丽', '美好', '优美'] },
  { char: '丽', pinyin: 'lì', meaning: '美丽、华丽', wuxing: '火', gender: 'female', stroke: 7, commonMeanings: ['美丽', '华丽', '秀丽'] },
  { char: '雅', pinyin: 'yǎ', meaning: '优雅、雅致', wuxing: '木', gender: 'female', stroke: 12, commonMeanings: ['优雅', '雅致', '高雅'] },
  { char: '静', pinyin: 'jìng', meaning: '安静、宁静', wuxing: '金', gender: 'female', stroke: 16, commonMeanings: ['安静', '宁静', '平静'] },
  { char: '慧', pinyin: 'huì', meaning: '智慧、聪慧', wuxing: '水', gender: 'female', stroke: 15, commonMeanings: ['智慧', '聪慧', '贤慧'] },
  { char: '婷', pinyin: 'tíng', meaning: '美好、婷婷', wuxing: '火', gender: 'female', stroke: 12, commonMeanings: ['美好', '婷婷', '秀美'] },
  { char: '怡', pinyin: 'yí', meaning: '愉快、和悦', wuxing: '土', gender: 'female', stroke: 9, commonMeanings: ['愉快', '和悦', '舒适'] },
  { char: '欣', pinyin: 'xīn', meaning: '欣喜、欣然', wuxing: '木', gender: 'female', stroke: 8, commonMeanings: ['欣喜', '欣然', '快乐'] },
  { char: '琳', pinyin: 'lín', meaning: '美玉、琳琅', wuxing: '木', gender: 'female', stroke: 13, commonMeanings: ['美玉', '琳琅', '珍贵'] },
  { char: '瑶', pinyin: 'yáo', meaning: '美玉、瑶池', wuxing: '火', gender: 'female', stroke: 15, commonMeanings: ['美玉', '瑶池', '珍贵'] },
  
  // 中性字
  { char: '安', pinyin: 'ān', meaning: '安全、平安', wuxing: '土', gender: 'neutral', stroke: 6, commonMeanings: ['安全', '平安', '安定'] },
  { char: '乐', pinyin: 'lè', meaning: '快乐、音乐', wuxing: '火', gender: 'neutral', stroke: 5, commonMeanings: ['快乐', '音乐', '欢乐'] },
  { char: '和', pinyin: 'hé', meaning: '和谐、和平', wuxing: '水', gender: 'neutral', stroke: 8, commonMeanings: ['和谐', '和平', '温和'] },
  { char: '康', pinyin: 'kāng', meaning: '健康、康宁', wuxing: '木', gender: 'neutral', stroke: 11, commonMeanings: ['健康', '康宁', '安康'] },
  { char: '宁', pinyin: 'níng', meaning: '宁静、安宁', wuxing: '火', gender: 'neutral', stroke: 5, commonMeanings: ['宁静', '安宁', '平宁'] },
  { char: '福', pinyin: 'fú', meaning: '福气、幸福', wuxing: '水', gender: 'neutral', stroke: 13, commonMeanings: ['福气', '幸福', '福泽'] },
  { char: '祥', pinyin: 'xiáng', meaning: '吉祥、祥和', wuxing: '金', gender: 'neutral', stroke: 11, commonMeanings: ['吉祥', '祥和', '瑞祥'] },
  { char: '瑞', pinyin: 'ruì', meaning: '吉祥、瑞气', wuxing: '金', gender: 'neutral', stroke: 14, commonMeanings: ['吉祥', '瑞气', '祥瑞'] },
  { char: '嘉', pinyin: 'jiā', meaning: '美好、嘉奖', wuxing: '木', gender: 'neutral', stroke: 14, commonMeanings: ['美好', '嘉奖', '优秀'] },
  { char: '诚', pinyin: 'chéng', meaning: '诚实、真诚', wuxing: '金', gender: 'neutral', stroke: 14, commonMeanings: ['诚实', '真诚', '诚信'] },
  
  // 更多字符...
  { char: '天', pinyin: 'tiān', meaning: '天空、天然', wuxing: '火', gender: 'neutral', stroke: 4, commonMeanings: ['天空', '天然', '天赋'] },
  { char: '地', pinyin: 'dì', meaning: '大地、土地', wuxing: '土', gender: 'neutral', stroke: 6, commonMeanings: ['大地', '土地', '地位'] },
  { char: '山', pinyin: 'shān', meaning: '山峰、高山', wuxing: '土', gender: 'neutral', stroke: 3, commonMeanings: ['山峰', '高山', '稳重'] },
  { char: '水', pinyin: 'shuǐ', meaning: '水流、清水', wuxing: '水', gender: 'neutral', stroke: 4, commonMeanings: ['水流', '清水', '灵动'] },
  { char: '木', pinyin: 'mù', meaning: '树木、木材', wuxing: '木', gender: 'neutral', stroke: 4, commonMeanings: ['树木', '木材', '生长'] },
  { char: '金', pinyin: 'jīn', meaning: '黄金、金属', wuxing: '金', gender: 'neutral', stroke: 8, commonMeanings: ['黄金', '金属', '珍贵'] },
  { char: '火', pinyin: 'huǒ', meaning: '火焰、火热', wuxing: '火', gender: 'neutral', stroke: 4, commonMeanings: ['火焰', '火热', '热情'] },
  { char: '土', pinyin: 'tǔ', meaning: '土壤、大地', wuxing: '土', gender: 'neutral', stroke: 3, commonMeanings: ['土壤', '大地', '厚重'] },
  { char: '日', pinyin: 'rì', meaning: '太阳、日子', wuxing: '火', gender: 'neutral', stroke: 4, commonMeanings: ['太阳', '日子', '光明'] },
  { char: '月', pinyin: 'yuè', meaning: '月亮、月份', wuxing: '木', gender: 'neutral', stroke: 4, commonMeanings: ['月亮', '月份', '温柔'] },
  { char: '星', pinyin: 'xīng', meaning: '星星、明星', wuxing: '火', gender: 'neutral', stroke: 9, commonMeanings: ['星星', '明星', '闪耀'] },
  { char: '云', pinyin: 'yún', meaning: '云朵、云彩', wuxing: '水', gender: 'neutral', stroke: 4, commonMeanings: ['云朵', '云彩', '飘逸'] },
  { char: '风', pinyin: 'fēng', meaning: '风儿、风格', wuxing: '水', gender: 'neutral', stroke: 9, commonMeanings: ['风儿', '风格', '自由'] },
  { char: '雨', pinyin: 'yǔ', meaning: '雨水、下雨', wuxing: '水', gender: 'neutral', stroke: 8, commonMeanings: ['雨水', '下雨', '滋润'] },
  { char: '雪', pinyin: 'xuě', meaning: '雪花、雪白', wuxing: '水', gender: 'female', stroke: 11, commonMeanings: ['雪花', '雪白', '纯洁'] },
  { char: '花', pinyin: 'huā', meaning: '花朵、花卉', wuxing: '木', gender: 'female', stroke: 8, commonMeanings: ['花朵', '花卉', '美丽'] },
  { char: '草', pinyin: 'cǎo', meaning: '草地、草木', wuxing: '木', gender: 'neutral', stroke: 12, commonMeanings: ['草地', '草木', '生机'] },
  { char: '树', pinyin: 'shù', meaning: '树木、大树', wuxing: '木', gender: 'neutral', stroke: 16, commonMeanings: ['树木', '大树', '成长'] },
  { char: '林', pinyin: 'lín', meaning: '森林、树林', wuxing: '木', gender: 'neutral', stroke: 8, commonMeanings: ['森林', '树林', '茂盛'] },
  { char: '森', pinyin: 'sēn', meaning: '森林、茂密', wuxing: '木', gender: 'neutral', stroke: 12, commonMeanings: ['森林', '茂密', '繁茂'] },
];

// 根据性别筛选字符
export const getCharactersByGender = (gender: 'male' | 'female'): Character[] => {
  return characters.filter(char => 
    char.gender === gender || char.gender === 'neutral'
  );
};

// 根据五行筛选字符
export const getCharactersByWuxing = (wuxing: string): Character[] => {
  return characters.filter(char => char.wuxing === wuxing);
};

// 根据寓意筛选字符
export const getCharactersByMeaning = (meanings: string[]): Character[] => {
  return characters.filter(char => 
    meanings.some(meaning => 
      char.commonMeanings.some(cm => cm.includes(meaning))
    )
  );
};