import React, { useState } from 'react';
import {doc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {db, storage} from "@/app/firebase/firebaseConfig";
import Image from 'next/image';

interface EditProfileModalProps {
    userId: string;
    isOpen: boolean;
    onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ userId, isOpen, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [aboutMe, setAboutMe] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadProfileImage = async (file: File) => {
        const storageRef = ref(storage, `profile_images/${userId}/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setLoading(true);
            try {
                const url = await uploadProfileImage(file);
                setProfileImage(url);
                setLoading(false);
                alert('Image uploaded successfully');
            } catch (error) {
                setLoading(false);
                console.error('Image upload failed:', error);
                alert('Image upload failed');
            }
        }
    };

    const handleSave = async () => {
        try {
            const userRef = doc(db, 'music_user', userId);
            await updateDoc(userRef, {
                first_name: firstName,
                last_name: lastName,
                facebook_link: facebookLink,
                youtube_link: youtubeLink,
                twitter_link: twitterLink,
                profile_image: profileImage,
                about_me: aboutMe,
            });
            alert('Profile updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Facebook Link"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="YouTube Link"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Twitter Link"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                    placeholder="About Me"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />

                <label className="block mb-2">Profile Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-4"
                />
                {loading && <p>Uploading...</p>}
                {profileImage && <Image src={profileImage} alt="Profile" width = {80} height = {80} className="rounded-full mb-2" />}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
