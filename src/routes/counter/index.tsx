import { component$ } from '@builder.io/qwik'
import { useCounter } from '~/hooks/useCounter'

export default component$(() => {
    const { counter, decrease, increase } = useCounter(15)

    return (
        <>
            <span class='text-2xl '>Counter</span>
            <span class='text-7xl'>{counter.value}</span>

            <div class='mt-4'>
                <button onClick$={decrease} class='btn btn-primary mr-2'>
                    -1
                </button>
                <button onClick$={increase} class='btn btn-primary'>
                    +1
                </button>
            </div>
        </>
    )
})
