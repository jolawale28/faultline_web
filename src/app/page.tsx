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

export default function Home () {
  return (
    <>
      <header className="bg-[url('/images/hero_wallpaper.png')] bg-cover bg-center">
        <div className='space-y-16 bg-gradient-to-r from-black/80 via-transparent to-transparent h-full px-[20px] screenFrame py-8'>
          <NavBar />

          <div className='text-white flex justify-between items-center'>
            <div className='flex flex-col gap-y-5'>
              <div className='font-medium text-base'>Official Website of</div>
              <h1 className='caption_title text-9xl'>Team Fault Line</h1>
              <div className='font-medium text-base w-[364px]'>
                Music is the canvas of sound - paint with your soul, and the
                world will hear your colors.
              </div>
              <div className='flex gap-x-10 items-center'>
                <Link href=''>
                  <InstagramIcon width={24} height={24} />
                </Link>
                <Link href=''>
                  <FacebookIcon width={24} height={24} />
                </Link>
                <Link href=''>
                  <YoutubeIcon width={24} height={24} />
                </Link>
                <Link href=''>
                  <FacebookIcon width={24} height={24} />
                </Link>
              </div>
              <Link
                className='border-[1.5px] rounded-full px-10 py-3 w-fit'
                href='/about'
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
                    src='/images/new_release.png'
                    fill
                    objectFit='cover'
                    alt='new release'
                  />
                </div>
                <div className='flex flex-col justify-between grow text-sm'>
                  <div className='font-bold text-base'>DND</div>
                  <div>Partyat4 ft Bobby Em</div>
                  <div>Music</div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                      <Clock size={20} />
                      April 25th
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
                    src='/images/new_release.png'
                    fill
                    objectFit='cover'
                    alt='new release'
                  />
                </div>
                <div className='flex flex-col justify-between grow text-sm'>
                  <div className='font-bold text-base'>BODY</div>
                  <div>Team Fault Line</div>
                  <div>Beat</div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                      <CircleDollarSign size={20} />
                      $50
                    </div>
                    <Link
                      href=''
                      className='py-2 px-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors font-bold'
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
                    src='/images/new_release.png'
                    fill
                    objectFit='cover'
                    alt='new release'
                  />
                </div>
                <div className='flex flex-col justify-between grow text-sm'>
                  <div className='font-bold text-base'>
                    RED - Kendrick Type Beat
                  </div>
                  <div>Team Fault Line</div>
                  <div>Beat</div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                      <CircleDollarSign size={20} />
                      Free
                    </div>
                    <Link
                      href=''
                      className='py-2 px-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors font-bold'
                    >
                      Play
                    </Link>
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
                  title='My Songs'
                  type='button'
                  className='border-2 border-[#FF9500] px-5 py-2 text-[#FF9500] font-bold rounded-full'
                >
                  My Songs
                </button>
                <button
                  title='My Beats'
                  type='button'
                  className='border-2 border-white px-5 py-2 text-white hover:border-[#FF9500] hover:text-[#FF9500] rounded-full'
                >
                  My Beats
                </button>
                <button
                  title='My Albums'
                  type='button'
                  className='border-2 border-white px-5 py-2 text-white rounded-full'
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
                  {[1, 2, 3, 4].map((ele, idx) => (
                    <tr key={`list_of_songs_${idx}`}>
                      <td className='py-2 pr-4 whitespace-nowrap font-extrabold w-[10px] sticky top-0 left-0'>
                        {ele}.
                      </td>
                      <td className='py-2 flex gap-x-3 items-center min-w-[300px] sticky top-0 left-0'>
                        <div className='relative size-[48px] rounded-xl overflow-hidden'>
                          <Image
                            src='/images/music_image.png'
                            fill
                            objectFit='cover'
                            alt='music_image'
                          />
                        </div>
                        <div className='flex gap-x-3'>
                          <span className='font-bold'>Far East</span>{' '}
                          <span className='font-light opacity-40'>
                            ft. Jay Karmen
                          </span>
                        </div>
                      </td>
                      <td className='py-2 whitespace-nowrap text-center min-w-[200px]'>
                        2024
                      </td>
                      <td className='py-2 whitespace-nowrap font-normal text-gray-400 text-center min-w-[200px]'>
                        3.25
                      </td>
                      <td className='py-2 whitespace-nowrap text-center min-w-[200px]'>
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
                        <div className='flex justify-end'>
                          <PlayCircleIcon />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='text-center bg-black py-3 rounded-full text-white'>
              Show More
            </div>
          </div>
        </section>

        <section className='py-24 bg-gradient-to-r from-[#311D00] via-[#311D00] to-[#FF9500] screenFrame px-[20px] flex items-center justify-center'>
          <div className='flex lg:flex-row flex-col gap-x-1 items-center'>
            <div className='relative size-48'>
              <Image
                src='/images/yellow_mail_envelope.png'
                alt='yellow_mail_envelope'
                fill
                objectFit='contain'
              />
            </div>
            <div className='space-y-3'>
              <div className='text-white lg:text-left text-center'>
                <span className='text-3xl font-bold'>Subscribe to</span>
                <br />
                <span className='font-extrabold text-5xl'>My Newsletter</span>
              </div>
              <div className='flex lg:flex-row flex-col gap-x-3'>
                <input
                  type='email'
                  className='bg-white px-4 py-2 rounded-s-xl rounded-br-xl rounded-tr-0 lg:w-[500px] w-full'
                  placeholder='Your email...'
                />
                <button className='bg-[#242424] px-4 py-2 text-white rounded-e-xl rounded-tl-xl rounded-bl-0'>
                  Subscribe
                </button>
              </div>
              <div className='text-lg text-white'>
                And get updated anytime I drop new hits and beats
              </div>
            </div>
          </div>
        </section>

        <section className='py-24 screenFrame px-[20px] bg-[url(/images/upcoming_release_bg.png)] bg-cover bg-center relative'>
          {/* <div className='absolute inset-0 backdrop-blur-md bg-gray-300/5'></div> */}
          <div>
            <h1 className='text-4xl mb-8 uppercase font-bold bg-gradient-to-r from-white via-[#FF9500] to-[#FF9500] to-90% bg-clip-text text-transparent'>
              Upcoming Release
            </h1>
            <div className='flex lg:flex-row flex-col space-y-5 gap-5'>
              <div className='lg:basis-[400px] basis-auto grow-0 backdrop-blur-md bg-gray-300/10 rounded-2xl p-5 flex flex-col gap-y-2 text-white'>
                <div className='flex gap-x-5'>
                  <div className='size-24 relative overflow-hidden rounded-lg shrink-0'>
                    <Image
                      src='/images/new_release.png'
                      fill
                      objectFit='cover'
                      alt='new release'
                    />
                  </div>
                  <div className='flex flex-col justify-between grow text-sm'>
                    <div className='font-bold text-base'>DND</div>
                    <div>Partyat4 ft Bobby Em</div>
                    <div>Music</div>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-x-2'>
                        <Clock size={20} />
                        April 25th
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

              <div className = "flex items-center justify-around grow text-center">
                <div className='text-white flex flex-col'>
                  <div className = "lg:text-[64px] text-[40px] h-fit">1</div>
                  <div>Days</div>
                </div>
                <div className='text-white flex flex-col'>
                  <div className = "lg:text-[64px] text-[40px] h-fit">12</div>
                  <div>Hours</div>
                </div>
                <div className='text-white flex flex-col'>
                  <div className = "lg:text-[64px] text-[40px] h-fit">34</div>
                  <div>Minutes</div>
                </div>
                <div className='text-white flex flex-col'>
                  <div className = "lg:text-[64px] text-[40px] h-fit">55</div>
                  <div>Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
