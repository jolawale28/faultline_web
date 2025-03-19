'use client'

import { Menu, ShoppingCart, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function NavBar () {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <nav className='flex justify-between items-center'>
        <div className='flex items-center gap-x-5'>
          <div className='relative size-8'>
            <Image
              src='/images/logo.png'
              fill
              objectFit='cover'
              alt='faultLine logo image'
            />
          </div>
          <Link
            href='/newsletter'
            className='uppercase bg-[#FF9500] rounded-full px-8 py-3 opacity-80 text-white font-extrabold text-sm'
          >
            NewsLetter
          </Link>
        </div>

        <div className=''>
          <button
            title='Menu'
            className='lg:hidden border border-white bg-white p-1 rounded flex items-center justify-center'
            onClick={() => setShowMenu(true)}
          >
            <Menu color='black' size={28} />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                className='fixed right-0 top-0 bg-white h-screen w-[300px] space-y-10 z-50'
                initial={{ opacity: 0, x: 500 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 500 }}
              >
                <div className='flex justify-center items-center p-5'>
                  <button
                    title='Close button'
                    className='bg-gray-100 p-2 rounded-full'
                    onClick={() => setShowMenu(false)}
                  >
                    <X />
                  </button>
                </div>

                <div className='flex justify-center text-center'>
                  <ul className='space-y-3'>
                    <li>
                      <Link
                        href='/'
                        className='text-xl font-bold hover:text-[#FF9500] transition-colors'
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        className='text-xl font-bold hover:text-[#FF9500] transition-colors'
                      >
                        Collections
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        className='text-xl font-bold hover:text-[#FF9500] transition-colors'
                      >
                        Upcoming Releases
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        className='text-xl font-bold hover:text-[#FF9500] transition-colors'
                      >
                        Free
                      </Link>
                    </li>
                    <li className='flex justify-center mt-10'>
                      <div className='flex gap-x-5 border-[1.5px] rounded-full border-black px-5 py-2.5 w-fit'>
                        <Link href='/'>
                          <ShoppingCart color='black' size={24} />
                        </Link>
                        <Link href='/'>
                          <User color='black' size={24} />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className='items-center gap-x-10 lg:flex hidden'>
            <li>
              <Link
                href='/'
                className='font-bold text-nowrap text-base uppercase text-white hover:text-[#FF9500] transition-colors'
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href='/'
                className='font-bold text-nowrap text-base uppercase text-white hover:text-[#FF9500] transition-colors'
              >
                Collection
              </Link>
            </li>

            <li>
              <Link
                href='/'
                className='font-bold text-nowrap text-base uppercase text-white hover:text-[#FF9500] transition-colors'
              >
                Upcoming Releases
              </Link>
            </li>

            <li>
              <Link
                href='/'
                className='font-bold text-nowrap text-base uppercase text-white hover:text-[#FF9500] transition-colors'
              >
                Free
              </Link>
            </li>

            <li>
              <div className='flex gap-x-5 border-[1.5px] rounded-full border-white px-5 py-2.5'>
                <Link href='/'>
                  <ShoppingCart color='white' size={24} />
                </Link>
                <Link href='/'>
                  <User color='white' size={24} />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
