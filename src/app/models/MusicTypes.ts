import { Timestamp } from "firebase/firestore";

export interface Music {
    id: string;
    musicStatus?: string;
    music: string;
    musicType?: string;
    cover_image: string;
    feats: string;
    price: number;
    musicName: string;
    link: string;
    post_date: Timestamp;
}

export interface User {
    id: string;
    about_me: string;
    downloads: never;
    facebook_link: string;
    first_name: string;
    last_name: string;
    instagram_link: string;
    profile_image: string;
    tiktok_link: string;
    youtube_link: string;
    twitter_link: string;
}