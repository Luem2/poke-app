import type { PokemonGameState, PokemonListState } from '~/context'

import {
    component$,
    Slot,
    useContextProvider,
    useStore,
    useStyles$,
} from '@builder.io/qwik'

import { PokemonGameContext, PokemonListContext } from '~/context'
import Navbar from '~/components/shared/navbar/navbar'
import styles from './styles.css?inline'

export default component$(() => {
    useStyles$(styles)

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 4,
        showBackImage: false,
        isVisible: true,
    })

    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        pokemons: [],
    })

    useContextProvider(PokemonGameContext, pokemonGame)
    useContextProvider(PokemonListContext, pokemonList)

    return (
        <>
            <Navbar />
            <main class='flex flex-col justify-center items-center'>
                <Slot />
            </main>
        </>
    )
})
