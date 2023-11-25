import { $, component$, useContext /* useSignal */ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { PokemonGameContext } from '~/context/pokemon/pokemon-game.context'

export default component$(() => {
    // const pokemonId = useSignal(1) // datos primitivos (booleans, strings, numbers)
    // const showBackImage = useSignal(false)
    // const isVisible = useSignal(true)

    const pokemonGame = useContext(PokemonGameContext)

    const changePokemonId = $((value: number) => {
        if (pokemonGame.pokemonId + value <= 0) return
        // if (pokemonId.value + value <= 0) return

        pokemonGame.pokemonId += value
        // pokemonId.value += value
    })

    return (
        <>
            <section class='flex flex-col justify-center items-center'>
                <span class='text-6xl'>Buscador simple</span>
                <span class='text-8xl text-center font-semibold'>
                    {pokemonGame.pokemonId}
                    {/* {pokemonId.value} */}
                </span>

                <PokemonImage
                    id={pokemonGame.pokemonId}
                    backImage={pokemonGame.showBackImage}
                    isVisible={pokemonGame.isVisible}
                    // id={pokemonId.value}
                    // backImage={showBackImage.value}
                    // isVisible={isVisible.value}
                />

                <div class='flex justify-center mt-2'>
                    <button
                        class='btn btn-primary mr-2'
                        onClick$={() => changePokemonId(-1)}
                    >
                        Anterior
                    </button>
                    <button
                        class='btn btn-primary'
                        onClick$={() => {
                            changePokemonId(1)
                        }}
                    >
                        Siguiente
                    </button>

                    <button
                        class='btn btn-primary ml-2'
                        onClick$={() => {
                            pokemonGame.showBackImage =
                                !pokemonGame.showBackImage
                            // showBackImage.value = !showBackImage.value
                        }}
                    >
                        Voltear
                    </button>

                    <button
                        class='btn btn-primary ml-2'
                        onClick$={() => {
                            pokemonGame.isVisible = !pokemonGame.isVisible
                            // isVisible.value = !isVisible.value
                        }}
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
