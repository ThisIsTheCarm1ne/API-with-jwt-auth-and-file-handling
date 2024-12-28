import fs from 'fs/promises';
import multer from 'multer';
import { DataSource } from 'typeorm';
import AppDataSource from '../utils/db.js';
import { File } from '../entities/File.js';

const fileRepository = AppDataSource.getRepository(File);

export async function uploadFile(fileData: Express.Multer.File) {
    const { originalname, mimetype, size, filename } = fileData;
    const extension = originalname.split('.').pop() || '';

    const file = fileRepository.create({
        name: originalname,
        extension,
        mimeType: mimetype,
        size,
        uploadDate: new Date(),
        path: `uploads/${filename}`,
    });

    await fileRepository.save(file);

    return file;
}

export async function listFiles(page: number, listSize: number) {
    const [files, total] = await fileRepository.findAndCount({
        skip: (page - 1) * listSize,
        take: listSize,
    });

    return { files, total };
}

export async function getFileById(id: number) {
    const file = await fileRepository.findOneBy({ id });

    if (!file) {
        throw new Error('File not found');
    }

    return file;
}

export async function deleteFile(id: number) {
    const file = await fileRepository.findOneBy({ id });

    if (!file) {
        throw new Error('File not found');
    }

    await fs.unlink(file.path);
    await fileRepository.remove(file);

    return file;
}

export async function updateFile(id: number, newFileData: Express.Multer.File) {
    const file = await fileRepository.findOneBy({ id });

    if (!file) {
        throw new Error('File not found');
    }

    const { originalname, mimetype, size, filename } = newFileData;
    const extension = originalname.split('.').pop() || '';

    await fs.unlink(file.path);

    file.name = originalname;
    file.extension = extension;
    file.mimeType = mimetype;
    file.size = size;
    file.path = `uploads/${filename}`;

    await fileRepository.save(file);

    return file;
}

export async function downloadFile(id: number) {
    const file = await fileRepository.findOneBy({ id });

    if (!file) {
        throw new Error('File not found');
    }

    return file.path;
}