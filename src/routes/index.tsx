import { $, component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

export default component$(() => {
    const pokemonId = useSignal(1) // datos primitivos (booleans, strings, numbers)
    const showBackImage = useSignal(false)

    const changePokemonPosition = $(() => {
        showBackImage.value = !showBackImage.value
    })

    const changePokemonId = $((value: number) => {
        if (pokemonId.value + value <= 0) return

        pokemonId.value += value
    })

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
                        onClick$={changePokemonPosition}
                    >
                        Voltear
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
