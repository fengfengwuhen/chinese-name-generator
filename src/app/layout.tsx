import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '中文取名助手 - 传统文化与现代科技的完美结合',
  description: '基于生辰八字、五行理论和传统文化的智能中文取名工具，为您的宝宝起一个寓意美好的名字',
  keywords: '取名,起名,中文名字,生辰八字,五行,宝宝起名,姓名学',
  authors: [{ name: '中文取名助手' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} font-chinese`}>
        <div className="min-h-screen">
          {children}
        </div>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#374151',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              borderRadius: '0.75rem',
              padding: '12px 16px',
            },
          }}
        />
      </body>
    </html>
  )
}