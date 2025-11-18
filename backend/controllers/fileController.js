const { File, Order } = require('../models');
const fs = require('fs');
const path = require('path');

class FileController {

    async upload(req, res) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'Файлы не были загружены' });
            }

            const { id: orderId } = req.params;
            const userId = req.user.id;

            const order = await Order.findByPk(orderId);
            if (!order || order.userId !== userId) {
                for (const file of req.files) {
                    fs.unlinkSync(file.path);
                }
                return res.status(403).json({ message: 'Нет доступа к этому заказу' });
            }

            const filesToCreate = req.files.map(file => ({
                orderId,
                fileName: file.originalname,
                fileType: file.mimetype,
                url: `${process.env.API_URL}/static/orders/${orderId}/${file.filename}`
            }));

            const createdFiles = await File.bulkCreate(filesToCreate);

            return res.status(201).json(createdFiles);

        } catch (e) {
            console.error(e);
            if (req.files) {
                for (const file of req.files) {
                    fs.unlinkSync(file.path);
                }
            }
            res.status(500).json({ message: 'Ошибка при загрузке файлов' });
        }
    }

    async getFilesForOrder(req, res) {
        try {
            const { id: orderId } = req.params;
            const files = await File.findAll({ where: { orderId } });
            return res.json(files);
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при получении файлов' });
        }
    }

    async delete(req, res) {
        try {
            const { id: fileId } = req.params;
            const userId = req.user.id;

            const file = await File.findByPk(fileId, { include: Order });
            if (!file) {
                return res.status(404).json({ message: 'Файл не найден' });
            }
            if (file.Order.userId !== userId) {
                return res.status(403).json({ message: 'Нет доступа' });
            }
            
            const filePath = path.join('static', 'orders', String(file.orderId), path.basename(file.url));

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await file.destroy();

            return res.json({ message: 'Файл успешно удален' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при удалении файла' });
        }
    }
}

module.exports = new FileController();