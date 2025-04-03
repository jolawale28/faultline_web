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