'use client'

import {CircleDollarSign, DeleteIcon, Loader, PlayCircleIcon, Trash} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import MusicUploadModal from "@/app/admin/components/muiscUploadModalPops";
import {deleteMusicFromDatabase} from "@/app/firebase/delete_music";
import {Id, toast} from "react-toastify";
import MusicPlayer from "@/app/components/ui/music_bar";
import { Music } from "@/app/models/MusicTypes";
import { ScaleLoader } from "react-spinners";

export default function Collections() {

    const [songLists, setSongLists] = useState<Music[]>([]);
    const [beats, setBeats] = useState<Music[]>([]);
    const [music, setMusic] = useState<Music[]>([]);
    const [musicPlay, setMusicPlay] = useState<Music[]>([]);
    const [isUploadModal, setIsUploadModal] = useState(false);
    const [, setLoading] = useState(false);
    const toastNotif = useRef<Id | null>(null)

    const [, startDeleteFunc] = useTransition()

    const [playingMusic, setPlayingMusic] = useState<Music | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const [pickedTab, setPickedTab] = useState('music');

    const [fetchingMusic, startMusicFetch] = useTransition()
    useEffect(() => {

        (() => {
            console.log(playingMusic)
            startMusicFetch(async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "music"));
                    const allList: Music[] = querySnapshot.docs.map((doc) => ({
                        ...(doc.data() as Music),
                        id: doc.id,
                    }));

                    setSongLists(allList);
                    console.log(allList)

                    // Filtering data
                    const beats = allList.filter((item) => item.musicType === "beat");
                    const music = allList.filter((item) => item.musicType === "music");

                    setBeats(beats);
                    setMusic(music);
                } catch (error) {
                    console.error("Error fetching:", error);
                }
            })
        })()
    }, []);


    const handleDelete = (id : string) => {
        setLoading(true)
        toast.dismiss()
        startDeleteFunc(async () => {
            await deleteMusicFromDatabase(id)
                .then(() => {
                    if (toastNotif.current) {
                        toast.dismiss(toastNotif.current)
                    }
                    toastNotif.current = toast.success('Operation success! Music Deleted', {autoClose: 5_000})

                })
                .catch((error) => {
                    console.log(error)
                    if (toastNotif.current) {
                        toast.dismiss(toastNotif.current)
                    }
                    toastNotif.current = toast.error(error.message, {autoClose: 50_000})
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    };

    return (
        <>
            <div className="h-full grow shrink flex flex-col gap-5">
                <div className="flex md:flex-row flex-col gap-3 md:justify-between">
                    <h1 className='text-4xl uppercase font-bold bg-gradient-to-r from-white via-[#FF9500] to-[#FF9500] to-90% bg-clip-text text-transparent'>
                        My Collections
                    </h1>
                    <div>
                        <button onClick={() => {
                            setIsUploadModal(true)
                        }} type="button" className="flex gap-x-2 bg-[#FF9500] px-4 py-2 rounded-full font-extrabold hover:bg-[#FF9500]/80">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0-6 0m6 0V4h10v8M9 8h10m-3 11h6m-3-3v6" /></svg>
                            New Upload
                        </button>
                    </div>
                </div>
                <div className='backdrop-blur-lg bg-gray-300/10 min-h-[300px] rounded-4xl p-10 flex flex-col gap-y-8'>
                    <div className='flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between'>
                        <div className='flex gap-x-0 items-center h-fit'>
                            <button
                                title='All Music'
                                type='button'
                                className={`cursor-pointer border px-5 py-2 ${pickedTab === 'music' ? 'border-[#FF9500] text-[#FF9500]' : 'border-white text-white hover:border-[#FF9500] hover:text-[#FF9500]'} font-bold rounded-s-full`}
                                onClick={() => {
                                    setPickedTab('music')
                                }}
                                disabled={fetchingMusic}
                            >
                                My Songs
                            </button>
                            <button
                                title='My Beats'
                                type='button'
                                className={`cursor-pointer border px-5 py-2 ${pickedTab === 'beat' ? 'border-[#FF9500] text-[#FF9500]' : 'border-white text-white hover:border-[#FF9500] hover:text-[#FF9500]'} font-bold rounded-e-full`}
                                onClick={() => {
                                    setPickedTab('beat')
                                }}
                                disabled={fetchingMusic}
                            >
                                My Beats
                            </button>
                        </div>
                        <MusicPlayer 
                            playList={songLists} 
                            musicType={pickedTab} 
                            playingItem={playingMusic} 
                            setPlayingItem = {setPlayingMusic} 
                            isPlaying = {isPlaying}
                            setIsPlaying = {setIsPlaying}
                        />

                    </div>

                    {
                        fetchingMusic && <div className="text-white grow flex items-center justify-center">
                            <Loader className="text-gray-400 animate-spin" size={18} />
                        </div>
                    }

                    {
                        !fetchingMusic && (
                            <div className='overflow-x-scroll scrollbar-hidden'>
                                <table className='w-full divide-gray-200'>
                                    <tbody className='bg-transparent text-white'>
                                        {
                                            pickedTab === 'music' &&
                                            music.map((ele, idx) => (
                                                <tr key={`list_of_songs_${idx}`} className="">
                                                    <td className='py-2 pr-4 whitespace-nowrap font-extrabold w-[10px] sticky top-0 left-0'>
                                                        {idx + 1}.
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
                                                            <span className='font-bold'>{ele.musicName}</span>{' '}
                                                            <span className='font-light opacity-40'>
                                                                {ele.feats}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td valign='middle' className='py-2 whitespace-nowrap text-center min-w-[200px]'>
                                                        <div className='flex justify-center items-center'>
                                                            <div className='bg-white px-2 py-1 w-fit rounded-full flex gap-x-3 items-center justify-between'>
                                                                <CircleDollarSign size={18} color='black' />
                                                                <span className='text-black text-sm font-black mt-1'>
                                                                    {ele.price}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 whitespace-nowrap'>
                                                        <div className="flex justify-end">
                                                            <button type="button" onClick={() => setPlayingMusic(ele)} className='flex justify-end cursor-pointer'>
                                                                {
                                                                    playingMusic?.id == ele.id ? (
                                                                        <ScaleLoader color="#FF9500" width={2.5} height={10} speedMultiplier={1.2} />
                                                                    ) : (
                                                                        <PlayCircleIcon />
                                                                    )
                                                                }

                                                            </button>
                                                        </div>
                                                    </td>

                                                    <td className='py-2 whitespace-nowrap '>
                                                        <div onClick={() => {
                                                            handleDelete(ele.id)
                                                        }} className='flex justify-end'>
                                                            <Trash />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                        {
                                            pickedTab === 'beat' &&
                                            beats.map((ele, idx) => (
                                                <tr key={`list_of_songs_${idx}`}>
                                                    <td className='py-2 pr-4 whitespace-nowrap font-extrabold w-[10px] sticky top-0 left-0'>
                                                        {idx + 1}.
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
                                                            <span className='font-bold'>{ele.musicName}</span>{' '}
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
                                                    <td className='py-2 whitespace-nowrap'>
                                                        <div className="flex justify-end">
                                                            <button type="button" onClick={() => setPlayingMusic(ele)} className='flex justify-end cursor-pointer'>
                                                                {
                                                                    playingMusic?.id == ele.id ? (
                                                                        <ScaleLoader color="#FF9500" width={2.5} height={10} speedMultiplier={1.2} />
                                                                    ) : (
                                                                        <PlayCircleIcon />
                                                                    )
                                                                }

                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 whitespace-nowrap '>
                                                        <div onClick={() => {
                                                            handleDelete(ele.id)
                                                        }} className='flex justify-end'>
                                                            <Trash />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>

                { isUploadModal? <MusicUploadModal onClose={() => {setIsUploadModal(false)}}/>: null}

            </div>
        </>
    )
}