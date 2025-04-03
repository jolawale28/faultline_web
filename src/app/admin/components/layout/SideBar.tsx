'use client';

import { PencilLine } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavItemLinks from "./NavItemLinks";
import React, {useEffect, useState} from "react";
import EditProfileModal from "@/app/admin/components/edit_modal";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/app/firebase/firebaseConfig";

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

export default function Sidebar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [admin, setAdmin] = useState<User[]>([]);
    const pathname = usePathname();

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
    }, [fetchUsers]);



    return (
        <aside className="lg:basis-[360px] shrink-0 lg:grow-0 h-full hidden right-0 top-0 w-[360px] z-50 lg:inline-block">
            <div className="lg:bg-gray-50/10 relative bg-black h-full lg:rounded-xl flex flex-col gap-y-10 pt-5 pb-3 px-3 overflow-y-scroll scrollbar-hidden">
                <div className="flex flex-col gap-y-5 items-center">
                    <div className="relative size-30 rounded-full overflow-hidden">
                        <Image src={admin?.[0]?.profile_image ?? "/images/owner_image.png"} fill objectFit="cover" alt="admin_image" />
                    </div>
                    <h2 className="font-extrabold text-base text-white">
                        {`${admin?.[0]?.first_name ?? `Duv `} ${admin?.[0]?.last_name  ?? `Mac`}`}
                    </h2>
                    <button onClick={
                        () => {
                            setIsModalOpen(true)
                        }
                    }>
                        <div className="bg-[#FF9500] px-4 py-2 rounded-full flex gap-x-2">
                            <PencilLine size={20} />
                            <div>Edit</div>
                        </div>
                    </button>
                </div>
               <EditProfileModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false)}} userId={'x7Qd21eDuN1YiRgcpZ2f'} />
                <nav className="bg-black rounded-xl py-5">
                    <ul>
                        <NavItemLinks pathname={pathname} />
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
