import {
    type PropFunction,
    Slot,
    component$,
    useStylesScoped$,
} from '@builder.io/qwik'
import ModalStyles from './modal.css?inline'

interface Props {
    showModal: boolean
    persistent?: boolean
    closeFn: PropFunction<() => void>
    size?: 'sm' | 'md' | 'lg'
}

export const Modal = component$(
    ({ showModal, closeFn, persistent = false, size = 'md' }: Props) => {
        useStylesScoped$(ModalStyles)

        return (
            <div
                //* onClick de abajo si lo usamos con stopPropagation()
                // onClick$={closeFn}

                id='modal-content' //? Necesario para la primera forma
                //* Primera forma para evitar que el modal se cierre si apretamos dentro del modal
                onClick$={(e) => {
                    const target = e.target as HTMLDivElement
                    if (target.id === 'modal-content' && !persistent) closeFn()
                }}
                class={showModal ? 'modal-background' : 'hidden'}
            >
                <div
                    class={`modal-content modal-${size}`}
                    //* Segunda forma (STOP PROPAGATION) (PARECE QUE NO TAN RECOMENDADA)
                    // onClick$={(e) => {
                    //     e.stopPropagation()
                    // }}
                >
                    <div class='mt-3 text-center'>
                        <h3 class='modal-title'>
                            <Slot name='title' />
                        </h3>

                        <div class='mt-2 px-7 py-3'>
                            <div class='modal-content-text'>
                                <Slot name='content' />
                            </div>
                        </div>

                        {/* Botton */}
                        <div class='items-center px-4 py-3'>
                            <button
                                onClick$={closeFn}
                                id='ok-btn'
                                class='modal-button'
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)
