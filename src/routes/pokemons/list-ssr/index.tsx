import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
    return (
        <>
            <h1>Pokemons Server Side</h1>
        </>
    )
})

export const head: DocumentHead = {
    title: 'List Server',
}
