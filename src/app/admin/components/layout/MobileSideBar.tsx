'use client'

import { Menu, PencilLine, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import NavItemLinks from "./NavItemLinks";
import { usePathname } from "next/navigation";

export default function MobileSideBar() {

    const pathname: string = usePathname()
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    return (
        <>
            <div className="lg:hidden inline-block">
                <button onClick={() => setShowSidebar(true)} className="bg-white/20 p-2 rounded-full cursor-pointer">
                    <Menu size={20} color="white" />
                </button>
                <AnimatePresence>
                    {
                        showSidebar && (
                            <motion.aside className="h-screen lg:hidden fixed right-0 top-0 w-[360px] z-50"
                                initial={{ translateX: 500 }}
                                animate={{ translateX: 0 }}
                                exit={{ translateX: 500 }}
                            >
                                <div className="relative bg-black h-full flex flex-col gap-y-10 pt-20 px-3">
                                    <div onClick={() => setShowSidebar(false)} className="absolute size-5 flex items-center justify-center top-0 right-0 p-5 bg-white/20 cursor-pointer">
                                        <button className="cursor-pointer"><X size={20} color="white" /></button>
                                    </div>
                                    <div className="flex flex-col gap-y-5 items-center">
                                        <div className="relative size-30 rounded-full overflow-hidden">
                                            <Image src="/images/owner_image.png" fill objectFit="cover" alt="admin_image" />
                                        </div>
                                        <h2 className="font-extrabold text-base text-white">Duv Mac</h2>
                                        <div>
                                            <Link className="bg-[#FF9500] px-4 py-2 rounded-full flex gap-x-2" href="/">
                                                <PencilLine size={20} />
                                                <span>Edit</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <nav className="bg-black rounded-xl py-5">
                                        <ul>
                                            <NavItemLinks pathname={pathname} />
                                        </ul>
                                    </nav>
                                </div>
                            </motion.aside>
                        )
                    }
                </AnimatePresence>
            </div>
        </>
    )
}