import { getAuth, signOut } from "firebase/auth";

const signOutUser = async (): Promise<void> => {
    try {
        const auth = getAuth();
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

export default signOutUser;
