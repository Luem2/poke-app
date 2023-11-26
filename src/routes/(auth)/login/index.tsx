import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './login.css?inline'
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city'

export const useLoginUserAction = routeAction$(
    (data, /*event -> */ { cookie, redirect }) => {
        const { email, password } = data

        if (email === 'luciano@gmail.com' && password === '123456') {
            cookie.set('jwt', 'mi_jwt_token', {
                secure: true,
                path: '/',
            })

            redirect(302, '/')
        } else {
            return {
                success: false,
                error: 'Usuario o contraseña incorrecta',
            }
        }
    },
    zod$({
        email: z.string().email('El email no es válido'),
        password: z
            .string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    })
)

export default component$(() => {
    useStylesScoped$(styles)

    const action = useLoginUserAction()

    return (
        <Form action={action} class='login-form mt-10'>
            <div class='relative'>
                <input name='email' type='text' placeholder='Email address' />
                <label for='email'>Email Address</label>
            </div>
            <div class='relative'>
                <input name='password' type='password' placeholder='Password' />
                <label for='password'>Password</label>
            </div>
            <div class='relative'>
                <button type='submit' class='disabled:opacity-50'>
                    Ingresar
                </button>
            </div>
            <p>
                {action.value?.success && (
                    <code>Autenticado: Token - {action.value.toString()}</code>
                )}
            </p>

            <code>{JSON.stringify(action.value, undefined, 2)}</code>
        </Form>
    )
})
