'use client';
import {Pause, Play, SkipBack, SkipForward, Volume2, VolumeX} from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import {Timestamp} from "firebase/firestore";

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

interface MusicPlayerProps {
    musicList: Music[];
    currentTrackId?: string;
    currentTrackIndex: number;
    onTrackChange?: (music: Music, index: number) => void;
}

export interface MusicPlayerHandle {
    play: () => void;
    pause: () => void;
    toggle: () => void;
    mute: (muted: boolean) => void;
    nextTrack: () => void;
    previousTrack: () => void;
    getCurrentTrack: () => Music | null;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
    ({ musicList, currentTrackId, currentTrackIndex, onTrackChange }, ref) => {
        const audioRef = useRef<HTMLAudioElement>(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [isMuted, setIsMuted] = useState(false);
        const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
        
        // Initialize current track index
        useEffect(() => {
            if (currentTrackId) {
                const index = musicList.findIndex(m => m.id === currentTrackId);
                if (index !== -1) setCurrentMusicIndex(index);
            } else if (currentTrackIndex !== undefined) {
                setCurrentMusicIndex(Math.max(0, Math.min(currentTrackIndex, musicList.length - 1)));
            }
        }, [currentTrackId, currentTrackIndex, musicList]);

        // Handle track changes
        useEffect(() => {
            if (!musicList.length) return;

            const music = musicList[currentMusicIndex];
            if (audioRef.current) {
                audioRef.current.src = music.link;
                audioRef.current.load();
            }
            onTrackChange?.(music, currentMusicIndex);
        }, [currentMusicIndex, musicList, onTrackChange]);

        // Audio event handlers
        useEffect(() => {
            const audio = audioRef.current;
            if (!audio) return;

            const handleEnded = () => handleNext();

            audio.addEventListener('ended', handleEnded);
            return () => audio.removeEventListener('ended', handleEnded);
        }, );

        // Expose player controls
        useImperativeHandle(ref, () => ({
            play: () => {
                audioRef.current?.play();
                setIsPlaying(true);
            },
            pause: () => {
                audioRef.current?.pause();
                setIsPlaying(false);
            },
            toggle: () => {
                if (isPlaying) {
                    audioRef.current?.pause();
                    setIsPlaying(false);
                } else {
                    audioRef.current?.play();
                    setIsPlaying(true);
                }
            },
            mute: (muted: boolean) => {
                if (audioRef.current) {
                    audioRef.current.muted = muted;
                    setIsMuted(muted);
                }
            },

            nextTrack: handleNext,
            previousTrack: handlePrevious,
            getCurrentTrack: () => musicList[currentMusicIndex] || null
        }));

        const handleNext = () => {
            const nextIndex = (currentMusicIndex + 1) % musicList.length;
            setCurrentMusicIndex(nextIndex);
            audioRef.current?.play().then();
            setIsPlaying(true);
        };

        const handlePrevious = () => {
            const prevIndex = (currentMusicIndex - 1 + musicList.length) % musicList.length;
            setCurrentMusicIndex(prevIndex);
            audioRef.current?.play();
            setIsPlaying(true);
        };

        const toggleMute = () => {
            if (audioRef.current) {
                audioRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
            }
        };

        return (
            <div className='bg-black/40 lg:basis-1/2 basis-auto h-fit py-2 px-8 border-[1.5px] border-white rounded-full flex items-center justify-between'>
                <div className='flex gap-x-5 items-center'>
                    <button type='button' title='Previous' onClick={handlePrevious}>
                        <SkipBack color='white' size={20} />
                    </button>
                    <button
                        type='button'
                        title={isPlaying ? 'Pause' : 'Play'}
                        onClick={() => {
                            console.log(audioRef.current);
                            // isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
                        }}
                    >
                        {isPlaying ? (
                            <Pause color='white' size={20} />
                        ) : (
                            <Play color='white' size={20} />
                        )}
                    </button>
                    <button type='button' title='Next' onClick={handleNext}>
                        <SkipForward color='white' size={20} />
                    </button>
                </div>

                <div className={`font-light text-base text-white ${isPlaying ? 'animate-pulse' : ''}`}>
                    {musicList[currentMusicIndex]?.music_name || 'No track selected'}
                </div>

                <button
                    type='button'
                    title={isMuted ? 'Unmute' : 'Mute'}
                    onClick={toggleMute}
                >
                    {isMuted ? (
                        <VolumeX color='white' size={20} />
                    ) : (
                        <Volume2 color='white' size={20} />
                    )}
                </button>

                <audio src = {`https://cdn.pixabay.com/download/audio/2025/03/19/audio_56ae1dae5f.mp3?filename=gorila-315977.mp3`} ref={audioRef} className="hidden" />
                
            </div>
        );
    }
);

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;