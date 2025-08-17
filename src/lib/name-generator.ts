import { NameRequest, GeneratedName, Character } from '@/types';
import { characters, getCharactersByGender, getCharactersByWuxing } from '@/data/characters';
import { getRecommendedCharacters } from '@/data/meanings';
import { calculateWuxing, getRecommendedWuxing } from './wuxing';

// 核心取名算法
export function generateNames(request: NameRequest): GeneratedName[] {
  const { surname, gender, birthDate, meanings = [], characterCount } = request;
  
  // 1. 五行分析
  const wuxingAnalysis = calculateWuxing(birthDate || {});
  const recommendedWuxing = getRecommendedWuxing(wuxingAnalysis);
  
  // 2. 根据性别筛选候选字符
  let candidateChars = getCharactersByGender(gender);
  
  // 3. 根据五行需求筛选
  if (recommendedWuxing.length > 0) {
    const wuxingChars = recommendedWuxing.flatMap(wuxing => 
      getCharactersByWuxing(wuxing)
    );
    candidateChars = candidateChars.filter(char => 
      wuxingChars.some(wc => wc.char === char.char)
    );
  }
  
  // 4. 根据寓意筛选（更宽松的匹配）
  if (meanings.length > 0) {
    const meaningChars = getRecommendedCharacters(meanings);
    const meaningFilteredChars = candidateChars.filter(char => 
      meaningChars.includes(char.char) || 
      char.commonMeanings.some(meaning => 
        meanings.some(m => meaning.includes(m) || m.includes(meaning))
      )
    );
    
    // 如果寓意筛选后字符太少，则放宽筛选条件
    if (meaningFilteredChars.length >= 10) {
      candidateChars = meaningFilteredChars;
    } else {
      // 保留更多字符，只要有任何相关性就保留
      candidateChars = candidateChars.filter(char => 
        meaningChars.includes(char.char) || 
        char.commonMeanings.some(meaning => 
          meanings.some(m => 
            meaning.toLowerCase().includes(m.toLowerCase()) || 
            m.toLowerCase().includes(meaning.toLowerCase()) ||
            meaning.includes('美') || meaning.includes('好') || meaning.includes('优')
          )
        )
      );
    }
  }
  
  // 5. 生成名字组合
  const generatedNames: GeneratedName[] = [];
  
  if (characterCount === 2) {
    // 生成两字名
    for (let i = 0; i < Math.min(candidateChars.length, 20); i++) {
      const char = candidateChars[i];
      const name = generateTwoCharacterName(surname, char, candidateChars, wuxingAnalysis);
      if (name) {
        generatedNames.push(name);
      }
    }
  } else if (characterCount === 3) {
    // 生成三字名
    for (let i = 0; i < Math.min(candidateChars.length, 15); i++) {
      for (let j = i + 1; j < Math.min(candidateChars.length, 15); j++) {
        const char1 = candidateChars[i];
        const char2 = candidateChars[j];
        const name = generateThreeCharacterName(surname, char1, char2, wuxingAnalysis);
        if (name) {
          generatedNames.push(name);
        }
      }
    }
  } else if (characterCount === 4) {
    // 生成四字名（复姓或特殊情况）
    for (let i = 0; i < Math.min(candidateChars.length, 10); i++) {
      for (let j = i + 1; j < Math.min(candidateChars.length, 10); j++) {
        const char1 = candidateChars[i];
        const char2 = candidateChars[j];
        const name = generateFourCharacterName(surname, char1, char2, wuxingAnalysis);
        if (name) {
          generatedNames.push(name);
        }
      }
    }
  }
  
  // 6. 评分排序
  const scoredNames = generatedNames
    .map(name => ({
      ...name,
      score: calculateNameScore(name, request)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8); // 返回前8个最佳结果
  
  return scoredNames;
}

// 生成两字名
function generateTwoCharacterName(
  surname: string, 
  char: Character, 
  candidateChars: Character[],
  wuxingAnalysis: any
): GeneratedName | null {
  const fullName = surname + char.char;
  
  return {
    fullName,
    characters: [char.char],
    meanings: char.commonMeanings,
    wuxingAnalysis,
    score: 0, // 将在后续计算
    explanation: `${char.char}字${char.meaning}，五行属${char.wuxing}，寓意${char.commonMeanings.join('、')}`
  };
}

// 生成三字名
function generateThreeCharacterName(
  surname: string,
  char1: Character,
  char2: Character,
  wuxingAnalysis: any
): GeneratedName | null {
  const fullName = surname + char1.char + char2.char;
  
  // 检查音韵搭配
  if (!checkPhoneticHarmony(char1.pinyin, char2.pinyin)) {
    return null;
  }
  
  const combinedMeanings = [...char1.commonMeanings, ...char2.commonMeanings];
  const explanation = `${char1.char}字${char1.meaning}，${char2.char}字${char2.meaning}，` +
    `五行为${char1.wuxing}${char2.wuxing}，寓意${combinedMeanings.slice(0, 4).join('、')}`;
  
  return {
    fullName,
    characters: [char1.char, char2.char],
    meanings: combinedMeanings,
    wuxingAnalysis,
    score: 0,
    explanation
  };
}

// 生成四字名
function generateFourCharacterName(
  surname: string,
  char1: Character,
  char2: Character,
  wuxingAnalysis: any
): GeneratedName | null {
  // 假设是复姓情况，或者特殊的四字名
  const fullName = surname + char1.char + char2.char;
  
  const combinedMeanings = [...char1.commonMeanings, ...char2.commonMeanings];
  const explanation = `${char1.char}字${char1.meaning}，${char2.char}字${char2.meaning}，` +
    `五行为${char1.wuxing}${char2.wuxing}，寓意${combinedMeanings.slice(0, 4).join('、')}`;
  
  return {
    fullName,
    characters: [char1.char, char2.char],
    meanings: combinedMeanings,
    wuxingAnalysis,
    score: 0,
    explanation
  };
}

// 检查音韵和谐度
function checkPhoneticHarmony(pinyin1: string, pinyin2: string): boolean {
  // 简化的音韵检查：避免相同声母或韵母
  const initial1 = pinyin1.charAt(0);
  const initial2 = pinyin2.charAt(0);
  
  // 避免相同声母
  if (initial1 === initial2) {
    return false;
  }
  
  // 避免都是同一类音（这里简化处理）
  const similarSounds = [
    ['b', 'p', 'm'],
    ['d', 't', 'n', 'l'],
    ['g', 'k', 'h'],
    ['j', 'q', 'x'],
    ['z', 'c', 's'],
    ['zh', 'ch', 'sh', 'r']
  ];
  
  for (const group of similarSounds) {
    if (group.includes(initial1) && group.includes(initial2)) {
      return false;
    }
  }
  
  return true;
}

// 计算名字综合评分
function calculateNameScore(name: GeneratedName, request: NameRequest): number {
  let score = 60; // 基础分
  
  // 五行匹配度 (30分)
  if (name.wuxingAnalysis.missing.length > 0) {
    const matchedElements = name.characters.filter(char => {
      const charData = characters.find(c => c.char === char);
      return charData && name.wuxingAnalysis.missing.includes(charData.wuxing);
    });
    score += (matchedElements.length / name.characters.length) * 30;
  } else {
    score += 20; // 五行平衡的情况
  }
  
  // 寓意匹配度 (20分)
  if (request.meanings && request.meanings.length > 0) {
    const meaningMatches = name.meanings.filter(meaning =>
      request.meanings!.some(reqMeaning => meaning.includes(reqMeaning))
    );
    score += (meaningMatches.length / Math.max(request.meanings.length, 1)) * 20;
  } else {
    score += 15; // 没有特定寓意要求时的默认分
  }
  
  // 音韵和谐度 (10分)
  if (name.characters.length > 1) {
    const chars = name.characters.map(char => 
      characters.find(c => c.char === char)
    ).filter(Boolean) as Character[];
    
    if (chars.length > 1) {
      const harmonyScore = checkPhoneticHarmony(chars[0].pinyin, chars[1].pinyin) ? 10 : 5;
      score += harmonyScore;
    }
  } else {
    score += 8;
  }
  
  // 随机调整，增加多样性
  score += Math.random() * 10 - 5;
  
  return Math.min(100, Math.max(0, Math.round(score)));
}