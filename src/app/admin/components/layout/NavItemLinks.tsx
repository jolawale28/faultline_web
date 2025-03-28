import { FileMusic, House, Music4, Newspaper, PanelLeftClose, User } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const NavItemLinks = ({ pathname }: { pathname: string }) => {

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
            label: 'New Releases',
            href: '/admin/new_releases',
            icon: <FileMusic size={20} color={pathname === ('/admin/new_releases') ? 'white' : '#807E7E'} />
        },
        {
            label: 'Newsletter',
            href: '/admin/newsletter',
            icon: <Newspaper size={20} color={pathname === ('/admin/newsletter') ? 'white' : '#807E7E'} />
        },
        {
            label: 'About',
            href: '/admin/about',
            icon: <User size={20} color={pathname === ('/admin/about') ? 'white' : '#807E7E'} />
        }

    ]

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
                <Link href="/admin/about" className="flex items-center py-3 ps-5">
                    <div className="basis-[30px] grow-0 shrink-0"><PanelLeftClose size={20} color="#807E7E" /></div>
                    <div className="text-[#807E7E] grow">Sign out</div>
                </Link>
            </li>
        </>
    )
}

export default NavItemLinks