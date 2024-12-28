import { User } from '../entities/User.js';
import AppDataSource from '../utils/db.js';

export async function findUserById(id: string): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    return user || null;
}

export async function createUser(id: string, hashedPassword: string): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({ id, password: hashedPassword });
    await userRepository.save(newUser);
}