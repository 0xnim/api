import { Elysia } from 'elysia'

export const auth = (app: Elysia) =>
    app
        .group('/auth', (app) =>
            app
                .post('/sign-up', () => {})
                .post('/sign-in', () => {})
                .get('/refresh', () => {})
        )