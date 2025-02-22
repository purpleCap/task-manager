import dotenv from 'dotenv';

dotenv.config({path: '.env'});

export const PORT = process.env.PORT || 8080;
export const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL || '';