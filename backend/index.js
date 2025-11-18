require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const path = require('path');

const mainRouter = require('./routes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/api', mainRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно');

        await sequelize.sync(); 
        
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (error) {
        console.error('Ошибка при подключении к базе данных:', error);
    }
};

start();