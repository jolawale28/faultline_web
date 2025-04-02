import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const signInUser = async (email: string, password: string): Promise<void> => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully:", userCredential.user);
    } catch (error) {
        console.error("Error signing in:", error);
    }
};

export default signInUser;
