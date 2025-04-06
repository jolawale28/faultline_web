import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import {db} from "@/app/firebase/firebaseConfig"; // npm install uuid

export const addSocialMediaClick = async () => {
    try {
        const randomId = uuidv4(); // generates a unique ID
        const userRef = doc(db, "music_user", 'x7Qd21eDuN1YiRgcpZ2f');

        await updateDoc(userRef, {
            social_visits: arrayUnion(randomId),
        });

        console.log("✅ Social media click added:", randomId);
    } catch (error) {
        console.error("❌ Failed to update socialMediaClicks:", error);
    }
};
