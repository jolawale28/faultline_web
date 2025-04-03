'use client'
import {
  CircleDollarSign,
  Clock,
  Play,
  PlayCircleIcon,
  SkipBack,
  SkipForward,
  Volume2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './Icons'
import NavBar from './components/homepage/NavBar'
import React, { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import downloadMusicFromUrl from "@/app/firebase/download_music";
import Countdown from "@/app/components/ui/release_date";
import { useCallback } from 'react';


export default function Home() {

  const [admin, setAdmin] = useState<User[]>([]);
  const [songLists, setSongLists] = useState<Music[]>([]);
  const [beats, setBeats] = useState<Music[]>([]);
  const [music, setMusic] = useState<Music[]>([]);
  const [upcomings, setUpComings] = useState<Music[]>([]);

  const randomNum  = Math.floor(Math.random() * songLists.length);
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


  const fetchUsers = useCallback(
      async (
          setAdmin: React.Dispatch<React.SetStateAction<User[]>>,
          setSongLists: React.Dispatch<React.SetStateAction<Music[]>>,
          setBeats: React.Dispatch<React.SetStateAction<Music[]>>,
          setUpComings: React.Dispatch<React.SetStateAction<Music[]>>,
          setMusic: React.Dispatch<React.SetStateAction<Music[]>>
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

          // Filtering data
          const coming = allList.filter((item) => item.musicStatus === "upcoming");
          const beats = allList.filter((item) => item.musicType === "beat");
          const music = allList.filter((item) => item.musicType === "music");

          setBeats(beats);
          setUpComings(coming);
          setMusic(music);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      []
  );


  useEffect(() => {
    fetchUsers(setAdmin, setSongLists, setBeats, setUpComings, setMusic).then(()=>{});
  }, [fetchUsers, setAdmin, setSongLists, setBeats, setUpComings, setMusic]);



  // const handleSubmitEmail = async () => {
  //     try {
  //         await saveEmailToFirestore(email);
  //         // Show success message to user
  //     } catch {
  //     }
  // };

  return (
    <>
      <header className="bg-[url('/images/hero_wallpaper.png')] bg-cover bg-center">
        <div className='space-y-16 bg-gradient-to-r from-black/80 via-transparent to-transparent h-full px-[20px] screenFrame py-8'>
          <NavBar />

          <div className='text-white flex justify-between items-center'>
            <div className='flex flex-col gap-y-5'>
              <div className='font-medium text-base'>Official Website of</div>
              <h1 className='caption_title text-9xl'>Team Fault Line Enterprise</h1>
              <div className='font-medium text-base w-[364px]'>
                Music is the canvas of sound - paint with your soul, and the
                world will hear your colors.
              </div>
              <div className='flex gap-x-10 items-center'>
                <Link href={admin?.[0]?.instagram_link ?? ``}>
                  <InstagramIcon width={24} height={24} />
                </Link>
                <Link href={admin?.[0]?.facebook_link ?? ``}>
                  <FacebookIcon width={24} height={24} />
                </Link>
                <Link href={admin?.[0]?.youtube_link ?? ``}>
                  <YoutubeIcon width={24} height={24} />
                </Link>
                <Link href={admin?.[0]?.twitter_link ?? ``}>
                  <FacebookIcon width={24} height={24} />
                </Link>
              </div>
              <Link
                className='border-[1.5px] rounded-full px-10 py-3 w-fit'
                href='#about'
              >
                About Me
              </Link>
            </div>
            <div className='hidden md:inline-block'>
              <div className='size-[350px] relative'>
                <Image
                  src='/images/logo_large_hero.png'
                  fill
                  objectFit='contain'
                  alt='logo hero image'
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-5'>
            <div className='w-full backdrop-blur-md bg-gray-300/10 rounded-2xl p-5 flex flex-col gap-y-2 text-white shadow-[#FF9500]/30 shadow-sm'>
              <div className='font-bold text-lg'>New Release</div>
              <div className='flex gap-x-5'>
                <div className='size-32 relative overflow-hidden rounded-lg shrink-0'>
                  <Image
                    src={songLists?.[0]?.cover_image || '/images/defult_music_image.png'}
                    fill
                    objectFit='cover'
                    alt='new release'
                  />
                </div>
                <div className='flex flex-col justify-between grow text-sm'>
                  <div className='font-bold text-base'>{songLists?.[0]?.music_name ?? ''}</div>
                  <div>{songLists?.[0]?.feats ?? ''}</div>
                  <div>{songLists?.[0]?.musicType ?? ''}</div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                      <Clock size={20} />
                      {(new Date(songLists?.[0]?.post_date.seconds * 1000)).toLocaleDateString() ?? ''}
                    </div>
                    <Link
                      href=''
                      className='py-2 px-4 rounded-full bg-white text-black font-bold'
                    >
                      Preorder Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full backdrop-blur-md bg-gray-300/10 rounded-2xl p-5 flex flex-col gap-y-2 text-white shadow-[#FF9500]/30 shadow-sm'>
              <div className='font-bold text-lg'>Hot Beat Most Played</div>
              <div className='flex gap-x-5'>
                <div className='size-32 relative overflow-hidden rounded-lg shrink-0'>
                  <Image
                    src={beats?.[0]?.cover_image ?? '/images/defult_music_image.png'}
                    fill
                    objectFit='cover'
                    alt='new release'
                  />
                </div>
                <div className='flex flex-col justify-between grow text-sm'>
                  <div className='font-bold text-base'>{beats?.[0]?.music_name ?? ''}</div>
                  <div>{beats?.[0]?.feats ?? ''}</div>
                  <div>{beats?.[0]?.musicType ?? ''}</div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                      <CircleDollarSign size={20} />
                      {beats?.[0]?.price ?? ''}
                    </div>
                    <Link
                      href={beats?.[0]?.link ?? '#'} // Add a valid or fallback link
                      className='py-2 px-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors font-bold'
                      aria-label='Buy this track'
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>

              </div>
            </div>
            <div className='w-full backdrop-blur-md bg-gray-300/10 rounded-2xl p-5 flex flex-col gap-y-2 text-white shadow-[#FF9500]/30 shadow-sm'>
              <div className='font-bold text-lg'>For You</div>
              <div className='flex gap-x-5'>
                <div className='size-32 relative overflow-hidden rounded-lg shrink-0'>
                  <Image
                    src={music?.[randomNum]?.cover_image ?? '/images/defult_music_image.png'}
                    fill
                    objectFit='cover'
                    alt='new release'
                  />
                </div>
                <div className='flex flex-col justify-between grow text-sm'>
                  <div className='font-bold text-base'>
                    {music?.[randomNum]?.feats ?? ''}
                  </div>
                  <div>{music?.[randomNum]?.music_name}</div>
                  <div>{music?.[randomNum]?.musicType}</div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                      <CircleDollarSign size={20} />
                      {music?.[randomNum]?.price ?? '0'}
                    </div>
                    <div
                      onClick={() => {
                        downloadMusicFromUrl(
                          music?.[randomNum]?.link,
                          music?.[randomNum]?.music_name
                        );
                      }}
                      className='py-2 px-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors font-bold'
                    >
                      Download
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className=''>
        <section className='py-24 relative overflow-hidden bg-[#1E1E1E] screenFrame px-[20px]'>
          <div className='size-[230px] absolute -top-24 right-10'>
            <Image src='/images/blob.png' fill objectFit='cover' alt='blob' />
          </div>
          <div className='size-[180px] absolute bottom-[50%] translate-y-[50%] left-[50%] -translate-x-[50%]'>
            <Image src='/images/blob.png' fill objectFit='cover' alt='blob' />
          </div>
          <div className='size-[300px] absolute bottom-[50%] translate-y-[50%] left-24'>
            <Image src='/images/blob.png' fill objectFit='cover' alt='blob' />
          </div>
          <h1 className='text-4xl mb-8 uppercase font-bold bg-gradient-to-r from-white via-[#FF9500] to-[#FF9500] to-90% bg-clip-text text-transparent'>
            My Collections
          </h1>

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

            <div className='overflow-x-scroll scrollbar-hide'>
              <table className='w-full divide-gray-200'>
                <tbody className='bg-transparent text-white'>
                  {
                    pickedTab === 'songs' ?
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
                      )) : null
                  }

                  {
                    pickedTab === 'beats' ?
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
                      )) : null
                  }

                  {
                    pickedTab === 'albums' ?
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
                            <div className='flex justify-end'>
                              <PlayCircleIcon />
                            </div>
                          </td>
                        </tr>
                      )) : null
                  }
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/*<section id={'email'} className='py-24 bg-gradient-to-r from-[#311D00] via-[#311D00] to-[#FF9500] screenFrame px-[20px] flex items-center justify-center'>*/}
        {/*  <div className='flex lg:flex-row flex-col gap-x-1 items-center'>*/}
        {/*    <div className='relative size-48'>*/}
        {/*      <Image*/}
        {/*        src='/images/yellow_mail_envelope.png'*/}
        {/*        alt='yellow_mail_envelope'*/}
        {/*        fill*/}
        {/*        objectFit='contain'*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div className='space-y-3'>*/}
        {/*      <div className='text-white lg:text-left text-center'>*/}
        {/*        <span className='text-3xl font-bold'>Subscribe to</span>*/}
        {/*        <br />*/}
        {/*        <span className='font-extrabold text-5xl'>My Newsletter</span>*/}
        {/*      </div>*/}
        {/*      <div className='flex lg:flex-row flex-col gap-x-3'>*/}
        {/*        <input*/}
        {/*          type='email'*/}
        {/*          className='bg-white px-4 py-2 rounded-s-xl rounded-br-xl rounded-tr-0 lg:w-[500px] w-full'*/}
        {/*          placeholder='Your email...'*/}
        {/*          onChange={(value) => {*/}
        {/*              setEmail(value.target.value)*/}
        {/*          }}*/}
        {/*        />*/}
        {/*        <Link href={``}*/}
        {/*            // onClick={*/}
        {/*            // (e)=> {*/}
        {/*            //     // e.preventDefault();*/}
        {/*            //     handleSubmitEmail();*/}
        {/*            // }*/}
        {/*        */}
        {/*            className='bg-[#242424] px-4 py-2 text-white rounded-e-xl rounded-tl-xl rounded-bl-0'>*/}
        {/*          Subscribe*/}
        {/*        </Link>*/}
        {/*      </div>*/}
        {/*      <div className='text-lg text-white'>*/}
        {/*        And get updated anytime I drop new hits and beats*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        <section id={'release'} className='py-24 screenFrame px-[20px] bg-[url(/images/upcoming_release_bg.png)] bg-cover bg-center relative'>
          <h1 className='text-4xl mb-8 uppercase font-bold bg-gradient-to-r from-white via-[#FF9500] to-[#FF9500] to-90% bg-clip-text text-transparent'>
            Upcoming Release
          </h1>
          <div className='flex lg:flex-row flex-col space-y-5 gap-5'>
            <div className='lg:basis-[400px] basis-auto grow-0 backdrop-blur-md bg-gray-300/10 rounded-2xl p-5 flex flex-col gap-y-2 text-white'>
              <div className='flex gap-x-5'>
                <div className='size-24 relative overflow-hidden rounded-lg shrink-0'>
                  <Image
                    src={upcomings?.[0]?.cover_image ?? '/images/defult_music_image.png'}
                    fill
                    objectFit='cover'
                    alt='new release'
                  />
                </div>
                <div className='flex flex-col justify-between grow text-sm'>
                  <div className='font-bold text-base'>{upcomings?.[0]?.music_name ?? ''}</div>
                  <div>{upcomings?.[0]?.feats ?? ''}</div>
                  <div>{upcomings?.[0]?.musicType ?? ''}</div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                      <Clock size={20} />
                      {(new Date(upcomings?.[0]?.post_date.seconds * 1000)).toLocaleDateString() ?? ''}
                    </div>
                    <Link
                      href=''
                      className='py-2 px-4 rounded-full bg-white text-black font-bold'
                    >
                      Preorder Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Countdown targetDate={(new Date(upcomings?.[0]?.post_date.seconds * 1000)) ?? Date.now()} />
          </div>
        </section>

        <section id={'about'} className='py-24 screenFrame px-[20px] bg-[url(/images/personal_bio_bg.png)] bg-cover bg-center'>
          <div className='flex lg:flex-row flex-col items-center justify-between gap-5'>
            <div className='basis-1/2'>
              <h1 className='text-4xl mb-8 uppercase font-bold bg-gradient-to-r from-white via-[#FF9500] to-[#FF9500] to-90% bg-clip-text text-transparent'>
                About Me
              </h1>
              <div className='text-white lg:w-[600px] space-y-5'>
                <div>
                  {admin?.[0]?.about_me ?? ``}
                </div>
              </div>
            </div>
            <div className='basis-1/2 flex justify-center'>
              <div className='size-[315px] rounded-t-full rounded-br-full rounded-bl-0 p-8 backdrop-blur-xs bg-gray-300/5'>
                <div className='size-full relative'>
                  <Image src={admin?.[0]?.profile_image ?? "/images/owner_image.png"} fill objectFit='cover' alt="owner_image" />
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}
