'use client'

import { CircleDollarSign, Pencil, Play, PlayCircleIcon, SkipBack, SkipForward, Trash2, Volume2 } from "lucide-react";
import Image from "next/image";

export default function Collections() {
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
                <div className='backdrop-blur-lg bg-gray-300/10 min-h-[300px] rounded-4xl p-10 space-y-8 max-w-full'>
                    <div className='flex xl:flex-row flex-col gap-5 justify-between'>
                        <div className='flex gap-x-2 items-center h-fit overflow-x-scroll scrollbar-hidden'>
                            <button
                                title='My Songs'
                                type='button'
                                className='border-2 border-[#FF9500] px-5 py-2 text-[#FF9500] font-bold rounded-full text-nowrap'
                            >
                                My Songs
                            </button>
                            <button
                                title='My Beats'
                                type='button'
                                className='border-2 border-white px-5 py-2 text-white hover:border-[#FF9500] hover:text-[#FF9500] rounded-full  text-nowrap'
                            >
                                My Beats
                            </button>
                            <button
                                title='My Albums'
                                type='button'
                                className='border-2 border-white px-5 py-2 text-white rounded-full  text-nowrap'
                            >
                                My Albums
                            </button>
                        </div>
                        <div className='bg-black/40 lg:basis-1/2 basis-auto h-fit py-2 px-8 border-[1.5px] border-white rounded-full flex items-center justify-between'>
                            <div className='flex gap-x-5 items-center'>
                                <button type='button' title='Previous'>
                                    <SkipBack color='white' size={20} />
                                </button>
                                <button type='button' title='Play'>
                                    <Play color='white' size={20} />
                                </button>
                                <div role='button' title='Next'>
                                    <SkipForward color='white' size={20} />
                                </div>
                            </div>
                            <div className='font-light text-base text-white'>
                                Now Playing ...
                            </div>
                            <button type='button' title='Volume'>
                                <Volume2 color='white' />
                            </button>
                        </div>
                    </div>

                    <div className='overflow-x-scroll scrollbar-hidden'>
                        <table className='w- divide-gray-200'>
                            <tbody className='bg-transparent text-white'>
                                {[1, 2, 3, 4].map((ele, idx) => (
                                    <tr key={`list_of_songs_${idx}`}>
                                        <td className='py-2 pr-4 whitespace-nowrap font-extrabold lg:w-[1%]'>
                                            {ele}.
                                        </td>
                                        <td className='py-2 flex gap-x-3 items-center lg:min-w-[50%]'>
                                            <div className='relative size-[48px] shrink-0 rounded-xl overflow-hidden'>
                                                <Image
                                                    src='/images/music_image.png'
                                                    fill
                                                    objectFit='cover'
                                                    alt='music_image'
                                                />
                                            </div>
                                            <div className='flex gap-x-3 text-nowrap'>
                                                <span className='font-bold'>Far East</span>{' '}
                                                <span className='font-light opacity-40'>
                                                    ft. Jay Karmen
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 whitespace-nowrap text-center lg:w-[20%] px-10'>
                                            2024
                                        </td>
                                        <td className='py-2 whitespace-nowrap font-normal text-gray-400 text-center lg:w-[20%] px-10'>
                                            3.25
                                        </td>
                                        <td className='py-2 whitespace-nowrap text-center lg:w-[20%] px-10'>
                                            <div className='flex justify-center'>
                                                <div className='bg-white px-2 py-1 w-fit rounded-full flex gap-x-3 items-center justify-between'>
                                                    <CircleDollarSign size={18} color='black' />
                                                    <span className='text-black text-sm font-black mt-1'>
                                                        $8
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 whitespace-nowrap '>
                                            <div className='flex gap-x-2 justify-end text-xs items-center'>
                                                <PlayCircleIcon />
                                                <button title=" " className="border border-white text-white px-2 py-1 rounded-lg hover:bg-white hover:text-black">
                                                    <Pencil size={16} />
                                                </button>
                                                <button className="border border-red-500 text-red-500 px-2 py-1 rounded-lg hover:bg-red-500 hover:border-red-500 hover:text-white"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}