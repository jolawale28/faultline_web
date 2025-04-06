'use client';

import { Music } from "@/app/models/MusicTypes";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
    playList: Music[];
    musicType: string;
    playingItem: Music | null;
    setPlayingItem: Dispatch<SetStateAction<Music | null>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const MusicPlayer = (props: MusicPlayerProps) => {

    const { playingItem, setPlayingItem, isPlaying, setIsPlaying } = props

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isBuffering, setIsBuffering] = useState(false)
    const [isMuted, setisMuted] = useState(false)

    const playMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            }
            if (!isPlaying) {
                audioRef.current.play()
                setIsPlaying(true)
            }
        }
    }

    const handleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setisMuted(prev => !prev)
        }
    }

    useEffect(() => {
        if (playingItem) {
            if (audioRef.current) {
                audioRef.current.play()
                setIsPlaying(true)
            }
        }
    }, [playingItem, setIsPlaying])

    return (
        <div className={`bg-black/40 lg:basis-1/2 basis-auto h-fit py-2 px-8 border-[1.5px] ${!playingItem ? 'border-white/20' : 'border-white'} rounded-full flex items-center justify-between`}>
            <div className='flex gap-x-5 items-center'>
                <button type='button' title='Previous'
                    className="cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                    disabled={!playingItem}
                >
                    <SkipBack color='white' size={20} />
                </button>
                <button
                    type='button'
                    title={true ? 'Pause' : 'Play'}
                    onClick={() => {
                        playMusic()
                        // isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
                    }}
                    className="cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                    disabled={!playingItem}
                >
                    {
                        isPlaying ? (
                            <Pause color='white' size={20} />
                        ) : (
                            <Play color='white' size={20} />
                        )
                    }
                </button>
                <button type='button' title='Next'
                    className="cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                    disabled={!playingItem}
                >
                    <SkipForward color='white' size={20} />
                </button>
            </div>

            <div className={`font-light text-base text-white ${!playingItem ? 'opacity-20' : 'opacity-100'} line-clamp-1 ${false ? 'animate-pulse' : ''}`}>
                {
                    isBuffering ? (
                        'Loading...'
                    ) : (
                        <span>
                            {!playingItem && 'No Track Selected...'}
                            {playingItem && `${playingItem?.musicName}: ${playingItem?.feats}`}
                        </span>
                    )
                }

            </div>

            <button
                type='button'
                title={true ? 'Unmute' : 'Mute'}
                className="cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                disabled={!playingItem}
                onClick={() => handleMute()}
            >
                {isMuted ? (
                    <VolumeX color='white' size={20} />
                ) : (
                    <Volume2 color='white' size={20} />
                )}
            </button>

            <audio
                onWaiting={() => setIsBuffering(true)}
                onCanPlay={() => setIsBuffering(false)}
                onEnded={() => {
                    setIsPlaying(false)
                    setPlayingItem(null)
                }}
                src={playingItem?.music}
                ref={audioRef}
                className="hidden" />

        </div >
    );
}

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;