import {
    $,
    component$,
    useComputed$,
    useSignal,
    useTask$,
} from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
// import { Link } from '@builder.io/qwik-city'

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
        const imageUrl = useComputed$(() => {
            return backImage
                ? baseUrl.concat(`back/${id}.png`)
                : baseUrl.concat(`${id}.png`)
        })
        const nav = useNavigate()

        useTask$(({ track }) => {
            // el track sirve para seguir el valor
            track(() => id)

            imageLoaded.value = false
        })

        const goToPokemonPage = $((id: number) => {
            nav(`/pokemon/${id}`)
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

                {/* <Link href={`/pokemon/${id}`}> */}

                <img
                    src={imageUrl.value}
                    onClick$={() => goToPokemonPage(id)}
                    class={[
                        {
                            'hidden': !imageLoaded.value,
                            'brightness-0': !isVisible,
                        },
                        'transition-all',
                        'cursor-pointer',
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
                {/* </Link> */}
            </div>
        )
    }
)
