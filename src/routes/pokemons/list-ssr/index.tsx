import { $, component$, useComputed$, useSignal } from '@builder.io/qwik'
import {
    Link,
    type DocumentHead,
    routeLoader$,
    useLocation,
} from '@builder.io/qwik-city'
import { Modal } from '~/components'
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
    const modalVisible = useSignal(false)

    const currentOffset = useComputed$<number>(() => {
        const offsetString = new URLSearchParams(location.url.search)
        return Number(offsetString.get('offset') ?? 0)
    })

    const showModal = $((id: string, name: string) => {
        console.log('id', id)
        console.log('name', name)
        modalVisible.value = true
    })

    const closeModal = $(() => {
        modalVisible.value = false
    })

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
                            onClick$={() => {
                                showModal(id, name)
                            }}
                            class='m-5 flex flex-col justify-center items-center'
                        >
                            <PokemonImage id={+id} />

                            <span class='capitalize text-2xl'>{name}</span>
                        </div>
                    )
                })}
            </div>

            <Modal showModal={modalVisible.value}>
                <div q:slot='title'>Nombre del Pokemon</div>
                <span>Hola mundo</span>

                <div
                    q:slot='content'
                    class='flex flex-col justify-center items-center'
                >
                    <PokemonImage id={1} />

                    <span>Preguntar a ChatGPT</span>
                </div>
            </Modal>
        </>
    )
})

export const head: DocumentHead = {
    title: 'List Server',
}
