import {
    PokemonGameContext,
    type PokemonGameState,
} from '~/context/pokemon/pokemon-game.context'
import {
    component$,
    Slot,
    useContextProvider,
    useStore,
    useStyles$,
} from '@builder.io/qwik'

import Navbar from '~/components/shared/navbar/navbar'

import styles from './styles.css?inline'

export default component$(() => {
    useStyles$(styles)

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 4,
        showBackImage: false,
        isVisible: true,
    })

    useContextProvider(PokemonGameContext, pokemonGame)

    return (
        <>
            <Navbar />
            <main class='flex flex-col justify-center items-center'>
                <Slot />
            </main>
        </>
    )
})
