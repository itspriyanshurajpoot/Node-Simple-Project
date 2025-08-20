import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const SECRET_KEY = process.env.SECRET_KEY;
export const PORT = process.env.PORT || 3000;