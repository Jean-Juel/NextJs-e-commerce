'use client'
import Link from "next/link";
import {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/react";
import Image from 'next/image'
import logo from '../../assets/moi.png'
import {useState} from "react";
// import {ButtonLogout} from "@/components/admin/button/ButtonLogout";


export default function NavFront() {
    const [navActive, setNavActive] = useState(false)
    const inactiveLink = 'flex gap-4 w-fit lg:text-white text-gray-600 whitespace-nowrap'
    const activeLink = inactiveLink + ' bg-white [&>span]:inline-block [&>span]:text-gray-900 p-1 rounded-l-lg [&>svg]:stroke-primary'
    const router = useRouter()
    const {data: session, status} = useSession()
    const {pathname} = router

    async function handleLogout() {
        await router.push('/');
        await signOut()
    }

    const MyLogo = (props) => {
        return (
            <Image
                src={logo}
                alt="Photo de l'auteur"
                width="50"
                height="50"
            />
        )
    }

    return (
        <header
            className={`black bg-trueGray-800 sticky flex top-0 p-4 w-full text-white items-center px-10 justify-between lg:justify-evenly`}>
            {/*<MyLogo/>*/}
            <div className="flex flex-col">
                <span>Ecommerce</span>
                <span>Welcome {session?.user?.name}</span>
            </div>

            <button
                onClick={() => setNavActive(!navActive)}
                className="block lg:hidden gap-4 items-center mb-4 mr-2 text-white">
                {navActive ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>

                )}

            </button>

            <nav
                className={`${!navActive ? 'block w-1/2' : 'hidden'} justify-center lg:bg-inherit bg-gray-200 absolute top-0 px-5 py-5 left-0 lg:p-0 z-40 h-screen lg:h-auto lg:relative lg:flex lg:flex-row flex-col gap-2 items-center justify-content `}>

                <span class={`block lg:hidden text-gray-600`}>Welcome {session?.user?.name}</span>

                <Link href="/homepage"
                      className={`whitespace-nowrap ${pathname === '/dashboard' ? activeLink : inactiveLink}`}>
                    Home
                </Link>

                <Link href="/homepage/products" className={pathname.includes('/products') ? activeLink : inactiveLink}>
                    All products
                </Link>

                <Link href="/homepage/categories"
                      className={pathname.includes('/categories') ? activeLink : inactiveLink}>
                    Categories
                </Link>

                <Link href="/homepage/account"
                      className={pathname.includes('/dashboard/orders') ? activeLink : inactiveLink}>
                    Account
                </Link>

                <Link href="/homepage/cart"
                      className={pathname.includes('/dashboard/settings') ? activeLink : inactiveLink}>
                    Cart (0)
                </Link>

                <button className="flex gap-1 p-1 text-red-500 rounded-md bg-red-200" onClick={() => handleLogout('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                    </svg>
                    <span>Logout</span>
                </button>
            </nav>
        </header>
    )
}
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
//      stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round"
//           d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>
// </svg>