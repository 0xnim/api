import { Elysia, t } from 'elysia'
import { query } from '../handlers/db';
import { ValidationError } from '../handlers/error-handler';

export const games = (app: Elysia) =>
    app
        .group('/games', (app) =>
            app
                .get('/', getGames)
                
        )

const getGames = async (req: any) => {
    try {
        // Extracting index and pageSize from the query parameters
        const { index = 0, pageSize = 50 } = req.query;

        // Parsing index and pageSize as integers
        const startIndex = parseInt(index, 10);
        const limit = parseInt(pageSize, 10);
        
        // Validate the parameters
        if (isNaN(startIndex) || isNaN(limit) || startIndex < 0 || limit <= 0 || startIndex + limit > 10000) {
            throw new ValidationError('Invalid query parameters') ;
        }
        
        // Fetch data from the database with the specified parameters
        const results = await query(`SELECT * FROM Games LIMIT ${startIndex}, ${limit}`);
        console.log(results);
        return results;
    } catch (error) {
        throw error;
    }
};

/*
const getGames = async () => {
    try {
        const results = await query('SELECT * FROM Games');
        console.log(results);
    } catch (error) {
        console.error(error);
    }
};
*/