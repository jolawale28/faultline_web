import { doc, deleteDoc } from "firebase/firestore";
import {db} from "@/app/firebase/firebaseConfig";

export async function deleteMusicFromDatabase(musicId: string): Promise<void> {
    try {
        const musicRef = doc(db, "music", musicId);
        await deleteDoc(musicRef);
        console.log("Music deleted successfully from the database.");
    } catch (error) {
        console.error("Error deleting music from database:", error);
    }
}
