import { useEffect, useState } from 'react';

interface CountdownProps {
    targetDate: Date;
}

function getTimeRemaining(targetDate: Date) {
    const now = new Date();
    const total = Math.max(0, targetDate.getTime() - now.getTime());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
}

export default function Countdown({ targetDate }: CountdownProps) {
    const [time, setTime] = useState(getTimeRemaining(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeRemaining(targetDate));
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex items-center justify-around grow text-center">
            {Object.entries(time).slice(1).map(([label, value]) => (
                <div key={label} className="text-white flex flex-col">
                    <div className="lg:text-[64px] text-[40px] h-fit">{value}</div>
                    <div>{label.charAt(0).toUpperCase() + label.slice(1)}</div>
                </div>
            ))}
        </div>
    );
}
