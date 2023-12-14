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
        const resultCount = results.length;
        // Get result count
        const totalCount = await query(`SELECT COUNT(*) FROM Games`);
        let pagination = {
                "index": startIndex,
                "pageSize": limit,
                "resultCount": resultCount,
                "totalCount": totalCount[0]['count(*)'],
        }
        let returns = {
            "data": results,
            "pagination": pagination
            
        }
        console.log(returns)
        return results;
    } catch (error) {
        throw error;
    }
};
