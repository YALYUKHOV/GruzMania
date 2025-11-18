const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Получаем ID заказа 
        const orderId = req.params.id;
        // Формируем путь к папке заказа
        const dir = path.join('static', 'orders', orderId);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf', // для .pdf
        'application/msword', // для .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // для .docx
    ];

    if (allowedTypes.includes(file.mimetype)) {
        // если тип файла разрешен
        cb(null, true);
    } else {
        cb(new Error('Неподдерживаемый тип файла! Разрешены: jpg, png, pdf, doc, docx'), false);
    }
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter, 
    limits: {
        fileSize: 1024 * 1024 * 10 // ограничение размера файла до 10 МБ
}});