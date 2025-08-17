import { z } from 'zod';

// 表单验证模式
export const nameFormSchema = z.object({
  surname: z
    .string()
    .min(1, '请输入姓氏')
    .max(4, '姓氏不能超过4个字')
    .regex(/^[\u4e00-\u9fa5]+$/, '姓氏只能包含中文字符'),
  
  gender: z.enum(['male', 'female'], {
    required_error: '请选择性别',
  }),
  
  characterCount: z.enum(['2', '3', '4'], {
    required_error: '请选择名字字数',
  }),
  
  // 生辰八字（可选）
  birthYear: z
    .number()
    .min(1900, '年份不能早于1900年')
    .max(2030, '年份不能晚于2030年')
    .optional(),
  
  birthMonth: z
    .number()
    .min(1, '月份必须在1-12之间')
    .max(12, '月份必须在1-12之间')
    .optional(),
  
  birthDay: z
    .number()
    .min(1, '日期必须在1-31之间')
    .max(31, '日期必须在1-31之间')
    .optional(),
  
  birthHour: z
    .number()
    .min(0, '小时必须在0-23之间')
    .max(23, '小时必须在0-23之间')
    .optional(),
  
  // 寓意偏好（可选）
  meanings: z
    .array(z.string())
    .optional(),
});

export type NameFormData = z.infer<typeof nameFormSchema>;

// 验证生辰八字的完整性
export const validateBirthDate = (data: Partial<NameFormData>): boolean => {
  const { birthYear, birthMonth, birthDay } = data;
  
  // 如果提供了任何一个，则需要提供年月日
  if (birthYear || birthMonth || birthDay) {
    return !!(birthYear && birthMonth && birthDay);
  }
  
  return true; // 完全不提供也是有效的
};

// 验证日期的合理性
export const validateDateLogic = (year?: number, month?: number, day?: number): string | null => {
  if (!year || !month || !day) return null;
  
  // 检查月份天数
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  // 闰年检查
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  if (isLeapYear && month === 2) {
    daysInMonth[1] = 29;
  }
  
  if (day > daysInMonth[month - 1]) {
    return `${month}月最多只有${daysInMonth[month - 1]}天`;
  }
  
  // 检查日期是否在未来
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  
  if (inputDate > today) {
    return '出生日期不能是未来的日期';
  }
  
  return null;
};

// 工具函数：清理和格式化输入
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, '');
};

// 检查姓氏是否为常见姓氏（可选的额外验证）
export const isCommonSurname = (surname: string): boolean => {
  const commonSurnames = [
    '王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',
    '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
    '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧',
    '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
    '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎',
    '余', '潘', '杜', '戴', '夏', '钟', '汪', '田', '任', '姜',
    '范', '方', '石', '姚', '谭', '廖', '邹', '熊', '金', '陆',
    '郝', '孔', '白', '崔', '康', '毛', '邱', '秦', '江', '史',
    '顾', '侯', '邵', '孟', '龙', '万', '段', '漕', '钱', '汤',
    // 复姓
    '欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫',
    '万俟', '闻人', '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台',
    '皇甫', '宗政', '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容',
    '仲孙', '钟离', '长孙', '宇文', '司徒', '鲜于'
  ];
  
  return commonSurnames.includes(surname);
};