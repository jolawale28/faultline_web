import type { Metadata } from 'next'
import './globals.css'
import NextTopLoader from 'nextjs-toploader';
import { Slide, ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fault Line Music',
  description: ''
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`antialiased`} >
        {children}
        <NextTopLoader color="#FF9500" />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss = {false}
          draggable = {false}
          pauseOnHover = {false}
          theme="light"
          transition={Slide}
          // limit={1}
        />
      </body>
    </html>
  )
}
