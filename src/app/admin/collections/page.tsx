'use client'

import { CircleDollarSign, PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import MusicPlayer, { MusicPlayerHandle } from "@/app/components/ui/music_bar";


export default function Collections() {

    const [songLists, setSongLists] = useState<Music[]>([]);
    const [beats, setBeats] = useState<Music[]>([]);
    const [music, setMusic] = useState<Music[]>([]);
    const [musicPlay, setMusicPlay] = useState<Music[]>([]);

    const [pickedTab, setPickedTab] = useState('songs');

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

    const fetchUsers = async (
        setSongLists: React.Dispatch<React.SetStateAction<Music[]>>,
        setBeats: React.Dispatch<React.SetStateAction<Music[]>>,
    ) => {
        try {
            const querySnapshot = await getDocs(collection(db, "music"));

            const allList: Music[] = querySnapshot.docs.map((doc) => ({
                ...(doc.data() as Music),
                id: doc.id,
            }));

            setSongLists(allList);

            // Filtering data
            const beats = allList.filter((item) => item.musicType === "beat");
            const music = allList.filter((item) => item.musicType === "music");

            setBeats(beats);
            setMusic(music); // Updated this line
            setMusicPlay(music)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const playerRef = useRef<MusicPlayerHandle>(null);

    const handleTrackChange = (music: typeof musicPlay[0], index: number) => {
        console.log(`Now playing: ${music.music_name} at index ${index}`);
    };

    const playMusic = () => {
        playerRef.current?.play();
    };

    // const pauseMusic = () => {
    //     playerRef.current?.pause();
    // };

    useEffect(() => {
        fetchUsers(setSongLists, setBeats).then(() => {
        });
    }, []);

    return (
        <>
            <div className="h-full grow shrink flex flex-col gap-5">
                <div className="flex md:flex-row flex-col gap-3 md:justify-between">
                    <h1 className='text-4xl uppercase font-bold bg-gradient-to-r from-white via-[#FF9500] to-[#FF9500] to-90% bg-clip-text text-transparent'>
                        My Collections
                    </h1>
                    <div>
                        <button type="button" className="flex gap-x-2 bg-[#FF9500] px-4 py-2 rounded-full font-extrabold hover:bg-[#FF9500]/80">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0-6 0m6 0V4h10v8M9 8h10m-3 11h6m-3-3v6" /></svg>
                            New Upload
                        </button>
                    </div>
                </div>
                <div className='backdrop-blur-lg bg-gray-300/10 min-h-[300px] rounded-4xl p-10 space-y-8'>
                    <div className='flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between'>
                        <div className='flex gap-x-8 items-center h-fit'>
                            <button
                                title='All Music'
                                type='button'
                                className={`border - 2 px-5 py-2 ${pickedTab === 'songs' ? 'border-[#FF9500] text-[#FF9500]' : 'border-white text-white hover:border-[#FF9500] hover:text-[#FF9500]'} font-bold rounded-full`}
                                onClick={() => {
                                    setPickedTab('songs')
                                }}
                            >
                                My Songs
                            </button>
                            <button
                                title='My Beats'
                                type='button'
                                className={`border - 2 px-5 py-2 ${pickedTab === 'beats' ? 'border-[#FF9500] text-[#FF9500]' : 'border-white text-white hover:border-[#FF9500] hover:text-[#FF9500]'} font-bold rounded-full`}
                                onClick={() => {
                                    setPickedTab('beats')
                                }}
                            >
                                My Beats
                            </button>
                            <button
                                title='My Songs'
                                type='button'
                                className={`border - 2 px-5 py-2 ${pickedTab === 'albums' ? 'border-[#FF9500] text-[#FF9500]' : 'border-white text-white hover:border-[#FF9500] hover:text-[#FF9500]'} font-bold rounded-full`}
                                onClick={() => {
                                    setPickedTab('albums')
                                }}
                            >
                                My Albums
                            </button>
                        </div>
                        <MusicPlayer
                            ref={playerRef}
                            musicList={musicPlay}
                            currentTrackIndex={0}
                            onTrackChange={handleTrackChange}
                        />

                    </div>

                    <div className='overflow-x-scroll scrollbar-hide'>
                        <table className='w-full divide-gray-200'>
                            <tbody className='bg-transparent text-white'>
                                {
                                    pickedTab === 'songs' &&
                                    songLists.map((ele, idx) => (
                                        <tr key={`list_of_songs_${idx}`}>
                                            <td className='py-2 pr-4 whitespace-nowrap font-extrabold w-[10px] sticky top-0 left-0'>
                                                {ele.music_name}.
                                            </td>
                                            <td className='py-2 flex gap-x-3 items-center min-w-[300px] sticky top-0 left-0'>
                                                <div className='relative size-[48px] rounded-xl overflow-hidden'>
                                                    <Image
                                                        src={ele?.cover_image ?? '/images/defult_music_image.png'}
                                                        fill
                                                        objectFit='cover'
                                                        alt='music_image'
                                                    />
                                                </div>
                                                <div className='flex gap-x-3'>
                                                    <span className='font-bold'>{ele.music_name}</span>{' '}
                                                    <span className='font-light opacity-40'>
                                                        {ele.feats}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className='py-2 whitespace-nowrap text-center min-w-[200px]'>
                                                <div className='flex justify-center'>
                                                    <div className='bg-white px-2 py-1 w-fit rounded-full flex gap-x-3 items-center justify-between'>
                                                        <CircleDollarSign size={18} color='black' />
                                                        <span className='text-black text-sm font-black mt-1'>
                                                            {ele.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 whitespace-nowrap '>
                                                <div className='flex justify-end'>
                                                    <PlayCircleIcon />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }

                                {
                                    pickedTab === 'beats' &&
                                    beats.map((ele, idx) => (
                                        <tr key={`list_of_songs_${idx}`}>
                                            <td className='py-2 pr-4 whitespace-nowrap font-extrabold w-[10px] sticky top-0 left-0'>
                                                {ele.music_name}.
                                            </td>
                                            <td className='py-2 flex gap-x-3 items-center min-w-[300px] sticky top-0 left-0'>
                                                <div className='relative size-[48px] rounded-xl overflow-hidden'>
                                                    <Image
                                                        src={ele?.cover_image ?? '/images/defult_music_image.png'}
                                                        fill
                                                        objectFit='cover'
                                                        alt='music_image'
                                                    />
                                                </div>
                                                <div className='flex gap-x-3'>
                                                    <span className='font-bold'>{ele.music_name}</span>{' '}
                                                    <span className='font-light opacity-40'>
                                                        {ele.feats}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className='py-2 whitespace-nowrap text-center min-w-[200px]'>
                                                <div className='flex justify-center'>
                                                    <div className='bg-white px-2 py-1 w-fit rounded-full flex gap-x-3 items-center justify-between'>
                                                        <CircleDollarSign size={18} color='black' />
                                                        <span className='text-black text-sm font-black mt-1'>
                                                            {ele.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 whitespace-nowrap '>
                                                <div className='flex justify-end'>
                                                    <PlayCircleIcon />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }

                                {
                                    pickedTab === 'albums' &&
                                    music.map((ele, idx) => (
                                        <tr key={`list_of_songs_${idx}`}>
                                            <td className='py-2 pr-4 whitespace-nowrap font-extrabold w-[10px] sticky top-0 left-0'>
                                                {ele.music_name}.
                                            </td>
                                            <td className='py-2 flex gap-x-3 items-center min-w-[300px] sticky top-0 left-0'>
                                                <div className='relative size-[48px] rounded-xl overflow-hidden'>
                                                    <Image
                                                        src={ele?.cover_image ?? '/images/defult_music_image.png'}
                                                        fill
                                                        objectFit='cover'
                                                        alt='music_image'
                                                    />
                                                </div>
                                                <div className='flex gap-x-3'>
                                                    <span className='font-bold'>{ele.music_name}</span>{' '}
                                                    <span className='font-light opacity-40'>
                                                        {ele.feats}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className='py-2 whitespace-nowrap text-center min-w-[200px]'>
                                                <div className='flex justify-center'>
                                                    <div className='bg-white px-2 py-1 w-fit rounded-full flex gap-x-3 items-center justify-between'>
                                                        <CircleDollarSign size={18} color='black' />
                                                        <span className='text-black text-sm font-black mt-1'>
                                                            {ele.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 whitespace-nowrap '>
                                                <button onClick={playMusic} className='flex justify-end'>
                                                    <PlayCircleIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}