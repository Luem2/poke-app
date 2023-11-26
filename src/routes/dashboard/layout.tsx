import { Slot, component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import Navbar from '~/components/shared/navbar/navbar'

export const useAuthCookie = routeLoader$(({ cookie, redirect }) => {
    const jwtCookie = cookie.get('jwt')

    if (jwtCookie) {
        console.log('cookie value:', jwtCookie)
    }

    throw redirect(302, '/login')
})

export default component$(() => {
    return (
        <>
            <Navbar />
            <div class='flex flex-col justify-center items-center mt-4'>
                <span class='text-5xl'>Dashboard Layout</span>
                <Slot />
            </div>
        </>
    )
})
