import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import { UserToken } from '../entities/UserToken.js';
import { File } from '../entities/File.js';

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB);
const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    synchronize: true, // Set to false in production
    logging: true,
    entities: [User, UserToken, File],
});

export default AppDataSource;