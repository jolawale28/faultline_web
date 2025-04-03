import { getAuth, signOut } from "firebase/auth";
import { House, Loader, Music4, Newspaper, PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { JSX, useRef, useState, useTransition } from "react";
import { Id, toast } from "react-toastify";

const NavItemLinks = ({ pathname }: { pathname: string }) => {

    const auth = getAuth();
    const toastNotif = useRef<Id | null>(null)

    type NavItem = {
        label: string;
        href: string;
        icon: JSX.Element;
    };

    const navItems: NavItem[] = [
        {
            label: 'Collections',
            href: '/admin/collections',
            icon: <Music4 size={20} color={pathname === ('/admin/collections') ? 'white' : '#807E7E'} />
        },
        {
            label: 'Newsletter',
            href: '/admin/newsletter',
            icon: <Newspaper size={20} color={pathname === ('/admin/newsletter') ? 'white' : '#807E7E'} />
        },

    ]

    const [, startSignOut] = useTransition()
    const [loadingSignOut, setLoadingSignOut] = useState(false)
    const handleSignOut = () => {
        
        setLoadingSignOut(true)
        toast.dismiss()
        startSignOut(async () => {
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log('signed out')
                if (toastNotif.current) {
                    toast.dismiss(toastNotif.current)
                }
                toastNotif.current = toast.success('You have been signed out.', { autoClose: 5000 })
                
            }).catch((error) => {
                // An error happened.
                console.log(error)
                if (toastNotif.current) {
                    toast.dismiss(toastNotif.current)
                }
                toastNotif.current = toast.error('Operation aborted! Something went wrong.', { autoClose: 10000 })
            })
            .finally(() => {
                setLoadingSignOut(false)
            })
        })

    };

    return (
        <>
            <li className="relative hover:bg-[#FF9500]/10">
                {
                    (pathname === ('/admin')) && (
                        <div className="absolute bg-[#FF9500] h-[30px] top-[50%] -translate-[50%] left-[1px] w-[3px]"></div>
                    )
                }
                <Link href="/admin" className="flex items-center py-3 ps-5">
                    <div className="basis-[30px] grow-0 shrink-0"><House size={20} color={pathname === ('/admin') ? 'white' : '#807E7E'} /></div>
                    <div className={`text-${pathname === ('/admin') ? 'white' : '[#807E7E]'} grow`}>Dashboard</div>
                </Link>
            </li>
            {
                navItems.map((ele, idx) => (
                    <li className="relative hover:bg-[#FF9500]/10" key={`navItem_${idx}`}>
                        {
                            (pathname === (ele.href)) && (
                                <div className="absolute bg-[#FF9500] h-[30px] top-[50%] -translate-[50%] left-[1px] w-[3px]"></div>
                            )
                        }
                        <Link href={ele.href} className="flex items-center py-3 ps-5">
                            <div className="basis-[30px] grow-0 shrink-0">{ele.icon}</div>
                            <div className={`text-${pathname === (ele.href) ? 'white' : '[#807E7E]'} grow`}>{ele.label}</div>
                        </Link>
                    </li>
                ))
            }
            <li className="relative hover:bg-[#FF9500]/10">
                <button onClick={() => handleSignOut()} className="flex items-center py-3 px-5 w-full cursor-pointer">
                    <div className="basis-[30px] grow-0 shrink-0"><PanelLeftClose size={20} color="#807E7E" /></div>
                    <div className="text-[#807E7E] flex justify-between items-center grow">
                        <div>Sign out</div>
                        {loadingSignOut && <div><Loader size = {18} className="animate-spin text-gray-500" /></div>}
                    </div>
                </button>
            </li>
        </>
    )
}

export default NavItemLinks