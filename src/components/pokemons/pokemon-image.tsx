import { component$, useSignal, useTask$ } from '@builder.io/qwik'

interface Props {
    id: number
    size?: number
    backImage?: boolean
    isVisible?: boolean
}

export const PokemonImage = component$(
    ({ id, size = 200, backImage = false, isVisible = true }: Props) => {
        const baseUrl =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
        const imageLoaded = useSignal(false)

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
                    src={baseUrl.concat(
                        backImage ? `back/${id}.png` : `${id}.png`
                    )}
                    class={[
                        {
                            'hidden': !imageLoaded.value,
                            'brightness-0': !isVisible,
                        },
                        'transition-all',
                    ]}
                    alt='Pokemon Sprite'
                    onLoad$={() => {
                        setTimeout(() => {
                            imageLoaded.value = true
                        }, 1000)
                    }}
                    width={size}
                    height={size}
                />
            </div>
        )
    }
)
