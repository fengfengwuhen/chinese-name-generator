'use client'

import { motion } from 'framer-motion'
import { GeneratedName } from '@/types'

interface ResultsDisplayProps {
  results: GeneratedName[]
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (results.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">🤔</div>
          <p>暂未找到合适的名字</p>
          <p className="text-sm mt-2">请尝试调整筛选条件</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">推荐名字</h2>
        <p className="text-gray-600 mb-6">
          根据您的要求，为您精选了 {results.length} 个好名字
        </p>
      </div>

      <div className="space-y-4">
        {results.map((name, index) => (
          <motion.div
            key={name.fullName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-800 mr-4">
                    {name.fullName}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">综合评分</span>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                          style={{ width: `${name.score}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-semibold text-primary-600">
                        {name.score}分
                      </span>
                    </div>
                  </div>
                </div>

                {/* 五行分析 */}
                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 mr-2">五行属性：</span>
                    <div className="flex space-x-2">
                      {name.characters.map((char, charIndex) => {
                        // 这里需要从字符数据中获取五行属性
                        const wuxing = getCharacterWuxing(char)
                        return (
                          <span
                            key={charIndex}
                            className={`px-2 py-1 rounded text-xs font-medium border wuxing-${wuxing}`}
                          >
                            {char}({wuxing})
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  
                  {name.wuxingAnalysis.missing.length > 0 && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">五行补充：</span>
                      补{name.wuxingAnalysis.missing.join('、')}
                    </div>
                  )}
                </div>

                {/* 寓意解释 */}
                <div className="mb-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {name.explanation}
                  </p>
                </div>

                {/* 寓意标签 */}
                <div className="flex flex-wrap gap-2">
                  {name.meanings.slice(0, 6).map((meaning, meaningIndex) => (
                    <span
                      key={meaningIndex}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {meaning}
                    </span>
                  ))}
                </div>
              </div>

              {/* 排名标识 */}
              <div className="flex-shrink-0 ml-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-amber-600' : 
                  'bg-gray-300'
                }`}>
                  {index + 1}
                </div>
              </div>
            </div>

            {/* 详细分析（可展开） */}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-primary-600 hover:text-primary-700">
                查看详细分析
              </summary>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">五行分析</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {name.wuxingAnalysis.recommendation}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        五行平衡度：{name.wuxingAnalysis.balance}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">字义详解</h4>
                    <div className="space-y-1">
                      {name.characters.map((char, charIndex) => (
                        <div key={charIndex} className="text-xs text-gray-600">
                          <span className="font-medium">{char}：</span>
                          {getCharacterMeaning(char)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </motion.div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="text-center">
          <div className="text-2xl mb-2">💡</div>
          <h3 className="font-semibold text-gray-800 mb-2">取名建议</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            以上名字均根据传统五行理论和现代审美精心挑选。建议您结合家族传统、个人喜好等因素，
            选择最适合的名字。如需更多选择，可以调整筛选条件重新生成。
          </p>
        </div>
      </div>
    </div>
  )
}

// 辅助函数：获取字符的五行属性
function getCharacterWuxing(char: string): string {
  // 这里应该从字符数据库中查找，暂时返回默认值
  const wuxingMap: Record<string, string> = {
    '伟': '土', '强': '木', '军': '木', '华': '水', '明': '火',
    '志': '火', '勇': '土', '智': '火', '文': '水', '武': '水',
    '美': '水', '丽': '火', '雅': '木', '静': '金', '慧': '水',
    '婷': '火', '怡': '土', '欣': '木', '琳': '木', '瑶': '火',
    '安': '土', '乐': '火', '和': '水', '康': '木', '宁': '火',
    '福': '水', '祥': '金', '瑞': '金', '嘉': '木', '诚': '金'
  }
  return wuxingMap[char] || '木'
}

// 辅助函数：获取字符的含义
function getCharacterMeaning(char: string): string {
  const meaningMap: Record<string, string> = {
    '伟': '伟大、宏伟，寓意成就非凡',
    '强': '强壮、坚强，寓意意志坚定',
    '军': '军队、军人，寓意勇敢正义',
    '华': '华丽、中华，寓意繁荣昌盛',
    '明': '光明、聪明，寓意智慧通达',
    '美': '美丽、美好，寓意容貌出众',
    '雅': '优雅、雅致，寓意气质高雅',
    '静': '安静、宁静，寓意内心平和',
    '慧': '智慧、聪慧，寓意聪明伶俐'
  }
  return meaningMap[char] || '寓意美好'
}