import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonGame } from '~/hooks/use-pokemon-game'

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id)

    if (typeof id !== 'number' || isNaN(id) || id > 2000) {
        throw redirect(301, '/')
    }

    return id
})

export default component$(() => {
    const {
        pokemonId,
        isVisible,
        showBackImage,
        toggleFromBack,
        toggleVisible,
    } = usePokemonGame()
    return (
        <>
            <h1>Pokemon id: {pokemonId.value}</h1>
            <PokemonImage
                id={pokemonId.value}
                isVisible={isVisible.value}
                backImage={showBackImage.value}
            />

            <div>
                <button onClick$={toggleFromBack} class='btn btn-primary mr-2'>
                    Voltear
                </button>
                <button onClick$={toggleVisible} class='btn btn-primary'>
                    Revelar
                </button>
            </div>
        </>
    )
})
