'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import NameForm from '@/components/forms/NameForm'
import ResultsDisplay from '@/components/results/ResultsDisplay'
import { GeneratedName, NameRequest } from '@/types'
import { generateNames } from '@/lib/name-generator'

export default function Home() {
  const [results, setResults] = useState<GeneratedName[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleGenerateNames = async (request: NameRequest) => {
    setIsLoading(true)
    setShowResults(false)
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const generatedNames = generateNames(request)
      setResults(generatedNames)
      setShowResults(true)
    } catch (error) {
      console.error('生成名字时出错:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResults([])
    setShowResults(false)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 头部标题 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          中文取名助手
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          结合传统五行理论与现代审美，为您的宝宝起一个寓意深远、朗朗上口的好名字
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 左侧：输入表单 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NameForm 
            onSubmit={handleGenerateNames}
            isLoading={isLoading}
            onReset={handleReset}
            showReset={showResults}
          />
        </motion.div>

        {/* 右侧：结果展示 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isLoading && (
            <div className="card">
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
                <p className="text-gray-600">正在为您精心挑选好名字...</p>
              </div>
            </div>
          )}

          {showResults && !isLoading && (
            <ResultsDisplay results={results} />
          )}

          {!showResults && !isLoading && (
            <div className="card">
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-lg">请填写左侧表单开始取名</p>
                <p className="text-sm mt-2">我们将根据您的需求生成最适合的名字</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* 底部说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="card max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">取名原理</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <div className="text-2xl mb-2">🔮</div>
              <h4 className="font-medium mb-2">五行平衡</h4>
              <p>根据生辰八字分析五行缺失，选择合适五行属性的汉字进行补充</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-medium mb-2">寓意深远</h4>
              <p>结合您的期望寓意，从传统文化中挑选含义美好的汉字组合</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎵</div>
              <h4 className="font-medium mb-2">音韵和谐</h4>
              <p>注重声调搭配和音律美感，确保名字朗朗上口、易于记忆</p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}