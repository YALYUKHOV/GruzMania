import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="bg-gray-100 py-2 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2">
              <span className="text-2xl">☰</span>
              <span className="">Меню</span>
            </button>
            <nav className="flex gap-4">
              <a href="#" className="hover:text-orange-500">О компании</a>
              <a href="#" className="hover:text-orange-500">Вакансии</a>
              <a href="#" className="hover:text-orange-500">Новости</a>
              <a href="#" className="hover:text-orange-500">Контакты</a>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:info@standart-express.ru" className="hover:text-orange-500">
              info@standart-express.ru
            </a>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p>8 (800) 700-51-53</p>
                <p>+7 (965) 226-57-90</p>
              </div>
              <div className="flex gap-2">
                <a href="#" className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">W</a>
                <a href="#" className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">T</a>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Перезвоните мне
            </button>
            <a href="#" className="hover:text-orange-500">Санкт-Петербург</a>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">
            <span className="text-orange-500">СЭ</span> Стандарт Экспресс
          </a>
          
          <nav className="flex gap-6 font-medium">
            <a href="#" className="hover:text-orange-500">Грузчики</a>
            <a href="#" className="hover:text-orange-500">Переезды</a>
            <a href="#" className="hover:text-orange-500">Такелажные работы</a>
            <a href="#" className="hover:text-orange-500">Грузоперевозки</a>
            <a href="#" className="hover:text-orange-500">Разнорабочие</a>
            <a href="#" className="hover:text-orange-500">Юридическим лицам</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;