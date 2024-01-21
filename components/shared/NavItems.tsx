'use client';

import { headerLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
const NavItems = () => {
    const pathname = usePathname()
    return (
        <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
            {
                headerLinks.map((e) =>{
                    const isActive = pathname === e.route
                    return(
                        <li
                        key={e.route}
                        className={`${
                        isActive && 'text-primary-500'
                        } flex-center p-medium-16 whitespace-nowrap`}
                    >
                            <Link href={e.route}>{e.label}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default NavItems