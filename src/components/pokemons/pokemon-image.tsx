import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik'

interface Props {
    id: number | string
    size?: number
    backImage?: boolean
    isVisible?: boolean
    goPokemonPage?: boolean
}

export const PokemonImage = component$(
    ({ id, size = 150, backImage = false, isVisible = true }: Props) => {
        const baseUrl =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
        const imageLoaded = useSignal(false)
        const imageUrl = useComputed$(() => {
            if (id === '') return ''

            return backImage
                ? baseUrl.concat(`back/${id}.png`)
                : baseUrl.concat(`${id}.png`)
        })
        useTask$(({ track }) => {
            // el track sirve para seguir el valor
            track(() => id)

            imageLoaded.value = false
        })

        return (
            <div
                class='flex items-center justify-center'
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            >
                {!imageLoaded.value && <span>Cargando...</span>}

                <img
                    src={imageUrl.value}
                    class={[
                        {
                            'hidden': !imageLoaded.value,
                            'brightness-0': !isVisible,
                        },
                        'transition-all',
                    ]}
                    alt='Pokemon Sprite'
                    onLoad$={() => {
                        imageLoaded.value = true
                    }}
                    width={size}
                    height={size}
                />
            </div>
        )
    }
)
