'use client'
import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
export default function Page() {
    const {data: session, status} = useSession()
    const router = useRouter()
    const loading = status === 'loading'

    useEffect(() => {
        if (!loading && !session) {
            router.push('/signin')
        }
        if (!loading && session) {
            signOut()
            router.push('/signin')
        }

    }, [session,loading])

    if (loading) {
        return  <div className="w-full flex justify-center align-center h-full">
                    Loading...
                </div>
    }
}
