import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

interface WithAuthProps {
    user: User;
}

const ProtectedAuthComp = <P extends object>(WrappedComponent: ComponentType<P & WithAuthProps>) => {
    const WithAuth = (props: P) => {
        const [user, setUser] = useState<User | null>(null);
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const auth = getAuth();
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (!currentUser) {
                    router.push("/signin"); // Redirect if not authenticated
                } else {
                    setUser(currentUser);
                }
                setLoading(false);
            });

            return () => unsubscribe(); // Cleanup on unmount
        }, [router]);

        if (loading) return (
            <>
                <div className="bg-gray-800 flex items-center justify-center h-screen">
                    <div className="flex flex-col justify-center items-center gap-y-5">
                        <BarLoader color="#FF9500" />
                    </div>
                </div>
            </>
        );

        return user ? <WrappedComponent {...props} user={user} /> : null;
    };

    // Set display name for debugging
    WithAuth.displayName = `ProtectedAuthComp(${WrappedComponent.displayName || WrappedComponent.name || "ProtectedComponent"})`;

    return WithAuth;
};

export default ProtectedAuthComp;
