import type { PokemonListResponse, SmallPokemon } from '~/interfaces'

export async function getSmallPokemons(
    offset: number = 0,
    limit: number = 10
): Promise<SmallPokemon[]> {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )
    const data = (await res.json()) as PokemonListResponse

    return data.results.map(({ name, url }) => {
        const segments = url.split('/')

        return {
            id: segments.at(-2)!,
            name,
        }
    })
}
