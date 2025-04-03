'use client'
import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { CardContent } from "@/app/components/ui/card content";
import { Card } from "@/app/components/ui/card";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Id, toast } from 'react-toastify';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const SignInScreen = () => {

    const searchParams = useSearchParams()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const toastNotif = useRef<Id | null>(null)

    const [, startUserSignIn] = useTransition()
    const handleSignIn = () => {
        setLoading(true)
        toast.dismiss()
        startUserSignIn(async () => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    
                    if (toastNotif.current) {
                        toast.dismiss(toastNotif.current)
                    }
                    toastNotif.current = toast.success('Operation success! You are now logged in.', {autoClose: 5_000})
                    router.push('/admin')
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

    useEffect(() => {
        if (searchParams.get('unauthorised')) {
            if (toastNotif.current) {
                toast.dismiss(toastNotif.current)
            }
            toastNotif.current = toast.info('Unauthorised! You have to be logged in.', {hideProgressBar: false, autoClose: 5000})
        }
    }, [])

    return (
        <div className=" bg-[url('/images/hero_wallpaper.png')] bg-cover bg-center flex items-center justify-center min-h-screen">
            
            <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-2xl">
                <CardContent>
                    <div className='flex item-center justify-center w-full mb-10'>
                        <Image src="/app_logo_big.png" width={50} height={0} alt="logo" />
                    </div>
                    <h2 className="text-white text-xl font-bold mb-10 text-center">Admin Authentication</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 p-3 bg-white/20 text-white rounded-lg focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-3 p-3 bg-white/20 text-white rounded-lg focus:outline-none"
                    />

                    <button onClick={handleSignIn} disabled = {loading} className='w-full bg-[#FF9500] text-white px-4 py-3 font-extrabold rounded-lg flex items-center justify-center gap-2 cursor-pointer'>
                        {loading ? <Loader2 className="animate-spin" color = "white" /> : 'Sign In'}
                    </button>
                    
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInScreen;
