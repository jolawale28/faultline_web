'use client';

import React, {useEffect, useState} from "react";
import {collection, getDocs, Timestamp} from "firebase/firestore";
import {db} from "@/app/firebase/firebaseConfig";


export default function Home() {

    const [admin, setAdmin] = useState<User[]>([]);
    const [songLists, setSongLists] = useState<Music[]>([]);

    interface Music {
        id: string;
        musicStatus?: string;
        musicType?: string;
        cover_image: string;
        feats: string;
        price: number;
        music_name: string;
        link: string;
        post_date: Timestamp;
    }

    interface User {
        id: string;
        about_me: string;
        downloads: [];
        facebook_link: string;
        first_name: string;
        last_name: string;
        instagram_link: string;
        profile_image: string;
        tiktok_link: string;
        youtube_link: string;
        twitter_link: string;
        social_visits: [];
    }

    const fetchUsers = async (
        setAdmin: React.Dispatch<React.SetStateAction<User[]>>,
        setSongLists: React.Dispatch<React.SetStateAction<Music[]>>,
    ) => {
        try {
            const querySnapshot = await getDocs(collection(db, "music"));
            const querySnapshotUser = await getDocs(collection(db, "music_user"));

            // Extracting music list
            const allList: Music[] = querySnapshot.docs.map((doc) => ({
                ...(doc.data() as Music),
                id: doc.id,
            }));

            // Extracting user details
            const userDetails: User[] = querySnapshotUser.docs.map((doc) => ({
                ...(doc.data() as User),
                id: doc.id,
            }));

            // Updating state
            setAdmin(userDetails);
            setSongLists(allList);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    useEffect(() => {
        fetchUsers(setAdmin, setSongLists).then();
    }, [fetchUsers]);





    return (
        <>
            <div className="h-full grow shrink space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Total Musics</div>
                        <div className="text-5xl">{songLists.length ?? 0}</div>

                    </div>

                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Total Downloads</div>
                        <div className="text-5xl">{admin?.[0]?.downloads?.length ?? 0}</div>
                    </div>

                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Social Media Visits</div>
                        <div className="text-5xl">{admin?.[0]?.social_visits?.length ?? 0}</div>
                    </div>
                </div>


            </div>
        </>
    )
}