import { component$, useComputed$ } from '@builder.io/qwik'
import {
    Link,
    type DocumentHead,
    routeLoader$,
    useLocation,
} from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getSmallPokemons } from '~/helpers/get-small-pokemons'
import type { SmallPokemon } from '~/interfaces'

export const usePokemonList = routeLoader$<SmallPokemon[]>(
    async ({ query, redirect, pathname }) => {
        const offset = Number(query.get('offset') ?? '0')

        if (offset < 0 || isNaN(offset)) {
            throw redirect(301, pathname)
        }

        return await getSmallPokemons(offset)
    }
)

export default component$(() => {
    const pokemons = usePokemonList()
    const location = useLocation()

    const currentOffset = useComputed$<number>(() => {
        // const offsetString = location.url.searchParams.get('offset')
        const offsetString = new URLSearchParams(location.url.search)

        return Number(offsetString.get('offset') ?? 0)
    })

    console.log(location.url.searchParams.get('offset'))

    return (
        <>
            <div class='flex flex-col'>
                <span class='my-5 text-5xl'>Status</span>
                <span class=''>Offset: {currentOffset}</span>
                <span class=''>
                    Esta cargando pagina: {location.isNavigating ? 'SI' : 'NO'}
                </span>
            </div>

            <div class='mt-10'>
                <Link
                    href={`/pokemons/list-ssr/?offset=${
                        currentOffset.value - 10
                    }`}
                    class='btn btn-primary mr-2'
                >
                    Anteriores
                </Link>
                <Link
                    href={`/pokemons/list-ssr/?offset=${
                        currentOffset.value + 10
                    }`}
                    class='btn btn-primary mr-2'
                >
                    Siguientes
                </Link>
            </div>

            <div class='grid grid-cols-6 mt-5'>
                {pokemons.value.map(({ id, name }) => {
                    return (
                        <div
                            key={id}
                            class='m-5 flex flex-col justify-center items-center'
                        >
                            <PokemonImage id={+id} />

                            <span class='capitalize text-2xl'>{name}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
})

export const head: DocumentHead = {
    title: 'List Server',
}
