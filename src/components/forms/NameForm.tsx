'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { nameFormSchema, type NameFormData, validateBirthDate, validateDateLogic } from '@/lib/validation'
import { meaningCategories } from '@/data/meanings'
import { timeSlots } from '@/data/wuxing-data'
import { NameRequest } from '@/types'

interface NameFormProps {
  onSubmit: (request: NameRequest) => void
  isLoading: boolean
  onReset: () => void
  showReset: boolean
}

export default function NameForm({ onSubmit, isLoading, onReset, showReset }: NameFormProps) {
  const [showBirthDate, setShowBirthDate] = useState(true)
  const [selectedMeanings, setSelectedMeanings] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<NameFormData>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      characterCount: '2' as any,
      gender: 'male'
    }
  })

  const watchedValues = watch()

  const handleFormSubmit = (data: NameFormData) => {
    // 验证生辰八字完整性
    if (!validateBirthDate(data)) {
      toast.error('如果填写生辰八字，请填写完整的年月日信息')
      return
    }

    // 验证日期逻辑
    const dateError = validateDateLogic(data.birthYear, data.birthMonth, data.birthDay)
    if (dateError) {
      toast.error(dateError)
      return
    }

    // 转换为NameRequest格式
    const request: NameRequest = {
      surname: data.surname,
      gender: data.gender,
      characterCount: parseInt(data.characterCount as string) as 2 | 3 | 4,
      meanings: selectedMeanings,
      birthDate: data.birthYear && data.birthMonth && data.birthDay ? {
        year: data.birthYear,
        month: data.birthMonth,
        day: data.birthDay,
        hour: data.birthHour
      } : undefined
    }

    onSubmit(request)
  }

  const handleReset = () => {
    reset()
    setSelectedMeanings([])
    setShowBirthDate(false)
    onReset()
  }

  const toggleMeaning = (meaning: string) => {
    setSelectedMeanings(prev => 
      prev.includes(meaning) 
        ? prev.filter(m => m !== meaning)
        : [...prev, meaning]
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">取名信息</h2>
        {showReset && (
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary text-sm"
          >
            重新填写
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* 必填信息 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">基本信息</h3>
          
          {/* 姓氏 */}
          <div>
            <label className="label">
              姓氏 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('surname')}
              type="text"
              placeholder="请输入姓氏，如：张、欧阳"
              className="input-field"
            />
            {errors.surname && (
              <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>
            )}
          </div>

          {/* 性别 */}
          <div>
            <label className="label">
              性别 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  {...register('gender')}
                  type="radio"
                  value="male"
                  className="mr-2 text-primary-500"
                />
                <span>男</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('gender')}
                  type="radio"
                  value="female"
                  className="mr-2 text-primary-500"
                />
                <span>女</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* 名字字数 */}
          <div>
            <label className="label">
              名字字数 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  {...register('characterCount')}
                  type="radio"
                  value="2"
                  className="mr-2 text-primary-500"
                />
                <span>2个字</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('characterCount')}
                  type="radio"
                  value="3"
                  className="mr-2 text-primary-500"
                />
                <span>3个字</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('characterCount')}
                  type="radio"
                  value="4"
                  className="mr-2 text-primary-500"
                />
                <span>4个字</span>
              </label>
            </div>
            {errors.characterCount && (
              <p className="text-red-500 text-sm mt-1">{errors.characterCount.message}</p>
            )}
          </div>
        </div>

        {/* 生辰八字（选填） */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">生辰八字（选填）</h3>
            <button
              type="button"
              onClick={() => setShowBirthDate(!showBirthDate)}
              className="text-primary-500 hover:text-primary-600 text-sm"
            >
              {showBirthDate ? '收起' : '展开'}
            </button>
          </div>

          {showBirthDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div>
                <label className="label">年份</label>
                <select {...register('birthYear', { valueAsNumber: true })} className="input-field">
                  <option value="">选择年份</option>
                  {Array.from({ length: 131 }, (_, i) => 2030 - i).map(year => (
                    <option key={year} value={year}>{year}年</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">月份</label>
                <select {...register('birthMonth', { valueAsNumber: true })} className="input-field">
                  <option value="">选择月份</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{month}月</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">日期</label>
                <select {...register('birthDay', { valueAsNumber: true })} className="input-field">
                  <option value="">选择日期</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}日</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">时辰</label>
                <select {...register('birthHour', { valueAsNumber: true })} className="input-field">
                  <option value="">选择时辰</option>
                  {timeSlots.map((slot, index) => (
                    <option key={slot.name} value={slot.startHour}>
                      {slot.name}（{slot.startHour}:00-{slot.endHour}:00）
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* 寓意偏好（选填） */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">寓意偏好（选填）</h3>
          <div className="space-y-3">
            {meaningCategories.map(category => (
              <div key={category.category}>
                <h4 className="text-sm font-medium text-gray-600 mb-2">{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.meanings.map(meaning => (
                    <button
                      key={meaning}
                      type="button"
                      onClick={() => toggleMeaning(meaning)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                        selectedMeanings.includes(meaning)
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {meaning}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {selectedMeanings.length > 0 && (
            <div className="mt-4 p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-700">
                已选择寓意：{selectedMeanings.join('、')}
              </p>
            </div>
          )}
        </div>

        {/* 提交按钮 */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                正在生成名字...
              </div>
            ) : (
              '开始取名'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}