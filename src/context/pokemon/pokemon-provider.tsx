import type { PokemonGameState, PokemonListState } from '~/context'

import { PokemonGameContext, PokemonListContext } from '~/context'
import {
    Slot,
    component$,
    useContextProvider,
    useStore,
    useVisibleTask$,
} from '@builder.io/qwik'

export const PokemonProvider = component$(() => {
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

    useVisibleTask$(() => {
        const dataPokemon = window.localStorage.getItem('pokemon-game')

        if (dataPokemon) {
            const {
                pokemonId = 10,
                showBackImage = false,
                isVisible = true,
            } = JSON.parse(dataPokemon) as PokemonGameState

            pokemonGame.pokemonId = pokemonId
            pokemonGame.showBackImage = showBackImage
            pokemonGame.isVisible = isVisible
        }
    })

    useVisibleTask$(({ track }) => {
        track(() => [
            pokemonGame.isVisible,
            pokemonGame.pokemonId,
            pokemonGame.showBackImage,
        ])

        window.localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    })

    return <Slot />
})
