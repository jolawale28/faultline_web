import React, {useRef, useState} from 'react';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {db, storage} from "@/app/firebase/firebaseConfig";
import {Id, toast} from "react-toastify";


interface MusicUploadModalProps {
    onClose: () => void;
}

const MusicUploadModal: React.FC<MusicUploadModalProps> = ({ onClose }) => {
    const [musicName, setMusicName] = useState('');
    const [feats, setFeats] = useState('');
    const [musicStatus, setMusicStatus] = useState('upcoming');
    const [musicType, setMusicType] = useState('music');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [musicFile, setMusicFile] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const toastNotif = useRef<Id | null>(null)




    const handleUpload = async () => {
        if (!musicName || !feats || !musicFile || !coverImage) return alert("Please fill all required fields");
        setLoading(true);
        toast.dismiss()


        try {
            const musicRef = ref(storage, `music/${musicFile.name}`);
            const coverRef = ref(storage, `images/${coverImage.name}`);

            const musicSnapshot = await uploadBytes(musicRef, musicFile);
            const coverSnapshot = await uploadBytes(coverRef, coverImage);

            const musicUrl = await getDownloadURL(musicSnapshot.ref);
            const coverUrl = await getDownloadURL(coverSnapshot.ref);

            await addDoc(collection(db, 'music'), {
                musicName,
                feats,
                musicStatus,
                musicType,
                price: price || 0,
                music: musicUrl,
                cover_image: coverUrl,
                post_date: Timestamp.now(),
            });
            if (toastNotif.current) {
                toast.dismiss(toastNotif.current)
            }
            toastNotif.current = toast.success('Operation success! Music uploaded.', {autoClose: 5_000})

            onClose();
        } catch (error: unknown) {
            if (toastNotif.current) {
                toast.dismiss(toastNotif.current)
            }
            toastNotif.current = toast.error(`error: ${error}`, {autoClose: 50_000})
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Upload Music</h2>
                <input type="text" placeholder="Music Name" value={musicName} onChange={(e) => setMusicName(e.target.value)} className="w-full p-2 mb-2 border" />
                <input type="text" placeholder="Feats" value={feats} onChange={(e) => setFeats(e.target.value)} className="w-full p-2 mb-2 border" />
                <select value={musicStatus} onChange={(e) => setMusicStatus(e.target.value)} className="w-full p-2 mb-2 border">
                    <option value="upcoming">Upcoming</option>
                    <option value="released">Released</option>
                </select>
                <select value={musicType} onChange={(e) => setMusicType(e.target.value)} className="w-full p-2 mb-2 border">
                    <option value="music">Music</option>
                    <option value="beat">Beat</option>
                </select>
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="w-full p-2 mb-2 border" />
                <input type="file" accept="audio/*" title="Pick a music file" onChange={(e) => setMusicFile(e.target.files?.[0] || null)} className="w-full p-2 mb-2 border" />
                <input type="file" accept="image/*" title="Pick a cover image" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} className="w-full p-2 mb-2 border" />
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                    <button onClick={handleUpload} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">{loading ? 'Uploading...' : 'Submit'}</button>
                </div>
            </div>
        </div>
    );
};

export default MusicUploadModal;
