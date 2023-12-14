import { Elysia } from 'elysia';
import { auth } from './routes/auth';
import { games } from './routes/games';
import { errorHandler } from './handlers/error-handler';

const app = new Elysia()

app.use(errorHandler);
app.use(games);
app.use(auth);

app.listen(3000);
console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
