'use client'

import { Menu, PencilLine, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import React, {useEffect, useState} from "react";
import NavItemLinks from "./NavItemLinks";
import { usePathname } from "next/navigation";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/app/firebase/firebaseConfig";
import EditProfileModal from "@/app/admin/components/edit_modal";
interface User {
    id: string;
    about_me: string;
    downloads: never;
    facebook_link: string;
    first_name: string;
    last_name: string;
    instagram_link: string;
    profile_image: string;
    tiktok_link: string;
    youtube_link: string;
    twitter_link: string;
}

export default function MobileSideBar() {

    const pathname: string = usePathname()
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [admin, setAdmin] = useState<User[]>([]);

    const fetchUsers = async (
        setAdmin: React.Dispatch<React.SetStateAction<User[]>>,

    ) => {
        try {
            const querySnapshotUser = await getDocs(collection(db, "music_user"));

            // Extracting user details
            const userDetails: User[] = querySnapshotUser.docs.map((doc) => ({
                ...(doc.data() as User),
                id: doc.id,
            }));

            // Updating state
            setAdmin(userDetails);


        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    useEffect(() => {
        fetchUsers(setAdmin,).then(() => {

        });
    }, []);



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
                                            <Image src={admin?.[0]?.profile_image ?? "/images/owner_image.png"} fill objectFit="cover" alt="admin_image" />
                                        </div>
                                        <h2 className="font-extrabold text-base text-white"> {`${admin?.[0]?.first_name ?? `Duv `} ${admin?.[0]?.last_name  ?? `Mac`}`}</h2>
                                        <div>
                                            <button onClick={()=>{
                                                // setShowSidebar(false);
                                                setIsModalOpen(true);
                                            }}  className="bg-[#FF9500] px-4 py-2 rounded-full flex gap-x-2" >
                                                <PencilLine size={20} />
                                                <span>Edit</span>
                                            </button>
                                        </div>
                                    </div>


                                       <EditProfileModal onClose={() => {setIsModalOpen(false)}} userId={'x7Qd21eDuN1YiRgcpZ2f'} isOpen={isModalOpen} />


                                    {isModalOpen? null: <nav className="bg-black rounded-xl py-5">
                                        <ul>
                                            <NavItemLinks pathname={pathname}/>
                                        </ul>
                                    </nav>}
                                </div>
                            </motion.aside>
                        )
                    }
                </AnimatePresence>
            </div>
        </>
    )
}