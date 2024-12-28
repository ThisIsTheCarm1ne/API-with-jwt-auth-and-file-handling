import { Router } from 'express';
import multer from 'multer';
import {
    uploadFile,
    listFiles,
    getFileById,
    deleteFile,
    updateFile,
    downloadFile
} from '../services/fileService.js';

const router = Router();
const upload = multer({ dest: 'uploads/' })

router.post('/file/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = await uploadFile(req.file);
        res.status(201).json({ message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

router.get('/file/list', async (req, res) => {
    try {
        const listSize = parseInt(req.query.list_size as string) || 10;
        const page = parseInt(req.query.page as string) || 1;

        const { files, total } = await listFiles(page, listSize);
        res.json({ page, listSize, total, files });
    } catch (error) {
        res.status(500).json({ message: 'Error listing files', error: error.message });
    }
});

router.get('/file/:id', async (req, res) => {
    try {
        const file = await getFileById(parseInt(req.params.id));
        res.json(file);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/file/delete/:id', async (req, res) => {
    try {
        const file = await deleteFile(parseInt(req.params.id));
        res.json({ message: 'File deleted successfully', file });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/file/download/:id', async (req, res) => {
    try {
        const filePath = await downloadFile(parseInt(req.params.id));
        res.download(filePath);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/file/update/:id', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const updatedFile = await updateFile(parseInt(req.params.id), req.file);
        res.json({ message: 'File updated successfully', updatedFile });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;