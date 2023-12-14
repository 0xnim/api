import certificate from 'certs/ca-certificates.txt';
import mysql, { PoolOptions } from 'mysql2';
require('dotenv').config();

const access: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl  : {
        ca : certificate
      }
  };

// Create a connection pool
const pool = mysql.createPool(access);

// Execute a query using the connection pool
export const query = (sql: string, values?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Example usage


