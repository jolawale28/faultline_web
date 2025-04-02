import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {db} from "@/app/firebase/firebaseConfig";


export const saveEmailToFirestore = async (emailData: string) => {
    try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailData)) {
            throw new Error('Invalid email format');
        }

        const docRef = await addDoc(collection(db, 'emails'), {
            email: emailData,
            timestamp: serverTimestamp(),
        });

        console.log('Email saved with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving email: ', error);
        throw error;
    }
};