import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'normalize.css'

import './styles.scss'
import { AppProvider } from '@/context/AppContext'

const inter = Montserrat({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'MemKrab Test Task',
  description: 'Created by Gord1y',
  creator: 'Gord1y',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
