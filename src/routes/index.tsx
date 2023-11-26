import type { DocumentHead } from '@builder.io/qwik-city'

import { component$ } from '@builder.io/qwik'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonGame } from '~/hooks/use-pokemon-game'

export default component$(() => {
    const {
        pokemonId,
        isVisible,
        showBackImage,
        nextPokemon,
        prevPokemon,
        toggleFromBack,
        toggleVisible,
    } = usePokemonGame()

    return (
        <>
            <section class='flex flex-col justify-center items-center'>
                <span class='text-6xl'>Buscador simple</span>
                <span class='text-8xl text-center font-semibold'>
                    {pokemonId.value}
                </span>

                <PokemonImage
                    id={pokemonId.value}
                    backImage={showBackImage.value}
                    isVisible={isVisible.value}
                    // id={pokemonId.value}
                    // backImage={showBackImage.value}
                    // isVisible={isVisible.value}
                />

                <div class='flex justify-center mt-2'>
                    <button class='btn btn-primary mr-2' onClick$={prevPokemon}>
                        Anterior
                    </button>
                    <button class='btn btn-primary' onClick$={nextPokemon}>
                        Siguiente
                    </button>

                    <button
                        class='btn btn-primary ml-2'
                        onClick$={toggleFromBack}
                    >
                        Voltear
                    </button>

                    <button
                        class='btn btn-primary ml-2'
                        onClick$={toggleVisible}
                    >
                        Revelar
                    </button>
                </div>
            </section>
        </>
    )
})

export const head: DocumentHead = {
    title: 'PokeQwik',
    meta: [
        {
            name: 'description',
            content: 'PokeApp Project con Qwik!',
        },
    ],
}
