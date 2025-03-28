import type { Metadata } from 'next'
import './globals.css'
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'Fault Line Music',
  description: ''
}

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`antialiased`} >
        {children}
        <NextTopLoader color="#FF9500" />
      </body>
    </html>
  )
}
