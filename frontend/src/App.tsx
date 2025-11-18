// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const AboutPage = () => <div><h1>О компании</h1></div>;
const LoginPage = () => <div><h1>Страница входа</h1></div>;

function App() {
  return (
    <Routes>
      {}
      <Route path="/" element={<MainLayout />}>
        {/* */}
        <Route index={true} element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" aname="LoginPage" element={<LoginPage />} />

        {/* калькулятор, категории и т.д. */}
      </Route>

      {/* роуты для админки*/}
    </Routes>
  );
}

export default App;