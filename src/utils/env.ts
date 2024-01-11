import 'dotenv/config';

export const DEPLOY_IP: string = process.env.DEPLOY_IP ?? 'localhost'
export const DEPLOY_PORT: number = parseInt(<string>process.env.DEPLOY_PORT ?? '3000', 10)
export const DB_HOST: string = process.env.DATABASE_HOST ?? 'localhost'
export const DB_PORT: number = parseInt(<string>process.env.DATABASE_PORT ?? '3306', 10)
export const DB_USER: string = process.env.DATABASE_USERNAME ?? 'root'
export const DB_PASSWORD: string = process.env.DATABASE_PASSWORD ?? ''
export const DB_NAME: string = process.env.DATABASE_NAME ?? ''