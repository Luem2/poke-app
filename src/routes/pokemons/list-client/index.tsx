import type { DocumentHead } from '@builder.io/qwik-city'
// import type { SmallPokemon } from '~/interfaces'

import {
    $,
    component$,
    useContext,
    useOnDocument,
    // useStore,
    useTask$,
} from '@builder.io/qwik'

import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getSmallPokemons } from '~/helpers/get-small-pokemons'
import { PokemonListContext } from '~/context/pokemon/pokemon-list.context'

// interface PokemonPageState {
//     currentPage: number
//     isLoading: boolean
//     pokemons: SmallPokemon[]
// }

export default component$(() => {
    const pokemonState = useContext(PokemonListContext)

    // const pokemonState = useStore<PokemonPageState>({
    //     currentPage: 0,
    //     isLoading: false,
    //     pokemons: [],
    // })

    // Solo lo ve el cliente
    // useVisibleTask$(async ({ track }) => {
    //     // cuando se monta el componente se ejecuta
    //     track(() => pokemonState.currentPage)

    //     const pokemons = await getSmallPokemons(pokemonState.currentPage * 10)
    //     pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    // })

    useTask$(async ({ track }) => {
        track(() => pokemonState.currentPage)

        const pokemons = await getSmallPokemons(
            pokemonState.currentPage * 10,
            30
        )
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
        pokemonState.isLoading = false
    })

    useOnDocument(
        'scroll',
        $(() => {
            const maxScroll = document.body.scrollHeight
            const currentScroll = window.scrollY + window.innerHeight

            if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
                pokemonState.currentPage++
                pokemonState.isLoading = true
            }

            console.log({ maxScroll, currentScroll })
        })
    )

    return (
        <>
            <div class='flex flex-col'>
                <span class='my-5 text-5xl'>Status</span>
                <span class=''>Pagina actual: {pokemonState.currentPage}</span>
                <span class=''>Esta cargando:</span>
            </div>

            <div class='mt-10'>
                {/* <button
                    onClick$={() => {
                        pokemonState.currentPage--
                    }}
                    class='btn btn-primary mr-2'
                >
                    Anteriores
                </button> */}
                <button
                    onClick$={() => {
                        pokemonState.currentPage++
                    }}
                    class='btn btn-primary mr-2'
                >
                    Siguientes
                </button>
            </div>

            <div class='grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5'>
                {pokemonState.pokemons.map(({ id, name }) => {
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
    title: 'List Client',
}
