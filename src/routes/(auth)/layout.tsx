import { Slot, component$ } from '@builder.io/qwik'

export default component$(() => {
    return (
        <div>
            <h1>Login Layout</h1>
            <Slot />
        </div>
    )
})
