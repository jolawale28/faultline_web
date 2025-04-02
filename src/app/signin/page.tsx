'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import signInUser from "@/app/firebase/signin_func";
import { CardContent } from "@/app/components/ui/card content";
import { Card } from "@/app/components/ui/card";
import { Button } from '../components/ui/button';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async () => {
        setLoading(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.push('/admin')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(`${errorCode}: ${errorMessage}`);
            }).finally(() => {
                setLoading(false);
            })
    };

    return (
        <div className=" bg-[url('/images/hero_wallpaper.png')] bg-cover bg-center flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500">
            <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-2xl">
                <CardContent>
                    <h2 className="text-white text-3xl font-bold mb-4">Sign In</h2>
                    {error && <p className="text-red-400 mb-2">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 p-3 bg-white/20 text-white rounded-xl focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-3 bg-white/20 text-white rounded-xl focus:outline-none"
                    />
                    <Button
                        onClick={handleSignIn}
                        className="w-full py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInScreen;
