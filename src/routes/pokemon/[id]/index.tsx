import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id)

    if (typeof id !== 'number' || isNaN(id) || id > 2000) {
        throw redirect(301, '/')
    }

    return id
})

export default component$(() => {
    // const {
    //     params: { id },
    // } = useLocation()
    // const location = useLocation()
    const pokemonId = usePokemonId()

    return (
        <>
            {/* <h1>Pokemon id: {id}</h1> */}
            {/* <h1>Pokemon id: {location.params.id}</h1>
            <PokemonImage id={+location.params.id} /> */}
            <h1>Pokemon id: {pokemonId.value}</h1>
            <PokemonImage id={pokemonId.value} />
        </>
    )
})
