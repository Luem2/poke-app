import { useNavigate, type DocumentHead } from '@builder.io/qwik-city'

import {
    $,
    component$,
    useContext,
    useOnDocument,
    useTask$,
} from '@builder.io/qwik'

import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getSmallPokemons } from '~/helpers/get-small-pokemons'
import { PokemonListContext } from '~/context/pokemon/pokemon-list.context'
import { PokemonGameContext } from '~/context'

export default component$(() => {
    const pokemonState = useContext(PokemonListContext)
    const pokemonGame = useContext(PokemonGameContext)
    const nav = useNavigate()

    const goToPokemonPage = $((id: number) => {
        pokemonGame.pokemonId = id

        nav(`/pokemon/${id}`)
    })

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
            </div>

            <div class='mt-10'>
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
                            onClick$={() => goToPokemonPage(+id)}
                            class='m-5 flex flex-col justify-center items-center cursor-pointer'
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
