import { PencilLine } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavItemLinks from "./NavItemLinks";
import {useState} from "react";
import EditProfileModal from "@/app/admin/components/edit_modal";

export default function Sidebar() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname()

    return (
        <>
            <aside className="lg:basis-[360px] shrink-0 lg:grow-0 h-full hidden right-0 top-0 w-[360px] z-50 lg:inline-block">
                <div className="lg:bg-gray-50/10 relative bg-black h-full lg:rounded-xl flex flex-col gap-y-10 pt-5 pb-3 px-3 overflow-y-scroll scrollbar-hidden">

                    <div className="flex flex-col gap-y-5 items-center">
                        <div className="relative size-30 rounded-full overflow-hidden">
                            <Image src="/images/owner_image.png" fill objectFit="cover" alt="admin_image" />
                        </div>
                        <h2 className="font-extrabold text-base text-white">Duv Mac</h2>
                        <button onClick={()=>{
                            setIsModalOpen(true)
                        }}>
                            <div className="bg-[#FF9500] px-4 py-2 rounded-full flex gap-x-2" >
                                <PencilLine size={20} />
                                <div
                                >Edit</div>
                            </div>
                        </button>
                    </div>
                    <EditProfileModal onClose={() => {setIsModalOpen(false)}} userId={'x7Qd21eDuN1YiRgcpZ2f'} isOpen={isModalOpen} />
                    <nav className="bg-black rounded-xl py-5">
                        <ul>
                            <NavItemLinks pathname={pathname} />
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}