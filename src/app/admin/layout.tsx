"use client";

import MobileSideBar from './components/layout/MobileSideBar'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './components/layout/SideBar'
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import ProtectedAuthComp from '../components/ProtectedAuthComp';
import { User } from "firebase/auth";

interface AdminRootLayoutProps {
  children: ReactNode;
  user: User; // Injected by HOC
}

function AdminRootLayout({ children, /*user*/ }: Readonly<AdminRootLayoutProps>) {

  const pathname = usePathname();

  return (
    <section className="bg-[url('/images/hero_wallpaper.png')] bg-cover bg-center flex gap-5 p-5 h-[calc(100vh)]">
      <Sidebar />
      <main className="grow shrink h-full flex flex-col gap-y-10 w-full overflow-y-scroll scrollbar-hidden">
        <div className="flex flex-row gap-5 justify-between md:items-center basis-auto">

          <div className="flex md:flex-row flex-col justify-between gap-y-4 md:items-center w-full">
            <div className="flex gap-x-3 items-center">
              <Link href="/admin">
                <div className="size-8 relative overflow-hidden">
                  <Image src="/images/logo.png" alt="app_logo" fill objectFit="cover" />
                </div>
              </Link>

              {
                pathname === '/admin' ? (
                  <div className="text-white">Welcome, Duv Mac</div>
                ) : (
                  <ul className="text-white flex gap-x-1 items-center text-xs">
                    <li><ChevronRight size={20} color="white" /></li>
                    <li>Collections</li>
                  </ul>
                )
              }

            </div>

          </div>

          <MobileSideBar />
        </div>

        {children}
      </main>
    </section>
  )
}

export default ProtectedAuthComp(AdminRootLayout);
